'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICES } from '@/data/seed'

function fmt(n: number) { return n.toLocaleString('en-IN') }

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/courses?action=list')
      .then(r => r.json())
      .then(d => { if (d.data) setCourses(d.data) })
      .catch(() => {})
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#0F172A 100%)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%,rgba(220,38,38,0.08) 0%,transparent 60%),radial-gradient(circle at 80% 20%,rgba(37,99,235,0.06) 0%,transparent 50%)' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 1 }}>
            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 20, padding: '6px 14px', marginBottom: 24 }}>
                  <span style={{ width: 6, height: 6, background: '#DC2626', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                  <span style={{ color: '#DC2626', fontSize: 13, fontWeight: 600 }}>Professional Stock Market Education — Est. 2014</span>
                </div>
                <h1 style={{ fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
                  Master the{' '}
                  <span style={{ background: 'linear-gradient(135deg,#DC2626,#F87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Stock Market</span>{' '}
                  Like a Pro
                </h1>
                <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
                  Learn from a real Financial Analyst with 7+ years at American Express & NTT Data. Institutional-quality education for serious learners.
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link href="/programs" style={{ padding: '14px 28px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 700, boxShadow: '0 8px 25px rgba(220,38,38,0.35)' }}>View Programs →</Link>
                  <Link href="/programs" style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)' }}>🎓 Free Demo</Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 48 }}>
                  {[['2014', 'Journey Started'], ['7+ Yrs', 'Institutional Exp.'], ['NISM', 'Certified']].map(([v, l]) => (
                    <div key={l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px' }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{v}</div>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-cards" style={{ position: 'relative', height: 480 }}>
                <div className="animate-float1" style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 24, width: 280 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#DC2626,#B91C1C)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📊</div>
                    <div><div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Technical Analysis</div><div style={{ color: '#94A3B8', fontSize: 12 }}>Live Program</div></div>
                  </div>
                  {[['Candlesticks', 80], ['Indicators', 65], ['Chart Patterns', 90]].map(([label, w]) => (
                    <div key={label} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: '#64748B', fontSize: 11 }}>{label}</span>
                        <span style={{ color: '#94A3B8', fontSize: 11 }}>{w}%</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                        <div style={{ height: '100%', width: `${w}%`, background: 'linear-gradient(90deg,#DC2626,#F87171)', borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="animate-float2" style={{ position: 'absolute', bottom: 80, left: 0, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, width: 220 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 8 }}>Total Students</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#fff' }}>3,200+</div>
                  <div style={{ fontSize: 13, color: '#22C55E', marginTop: 4 }}>↑ 24% this month</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '28px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
              {[['🎓', '3,200+', 'Students Trained'], ['📅', '7+', 'Years Experience'], ['📚', '4', 'Live Programs'], ['🏆', 'NISM', 'Certified Trainer']].map(([icon, v, l]) => (
                <div key={l} style={{ textAlign: 'center', padding: '12px 0', borderRight: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A' }}>{icon} {v}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAMS — live from DB */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>OUR PROGRAMS</div>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0F172A' }}>Programs by <span style={{ color: '#DC2626' }}>Upanshu Asra</span></h2>
            </div>
            <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
              {courses.length === 0 && [1,2,3,4].map(i => (
                <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', animation: 'pulse 1.5s ease-in-out infinite' }}>
                  <div style={{ background: '#E2E8F0', height: 160 }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ background: '#E2E8F0', height: 16, borderRadius: 6, marginBottom: 10 }} />
                    <div style={{ background: '#E2E8F0', height: 12, borderRadius: 6, width: '60%', marginBottom: 16 }} />
                    <div style={{ background: '#E2E8F0', height: 36, borderRadius: 8 }} />
                  </div>
                </div>
              ))}
              {courses.slice(0, 4).map((c: any) => (
                <div key={c.id} className="card-hover" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '28px 20px', textAlign: 'center', position: 'relative' }}>
                    {c.badge && <div style={{ position: 'absolute', top: 12, right: 12, background: c.is_free ? '#16A34A' : '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{c.badge}</div>}
                    {c.is_live && <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 20, padding: '3px 10px' }}>
                      <span style={{ width: 5, height: 5, background: '#DC2626', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                      <span style={{ color: '#DC2626', fontSize: 10, fontWeight: 700 }}>LIVE</span>
                    </div>}
                    <div style={{ fontSize: 40, marginBottom: 8 }}>{c.thumbnail}</div>
                    <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{c.title}</h3>
                    <p style={{ color: '#64748B', fontSize: 12 }}>{c.subtitle}</p>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 22, fontWeight: 900, color: c.is_free ? '#16A34A' : '#0F172A' }}>{c.is_free ? 'Free' : `₹${fmt(c.price)}`}</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>{c.duration}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 16 }}>{(c.description || '').slice(0, 80)}...</p>
                    <Link href={`/programs?id=${c.id}`} style={{ display: 'block', textAlign: 'center', padding: '10px', background: c.is_free ? 'linear-gradient(135deg,#16A34A,#15803D)' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                      {c.is_free ? 'Join Free' : 'Enroll Now'} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/programs" style={{ padding: '14px 32px', border: '2px solid #E2E8F0', color: '#0F172A', borderRadius: 12, fontSize: 15, fontWeight: 700 }}>View All Programs →</Link>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,#0F172A,#1E293B)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Why <span style={{ color: '#DC2626' }}>Equityify?</span></h2>
              <p style={{ color: '#94A3B8', fontSize: 16 }}>Not just theory — real-world skills from a practitioner who trades every day.</p>
            </div>
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {[['🏦','Corporate Experience','Trained at American Express & NTT Data — institutional-grade analysis skills brought to retail traders.'],['📜','NISM Certified',"Officially certified by SEBI's NISM — a qualified financial market professional."],['🎯','Practical Focus','Every class includes live market analysis, real stock examples, and actionable strategies.'],['👥','Small Batches','Limited seats per batch ensure personal attention for every student.'],['📱','Lifetime Support','WhatsApp group access, doubt sessions, and market updates after your course.'],['💰','Affordable Pricing','Professional education at accessible prices — starting at ₹0 with our free demo.']].map(([icon,title,desc])=>(
                <div key={title as string} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:28 }}>
                  <div style={{ fontSize:32, marginBottom:16 }}>{icon}</div>
                  <h3 style={{ color:'#fff', fontWeight:800, fontSize:17, marginBottom:10 }}>{title}</h3>
                  <p style={{ color:'#64748B', fontSize:14, lineHeight:1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>WHAT WE OFFER</div>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0F172A' }}>Our Services</h2>
            </div>
            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {SERVICES.map((s: any) => (
                <div key={s.title} className="card-hover" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: 28 }}>
                  <div style={{ width: 52, height: 52, background: s.color + '15', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,#DC2626,#B91C1C)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 16 }}>Start Your Journey Today</h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 36, lineHeight: 1.6 }}>Join 3,200+ students who have transformed their financial future with Equityify.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" style={{ padding: '16px 36px', background: '#fff', color: '#DC2626', borderRadius: 12, fontSize: 16, fontWeight: 800 }}>Join Free →</Link>
              <Link href="/contact" style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 12, fontSize: 16, fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)' }}>Talk to Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){.hero-grid,.why-grid,.services-grid{grid-template-columns:1fr 1fr!important;}.hero-cards{display:none!important;}}
        @media(max-width:640px){.hero-grid,.why-grid,.services-grid,.programs-grid,.stats-row{grid-template-columns:1fr!important;}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .animate-float1{animation:float1 4s ease-in-out infinite}
        .animate-float2{animation:float2 3s ease-in-out infinite}
        .card-hover{transition:transform 0.2s,box-shadow 0.2s}
        .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.12)}
      `}</style>
    </>
  )
}