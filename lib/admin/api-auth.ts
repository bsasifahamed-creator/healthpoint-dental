import { NextResponse } from 'next/server';
import { verifyAdminSession } from './session';

export function requireAdmin(): NextResponse | null {
  if (!verifyAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
