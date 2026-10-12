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

Environment variables: `env.RESEND_API_KEY`, `env.ADMIN_TOKEN`, `env.CONTACT_EMAIL`, `env.WHOLESALE_EMAIL`, `env.SUPPORT_EMAIL`, `env.IMAGES_CUSTOM_DOMAIN`. Bindings: `env.DB` (D1), `env.IMAGES_BUCKET` (R2).

Prefer the shared helpers in `functions/api/_shared.js` (`jsonResponse`, `resolveCorsHeaders`, `escapeHtml`, `readFormFields`, `sendResendEmail`) instead of hand-rolling responses per endpoint. Never send `Access-Control-Allow-Origin: *`, never echo `error.message` to the client, and never return `Object.keys(env)`.

### Admin API auth

Every `/api/admin/*` route is guarded by `functions/api/admin/_middleware.js`, which requires `Authorization: Bearer <ADMIN_TOKEN>` and fails closed (503) when the secret is unset. Never add a client-side password or trust a value that comes from the browser without server-side verification.

## Data: one source of truth

Business facts live in `lib/`, not in page components:

| Module | Contents |
|--------|----------|
| `lib/products.ts` | Products, categories, `BRAND` numbers, marketplace URLs |
| `lib/posts.ts` | Blog posts (metadata + body HTML) |
| `lib/faq.ts` | Support FAQ, shared by the visible accordion and the FAQPage JSON-LD |

Pages and components must import from these modules. Never re-type a price, rating, review count, units-sold figure, pack size, or marketplace URL into a component — that is exactly how the hero ended up claiming 1,247 sold while the detail page claimed 50,000.

Share one presentational server component between an index route and its category routes (see `app/products/ProductsView.tsx`). Represent filtering as a real route segment (`/products/category/<slug>/`), never as a `?category=` query param — `useSearchParams` forces the page into client-only rendering and the exported HTML loses its heading and product grid.

## SEO

- All pages export a `Metadata` object with `title`, `description`, `alternates.canonical`
- Title template: `"%s | EYRYA"` in `layout.tsx`. Because most page titles already contain the brand, use `title: { absolute: '...' }` instead of a plain string, or the brand is appended twice
- Sitemap: generated by `app/sitemap.ts` from `lib/`
- Robots: generated by `app/robots.ts` (disallows `/admin.html`)
- Structured data must match what the page visibly renders — build it from the same data the page renders

## Styling constraints

- The brand has a **single light palette**. Never add a `prefers-color-scheme: dark` block to `globals.css`: components hardcode light colors such as `text-[#1a1a1a]`, so a dark background makes headings invisible
- Tailwind cannot see class names built from interpolated values. `` className={`hover:border-[${color}]`} `` never matches; write the full literal class instead
- Do not hide framework error overlays with CSS

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

Uses `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Ignores: `.next/**`, `out/**`, `build/**`, **`dist/**`**, `next-env.d.ts`.

`dist/**` matters: `distDir` is `dist`, so without that ignore `npm run lint` after a build lints the minified bundles and reports ~1900 problems that hide the real findings.

## Common Issues

1. **Build fails with API route errors** — You likely created `app/api/` routes. Use `functions/api/` instead.
2. **Forms not submitting** — Check env vars `RESEND_API_KEY` (and the optional inbox overrides) in Cloudflare Pages settings. A 502 means Resend rejected or was unreachable; a 503 means the server has no API key.
3. **Styles broken** — Verify `distDir: 'dist'` in `next.config.ts`.
4. **Logo not showing** — Use `<img src="/Amazon_logo.svg">` (public directory), not inline SVG unless necessary.
5. **Admin API returns 401/503** — `ADMIN_TOKEN` is missing, wrong, or not configured; see the auth section above.
6. **Blog or legal pages render as one wall of text** — `@tailwindcss/typography` is missing from `package.json` or `@plugin "@tailwindcss/typography";` is missing from `globals.css`. Every `prose` class is a no-op without it.
7. **A page's H1 or product grid is missing from `dist/*.html`** — a client component in the tree is calling `useSearchParams`; move the state into a route segment.
