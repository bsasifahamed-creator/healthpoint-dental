'use server';

import { parse } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { sendBookingEmails } from '@/lib/notifications/email';
import { sendBookingWhatsApp } from '@/lib/notifications/whatsapp';
import type { BookingRow } from '@/lib/notifications/types';
import { bookingSchema, type BookingInput } from './schema';
import { getServiceByKey } from './services';
import { generateDailySlots, isSlotBookable, slotToTimestamp } from './slots';

export type { BookingInput };

export async function getAvailableSlots(date: string, serviceKey: string) {
  const supabase = getSupabaseAdmin();
  const service = getServiceByKey(serviceKey);
  if (!service) return { slots: null, error: 'Invalid service' };

  const { data: doctors } = await supabase.from('doctors').select('*').order('display_order');
  if (!doctors) return { slots: null, error: 'No doctors' };

  let candidateIds: string[] = doctors.map((d: any) => d.id);
  if (service.doctorPreference !== 'any') {
    const preferred = doctors.find((d: any) => d.name.toLowerCase().includes(service.doctorPreference));
    if (preferred) candidateIds = [preferred.id];
  }

  const { data: existing } = await supabase
    .from('bookings')
    .select('slot_time, doctor_id')
    .eq('slot_date', date)
    .in('doctor_id', candidateIds)
    .neq('status', 'cancelled');

  const bookedByDoctor = new Map<string, Set<string>>();
  for (const id of candidateIds) bookedByDoctor.set(id, new Set());
  for (const row of existing ?? []) {
    const t = String(row.slot_time).slice(0, 5);
    bookedByDoctor.get(row.doctor_id as string)?.add(t);
  }

  const day = parse(date, 'yyyy-MM-dd', new Date());
  const allSlots = generateDailySlots(day);
  const available = allSlots.filter((time) => {
    if (!isSlotBookable(date, time)) return false;
    return candidateIds.some((id) => !bookedByDoctor.get(id)?.has(time));
  });

  return {
    slots: { available, candidateIds, doctors },
    error: null,
  };
}

export async function createBooking(input: BookingInput) {
  const supabase = getSupabaseAdmin();
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { ok: false, error: msg, booking: null };
  }
  const data = parsed.data;
  const service = getServiceByKey(data.serviceKey);
  if (!service) return { ok: false, error: 'Invalid service', booking: null };

  if (!isSlotBookable(data.date, data.time)) {
    return {
      ok: false,
      error: 'Same-day bookings need 60+ minutes lead time. Please call +971 58 588 6915.',
      booking: null,
    };
  }

  const { data: doctors } = await supabase.from('doctors').select('*').order('display_order');
  if (!doctors || doctors.length === 0) {
    return { ok: false, error: 'No doctors configured', booking: null };
  }

  let candidates = doctors;
  if (service.doctorPreference !== 'any') {
    const preferred = doctors.find((d: any) => d.name.toLowerCase().includes(service.doctorPreference));
    if (preferred) candidates = [preferred];
  }

  for (const doctor of candidates) {
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        service_key: data.serviceKey,
        service_name: service.name,
        service_price: service.price,
        doctor_id: doctor.id,
        doctor_name: doctor.name,
        slot_date: data.date,
        slot_time: data.time,
        slot_datetime: slotToTimestamp(data.date, data.time),
        patient_name: data.patientName,
        patient_phone: data.patientPhone,
        patient_email: data.patientEmail || null,
        patient_notes: data.patientNotes || null,
        status: 'pending',
      })
      .select()
      .single();

    if (!error && booking) {
      await sendBookingNotifications(booking as BookingRow).catch((err) => console.error('Notify failed:', err));
      revalidatePath('/admin');
      return { ok: true, error: null, booking };
    }

    if (error && error.code === '23505') continue;

    return { ok: false, error: 'Could not create booking. Please try again.', booking: null };
  }

  return { ok: false, error: 'This slot was just taken. Please pick another time.', booking: null };
}

async function sendBookingNotifications(booking: BookingRow) {
  await Promise.all([sendBookingEmails(booking), sendBookingWhatsApp(booking)]);
}

export async function cancelBooking(bookingId: string) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', bookingId);

  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin');
  return { ok: true, error: null };
}

export async function listBookings(opts: { from?: string; to?: string; status?: string } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase.from('bookings').select('*').order('slot_datetime', { ascending: true });
  if (opts.from) query = query.gte('slot_date', opts.from);
  if (opts.to) query = query.lte('slot_date', opts.to);
  if (opts.status) query = query.eq('status', opts.status);
  const { data, error } = await query;
  return { bookings: data ?? [], error: error?.message ?? null };
}
