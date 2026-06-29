import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const BOOKING_RATE_LIMIT_MAX = 10;
const BOOKING_RATE_LIMIT_WINDOW = 60_000;
const bookingRateMap = new Map<string, { count: number; resetAt: number }>();

function checkBookingRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = bookingRateMap.get(key);
  if (!entry || now > entry.resetAt) {
    bookingRateMap.set(key, { count: 1, resetAt: now + BOOKING_RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= BOOKING_RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkBookingRateLimit(`booking:${ip}`)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { serviceKey, patientName, patientPhone, patientEmail, patientNotes, date, time } = body;

    if (!serviceKey || !patientName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    
    // Get service details
    const { data: services } = await supabase
      .from('services')
      .select('*')
      .eq('key', serviceKey)
      .single();

    const serviceName = services?.name || serviceKey;
    const servicePrice = services?.price || 0;

    // Get first available doctor
    const { data: doctors } = await supabase
      .from('doctors')
      .select('id, name')
      .order('display_order', { ascending: true })
      .limit(1)
      .single();

    if (!doctors) {
      return NextResponse.json(
        { error: 'No doctors available' },
        { status: 500 }
      );
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        service_key: serviceKey,
        service_name: serviceName,
        service_price: servicePrice,
        doctor_id: doctors.id,
        doctor_name: doctors.name,
        slot_date: date,
        slot_time: time,
        patient_name: patientName,
        patient_phone: patientPhone || '',
        patient_email: patientEmail || null,
        patient_notes: patientNotes || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Booking insert error:', error);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
