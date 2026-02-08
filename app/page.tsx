import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ServiceCard } from '@/components/ServiceCard';
import { trustBadges } from '@/lib/data';

export default async function Home() {
  const services = await prisma.service.findMany({ where: { enabled: true }, take: 6 });

  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-r from-navy to-slateLegal px-8 py-14 text-white">
        <p className="text-sm uppercase tracking-wide text-gold">Intellectual Property & Compliance Consultancy</p>
        <h1 className="mt-3 text-4xl font-bold">Protect Your Ideas. Comply With Confidence.</h1>
        <p className="mt-3 max-w-2xl text-slate-100">Build legal certainty with trademark, patent, copyright, design registration, and ISO certification advisory from experienced consultants.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/booking" className="rounded-lg bg-gold px-5 py-3 font-semibold text-navy">Book Consultation</Link>
          <Link href="/contact" className="rounded-lg border border-white px-5 py-3 font-semibold">Talk to an Expert</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {trustBadges.map((badge) => (
          <div key={badge} className="card border-gold/30 text-center font-semibold text-navy">{badge}</div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-navy">Our Core Services</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} title={service.title} description={service.description} price={service.price} slug={service.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
