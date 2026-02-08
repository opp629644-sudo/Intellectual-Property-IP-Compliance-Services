import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validators';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  const formData = await req.formData();
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  await createSession({ sub: user.id, role: user.role, email: user.email });
  return NextResponse.json({ message: 'Login successful', role: user.role });
}
