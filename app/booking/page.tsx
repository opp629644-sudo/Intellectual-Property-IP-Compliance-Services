'use client';

import { useEffect, useState } from 'react';

type Service = { id: string; title: string };

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/services').then((res) => res.json()).then(setServices);
  }, []);

  async function submit(formData: FormData) {
    const res = await fetch('/api/appointments', { method: 'POST', body: formData });
    const data = await res.json();
    setMessage(data.message || data.error);
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-navy">Book an Appointment</h1>
      <form action={submit} className="mt-6 grid gap-4 rounded-xl border bg-white p-6 md:grid-cols-2">
        <input name="name" required placeholder="Name" className="rounded border p-3" />
        <input name="email" required type="email" placeholder="Email" className="rounded border p-3" />
        <input name="phone" required placeholder="Phone" className="rounded border p-3" />
        <input name="companyName" placeholder="Company Name" className="rounded border p-3" />
        <select name="serviceId" required className="rounded border p-3">
          <option value="">Select service</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
        <select name="mode" required className="rounded border p-3">
          <option value="ONLINE">Online</option>
          <option value="OFFICE">Office</option>
        </select>
        <input name="date" required type="date" className="rounded border p-3" />
        <input name="timeSlot" required type="time" className="rounded border p-3" />
        <input name="document" type="file" accept=".pdf,.jpg,.jpeg,.png" className="rounded border p-3" />
        <textarea name="details" placeholder="Describe your requirement" className="rounded border p-3 md:col-span-2" rows={4} />
        <button className="rounded bg-navy px-4 py-3 font-semibold text-white md:col-span-2">Submit Booking</button>
      </form>
      {message && <p className="mt-4 font-medium text-navy">{message}</p>}
    </section>
  );
}
