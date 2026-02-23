import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyToken, getTokenFromHeader } from '@/lib/jwt'
import { ok, err } from '@/lib/api'

function auth(req: NextRequest) {
  const token = getTokenFromHeader(req.headers.get('authorization') || '')
  if (!token) return null
  return verifyToken(token)
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const user = auth(req)
  if (!user) return err('Not authenticated.', 401)

  if (action === 'enroll') {
    const { courseId, paymentMethod, amount, note } = await req.json()
    if (!courseId) return err('Missing courseId.')

    const { data: course } = await supabaseAdmin.from('courses').select('id,price,requires_approval').eq('id', courseId).eq('active', true).single()
    if (!course) return err('Course not found.', 404)

    const { data: existing } = await supabaseAdmin.from('enrollments').select('id,status').eq('user_id', user.id).eq('course_id', courseId).single()
    if (existing) {
      if (existing.status === 'Approved') return err('Already enrolled! Check your Dashboard.')
      if (existing.status === 'Pending') return err('Your enrollment is pending approval.')
      if (existing.status === 'Rejected') return err('Your request was rejected. Contact us for help.')
    }

    const status = course.requires_approval ? 'Pending' : 'Approved'
    await supabaseAdmin.from('enrollments').insert({ user_id: user.id, course_id: courseId, status, payment_method: paymentMethod || 'cash', amount: amount || course.price, note: note || '' })
    await supabaseAdmin.from('courses').update({ students_count: supabaseAdmin.rpc as any }).eq('id', courseId)

    const msg = status === 'Pending' ? "Enrollment submitted! We'll contact you soon." : 'Enrolled successfully!'
    return ok({ message: msg, status }, 201)
  }

  return err('Unknown action.', 404)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const user = auth(req)
  if (!user) return err('Not authenticated.', 401)

  if (action === 'mine') {
    const { data } = await supabaseAdmin
      .from('enrollments')
      .select(`id, status, payment_method, amount, created_at, meet_link, progress, note, courses(id, title, thumbnail, is_live, live_days, live_time, live_end_time, curriculum, duration)`)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    return ok({ data: data || [] })
  }

  return err('Unknown action.', 404)
}
