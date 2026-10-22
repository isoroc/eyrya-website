# AGENTS.md — EYRYA Website

## Project Overview

Brand marketing website for EYRYA. One real product: an 18-inch EVA foam hand, sold as a 12-pack on Amazon and a 6-pack on Temu, with custom production runs from 5,000 pieces per colour. Traffic is directed to those marketplace listings; the site also takes wholesale enquiries.

- **Framework**: Next.js 16.1.6 (App Router, `output: 'export'` → static HTML in `dist/`)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **Language**: TypeScript throughout
- **Backend**: Cloudflare Pages Functions (`functions/api/*.js`) — NOT Next.js API routes
- **Email**: Resend API via Cloudflare Pages Functions
- **Fonts**: Outfit (body) + Teko (H1/H2 headings, uppercase) via `@fontsource`

## Build Commands

```bash
npm run dev              # Development server (http://localhost:3000)
npm run build            # Build static site → dist/
npm run start            # Preview static build locally
npm run lint             # ESLint (eslint-config-next/core-web-vitals + typescript)
npm run check:functions  # Verify every relative import in functions/ resolves
npm run verify           # Assert the built dist/ is honest and intact (57 checks)
npm run verify:live      # Assert the *deployed* site is too (35 checks, needs network)
```

Run `npm run verify` after every `npm run build`. It fails if fabricated figures
return, if a removed product reappears, if a marketplace link drifts, if the
structured data disagrees with the rendered page, or if the icon/manifest plumbing
breaks. `npm run verify:live` repeats the content rules against `https://www.eyrya.com`
and additionally checks the redirects, the 404, and the icon/manifest URLs. The
phrase lists they share live in `scripts/content-rules.mjs`, because two harnesses
with separate lists drift apart - and both were previously temp files in /tmp that
got cleaned up, leaving the guarantees only in a chat log.

**Important**: `output: 'export'` disables Next.js API routes. All server-side logic lives in `functions/` (Cloudflare Pages Functions). Do NOT create `pages/api/` or `app/api/` routes.

**`npm run build` does not build `functions/`.** Next.js never touches that directory,
so a broken relative import there passes `build`, `lint`, `tsc` and every local test,
then fails the deploy minutes later when Cloudflare bundles the Functions:

```
✘ ERROR Could not resolve "../_shared.js"    api/contact.js:15:7
Failed: generating Pages Functions failed.
```

Before pushing any change under `functions/`, run `npm run check:functions`. For exact
parity with Cloudflare's step, also run:

```bash
npx wrangler@3 pages functions build --outdir=.wrangler/functions-build
```

## Architecture

```
Browser
  ├── /             → Next.js static page (dist/)
  ├── /api/contact  → functions/api/contact.js (Pages Function → Resend)
  ├── /api/wholesale → functions/api/wholesale.js (Pages Function → Resend)
  └── /api/support  → functions/api/support.js (Pages Function → Resend)

Cloudflare Pages
  ├── Static: Next.js export in dist/
  └── Functions: functions/api/*.js (Pages Functions, not Workers)
```

There is no CMS, no admin UI, and no database. Every page renders static data
from `lib/`, and the only server-side logic is the three form endpoints.

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

Environment variables: `env.RESEND_API_KEY` (required by all three endpoints), plus the optional inbox overrides `env.CONTACT_EMAIL`, `env.WHOLESALE_EMAIL`, `env.SUPPORT_EMAIL`. No bindings, database, or object storage are used.

Prefer the shared helpers in `functions/api/_shared.js` (`jsonResponse`, `resolveCorsHeaders`, `escapeHtml`, `readFormFields`, `sendResendEmail`) instead of hand-rolling responses per endpoint. Never send `Access-Control-Allow-Origin: *`, never echo `error.message` to the client, and never return `Object.keys(env)`.

## Data: one source of truth

Business facts live in `lib/`, not in page components:

| Module | Contents |
|--------|----------|
| `lib/products.ts` | The one real product, its categories, and its marketplace offers |
| `lib/posts.ts` | Blog posts (metadata + body HTML) |
| `lib/faq.ts` | Support FAQ, shared by the visible accordion and the FAQPage JSON-LD |
| `lib/links.ts` | External destinations, kept separate so the client navbar does not pull the catalogue into the bundle |
| `lib/wholesale.ts` | Custom-manufacturing terms (minimum order, packing, lead time, payment, shipping) and the wholesale FAQ |

Never restate a commercial term by hand. The site once advertised "50 units per SKU" (and "100 units" in two articles) with invented 15/20/30% discount tiers while the real custom minimum is 5,000 pieces per colour, and one article told readers that custom work starts above 100 units. Use `formatMinimumOrderPerColor()` and friends.

### Never publish a figure or a claim you cannot evidence

