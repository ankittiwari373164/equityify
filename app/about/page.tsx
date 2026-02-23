'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 12 }}>About Equityify</h1>
        <p style={{ color: '#94A3B8', fontSize: 16 }}>A decade of expertise, thousands of students transformed</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        {/* Founder */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 80 }}>
          <div>
            <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 24, padding: 40, textAlign: 'center' }}>
              <div style={{ width: 100, height: 100, background: 'linear-gradient(135deg,#DC2626,#B91C1C)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, margin: '0 auto 20px' }}>👨‍💼</div>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 24, marginBottom: 6 }}>Upanshu Asra</h2>
              <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Founder & Lead Educator</p>
              <div className="about-creds-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['🏦', 'American Express'], ['💼', 'NTT Data'], ['📜', 'NISM Certified'], ['📅', 'Since 2014']].map(([icon, label]) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
                    <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>OUR STORY</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0F172A', marginBottom: 20, lineHeight: 1.2 }}>Built by a trader, for traders</h2>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 18 }}>
              Equityify was founded in 2014 by Upanshu Asra with a simple mission: bring institutional-quality financial education to every Indian who wants to understand markets.
            </p>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 18 }}>
              With 7+ years of experience at American Express and NTT Data as a Financial Analyst, Upanshu brings real-world corporate trading knowledge to his teaching — not just theory from textbooks.
            </p>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 28 }}>
              Today, Equityify has helped 3,200+ students across India learn Technical Analysis, Fundamental Analysis, Cryptocurrency trading, and NISM certification preparation.
            </p>
            <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 700 }}>
              Start Learning →
            </Link>
          </div>
        </div>

        {/* Values */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0F172A', marginBottom: 12 }}>Our Values</h2>
          <p style={{ color: '#6B7280', fontSize: 16 }}>What drives everything we do</p>
        </div>
        <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 80 }}>
          {[
            ['🎯', 'Practical Education', 'Every concept is taught with live market examples, not just theory. If you can\'t apply it in real markets, we haven\'t done our job.'],
            ['🤝', 'Student Success', 'We measure our success by your success. Our programs are designed to produce real results — better trading decisions and stronger financial knowledge.'],
            ['💡', 'Transparency', 'No fake signals, no guaranteed returns, no misleading claims. Just honest education about how markets really work.'],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ background: '#F8FAFC', borderRadius: 16, padding: 28, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 17, color: '#0F172A', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', borderRadius: 24, padding: 48, textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 32, marginBottom: 12 }}>Join the Equityify Family</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 28 }}>Start with a free demo class — no commitment, no payment required.</p>
          <Link href="/signup" style={{ display: 'inline-block', padding: '14px 36px', background: '#fff', color: '#DC2626', borderRadius: 12, fontSize: 16, fontWeight: 800 }}>
            Sign Up Free →
          </Link>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:900px){.about-grid{grid-template-columns:1fr!important;}.values-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:640px){.values-grid{grid-template-columns:1fr!important;}.about-creds-grid{grid-template-columns:1fr 1fr!important;}}
      `}</style>
    </>
  )
}
