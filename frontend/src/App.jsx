import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/PricingPlans";
//import Payment from "./pages/Payment";
import Oficina from "./modules/oficina/Oficina";
import Studio from "./modules/studio/Studio";
import Backup from "./modules/backup/Backup";
import FileManager from "./modules/file-manager/FileManager";
import Webhooks from "./modules/webhooks/Webhooks";
import Obras from "./modules/obras/Obras";
import Escolas from "./modules/escolas/Escolas";
import Vistoria from "./modules/vistoria/Vistoria";
import Qualidade from "./modules/qualidade/Qualidade";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rota pública principal */}
      <Route path="/" element={<Landing />} />
      
      {/* Rotas públicas */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/pricing" element={<Pricing />} />
      
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      
      {/* Módulos (verificar se usuário tem acesso) */}
      <Route path="/oficina/*" element={user ? <Obras /> : <Navigate to="/login" />} />
      <Route path="/studio/*" element={user && user.modules?.includes('studio') ? <Studio /> : <Navigate to="/pricing" />} />
      <Route path="/backup/*" element={user && user.modules?.includes('backup') ? <Backup /> : <Navigate to="/pricing" />} />
      <Route path="/files/*" element={user && user.modules?.includes('files') ? <FileManager /> : <Navigate to="/pricing" />} />
      <Route path="/webhooks/*" element={user && user.modules?.includes('webhooks') ? <Webhooks /> : <Navigate to="/pricing" />} />
      <Route path="/obras/*" element={user && user.modules?.includes('obras') ? <Obras /> : <Navigate to="/pricing" />} />
      <Route path="/escolas/*" element={user && user.modules?.includes('escolas') ? <Escolas /> : <Navigate to="/pricing" />} />
      <Route path="/vistoria/*" element={user && user.modules?.includes('vistoria') ? <Vistoria /> : <Navigate to="/pricing" />} />
      <Route path="/qualidade/*" element={user && user.modules?.includes('qualidade') ? <Qualidade /> : <Navigate to="/pricing" />} />

      {/* Configurações */}
      <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      
      {/* Rota fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;