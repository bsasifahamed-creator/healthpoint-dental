import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE } from './constants';

type SessionPayload = { v: 1; exp: number; jti: string };

function sessionSecret(): string {
  const s =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    '';
  return s;
}

/** Constant-time password check (length-independent via SHA-256 digests). */
export function adminPasswordsMatch(input: string, expected: string): boolean {
  const a = createHash('sha256').update(input, 'utf8').digest();
  const b = createHash('sha256').update(expected, 'utf8').digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Signed, expiring session token (HMAC-SHA256 over base64url payload). */
export function sealAdminSession(): string {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error('ADMIN_PASSWORD or ADMIN_SESSION_SECRET must be set to issue sessions.');
  }
  const payload: SessionPayload = {
    v: 1,
    exp: Date.now() + 8 * 60 * 60 * 1000,
    jti: randomBytes(24).toString('hex'),
  };
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const mac = createHmac('sha256', secret).update(body).digest();
  const macB64 = mac.toString('base64url');
  return `${body}.${macB64}`;
}

export function verifyAdminSession(): boolean {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!token || !token.includes('.')) return false;

  const secret = sessionSecret();
  if (!secret) return false;

  const lastDot = token.lastIndexOf('.');
  const body = token.slice(0, lastDot);
  const sigB64 = token.slice(lastDot + 1);
  if (!body || !sigB64) return false;

  let sig: Buffer;
  try {
    sig = Buffer.from(sigB64, 'base64url');
  } catch {
    return false;
  }

  const expectedMac = createHmac('sha256', secret).update(body).digest();
  if (sig.length !== expectedMac.length || !timingSafeEqual(sig, expectedMac)) {
    return false;
  }

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
  } catch {
    return false;
  }
  if (payload.v !== 1 || typeof payload.exp !== 'number') return false;
  if (Date.now() > payload.exp) return false;
  return true;
}
