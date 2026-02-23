'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const [mOpen, setMOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const u = localStorage.getItem('eq_user')
    if (u) setUser(JSON.parse(u))
  }, [pathname])

  const logout = () => {
    localStorage.removeItem('eq_user')
    localStorage.removeItem('eq_auth_token')
    setUser(null)
    router.push('/')
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/programs', label: 'Programs' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav style={{ background: '#0F172A', position: 'sticky', top: 0, zIndex: 100, height: 64, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#DC2626,#B91C1C)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📈</div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>Equityify</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: pathname === l.href ? '#fff' : '#94A3B8',
                background: pathname === l.href ? 'rgba(220,38,38,0.15)' : 'transparent',
                transition: 'all 0.2s',
              }}>{l.label}</Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {user ? (
              <>
                <Link href="/dashboard" style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                  Dashboard
                </Link>
                <button onClick={logout} style={{ padding: '8px 16px', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#94A3B8', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="navbar-auth-login" style={{ padding: '8px 16px', color: '#94A3B8', fontSize: 14, fontWeight: 500 }}>
                  Log In
                </Link>
                <Link href="/signup" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
                  Sign Up
                </Link>
              </>
            )}
            {/* Mobile menu button */}
            <button
              className="navbar-mobile-btn"
              onClick={() => setMOpen(!mOpen)}
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#fff', fontSize: 18 }}
            >
              {mOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      {mOpen && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, background: '#0F172A', zIndex: 99, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '8px 0', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMOpen(false)}
              style={{ display: 'block', padding: '13px 24px', color: pathname === l.href ? '#DC2626' : '#CBD5E1', fontSize: 15, fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMOpen(false)} style={{ display: 'block', padding: '13px 24px', color: '#CBD5E1', fontSize: 15, fontWeight: 500 }}>Dashboard</Link>
              <button onClick={() => { logout(); setMOpen(false) }} style={{ display: 'block', width: '100%', padding: '13px 24px', background: 'none', border: 'none', color: '#DC2626', fontSize: 15, fontWeight: 500, textAlign: 'left', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMOpen(false)} style={{ display: 'block', padding: '13px 24px', color: '#CBD5E1', fontSize: 15, fontWeight: 500 }}>Log In</Link>
              <Link href="/signup" onClick={() => setMOpen(false)} style={{ display: 'block', padding: '13px 24px', color: '#DC2626', fontSize: 15, fontWeight: 700 }}>Sign Up Free →</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media(max-width:640px){
          .navbar-links{display:none!important;}
          .navbar-mobile-btn{display:inline-flex!important;}
          .navbar-auth-login{display:none!important;}
        }
      `}</style>
    </>
  )
}
