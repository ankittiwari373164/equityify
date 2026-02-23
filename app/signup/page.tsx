'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function SignupPage() {
  const [step, setStep] = useState<'form'|'otp'>('form')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [otpInput, setOtpInput] = useState('')
  const [pendingOtp, setPendingOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otpError, setOtpError] = useState('')
  const router = useRouter()

  const sendOtpEmail = async (email: string, otp: string, name: string) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey || publicKey === 'your_emailjs_public_key') return false
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: serviceId, template_id: templateId, user_id: publicKey, template_params: { to_email: email, to_name: name, otp_code: otp } })
      })
      return res.ok
    } catch { return false }
  }

  const handleSignup = async () => {
    setError('')
    const { name, email, phone, password } = form
    if (!name || !email || !phone || !password) { setError('All fields are required.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    const res = await fetch('/api/auth?action=signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    })
    const data = await res.json()
    if (!res.ok) { setLoading(false); setError(data.message || 'Signup failed.'); return }
    setPendingOtp(data.otp)
    const sent = await sendOtpEmail(email, data.otp, name)
    setLoading(false)
    setStep('otp')
    if (!sent) alert(`📧 Email not configured. Your OTP is: ${data.otp}\n(Add EmailJS keys to .env.local to send real emails)`)
  }

  const verifyOtp = async () => {
    setOtpError('')
    if (!otpInput || otpInput.length < 6) { setOtpError('Enter the 6-digit code.'); return }
    setLoading(true)
    const res = await fetch('/api/auth?action=verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, otp: otpInput.trim() })
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setOtpError(data.message || 'Incorrect code.'); return }
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
            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 24, marginBottom: 6 }}>{step === 'form' ? 'Create Account' : 'Verify Email'}</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{step === 'form' ? 'Join 3,200+ students on Equityify' : `Code sent to ${form.email}`}</p>
          </div>

          <div style={{ padding: 32 }}>
            {step === 'otp' ? (
              <>
                {otpError && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>⚠️ {otpError}</div>}
                <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20, lineHeight: 1.6 }}>Enter the 6-digit verification code we sent to your email.</p>
                <input value={otpInput} onChange={e => setOtpInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && verifyOtp()}
                  placeholder="000000" maxLength={6}
                  style={{ width: '100%', padding: '16px', border: '2px solid #E5E7EB', borderRadius: 8, fontSize: 28, outline: 'none', boxSizing: 'border-box', textAlign: 'center', letterSpacing: 12, fontWeight: 800, marginBottom: 16 }} />
                <button onClick={verifyOtp} disabled={loading}
                  style={{ width: '100%', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 12 }}>
                  {loading ? 'Verifying…' : '✓ Verify & Create Account'}
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep('form')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer' }}>← Change email</button>
                  <button onClick={handleSignup} disabled={loading} style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Resend Code</button>
                </div>
              </>
            ) : (
              <>
                {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>⚠️ {error}</div>}
                {[['Full Name *', 'name', 'text', 'Your full name'], ['Email *', 'email', 'email', 'your@gmail.com'], ['Phone * (Mandatory)', 'phone', 'tel', '+91 98765 43210'], ['Password *', 'password', 'password', 'Min. 6 characters']].map(([label, key, type, ph]) => (
                  <div key={key} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
                    <input value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} type={type} placeholder={ph}
                      style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: '8px 12px', marginBottom: 16, fontSize: 13, color: '#166534' }}>
                  📧 A verification code will be sent to your email
                </div>
                <button onClick={handleSignup} disabled={loading}
                  style={{ width: '100%', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 16 }}>
                  {loading ? 'Sending code…' : 'Continue →'}
                </button>
                <p style={{ textAlign: 'center', fontSize: 14, color: '#6B7280' }}>
                  Already have an account?{' '}
                  <Link href="/login" style={{ color: '#DC2626', fontWeight: 700 }}>Log In</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
