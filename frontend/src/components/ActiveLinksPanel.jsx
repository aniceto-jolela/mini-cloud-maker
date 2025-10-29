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
      alert("Link cancelado!");
      loadLinks();
    } else {
      alert("Falha ao cancelar link.");
    }
  };

const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert(" Link copiado para a área de transferência!");
    } catch (err) {
      console.error(err);
      alert(" Falha ao copiar o link. Verifique as permissões do navegador.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg text-left">
        <h2 className="text-xl font-bold mb-4"> Links Ativos</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {loading ? (
          <p>Carregando...</p>
        ) : links.length === 0 ? (
          <p>Nenhum link ativo no momento.</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Arquivo</th>
                <th className="p-2">Bucket</th>
                <th className="p-2">Expira em</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {links.map((l) => {
                const linkUrl = `${BACKEND_URL}/api/share/${l.bucket}/${l.filename}?exp=${l.exp}&sig=${l.sig}`;
                return (
                <tr key={l.sig} className="border-b">
                  <td className="p-2">{l.filename}</td>
                  <td className="p-2">{l.bucket}</td>
                  <td className="p-2">
                    {new Date(l.exp * 1000).toLocaleTimeString()}
                  </td>
                  <td className="p-2 space-x-2">
                    <a
                      href={`${BACKEND_URL}/api/share/${l.bucket}/${l.filename}?exp=${l.exp}&sig=${l.sig}`}
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
              )})}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
