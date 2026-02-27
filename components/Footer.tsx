import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '60px 0 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/images/logo.png" alt="Equityify" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20, color: '#64748B' }}>
              Professional stock market education by Upanshu Asra. 7+ years experience, NISM certified.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="tel:+919289070030" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📞</a>
              <a href="mailto:equityify.in@gmail.com" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📧</a>
              <a href="https://wa.me/919289070030" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💬</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Quick Links</h4>
            {[['Home', '/'], ['Programs', '/programs'], ['Services', '/services'], ['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={l} href={h} style={{ display: 'block', fontSize: 14, color: '#64748B', marginBottom: 10 }}>{l}</Link>
            ))}
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Programs</h4>
            {['Free Demo Class', 'Technical Analysis', 'Fundamental Analysis', 'NISM Career Plan'].map(p => (
              <Link key={p} href="/programs" style={{ display: 'block', fontSize: 14, color: '#64748B', marginBottom: 10 }}>{p}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact</h4>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 10 }}>📞 +91-9289070030</p>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 10 }}>📧 equityify.in@gmail.com</p>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 10 }}>🕐 Mon–Sat, 10AM–7PM</p>
            <p style={{ fontSize: 14, color: '#64748B' }}>📍 New Delhi, India</p>
          </div>
        </div>

        {/* SEBI Disclaimer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 0' }}>
          <div style={{ background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: '18px 22px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>⚠️</span>
              <div>
                <div style={{ color: '#F87171', fontWeight: 700, fontSize: 13, marginBottom: 8, letterSpacing: '0.02em' }}>DISCLAIMER — No SEBI Registration</div>
                <p style={{ color: '#64748B', fontSize: 12, lineHeight: 1.8, margin: 0 }}>
                  Equityify.in is not registered with SEBI as an Investment Adviser or Research Analyst. All content is for educational and informational purposes only and does not constitute investment advice. Please consult a SEBI-registered financial advisor before making any investment decisions. Investing involves risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>© 2025 Equityify.in — All rights reserved. Est. 2014.</p>
          <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>For educational purposes only. Not investment advice.</p>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:640px){.footer-grid{grid-template-columns:1fr!important;}}
        footer a{text-decoration:none;transition:color 0.2s;}
        footer a:hover{color:#fff!important;}
      `}</style>
    </footer>
  )
}
