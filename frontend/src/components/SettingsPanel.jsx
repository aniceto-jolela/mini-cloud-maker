import React, { useState, useEffect } from "react";

export default function SettingsPanel() {
  const [config, setConfig] = useState({
    minio_port: 9000,
    access_key: "",
    secret_key: "",
    bucket_name: "",
    auto_start: false,
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/config")
      .then((res) => res.json())
      .then(setConfig);
  }, []);

  const handleSave = async () => {
    const res = await fetch("http://localhost:8080/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await res.json();
    setMsg(data.message);
  };

  const handleReset = async () => {
    if (!window.confirm("Deseja realmente restaurar as configurações padrão?")) return;
    const res = await fetch("http://localhost:8080/api/config/reset", { method: "POST" });
    const data = await res.json();
    setConfig(data.config);
    setMsg(data.message);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configurações do Sistema</h2>

      <label className="block mb-2">Porta do MinIO</label>
      <input
        type="number"
        className="border p-2 w-full mb-4"
        value={config.minio_port}
        onChange={(e) => setConfig({ ...config, minio_port: Number(e.target.value) })}
      />

      <label className="block mb-2">Usuário (Access Key)</label>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={config.access_key}
        onChange={(e) => setConfig({ ...config, access_key: e.target.value })}
      />

      <label className="block mb-2">Senha (Secret Key)</label>
      <input
        type="password"
        className="border p-2 w-full mb-4"
        value={config.secret_key}
        onChange={(e) => setConfig({ ...config, secret_key: e.target.value })}
      />

      <label className="block mb-2">Nome do Bucket</label>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={config.bucket_name}
        onChange={(e) => setConfig({ ...config, bucket_name: e.target.value })}
      />

      <label className="block mb-2">Diretório de Armazenamento</label>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={config.storage_path}
        onChange={(e) => setConfig({ ...config, storage_path: e.target.value })}
      />
      <p className="text-sm text-gray-500 mb-6">
        Caminho onde os arquivos do MinIO serão salvos (ex: <code>C:\MiniCloud\data</code> ou <code>/home/user/minicloud</code>)
      </p>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={config.auto_start}
          onChange={(e) => setConfig({ ...config, auto_start: e.target.checked })}
          className="mr-2"
        />
        <span>Iniciar MinIO automaticamente</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar Configurações
        </button>

        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Restaurar Padrões
        </button>
      </div>

      {msg && <p className="mt-4 text-green-600 font-medium">{msg}</p>}
    </div>
  );
}
