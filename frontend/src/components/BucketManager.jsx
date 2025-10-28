import React, { useEffect, useState } from "react";
import { apiListBuckets, apiCreateBucket, apiDeleteBucket, apiRenameBucket } from "../services/api";

export default function BucketManager({ onSelect }) {
  const [buckets, setBuckets] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await apiListBuckets();
    setLoading(false);
    if (res.ok) setBuckets(res.buckets);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    const name = prompt("Nome do novo bucket:");
    if (!name) return;
    const res = await apiCreateBucket(name);
    alert(res.message);
    load();
  };

  const handleDelete = async (name) => {
    if (!confirm(`Apagar bucket '${name}'?`)) return;
    const res = await apiDeleteBucket(name);
    alert(res.message);
    load();
  };

  const handleRename = async (name) => {
    const newName = prompt("Novo nome:", name);
    if (!newName || newName === name) return;
    const res = await apiRenameBucket(name, newName);
    alert(res.message);
    load();
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-2">Buckets</h3>
      <button onClick={handleCreate} className="px-3 py-1 bg-blue-600 text-white rounded mb-3">+ Novo Bucket</button>
      {loading ? <p>Carregando...</p> : (
        <ul className="space-y-2">
          {buckets.map(b => (
            <li key={b} className="flex justify-between items-center border-b py-1">
              <button onClick={() => onSelect(b)} className="text-blue-600 underline">{b}</button>
              <div className="flex gap-2">
                <button onClick={() => handleRename(b)} className="px-2 py-1 border rounded">Renomear</button>
                <button onClick={() => handleDelete(b)} className="px-2 py-1 border rounded text-red-500">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
