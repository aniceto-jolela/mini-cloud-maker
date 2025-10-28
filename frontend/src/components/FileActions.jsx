import React, { useState } from "react";
import { apiDeleteFile, apiRenameFile, apiSetMetadata, apiCreateShare } from "../services/api";
import ShareModal from "./ShareModal";

export default function FileActions({ bucket, filename, onDone }) {
  const [showShare, setShowShare] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Remover ${filename}?`)) return;
    setLoading(true);
    const res = await apiDeleteFile(bucket, filename);
    setLoading(false);
    if (res.ok === false) return alert(res.error || "Erro");
    onDone();
  };

  const handleRename = async () => {
    const dst = prompt("Novo nome:", filename);
    if (!dst || dst === filename) return;
    setLoading(true);
    const res = await apiRenameFile(bucket, filename, dst);
    setLoading(false);
    if (res.ok === false) return alert(res.error || "Erro ao renomear");
    onDone();
  };

  const handleEditMetadata = async () => {
    const key = prompt("Chave da metadata (ex: x-amz-meta-owner):", "owner");
    if (!key) return;
    const val = prompt("Valor:");
    if (val === null) return;
    setLoading(true);
    const res = await apiSetMetadata(bucket, filename, { [key]: val });
    setLoading(false);
    if (res.ok === false) return alert(res.error || "Erro ao definir metadata");
    alert("Metadata atualizada");
  };

  const handleShareRequest = async ({ expiresSeconds }) => {
    const res = await apiCreateShare(bucket, filename, expiresSeconds);
    return res;
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => window.open(`/api/files/${encodeURIComponent(bucket)}/download/${encodeURIComponent(filename)}`)} className="px-2 py-1 border rounded">Baixar</button>

      <button onClick={handleRename} disabled={loading} className="px-2 py-1 border rounded">Renomear</button>

      <button onClick={handleEditMetadata} disabled={loading} className="px-2 py-1 border rounded">Metadata</button>

      <button onClick={() => setShowShare(true)} className="px-2 py-1 border rounded">Compartilhar</button>

      <button onClick={handleDelete} disabled={loading} className="px-2 py-1 bg-red-500 text-white rounded">Excluir</button>

      <ShareModal open={showShare} onClose={() => setShowShare(false)} filename={filename} onShare={handleShareRequest} />
    </div>
  );
}
