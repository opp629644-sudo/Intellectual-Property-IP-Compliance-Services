import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, phone: true, companyName: true, role: true, createdAt: true } });
  return NextResponse.json(users);
}
