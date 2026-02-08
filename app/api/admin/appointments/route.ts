import { NextResponse } from 'next/server';
import { AppointmentStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await prisma.appointment.findMany({ include: { user: true, service: true } }));
}

export async function PATCH(req: Request) {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const appointment = await prisma.appointment.update({
    where: { id: body.id },
    data: {
      status: body.status as AppointmentStatus,
      assignedConsultant: body.assignedConsultant,
      details: body.internalNote
    }
  });
  return NextResponse.json(appointment);
}
