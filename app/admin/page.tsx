'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function fmt(n: number) { return Number(n).toLocaleString('en-IN') }

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard')
  const [stats, setStats] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('All')
  const [editEnroll, setEditEnroll] = useState<any>(null)
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', category: 'Education', tags: '', thumbnail: '📝' })
  const [editBlog, setEditBlog] = useState<any>(null)
  const router = useRouter()

  const token = typeof window !== 'undefined' ? localStorage.getItem('eq_admin_token') || '' : ''

  const apiFetch = async (url: string, method = 'GET', body?: any) => {
    const opts: RequestInit = { method, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } }
    if (body) opts.body = JSON.stringify(body)
    const res = await fetch(url, opts)
    return res.json()
  }

  useEffect(() => {
    if (!token) { router.push('/admin-login'); return }
    loadAll()
  }, [])

  const loadAll = async () => {
    setLoading(true)
    const [s, e, u, c, b] = await Promise.all([
      apiFetch('/api/admin?action=stats'),
      apiFetch('/api/admin?action=enrollments'),
      apiFetch('/api/admin?action=users'),
      apiFetch('/api/admin?action=courses'),
      apiFetch('/api/admin?action=blogs'),
    ])
    setStats(s)
    setEnrollments(e.data || [])
    setUsers(u.data || [])
    setCourses(c.data || [])
    setBlogs(b.data || [])
    setLoading(false)
  }

  const updateEnrollment = async (id: number, data: any) => {
    await apiFetch(`/api/admin?action=update_enrollment&id=${id}`, 'POST', data)
    setEditEnroll(null)
    loadAll()
  }

  const deleteEnrollment = async (id: number) => {
    if (!confirm('Delete this enrollment?')) return
    await apiFetch(`/api/admin?action=delete_enrollment&id=${id}`, 'DELETE')
    loadAll()
  }

  const saveBlog = async () => {
    if (!blogForm.title || !blogForm.content) { alert('Title and content required.'); return }
    if (editBlog) {
      await apiFetch(`/api/admin?action=update_blog&id=${editBlog.id}`, 'POST', blogForm)
    } else {
      await apiFetch('/api/admin?action=add_blog', 'POST', blogForm)
    }
    setBlogForm({ title: '', excerpt: '', content: '', category: 'Education', tags: '', thumbnail: '📝' })
    setEditBlog(null)
    loadAll()
  }

  const deleteBlog = async (id: number) => {
    if (!confirm('Delete this post?')) return
    await apiFetch(`/api/admin?action=delete_blog&id=${id}`, 'DELETE')
    loadAll()
  }

  const logout = () => { localStorage.removeItem('eq_admin_token'); router.push('/admin-login') }

  const filteredEnrollments = filterStatus === 'All' ? enrollments : enrollments.filter(e => e.status === filterStatus)

  const navBtns = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'enrollments', icon: '📋', label: 'Enrollments' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'courses', icon: '📚', label: 'Courses' },
    { id: 'blogs', icon: '📝', label: 'Blog' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', display: 'flex', flexDirection: 'column' }}>
      {/* Admin Navbar */}
      <nav style={{ background: '#0F172A', height: 60, display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>📈</span>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>Equityify</span>
          </Link>
          <span style={{ color: '#DC2626', fontSize: 12, fontWeight: 700, background: 'rgba(220,38,38,0.15)', padding: '2px 8px', borderRadius: 4 }}>ADMIN</span>
        </div>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94A3B8', padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Logout</button>
      </nav>

      <div className="admin-layout" style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside className="admin-sidebar-inner" style={{ width: 200, background: '#fff', borderRight: '1px solid #E2E8F0', padding: '16px 8px', flexShrink: 0 }}>
          {navBtns.map(b => (
            <button key={b.id} onClick={() => setTab(b.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600, marginBottom: 4, background: tab === b.id ? '#0F172A' : 'transparent', color: tab === b.id ? '#fff' : '#64748B', textAlign: 'left' }}>
              {b.icon} {b.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: 28, overflowX: 'hidden' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 80, color: '#94A3B8', fontSize: 16 }}>Loading admin panel…</div>
          ) : (
            <>
              {/* DASHBOARD */}
              {tab === 'dashboard' && stats && (
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginBottom: 24 }}>Dashboard Overview</h2>
                  <div className="admin-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                    {[
                      ['📋', 'Total Enrollments', stats.total_enrollments, '#2563EB'],
                      ['✅', 'Approved', stats.approved, '#16A34A'],
                      ['⏳', 'Pending', stats.pending, '#D97706'],
                      ['👥', 'Total Users', stats.users, '#9333EA'],
                      ['📚', 'Active Courses', stats.courses, '#0891B2'],
                      ['💰', 'Revenue', `₹${fmt(stats.revenue)}`, '#16A34A'],
                      ['❌', 'Rejected', stats.rejected, '#DC2626'],
                      ['📝', 'Blog Posts', blogs.length, '#6366F1'],
                    ].map(([icon, label, val, color]) => (
                      <div key={label as string} style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: color as string }}>{val}</div>
                        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  {/* Recent Enrollments */}
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Recent Enrollments</div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#F8FAFC' }}>
                            {['Student', 'Course', 'Amount', 'Status', 'Date'].map(h => (
                              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {enrollments.slice(0, 5).map(e => (
                            <tr key={e.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '12px 16px' }}><div style={{ fontWeight: 600, color: '#0F172A' }}>{e.users?.name}</div><div style={{ color: '#6B7280', fontSize: 11 }}>{e.users?.email}</div></td>
                              <td style={{ padding: '12px 16px', color: '#374151' }}>{e.courses?.title}</td>
                              <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0F172A' }}>{e.amount > 0 ? `₹${fmt(e.amount)}` : 'Free'}</td>
                              <td style={{ padding: '12px 16px' }}><span style={{ background: e.status === 'Approved' ? '#F0FDF4' : e.status === 'Pending' ? '#FFFBEB' : '#FEF2F2', color: e.status === 'Approved' ? '#16A34A' : e.status === 'Pending' ? '#D97706' : '#DC2626', fontWeight: 700, fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>{e.status}</span></td>
                              <td style={{ padding: '12px 16px', color: '#6B7280' }}>{new Date(e.created_at).toLocaleDateString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ENROLLMENTS */}
              {tab === 'enrollments' && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 20 }}>Enrollments</h2>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                    {['All', 'Pending', 'Approved', 'Rejected'].map(s => (
                      <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '7px 18px', borderRadius: 20, border: filterStatus === s ? 'none' : '1px solid #E2E8F0', background: filterStatus === s ? '#DC2626' : '#fff', color: filterStatus === s ? '#fff' : '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{s}</button>
                    ))}
                  </div>

                  {editEnroll && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                      <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 420 }}>
                        <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 20 }}>Edit Enrollment</h3>
                        {[['Status', 'status', 'select'], ['Meet Link', 'meet_link', 'text'], ['Note', 'note', 'textarea']].map(([label, key, type]) => (
                          <div key={key} style={{ marginBottom: 14 }}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
                            {type === 'select' ? (
                              <select value={editEnroll[key] || ''} onChange={e => setEditEnroll({ ...editEnroll, [key]: e.target.value })}
                                style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none' }}>
                                {['Pending', 'Approved', 'Rejected'].map(s => <option key={s}>{s}</option>)}
                              </select>
                            ) : type === 'textarea' ? (
                              <textarea value={editEnroll[key] || ''} onChange={e => setEditEnroll({ ...editEnroll, [key]: e.target.value })} rows={3}
                                style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                            ) : (
                              <input value={editEnroll[key] || ''} onChange={e => setEditEnroll({ ...editEnroll, [key]: e.target.value })}
                                style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                            )}
                          </div>
                        ))}
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={() => updateEnrollment(editEnroll.id, { status: editEnroll.status, meet_link: editEnroll.meet_link, note: editEnroll.note })}
                            style={{ flex: 1, background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save</button>
                          <button onClick={() => setEditEnroll(null)} style={{ flex: 1, border: '1px solid #E5E7EB', background: '#fff', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#F8FAFC' }}>
                            {['Student', 'Phone', 'Course', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEnrollments.map(e => (
                            <tr key={e.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '11px 14px' }}><div style={{ fontWeight: 600, color: '#0F172A' }}>{e.users?.name}</div><div style={{ color: '#6B7280', fontSize: 11 }}>{e.users?.email}</div></td>
                              <td style={{ padding: '11px 14px', color: '#374151' }}>{e.users?.phone}</td>
                              <td style={{ padding: '11px 14px', color: '#374151' }}>{e.courses?.title}</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700 }}>{e.amount > 0 ? `₹${fmt(e.amount)}` : 'Free'}</td>
                              <td style={{ padding: '11px 14px' }}><span style={{ background: e.status === 'Approved' ? '#F0FDF4' : e.status === 'Pending' ? '#FFFBEB' : '#FEF2F2', color: e.status === 'Approved' ? '#16A34A' : e.status === 'Pending' ? '#D97706' : '#DC2626', fontWeight: 700, fontSize: 11, padding: '3px 9px', borderRadius: 20 }}>{e.status}</span></td>
                              <td style={{ padding: '11px 14px', color: '#6B7280' }}>{new Date(e.created_at).toLocaleDateString('en-IN')}</td>
                              <td style={{ padding: '11px 14px' }}>
                                <button onClick={() => setEditEnroll({ ...e })} style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', marginRight: 6 }}>Edit</button>
                                <button onClick={() => deleteEnrollment(e.id)} style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}>Del</button>
                              </td>
                            </tr>
                          ))}
                          {filteredEnrollments.length === 0 && (
                            <tr><td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>No enrollments found</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* USERS */}
              {tab === 'users' && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 20 }}>Registered Users ({users.length})</h2>
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#F8FAFC' }}>
                            {['#', 'Name', 'Email', 'Phone', 'Joined'].map(h => (
                              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((u, i) => (
                            <tr key={u.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '12px 16px', color: '#94A3B8' }}>{i + 1}</td>
                              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0F172A' }}>{u.name}</td>
                              <td style={{ padding: '12px 16px', color: '#374151' }}>{u.email}</td>
                              <td style={{ padding: '12px 16px', color: '#374151' }}>{u.phone}</td>
                              <td style={{ padding: '12px 16px', color: '#6B7280' }}>{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* BLOG */}
              {tab === 'blogs' && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 20 }}>Blog Posts</h2>
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, marginBottom: 24 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>{editBlog ? 'Edit Post' : 'Add New Post'}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Title *</label>
                        <input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Category</label>
                        <input value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Excerpt</label>
                      <input value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>Content *</label>
                      <textarea value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} rows={8}
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={saveBlog} style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                        {editBlog ? 'Update Post' : 'Publish Post'}
                      </button>
                      {editBlog && <button onClick={() => { setEditBlog(null); setBlogForm({ title: '', excerpt: '', content: '', category: 'Education', tags: '', thumbnail: '📝' }) }} style={{ border: '1px solid #E5E7EB', background: '#fff', borderRadius: 8, padding: '10px 20px', fontSize: 14, cursor: 'pointer' }}>Cancel</button>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {blogs.map(b => (
                      <div key={b.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 15 }}>{b.thumbnail} {b.title}</div>
                          <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{b.category} · {new Date(b.created_at || b.post_date).toLocaleDateString('en-IN')}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => { setEditBlog(b); setBlogForm({ title: b.title, excerpt: b.excerpt || '', content: b.content || '', category: b.category || 'Education', tags: b.tags || '', thumbnail: b.thumbnail || '📝' }) }}
                            style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => deleteBlog(b.id)} style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COURSES (admin view) */}
              {tab === 'courses' && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 20 }}>Courses ({courses.length})</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {courses.map(c => (
                      <div key={c.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                          <span style={{ fontSize: 32 }}>{c.thumbnail}</span>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 15 }}>{c.title}</div>
                            <div style={{ fontSize: 13, color: '#6B7280' }}>{c.is_free ? 'Free' : `₹${fmt(c.price)}`} · {c.level} · {c.students_count || 0} students</div>
                          </div>
                        </div>
                        <span style={{ background: c.active !== false ? '#F0FDF4' : '#FEF2F2', color: c.active !== false ? '#16A34A' : '#DC2626', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{c.active !== false ? 'Active' : 'Inactive'}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 20, padding: 16, background: '#FEF3C7', borderRadius: 10, fontSize: 13, color: '#92400E' }}>
                    💡 To add/edit courses, use the Supabase dashboard directly, or contact the developer to add a course form.
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @media(max-width:640px){
          .admin-layout{flex-direction:column!important;}
          .admin-sidebar-inner{flex-direction:row!important;overflow-x:auto!important;width:100%!important;padding:8px!important;}
          .admin-stats{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>
    </div>
  )
}
