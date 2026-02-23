'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICES } from '@/data/seed'

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Our Services</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 540, margin: '0 auto' }}>Everything you need to succeed in stock markets — under one roof</p>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {SERVICES.map(s => (
            <div key={s.title} className="card-hover" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: 32 }}>
              <div style={{ width: 60, height: 60, background: s.color + '15', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 18, color: '#0F172A', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.8 }}>{s.description}</p>
            </div>
          ))}
        </div>

        {/* Why choose */}
        <div style={{ marginTop: 60, background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 24, padding: 48, textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 32, marginBottom: 16 }}>Ready to get started?</h2>
          <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>Start with our free demo class and experience Equityify before committing to any program.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/programs" style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 700 }}>View Programs →</a>
            <a href="/contact" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.15)' }}>Contact Us</a>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`@media(max-width:900px){.services-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:640px){.services-grid{grid-template-columns:1fr!important;}}`}</style>
    </>
  )
}
