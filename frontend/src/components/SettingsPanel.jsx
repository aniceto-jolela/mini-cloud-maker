import { useEffect, useState } from "react";

export default function SettingsPanel() {
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadConfig = async () => {
    const res = await fetch("http://localhost:8080/api/config");
    const data = await res.json();
    setConfig(data);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("http://localhost:8080/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    alert("Configurações salvas com sucesso!");
  };

  useEffect(() => {
    loadConfig();
  }, []);

  if (!config) return <p>Carregando configurações...</p>;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm mt-4">
      <h2 className="text-lg font-bold mb-2 text-center">Configurações do Sistema</h2>

      <div className="grid grid-cols-2 gap-4 text-left">
        <label>
          Porta MinIO:
          <input
            type="number"
            value={config.minio_port}
            onChange={(e) =>
              setConfig({ ...config, minio_port: parseInt(e.target.value) })
            }
            className="border rounded p-1 w-full"
          />
        </label>

        <label>
          Nome do Bucket:
          <input
            type="text"
            value={config.bucket_name}
            onChange={(e) =>
              setConfig({ ...config, bucket_name: e.target.value })
            }
            className="border rounded p-1 w-full"
          />
        </label>

        <label>
          Usuário (Access Key):
          <input
            type="text"
            value={config.access_key}
            onChange={(e) =>
              setConfig({ ...config, access_key: e.target.value })
            }
            className="border rounded p-1 w-full"
          />
        </label>

        <label>
          Senha (Secret Key):
          <input
            type="password"
            value={config.secret_key}
            onChange={(e) =>
              setConfig({ ...config, secret_key: e.target.value })
            }
            className="border rounded p-1 w-full"
          />
        </label>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <input
          type="checkbox"
          checked={config.auto_start}
          onChange={(e) =>
            setConfig({ ...config, auto_start: e.target.checked })
          }
        />
        <label>Iniciar MinIO automaticamente</label>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Salvando..." : "Salvar Configurações"}
        </button>
      </div>
    </div>
  );
}
