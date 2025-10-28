const API_BASE = "http://localhost:8080/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...authHeaders(), ...(opts.headers || {}) },
    ...opts,
  });
  const text = await res.text();
  try {
    return JSON.parse(text || "{}");
  } catch {
    return { ok:false, raw: text };
  }
}

/* Users */
export const apiListUsers = () => fetchJSON(`${API_BASE}/users`);
export const apiCreateUser = (username, password, role="user") =>
  fetchJSON(`${API_BASE}/users`, { method: "POST", body: JSON.stringify({ username, password, role }) });
export const apiDeleteUser = (username) =>
  fetchJSON(`${API_BASE}/users/${encodeURIComponent(username)}`, { method: "DELETE" });
export const apiResetUserPassword = (username, newPassword) =>
  fetchJSON(`${API_BASE}/users/${encodeURIComponent(username)}/password`, { method: "POST", body: JSON.stringify({ password: newPassword }) });

/* Files */
export const apiListFiles = (bucket) => fetchJSON(`${API_BASE}/files/${encodeURIComponent(bucket)}/list`);
export const apiDeleteFile = (bucket, object) =>
  fetchJSON(`${API_BASE}/files/${encodeURIComponent(bucket)}/delete`, { method: "POST", body: JSON.stringify({ object }) });
export const apiRenameFile = (bucket, src, dst) =>
  fetchJSON(`${API_BASE}/files/${encodeURIComponent(bucket)}/rename`, { method: "POST", body: JSON.stringify({ src, dst }) });
export const apiSetMetadata = (bucket, object, metadata) =>
  fetchJSON(`${API_BASE}/files/${encodeURIComponent(bucket)}/metadata`, { method: "POST", body: JSON.stringify({ object, metadata }) });
export const apiCreateShare = (bucket, object, expiresSeconds) =>
  fetchJSON(`${API_BASE}/files/${encodeURIComponent(bucket)}/share`, { method: "POST", body: JSON.stringify({ object, expires: expiresSeconds }) });

/* Logs */
export const apiGetLogs = () => fetchJSON(`${API_BASE}/logs`);

/* Download via browser (presigned link) */
export const apiDownloadPresigned = async (bucket, object) => {
  const res = await fetch(`${API_BASE}/files/${encodeURIComponent(bucket)}/share`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ object, expires: 60 })
  });
  const data = await res.json();
  return data;
};
