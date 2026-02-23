import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ok, err } from '@/lib/api'
import { BLOGS } from '@/data/seed'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const id = searchParams.get('id')

  if (action === 'list') {
    try {
      const { data, error } = await supabaseAdmin.from('blogs').select('id,title,slug,excerpt,author,category,tags,thumbnail,views,created_at').eq('published', true).order('created_at', { ascending: false })
      if (!error && data?.length) return ok({ data })
    } catch {}
    return ok({ data: BLOGS })
  }

  if (action === 'get' && id) {
    try {
      const { data } = await supabaseAdmin.from('blogs').select('*').eq('id', parseInt(id)).eq('published', true).single()
      if (data) {
        await supabaseAdmin.from('blogs').update({ views: (data.views || 0) + 1 }).eq('id', parseInt(id))
        return ok(data)
      }
    } catch {}
    const blog = BLOGS.find(b => b.id === parseInt(id))
    if (!blog) return err('Post not found.', 404)
    return ok(blog)
  }

  return err('Unknown action.', 404)
}
