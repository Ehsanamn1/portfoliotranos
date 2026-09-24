# Tranos Studio

Premium AI / Digital Creative Studio built with **Next.js + React + TypeScript**, now with a real PostgreSQL/Prisma backend.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- PostgreSQL
- Prisma 7 + PostgreSQL adapter
- Zod validation
- Cookie-based admin sessions
- Cloudflare Workers + OpenNext
- GitHub Actions build checks

## Backend now included

### Database

Prisma models are defined for:

- Contact messages / leads
- Projects
- Insights
- Admin users
- Admin sessions

Migration files live under `prisma/migrations/`.

### API

- `GET /api/health` — application/database health
- `POST /api/contact` — validated contact submission persisted to PostgreSQL
- `GET /api/projects` — published projects
- `GET /api/insights` — published insights
- `POST /api/auth/login` — admin login with hashed passwords
- `POST /api/auth/logout` — destroy current admin session
- `GET /api/admin/messages` — authenticated admin access to contact leads

### Security foundations

- Password hashing with bcrypt
- HTTP-only session cookie
- Secure cookie settings in production
- Session expiry and server-side session storage
- Zod request validation
- Secrets kept out of Git

## Environment

Copy `.env.example` to your local environment and set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-before-production"
```

Run:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Database test:

```bash
npm run db:test
```

## Cloudflare

The project is no longer configured as a static Next.js export because the backend needs server runtime support.

Cloudflare's current guidance supports full-stack Next.js on Workers. This repository uses the documented OpenNext path with `nodejs_compat`, while Cloudflare currently recommends vinext for new Next.js-on-Workers applications. citeturn843501search0turn592386search0

Cloudflare runtime config is in `wrangler.jsonc` and `open-next.config.ts`.

Required production secret:

```env
DATABASE_URL=...
```

Admin credentials should also be supplied through the hosting platform's secret/environment settings.

## Build

```bash
npm run build
npm run build:cloudflare
```

## Important

The repository now contains the backend architecture and API implementation. A live PostgreSQL database is still required before the backend can accept production data.

Repository:
https://github.com/Ehsanamn1/portfoliotranos
