'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function fmt(n: number) { return Number(n).toLocaleString('en-IN') }

// ─────────────────────────────────────────────
// COURSE FORM (full: lessons + video links)
// ─────────────────────────────────────────────
const emptyCourse = () => ({
  title: '', subtitle: '', category: 'General', price: '', original_price: '',
  level: 'Beginner', badge: '', thumbnail: '📈', is_free: false, is_live: false,
  requires_approval: true, live_days: '', live_time: '', live_end_time: '',
  meet_link: '', duration: '', description: '', tags: '',
  curriculum: [{ section: 'Section 1', lessons: [{ title: '', duration: '', content: '', video_url: '' }] }],
})

function CourseForm({ initial, onSave, onCancel, token }: { initial: any, onSave: () => void, onCancel: () => void, token: string }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, val: any) => setForm((f: any) => ({ ...f, [key]: val }))

  // Curriculum helpers
  const addSection = () => set('curriculum', [...form.curriculum, { section: `Section ${form.curriculum.length + 1}`, lessons: [{ title: '', duration: '', content: '', video_url: '' }] }])
  const removeSection = (si: number) => set('curriculum', form.curriculum.filter((_: any, i: number) => i !== si))
  const updateSection = (si: number, val: string) => {
    const c = [...form.curriculum]; c[si] = { ...c[si], section: val }; set('curriculum', c)
  }
  const addLesson = (si: number) => {
    const c = [...form.curriculum]
    c[si] = { ...c[si], lessons: [...c[si].lessons, { title: '', duration: '', content: '', video_url: '' }] }
    set('curriculum', c)
  }
  const removeLesson = (si: number, li: number) => {
    const c = [...form.curriculum]
    c[si] = { ...c[si], lessons: c[si].lessons.filter((_: any, i: number) => i !== li) }
    set('curriculum', c)
  }
  const updateLesson = (si: number, li: number, key: string, val: string) => {
    const c = JSON.parse(JSON.stringify(form.curriculum))
    c[si].lessons[li][key] = val
    set('curriculum', c)
  }

  const handleSave = async () => {
    setError('')
    if (!form.title) { setError('Title is required.'); return }
    setSaving(true)
    const isEdit = !!initial.id
    const url = isEdit ? `/api/admin?action=update_course&id=${initial.id}` : '/api/admin?action=add_course'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.message || 'Save failed.'); return }
    onSave()
  }

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }
  const labelStyle = { fontSize: 12, fontWeight: 700 as const, color: '#374151', display: 'block' as const, marginBottom: 5 }

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 18, color: '#0F172A' }}>{initial.id ? '✏️ Edit Course' : '➕ Add New Course'}</h3>
        <button onClick={onCancel} style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: '#64748B' }}>Cancel</button>
      </div>

      {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>⚠️ {error}</div>}

      {/* Basic Info */}
      <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 16 }}>📋 Basic Information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div><label style={labelStyle}>Course Title *</label><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Technical Analysis" style={inputStyle} /></div>
          <div><label style={labelStyle}>Subtitle</label><input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="e.g. Complete Program" style={inputStyle} /></div>
          <div><label style={labelStyle}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
              {['General', 'Beginner', 'Intermediate', 'Advanced', 'Career', 'Crypto'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Level</label>
            <select value={form.level} onChange={e => set('level', e.target.value)} style={inputStyle}>
              {['Beginner', 'Intermediate', 'Advanced'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Price (₹)</label><input value={form.price} onChange={e => set('price', e.target.value)} type="number" placeholder="0" style={inputStyle} /></div>
          <div><label style={labelStyle}>Original Price (₹)</label><input value={form.original_price} onChange={e => set('original_price', e.target.value)} type="number" placeholder="0" style={inputStyle} /></div>
          <div><label style={labelStyle}>Duration</label><input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 8 Weeks" style={inputStyle} /></div>
          <div><label style={labelStyle}>Badge</label><input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="e.g. Popular, Free, Career" style={inputStyle} /></div>
          <div><label style={labelStyle}>Thumbnail Emoji</label><input value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} placeholder="📈" style={{ ...inputStyle, fontSize: 24, textAlign: 'center' }} /></div>
          <div><label style={labelStyle}>Tags (comma separated)</label><input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Stock Market, Beginners, Trading" style={inputStyle} /></div>
        </div>
        <div><label style={labelStyle}>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Full course description..." style={{ ...inputStyle, resize: 'vertical' }} /></div>
      </div>

      {/* Settings */}
      <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 16 }}>⚙️ Settings</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
          {[['is_free', '🆓 Free Course'], ['is_live', '🔴 Live Classes'], ['requires_approval', '✅ Requires Approval']].map(([key, label]) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#374151' }}>
              <input type="checkbox" checked={!!(form as any)[key]} onChange={e => set(key, e.target.checked)}
                style={{ width: 16, height: 16, cursor: 'pointer' }} />
              {label}
            </label>
          ))}
        </div>
        {form.is_live && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
            <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Live Days</label><input value={form.live_days} onChange={e => set('live_days', e.target.value)} placeholder="Monday, Wednesday, Friday" style={inputStyle} /></div>
            <div><label style={labelStyle}>Start Time</label><input value={form.live_time} onChange={e => set('live_time', e.target.value)} type="time" style={inputStyle} /></div>
            <div><label style={labelStyle}>End Time</label><input value={form.live_end_time} onChange={e => set('live_end_time', e.target.value)} type="time" style={inputStyle} /></div>
            <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Meet Link</label><input value={form.meet_link} onChange={e => set('meet_link', e.target.value)} placeholder="https://meet.google.com/..." style={inputStyle} /></div>
          </div>
        )}
      </div>

      {/* Curriculum */}
      <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>📚 Curriculum (Sections & Lessons)</div>
          <button onClick={addSection} style={{ background: '#0F172A', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Section</button>
        </div>

        {form.curriculum.map((sec: any, si: number) => (
          <div key={si} style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            {/* Section header */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <div style={{ background: '#0F172A', color: '#fff', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{si + 1}</div>
              <input value={sec.section} onChange={e => updateSection(si, e.target.value)} placeholder="Section name" style={{ ...inputStyle, fontWeight: 700, flex: 1 }} />
              {form.curriculum.length > 1 && (
                <button onClick={() => removeSection(si)} style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>✕ Remove</button>
              )}
            </div>

            {/* Lessons */}
            {sec.lessons.map((lesson: any, li: number) => (
              <div key={li} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 16, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>Lesson {li + 1}</span>
                  {sec.lessons.length > 1 && (
                    <button onClick={() => removeLesson(si, li)} style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>✕ Remove</button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div><label style={labelStyle}>Lesson Title</label><input value={lesson.title} onChange={e => updateLesson(si, li, 'title', e.target.value)} placeholder="e.g. Candlestick Patterns" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Duration</label><input value={lesson.duration} onChange={e => updateLesson(si, li, 'duration', e.target.value)} placeholder="e.g. 45 min" style={inputStyle} /></div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                    🎥 Video Link <span style={{ color: '#94A3B8', fontWeight: 400 }}>(YouTube, Google Drive, Vimeo, etc.)</span>
                  </label>
                  <input value={lesson.video_url} onChange={e => updateLesson(si, li, 'video_url', e.target.value)}
                    placeholder="https://youtu.be/... or https://drive.google.com/..." style={{ ...inputStyle, borderColor: lesson.video_url ? '#16A34A' : '#E5E7EB' }} />
                  {lesson.video_url && (
                    <div style={{ marginTop: 6, fontSize: 12, color: '#16A34A', display: 'flex', alignItems: 'center', gap: 4 }}>
                      ✓ Video link saved — <a href={lesson.video_url} target="_blank" rel="noreferrer" style={{ color: '#2563EB' }}>Test link ↗</a>
                    </div>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Lesson Description</label>
                  <textarea value={lesson.content} onChange={e => updateLesson(si, li, 'content', e.target.value)} rows={2} placeholder="What students will learn in this lesson..." style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>
            ))}
            <button onClick={() => addLesson(si)} style={{ background: '#EFF6FF', color: '#2563EB', border: '1px dashed #BFDBFE', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 4 }}>
              + Add Lesson
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving}
        style={{ width: '100%', background: saving ? '#9CA3AF' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
        {saving ? 'Saving…' : initial.id ? '✓ Update Course' : '✓ Publish Course'}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────
// BLOG FORM with image upload
// ─────────────────────────────────────────────
const emptyBlog = () => ({ title: '', excerpt: '', content: '', category: 'Education', tags: '', thumbnail: '📝', image_url: '', author: 'Upanshu Asra' })

function BlogForm({ initial, onSave, onCancel, token }: { initial: any, onSave: () => void, onCancel: () => void, token: string }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(initial.image_url || '')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: string, val: any) => setForm((f: any) => ({ ...f, [key]: val }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: fd })
    const data = await res.json()
    setUploading(false)
    if (!res.ok) { setError(data.message || 'Upload failed.'); return }
    set('image_url', data.url)
    setPreview(data.url)
  }

  const handleSave = async () => {
    setError('')
    if (!form.title || !form.content) { setError('Title and content are required.'); return }
    setSaving(true)
    const isEdit = !!initial.id
    const url = isEdit ? `/api/admin?action=update_blog&id=${initial.id}` : '/api/admin?action=add_blog'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.message || 'Save failed.'); return }
    onSave()
  }

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }
  const labelStyle = { fontSize: 12, fontWeight: 700 as const, color: '#374151', display: 'block' as const, marginBottom: 5 }

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 18, color: '#0F172A' }}>{initial.id ? '✏️ Edit Post' : '➕ New Blog Post'}</h3>
        <button onClick={onCancel} style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: '#64748B' }}>Cancel</button>
      </div>

      {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>⚠️ {error}</div>}

      {/* Image Upload */}
      <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <label style={{ ...labelStyle, fontSize: 14, marginBottom: 12 }}>🖼️ Blog Cover Image</label>
        {preview ? (
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <img src={preview} alt="Preview" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10, border: '1px solid #E2E8F0' }} />
            <button onClick={() => { setPreview(''); set('image_url', '') }}
              style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
        ) : (
          <div onClick={() => fileRef.current?.click()}
            style={{ border: '2px dashed #CBD5E1', borderRadius: 10, padding: '32px', textAlign: 'center', cursor: 'pointer', marginBottom: 12, background: '#fff', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#DC2626')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#CBD5E1')}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Click to upload image</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>JPEG, PNG, WebP or GIF — max 5MB</div>
            {uploading && <div style={{ marginTop: 8, fontSize: 13, color: '#2563EB', fontWeight: 600 }}>Uploading…</div>}
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            style={{ background: '#0F172A', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
            {uploading ? 'Uploading…' : preview ? '🔄 Change Image' : '📤 Upload Image'}
          </button>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>or paste image URL below</span>
        </div>
        {/* Manual URL input */}
        <div style={{ marginTop: 10 }}>
          <label style={{ ...labelStyle, fontWeight: 400, color: '#64748B' }}>Image URL (optional alternative to upload)</label>
          <input value={form.image_url} onChange={e => { set('image_url', e.target.value); setPreview(e.target.value) }}
            placeholder="https://example.com/image.jpg" style={inputStyle} />
        </div>
      </div>

      {/* Post Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Post Title *</label><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. How to Read Candlestick Charts" style={inputStyle} /></div>
        <div><label style={labelStyle}>Category</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
            {['Education', 'Technical Analysis', 'Fundamental Analysis', 'Career', 'Crypto', 'Market Update', 'General'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div><label style={labelStyle}>Author</label><input value={form.author} onChange={e => set('author', e.target.value)} style={inputStyle} /></div>
        <div><label style={labelStyle}>Tags (comma separated)</label><input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Candlesticks, Beginner, Charts" style={inputStyle} /></div>
        <div><label style={labelStyle}>Thumbnail Emoji</label><input value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} placeholder="📊" style={{ ...inputStyle, fontSize: 22, textAlign: 'center' }} /></div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Excerpt (short summary)</label>
        <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} placeholder="Brief description shown in blog listing..." style={{ ...inputStyle, resize: 'vertical' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Content * (supports ## Headings, **bold**, - bullet lists)</label>
        <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={14} placeholder="Write your blog post content here...&#10;&#10;## Introduction&#10;&#10;Your content here...&#10;&#10;## Key Points&#10;&#10;- Point 1&#10;- Point 2" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} />
      </div>

      <button onClick={handleSave} disabled={saving}
        style={{ width: '100%', background: saving ? '#9CA3AF' : 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
        {saving ? 'Saving…' : initial.id ? '✓ Update Post' : '✓ Publish Post'}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN ADMIN PAGE
// ─────────────────────────────────────────────
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
  const [courseForm, setCourseForm] = useState<any>(null) // null=list, object=form
  const [blogForm, setBlogFormState] = useState<any>(null) // null=list, object=form
  const router = useRouter()

  const [token, setToken] = useState('')

  useEffect(() => {
    const t = localStorage.getItem('eq_admin_token') || ''
    if (!t) { router.push('/admin-login'); return }
    setToken(t)
  }, [])

  useEffect(() => {
    if (token) loadAll()
  }, [token])

  const apiFetch = async (url: string, method = 'GET', body?: any) => {
    const opts: RequestInit = { method, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } }
    if (body) opts.body = JSON.stringify(body)
    const res = await fetch(url, opts)
    return res.json()
  }

  const loadAll = async () => {
    setLoading(true)
    const [s, e, u, c, b] = await Promise.all([
      apiFetch('/api/admin?action=stats'),
      apiFetch('/api/admin?action=enrollments'),
      apiFetch('/api/admin?action=users'),
      apiFetch('/api/admin?action=courses'),
      apiFetch('/api/admin?action=blogs'),
    ])
    setStats(s); setEnrollments(e.data || []); setUsers(u.data || [])
    setCourses(c.data || []); setBlogs(b.data || [])
    setLoading(false)
  }

  const updateEnrollment = async (id: number, data: any) => {
    await apiFetch(`/api/admin?action=update_enrollment&id=${id}`, 'POST', data)
    setEditEnroll(null); loadAll()
  }
  const deleteEnrollment = async (id: number) => {
    if (!confirm('Delete this enrollment?')) return
    await apiFetch(`/api/admin?action=delete_enrollment&id=${id}`, 'DELETE'); loadAll()
  }
  const deleteCourse = async (id: number) => {
    if (!confirm('Deactivate this course?')) return
    await apiFetch(`/api/admin?action=delete_course&id=${id}`, 'DELETE'); loadAll()
  }
  const deleteBlog = async (id: number) => {
    if (!confirm('Delete this post?')) return
    await apiFetch(`/api/admin?action=delete_blog&id=${id}`, 'DELETE'); loadAll()
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

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ color: '#94A3B8', fontSize: 13 }}>View Site ↗</Link>
          <button onClick={logout} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94A3B8', padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Logout</button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #E2E8F0', padding: '16px 8px', flexShrink: 0, position: 'sticky', top: 60, height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
          {navBtns.map(b => (
            <button key={b.id} onClick={() => { setTab(b.id); setCourseForm(null); setBlogFormState(null) }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600, marginBottom: 4, background: tab === b.id ? '#0F172A' : 'transparent', color: tab === b.id ? '#fff' : '#64748B', textAlign: 'left' }}>
              {b.icon} {b.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: 28, overflowX: 'hidden', minWidth: 0 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 80, color: '#94A3B8', fontSize: 16 }}>⏳ Loading admin panel…</div>
          ) : (
            <>
              {/* ── DASHBOARD ── */}
              {tab === 'dashboard' && stats && (
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginBottom: 24 }}>📊 Dashboard Overview</h2>
                  <div className="admin-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                    {[['📋', 'Total Enrollments', stats.total_enrollments, '#2563EB'], ['✅', 'Approved', stats.approved, '#16A34A'], ['⏳', 'Pending', stats.pending, '#D97706'], ['👥', 'Total Users', stats.users, '#9333EA'], ['📚', 'Active Courses', stats.courses, '#0891B2'], ['💰', 'Revenue', `₹${fmt(stats.revenue)}`, '#16A34A'], ['❌', 'Rejected', stats.rejected, '#DC2626'], ['📝', 'Blog Posts', blogs.length, '#6366F1']].map(([icon, label, val, color]) => (
                      <div key={label as string} style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: color as string }}>{val}</div>
                        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', fontWeight: 700, fontSize: 15 }}>Recent Enrollments</div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#F8FAFC' }}>{['Student', 'Course', 'Amount', 'Status', 'Date'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
                        <tbody>
                          {enrollments.slice(0, 8).map(e => (
                            <tr key={e.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '12px 16px' }}><div style={{ fontWeight: 600 }}>{e.users?.name}</div><div style={{ color: '#6B7280', fontSize: 11 }}>{e.users?.email}</div></td>
                              <td style={{ padding: '12px 16px', color: '#374151' }}>{e.courses?.title}</td>
                              <td style={{ padding: '12px 16px', fontWeight: 700 }}>{e.amount > 0 ? `₹${fmt(e.amount)}` : 'Free'}</td>
                              <td style={{ padding: '12px 16px' }}><span style={{ background: e.status === 'Approved' ? '#F0FDF4' : e.status === 'Pending' ? '#FFFBEB' : '#FEF2F2', color: e.status === 'Approved' ? '#16A34A' : e.status === 'Pending' ? '#D97706' : '#DC2626', fontWeight: 700, fontSize: 11, padding: '3px 10px', borderRadius: 20 }}>{e.status}</span></td>
                              <td style={{ padding: '12px 16px', color: '#6B7280' }}>{new Date(e.created_at).toLocaleDateString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ENROLLMENTS ── */}
              {tab === 'enrollments' && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 20 }}>📋 Enrollments ({enrollments.length})</h2>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                    {['All', 'Pending', 'Approved', 'Rejected'].map(s => (
                      <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '7px 18px', borderRadius: 20, border: filterStatus === s ? 'none' : '1px solid #E2E8F0', background: filterStatus === s ? '#DC2626' : '#fff', color: filterStatus === s ? '#fff' : '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{s}</button>
                    ))}
                  </div>
                  {editEnroll && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                      <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 440 }}>
                        <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 20 }}>Edit Enrollment — {editEnroll.users?.name}</h3>
                        {[['Status', 'status', 'select'], ['Meet Link', 'meet_link', 'text'], ['Admin Note', 'note', 'textarea']].map(([label, key, type]) => (
                          <div key={key} style={{ marginBottom: 14 }}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
                            {type === 'select' ? (
                              <select value={editEnroll[key] || ''} onChange={e => setEditEnroll({ ...editEnroll, [key]: e.target.value })} style={inputStyle}>
                                {['Pending', 'Approved', 'Rejected'].map(s => <option key={s}>{s}</option>)}
                              </select>
                            ) : type === 'textarea' ? (
                              <textarea value={editEnroll[key] || ''} onChange={e => setEditEnroll({ ...editEnroll, [key]: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                            ) : (
                              <input value={editEnroll[key] || ''} onChange={e => setEditEnroll({ ...editEnroll, [key]: e.target.value })} style={inputStyle} />
                            )}
                          </div>
                        ))}
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={() => updateEnrollment(editEnroll.id, { status: editEnroll.status, meet_link: editEnroll.meet_link, note: editEnroll.note })}
                            style={{ flex: 1, background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
                          <button onClick={() => setEditEnroll(null)} style={{ flex: 1, border: '1px solid #E5E7EB', background: '#fff', borderRadius: 8, padding: '11px', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#F8FAFC' }}>{['Student', 'Phone', 'Course', 'Amount', 'Status', 'Date', 'Actions'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
                        <tbody>
                          {filteredEnrollments.map(e => (
                            <tr key={e.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '11px 14px' }}><div style={{ fontWeight: 600 }}>{e.users?.name}</div><div style={{ color: '#6B7280', fontSize: 11 }}>{e.users?.email}</div></td>
                              <td style={{ padding: '11px 14px', color: '#374151' }}>{e.users?.phone}</td>
                              <td style={{ padding: '11px 14px', color: '#374151', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.courses?.title}</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700 }}>{e.amount > 0 ? `₹${fmt(e.amount)}` : 'Free'}</td>
                              <td style={{ padding: '11px 14px' }}><span style={{ background: e.status === 'Approved' ? '#F0FDF4' : e.status === 'Pending' ? '#FFFBEB' : '#FEF2F2', color: e.status === 'Approved' ? '#16A34A' : e.status === 'Pending' ? '#D97706' : '#DC2626', fontWeight: 700, fontSize: 11, padding: '3px 9px', borderRadius: 20 }}>{e.status}</span></td>
                              <td style={{ padding: '11px 14px', color: '#6B7280', whiteSpace: 'nowrap' }}>{new Date(e.created_at).toLocaleDateString('en-IN')}</td>
                              <td style={{ padding: '11px 14px', whiteSpace: 'nowrap' }}>
                                <button onClick={() => setEditEnroll({ ...e })} style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', marginRight: 6, fontWeight: 600 }}>Edit</button>
                                <button onClick={() => deleteEnrollment(e.id)} style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Del</button>
                              </td>
                            </tr>
                          ))}
                          {filteredEnrollments.length === 0 && <tr><td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>No enrollments found</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── USERS ── */}
              {tab === 'users' && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 20 }}>👥 Registered Users ({users.length})</h2>
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#F8FAFC' }}>{['#', 'Name', 'Email', 'Phone', 'Joined'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280' }}>{h}</th>)}</tr></thead>
                        <tbody>
                          {users.map((u, i) => (
                            <tr key={u.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '12px 16px', color: '#94A3B8' }}>{i + 1}</td>
                              <td style={{ padding: '12px 16px', fontWeight: 600 }}>{u.name}</td>
                              <td style={{ padding: '12px 16px', color: '#374151' }}>{u.email}</td>
                              <td style={{ padding: '12px 16px', color: '#374151' }}>{u.phone}</td>
                              <td style={{ padding: '12px 16px', color: '#6B7280' }}>{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                            </tr>
                          ))}
                          {users.length === 0 && <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>No users yet</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── COURSES ── */}
              {tab === 'courses' && (
                <div>
                  {courseForm ? (
                    <CourseForm
                      initial={courseForm}
                      token={token}
                      onSave={() => { setCourseForm(null); loadAll() }}
                      onCancel={() => setCourseForm(null)}
                    />
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A' }}>📚 Courses ({courses.length})</h2>
                        <button onClick={() => setCourseForm(emptyCourse())}
                          style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                          + Add New Course
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {courses.map(c => (
                          <div key={c.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                              <span style={{ fontSize: 36 }}>{c.thumbnail}</span>
                              <div>
                                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>{c.title}</div>
                                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
                                  {c.is_free ? 'Free' : `₹${fmt(c.price)}`} · {c.level} · {c.students_count || 0} students · {c.is_live ? '🔴 Live' : '📹 Recorded'}
                                </div>
                                {c.curriculum && (
                                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
                                    {Array.isArray(c.curriculum) ? c.curriculum.length : 0} sections · {Array.isArray(c.curriculum) ? c.curriculum.reduce((a: number, s: any) => a + (s.lessons?.length || 0), 0) : 0} lessons
                                  </div>
                                )}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <span style={{ background: c.active !== false ? '#F0FDF4' : '#FEF2F2', color: c.active !== false ? '#16A34A' : '#DC2626', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                                {c.active !== false ? 'Active' : 'Inactive'}
                              </span>
                              <button onClick={() => setCourseForm({ ...c, curriculum: Array.isArray(c.curriculum) ? c.curriculum : [] })}
                                style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                              <button onClick={() => deleteCourse(c.id)}
                                style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Deactivate</button>
                            </div>
                          </div>
                        ))}
                        {courses.length === 0 && (
                          <div style={{ background: '#fff', borderRadius: 14, border: '1px dashed #CBD5E1', padding: 40, textAlign: 'center', color: '#94A3B8' }}>
                            No courses yet. Click "Add New Course" to create your first one.
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── BLOG ── */}
              {tab === 'blogs' && (
                <div>
                  {blogForm ? (
                    <BlogForm
                      initial={blogForm}
                      token={token}
                      onSave={() => { setBlogFormState(null); loadAll() }}
                      onCancel={() => setBlogFormState(null)}
                    />
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A' }}>📝 Blog Posts ({blogs.length})</h2>
                        <button onClick={() => setBlogFormState(emptyBlog())}
                          style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                          + New Post
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {blogs.map(b => (
                          <div key={b.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
                            {b.image_url && <img src={b.image_url} alt="" style={{ width: 100, height: 80, objectFit: 'cover', flexShrink: 0 }} />}
                            <div style={{ padding: '14px 20px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                              <div>
                                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 15 }}>{b.thumbnail} {b.title}</div>
                                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{b.category} · {new Date(b.created_at || b.post_date).toLocaleDateString('en-IN')} · 👁 {b.views || 0} views</div>
                              </div>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => setBlogFormState({ ...b })}
                                  style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => deleteBlog(b.id)}
                                  style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {blogs.length === 0 && (
                          <div style={{ background: '#fff', borderRadius: 14, border: '1px dashed #CBD5E1', padding: 40, textAlign: 'center', color: '#94A3B8' }}>
                            No blog posts yet. Click "New Post" to write your first one.
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @media(max-width:640px){
          .admin-stats{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>
    </div>
  )
}