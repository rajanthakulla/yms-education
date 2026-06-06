import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'yms-education-secret-key-2024';
const key = new TextEncoder().encode(JWT_SECRET);

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token;
}

export async function isAuthenticated() {
  const token = await getTokenFromCookies();
  if (!token) return false;
  
  const payload = await verifyToken(token);
  return !!payload;
}

// Helper for API routes
export async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;
  
  const payload = await verifyToken(token);
  return !!payload;
}
