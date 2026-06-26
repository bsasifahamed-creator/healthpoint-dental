import { z } from 'zod';

export const CONTACT_TOPICS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'appointment', label: 'Appointment help' },
  { value: 'pricing', label: 'Pricing & insurance' },
  { value: 'emergency', label: 'Urgent / pain' },
  { value: 'other', label: 'Something else' },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number')
    .max(20, 'Phone is too long')
    .regex(/^[+0-9 ()-]+$/, 'Use digits, spaces, +, -, ( )'),
  topic: z.enum(['general', 'appointment', 'pricing', 'emergency', 'other']),
  message: z
    .string()
    .trim()
    .min(8, 'A short note helps us prepare')
    .max(2000, 'Please keep it under 2000 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;
