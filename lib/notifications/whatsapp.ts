import type { BookingRow } from './types';

function toWhatsAppAddress(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const e164 = digits.startsWith('971') ? `+${digits}` : `+${digits}`;
  return `whatsapp:${e164}`;
}

function bookingMessage(b: BookingRow): string {
  const time = String(b.slot_time).slice(0, 5);
  const notes = b.patient_notes ? `\nNotes: ${b.patient_notes}` : '';
  return (
    `*Health Point — New booking*\n` +
    `${b.patient_name} · ${b.patient_phone}` +
    (b.patient_email ? ` · ${b.patient_email}` : '') +
    `\n${b.service_name} (${b.service_price} AED)` +
    `\n${b.slot_date} ${time} (+04) · ${b.doctor_name}` +
    notes +
    `\nRef: ${b.id}`
  );
}

/** Twilio WhatsApp (sandbox or approved sender). Requires TWILIO_* env vars. */
export async function sendBookingWhatsApp(booking: BookingRow) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const reception = process.env.RECEPTIONIST_PHONE;

  if (!sid || !token || !from || !reception) {
    console.warn('[whatsapp] Twilio WhatsApp not fully configured; skip');
    return;
  }

  const to = toWhatsAppAddress(reception);
  const body = new URLSearchParams({
    From: from,
    To: to,
    Body: bookingMessage(booking),
  });

  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[whatsapp] Twilio error', res.status, text);
  }
}
