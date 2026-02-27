'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICES } from '@/data/seed'

function fmt(n: number) { return n.toLocaleString('en-IN') }

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/courses?action=list').then(r => r.json()).catch(() => ({ data: [] })),
      fetch('/api/blog?action=list').then(r => r.json()).catch(() => ({ data: [] })),
    ]).then(([c, b]) => {
      if (c.data) setCourses(c.data)
      if (b.data) setBlogs(b.data)
      setLoading(false)
    })
  }, [])

  const liveCourses = courses.filter((c: any) => c.is_live)
  const freeCourse = courses.find((c: any) => c.is_free)

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── real trading setup bg */}
        <section style={{ position:'relative', minHeight:'92vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/setup-front.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(10,14,26,0.93) 0%,rgba(10,14,26,0.75) 60%,rgba(10,14,26,0.5) 100%)' }} />
          {/* animated chart lines overlay */}
          <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(220,38,38,0.03) 60px,rgba(220,38,38,0.03) 61px),repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(255,255,255,0.02) 80px,rgba(255,255,255,0.02) 81px)' }} />

          <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'0 24px', width:'100%' }}>
            <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
              <div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(220,38,38,0.15)', border:'1px solid rgba(220,38,38,0.4)', borderRadius:20, padding:'7px 16px', marginBottom:24 }}>
                  <span style={{ width:7, height:7, background:'#DC2626', borderRadius:'50%', boxShadow:'0 0 8px #DC2626' }} />
                  <span style={{ color:'#F87171', fontSize:13, fontWeight:700 }}>Live Classes Running — Delhi NCR</span>
                </div>
                <h1 style={{ fontSize:58, fontWeight:900, color:'#fff', lineHeight:1.05, marginBottom:20, letterSpacing:'-1.5px' }}>
                  Master the<br />
                  <span style={{ background:'linear-gradient(135deg,#DC2626,#F87171)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Stock Market</span><br />
                  Like a Pro
                </h1>
                <p style={{ fontSize:17, color:'#94A3B8', lineHeight:1.8, marginBottom:36, maxWidth:500 }}>
                  Learn from Upanshu Asra — Financial Analyst at American Express with 7+ years of institutional experience. Real setups, live trading, zero fluff.
                </p>
                <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                  <Link href="/programs" style={{ padding:'14px 30px', background:'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none', boxShadow:'0 8px 30px rgba(220,38,38,0.4)' }}>View Programs →</Link>
                  <Link href="/contact" style={{ padding:'14px 30px', background:'rgba(255,255,255,0.08)', color:'#fff', borderRadius:12, fontSize:15, fontWeight:600, border:'1px solid rgba(255,255,255,0.15)', textDecoration:'none', backdropFilter:'blur(8px)' }}>📞 Talk to Us</Link>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:44 }}>
                  {[['3,200+','Students'],['7+ Yrs','Corporate Exp.'],['NISM','Certified']].map(([v,l]) => (
                    <div key={l} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'16px', backdropFilter:'blur(8px)' }}>
                      <div style={{ fontSize:20, fontWeight:900, color:'#fff' }}>{v}</div>
                      <div style={{ fontSize:12, color:'#64748B', marginTop:4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* floating card */}
              <div className="hero-card-col" style={{ position:'relative', height:500 }}>
                <div style={{ position:'absolute', top:0, right:0, width:'85%', background:'rgba(15,23,42,0.7)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:24, padding:28, boxShadow:'0 30px 80px rgba(0,0,0,0.5)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
                    <img src="/images/upanshu.png" alt="Upanshu Asra" style={{ width:52, height:52, borderRadius:'50%', objectFit:'cover', border:'2px solid #DC2626' }} />
                    <div>
                      <div style={{ color:'#fff', fontWeight:800, fontSize:15 }}>Upanshu Asra</div>
                      <div style={{ color:'#DC2626', fontSize:12, fontWeight:600 }}>Financial Analyst & Founder</div>
                    </div>
                    <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:5, background:'rgba(220,38,38,0.15)', border:'1px solid rgba(220,38,38,0.3)', borderRadius:20, padding:'4px 10px' }}>
                      <span style={{ width:5, height:5, background:'#DC2626', borderRadius:'50%', boxShadow:'0 0 6px #DC2626' }} />
                      <span style={{ color:'#DC2626', fontSize:10, fontWeight:700 }}>LIVE</span>
                    </div>
                  </div>
                  {[['Candlestick Patterns',92],['Chart Analysis',88],['Fundamental Analysis',78],['Crypto Markets',85]].map(([l,w]) => (
                    <div key={l as string} style={{ marginBottom:10 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                        <span style={{ color:'#94A3B8', fontSize:12 }}>{l}</span>
                        <span style={{ color:'#fff', fontSize:12, fontWeight:600 }}>{w}%</span>
                      </div>
                      <div style={{ height:5, background:'rgba(255,255,255,0.06)', borderRadius:3 }}>
                        <div style={{ height:'100%', width:`${w}%`, background:'linear-gradient(90deg,#DC2626,#F87171)', borderRadius:3, boxShadow:'0 0 8px rgba(220,38,38,0.5)' }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop:20, padding:'14px', background:'rgba(220,38,38,0.1)', border:'1px solid rgba(220,38,38,0.2)', borderRadius:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ color:'#94A3B8', fontSize:12 }}>Next Batch Starting</div>
                    <div style={{ color:'#DC2626', fontWeight:800, fontSize:14 }}>Enroll Now →</div>
                  </div>
                </div>
                <div style={{ position:'absolute', bottom:30, left:0, background:'rgba(15,23,42,0.85)', backdropFilter:'blur(16px)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:16, padding:'14px 20px', boxShadow:'0 10px 40px rgba(0,0,0,0.4)' }}>
                  <div style={{ color:'#94A3B8', fontSize:11, marginBottom:4 }}>Students Trained</div>
                  <div style={{ fontSize:28, fontWeight:900, color:'#fff' }}>3,200+</div>
                  <div style={{ fontSize:12, color:'#22C55E', marginTop:2 }}>↑ Growing every month</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ background:'#0F172A', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'24px 0' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
            <div className="stats-row" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
              {[['🎓','3,200+','Students Trained'],['📅','7+','Years Experience'],['🏢','Amex & NTT','Corporate Background'],['🏆','NISM','Certified Trainer']].map(([icon,v,l]) => (
                <div key={l as string} style={{ textAlign:'center', padding:'14px 0', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize:24, fontWeight:900, color:'#fff' }}>{icon} {v}</div>
                  <div style={{ fontSize:12, color:'#64748B', marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROGRAMS ── */}
        <section style={{ position:'relative', padding:'80px 0', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/trading-desk-1.jpg)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.07 }} />
          <div style={{ position:'absolute', inset:0, background:'#fff' }} style={{ opacity:0.93 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <div style={{ color:'#DC2626', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:10 }}>OUR PROGRAMS</div>
              <h2 style={{ fontSize:42, fontWeight:900, color:'#0F172A' }}>Programs by <span style={{ color:'#DC2626' }}>Upanshu Asra</span></h2>
            </div>
            {freeCourse && (
              <div style={{ background:'linear-gradient(135deg,#16A34A,#15803D)', borderRadius:16, padding:'20px 28px', marginBottom:32, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, boxShadow:'0 8px 30px rgba(22,163,74,0.3)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:28 }}>🎓</span>
                  <div>
                    <div style={{ color:'#fff', fontWeight:800, fontSize:16 }}>{freeCourse.title}</div>
                    <div style={{ color:'rgba(255,255,255,0.7)', fontSize:13 }}>{freeCourse.subtitle || 'Experience Equityify before committing.'}</div>
                  </div>
                </div>
                <Link href={`/programs?id=${freeCourse.id}`} style={{ background:'#fff', color:'#16A34A', borderRadius:10, padding:'10px 24px', fontSize:14, fontWeight:700, textDecoration:'none' }}>Join Free →</Link>
              </div>
            )}
            <div className="programs-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
              {loading ? [1,2,3,4].map(i => <div key={i} style={{ background:'#F1F5F9', borderRadius:16, height:180 }} />) :
                courses.filter((c:any) => !c.is_free).slice(0,4).map((c:any) => (
                  <div key={c.id} className="card-hover" style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div style={{ background:'linear-gradient(135deg,#0F172A,#1E293B)', padding:'20px 24px', display:'flex', gap:16, alignItems:'flex-start', position:'relative' }}>
                      {c.is_live && <div style={{ position:'absolute', top:12, right:12, display:'flex', alignItems:'center', gap:4, background:'rgba(220,38,38,0.2)', border:'1px solid rgba(220,38,38,0.4)', borderRadius:20, padding:'3px 10px' }}><span style={{ width:5, height:5, background:'#DC2626', borderRadius:'50%' }} /><span style={{ color:'#DC2626', fontSize:10, fontWeight:700 }}>LIVE</span></div>}
                      <div style={{ fontSize:40 }}>{c.thumbnail}</div>
                      <div>
                        <h3 style={{ color:'#fff', fontWeight:800, fontSize:16, marginBottom:2 }}>{c.title}</h3>
                        <div style={{ color:'#64748B', fontSize:13 }}>{c.subtitle}</div>
                        {c.is_live && c.live_days && <div style={{ color:'#F87171', fontSize:12, marginTop:6, fontWeight:600 }}>📅 {c.live_days} · {c.live_time}–{c.live_end_time}</div>}
                      </div>
                    </div>
                    <div style={{ padding:'16px 24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div>
                        <span style={{ fontSize:22, fontWeight:900, color:'#0F172A' }}>₹{fmt(c.price)}</span>
                        {c.original_price > 0 && <span style={{ fontSize:13, color:'#94A3B8', textDecoration:'line-through', marginLeft:8 }}>₹{fmt(c.original_price)}</span>}
                      </div>
                      <Link href={`/programs?id=${c.id}`} style={{ background:'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', borderRadius:8, padding:'9px 20px', fontSize:13, fontWeight:700, textDecoration:'none' }}>Enroll</Link>
                    </div>
                  </div>
                ))}
            </div>
            <div style={{ textAlign:'center', marginTop:36 }}>
              <Link href="/programs" style={{ padding:'13px 32px', border:'2px solid #E2E8F0', color:'#0F172A', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none', display:'inline-block' }}>View All Programs →</Link>
            </div>
          </div>
        </section>

        {/* ── LIVE SESSIONS ── crypto heatmap bg */}
        {liveCourses.length > 0 && (
          <section style={{ position:'relative', padding:'80px 0', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/crypto-heatmap.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
            <div style={{ position:'absolute', inset:0, background:'rgba(10,14,26,0.88)' }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
              <div style={{ textAlign:'center', marginBottom:40 }}>
                <h2 style={{ fontSize:40, fontWeight:900, color:'#fff' }}>Upcoming <span style={{ color:'#7C3AED' }}>Live Sessions</span></h2>
                <p style={{ color:'#64748B', fontSize:15, marginTop:8 }}>Real-time trading with live market analysis</p>
              </div>
              <div className="live-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
                {liveCourses.slice(0,4).map((c:any) => (
                  <div key={c.id} className="card-hover" style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:24 }}>
                    <div style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                      <div style={{ fontSize:40, flexShrink:0 }}>{c.thumbnail}</div>
                      <div style={{ flex:1 }}>
                        <h3 style={{ fontWeight:800, fontSize:16, color:'#fff', marginBottom:4 }}>{c.title}</h3>
                        <div style={{ fontSize:13, color:'#64748B', marginBottom:10 }}>{c.subtitle}</div>
                        {c.live_days && <div style={{ fontSize:13, color:'#F87171', fontWeight:600, marginBottom:4 }}>📅 {c.live_days}</div>}
                        {c.live_time && <div style={{ fontSize:13, color:'#94A3B8', marginBottom:16 }}>🕐 {c.live_time} – {c.live_end_time}</div>}
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <span style={{ fontSize:20, fontWeight:900, color:c.is_free?'#22C55E':'#fff' }}>{c.is_free?'Free':`₹${fmt(c.price)}`}</span>
                          <Link href={`/programs?id=${c.id}`} style={{ background:'linear-gradient(135deg,#7C3AED,#6D28D9)', color:'#fff', borderRadius:8, padding:'8px 18px', fontSize:13, fontWeight:700, textDecoration:'none' }}>Request Seat</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FOUNDER ── real photo */}
        <section style={{ position:'relative', overflow:'hidden', minHeight:520 }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/setup-side.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(10,14,26,0.97) 50%,rgba(10,14,26,0.6) 100%)' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'80px 24px' }}>
            <div className="founder-grid" style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:60, alignItems:'center' }}>
              <div>
                <div style={{ color:'#DC2626', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:16 }}>ABOUT THE FOUNDER</div>
                <h2 style={{ fontSize:48, fontWeight:900, color:'#fff', marginBottom:20, lineHeight:1.1 }}>Mr. Upanshu Asra</h2>
                <p style={{ color:'#94A3B8', fontSize:16, lineHeight:1.85, marginBottom:24 }}>
                  Started his market journey in <strong style={{ color:'#fff' }}>2014 during college</strong> at Delhi University. Built 7+ years of institutional experience at <strong style={{ color:'#fff' }}>American Express</strong> and <strong style={{ color:'#fff' }}>NTT Data</strong> as a Financial & Credit Research Analyst.
                </p>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:32 }}>
                  {['NISM Certified','Frankfurt School','Delhi University','AmEx Alumni','7+ Yrs Exp'].map(tag => (
                    <span key={tag} style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#CBD5E1', fontSize:12, fontWeight:600, padding:'6px 14px', borderRadius:20 }}>{tag}</span>
                  ))}
                </div>
                <Link href="/about" style={{ display:'inline-block', background:'linear-gradient(135deg,#DC2626,#B91C1C)', color:'#fff', borderRadius:10, padding:'12px 28px', fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 6px 20px rgba(220,38,38,0.35)' }}>Read Full Story →</Link>
              </div>

              <div style={{ background:'rgba(15,23,42,0.85)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:24, padding:28, boxShadow:'0 30px 60px rgba(0,0,0,0.5)' }}>
                <div style={{ textAlign:'center', marginBottom:20 }}>
                  <img src="/images/upanshu.png" alt="Upanshu Asra" style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover', objectPosition:'top', border:'3px solid #DC2626', boxShadow:'0 0 0 5px rgba(220,38,38,0.2)', margin:'0 auto 12px', display:'block' }} />
                  <div style={{ color:'#fff', fontWeight:800, fontSize:18 }}>Upanshu Asra</div>
                  <div style={{ color:'#DC2626', fontSize:13, fontWeight:600 }}>Financial Analyst & Founder</div>
                </div>
                {[['🏢','Current','Financial Credit & Research Analyst'],['🏦','Company','American Express'],['📊','Previous','Fund Accounting, NTT Data'],['🎓','Education','B.Com Finance, Delhi University'],['📜','NISM','Research Analyst Certified']].map(([icon,label,value]) => (
                  <div key={label as string} style={{ display:'flex', gap:12, padding:'10px 0', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize:10, color:'#64748B', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</div>
                      <div style={{ fontSize:13, color:'#E2E8F0', fontWeight:600, marginTop:1 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY US ── classroom bg */}
        <section style={{ position:'relative', padding:'80px 0', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/classroom-1.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,14,26,0.93)' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <h2 style={{ fontSize:40, fontWeight:900, color:'#fff', marginBottom:12 }}>Why <span style={{ color:'#DC2626' }}>Equityify?</span></h2>
              <p style={{ color:'#64748B', fontSize:16 }}>Not just theory — real-world skills from someone who lives the market</p>
            </div>
            <div className="why-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {[['🏦','Corporate Experience','Trained at American Express & NTT Data — institutional-grade analysis for retail traders.'],['📜','NISM Certified',"Certified by SEBI's NISM — a qualified Research Analyst."],['🎯','Live Market Classes','Every class includes live charts, real stock picks, and actionable strategies.'],['👥','Small Batches','Limited seats ensure personal attention for every student.'],['📱','Lifetime Support','WhatsApp group, doubt sessions, and market updates after course.'],['🖥️','Real Trading Setup','Learn on a 5-screen professional trading setup — not just slides.']].map(([icon,title,desc]) => (
                <div key={title as string} className="card-hover" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:28 }}>
                  <div style={{ fontSize:32, marginBottom:16 }}>{icon}</div>
                  <h3 style={{ color:'#fff', fontWeight:800, fontSize:17, marginBottom:10 }}>{title as string}</h3>
                  <p style={{ color:'#64748B', fontSize:14, lineHeight:1.7 }}>{desc as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ padding:'80px 0', background:'#F8FAFC' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
              <div>
                <div style={{ color:'#DC2626', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:8 }}>LATEST INSIGHTS</div>
                <h2 style={{ fontSize:38, fontWeight:900, color:'#0F172A' }}>Founder&apos;s <span style={{ color:'#DC2626' }}>Blog</span></h2>
              </div>
              <Link href="/blog" style={{ padding:'10px 22px', border:'2px solid #DC2626', color:'#DC2626', borderRadius:10, fontSize:14, fontWeight:700, textDecoration:'none' }}>All Posts</Link>
            </div>
            <div className="blog-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {loading ? [1,2,3].map(i => <div key={i} style={{ background:'#E2E8F0', borderRadius:16, height:280 }} />) :
                blogs.slice(0,3).map((b:any) => (
                  <Link key={b.id} href="/blog" style={{ textDecoration:'none' }}>
                    <div className="card-hover" style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, overflow:'hidden' }}>
                      {b.image_url
                        ? <img src={b.image_url} alt={b.title} style={{ width:'100%', height:160, objectFit:'cover', display:'block' }} />
                        : <div style={{ background:'linear-gradient(135deg,#0F172A,#1E293B)', height:120, display:'flex', alignItems:'center', justifyContent:'center', fontSize:48 }}>{b.thumbnail}</div>
                      }
                      <div style={{ padding:20 }}>
                        <span style={{ display:'inline-block', background:'rgba(220,38,38,0.08)', color:'#DC2626', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20, marginBottom:10 }}>{b.category}</span>
                        <h3 style={{ fontWeight:800, fontSize:15, color:'#0F172A', marginBottom:8, lineHeight:1.4 }}>{b.title}</h3>
                        <p style={{ fontSize:13, color:'#6B7280', lineHeight:1.6 }}>{(b.excerpt||'').slice(0,90)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              {blogs.length === 0 && !loading && <div style={{ gridColumn:'1/-1', textAlign:'center', padding:40, color:'#94A3B8' }}>No posts yet.</div>}
            </div>
          </div>
        </section>

        {/* ── FACILITY GALLERY ── real office photos */}
        <section style={{ padding:'80px 0', background:'#0F172A' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <div style={{ color:'#DC2626', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:12 }}>OUR FACILITY</div>
              <h2 style={{ fontSize:40, fontWeight:900, color:'#fff', marginBottom:8 }}>Inside <span style={{ color:'#DC2626' }}>Equityify</span></h2>
              <p style={{ color:'#64748B', fontSize:15 }}>Real trading setups · Professional classroom · Delhi NCR · 669C/7 Govindpuri Kalkaji</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gridTemplateRows:'220px 200px', gap:12 }}>
              {[
                { img:'/images/setup-front.jpg', label:'5-Screen Live Trading Setup', col:'1/3', row:'1/2' },
                { img:'/images/classroom-1.jpg', label:'Student Computer Lab', col:'3/4', row:'1/2' },
                { img:'/images/trading-desk-2.jpg', label:'Teaching Setup — Nifty 50', col:'1/2', row:'2/3' },
                { img:'/images/classroom-2.jpg', label:'Equityify Trading Academy', col:'2/3', row:'2/3' },
                { img:'/images/signboard-1.jpg', label:'Our Delhi NCR Office', col:'3/4', row:'2/3' },
              ].map((item,i) => (
                <div key={i} style={{ position:'relative', borderRadius:14, overflow:'hidden', gridColumn:item.col, gridRow:item.row }}>
                  <img src={item.img} alt={item.label} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent,rgba(0,0,0,0.8)', padding:'20px 14px 12px' }}>
                    <div style={{ color:'#fff', fontSize:13, fontWeight:700 }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── signboard bg */}
        <section style={{ position:'relative', padding:'80px 0', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/setup-side.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(220,38,38,0.9),rgba(185,28,28,0.95))' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:800, margin:'0 auto', padding:'0 24px', textAlign:'center' }}>
            <h2 style={{ fontSize:44, fontWeight:900, color:'#fff', marginBottom:16 }}>Start Your Journey Today</h2>
            <p style={{ fontSize:18, color:'rgba(255,255,255,0.8)', marginBottom:36, lineHeight:1.6 }}>Join 3,200+ students. Learn from Delhi&apos;s most experienced trading educator.</p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/signup" style={{ padding:'16px 36px', background:'#fff', color:'#DC2626', borderRadius:12, fontSize:16, fontWeight:800, textDecoration:'none' }}>Join Free →</Link>
              <Link href="/contact" style={{ padding:'16px 36px', background:'rgba(255,255,255,0.12)', color:'#fff', borderRadius:12, fontSize:16, fontWeight:700, border:'1px solid rgba(255,255,255,0.3)', textDecoration:'none' }}>📞 Talk to Us</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){.hero-grid,.founder-grid,.why-grid{grid-template-columns:1fr!important;}.hero-card-col{display:none!important;}.live-grid,.programs-grid,.blog-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:640px){.stats-row,.live-grid,.programs-grid,.blog-grid{grid-template-columns:1fr!important;}}
        .card-hover{transition:transform 0.2s,box-shadow 0.2s}.card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.15)}
      `}</style>
    </>
  )
}
