# AGENTS.md — EYRYA Website

## Project Overview

Brand marketing website for EYRYA (foam fingers, party supplies, outdoor products). Traffic is directed to Amazon and Temu storefronts.

- **Framework**: Next.js 16.1.6 (App Router, `output: 'export'` → static HTML in `dist/`)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **Language**: TypeScript throughout
- **Backend**: Cloudflare Pages Functions (`functions/api/*.js`) — NOT Next.js API routes
- **Email**: Resend API via Cloudflare Pages Functions
- **Fonts**: Outfit (body) + Teko (H1/H2 headings, uppercase) via `@fontsource`

## Build Commands

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Build static site → dist/
npm run start    # Preview static build locally
npm run lint     # ESLint (eslint-config-next/core-web-vitals + typescript)
```

**Important**: `output: 'export'` disables Next.js API routes. All server-side logic lives in `functions/` (Cloudflare Pages Functions). Do NOT create `pages/api/` or `app/api/` routes.

## Architecture

```
Browser
  ├── /           → Next.js static page (dist/)
  ├── /api/contact  → functions/api/contact.js (Pages Function → Resend)
  ├── /api/wholesale → functions/api/wholesale.js (Pages Function → Resend)
  ├── /api/support   → functions/api/support.js (Pages Function → Resend)
  └── /admin.html   → public/admin.html (static)

Cloudflare Pages
  ├── Static: Next.js export in dist/
  ├── Functions: functions/api/*.js (Pages Functions, not Workers)
  └── D1/R2: wrangler.toml bindings (admin only)
```

## Brand Design System

| Element | Value |
|---------|-------|
| Background | `#F4F1EA` (warm white) |
| Foreground/Text | `#1A1A1A` (near black) |
| Accent | `#DC2626` (brand red) |
| Button corners | `rounded-sm` (2px) **only** — never `rounded-xl`, `rounded-full` |
| Body font | Outfit (via `@fontsource/outfit`) |
| Heading font | Teko, uppercase (via `@fontsource/teko`) |

## Code Style

### TypeScript
- Strict types — no `as any`, `@ts-ignore`, `@ts-expect-error`
- Use explicit return types for exported functions
- Prefer `interface` over `type` for object shapes

### Imports
- No default re-exports from config files
- CSS import first, then third-party, then local
- Server components: no `'use client'` directive
- Client components: `'use client'` at top, split into server wrapper + client component file

### Formatting
- 2 spaces for indentation (no tabs)
- Single quotes for strings
- Trailing commas
- No semicolons (follow Next.js/ESLint defaults)
- Max line length: ~100 chars (wrap long expressions)

### Naming
- Components: PascalCase (`WhereToBuySection.tsx`)
- Server wrappers: PascalCase + page name (`WholesalePage.tsx`)
- Client components: PascalCase + descriptive name (`WholesaleForm.tsx`)
- Utilities/hooks: camelCase (`useContactForm.ts`)
- Files: kebab-case or PascalCase for components

### Error Handling
- Always handle errors explicitly — no empty `catch {}` blocks
- Cloudflare Pages Functions: use `try/catch`, return proper status codes
- Client-side forms: handle loading/success/error states explicitly
- Never suppress errors with `as any` or `@ts-ignore`

### SVG
- Prefer `<img src="/filename.svg">` for logos and icons
- Inline SVG only when dynamic styling is required
- Never inline SVG paths unless necessary

## Cloudflare Pages Functions

Functions live in `functions/api/` and export `onRequest` / `onRequestPost`:

```javascript
export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return corsPreflight();
  }
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  return onRequestPost(context);
}

export async function onRequestPost(context) {
  // Handle POST
}
```

Environment variables: `env.RESEND_API_KEY`, `env.CONTACT_EMAIL`, `env.WHOLESALE_EMAIL`, `env.SUPPORT_EMAIL`.

## SEO

- All pages export `Metadata` object with `title`, `description`, `keywords`, `alternates.canonical`
- Title template: `"%s"` in `layout.tsx`
- Sitemap: `public/sitemap.xml`
- Robots: `public/robots.txt`

## File Patterns

| Pattern | Description |
|---------|-------------|
| `app/page.tsx` | Server component, page root |
| `app/components/X.tsx` | Server component |
| `app/*/page.tsx` | Server wrapper (imports client component) |
| `app/*/X.tsx` | Client component (`'use client'`) |
| `functions/api/x.js` | Cloudflare Pages Function |
| `public/images/` | Static images |

## ESLint

Uses `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

## Common Issues

1. **Build fails with API route errors** — You likely created `app/api/` routes. Use `functions/api/` instead.
2. **Forms not submitting** — Check env vars `RESEND_API_KEY`, `CONTACT_EMAIL`, `WHOLESALE_EMAIL`, `SUPPORT_EMAIL` in Cloudflare Pages settings.
3. **Styles broken** — Verify `distDir: 'dist'` in `next.config.ts`.
4. **Logo not showing** — Use `<img src="/Amazon_logo.svg">` (public directory), not inline SVG unless necessary.
