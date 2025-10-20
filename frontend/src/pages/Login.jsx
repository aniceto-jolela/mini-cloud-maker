import React, { useState } from 'react';
import api, { setAuthToken } from '../services/api';


export default function Login(){
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');
const [err,setErr]=useState('');


async function submit(e){
e.preventDefault();
try{
const r = await api.post('/auth/login',{username,password});
localStorage.setItem('token', r.data.token);
setAuthToken(r.data.token);
window.location.href = '/';
}catch(e){ setErr('Credenciais inválidas'); }
}


return (
<div className="p-6 max-w-md mx-auto">
<h1 className="text-2xl mb-4">Mini Cloud Maker — Login</h1>
<form onSubmit={submit} className="space-y-3">
<input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Usuário" className="w-full p-2 border" />
<input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha" type="password" className="w-full p-2 border" />
<div className="text-red-600">{err}</div>
<button className="px-4 py-2 border rounded">Entrar</button>
</form>
</div>
);
}