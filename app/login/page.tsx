'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  async function onSubmit(formData: FormData) {
    const res = await fetch('/api/auth/login', { method: 'POST', body: formData });
    const data = await res.json();
    setMessage(data.error || 'Login successful. Redirecting...');
    if (res.ok) location.href = data.role === 'ADMIN' ? '/admin' : '/client';
  }

  return (
    <form action={onSubmit} className="mx-auto max-w-md space-y-4 rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-bold text-navy">Portal Login</h1>
      <input className="w-full rounded border p-3" name="email" type="email" placeholder="Email" required />
      <input className="w-full rounded border p-3" name="password" type="password" placeholder="Password" required />
      <button className="w-full rounded bg-navy py-3 font-semibold text-white">Sign In</button>
      <p className="text-sm text-slate-600">No account? <a href="/register" className="text-navy">Create one</a></p>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
