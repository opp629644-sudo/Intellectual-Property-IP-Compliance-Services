import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') redirect('/login');

  const [users, appointments, services] = await Promise.all([
    prisma.user.count(),
    prisma.appointment.count(),
    prisma.service.count({ where: { enabled: true } })
  ]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-navy">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="text-sm">Total Users</p><p className="text-2xl font-bold">{users}</p></div>
        <div className="card"><p className="text-sm">Total Appointments</p><p className="text-2xl font-bold">{appointments}</p></div>
        <div className="card"><p className="text-sm">Active Services</p><p className="text-2xl font-bold">{services}</p></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <a href="/admin/appointments" className="card">Appointment Management</a>
        <a href="/admin/users" className="card">User Database</a>
        <a href="/admin/services" className="card">Services Management</a>
        <a href="/admin/availability" className="card">Time Slot & Availability</a>
        <a href="/admin/documents" className="card">Document Management</a>
        <a href="/admin/notifications" className="card">Notification Templates</a>
      </div>
    </section>
  );
}
