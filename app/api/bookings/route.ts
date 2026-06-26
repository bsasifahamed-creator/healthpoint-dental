import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
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
