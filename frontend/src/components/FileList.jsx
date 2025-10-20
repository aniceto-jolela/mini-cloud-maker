import { useEffect, useState } from "react";
import { listFiles, deleteFile } from "../services/api";

export default function FileList() {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const data = await listFiles();
    setFiles(data);
  };

  const handleDelete = async (name) => {
    await deleteFile(name);
    loadFiles();
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Arquivos na Nuvem</h2>
      <ul>
        {files.map(f => (
          <li key={f} className="flex justify-between items-center border-b py-1">
            <span>{f}</span>
            <button
              onClick={() => handleDelete(f)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
