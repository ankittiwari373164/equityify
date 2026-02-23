import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'equityify_secret_2025'

export function signToken(payload: object, expiresIn = '7d') {
  return jwt.sign(payload, SECRET, { expiresIn } as jwt.SignOptions)
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}

export function getTokenFromHeader(authHeader?: string) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  return authHeader.slice(7)
}
