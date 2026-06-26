import { z } from 'zod';

export const bookingSchema = z.object({
  serviceKey: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  patientName: z.string().min(2).max(100),
  patientPhone: z.string().regex(/^\+971[0-9]{9}$/, 'Use UAE format: +971XXXXXXXXX'),
  patientEmail: z.string().email().optional().or(z.literal('')),
  patientNotes: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
