# Tranos Studio

Premium AI / Digital Creative Studio portfolio built with **Next.js + React + TypeScript**.

## Current stack

- Next.js 16.3.x
- React 19.2
- TypeScript
- Next.js App Router
- Static export for Cloudflare Pages
- CSS design system with responsive layouts and motion
- GitHub-ready and VibeNest-ready

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The build output is generated in `out/`.

## Cloudflare Pages

This project is configured for a Next.js static export. Cloudflare's current Pages documentation uses:

- Framework preset: **Next.js (Static HTML Export)**
- Production branch: `main`
- Build command: `npx next build`
- Build directory: `out`

Cloudflare can connect directly to this GitHub repository and automatically rebuild after pushes.

## Project structure

```text
.
├── package.json
├── next.config.ts
├── tsconfig.json
├── public/
│   └── favicon.svg
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
└── .github/
    └── workflows/
        └── next-build.yml
```

## Product roadmap

The frontend is now a real React/Next.js application rather than the previous standalone HTML entrypoint. The architecture is ready to grow into:

- CMS and admin dashboard
- PostgreSQL + Prisma
- Authentication and RBAC
- Project / case-study CRUD
- Insights/blog CMS
- Media storage
- API and server actions
- AI integrations
- Automated tests

Those backend modules are not claimed as implemented until they are actually added and tested.

## Security

Never commit API tokens, database passwords, private keys or other secrets. Configure deployment credentials in the hosting platform's secrets/environment settings.

Repository:
https://github.com/Ehsanamn1/portfoliotranos
