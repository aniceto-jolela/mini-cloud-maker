const API_URL = "http://localhost:8080/api";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${API_URL}/upload`, { method: "POST", body: formData });
}

export async function listFiles() {
  const res = await fetch(`${API_URL}/files`);
  return res.json();
}

export async function deleteFile(filename) {
  return fetch(`${API_URL}/delete/${filename}`, { method: "DELETE" });
}

export async function getStats() {
  const res = await fetch(`${API_URL}/status`);
  return res.json();
}