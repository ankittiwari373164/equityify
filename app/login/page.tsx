'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setError('')
    if (!email || !password) { setError('Email and password are required.'); return }
    setLoading(true)
    const res = await fetch('/api/auth?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.message || 'Login failed.'); return }
    localStorage.setItem('eq_auth_token', data.token)
    localStorage.setItem('eq_user', JSON.stringify(data.user))
    router.push('/dashboard')
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg,#0F172A,#1E293B)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', padding: '32px 32px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📈</div>
            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 24, marginBottom: 6 }}>Welcome Back</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Log in to your Equityify account</p>
          </div>

          <div style={{ padding: 32 }}>
            {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>⚠️ {error}</div>}

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@gmail.com"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Your password"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <button onClick={handleLogin} disabled={loading}
              style={{ width: '100%', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 16 }}>
              {loading ? 'Logging in…' : 'Log In →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 14, color: '#6B7280' }}>
              Don&apos;t have an account?{' '}
              <Link href="/signup" style={{ color: '#DC2626', fontWeight: 700 }}>Sign Up Free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
