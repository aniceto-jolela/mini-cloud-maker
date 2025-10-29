import React, { useEffect, useState } from "react";
import { apiGetActiveLinks, apiCancelShareLink } from "../services/api";

const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:8080";

export default function ActiveLinksPanel({ onClose }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLinks = async () => {
    setLoading(true);
    const res = await apiGetActiveLinks();
    setLoading(false);
    if (res.ok) {
      setLinks(res.links || []);
    } else {
      alert(res.message || "Erro ao carregar links ativos");
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleCancel = async (sig) => {
    if (!confirm("Cancelar este link?")) return;
    const res = await apiCancelShareLink(sig);
    if (res.ok) {
      alert("✅ Link cancelado!");
      loadLinks();
    } else {
      alert("❌ Falha ao cancelar link.");
    }
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("🔗 Link copiado para a área de transferência!");
    } catch (err) {
      console.error(err);
      alert("❌ Falha ao copiar o link. Verifique as permissões do navegador.");
    }
  };

  const formatDateTime = (ts) =>
    new Date(ts * 1000).toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatExpiration = (exp) => {
    const expDate = new Date(exp * 1000);
    const now = Date.now();
    const remaining = exp * 1000 - now;

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    const rel = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    return { formatted: formatDateTime(exp), rel, isSoon: remaining < 60000 };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-5xl text-left relative">
        <h2 className="text-xl font-bold mb-4 text-center">🔗 Links Ativos</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : links.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum link ativo no momento.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2">Arquivo</th>
                  <th className="p-2">Bucket</th>
                  <th className="p-2">Criado em</th>
                  <th className="p-2">Expira em</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {links.map((l) => {
                  const { formatted, rel, isSoon } = formatExpiration(l.exp);
                  const created = l.created_at
                    ? formatDateTime(l.created_at)
                    : "—";
                  const linkUrl = `${BACKEND_URL}/api/share/${l.bucket}/${l.filename}?exp=${l.exp}&sig=${l.sig}`;

                  return (
                    <tr
                      key={l.sig}
                      className={`border-b transition ${
                        isSoon ? "bg-red-50 animate-pulse" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-2 font-medium">{l.filename}</td>
                      <td className="p-2">{l.bucket}</td>
                      <td className="p-2 text-gray-700">{created}</td>
                      <td className="p-2 text-gray-700">
                        <div>
                          <span className="font-semibold">{formatted}</span>
                          <div className="text-xs text-gray-500">em {rel}</div>
                        </div>
                      </td>
                      <td className="p-2 space-x-2 whitespace-nowrap">
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Abrir
                        </a>
                        <button
                          onClick={() => handleCopy(linkUrl)}
                          className="text-green-600 hover:underline"
                        >
                          Copiar
                        </button>
                        <button
                          onClick={() => handleCancel(l.sig)}
                          className="text-red-600 hover:underline"
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
