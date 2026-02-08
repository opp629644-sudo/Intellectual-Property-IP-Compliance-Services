import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { seoDefaults } from '@/lib/data';

export const metadata: Metadata = {
  title: seoDefaults.title,
  description: seoDefaults.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
