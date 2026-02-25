'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { COURSES } from '@/data/seed'

function fmt(n: number) { return n.toLocaleString('en-IN') }

function EnrollModal({ course, onClose }: { course: any, onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const u = localStorage.getItem('eq_user')
    if (u) setUser(JSON.parse(u))
  }, [])

  const doEnroll = async () => {
    if (!user) { router.push('/login'); return }
    setLoading(true)
    const token = localStorage.getItem('eq_auth_token') || ''
    const res = await fetch('/api/enrollments?action=enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ courseId: course.id, paymentMethod: 'cash', amount: course.price, note })
    })
    const data = await res.json()
    setLoading(false)
    if (data.message && !res.ok) { alert(data.message); return }
    setSubmitted(true)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 460, overflow: 'hidden', maxHeight: '95vh', overflowY: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{course.thumbnail}</div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 15, margin: 0 }}>{course.title}</h3>
            <div style={{ color: '#94A3B8', fontSize: 13 }}>{course.is_free ? 'Free' : `₹${fmt(course.price)}`}</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 18 }}>×</button>
        </div>
        <div style={{ padding: 24 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>{course.is_free ? '🎉' : '✅'}</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginBottom: 8 }}>{course.is_free ? 'Enrolled!' : 'Request Submitted!'}</h3>
              <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                {course.is_free ? 'Access your course in Dashboard.' : 'Upanshu will contact you within 24-48 hours.'}
              </p>
              <button onClick={onClose} style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Done</button>
            </div>
          ) : (
            <>
              {!user && <div style={{ background: '#FEF3C7', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, color: '#92400E', fontWeight: 600 }}>⚠️ Please log in to enroll.</div>}
              {user && (
                <div style={{ background: '#F9FAFB', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                  {[['Name', user.name], ['Email', user.email], ['Phone', user.phone]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>{l}: <strong style={{ color: '#111827' }}>{v}</strong></div>
                  ))}
                </div>
              )}
              {!course.is_free && (
                <div style={{ background: '#FEF3C7', borderRadius: 10, padding: 12, marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E' }}>💡 No Online Payment</div>
                  <div style={{ fontSize: 12, color: '#78350F', marginTop: 4 }}>After approval, Upanshu contacts you via phone.</div>
                </div>
              )}
              {!course.is_free && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>Message (optional)</label>
                  <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Preferred batch time, questions…" style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              )}
              <button onClick={user ? doEnroll : () => router.push('/login')} disabled={loading}
                style={{ width: '100%', background: course.is_free ? 'linear-gradient(135deg,#16A34A,#15803D)' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Processing…' : user ? (course.is_free ? 'Enroll Free Now →' : 'Submit Request →') : 'Log In to Enroll →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Inner component that uses useSearchParams — must be inside Suspense
function ProgramsContent() {
  const [courses, setCourses] = useState<any[]>(COURSES)
  const [selected, setSelected] = useState<any>(null)
  const [enrollCourse, setEnrollCourse] = useState<any>(null)
  const [filter, setFilter] = useState('All')
  const searchParams = useSearchParams()

  useEffect(() => {
    fetch('/api/courses?action=list')
      .then(r => r.json())
      .then(d => { if (d.data) setCourses(d.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const id = searchParams.get('id')
    if (id && courses.length) {
      const c = courses.find((c: any) => String(c.id) === id)
      if (c) setSelected(c)
    }
  }, [searchParams, courses])

  const cats = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const filtered = filter === 'All' ? courses : courses.filter((c: any) => c.level === filter)

  return (
    <>
      {enrollCourse && <EnrollModal course={enrollCourse} onClose={() => setEnrollCourse(null)} />}

      {selected ? (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
          <button onClick={() => setSelected(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F1F5F9', border: 'none', color: '#374151', fontSize: 14, fontWeight: 600, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', marginBottom: 28 }}>
            ← Back to Programs
          </button>
          <div className="course-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }}>
            <div>
              <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 20, padding: 40, marginBottom: 32 }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>{selected.thumbnail}</div>
                <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>{selected.title}</h1>
                <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7 }}>{selected.description}</p>
                {selected.is_live && (
                  <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                    <div style={{ color: '#94A3B8', fontSize: 14 }}>📅 {selected.live_days}</div>
                    <div style={{ color: '#94A3B8', fontSize: 14 }}>🕐 {selected.live_time} – {selected.live_end_time}</div>
                  </div>
                )}
              </div>

              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginBottom: 20 }}>Curriculum</h2>
              {(Array.isArray(selected.curriculum) ? selected.curriculum : []).map((sec: any, i: number) => (
                <div key={i} style={{ marginBottom: 20, border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: '#F8FAFC', padding: '14px 20px', fontWeight: 700, color: '#0F172A', fontSize: 15 }}>{sec.section}</div>
                  {(sec.lessons || []).map((l: any, j: number) => (
                    <div key={j} style={{ padding: '14px 20px', borderTop: '1px solid #F1F5F9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>▶ {l.title}</span>
                        <span style={{ fontSize: 12, color: '#94A3B8', flexShrink: 0, marginLeft: 12 }}>{l.duration}</span>
                      </div>
                      {l.video_url && (
                        <a href={l.video_url} target="_blank" rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#2563EB', fontWeight: 600, marginTop: 6 }}>
                          🎥 Watch Lesson ↗
                        </a>
                      )}
                      {l.content && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4, lineHeight: 1.5 }}>{l.content}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <div style={{ background: '#fff', border: '2px solid #E2E8F0', borderRadius: 20, padding: 28, position: 'sticky', top: 80 }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: selected.is_free ? '#16A34A' : '#0F172A' }}>
                    {selected.is_free ? 'Free' : `₹${fmt(selected.price)}`}
                  </div>
                  {selected.original_price > 0 && <>
                    <div style={{ fontSize: 16, color: '#94A3B8', textDecoration: 'line-through' }}>₹{fmt(selected.original_price)}</div>
                    <div style={{ background: '#DCFCE7', color: '#16A34A', fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginTop: 8 }}>
                      Save ₹{fmt(selected.original_price - selected.price)}
                    </div>
                  </>}
                </div>
                {[['⏱', 'Duration', selected.duration], ['📊', 'Level', selected.level], ['👥', 'Students', `${fmt(selected.students_count || 0)}+`], ['🎓', 'Instructor', 'Upanshu Asra']].map(([icon, l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: 14 }}>
                    <span style={{ color: '#6B7280' }}>{icon} {l}</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{v}</span>
                  </div>
                ))}
                <button onClick={() => setEnrollCourse(selected)}
                  style={{ width: '100%', marginTop: 20, background: selected.is_free ? 'linear-gradient(135deg,#16A34A,#15803D)' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  {selected.is_free ? 'Enroll Free Now →' : 'Request Enrollment →'}
                </button>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:900px){.course-detail-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
      ) : (
        <div>
          <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '60px 24px', textAlign: 'center' }}>
            <h1 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Our Programs</h1>
            <p style={{ color: '#94A3B8', fontSize: 16 }}>Professional stock market education for every level</p>
          </div>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{ padding: '8px 20px', borderRadius: 20, fontSize: 14, fontWeight: 600, border: filter === c ? 'none' : '1px solid #E2E8F0', background: filter === c ? '#DC2626' : '#fff', color: filter === c ? '#fff' : '#374151', cursor: 'pointer' }}>{c}</button>
              ))}
            </div>
            <div className="programs-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
              {filtered.map((c: any) => (
                <div key={c.id} className="card-hover" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, overflow: 'hidden' }}>
                  <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: 32, position: 'relative' }}>
                    {c.badge && <div style={{ position: 'absolute', top: 16, right: 16, background: c.is_free ? '#16A34A' : '#DC2626', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{c.badge}</div>}
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                      <div style={{ fontSize: 48 }}>{c.thumbnail}</div>
                      <div>
                        <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{c.title}</h3>
                        <p style={{ color: '#64748B', fontSize: 14 }}>{c.subtitle}</p>
                        {c.is_live && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 20, padding: '3px 10px', marginTop: 8 }}>
                          <span style={{ width: 5, height: 5, background: '#DC2626', borderRadius: '50%' }} />
                          <span style={{ color: '#DC2626', fontSize: 11, fontWeight: 700 }}>LIVE</span>
                        </span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 24 }}>
                    <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 20 }}>{c.description}</p>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, color: '#6B7280' }}>⏱ {c.duration}</span>
                      <span style={{ fontSize: 13, color: '#6B7280' }}>📊 {c.level}</span>
                      <span style={{ fontSize: 13, color: '#6B7280' }}>👥 {fmt(c.students_count || 0)}+ students</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: 26, fontWeight: 900, color: c.is_free ? '#16A34A' : '#0F172A' }}>{c.is_free ? 'Free' : `₹${fmt(c.price)}`}</span>
                        {c.original_price > 0 && <span style={{ fontSize: 14, color: '#94A3B8', textDecoration: 'line-through', marginLeft: 8 }}>₹{fmt(c.original_price)}</span>}
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => setSelected(c)} style={{ padding: '10px 18px', border: '1px solid #E2E8F0', background: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>Details</button>
                        <button onClick={() => setEnrollCourse(c)} style={{ padding: '10px 18px', background: c.is_free ? 'linear-gradient(135deg,#16A34A,#15803D)' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                          {c.is_free ? 'Join Free' : 'Enroll'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media(max-width:900px){.programs-list-grid{grid-template-columns:1fr!important;}}
            .card-hover{transition:transform 0.2s,box-shadow 0.2s}
            .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.12)}
          `}</style>
        </div>
      )}
    </>
  )
}

// Outer page wraps everything in Suspense (required for useSearchParams)
export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: 16 }}>Loading programs…</div>}>
        <ProgramsContent />
      </Suspense>
      <Footer />
    </>
  )
}