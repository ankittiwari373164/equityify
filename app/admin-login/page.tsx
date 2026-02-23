'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setError('')
    if (!username || !password) { setError('Enter username and password.'); return }
    setLoading(true)
    const res = await fetch('/api/admin?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.message || 'Invalid credentials.'); return }
    localStorage.setItem('eq_admin_token', data.token)
    router.push('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0F172A,#1E293B)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 400, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '32px', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#DC2626,#B91C1C)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>🛡️</div>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22, marginBottom: 6 }}>Admin Panel</h1>
          <p style={{ color: '#64748B', fontSize: 13 }}>Equityify Dashboard</p>
        </div>
        <div style={{ padding: 32 }}>
          {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>⚠️ {error}</div>}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Admin username"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Admin password"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleLogin} disabled={loading}
            style={{ width: '100%', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Logging in…' : 'Enter Admin Panel →'}
          </button>
        </div>
      </div>
    </div>
  )
}
