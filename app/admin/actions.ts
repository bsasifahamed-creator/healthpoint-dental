'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cancelBooking } from '@/lib/booking/actions';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin/constants';
import {
  adminPasswordsMatch,
  sealAdminSession,
  verifyAdminSession,
} from '@/lib/admin/session';

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function loginAdmin(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const password = String(formData.get('password') ?? '');

  const ip = (await cookies()).get('x-forwarded-for')?.value ?? 'unknown';
  if (!checkRateLimit(`login:${ip}`)) {
    await new Promise((r) => setTimeout(r, 1000));
    return { ok: false, error: 'Too many attempts. Try again later.' };
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected?.trim()) {
    await new Promise((r) => setTimeout(r, 400));
    return { ok: false, error: 'Invalid password' };
  }
  if (!adminPasswordsMatch(password, expected)) {
    await new Promise((r) => setTimeout(r, 400));
    return { ok: false, error: 'Invalid password' };
  }
  let token: string;
  try {
    token = sealAdminSession();
  } catch {
    return { ok: false, error: 'Server configuration error.' };
  }
  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/',
  });
  return { ok: true };
}

export async function logoutAdmin() {
  cookies().delete(ADMIN_SESSION_COOKIE);
  redirect('/admin');
}

export async function cancelBookingForm(formData: FormData) {
  if (!verifyAdminSession()) redirect('/admin');
  const id = String(formData.get('id') ?? '');
  if (id) await cancelBooking(id);
  redirect('/admin');
}
