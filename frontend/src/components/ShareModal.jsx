import React, { useState } from "react";

export default function ShareModal({ open, onClose, onShare, filename }) {
  const [expires, setExpires] = useState(60 * 60); // default 1 hour (secs)
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResultUrl(null);
    try {
      const res = await onShare({ expiresSeconds: Number(expires) });
      if (res && res.ok) {
        setResultUrl(res.url || res.data?.url || res.url);
      } else {
        setError(res.error || res.message || "Erro ao criar link");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h3 className="text-lg font-semibold mb-2">🔗 Partilhar: {filename}</h3>

        <label className="text-sm block mb-2">Expiração (segundos)</label>
        <input
          type="number"
          className="border p-2 rounded w-full mb-3"
          value={expires}
          onChange={(e) => setExpires(e.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 rounded border">Cancelar</button>
          <button onClick={submit} disabled={loading} className="px-3 py-2 bg-blue-600 text-white rounded">
            {loading ? "Gerando..." : "Gerar link"}
          </button>
        </div>

        {resultUrl && (
          <div className="mt-3 bg-gray-50 p-2 rounded">
            <p className="text-sm">Link (copiar):</p>
            <input readOnly value={resultUrl} className="w-full p-2 rounded border mt-1" />
            <div className="mt-2 flex gap-2 justify-end">
              <button onClick={() => { navigator.clipboard?.writeText(resultUrl); alert("Copiado!"); }} className="px-3 py-1 rounded border">Copiar</button>
              <a href={resultUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-green-600 text-white">Abrir</a>
            </div>
          </div>
        )}

        {error && <div className="mt-3 text-red-600">{error}</div>}
      </div>
    </div>
  );
}
