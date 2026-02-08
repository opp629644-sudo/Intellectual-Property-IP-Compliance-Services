'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [message, setMessage] = useState('');
  async function onSubmit(formData: FormData) {
    const res = await fetch('/api/auth/register', { method: 'POST', body: formData });
    const data = await res.json();
    setMessage(data.message || data.error);
    if (res.ok) location.href = '/login';
  }

  return (
    <form action={onSubmit} className="mx-auto max-w-lg space-y-4 rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-bold text-navy">Create Client Account</h1>
      <input className="w-full rounded border p-3" name="name" placeholder="Full Name" required />
      <input className="w-full rounded border p-3" name="email" type="email" placeholder="Email" required />
      <input className="w-full rounded border p-3" name="phone" placeholder="Phone" />
      <input className="w-full rounded border p-3" name="companyName" placeholder="Company Name" />
      <input className="w-full rounded border p-3" name="password" type="password" placeholder="Password" required minLength={8} />
      <button className="w-full rounded bg-navy py-3 font-semibold text-white">Register</button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
