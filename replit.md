# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Legal Nations Landing Page (`artifacts/legal-nations`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview path**: `/` (root)
- **Purpose**: Full marketing landing page for Legal Nations global company registration platform
- **Sections**: Announcement bar, sticky nav, hero (with AI-generated dashboard image), logo carousel, How It Works, Countries grid (8 countries), USA Delaware vs Wyoming deep dive, pricing table (3 tiers), all-in-one feature showcase (4 blocks with AI images), competitor comparison (vs firstbase.io, LegalZoom, Stripe Atlas, BookMyLLC), stats + testimonials, trust badges, FAQ accordion, final CTA banner, footer with 4 office addresses
- **Features**: Floating WhatsApp button (wa.me/919306500349 — +91 93065 00349), scroll animations (framer-motion), cookie consent banner, mobile responsive, scroll-to-top button
- **Social**: Instagram only — @legal.nations (https://instagram.com/legal.nations)
- **Color system**: Light blue theme — primary hsl(232 72% 52%) (#3347D4), white bg, dark navy footer #1A1E3C
- **Fonts**: Inter (all weights throughout)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/legal-nations run dev` — run Legal Nations landing page locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
