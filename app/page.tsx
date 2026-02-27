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

  const liveCourses = courses.filter((c: any) => c.is_live && c.active !== false)
  const freeCourse = courses.find((c: any) => c.is_free)

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section style={{ background: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#0F172A 100%)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%,rgba(220,38,38,0.08) 0%,transparent 60%),radial-gradient(circle at 80% 20%,rgba(37,99,235,0.06) 0%,transparent 50%)' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 1 }}>
            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 20, padding: '6px 14px', marginBottom: 24 }}>
                  <span style={{ width: 6, height: 6, background: '#DC2626', borderRadius: '50%' }} />
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
                  <Link href="/programs" style={{ padding: '14px 28px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 700, boxShadow: '0 8px 25px rgba(220,38,38,0.35)', textDecoration: 'none' }}>View Programs →</Link>
                  {freeCourse
                    ? <Link href={`/programs?id=${freeCourse.id}`} style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none' }}>🎓 Free Demo</Link>
                    : <Link href="/programs" style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none' }}>🎓 Free Demo</Link>
                  }
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 48 }}>
                  {[['2014', 'Journey Started'], ['7+ Yrs', 'Institutional Exp.'], ['NISM', 'Certified']].map(([v, l]) => (
                    <div key={l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
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
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#fff' }}>{courses.length ? fmt(courses.reduce((a: number, c: any) => a + (c.students_count || 0), 0)) + '+' : '3,200+'}</div>
                  <div style={{ fontSize: 13, color: '#22C55E', marginTop: 4 }}>↑ Growing every month</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────── */}
        <section style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '28px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
              {[['🎓', '3,200+', 'Students Trained'], ['📅', '7+', 'Years Experience'], ['📚', courses.length || '4', 'Live Programs'], ['🏆', 'NISM', 'Certified Trainer']].map(([icon, v, l]) => (
                <div key={l as string} style={{ textAlign: 'center', padding: '12px 0', borderRight: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A' }}>{icon} {v}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROGRAMS BY UPANSHU (fully dynamic) ──────────── */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>OUR PROGRAMS</div>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0F172A' }}>Programs by <span style={{ color: '#DC2626' }}>Upanshu Asra</span></h2>
            </div>

            {/* Free demo banner */}
            {freeCourse && (
              <div style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)', borderRadius: 16, padding: '20px 28px', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 28 }}>🎓</span>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{freeCourse.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{freeCourse.subtitle || 'Experience Equityify before committing.'}</div>
                  </div>
                </div>
                <Link href={`/programs?id=${freeCourse.id}`} style={{ background: '#fff', color: '#16A34A', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>Join Free →</Link>
              </div>
            )}

            {/* Course grid — dynamic from DB */}
            <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
              {loading ? [1,2,3,4].map(i => (
                <div key={i} style={{ background: '#F8FAFC', borderRadius: 16, padding: 24, height: 200, animation: 'pulse 1.5s infinite' }} />
              )) : courses.filter((c: any) => !c.is_free && c.active !== false).slice(0, 4).map((c: any) => (
                <div key={c.id} className="card-hover" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: 24, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 40, flexShrink: 0 }}>{c.thumbnail}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      {c.is_live && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 20, padding: '2px 8px' }}>
                          <span style={{ width: 5, height: 5, background: '#DC2626', borderRadius: '50%' }} />
                          <span style={{ color: '#DC2626', fontSize: 10, fontWeight: 700 }}>LIVE</span>
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginBottom: 2 }}>{c.title}</h3>
                    <div style={{ fontSize: 13, color: '#64748B', marginBottom: 6 }}>{c.subtitle}</div>
                    {c.is_live && c.live_days && (
                      <div style={{ fontSize: 12, color: '#DC2626', fontWeight: 600, marginBottom: 8 }}>
                        📅 {c.live_days} · {c.live_time && c.live_end_time ? `${c.live_time.replace(':','').slice(0,-2)}:${c.live_time.slice(-2)} PM–${c.live_end_time.replace(':','').slice(0,-2)}:${c.live_end_time.slice(-2)} PM` : ''}
                      </div>
                    )}
                    <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 14 }}>{(c.description || '').slice(0, 90)}{c.description?.length > 90 ? '...' : ''}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: 22, fontWeight: 900, color: '#0F172A' }}>₹{fmt(c.price)}</span>
                        {c.original_price > 0 && <span style={{ fontSize: 13, color: '#94A3B8', textDecoration: 'line-through', marginLeft: 8 }}>₹{fmt(c.original_price)}</span>}
                      </div>
                      <Link href={`/programs?id=${c.id}`} style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Request</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {courses.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>No programs available yet.</div>
            )}
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/programs" style={{ padding: '13px 32px', border: '2px solid #E2E8F0', color: '#0F172A', borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>View All Programs →</Link>
            </div>
          </div>
        </section>

        {/* ── UPCOMING LIVE SESSIONS (dynamic) ─────────────── */}
        {liveCourses.length > 0 && (
          <section style={{ padding: '80px 0', background: '#F0F4FF' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2 style={{ fontSize: 38, fontWeight: 900, color: '#0F172A' }}>Upcoming <span style={{ color: '#7C3AED' }}>Live Sessions</span></h2>
              </div>
              <div className="live-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
                {liveCourses.slice(0, 4).map((c: any) => (
                  <div key={c.id} className="card-hover" style={{ background: '#fff', border: '1px solid #E0E7FF', borderRadius: 16, padding: 24, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 40, flexShrink: 0 }}>{c.thumbnail}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginBottom: 2 }}>{c.title}</h3>
                      <div style={{ fontSize: 13, color: '#64748B', marginBottom: 10 }}>{c.subtitle}</div>
                      {c.live_days && <div style={{ fontSize: 13, color: '#DC2626', fontWeight: 600, marginBottom: 4 }}>📅 {c.live_days}</div>}
                      {c.live_time && <div style={{ fontSize: 13, color: '#374151', marginBottom: 14 }}>🕐 {c.live_time} – {c.live_end_time}</div>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 20, fontWeight: 900, color: c.is_free ? '#16A34A' : '#0F172A' }}>{c.is_free ? 'Free' : `₹${fmt(c.price)}`}</span>
                        <Link href={`/programs?id=${c.id}`} style={{ background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Request Seat</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FOUNDER SECTION ──────────────────────────────── */}
        <section style={{ padding: 0, background: '#0F172A', position: 'relative', overflow: 'hidden', minHeight: 480 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
            <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
              <div>
                <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>ABOUT THE FOUNDER</div>
                <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>Mr. Upanshu Asra</h2>
                <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                  Started his market journey in <strong style={{ color: '#fff' }}>2014 during college</strong> at Delhi University. 7+ years at{' '}
                  <strong style={{ color: '#fff' }}>American Express</strong> and <strong style={{ color: '#fff' }}>NTT Data</strong> as a financial analyst.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                  {['NISM Certified', 'Frankfurt School', 'Delhi University', '7+ Yrs Exp'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#CBD5E1', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 20 }}>{tag}</span>
                  ))}
                </div>
                <Link href="/about" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Read Full Story →</Link>
              </div>

              {/* Profile card */}
              <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 32 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '3px solid #DC2626', boxShadow: '0 0 0 4px rgba(220,38,38,0.2)' }}>👨‍💼</div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>Upanshu Asra</div>
                  <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 600 }}>Financial Analyst & Founder</div>
                </div>
                {[
                  ['🏢', 'Current', 'Financial Credit & Research Analyst'],
                  ['🏦', 'Company', 'American Express'],
                  ['📊', 'Previous', 'Fund Accounting, NTT Data'],
                  ['🎓', 'Education', 'B.Com Finance, Delhi University'],
                  ['📜', 'NISM', 'Research Analyst Certified'],
                ].map(([icon, label, value]) => (
                  <div key={label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                      <div style={{ fontSize: 14, color: '#E2E8F0', fontWeight: 600, marginTop: 2 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY US ───────────────────────────────────────── */}
        <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,#0F172A,#1E293B)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Why <span style={{ color: '#DC2626' }}>Equityify?</span></h2>
              <p style={{ color: '#94A3B8', fontSize: 16 }}>Not just theory — real-world skills from a practitioner who trades every day.</p>
            </div>
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {[['🏦','Corporate Experience','Trained at American Express & NTT Data — institutional-grade analysis brought to retail traders.'],['📜','NISM Certified',"Officially certified by SEBI's NISM — a qualified financial market professional."],['🎯','Practical Focus','Every class includes live market analysis, real stock examples, and actionable strategies.'],['👥','Small Batches','Limited seats per batch ensure personal attention for every student.'],['📱','Lifetime Support','WhatsApp group access, doubt sessions, and market updates after your course.'],['💰','Affordable Pricing','Professional education at accessible prices — starting at ₹0 with our free demo.']].map(([icon,title,desc])=>(
                <div key={title as string} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:28 }}>
                  <div style={{ fontSize:32, marginBottom:16 }}>{icon}</div>
                  <h3 style={{ color:'#fff', fontWeight:800, fontSize:17, marginBottom:10 }}>{title as string}</h3>
                  <p style={{ color:'#64748B', fontSize:14, lineHeight:1.7 }}>{desc as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG SECTION (dynamic) ───────────────────────── */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>LATEST INSIGHTS</div>
                <h2 style={{ fontSize: 38, fontWeight: 900, color: '#0F172A' }}>Founder's <span style={{ color: '#DC2626' }}>Blog</span></h2>
              </div>
              <Link href="/blog" style={{ padding: '10px 22px', border: '2px solid #DC2626', color: '#DC2626', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>All Posts</Link>
            </div>
            <div className="blog-home-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {loading ? [1,2,3].map(i => (
                <div key={i} style={{ background: '#F8FAFC', borderRadius: 16, height: 280, animation: 'pulse 1.5s infinite' }} />
              )) : blogs.slice(0, 3).map((b: any) => (
                <Link key={b.id} href="/blog" style={{ textDecoration: 'none' }}>
                  <div className="card-hover" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                    {b.image_url
                      ? <img src={b.image_url} alt={b.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                      : <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>{b.thumbnail}</div>
                    }
                    <div style={{ padding: 20 }}>
                      <span style={{ display: 'inline-block', background: 'rgba(220,38,38,0.08)', color: '#DC2626', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginBottom: 10 }}>{b.category}</span>
                      <h3 style={{ fontWeight: 800, fontSize: 15, color: '#0F172A', marginBottom: 8, lineHeight: 1.4 }}>{b.title}</h3>
                      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 12 }}>{(b.excerpt || '').slice(0, 90)}{b.excerpt?.length > 90 ? '...' : ''}</p>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>{new Date(b.created_at).toLocaleDateString('en-IN')} ·</div>
                    </div>
                  </div>
                </Link>
              ))}
              {blogs.length === 0 && !loading && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: '#94A3B8' }}>No blog posts yet.</div>
              )}
            </div>
          </div>
        </section>

        {/* ── FACILITY / INSIDE EQUITYIFY ──────────────────── */}
        <section style={{ padding: '80px 0', background: '#0F172A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>OUR FACILITY</div>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Inside <span style={{ color: '#DC2626' }}>Equityify</span></h2>
              <p style={{ color: '#64748B', fontSize: 15 }}>Real trading setups · Professional classroom · Delhi NCR office</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '220px 200px', gap: 12 }}>
              {[
                { label: 'Live Multi-Monitor Trading Setup', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=70', span: 'row 1 / span 2' },
                { label: 'Professional Trading Desk', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=70', span: '' },
                { label: 'Real-time Crypto Analysis', img: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=500&q=70', span: '' },
                { label: 'Teaching Setup', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=70', span: '' },
                { label: 'Equityify Trading Academy', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=70', span: '' },
              ].map((item, i) => (
                <div key={i} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', gridRow: item.span || undefined }}>
                  <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', padding: '20px 14px 12px' }}>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
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

        {/* ── CTA ──────────────────────────────────────────── */}
        <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,#DC2626,#B91C1C)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 16 }}>Start Your Journey Today</h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 36, lineHeight: 1.6 }}>Join 3,200+ students who have transformed their financial future with Equityify.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" style={{ padding: '16px 36px', background: '#fff', color: '#DC2626', borderRadius: 12, fontSize: 16, fontWeight: 800, textDecoration: 'none' }}>Join Free →</Link>
              <Link href="/contact" style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 12, fontSize: 16, fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none' }}>Talk to Us</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){
          .hero-grid,.why-grid,.services-grid,.founder-grid{grid-template-columns:1fr!important;}
          .hero-cards{display:none!important;}
          .blog-home-grid{grid-template-columns:1fr 1fr!important;}
          .live-grid,.programs-grid{grid-template-columns:1fr!important;}
        }
        @media(max-width:640px){
          .stats-row,.blog-home-grid{grid-template-columns:1fr 1fr!important;}
        }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .animate-float1{animation:float1 4s ease-in-out infinite}
        .animate-float2{animation:float2 3s ease-in-out infinite}
        .card-hover{transition:transform 0.2s,box-shadow 0.2s}
        .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.1)}
      `}</style>
    </>
  )
}
