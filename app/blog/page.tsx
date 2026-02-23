'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BLOGS } from '@/data/seed'

export default function BlogPage() {
  const [blogs, setBlogs] = useState(BLOGS)
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('/api/blog?action=list').then(r => r.json()).then(d => { if (d.data?.length) setBlogs(d.data) }).catch(() => {})
  }, [])

  const cats = ['All', ...Array.from(new Set(blogs.map(b => b.category)))]
  const filtered = filter === 'All' ? blogs : blogs.filter(b => b.category === filter)

  const loadPost = async (b: any) => {
    try {
      const res = await fetch(`/api/blog?action=get&id=${b.id}`)
      const data = await res.json()
      setSelected(data.id ? data : b)
    } catch { setSelected(b) }
  }

  return (
    <>
      <Navbar />
      {selected ? (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 60px' }}>
          <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#6B7280', fontSize: 14, cursor: 'pointer', marginBottom: 28 }}>
            ← Back to Blog
          </button>
          <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 20, padding: 40, marginBottom: 36, textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>{selected.thumbnail}</div>
            <div style={{ display: 'inline-block', background: 'rgba(220,38,38,0.15)', color: '#DC2626', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, marginBottom: 14 }}>{selected.category}</div>
            <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 900, lineHeight: 1.3, marginBottom: 14 }}>{selected.title}</h1>
            <div style={{ color: '#64748B', fontSize: 13 }}>By {selected.author} · {new Date(selected.post_date || selected.created_at).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} · 👁 {selected.views || 0} views</div>
          </div>
          <div style={{ fontSize: 16, color: '#374151', lineHeight: 1.9 }}>
            {(selected.content || '').split('\n').map((p: string, i: number) => {
              if (p.startsWith('## ')) return <h2 key={i} style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginTop: 32, marginBottom: 12 }}>{p.slice(3)}</h2>
              if (p.startsWith('**') && p.endsWith('**')) return <p key={i} style={{ fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{p.slice(2, -2)}</p>
              if (p.startsWith('- ')) return <li key={i} style={{ marginBottom: 6, marginLeft: 20 }}>{p.slice(2)}</li>
              if (!p.trim()) return <br key={i} />
              return <p key={i} style={{ marginBottom: 14 }}>{p}</p>
            })}
          </div>
          <div style={{ marginTop: 40, padding: 24, background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 16, textAlign: 'center' }}>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Want to learn more?</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>Join Equityify and get expert-led live training from Upanshu Asra.</p>
            <a href="/programs" style={{ display: 'inline-block', padding: '11px 28px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700 }}>View Programs →</a>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '60px 24px', textAlign: 'center' }}>
            <h1 style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Market Insights Blog</h1>
            <p style={{ color: '#94A3B8', fontSize: 16 }}>Expert analysis, trading tips, and financial market education</p>
          </div>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{ padding: '8px 20px', borderRadius: 20, fontSize: 14, fontWeight: 600, border: filter === c ? 'none' : '1px solid #E2E8F0', background: filter === c ? '#DC2626' : '#fff', color: filter === c ? '#fff' : '#374151', cursor: 'pointer' }}>{c}</button>
              ))}
            </div>
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
              {filtered.map(b => (
                <div key={b.id} className="card-hover" onClick={() => loadPost(b)} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '32px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: 44, marginBottom: 8 }}>{b.thumbnail}</div>
                    <span style={{ background: 'rgba(220,38,38,0.15)', color: '#DC2626', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>{b.category}</span>
                  </div>
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginBottom: 10, lineHeight: 1.4 }}>{b.title}</h3>
                    <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 16 }}>{b.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8' }}>
                      <span>By {b.author}</span>
                      <span>👁 {b.views || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
      <style>{`@media(max-width:900px){.blog-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:640px){.blog-grid{grid-template-columns:1fr!important;}}`}</style>
    </>
  )
}
