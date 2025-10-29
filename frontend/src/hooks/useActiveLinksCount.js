import { useState, useEffect } from "react";
import { apiGetActiveLinks } from "../services/api";

export function useActiveLinksCount(intervalMs = 10000) {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [expiresInText, setExpiresInText] = useState("");

  async function fetchLinks() {
    try {
      const links = await apiGetActiveLinks();
      setCount(links.length);

      if (links.length > 0) {
        const now = Date.now();
        const soonest = links.reduce(
          (min, l) => (l.expires_at < min ? l.expires_at : min),
          links[0].expires_at
        );

        const remainingMs = soonest * 1000 - now;

        // Calcular tempo relativo
        const minutes = Math.floor(remainingMs / 60000);
        const seconds = Math.floor((remainingMs % 60000) / 1000);

        // Data e hora exata
        const expDate = new Date(soonest * 1000);
        const expText = expDate.toLocaleString("pt-PT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        let relative = "";
        if (minutes > 0) relative = `${minutes}m ${seconds}s`;
        else relative = `${seconds}s`;

        setExpiresInText(`expira em ${relative} (${expText})`);
      } else {
        setExpiresInText("");
      }

      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    } catch (err) {
      console.error("Erro ao buscar links ativos:", err);
    }
  }

  useEffect(() => {
    fetchLinks();
    const id = setInterval(fetchLinks, intervalMs);
    return () => clearInterval(id);
  }, []);

  return { count, animate, expiresInText };
}
