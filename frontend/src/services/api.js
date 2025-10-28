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

/* Buckets */
export const apiListBuckets = () => fetchJSON(`${API_BASE}/buckets`);
export const apiCreateBucket = (name) =>
  fetchJSON(`${API_BASE}/buckets`, { method: "POST", body: JSON.stringify({ name }) });
export const apiDeleteBucket = (name) =>
  fetchJSON(`${API_BASE}/buckets/${encodeURIComponent(name)}`, { method: "DELETE" });
export const apiRenameBucket = (old_name, new_name) =>
  fetchJSON(`${API_BASE}/buckets/rename`, { method: "POST", body: JSON.stringify({ old_name, new_name }) });

/* FILES */
export const apiListFiles = (bucket) => fetchJSON(`${API_BASE}/files/${encodeURIComponent(bucket)}`);
export const apiUploadFile = (bucket, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${API_BASE}/files/${encodeURIComponent(bucket)}/upload`, {
    method: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    body: formData,
  }).then((r) => r.json());
};
export const apiDeleteFile = (bucket, filename) => fetchJSON(`${API_BASE}/files/${encodeURIComponent(bucket)}/${encodeURIComponent(filename)}`, { method: "DELETE" });
export const apiDownloadFile = async (bucket, filename) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${API_BASE}/files/${encodeURIComponent(bucket)}/${encodeURIComponent(filename)}/download`,
    { headers: { Authorization: "Bearer " + token } }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.message || "Erro ao baixar arquivo.");
    return;
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

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
