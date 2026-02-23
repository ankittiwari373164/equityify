import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyToken, getTokenFromHeader } from '@/lib/jwt'
import { ok, err } from '@/lib/api'

export async function POST(req: NextRequest) {
  // Require admin token
  const token = getTokenFromHeader(req.headers.get('authorization') || '')
  if (!token) return err('Not authenticated.', 401)
  const payload = verifyToken(token)
  if (!payload || payload.role !== 'admin') return err('Admin access required.', 403)

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return err('No file provided.')

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) return err('Only JPEG, PNG, WebP, or GIF allowed.')

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) return err('File too large. Max 5MB.')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `blog-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const path = `blog-images/${filename}`

    // Upload to Supabase Storage bucket 'equityify-media'
    const { data, error } = await supabaseAdmin.storage
      .from('equityify-media')
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      // If bucket doesn't exist, try to create it
      if (error.message.includes('Bucket not found') || error.message.includes('bucket')) {
        await supabaseAdmin.storage.createBucket('equityify-media', { public: true })
        // Retry upload
        const { data: data2, error: error2 } = await supabaseAdmin.storage
          .from('equityify-media')
          .upload(path, buffer, { contentType: file.type, upsert: false })
        if (error2) return err('Upload failed: ' + error2.message)
        const { data: urlData } = supabaseAdmin.storage.from('equityify-media').getPublicUrl(data2.path)
        return ok({ url: urlData.publicUrl, path: data2.path })
      }
      return err('Upload failed: ' + error.message)
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage.from('equityify-media').getPublicUrl(data.path)
    return ok({ url: urlData.publicUrl, path: data.path })

  } catch (e: any) {
    return err('Upload error: ' + (e.message || 'Unknown error'))
  }
}