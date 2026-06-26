'use server';

import { contactSchema, type ContactInput } from './schema';

export async function submitContact(input: ContactInput) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { ok: false as const, error: msg };
  }
  return { ok: true as const, error: null };
}
