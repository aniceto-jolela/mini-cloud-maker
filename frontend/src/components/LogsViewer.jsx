import React, { useEffect, useState } from "react";
import { apiGetLogs } from "../services/api";

export default function LogsViewer() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterUser, setFilterUser] = useState("");
  const [filterType, setFilterType] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    const res = await apiGetLogs();
    setLoading(false);
    if (res.ok === false) {
      alert(res.message || "Erro ao obter logs");
      setEvents([]);
    } else {
      const e = res.events || res;
      setEvents(Array.isArray(e) ? e.reverse() : []);
    }
  };

  useEffect(() => { loadLogs(); }, []);

  const filtered = events.filter(ev => {
    if (filterUser && ev.user !== filterUser) return false;
    if (filterType && ev.type !== filterType) return false;
    return true;
  });

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">Logs do Sistema</h3>
        <div className="flex gap-2">
          <input placeholder="User" className="border p-1 rounded text-sm" value={filterUser} onChange={e=>setFilterUser(e.target.value)} />
          <input placeholder="Tipo" className="border p-1 rounded text-sm" value={filterType} onChange={e=>setFilterType(e.target.value)} />
          <button onClick={loadLogs} className="px-2 py-1 border rounded">Refresh</button>
        </div>
      </div>

      <div className="max-h-64 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-1">Time</th>
              <th className="p-1">Tipo</th>
              <th className="p-1">User</th>
              <th className="p-1">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev, i) => (
              <tr key={i} className="border-t">
                <td className="p-1 align-top">{new Date(ev.ts * 1000).toLocaleString()}</td>
                <td className="p-1 align-top">{ev.type}</td>
                <td className="p-1 align-top">{ev.user}</td>
                <td className="p-1 align-top"><pre className="whitespace-pre-wrap">{JSON.stringify(ev.details)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-sm text-gray-600 mt-2">Sem eventos</p>}
      </div>
    </div>
  );
}
