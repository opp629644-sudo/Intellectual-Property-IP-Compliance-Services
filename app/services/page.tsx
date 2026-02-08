import { prisma } from '@/lib/prisma';
import { ServiceCard } from '@/components/ServiceCard';

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { category: 'asc' } });

  return (
    <section>
      <h1 className="text-3xl font-bold text-navy">Services</h1>
      <p className="mt-2 text-slate-600">Strategic legal and certification support tailored to your business.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} title={service.title} description={service.description} price={service.price} slug={service.slug} />
        ))}
      </div>
    </section>
  );
}
