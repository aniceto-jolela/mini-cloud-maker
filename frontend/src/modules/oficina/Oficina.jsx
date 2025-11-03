import React from 'react';
import Menu from '@/components/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';

// Subpáginas da Oficina
function OficinaDashboard() {
  return <div>Dashboard da Oficina - Reparos e Relatórios</div>;
}

function Reparos() {
  return <div>Gestão de Reparos</div>;
}

function Relatorios() {
  return <div>Relatórios Técnicos</div>;
}

function Inventario() {
  return <div>Inventário de Peças</div>;
}

export default function Oficina() {
  return (
    <Menu>
      <Routes>
        <Route path="/" element={<OficinaDashboard />} />
        <Route path="/reparos" element={<Reparos />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="*" element={<Navigate to="/oficina" />} />
      </Routes>
    </Menu>
  );
}