import { useState } from "react";
import { uploadFile } from "../services/api";

export default function FileUpload({ onUploadComplete }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Selecione um arquivo!");
    await uploadFile(file);
    setFile(null);
    onUploadComplete();
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      <h2 className="text-lg font-bold mb-2">Upload de Arquivos</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        onClick={handleUpload}
      >
        Enviar
      </button>
    </div>
  );
}
