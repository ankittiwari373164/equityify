'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'General Enquiry', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!form.name || !form.email || !form.message) { setError('Name, email and message are required.'); return }
    setLoading(true)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.message || 'Failed to send.'); return }
    setSuccess(true)
  }

  return (
    <>
      <Navbar />
      <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Get in Touch</h1>
        <p style={{ color: '#94A3B8', fontSize: 16 }}>Have questions about our programs? We&apos;re here to help.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48 }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginBottom: 24 }}>Contact Information</h2>
            {[
              ['📞', 'Phone / WhatsApp', '+91-9289070030', 'tel:+919289070030'],
              ['📧', 'Email', 'equityify.in@gmail.com', 'mailto:equityify.in@gmail.com'],
              ['💬', 'WhatsApp', 'Chat with us', 'https://wa.me/919289070030'],
              ['🕐', 'Office Hours', 'Mon–Sat, 10AM–7PM', null],
              ['📍', 'Location', 'New Delhi, India', null],
            ].map(([icon, label, value, link]) => (
              <div key={label as string} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, background: '#F1F5F9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 2 }}>{label}</div>
                  {link ? (
                    <a href={link} style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{value}</a>
                  ) : (
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 16, padding: 24, marginTop: 20 }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Quick Links</h3>
              {[['🎓 Free Demo Class', '/programs'], ['📚 View All Programs', '/programs'], ['👤 Create Account', '/signup']].map(([label, href]) => (
                <a key={label as string} href={href as string} style={{ display: 'block', color: '#94A3B8', fontSize: 14, marginBottom: 10 }}>{label}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, border: '1px solid #E2E8F0' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>We&apos;ll get back to you within 24 hours. You can also WhatsApp us at +91-9289070030 for a faster response.</p>
                <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', topic: 'General Enquiry', message: '' }) }}
                  style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 24 }}>Send Us a Message</h2>
                {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>⚠️ {error}</div>}

                <div className="contact-name-email" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Full Name *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Email *</label>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" placeholder="your@email.com"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Phone</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Topic</label>
                    <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}>
                      {['General Enquiry', 'Course Information', 'Payment Query', 'Technical Issue', 'NISM Certification', 'Career Guidance'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help you?"
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>

                <button onClick={handleSubmit} disabled={loading}
                  style={{ width: '100%', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Sending…' : 'Send Message →'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;}}
        @media(max-width:640px){.contact-name-email{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  )
}
