import { useEffect, useState } from "react";

export default function MinioControl() {
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    const res = await fetch("http://localhost:8080/api/minio/status");
    const data = await res.json();
    setRunning(data.running);
  };

  const startServer = async () => {
    setLoading(true);
    await fetch("http://localhost:8080/api/minio/start", { method: "POST" });
    await checkStatus();
    setLoading(false);
  };

  const stopServer = async () => {
    setLoading(true);
    await fetch("http://localhost:8080/api/minio/stop", { method: "POST" });
    await checkStatus();
    setLoading(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-gray-100 mb-4 text-center">
      <h2 className="text-lg font-bold mb-2">Servidor MinIO</h2>

      <p className="mb-2">
        Estado:{" "}
        <span className={running ? "text-green-600" : "text-red-600"}>
          {running ? "Ativo" : "Parado"}
        </span>
      </p>

      {loading ? (
        <p>Processando...</p>
      ) : running ? (
        <button
          onClick={stopServer}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Parar Servidor
        </button>
      ) : (
        <button
          onClick={startServer}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Iniciar Servidor
        </button>
      )}
    </div>
  );
}
