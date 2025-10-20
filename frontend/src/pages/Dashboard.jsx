import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FileUploader from '../components/FileUploader';
import FileList from '../components/FileList';


export default function Dashboard(){
const [stats,setStats]=useState({totalFiles:0,totalSize:0});


useEffect(()=>{
const token = localStorage.getItem('token');
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
api.get('/system/stats').then(r=>setStats(r.data)).catch(()=>{});
},[]);


return (
<div className="p-6">
<h1 className="text-xl">Dashboard</h1>
<div className="mt-4">
<div>Arquivos: {stats.totalFiles}</div>
<div>Uso (bytes): {stats.totalSize}</div>
</div>
<div className="mt-6">
<FileUploader onUploaded={()=>window.location.reload()} />
<FileList />
</div>
</div>
);
}