# Design audit

Companion to `AGENTS.md`. That file defines the design system; this one says how to
audit against it, and — more importantly — what **not** to "fix".

The checklist structure is adapted from [elayadesign/redesign-skill](https://github.com/elayadesign/redesign-skill)
(MIT). Its audit questions are good. Its **Design Values are not**: they describe a
generic premium SaaS look (Geist/Manrope, one typeface, sentence-case headings,
Phosphor icons, no dark bands) and its first fix priority is a font swap. Applying
those to this site would delete its identity. The values below replace them.

---

## Design values (the only allowed values)

| Area | Value |
|---|---|
| Background | `#F4F1EA` |
| Text | `#1A1A1A` |
| Accent | `#DC2626` (one accent only) |
| Dark surface | `#1A1A1A` |
| Type | Outfit (body) + Teko (headings, uppercase) — this pair is deliberate |
| Weights | up to `font-bold` (700). No 800/900, no italics |
| Radius | `rounded-sm` (2px) for surfaces; `rounded-full` only for small dots/swatches |
| Type scale | Tailwind default only. No `text-[19px]` |
| Icons | `lucide-react` |
| Motion | CSS transitions; `IntersectionObserver` only if a reveal is genuinely needed |
| Spacing | Tailwind scale only |

## Known intentional deviations

An audit will flag these. They are decisions, not defects:

- **Hero background gradient.** A dark overlay over the photo, because white text
  needs contrast. It is not decoration.
- **Dark bands inside light pages.** The footer and the two CTA sections. Brand
  rhythm, not a copy-paste accident.
- **Uppercase headings.** 55 occurrences. Teko is a condensed display face designed
  for it; sentence case would break the typographic system.
- **One inline style.** The colour swatches use `style={{ backgroundColor }}` because
  the value comes from data and cannot be a Tailwind class.
- **`rounded-full` on small elements.** Dots and swatches only.

---

## Audit checklist

### Typography
- [ ] Every size resolves to a Tailwind step (currently **0** arbitrary sizes)
- [ ] No italics, nothing above weight 700
- [ ] Body copy measure around 65 characters
- [ ] Headings use the Teko uppercase treatment, not sentence case

### Colour and surfaces
- [ ] Only the three brand values plus the dark surface
- [ ] Backgrounds flat except the hero overlay
- [ ] One accent (`#DC2626`); supporting states use tints of it

### Layout
- [ ] Container capped and centred
- [ ] Spacing values from the Tailwind scale
- [ ] Nested radius: `inner = outer − gap` when the gap is under 32px, and only if
      the result exceeds 2
- [ ] No card with a border on a single side
- [ ] Cards in a row have bottom-aligned actions

### States
- [ ] Hover on every link and button
- [ ] Active/pressed feedback on primary buttons
- [ ] Visible focus: the global `:focus-visible` rule in `globals.css` draws a 2px
      `#DC2626` outline. Do not add `outline-none` to controls without replacing it.
- [ ] Form errors are inline and specific; no `window.alert()`
- [ ] Loading state on every submit button

### Accessibility
- [ ] Skip to content link is the first focusable element (`app/layout.tsx`)
- [ ] `<main id="main">` present for the skip target
- [ ] Alt text on every meaningful image
- [ ] The current page is indicated in the navigation (**open**, see below)

### Code quality
- [ ] Semantic landmarks: `<nav> <main> <article> <section>`
- [ ] No `href="#"` dead links
- [ ] No hardcoded pixel widths
- [ ] No commented-out code
- [ ] Every import exists in `package.json`

### Ship requirements
- [ ] Branded 404, privacy, terms, favicon, manifest — all present
- [ ] `<title>`, meta description, OG/Twitter tags, canonical on every page
- [ ] Client-side form validation

---

## Do not do these (with the reason)

| Don't | Why |
|---|---|
| Swap fonts to Geist / Manrope / Poppins | Outfit + Teko is the brand. A font swap is the fastest way to make the site look like every other AI-built page. |
| Consolidate to one typeface | The pair is the identity. |
| Sentence-case the headings | Teko uppercase is the typographic system; changing it invalidates every heading rule. |
| Migrate Lucide to Phosphor / Solar | 17 files of churn with no user benefit. |
| Remove the hero overlay gradient | White text over a stadium photo becomes unreadable. |
| Treat the dark bands as accidents | They are deliberate brand rhythm. |
| Insert `picsum.photos` stock images | This site has real product photographs. Random stock would replace them with someone else's product. |
| Make numbers look "less round" | The advice is for mock content. Here it would mean inventing figures. |
| Invent testimonials or review counts | FTC issue, and the invented ones were removed deliberately. See `AGENTS.md`. |
| Add a motion pass with scroll reveals | The site is static-first. Client components cost the crawlability and load speed that this site is short on. |

---

## Open items

- **Current page indicator.** No `aria-current` yet. Doing it needs `usePathname` in
  the client navbar, which means the active state is absent from the static HTML and
  appears on hydration. Deferred rather than shipped badly.
- **Cookie consent.** Not needed today: the site sets no cookies (no `Set-Cookie` on
  the response), and there is no analytics or tracking script. `app/privacy/page.tsx`
  already states this and promises to ask for consent if that changes. Do not add a
  banner for a site that tracks nothing.
- **Skeleton loading states.** Only relevant if the site ever fetches data at runtime.
  It does not.
