import { useEffect, useState } from "react";
import { getStats } from "../services/api";

export default function StatsPanel() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return (
    <div className="p-4 bg-gray-200 rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Estatísticas</h2>
      {stats.total_gb && (
        <ul>
          <li>Total: {stats.total_gb} GB</li>
          <li>Usado: {stats.used_gb} GB</li>
          <li>Disponível: {stats.free_gb} GB</li>
        </ul>
      )}
    </div>
  );
}