Most of the original site was invented filler, and the owner confirmed it. What was published, and has since been removed:

- ratings, review counts and units sold for every product (4.8/328/32,000 etc.), including as `aggregateRating` structured data — fabricated ratings breach the FTC's rule on consumer reviews and risk a Google structured-data manual action
- two of the three products (a "Party LED Lights Set" and an "Outdoor Game Kit") did not exist at all
- service promises the business does not control: US dispatch, 24-hour shipping, a 30-day return window, a $20 free-shipping threshold, 3-5 day delivery, shipping to 20+ countries
- a "50,000 units sold, 4.8 average rating" section that claimed it was "real customer feedback", and an article describing a 12-brand test that was never run

Rules that follow from that:

- Shipping, delivery times, returns and refunds belong to Amazon and Temu, because that is where orders happen. Describe them as the marketplace's terms, never as ours.
- A rating, review count, or sales figure goes in `lib/` only with a source. No source, no number.
- Do not write first-hand experience ("we tested", "we bought", "our best memory") unless it happened. Prefer guidance framed as guidance.
- The one real product is the foam finger. Retail packs and custom production are the two real ways to buy it.

Pages and components must import from these modules. Never re-type a price, rating, review count, units-sold figure, pack size, or marketplace URL into a component — that is exactly how the hero ended up claiming 1,247 sold while the detail page claimed 50,000.

Share one presentational server component between an index route and its category routes (see `app/products/ProductsView.tsx`). Represent filtering as a real route segment (`/products/category/<slug>/`), never as a `?category=` query param — `useSearchParams` forces the page into client-only rendering and the exported HTML loses its heading and product grid.

## SEO

- All pages export a `Metadata` object with `title`, `description`, `alternates.canonical`
- Title template: `"%s | EYRYA"` in `layout.tsx`. Because most page titles already contain the brand, use `title: { absolute: '...' }` instead of a plain string, or the brand is appended twice
- Sitemap: generated by `app/sitemap.ts` from `lib/`
- Robots: generated by `app/robots.ts`
- Structured data must match what the page visibly renders — build it from the same data the page renders
- Keyword ownership, one page per query so they do not compete: `/wholesale/` owns **"foam finger bulk"** (the commercial query, with the enquiry form) and `/ideas/bulk-order-guide/` supports it informationally. Do not add a third page for bulk — the last thing this site needs is two thin pages splitting the same intent. `npm run verify` asserts the phrase stays in the wholesale title and H1.

## Icons

`app/icon.svg`, `app/favicon.ico` and `app/apple-icon.png` are Next.js file
conventions: each becomes a route with its own `<link>` tag, and all three are
emitted on every page including the 404. `app/manifest.ts` produces
`/manifest.webmanifest` with the 192/512/maskable PNGs kept in `public/icons/`.

Two traps, both of which this repo already fell into:

- **`app/favicon.svg` is not a convention.** Only `app/favicon.ico`,
  `app/icon.*` and `app/apple-icon.*` are. The original `app/favicon.svg` was
  therefore never served, and `/favicon.ico` answered 404 for months with no icon
  link in the head at all. Name the file `icon.svg`.
- **Chrome renders an SVG *document* at its own scale.** Screenshotting a
  `width="512"` SVG with `--window-size=512,512` produced a cropped quarter of a
  1024px render. Inline the SVG in a zero-margin HTML page with an explicit px
  size instead.

The art is the "E" of `public/images/logo.svg` on a `#DC2626` tile. The tab and
manifest-any icons use rounded corners; `apple-icon.png` and the maskable icon are
full-bleed opaque squares, because iOS and Android apply their own mask and render
transparent corners as black or white. Regenerate from the SVG rather than editing
the PNGs.

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
5. **Tempted to add an admin UI, CMS, or database?** — Only if the build actually consumes it. A previous `/api/admin/*` + D1 + R2 setup wrote products to a database that no page ever read (the storefront renders `lib/`), so it was pure attack surface. Prefer editing `lib/` directly, or wire a CMS into the build step so its output lands in `lib/`.
6. **Blog or legal pages render as one wall of text** — `@tailwindcss/typography` is missing from `package.json` or `@plugin "@tailwindcss/typography";` is missing from `globals.css`. Every `prose` class is a no-op without it.
7. **A page's H1 or product grid is missing from `dist/*.html`** — a client component in the tree is calling `useSearchParams`; move the state into a route segment.
8. **Cloudflare deploy fails with "Could not resolve …" / "generating Pages Functions failed"** — a relative import under `functions/` points at the wrong path, the wrong case, or a file that was never committed. `npm run build` cannot catch this; run `npm run check:functions`. A file at `functions/api/_shared.js` is `./_shared.js` from `functions/api/contact.js`, not `../_shared.js`.
