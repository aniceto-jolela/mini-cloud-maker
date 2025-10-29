import React, { useEffect, useState } from "react";
import { apiListFiles, apiUploadFile, apiDeleteFile, apiDownloadFile, apiGenerateShareLink } from "../services/api";

export default function FileListWithActions({ bucket }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFiles = async () => {
    setLoading(true);
    const res = await apiListFiles(bucket);
    setLoading(false);
    if (res.ok) setFiles(res.files);
  };

  useEffect(() => {
    if (bucket) loadFiles();
  }, [bucket]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await apiUploadFile(bucket, file);
    alert(res.message);
    e.target.value = "";
    loadFiles();
  };

  const handleDelete = async (name) => {
    if (!confirm(`Apagar arquivo '${name}'?`)) return;
    const res = await apiDeleteFile(bucket, name);
    alert(res.message);
    loadFiles();
  };

  const handleDownload = async (name) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/files/${bucket}/${name}/download`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Erro ao baixar arquivo");
      return;
    }

    // Cria blob para forçar download local
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Falha no download");
  }
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-3">Arquivos em {bucket}</h3>
      <input type="file" onChange={handleUpload} className="mb-3" />

      {loading ? (
        <p>Carregando...</p>
      ) : files.length === 0 ? (
        <p>Nenhum arquivo.</p>
      ) : (
        <table className="w-full text-left text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Nome</th>
              <th className="p-2">Tamanho</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.name} className="border-b">
                <td className="p-2">{f.name}</td>
                <td className="p-2">
                  {f.size < 1024 * 1024
                    ? (f.size / 1024).toFixed(1) + " KB"
                    : (f.size / 1024 / 1024).toFixed(1) + " MB"}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleDownload(f.name)}
                    className="text-blue-600 hover:underline"
                  >
                    Baixar
                  </button>
                  <button
                    onClick={() => handleDelete(f.name)}
                    className="text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const res = await apiGenerateShareLink(bucket, f.name, 600);
                        if (res.ok) {
                          const fullUrl = res.link;
                          await navigator.clipboard.writeText(fullUrl);
                          alert(`🔗 Link copiado!\nExpira em ${res.expires_in / 60} min:\n${fullUrl}`);
                        } else {
                          alert(`Erro: ${res.message || "Falha ao gerar link temporário"}`);
                        }
                      } catch (e) {
                        alert("Erro de rede ou servidor indisponível.");
                      }
                    }}
                    className="text-green-600 hover:underline"
                  >
                    Compartilhar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
