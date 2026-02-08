import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [totalUsers, totalAppointments, activeServices] = await Promise.all([
    prisma.user.count(),
    prisma.appointment.count(),
    prisma.service.count({ where: { enabled: true } })
  ]);

  return NextResponse.json({ totalUsers, totalAppointments, activeServices });
}
