import React, { useEffect, useState } from "react";
import { apiListUsers, apiCreateUser, apiDeleteUser } from "../services/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    const res = await apiListUsers();
    if (res.ok === false) {
      setMessage(res.message || "Erro a carregar utilizadores");
      setUsers([]);
    } else {
      setUsers(Array.isArray(res) ? res : (res.users || []));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.username || !form.password) {
      setMessage("Username e password são obrigatórios");
      return;
    }
    const res = await apiCreateUser(form.username, form.password, form.role);
    if (res.ok === false) {
      setMessage(res.message || JSON.stringify(res));
    } else {
      setMessage("Usuário criado");
      setForm({ username: "", password: "", role: "user" });
      loadUsers();
    }
  };

  const handleDelete = async (username) => {
    if (!window.confirm(`Remover utilizador ${username}?`)) return;
    const res = await apiDeleteUser(username);
    if (res.ok === false) {
      setMessage(res.message || "Erro ao remover");
    } else {
      setMessage("Usuário removido");
      loadUsers();
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-3">👥 Gestão de Utilizadores</h3>

      <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        <input
          placeholder="username"
          className="border p-2 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="password"
          className="border p-2 rounded"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div className="flex gap-2">
          <select className="border p-2 rounded" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">Criar</button>
        </div>
      </form>

      {message && <div className="text-sm text-red-600 mb-2">{message}</div>}

      <div>
        <h4 className="font-semibold mb-2">Utilizadores</h4>
        {loading ? <p>Carregando...</p> : (
          <ul className="space-y-2">
            {users.map(u => (
              <li key={u.username} className="flex justify-between items-center border-b py-2">
                <div>
                  <div className="font-medium">{u.username}</div>
                  <div className="text-sm text-gray-600">{u.role}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(u.username)} className="bg-red-500 text-white px-2 py-1 rounded">Remover</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
