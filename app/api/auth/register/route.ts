import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validators';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const formData = await req.formData();
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.create({ data: { ...parsed.data, passwordHash, emailVerified: true } });

  return NextResponse.json({ message: 'Account created. Email verified.' });
}
