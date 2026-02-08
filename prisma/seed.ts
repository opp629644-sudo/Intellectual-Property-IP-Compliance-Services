import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const services = [
  ['trademark-registration', 'Trademark Registration', 'Secure your brand identity and legal ownership.', 'Shield', 299, 'IP'],
  ['patent-filing-drafting', 'Patent Filing & Drafting', 'Protect inventions with strategic patent drafting.', 'FileText', 899, 'IP'],
  ['copyright-protection', 'Copyright Protection', 'Safeguard creative works across mediums.', 'Copyright', 199, 'IP'],
  ['industrial-design-registration', 'Industrial Design Registration', 'Protect visual designs and product aesthetics.', 'PenTool', 399, 'IP'],
  ['iso-certification', 'ISO Certification Consultancy', 'Implement ISO 9001, 14001, 27001 compliance.', 'BadgeCheck', 999, 'Compliance'],
  ['startup-msme-compliance', 'Startup & MSME Compliance', 'End-to-end legal and statutory startup support.', 'Briefcase', 499, 'Compliance']
] as const;

async function main() {
  const adminPassword = await bcrypt.hash('Admin@12345', 12);

  await prisma.user.upsert({
    where: { email: 'admin@ipcompliance.com' },
    update: {},
    create: {
      name: 'Platform Admin',
      email: 'admin@ipcompliance.com',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      emailVerified: true
    }
  });

  for (const [slug, title, description, icon, price, category] of services) {
    await prisma.service.upsert({
      where: { slug },
      update: { title, description, icon, price, category, enabled: true },
      create: { slug, title, description, icon, price, category, enabled: true }
    });
  }
}

main().finally(async () => prisma.$disconnect());
