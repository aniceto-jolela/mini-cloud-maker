import React from 'react';
import Menu from '@/components/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';

// Subpáginas do File Manager
function FilesDashboard() {
  return <div>Dashboard de Arquivos - Organização Empresarial</div>;
}

function Explorar() {
  return <div>Explorar Arquivos</div>;
}

function Compartilhamento() {
  return <div>Compartilhamento</div>;
}

function Permissoes() {
  return <div>Gestão de Permissões</div>;
}

export default function FileManager() {
  return (
    <Menu>
      <Routes>
        <Route path="/" element={<FilesDashboard />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/compartilhar" element={<Compartilhamento />} />
        <Route path="/permissoes" element={<Permissoes />} />
        <Route path="*" element={<Navigate to="/files" />} />
      </Routes>
    </Menu>
  );
}