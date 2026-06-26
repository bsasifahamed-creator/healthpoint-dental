import { Resend } from 'resend';
import type { BookingRow } from './types';

function formatSlot(b: BookingRow) {
  return `${b.slot_date} at ${String(b.slot_time).slice(0, 5)} (+04:00)`;
}

function patientHtml(b: BookingRow) {
  return `
  <p>Hi ${b.patient_name},</p>
  <p>We received your appointment request at <strong>Health Point Dental</strong>.</p>
  <ul>
    <li><strong>Service:</strong> ${b.service_name}</li>
    <li><strong>When:</strong> ${formatSlot(b)}</li>
    <li><strong>Dentist:</strong> ${b.doctor_name}</li>
  </ul>
  <p>Our team will confirm shortly. Questions? Call <a href="tel:+971585886915">+971 58 588 6915</a>.</p>
  <p style="color:#64748b;font-size:13px">Booking ref: ${b.id}</p>
`;
}

function receptionHtml(b: BookingRow) {
  return `
  <p>New online booking request.</p>
  <ul>
    <li><strong>Patient:</strong> ${b.patient_name} · ${b.patient_phone}${b.patient_email ? ` · ${b.patient_email}` : ''}</li>
    <li><strong>Service:</strong> ${b.service_name} (${b.service_price} AED)</li>
    <li><strong>When:</strong> ${formatSlot(b)}</li>
    <li><strong>Dentist:</strong> ${b.doctor_name}</li>
    ${b.patient_notes ? `<li><strong>Notes:</strong> ${b.patient_notes}</li>` : ''}
  </ul>
  <p style="color:#64748b;font-size:13px">Booking id: ${b.id}</p>
`;
}

export async function sendBookingEmails(booking: BookingRow) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Health Point <onboarding@resend.dev>';
  const receptionTo = process.env.RECEPTIONIST_EMAIL;

  if (!key) {
    console.warn('[email] RESEND_API_KEY missing; skip Resend');
    return;
  }
  if (!receptionTo) {
    console.warn('[email] RECEPTIONIST_EMAIL missing; skip reception copy');
  }

  const resend = new Resend(key);

  if (receptionTo) {
    await resend.emails.send({
      from,
      to: receptionTo,
      subject: `New booking: ${booking.patient_name} · ${booking.service_name}`,
      html: receptionHtml(booking),
    });
  }

  if (booking.patient_email) {
    await resend.emails.send({
      from,
      to: booking.patient_email,
      subject: 'We received your booking — Health Point Dental',
      html: patientHtml(booking),
    });
  }
}
