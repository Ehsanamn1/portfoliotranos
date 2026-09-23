# Tranos Studio

Premium AI / Digital Creative Studio portfolio — luxury, cinematic and future-facing.

## Current Published Frontend

The production-ready visual portfolio is currently published in the repository root as:

- `index.html` — primary deployable website entrypoint
- Responsive layout for desktop, tablet and mobile
- Luxury dark visual system with gold, violet and cyan accents
- Animated hero scene and scroll-reveal interactions
- Work, Services, Process, About, Insights and Contact sections
- Accessible reduced-motion fallback
- No build step is required for the root static version

## Deploy

For a static host/import workflow, use the repository root as the site source and `index.html` as the entrypoint.

The project is intentionally kept deployment-friendly so it can be imported directly into a hosting platform such as VibeNest.

## Repository Structure

```text
.
├── index.html
├── src/
│   └── app/
│       └── page.tsx
├── AI_CONTEXT.md
└── .github/
    └── workflows/
        └── cloudflare-pages.yml
```

## Design Direction

- Luxury dark cinematic UI
- Black / graphite base
- Purple, cyan and gold accents
- Editorial typography
- Premium agency aesthetic
- AI / digital / creative positioning

## Planned Full-Stack Modules

The current published site is the frontend/static experience. The full application roadmap remains:

- Next.js + TypeScript application architecture
- PostgreSQL + Prisma
- Secure authentication and role-based admin
- CMS / content management
- Project and case-study CRUD
- Insights/blog CMS
- Media library and storage abstraction
- Admin dashboard
- API layer, validation and rate limiting
- Automated tests and production observability

## Important

Do not place API tokens, database passwords, private keys or other secrets in this repository. Use the hosting platform's environment/secret settings for deployment credentials.

## GitHub

Repository: https://github.com/Ehsanamn1/portfoliotranos
