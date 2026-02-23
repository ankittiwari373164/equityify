'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function fmt(n: number) { return n.toLocaleString('en-IN') }

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('courses')
  const router = useRouter()

  useEffect(() => {
    const u = localStorage.getItem('eq_user')
    if (!u) { router.push('/login'); return }
    setUser(JSON.parse(u))
    fetchEnrollments()
  }, [])

  const fetchEnrollments = async () => {
    const token = localStorage.getItem('eq_auth_token') || ''
    const res = await fetch('/api/enrollments?action=mine', { headers: { 'Authorization': 'Bearer ' + token } })
    const data = await res.json()
    setLoading(false)
    if (data.data) setEnrollments(data.data)
  }

  if (!user) return null

  const statusColor = (s: string) => s === 'Approved' ? '#16A34A' : s === 'Pending' ? '#D97706' : '#DC2626'
  const statusBg = (s: string) => s === 'Approved' ? '#F0FDF4' : s === 'Pending' ? '#FFFBEB' : '#FEF2F2'

  return (
    <>
      <Navbar />
      <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)', padding: '32px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 20, padding: 32, marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 26, marginBottom: 4 }}>Welcome, {user.name}! 👋</h1>
              <p style={{ color: '#64748B', fontSize: 14 }}>{user.email}</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/programs" style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                Browse Programs →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
            {[
              ['📚', 'Enrolled', enrollments.length, '#2563EB'],
              ['✅', 'Approved', enrollments.filter(e => e.status === 'Approved').length, '#16A34A'],
              ['⏳', 'Pending', enrollments.filter(e => e.status === 'Pending').length, '#D97706'],
              ['📅', 'Member Since', new Date(user.joinDate || Date.now()).getFullYear(), '#9333EA'],
            ].map(([icon, label, val, color]) => (
              <div key={label as string} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: color as string }}>{val}</div>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 4, width: 'fit-content' }}>
            {['courses', 'profile'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: '8px 20px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: activeTab === tab ? '#0F172A' : 'transparent', color: activeTab === tab ? '#fff' : '#6B7280', transition: 'all 0.2s', textTransform: 'capitalize' }}>
                {tab === 'courses' ? '📚 My Courses' : '👤 Profile'}
              </button>
            ))}
          </div>

          {activeTab === 'courses' && (
            loading ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#94A3B8', fontSize: 16 }}>Loading your courses…</div>
            ) : enrollments.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 20, padding: 60, textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>📚</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>No courses yet</h3>
                <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>Enroll in a program to start your learning journey.</p>
                <Link href="/programs" style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700 }}>
                  Browse Programs →
                </Link>
              </div>
            ) : (
              <div className="dashboard-courses" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
                {enrollments.map((e: any) => {
                  const course = e.courses || {}
                  return (
                    <div key={e.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                      <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                          <span style={{ fontSize: 32 }}>{course.thumbnail || '📚'}</span>
                          <div>
                            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{course.title || 'Course'}</h3>
                            <div style={{ color: '#64748B', fontSize: 12 }}>{course.duration || ''}</div>
                          </div>
                        </div>
                        <span style={{ background: statusBg(e.status), color: statusColor(e.status), fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{e.status}</span>
                      </div>
                      <div style={{ padding: 20 }}>
                        {e.status === 'Approved' && e.meet_link && (
                          <a href={e.meet_link} target="_blank" rel="noreferrer"
                            style={{ display: 'block', background: 'linear-gradient(135deg,#16A34A,#15803D)', color: '#fff', textAlign: 'center', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                            🎥 Join Live Class
                          </a>
                        )}
                        {e.status === 'Pending' && (
                          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#92400E' }}>
                            ⏳ Pending approval. Upanshu will contact you on your phone within 24-48 hours.
                          </div>
                        )}
                        {e.status === 'Rejected' && (
                          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#991B1B' }}>
                            ❌ Request rejected. Contact us at +91-9289070030 for help.
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6B7280' }}>
                          <span>💳 {e.payment_method}</span>
                          <span>💰 {e.amount > 0 ? `₹${fmt(e.amount)}` : 'Free'}</span>
                          <span>📅 {new Date(e.created_at).toLocaleDateString('en-IN')}</span>
                        </div>
                        {e.note && <div style={{ marginTop: 10, fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>Note: {e.note}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          )}

          {activeTab === 'profile' && (
            <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #E2E8F0', maxWidth: 500 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 24 }}>Profile Information</h2>
              {[['👤 Full Name', user.name], ['📧 Email', user.email], ['📞 Phone', user.phone], ['📅 Member Since', new Date(user.joinDate || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #F1F5F9', fontSize: 15 }}>
                  <span style={{ color: '#6B7280' }}>{l}</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, background: '#FEF3C7', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#92400E' }}>
                💡 To update your details, contact us at equityify.in@gmail.com
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <style>{`
        @media(max-width:640px){.dashboard-stats{grid-template-columns:1fr 1fr!important;}.dashboard-courses{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  )
}
