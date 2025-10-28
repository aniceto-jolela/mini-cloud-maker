import React, { useEffect, useState } from "react";
import { apiListFiles } from "../services/api";
import FileActions from "./FileActions";

export default function FileListWithActions({ bucket }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await apiListFiles(bucket);
    setLoading(false);
    if (res.ok === false) {
      alert(res.message || "Erro ao listar ficheiros");
      setFiles([]);
    } else {
      setFiles(Array.isArray(res) ? res : (res.files || []));
    }
  };

  useEffect(() => {
    load();
    // atualiza a cada 30s
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [bucket]);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-3"> Arquivos ({bucket})</h3>
      {loading ? <p>Carregando...</p> : (
        <ul className="space-y-2">
          {files.length === 0 && <li className="text-sm text-gray-600">Nenhum arquivo</li>}
          {files.map(f => (
            <li key={f} className="flex justify-between items-center border-b py-2">
              <div className="truncate max-w-xs">{f}</div>
              <FileActions bucket={bucket} filename={f} onDone={load} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
