import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const services = await prisma.service.findMany({ where: { enabled: true }, select: { id: true, title: true, slug: true, price: true, description: true } });
  return NextResponse.json(services);
}
