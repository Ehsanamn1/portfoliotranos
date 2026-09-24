# Qwen Code Context - Tranos Studio

## Project Identity
Tranos Studio is a premium AI and digital creative studio.

## Design Direction
- Luxury dark cinematic UI
- Black background
- Purple, cyan and gold accents
- Premium agency aesthetic
- Minimal editorial typography

## Main Goal
Recreate the reference UI with production quality.

## Future Modules
- CMS
- Admin Dashboard
- Authentication
- Prisma/PostgreSQL
- AI integrations

Do not replace the visual identity with generic templates.

## 2026-09-24 — Cinematic hero upgrade
- Added `src/app/hero-visual.tsx` for a client-side interactive hero visual.
- Hero now combines Canvas particles/network geometry with CSS 3D-style orbital layers, scan motion, and pointer parallax.
- The implementation avoids introducing a heavy 3D dependency and remains compatible with the existing Next.js + Cloudflare Workers architecture.
- Reduced-motion users receive a static presentation with animations disabled.

## 2026-09-24 — Tranos Studio production experience layer
- Added responsive corporate studio pages: Work, Services, About, Insights, Contact, project case studies and branded loading/404 states.
- Added dark/light theme switching and EN/FA/ES/DE locale support with RTL for Persian.
- Added four-item mobile bottom navigation.
- Added cinematic case-study 3D stage with pointer parallax, concept SVG artwork, metrics, Challenge/Solution/Impact, technologies and gallery.
- Expanded Prisma CMS with Services, SiteSetting and rich Project case-study fields.
- Expanded Control Center with Projects, Insights, Services, Site Settings and Messages management.
- Added deploy-time Prisma migration/seed step when production Cloudflare/database/admin secrets are configured.
