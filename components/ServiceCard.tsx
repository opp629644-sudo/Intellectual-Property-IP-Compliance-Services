import Link from 'next/link';

type Props = { title: string; description: string; price: number; slug?: string };

export function ServiceCard({ title, description, price, slug }: Props) {
  return (
    <article className="card">
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <p className="mt-4 font-semibold text-gold">From ${price.toFixed(0)}</p>
      {slug && <Link className="mt-4 inline-block text-sm font-semibold text-navy" href={`/services/${slug}`}>Explore service →</Link>}
    </article>
  );
}
