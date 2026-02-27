'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* HERO — trading setup bg */}
      <div style={{ position:'relative', overflow:'hidden', minHeight:360, display:'flex', alignItems:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/setup-front.jpg)', backgroundSize:'cover', backgroundPosition:'center top' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(10,14,26,0.95),rgba(10,14,26,0.7))' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'80px 24px', width:'100%' }}>
          <div style={{ color:'#F87171', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:12 }}>OUR STORY</div>
          <h1 style={{ fontSize:56, fontWeight:900, color:'#fff', marginBottom:16, lineHeight:1.1 }}>About <span style={{ color:'#DC2626' }}>Equityify</span></h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:17, maxWidth:520 }}>A decade of market expertise. Thousands of students transformed. Delhi NCR's most trusted trading academy.</p>
        </div>
      </div>

      {/* FOUNDER SECTION */}
      <div style={{ background:'#0F172A', padding:'80px 0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
          <div className="about-founder-grid" style={{ display:'grid', gridTemplateColumns:'400px 1fr', gap:60, alignItems:'center' }}>
            {/* Photo card */}
            <div style={{ position:'relative' }}>
              <div style={{ borderRadius:24, overflow:'hidden', boxShadow:'0 30px 80px rgba(0,0,0,0.5)', border:'2px solid rgba(220,38,38,0.3)' }}>
                <img src="/images/upanshu.png" alt="Upanshu Asra" style={{ width:'100%', aspectRatio:'1', objectFit:'cover', objectPosition:'top', display:'block' }} />
              </div>
              <div style={{ position:'absolute', bottom:-20, right:-20, background:'linear-gradient(135deg,#DC2626,#B91C1C)', borderRadius:16, padding:'16px 20px', boxShadow:'0 10px 30px rgba(220,38,38,0.4)' }}>
                <div style={{ color:'#fff', fontWeight:900, fontSize:22 }}>10+</div>
                <div style={{ color:'rgba(255,255,255,0.8)', fontSize:12 }}>Years Trading</div>
              </div>
            </div>

            <div>
              <div style={{ color:'#DC2626', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:12 }}>ABOUT THE FOUNDER</div>
              <h2 style={{ fontSize:44, fontWeight:900, color:'#fff', marginBottom:20, lineHeight:1.2 }}>Mr. Upanshu Asra</h2>
              <p style={{ color:'#94A3B8', fontSize:16, lineHeight:1.9, marginBottom:16 }}>Started his market journey in <strong style={{ color:'#fff' }}>2014 during his college years</strong> at Delhi University. What began as personal curiosity grew into a decade-long professional career in institutional finance.</p>
              <p style={{ color:'#94A3B8', fontSize:16, lineHeight:1.9, marginBottom:24 }}>With 7+ years at <strong style={{ color:'#fff' }}>American Express</strong> as a Financial Credit & Research Analyst, and prior experience at <strong style={{ color:'#fff' }}>NTT Data</strong> in Fund Accounting, Upanshu brings real institutional knowledge to every class — not textbook theory.</p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:32 }}>
                {['NISM Certified','Frankfurt School of Management','Delhi University','American Express','NTT Data','ICICI Direct'].map(tag => (
                  <span key={tag} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#94A3B8', fontSize:12, fontWeight:600, padding:'6px 14px', borderRadius:20 }}>{tag}</span>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
                {[['2014','Journey Started'],['7+ Yrs','Corporate Exp.'],['3,200+','Students']].map(([v,l]) => (
                  <div key={l} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:16, textAlign:'center' }}>
                    <div style={{ fontSize:22, fontWeight:900, color:'#fff' }}>{v}</div>
                    <div style={{ fontSize:12, color:'#64748B', marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREDENTIALS — signboard bg */}
      <div style={{ position:'relative', overflow:'hidden', padding:'80px 0' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/signboard-2.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,14,26,0.92)' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#fff', marginBottom:8 }}>Credentials & <span style={{ color:'#DC2626' }}>Experience</span></h2>
          </div>
          <div className="creds-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {[
              ['🏢','American Express','Financial Credit & Research Analyst','7+ years institutional experience'],
              ['📊','NTT Data','Fund Accounting Analyst','Portfolio management & reporting'],
              ['📜','NISM Certified','Research Analyst','SEBI regulated certification'],
              ['🎓','Delhi University','B.Com Finance','Graduated 2014'],
              ['🏫','Frankfurt School','Financial Management','International certification'],
              ['📈','Trading Since 2014','10+ Years Active','Equity, Crypto, F&O'],
            ].map(([icon,title,role,detail]) => (
              <div key={title as string} className="card-hover" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24 }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{icon}</div>
                <h3 style={{ color:'#fff', fontWeight:800, fontSize:16, marginBottom:4 }}>{title as string}</h3>
                <div style={{ color:'#DC2626', fontSize:13, fontWeight:600, marginBottom:6 }}>{role as string}</div>
                <div style={{ color:'#64748B', fontSize:13 }}>{detail as string}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FACILITY — real photos grid */}
      <div style={{ background:'#F8FAFC', padding:'80px 0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0F172A', marginBottom:8 }}>Our <span style={{ color:'#DC2626' }}>Facility</span></h2>
            <p style={{ color:'#6B7280', fontSize:15 }}>669C/7 Govindpuri Kalkaji, Nearby Vijay Sales, New Delhi 110019</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {[
              { img:'/images/setup-front.jpg', label:'5-Screen Trading Setup' },
              { img:'/images/classroom-1.jpg', label:'Student Computer Lab' },
              { img:'/images/classroom-2.jpg', label:'Trading Classroom' },
              { img:'/images/trading-desk-1.jpg', label:'Live Market Analysis' },
              { img:'/images/office-macbook.jpg', label:'Teaching Station' },
              { img:'/images/signboard-1.jpg', label:'Equityify Trading Academy' },
            ].map((item, i) => (
              <div key={i} style={{ borderRadius:14, overflow:'hidden', position:'relative', height:180 }}>
                <img src={item.img} alt={item.label} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent,rgba(0,0,0,0.75))', padding:'20px 12px 10px' }}>
                  <div style={{ color:'#fff', fontSize:12, fontWeight:700 }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position:'relative', padding:'80px 24px', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/crypto-heatmap.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,14,26,0.92)' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:600, margin:'0 auto' }}>
          <h2 style={{ color:'#fff', fontWeight:900, fontSize:38, marginBottom:16 }}>Learn From the Best</h2>
          <p style={{ color:'#94A3B8', fontSize:16, marginBottom:32, lineHeight:1.7 }}>Join Upanshu's next batch and start your professional trading journey.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/programs" style={{ padding:'14px 32px', background:'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none', boxShadow:'0 8px 25px rgba(220,38,38,0.4)' }}>View Programs →</Link>
            <Link href="/contact" style={{ padding:'14px 32px', background:'rgba(255,255,255,0.08)', color:'#fff', borderRadius:12, fontSize:15, fontWeight:600, border:'1px solid rgba(255,255,255,0.15)', textDecoration:'none' }}>Contact Us</Link>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:900px){.about-founder-grid,.creds-grid{grid-template-columns:1fr!important;}}
        @media(max-width:640px){.creds-grid{grid-template-columns:1fr 1fr!important;}}
        .card-hover{transition:transform 0.2s,box-shadow 0.2s}.card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.15)}
      `}</style>
    </>
  )
}
