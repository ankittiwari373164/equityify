import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { signToken, verifyToken, getTokenFromHeader } from '@/lib/jwt'
import { ok, err } from '@/lib/api'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const body = await req.json()

  // SIGNUP
  if (action === 'signup') {
    const { name, email, phone, password } = body
    if (!name || !email || !phone || !password) return err('All fields are required.')
    if (password.length < 6) return err('Password must be at least 6 characters.')

    const { data: existing } = await supabaseAdmin.from('users').select('id,verified').eq('email', email.toLowerCase()).single()

    if (existing?.verified) return err('An account with this email already exists. Please log in.')

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpExpiry = new Date(Date.now() + 600000).toISOString()
    const hashed = await bcrypt.hash(password, 10)

    if (existing) {
      await supabaseAdmin.from('users').update({ name, phone, password: hashed, otp, otp_expiry: otpExpiry }).eq('email', email.toLowerCase())
    } else {
      const { error } = await supabaseAdmin.from('users').insert({ name, email: email.toLowerCase(), phone, password: hashed, otp, otp_expiry: otpExpiry })
      if (error) return err('Could not create account: ' + error.message)
    }
    return ok({ message: 'OTP generated.', otp, email: email.toLowerCase() })
  }

  // VERIFY OTP
  if (action === 'verify-otp') {
    const { email, otp } = body
    const { data: user } = await supabaseAdmin.from('users').select('*').eq('email', email.toLowerCase()).single()
    if (!user) return err('Account not found.', 404)
    if (user.verified) return err('Already verified. Please log in.')
    if (user.otp !== otp) return err('Incorrect code. Please try again.')
    if (new Date(user.otp_expiry) < new Date()) return err('Code expired. Request a new one.')

    await supabaseAdmin.from('users').update({ verified: true, otp: null, otp_expiry: null }).eq('id', user.id)
    const token = signToken({ id: user.id, role: 'user' })
    return ok({ message: 'Email verified! Welcome to Equityify.', token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, joinDate: user.created_at } })
  }

  // RESEND OTP
  if (action === 'resend-otp') {
    const { email } = body
    const { data: user } = await supabaseAdmin.from('users').select('id,verified').eq('email', email.toLowerCase()).single()
    if (!user) return err('Account not found.', 404)
    if (user.verified) return err('Already verified. Please log in.')
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpExpiry = new Date(Date.now() + 600000).toISOString()
    await supabaseAdmin.from('users').update({ otp, otp_expiry: otpExpiry }).eq('id', user.id)
    return ok({ message: 'New code generated.', otp, email: email.toLowerCase() })
  }

  // LOGIN
  if (action === 'login') {
    const { email, password } = body
    if (!email || !password) return err('Email and password are required.')
    const { data: user } = await supabaseAdmin.from('users').select('*').eq('email', email.toLowerCase()).single()
    if (!user) return err('No account found with this email.', 404)
    if (!user.verified) return err('Please verify your email first.', 403)
    const match = await bcrypt.compare(password, user.password)
    if (!match) return err('Incorrect password.', 401)
    const token = signToken({ id: user.id, role: 'user' })
    return ok({ message: `Welcome back, ${user.name}!`, token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, joinDate: user.created_at } })
  }

  return err('Unknown action.', 404)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')

  if (action === 'me') {
    const token = getTokenFromHeader(req.headers.get('authorization') || '')
    if (!token) return err('Not authenticated.', 401)
    const payload = verifyToken(token)
    if (!payload) return err('Invalid session.', 401)
    const { data: user } = await supabaseAdmin.from('users').select('id,name,email,phone,created_at').eq('id', payload.id).single()
    if (!user) return err('User not found.', 404)
    return ok(user)
  }

  return err('Unknown action.', 404)
}
