import React from 'react'
import { api } from '../../api.js'

export default function Messages() {
  const [msgs, setMsgs] = React.useState([])
  const [body, setBody] = React.useState('')
  const load = async () => { const r = await api.get('/emergency/messages'); setMsgs(r.data) }
  React.useEffect(()=>{ load() }, [])
  const send = async (e) => {
    e.preventDefault()
    await api.post('/emergency/messages', { toRoles: ['HEALTH_OFFICER'], body, priority: 'urgent' })
    setBody('')
    load()
  }
  return (
    <div className="grid">
      <form className="card" onSubmit={send}>
        <b>Send Emergency Message</b>
        <textarea placeholder="Message body" value={body} onChange={e=>setBody(e.target.value)} />
        <button>Send</button>
      </form>
      <div className="card">
        <b>Thread</b>
        {msgs.map(m => <div key={m._id} className="alert">{m.priority.toUpperCase()} — {m.body}</div>)}
      </div>
    </div>
  )
}
