import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { AppointmentStatus, ConsultationMode, Role } from '@prisma/client';
import { appointmentSchema } from '@/lib/validators';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const uploadDir = path.join(process.cwd(), 'public/uploads');

async function saveDocument(file: File | null) {
  if (!file || !file.size) return null;
  const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowed.includes(file.type)) return null;

  await fs.mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  await fs.writeFile(path.join(uploadDir, safeName), bytes);
  return `/uploads/${safeName}`;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const input = Object.fromEntries(formData.entries());
  const parsed = appointmentSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid booking details' }, { status: 400 });

  const session = await getSession();
  let userId = session?.sub;

  if (!userId) {
    const tempPasswordHash = 'guest-booking';
    const user = await prisma.user.upsert({
      where: { email: parsed.data.email },
      update: { name: parsed.data.name, phone: parsed.data.phone, companyName: parsed.data.companyName },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        companyName: parsed.data.companyName,
        passwordHash: tempPasswordHash,
        role: Role.CLIENT,
        emailVerified: true
      }
    });
    userId = user.id;
  }

  const documentPath = await saveDocument(formData.get('document') as File | null);

  await prisma.appointment.create({
    data: {
      userId,
      serviceId: parsed.data.serviceId,
      mode: parsed.data.mode as ConsultationMode,
      date: new Date(parsed.data.date),
      timeSlot: parsed.data.timeSlot,
      details: parsed.data.details,
      documentPath,
      status: AppointmentStatus.PENDING
    }
  });

  return NextResponse.json({ message: 'Appointment received. Confirmation email/SMS queued.' });
}
