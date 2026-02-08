import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function ClientDashboard() {
  const session = await getSession();
  if (!session) redirect('/login');

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.sub },
    include: { service: true, notes: true, invoices: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Client Dashboard</h1>
      <p className="mb-6 text-slate-600">Track status, notes, and invoices for your bookings.</p>
      <div className="space-y-4">
        {appointments.map((a) => (
          <div className="card" key={a.id}>
            <div className="flex justify-between"><h2 className="font-semibold">{a.service.title}</h2><span className="font-medium text-navy">{a.status}</span></div>
            <p>{new Date(a.date).toDateString()} at {a.timeSlot} ({a.mode})</p>
            <p className="text-sm">Consultant: {a.assignedConsultant || 'Pending assignment'}</p>
            {a.notes.map((n) => <p key={n.id} className="mt-2 rounded bg-slate-100 p-2 text-sm">Note: {n.note}</p>)}
            {a.invoices.map((i) => <a key={i.id} className="text-sm text-navy" href={i.url}>Download invoice (${i.amount})</a>)}
          </div>
        ))}
        {appointments.length === 0 && <p>No appointments yet.</p>}
      </div>
    </div>
  );
}
