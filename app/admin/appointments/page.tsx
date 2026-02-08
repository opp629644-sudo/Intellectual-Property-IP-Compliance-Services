import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminAppointments() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') redirect('/login');
  const appointments = await prisma.appointment.findMany({ include: { user: true, service: true }, orderBy: { createdAt: 'desc' } });

  return <div className="space-y-3"><h1 className="text-2xl font-bold text-navy">Appointments</h1>{appointments.map((a)=><div className="card" key={a.id}><p className="font-semibold">{a.user.name} • {a.service.title}</p><p>{a.status} | {new Date(a.date).toDateString()} {a.timeSlot}</p></div>)}</div>;
}
