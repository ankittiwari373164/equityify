'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICES } from '@/data/seed'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      {/* HERO */}
      <div style={{ position:'relative', overflow:'hidden', minHeight:320, display:'flex', alignItems:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/trading-desk-2.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(10,14,26,0.95),rgba(220,38,38,0.35))' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'80px 24px', width:'100%' }}>
          <div style={{ color:'#F87171', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:12 }}>WHAT WE OFFER</div>
          <h1 style={{ fontSize:52, fontWeight:900, color:'#fff', marginBottom:16, lineHeight:1.1 }}>Our Services</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:17, maxWidth:540 }}>Everything you need to succeed in stock markets — under one roof in Delhi NCR</p>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ background:'#F8FAFC', padding:'80px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
          <div className="services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28 }}>
            {SERVICES.map((s:any) => (
              <div key={s.title} className="card-hover" style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:20, overflow:'hidden' }}>
                <div style={{ height:6, background:`linear-gradient(90deg,${s.color},${s.color}88)` }} />
                <div style={{ padding:32 }}>
                  <div style={{ width:60, height:60, background:s.color+'18', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, marginBottom:20 }}>{s.icon}</div>
                  <h3 style={{ fontWeight:800, fontSize:18, color:'#0F172A', marginBottom:12 }}>{s.title}</h3>
                  <p style={{ fontSize:14, color:'#6B7280', lineHeight:1.8 }}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY REAL SETUP MATTERS — 5-screen setup bg */}
      <div style={{ position:'relative', overflow:'hidden', padding:'80px 0' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/setup-front.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,14,26,0.9)' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#fff', marginBottom:8 }}>Learn on <span style={{ color:'#DC2626' }}>Real Equipment</span></h2>
            <p style={{ color:'#64748B', fontSize:15 }}>Not just slides — a 5-screen professional trading setup in our Delhi NCR office</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            {[
              { img:'/images/crypto-heatmap.jpg', label:'Real-time Crypto Heatmap Analysis' },
              { img:'/images/trading-desk-1.jpg', label:'Live Nifty 50 & BankNifty Charts' },
              { img:'/images/classroom-1.jpg', label:'Student Computer Lab' },
              { img:'/images/classroom-2.jpg', label:'Professional Classroom Setup' },
            ].map((item,i) => (
              <div key={i} style={{ borderRadius:16, overflow:'hidden', position:'relative', height:200 }}>
                <img src={item.img} alt={item.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(transparent 50%,rgba(0,0,0,0.8))' }} />
                <div style={{ position:'absolute', bottom:12, left:14, color:'#fff', fontSize:13, fontWeight:700 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position:'relative', overflow:'hidden', padding:'80px 24px', textAlign:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/signboard-3.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,14,26,0.92)' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:700, margin:'0 auto' }}>
          <h2 style={{ color:'#fff', fontWeight:900, fontSize:40, marginBottom:16 }}>Ready to Start?</h2>
          <p style={{ color:'#94A3B8', fontSize:16, marginBottom:36, lineHeight:1.7 }}>Join our next batch. Experience a free demo class first — no commitment needed.</p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/programs" style={{ padding:'14px 32px', background:'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none', boxShadow:'0 8px 25px rgba(220,38,38,0.4)' }}>View Programs →</Link>
            <Link href="/contact" style={{ padding:'14px 32px', background:'rgba(255,255,255,0.08)', color:'#fff', borderRadius:12, fontSize:15, fontWeight:600, border:'1px solid rgba(255,255,255,0.2)', textDecoration:'none' }}>Contact Us</Link>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:900px){.services-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:640px){.services-grid{grid-template-columns:1fr!important;}}
        .card-hover{transition:transform 0.2s,box-shadow 0.2s}.card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.1)}
      `}</style>
    </>
  )
}
