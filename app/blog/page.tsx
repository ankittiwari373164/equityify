'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BLOGS } from '@/data/seed'

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>(BLOGS)
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('/api/blog?action=list')
      .then(r => r.json())
      .then(d => { if (d.data) setBlogs(d.data) })
      .catch(() => {})
  }, [])

  const cats = ['All', ...Array.from(new Set(blogs.map((b: any) => b.category)))]
  const filtered = filter === 'All' ? blogs : blogs.filter((b: any) => b.category === filter)

  const loadPost = async (b: any) => {
    try {
      const res = await fetch(`/api/blog?action=get&id=${b.id}`)
      const data = await res.json()
      setSelected(data.id ? data : b)
    } catch { setSelected(b) }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />

      {selected ? (
        /* ── BLOG POST DETAIL ── */
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }}>
          <button onClick={() => setSelected(null)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F1F5F9', border: 'none', color: '#374151', fontSize: 14, fontWeight: 600, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', marginBottom: 28 }}>
            ← Back to Blog
          </button>

          {/* Cover image */}
          {selected.image_url ? (
            <img
              src={selected.image_url}
              alt={selected.title}
              style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 20, marginBottom: 32, display: 'block' }}
            />
          ) : (
            <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 20, padding: 48, marginBottom: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{selected.thumbnail}</div>
              <span style={{ display: 'inline-block', background: 'rgba(220,38,38,0.15)', color: '#DC2626', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>{selected.category}</span>
              <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 900, lineHeight: 1.3 }}>{selected.title}</h1>
            </div>
          )}

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(220,38,38,0.08)', color: '#DC2626', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{selected.category}</span>
            <span style={{ color: '#6B7280', fontSize: 13 }}>By <strong>{selected.author || 'Upanshu Asra'}</strong></span>
            <span style={{ color: '#94A3B8', fontSize: 13 }}>·</span>
            <span style={{ color: '#6B7280', fontSize: 13 }}>{new Date(selected.post_date || selected.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span style={{ color: '#94A3B8', fontSize: 13 }}>·</span>
            <span style={{ color: '#6B7280', fontSize: 13 }}>👁 {selected.views || 0} views</span>
          </div>

          {selected.image_url && (
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', lineHeight: 1.3, marginBottom: 24 }}>{selected.title}</h1>
          )}

          {/* Content */}
          <div style={{ fontSize: 16, color: '#374151', lineHeight: 1.9 }}>
            {(selected.content || '').split('\n').map((p: string, i: number) => {
              if (p.startsWith('## ')) return <h2 key={i} style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginTop: 36, marginBottom: 14, paddingTop: 4, borderTop: '2px solid #F1F5F9' }}>{p.slice(3)}</h2>
              if (p.startsWith('### ')) return <h3 key={i} style={{ fontSize: 18, fontWeight: 700, color: '#1E293B', marginTop: 24, marginBottom: 10 }}>{p.slice(4)}</h3>
              if (p.startsWith('**') && p.endsWith('**')) return <p key={i} style={{ fontWeight: 700, color: '#111827', marginBottom: 10, fontSize: 16 }}>{p.slice(2, -2)}</p>
              if (p.startsWith('- ')) return <li key={i} style={{ marginBottom: 8, marginLeft: 20, color: '#374151' }}>{p.slice(2)}</li>
              if (!p.trim()) return <div key={i} style={{ height: 12 }} />
              return <p key={i} style={{ marginBottom: 16 }}>{p}</p>
            })}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 48, padding: 28, background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 20, textAlign: 'center' }}>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Want to learn more?</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Join Equityify and get expert-led live training from Upanshu Asra.</p>
            <a href="/programs" style={{ display: 'inline-block', padding: '12px 32px', background: 'linear-gradient(135deg,#DC2626,#B91C1C)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700 }}>
              View Programs →
            </a>
          </div>
        </div>
      ) : (
        /* ── BLOG LIST ── */
        <div>
          <div style={{ position:'relative', overflow:'hidden', padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/trading-desk-1.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(10,14,26,0.96),rgba(10,14,26,0.88))' }} />
            <div style={{ position:'relative', zIndex:1, padding:'20px 0' }}>
              <div style={{ color:'#F87171', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:10 }}>INSIGHTS & ANALYSIS</div>
              <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Market Insights Blog</h1>
              <p style={{ color: '#94A3B8', fontSize: 16, maxWidth:500, margin:'0 auto' }}>Expert analysis, trading tips, and financial market education from Upanshu Asra</p>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
            {/* Category Filter */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
              {cats.map((c: any) => (
                <button key={c} onClick={() => setFilter(c)}
                  style={{ padding: '8px 20px', borderRadius: 20, fontSize: 13, fontWeight: 600, border: filter === c ? 'none' : '1px solid #E2E8F0', background: filter === c ? '#DC2626' : '#fff', color: filter === c ? '#fff' : '#374151', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Featured post (first) */}
            {filtered.length > 0 && (
              <div className="card-hover" onClick={() => loadPost(filtered[0])}
                style={{ cursor: 'pointer', marginBottom: 32, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, overflow: 'hidden', display: 'grid', gridTemplateColumns: filtered[0].image_url ? '1fr 1fr' : '1fr' }}>
                {filtered[0].image_url ? (
                  <img src={filtered[0].image_url} alt={filtered[0].title} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '48px 40px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: 72 }}>{filtered[0].thumbnail}</div>
                  </div>
                )}
                <div style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ display: 'inline-block', background: 'rgba(220,38,38,0.08)', color: '#DC2626', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, marginBottom: 14, width: 'fit-content' }}>{filtered[0].category}</span>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', lineHeight: 1.3, marginBottom: 12 }}>{filtered[0].title}</h2>
                  <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 20 }}>{filtered[0].excerpt}</p>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>By {filtered[0].author || 'Upanshu Asra'} · 👁 {filtered[0].views || 0} views</div>
                </div>
              </div>
            )}

            {/* Grid of remaining posts */}
            {filtered.length > 1 && (
              <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
                {filtered.slice(1).map((b: any) => (
                  <div key={b.id} className="card-hover" onClick={() => loadPost(b)}
                    style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                    {/* Image or emoji header */}
                    {b.image_url ? (
                      <img src={b.image_url} alt={b.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '28px 24px', textAlign: 'center' }}>
                        <div style={{ fontSize: 40, marginBottom: 6 }}>{b.thumbnail}</div>
                        <span style={{ background: 'rgba(220,38,38,0.15)', color: '#DC2626', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{b.category}</span>
                      </div>
                    )}
                    <div style={{ padding: 20 }}>
                      {b.image_url && (
                        <span style={{ display: 'inline-block', background: 'rgba(220,38,38,0.08)', color: '#DC2626', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginBottom: 10 }}>{b.category}</span>
                      )}
                      <h3 style={{ fontWeight: 800, fontSize: 15, color: '#0F172A', marginBottom: 8, lineHeight: 1.4 }}>{b.title}</h3>
                      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 14 }}>{b.excerpt}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8' }}>
                        <span>By {b.author || 'Upanshu Asra'}</span>
                        <span>👁 {b.views || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                <div style={{ fontSize: 16 }}>No posts in this category yet.</div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <style>{`
        @media(max-width:900px){.blog-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:640px){.blog-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  )
}
