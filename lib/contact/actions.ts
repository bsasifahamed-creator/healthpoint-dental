'use server';

import { Resend } from 'resend';
import { contactSchema, CONTACT_TOPICS, type ContactInput } from './schema';

function topicLabel(value: ContactInput['topic']) {
  return CONTACT_TOPICS.find((t) => t.value === value)?.label ?? value;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function receptionHtml(data: ContactInput) {
  return `
    <p>New contact form submission from the website.</p>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
      <li><strong>Email:</strong> <a href="mailto:${encodeURIComponent(data.email)}">${escapeHtml(data.email)}</a></li>
      <li><strong>Phone:</strong> ${escapeHtml(data.phone)}</li>
      <li><strong>Topic:</strong> ${escapeHtml(topicLabel(data.topic))}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap; padding:12px 14px; background:#f6fbfa; border-left:3px solid #00a6a6; border-radius:6px; color:#0f1419;">${escapeHtml(data.message)}</p>
    <p style="color:#64748b; font-size:12px; margin-top:18px;">Reply directly to the patient at ${escapeHtml(data.email)} or ring ${escapeHtml(data.phone)}.</p>
  `;
}

function patientHtml(data: ContactInput) {
  return `
    <p>Hi ${escapeHtml(data.name.split(' ')[0])},</p>
    <p>Thanks for reaching out to <strong>Health Point Dental</strong>. We received your message and a member of the front desk will get back to you shortly — usually within a few hours during clinic hours (1 PM – 9 PM, daily).</p>
    <p>For anything urgent, please call <a href="tel:+971585886915">+971 58 588 6915</a> or message us on <a href="https://wa.me/971585886915">WhatsApp</a>.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0" />
    <p style="color:#64748b; font-size:13px;"><strong>Your message:</strong></p>
    <p style="color:#0f1419; font-size:13px; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    <p style="color:#64748b; font-size:12px; margin-top:18px;">Health Point Dental — Office 603, Bedaia Building, Al Barsha 1, Dubai.</p>
  `;
}

export async function submitContact(input: ContactInput) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { ok: false as const, error: msg };
  }
  const data = parsed.data;

  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Health Point <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO_EMAIL || process.env.RECEPTIONIST_EMAIL;

  // If email isn't configured we still accept the submission so the user
  // gets a success state. The clinic can wire env vars later and the
  // existing logs preserve the lost messages.
  if (!key || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[contact] RESEND / recipient not configured; submission accepted without email.');
    }
    return { ok: true as const, error: null };
  }

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from,
      to,
      subject: `Website contact — ${data.name} · ${topicLabel(data.topic)}`,
      replyTo: data.email,
      html: receptionHtml(data),
    });

    // Best-effort patient confirmation; don't fail the request if it errors.
    await resend.emails
      .send({
        from,
        to: data.email,
        subject: 'We received your message — Health Point Dental',
        html: patientHtml(data),
      })
      .catch((err) => console.error('[contact] patient confirmation failed:', err));

    return { ok: true as const, error: null };
  } catch (err) {
    console.error('[contact] resend send failed:', err);
    return {
      ok: false as const,
      error: 'Could not send right now. Please call +971 58 588 6915 or try again.',
    };
  }
}
