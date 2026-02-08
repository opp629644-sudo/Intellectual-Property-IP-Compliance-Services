# IP & Compliance Services Platform

Production-grade Next.js platform for an Intellectual Property and Compliance firm.

## Features
- Public marketing website (home, about, services, booking, pricing, contact)
- Secure authentication (register/login/logout), JWT cookie sessions, role-based access
- Client portal for appointment tracking, consultant notes, and invoices
- Admin panel for users, appointments, services, availability, documents, notifications
- Appointment booking with document upload (PDF/JPG/PNG)
- Prisma + SQLite database, seed data for services and admin
- SEO-friendly metadata and responsive legal-corporate design system (navy/white/gold)

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env:
   ```bash
   cp .env.example .env
   ```
3. Initialize DB and seed:
   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```
4. Start:
   ```bash
   npm run dev
   ```

### Default admin
- Email: `admin@ipcompliance.com`
- Password: `Admin@12345`

## Security and compliance notes
- Password hashing via bcrypt
- JWT sessions in HTTP-only cookies
- Role-based route protection via middleware and server checks
- Input validation with Zod
- GDPR-style privacy baseline: minimal data storage, controlled document uploads, and explicit profile controls

## Integrations to wire for production
- SMTP provider for verification/reset emails
- SMS provider (Twilio/etc.) for booking notifications
- Cloud object storage (S3/etc.) for encrypted document management
- Payment gateway and invoice generation pipeline
