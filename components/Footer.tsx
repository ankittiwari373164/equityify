import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '60px 0 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#DC2626,#B91C1C)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📈</div>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>Equityify</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20, color: '#64748B' }}>
              Professional stock market education by Upanshu Asra. 7+ years experience, AmEx & NTT certified, NISM qualified.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['📞', '📧', '💬'].map((icon, i) => (
                <a key={i} href={i === 0 ? 'tel:+919289070030' : i === 1 ? 'mailto:equityify.in@gmail.com' : 'https://wa.me/919289070030'}
                  style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Quick Links</h4>
            {[['Home', '/'], ['Programs', '/programs'], ['Services', '/services'], ['About', '/about'], ['Blog', '/blog']].map(([l, h]) => (
              <Link key={l} href={h} style={{ display: 'block', fontSize: 14, color: '#64748B', marginBottom: 10, transition: 'color 0.2s' }}>{l}</Link>
            ))}
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Programs</h4>
            {['Free Demo Class', 'Technical Analysis', 'Fundamental Analysis', 'NISM Career Plan', 'Crypto Trading'].map(p => (
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

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#475569' }}>© 2025 Equityify. All rights reserved. Est. 2014.</p>
          <p style={{ fontSize: 13, color: '#475569' }}>⚠️ Trading involves risk. Educational purposes only.</p>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .footer-grid{grid-template-columns:1fr 1fr!important;} }
        @media(max-width:640px){ .footer-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </footer>
  )
}
