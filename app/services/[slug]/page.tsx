import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!service) return notFound();

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold text-navy">{service.title}</h1>
      <p>{service.description}</p>
      <p className="font-semibold text-gold">Package starts at ${service.price}</p>
      <p>Deliverables include document review, drafting support, filing coordination, and compliance tracking.</p>
    </article>
  );
}
