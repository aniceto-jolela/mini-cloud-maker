import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App(){
const { user, login, logout } = useAuth();

return (
    <Routes>
        <Route path="/login" element={!user ? <Login onLogin={login} /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard onLogout={logout} /> : <Navigate to="/login" />} />
    </Routes>
    );
}

export default App;