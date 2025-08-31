import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CrewList from './CrewList.jsx'
import CrewDetail from './CrewDetail.jsx'

export default function HealthDashboard() {
  return (
    <div className="container">
      <h2>Health Officer Dashboard</h2>
      <div className="grid">
        <div className="card"><b>Pending exams</b><div id="pending">—</div></div>
        <div className="card"><b>Chronic patients</b><div id="chronic">—</div></div>
        <div className="card"><b>Vaccination alerts</b><div id="vax">—</div></div>
      </div>
      <hr/>
      <Routes>
        <Route path="/" element={<CrewList/>} />
        <Route path="crew/:id" element={<CrewDetail/>} />
      </Routes>
    </div>
  )
}
