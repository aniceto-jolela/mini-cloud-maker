import React, { useEffect, useState, useRef } from "react";

export default function StoragePathSelector() {
  const [storagePath, setStoragePath] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/get_storage_path")
      .then(res => res.json())
      .then(data => setStoragePath(data.storage_path || ""))
      .catch(console.error);
  }, []);

  const handleFolderChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const folderName = files[0].webkitRelativePath.split("/")[0];

    if (!folderName) {
      alert("Selecione uma pasta válida.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/set_storage_path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: folderName }),
      });
      const data = await res.json();
      if (data.status === "success") {
        alert("Diretório alterado com sucesso!");
        setStoragePath(data.storage_path);
      } else {
        alert("Erro: " + (data.message || "Falha ao alterar diretório."));
      }
    } catch (err) {
      alert("Erro ao conectar ao backend: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const openFolderPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow mt-4">
      <h2 className="text-xl font-semibold mb-3">Diretório de Armazenamento</h2>
      <p className="text-gray-700 mb-3 break-words">
        <strong>Atual:</strong> {storagePath || "Carregando..."}
      </p>

      {/* Input oculto para selecionar pasta */}
      <input
        type="file"
        ref={fileInputRef}
        webkitdirectory="true"
        directory=""
        multiple
        onChange={handleFolderChange}
        style={{ display: "none" }}
      />

      <button
        onClick={openFolderPicker}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Atualizando..." : "Escolher Diretório"}
      </button>
    </div>
  );
}
