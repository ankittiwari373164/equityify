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
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.message || 'Login failed.'); return }
    localStorage.setItem('eq_auth_token', data.token)
    localStorage.setItem('eq_user', JSON.stringify(data.user))
    router.push('/dashboard')
  }

  const inp = { width:'100%', padding:'12px 14px', border:'1.5px solid #E5E7EB', borderRadius:10, fontSize:14, outline:'none', boxSizing:'border-box' as const, background:'rgba(255,255,255,0.9)' }

  return (
    <>
      <Navbar />
      <div style={{ minHeight:'calc(100vh - 64px)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:24, overflow:'hidden' }}>
        {/* BG image */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,0.88))' }} />

        {/* Floating tickers */}
        <div style={{ position:'absolute', top:40, left:40, background:'rgba(255,255,255,0.06)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 18px', color:'#22C55E', fontSize:13, fontWeight:700 }}>NIFTY 24,832 ↑ 1.2%</div>
        <div style={{ position:'absolute', top:40, right:40, background:'rgba(255,255,255,0.06)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 18px', color:'#F87171', fontSize:13, fontWeight:700 }}>SENSEX 81,245 ↓ 0.3%</div>
        <div style={{ position:'absolute', bottom:60, left:40, background:'rgba(255,255,255,0.06)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 18px', color:'#60A5FA', fontSize:13, fontWeight:700 }}>BTC ₹68,42,000 ↑ 2.1%</div>

        <div style={{ position:'relative', zIndex:1, background:'rgba(255,255,255,0.96)', backdropFilter:'blur(20px)', borderRadius:24, width:'100%', maxWidth:440, overflow:'hidden', boxShadow:'0 30px 80px rgba(0,0,0,0.4)' }}>
          <div style={{ background:'linear-gradient(135deg,#0F172A,#1E293B)', padding:'36px 32px 28px', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, background:'rgba(220,38,38,0.15)', borderRadius:'50%' }} />
            <div style={{ position:'absolute', bottom:-30, left:-20, width:80, height:80, background:'rgba(37,99,235,0.1)', borderRadius:'50%' }} />
            <div style={{ fontSize:44, marginBottom:10 }}>📈</div>
            <h1 style={{ color:'#fff', fontWeight:900, fontSize:26, marginBottom:6 }}>Welcome Back</h1>
            <p style={{ color:'#94A3B8', fontSize:14 }}>Log in to your Equityify account</p>
          </div>
          <div style={{ padding:32 }}>
            {error && <div style={{ background:'#FEE2E2', color:'#DC2626', padding:'10px 14px', borderRadius:8, fontSize:13, marginBottom:16, fontWeight:600 }}>⚠️ {error}</div>}
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, fontWeight:700, color:'#374151', display:'block', marginBottom:6 }}>EMAIL ADDRESS</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" onKeyDown={e => e.key==='Enter' && handleLogin()} style={inp} />
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:12, fontWeight:700, color:'#374151', display:'block', marginBottom:6 }}>PASSWORD</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" onKeyDown={e => e.key==='Enter' && handleLogin()} style={inp} />
            </div>
            <button onClick={handleLogin} disabled={loading} style={{ width:'100%', background:loading?'#9CA3AF':'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', border:'none', borderRadius:10, padding:'13px', fontSize:15, fontWeight:700, cursor:loading?'not-allowed':'pointer', marginBottom:16, boxShadow:'0 4px 15px rgba(220,38,38,0.3)' }}>
              {loading ? 'Logging in…' : 'Log In →'}
            </button>
            <p style={{ textAlign:'center', fontSize:14, color:'#6B7280' }}>
              Don&apos;t have an account?{' '}<Link href="/signup" style={{ color:'#DC2626', fontWeight:700 }}>Sign Up Free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
