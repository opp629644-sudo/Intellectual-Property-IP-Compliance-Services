import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminUsers() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') redirect('/login');
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });

  return <div className="space-y-3"><h1 className="text-2xl font-bold text-navy">User Database</h1>{users.map((u)=><div className="card" key={u.id}><p className="font-semibold">{u.name} ({u.role})</p><p>{u.email} | {u.phone || 'No phone'} | {u.companyName || 'No company'}</p></div>)}</div>;
}
