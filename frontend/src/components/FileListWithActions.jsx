import React, { useEffect, useState } from "react";
import { apiListFiles, apiUploadFile, apiDeleteFile, apiDownloadFile } from "../services/api";

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
                <td className="p-2">{(f.size / 1024).toFixed(1)} KB</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => apiDownloadFile(bucket, f.name)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
