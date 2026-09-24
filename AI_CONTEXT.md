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
