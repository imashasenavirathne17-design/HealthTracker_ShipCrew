import React from 'react'
import { useAuth } from '../../App.jsx'
import { api } from '../../api.js'

export default function Login() {
  const { setAuth } = useAuth()
  const [email, setEmail] = React.useState('health@example.com')
  const [password, setPassword] = React.useState('Pass@1234')
  const [token2fa, setToken2fa] = React.useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const r = await api.post('/auth/login', { email, password, token: token2fa })
    setAuth(r.data.token, r.data.role, r.data.name)
  }
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="card">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input placeholder="2FA token (if enabled)" value={token2fa} onChange={e=>setToken2fa(e.target.value)} />
        <button>Login</button>
      </form>
      <p>Seed users: health@example.com / emergency@example.com (set after running seed API)</p>
    </div>
  )
}
