'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', topic:'Course Enquiry', message:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!form.name || !form.email || !form.message) { setError('Name, email and message are required.'); return }
    setLoading(true)
    const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
    setLoading(false)
    if (!res.ok) { setError('Failed to send. Please try again.'); return }
    setSuccess(true)
  }

  const inp = { width:'100%', padding:'12px 14px', border:'1.5px solid #E5E7EB', borderRadius:10, fontSize:14, outline:'none', boxSizing:'border-box' as const, fontFamily:'inherit' }

  return (
    <>
      <Navbar />

      {/* HERO — signboard bg */}
      <div style={{ position:'relative', overflow:'hidden', minHeight:300, display:'flex', alignItems:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/signboard-2.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(10,14,26,0.95),rgba(10,14,26,0.75))' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'80px 24px', width:'100%' }}>
          <div style={{ color:'#F87171', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:12 }}>GET IN TOUCH</div>
          <h1 style={{ fontSize:52, fontWeight:900, color:'#fff', marginBottom:12 }}>Contact Us</h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:17 }}>We reply within 24 hours · WhatsApp preferred</p>
        </div>
      </div>

      <div style={{ background:'#F8FAFC', padding:'80px 0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
          <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:48 }}>

            {/* Info */}
            <div>
              <h2 style={{ fontSize:28, fontWeight:900, color:'#0F172A', marginBottom:8 }}>Let&apos;s Talk</h2>
              <p style={{ color:'#6B7280', fontSize:15, lineHeight:1.7, marginBottom:32 }}>Questions about programs? Want to visit the academy? Reach out — Upanshu&apos;s team responds fast.</p>

              {[['📞','Call / WhatsApp','+91 92890 70030','https://wa.me/919289070030'],['📧','Email','info@equityify.in','mailto:info@equityify.in'],['📍','Address','669C/7 Govindpuri Kalkaji, Nearby Vijay Sales, New Delhi 110019',null],['⏰','Hours','Mon–Sat: 10 AM – 7 PM',null]].map(([icon,label,value,href]) => (
                <div key={label as string} style={{ display:'flex', gap:16, marginBottom:24, alignItems:'flex-start' }}>
                  <div style={{ width:48, height:48, background:'rgba(220,38,38,0.1)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize:11, color:'#94A3B8', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{label}</div>
                    {href ? <a href={href as string} target="_blank" rel="noreferrer" style={{ fontSize:15, fontWeight:700, color:'#DC2626', textDecoration:'none' }}>{value}</a>
                      : <div style={{ fontSize:14, fontWeight:600, color:'#0F172A', lineHeight:1.5 }}>{value}</div>}
                  </div>
                </div>
              ))}

              {/* Office photo */}
              <div style={{ borderRadius:16, overflow:'hidden', height:180, marginTop:8, position:'relative' }}>
                <img src="/images/signboard-1.jpg" alt="Equityify Office" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(transparent 50%,rgba(0,0,0,0.7))' }} />
                <div style={{ position:'absolute', bottom:12, left:14, color:'#fff', fontWeight:700, fontSize:13 }}>📍 Equityify Trading Academy — New Delhi</div>
              </div>
            </div>

            {/* Form */}
            <div style={{ background:'#fff', borderRadius:24, padding:40, boxShadow:'0 4px 24px rgba(0,0,0,0.07)' }}>
              {success ? (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
                  <h3 style={{ fontSize:24, fontWeight:900, color:'#0F172A', marginBottom:8 }}>Message Sent!</h3>
                  <p style={{ color:'#6B7280', fontSize:15, lineHeight:1.7, marginBottom:24 }}>Thank you! Upanshu&apos;s team will respond within 24 hours.</p>
                  <button onClick={() => { setSuccess(false); setForm({ name:'', email:'', phone:'', topic:'Course Enquiry', message:'' }) }}
                    style={{ background:'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', border:'none', borderRadius:10, padding:'12px 28px', fontSize:14, fontWeight:700, cursor:'pointer' }}>Send Another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize:22, fontWeight:900, color:'#0F172A', marginBottom:24 }}>Send a Message</h3>
                  {error && <div style={{ background:'#FEE2E2', color:'#DC2626', padding:'10px 14px', borderRadius:8, fontSize:13, marginBottom:16, fontWeight:600 }}>⚠️ {error}</div>}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                    <div><label style={{ fontSize:11, fontWeight:700, color:'#374151', display:'block', marginBottom:5, textTransform:'uppercase' }}>Name *</label><input value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your name" style={inp} /></div>
                    <div><label style={{ fontSize:11, fontWeight:700, color:'#374151', display:'block', marginBottom:5, textTransform:'uppercase' }}>Phone</label><input value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" style={inp} /></div>
                  </div>
                  <div style={{ marginBottom:14 }}><label style={{ fontSize:11, fontWeight:700, color:'#374151', display:'block', marginBottom:5, textTransform:'uppercase' }}>Email *</label><input value={form.email} onChange={e => setForm({...form,email:e.target.value})} type="email" placeholder="your@email.com" style={inp} /></div>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:'#374151', display:'block', marginBottom:5, textTransform:'uppercase' }}>Topic</label>
                    <select value={form.topic} onChange={e => setForm({...form,topic:e.target.value})} style={inp}>
                      {['Course Enquiry','Batch Schedule','Fees & Payment','Technical Analysis','General Enquiry'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom:24 }}><label style={{ fontSize:11, fontWeight:700, color:'#374151', display:'block', marginBottom:5, textTransform:'uppercase' }}>Message *</label><textarea value={form.message} onChange={e => setForm({...form,message:e.target.value})} rows={5} placeholder="Tell us what you'd like to know..." style={{...inp, resize:'vertical'}} /></div>
                  <button onClick={handleSubmit} disabled={loading} style={{ width:'100%', background:loading?'#9CA3AF':'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', border:'none', borderRadius:10, padding:'14px', fontSize:15, fontWeight:700, cursor:loading?'not-allowed':'pointer', boxShadow:'0 4px 15px rgba(220,38,38,0.3)' }}>
                    {loading?'Sending…':'Send Message →'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
    </>
  )
}
