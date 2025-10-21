import { useEffect, useState } from "react";
//import { getStats } from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";


export default function StatsPanel() {
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);

  /*useEffect(() => {
    getStats().then(setStats);
  }, []);*/

  const fetchStats = async () => {
    const res = await fetch("http://localhost:8080/api/status/current");
    const data = await res.json();
     console.log(data);
    setStatus(data);
  };

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:8080/api/status/history");
    const data = await res.json();
    setHistory(data.map(h => ({
      time: new Date(h.timestamp * 1000).toLocaleTimeString(),
      used: h.used_percent
    })));
  };

  useEffect(() => {
    fetchStats();
    fetchHistory();
    const interval = setInterval(() => {
      fetchStats();
      fetchHistory();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return <p>Carregando estatísticas...</p>;

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm mt-4">
      <h2 className="text-lg font-bold mb-2 text-center">Estatísticas do Sistema</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2 text-center">Uso de Disco</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={[
                  { name: "Usado", value: status.used_space_gb },
                  { name: "Livre", value: status.free_space_gb }
                ]}
                dataKey="value"
                outerRadius={70}
                label
              >
                {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <p className="text-center text-sm">
            {status.used_space_gb} GB usados de {status.total_space_gb} GB ({status.used_percent}%)
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3 className="font-semibold mb-2">Arquivos</h3>
          <p className="text-3xl font-bold text-blue-600">{status.total_files}</p>
          <p className="text-sm text-gray-600">Total armazenado</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-center">Histórico de Uso (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="used" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
