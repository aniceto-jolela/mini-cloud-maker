import React from 'react';
import Menu from '@/components/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';

// Subpáginas do Backup
function BackupDashboard() {
  return <div>Dashboard de Backup - Segurança e Recuperação</div>;
}

function Agendamentos() {
  return <div>Agendamentos de Backup</div>;
}

function Restauracao() {
  return <div>Restauração de Dados</div>;
}

function Historico() {
  return <div>Histórico de Backups</div>;
}

export default function Backup() {
  return (
    <Menu>
      <Routes>
        <Route path="/" element={<BackupDashboard />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/restauracao" element={<Restauracao />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="*" element={<Navigate to="/backup" />} />
      </Routes>
    </Menu>
  );
}