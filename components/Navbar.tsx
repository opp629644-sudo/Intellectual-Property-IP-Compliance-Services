import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-navy">IP Compliance Pro</Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/booking">Book</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login" className="text-navy">Portal Login</Link>
        </div>
      </nav>
    </header>
  );
}
