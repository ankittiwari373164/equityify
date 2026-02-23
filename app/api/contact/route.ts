import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ok, err } from '@/lib/api'

export async function POST(req: NextRequest) {
  const { name, email, phone, topic, message } = await req.json()
  if (!name || !email || !message) return err('Name, email and message are required.')

  try {
    await supabaseAdmin.from('contact_messages').insert({ name, email, phone, topic, message })
  } catch {}

  return ok({ message: "Message received! We'll reply within 24 hours." })
}
