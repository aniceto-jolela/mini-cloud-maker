import React from 'react';
import Menu from '@/components/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';

// Subpáginas do Studio
function StudioDashboard() {
  return <div>Dashboard do Estúdio - Mídia e Conteúdo</div>;
}

function Galeria() {
  return <div>Galeria de Mídia</div>;
}

function Upload() {
  return <div>Upload de Arquivos</div>;
}

function Edicao() {
  return <div>Ferramentas de Edição</div>;
}

export default function Studio() {
  return (
    <Menu>
      <Routes>
        <Route path="/" element={<StudioDashboard />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/edicao" element={<Edicao />} />
        <Route path="*" element={<Navigate to="/studio" />} />
      </Routes>
    </Menu>
  );
}