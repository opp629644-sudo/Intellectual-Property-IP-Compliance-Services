import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminServices() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') redirect('/login');
  const services = await prisma.service.findMany();

  return <div className="space-y-3"><h1 className="text-2xl font-bold text-navy">Services Management</h1>{services.map((service)=><div className="card" key={service.id}><p className="font-semibold">{service.title}</p><p>${service.price} • {service.enabled ? 'Enabled' : 'Disabled'}</p></div>)}</div>;
}
