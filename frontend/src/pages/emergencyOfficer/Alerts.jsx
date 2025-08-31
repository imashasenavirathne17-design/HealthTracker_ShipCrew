import React from 'react'
import { api } from '../../api.js'

export default function Alerts() {
  const [items, setItems] = React.useState([])
  const load = async () => {
    const r = await api.get('/emergency/alerts')
    setItems(r.data)
  }
  React.useEffect(()=>{ load() }, [])

  const ack = async (id) => { await api.post('/emergency/alerts/ack/'+id); load(); }
  const closeA = async (id) => { await api.post('/emergency/alerts/close/'+id); load(); }
  return (
    <div className="card">
      <b>Real-time Alerts</b>
      <table><thead><tr><th>Time</th><th>Crew</th><th>Message</th><th>Severity</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>
        {items.map(a => <tr key={a._id}>
          <td>{new Date(a.createdAt).toLocaleString()}</td>
          <td>{a.crew?.name}</td>
          <td>{a.message}</td>
          <td>{a.severity}</td>
          <td>{a.status}</td>
          <td>
            {a.status==='active' && <button onClick={()=>ack(a._id)}>Acknowledge</button>}
            {a.status!=='resolved' && <button onClick={()=>closeA(a._id)}>Close</button>}
          </td>
        </tr>)}
      </tbody></table>
    </div>
  )
}
