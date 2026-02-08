import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(8).optional(),
  companyName: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const appointmentSchema = z.object({
  serviceId: z.string().min(1),
  mode: z.enum(['ONLINE', 'OFFICE']),
  date: z.string().min(1),
  timeSlot: z.string().min(1),
  details: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  companyName: z.string().optional()
});
