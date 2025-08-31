import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api.js'

export default function CrewList() {
  const [data, setData] = React.useState([])
  const [q, setQ] = React.useState('')
  const load = async () => {
    const r = await api.get('/crew', { params: { q } })
    setData(r.data)
  }
  React.useEffect(()=>{ load() }, [q])
  return (
    <div className="card">
      <input placeholder="Search crew..." value={q} onChange={e=>setQ(e.target.value)} />
      <table><thead><tr><th>Name</th><th>Blood</th><th>Cabin</th></tr></thead>
        <tbody>
          {data.map(c=> <tr key={c._id}>
            <td><Link to={`crew/${c._id}`}>{c.name}</Link></td>
            <td>{c.bloodType||'-'}</td>
            <td>{c?.location?.cabin||'-'}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}
