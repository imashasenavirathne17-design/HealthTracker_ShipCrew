import React from 'react'
import { api } from '../../api.js'

export default function Incidents() {
  const [items, setItems] = React.useState([])
  const [form, setForm] = React.useState({ crew:'', note:'', severity:'major', equipmentUsed:'oxygen tank' })
  const load = async () => { const r = await api.get('/emergency/incidents'); setItems(r.data) }
  React.useEffect(()=>{ load() }, [])
  const create = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k,v])=> fd.append(k, v))
    await api.post('/emergency/incidents', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setForm({ crew:'', note:'', severity:'major', equipmentUsed:'' })
    load()
  }
  return (
    <div className="grid">
      <form className="card" onSubmit={create}>
        <b>Log Incident</b>
        <input placeholder="Crew ID" value={form.crew} onChange={e=>setForm({...form, crew:e.target.value})} />
        <textarea placeholder="Notes" value={form.note} onChange={e=>setForm({...form, note:e.target.value})} />
        <select value={form.severity} onChange={e=>setForm({...form, severity:e.target.value})}>
          <option value="minor">Minor</option>
          <option value="major">Major</option>
          <option value="critical">Critical</option>
        </select>
        <input placeholder="Equipment used (comma separated)" value={form.equipmentUsed} onChange={e=>setForm({...form, equipmentUsed:e.target.value})} />
        <button>Create</button>
      </form>
      <div className="card">
        <b>Incident List</b>
        <table><thead><tr><th>Case</th><th>Severity</th><th>Status</th><th>Created</th></tr></thead>
        <tbody>
          {items.map(i => <tr key={i._id}>
            <td>{i.caseId}</td>
            <td>{i.severity}</td>
            <td>{i.status}</td>
            <td>{new Date(i.createdAt).toLocaleString()}</td>
          </tr>)}
        </tbody></table>
      </div>
    </div>
  )
}
