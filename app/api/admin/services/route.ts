import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await prisma.service.findMany());
}

export async function PATCH(req: Request) {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const service = await prisma.service.update({ where: { id: body.id }, data: body.data });
  return NextResponse.json(service);
}
