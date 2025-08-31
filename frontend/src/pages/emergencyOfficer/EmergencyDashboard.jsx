import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Alerts from './Alerts.jsx'
import Incidents from './Incidents.jsx'
import Messages from './Messages.jsx'

export default function EmergencyDashboard() {
  return (
    <div className="container">
      <h2>Emergency Officer Dashboard</h2>
      <Routes>
        <Route path="/" element={<Alerts/>} />
        <Route path="incidents" element={<Incidents/>} />
        <Route path="messages" element={<Messages/>} />
      </Routes>
    </div>
  )
}
