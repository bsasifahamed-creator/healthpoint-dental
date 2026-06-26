import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, updates } = body;

    if (!bookingId || !updates) {
      return NextResponse.json(
        { error: 'Missing bookingId or updates' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    
    // Build update object with only provided fields
    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.status) updateData.status = updates.status;
    if (updates.slot_date) updateData.slot_date = updates.slot_date;
    if (updates.slot_time) updateData.slot_time = updates.slot_time;
    if (updates.patient_name) updateData.patient_name = updates.patient_name;
    if (updates.patient_phone) updateData.patient_phone = updates.patient_phone;
    if (updates.patient_email) updateData.patient_email = updates.patient_email;
    if (updates.patient_notes !== undefined) updateData.patient_notes = updates.patient_notes;
    if (updates.service_key) updateData.service_key = updates.service_key;
    if (updates.service_name) updateData.service_name = updates.service_name;
    if (updates.service_price) updateData.service_price = updates.service_price;
    if (updates.doctor_name) updateData.doctor_name = updates.doctor_name;

    const { data: booking, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Booking update error:', error);
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    console.error('Booking update API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
