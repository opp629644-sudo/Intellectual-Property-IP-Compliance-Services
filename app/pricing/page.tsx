const plans = [
  ['Starter', 'Single filing support for early-stage founders.', '$299'],
  ['Growth', 'Multi-service IP and compliance advisory.', '$999'],
  ['Enterprise', 'Dedicated legal + compliance office support.', 'Custom']
];

export default function PricingPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-navy">Pricing Plans</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {plans.map(([name, description, price]) => (
          <div className="card" key={name}><h2 className="font-semibold">{name}</h2><p>{description}</p><p className="mt-3 text-xl font-bold text-gold">{price}</p></div>
        ))}
      </div>
    </section>
  );
}
