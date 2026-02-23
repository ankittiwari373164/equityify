import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ok, err } from '@/lib/api'
import { COURSES } from '@/data/seed'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const id = searchParams.get('id')

  // Try Supabase first, fall back to seed data
  if (action === 'list') {
    try {
      const { data, error } = await supabaseAdmin.from('courses').select('*').eq('active', true).order('id')
      if (!error && data?.length) return ok({ data })
    } catch {}
    return ok({ data: COURSES })
  }

  if (action === 'get' && id) {
    try {
      const { data } = await supabaseAdmin.from('courses').select('*').eq('id', parseInt(id)).eq('active', true).single()
      if (data) return ok(data)
    } catch {}
    const course = COURSES.find(c => c.id === parseInt(id))
    if (!course) return err('Course not found.', 404)
    return ok(course)
  }

  return err('Unknown action.', 404)
}
