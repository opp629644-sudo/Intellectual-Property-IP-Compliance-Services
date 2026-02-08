export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-navy">About Us</h1>
      <p className="text-slate-600">We are a specialized IP and compliance consultancy with legal advisors, chartered experts, and ISO implementation specialists.</p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><h2 className="font-semibold">Mission</h2><p>Protect innovation with practical legal strategy.</p></div>
        <div className="card"><h2 className="font-semibold">Vision</h2><p>Become the most trusted compliance partner for growth-stage businesses.</p></div>
        <div className="card"><h2 className="font-semibold">Standards</h2><p>Confidential, GDPR-aligned, and audit-ready delivery.</p></div>
      </div>
    </div>
  );
}
