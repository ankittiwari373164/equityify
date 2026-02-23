import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { signToken, verifyToken, getTokenFromHeader } from '@/lib/jwt'
import { ok, err } from '@/lib/api'

function requireAdmin(req: NextRequest) {
  const token = getTokenFromHeader(req.headers.get('authorization') || '')
  if (!token) return null
  const p = verifyToken(token)
  if (!p || p.role !== 'admin') return null
  return p
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')

  if (action === 'login') {
    const { username, password } = await req.json()
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = signToken({ role: 'admin' }, '24h')
      return ok({ message: 'Welcome, Admin!', token })
    }
    return err('Invalid admin credentials.', 401)
  }

  const admin = requireAdmin(req)
  if (!admin) return err('Admin access required.', 403)

  const body = await req.json()

  if (action === 'add_course') {
    const { data, error } = await supabaseAdmin.from('courses').insert({
      title: body.title, subtitle: body.subtitle || '',
      category: body.category || 'General',
      price: parseInt(body.price) || 0, original_price: parseInt(body.original_price) || 0,
      level: body.level || 'Beginner', badge: body.badge || '',
      thumbnail: body.thumbnail || '📈',
      is_free: body.is_free || false, is_live: body.is_live || false,
      requires_approval: body.requires_approval !== false,
      live_days: body.live_days || '', live_time: body.live_time || '', live_end_time: body.live_end_time || '',
      meet_link: body.meet_link || '', duration: body.duration || '',
      description: body.description || '', tags: body.tags || '',
      curriculum: body.curriculum || [], active: true, students_count: 0,
    }).select().single()
    if (error) return err(error.message)
    return ok({ id: data.id, message: 'Course created!' }, 201)
  }

  if (action === 'update_course') {
    const id = searchParams.get('id')
    if (!id) return err('Missing id.')
    const { error } = await supabaseAdmin.from('courses').update({
      title: body.title, subtitle: body.subtitle || '',
      category: body.category || 'General',
      price: parseInt(body.price) || 0, original_price: parseInt(body.original_price) || 0,
      level: body.level || 'Beginner', badge: body.badge || '',
      thumbnail: body.thumbnail || '📈',
      is_free: body.is_free || false, is_live: body.is_live || false,
      requires_approval: body.requires_approval !== false,
      live_days: body.live_days || '', live_time: body.live_time || '', live_end_time: body.live_end_time || '',
      meet_link: body.meet_link || '', duration: body.duration || '',
      description: body.description || '', tags: body.tags || '',
      curriculum: body.curriculum || [],
    }).eq('id', parseInt(id))
    if (error) return err(error.message)
    return ok({ message: 'Course updated!' })
  }

  if (action === 'update_enrollment') {
    const id = searchParams.get('id')
    await supabaseAdmin.from('enrollments').update(body).eq('id', parseInt(id!))
    return ok({ message: 'Updated!' })
  }

  if (action === 'add_blog') {
    const slug = (body.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()
    const { data, error } = await supabaseAdmin.from('blogs').insert({
      title: body.title, slug, excerpt: body.excerpt || '',
      content: body.content || '', author: body.author || 'Upanshu Asra',
      category: body.category || 'General', tags: body.tags || '',
      thumbnail: body.thumbnail || '📝', image_url: body.image_url || '', published: true,
    }).select().single()
    if (error) return err(error.message)
    return ok({ id: data.id, message: 'Post created!' }, 201)
  }

  if (action === 'update_blog') {
    const id = searchParams.get('id')
    await supabaseAdmin.from('blogs').update({
      title: body.title, excerpt: body.excerpt, content: body.content,
      category: body.category, tags: body.tags, thumbnail: body.thumbnail,
      image_url: body.image_url || '', author: body.author || 'Upanshu Asra',
    }).eq('id', parseInt(id!))
    return ok({ message: 'Post updated!' })
  }

  return err('Unknown action.', 404)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')

  const admin = requireAdmin(req)
  if (!admin) return err('Admin access required.', 403)

  if (action === 'stats') {
    const [enrollments, users, courses] = await Promise.all([
      supabaseAdmin.from('enrollments').select('id,status,amount'),
      supabaseAdmin.from('users').select('id').eq('verified', true),
      supabaseAdmin.from('courses').select('id').eq('active', true),
    ])
    const total = enrollments.data?.length || 0
    const approved = enrollments.data?.filter(e => e.status === 'Approved').length || 0
    const pending = enrollments.data?.filter(e => e.status === 'Pending').length || 0
    const rejected = enrollments.data?.filter(e => e.status === 'Rejected').length || 0
    const revenue = enrollments.data?.filter(e => e.status === 'Approved').reduce((s, e) => s + (e.amount || 0), 0) || 0
    return ok({ total_enrollments: total, approved, pending, rejected, users: users.data?.length || 0, courses: courses.data?.length || 0, revenue })
  }

  if (action === 'enrollments') {
    const status = searchParams.get('status')
    let query = supabaseAdmin.from('enrollments')
      .select(`id, status, amount, payment_method, note, meet_link, created_at, users(id,name,email,phone), courses(id,title)`)
      .order('created_at', { ascending: false })
    if (status && status !== 'All') query = query.eq('status', status)
    const { data } = await query
    return ok({ data: data || [] })
  }

  if (action === 'users') {
    const { data } = await supabaseAdmin.from('users').select('id,name,email,phone,created_at').eq('verified', true).order('created_at', { ascending: false })
    return ok({ data: data || [] })
  }

  if (action === 'courses') {
    const { data } = await supabaseAdmin.from('courses').select('*').order('id')
    return ok({ data: data || [] })
  }

  if (action === 'blogs') {
    const { data } = await supabaseAdmin.from('blogs').select('*').order('created_at', { ascending: false })
    return ok({ data: data || [] })
  }

  return err('Unknown action.', 404)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const id = searchParams.get('id')
  const admin = requireAdmin(req)
  if (!admin) return err('Admin access required.', 403)

  if (action === 'delete_enrollment') { await supabaseAdmin.from('enrollments').delete().eq('id', parseInt(id!)); return ok({ message: 'Deleted.' }) }
  if (action === 'delete_course') { await supabaseAdmin.from('courses').update({ active: false }).eq('id', parseInt(id!)); return ok({ message: 'Deleted.' }) }
  if (action === 'delete_blog') { await supabaseAdmin.from('blogs').delete().eq('id', parseInt(id!)); return ok({ message: 'Deleted.' }) }

  return err('Unknown action.', 404)
}