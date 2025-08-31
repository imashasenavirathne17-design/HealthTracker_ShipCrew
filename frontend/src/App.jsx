import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import create from 'zustand'
import { io } from 'socket.io-client'
import { api, setToken } from './api.js'
import Login from './pages/shared/Login.jsx'
import HealthDashboard from './pages/healthOfficer/HealthDashboard.jsx'
import EmergencyDashboard from './pages/emergencyOfficer/EmergencyDashboard.jsx'

export const useAuth = create(set => ({
  token: null, role: null, name: null,
  setAuth: (t,r,n) => { set({ token: t, role: r, name: n }); setToken(t); },
  logout: () => { set({ token: null, role: null, name: null }); setToken(null); }
}));

export const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', { autoConnect: false });

function App() {
  const { token, role, logout } = useAuth();
  React.useEffect(() => {
    if (token) {
      socket.connect();
      socket.emit('joinRole', role);
      socket.on('alert', (payload) => {
        alert(`ALERT: ${payload.message}`);
      });
    }
    return () => socket.disconnect();
  }, [token, role]);

  if (!token) return <Login />
  return (
    <div className="layout">
      <nav>
        <Link to="/">Home</Link>
        {role === 'HEALTH_OFFICER' && <Link to="/health">Health Officer</Link>}
        {role === 'EMERGENCY_OFFICER' && <Link to="/emergency">Emergency</Link>}
        <button onClick={logout}>Logout</button>
      </nav>
      <Routes>
        {role === 'HEALTH_OFFICER' && <Route path="/health/*" element={<HealthDashboard/>} />}
        {role === 'EMERGENCY_OFFICER' && <Route path="/emergency/*" element={<EmergencyDashboard/>} />}
        <Route path="*" element={<Navigate to={role === 'HEALTH_OFFICER' ? '/health' : '/emergency'} />} />
      </Routes>
    </div>
  )
}
export default App
