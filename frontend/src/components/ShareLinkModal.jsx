import React, { useState, useEffect } from "react";

export default function ShareLinkModal({ file, bucket, onClose }) {
  const [expiresIn, setExpiresIn] = useState(300); // 5 min
  const [shareLink, setShareLink] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateLink() {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/files/${bucket}/${file.name}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ expires_in: expiresIn }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      const fullUrl = window.location.origin + data.link;
      setShareLink(fullUrl);
      const expTime = Date.now() + data.expires_in * 1000;
      setExpiresAt(expTime);
      startCountdown(expTime);
    } else {
      alert("❌ Erro ao gerar link temporário");
    }
  }

  function startCountdown(expTime) {
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expTime - Date.now()) / 1000));
      setCountdown(remaining);
      if (remaining <= 0) clearInterval(timer);
    }, 1000);
  }

  function copyLink() {
    navigator.clipboard.writeText(shareLink);
    alert("🔗 Link copiado para a área de transferência!");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[420px]">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Compartilhar: {file.name}
        </h2>

        {!shareLink ? (
          <>
            <label className="block mb-2 text-sm text-gray-600">
              Tempo de expiração:
            </label>
            <select
              value={expiresIn}
              onChange={(e) => setExpiresIn(Number(e.target.value))}
              className="border rounded-md w-full p-2 mb-4"
            >
              <option value={300}>5 minutos</option>
              <option value={900}>15 minutos</option>
              <option value={1800}>30 minutos</option>
              <option value={3600}>1 hora</option>
            </select>

            <div className="flex justify-between">
              <button onClick={onClose} variant="secondary">
                Cancelar
              </button>
              <button onClick={generateLink} disabled={loading}>
                {loading ? "Gerando..." : "Gerar Link"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-700 mb-3">
              O link expira em{" "}
              <span className="font-semibold text-red-600">
                {Math.floor(countdown / 60)}m {countdown % 60}s
              </span>
            </p>
            <textarea
              readOnly
              className="w-full h-20 border rounded-md p-2 mb-3 text-sm bg-gray-50"
              value={shareLink}
            />
            <div className="flex justify-between">
              <button onClick={copyLink}>Copiar</button>
              <button onClick={onClose} variant="secondary">
                Fechar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
