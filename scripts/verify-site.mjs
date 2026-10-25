// Verification for the EYRYA static build. Run after `npm run build`:
//
//   npm run verify
//
// The site went through a content-integrity pass: the owner confirmed that most
// of the original figures were invented to fill the page. Two of the three
// products did not exist, every rating/review/sales figure was fabricated, and
// two articles described tests and personal experiences that never happened.
// The first half of this file fails the build if any of that returns.
//
// The second half covers the things that are easy to break silently: the icon and
// manifest plumbing, structured data that must match what the page renders, and
// the title/SEO invariants.
import fs from 'node:fs';
import path from 'node:path';
import { FORBIDDEN } from './content-rules.mjs';

const dist = path.join(process.cwd(), 'dist');

let pass = 0;
let fail = 0;
const check = (name, condition, detail = '') => {
  if (condition) {
    pass += 1;
    console.log(`  \u2713 ${name}`);
  } else {
    fail += 1;
    console.log(`  \u2717 ${name}${detail ? ` -> ${detail}` : ''}`);
  }
};

// React separates adjacent text nodes with <!-- --> in the server-rendered HTML.
const read = (rel) => fs.readFileSync(path.join(dist, rel), 'utf8').replace(/<!-- -->/g, '');
const exists = (rel) => fs.existsSync(path.join(dist, rel));

const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
})(dist);

const pages = htmlFiles.map((f) => ({
  rel: '/' + path.relative(dist, f),
  body: fs.readFileSync(f, 'utf8').replace(/<!-- -->/g, ''),
}));

const cssDir = path.join(dist, '_next/static/chunks');
const allCss = fs
  .readdirSync(cssDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8'))
  .join('\n');

const pngSize = (file) => {
  const b = fs.readFileSync(file);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), bytes: b };
};

// -----------------------------------------------------------------------------
console.log('no fabricated content anywhere in the build');
// The phrase lists live in content-rules.mjs, shared with the live audit, so the
// two cannot enforce different rules. Matching is case-insensitive: a
// capitalised "Fast shipping" heading once survived a case-sensitive sweep.
for (const [label, phrases] of Object.entries(FORBIDDEN)) {
  const hits = [];
  for (const phrase of phrases) {
    for (const page of pages) {
      if (page.body.toLowerCase().includes(phrase.toLowerCase())) {
        hits.push(`"${phrase}" on ${page.rel}`);
      }
    }
  }
  check(label, hits.length === 0, hits.slice(0, 4).join(', '));
}

// -----------------------------------------------------------------------------
console.log('only the real product is published');
check('the foam finger page exists', exists('products/eva-foam-finger/index.html'));
check('no LED light page', !exists('products/party-led-lights/index.html'));
check('no outdoor kit page', !exists('products/outdoor-game-kit/index.html'));
const categoryDirs = fs.readdirSync(path.join(dist, 'products/category')).join(',');
check('only one product category page', categoryDirs === 'sports-fan-gear', categoryDirs);
check(
  'the products index lists only the real product',
  read('products/index.html').includes('EVA Foam Finger (12 Pack)') &&
    !read('products/index.html').includes('Party LED'),
);

// -----------------------------------------------------------------------------
console.log('marketplace links still drive traffic (owner asked to keep this)');
const productPage = read('products/eva-foam-finger/index.html');
check('home links to the Amazon listing', read('index.html').includes('amazon.com/dp/B0GXC35N85'));
check(
  'the Temu link is the id-based form, without a locale prefix',
  read('index.html').includes('https://www.temu.com/goods.html?goods_id=605652411892197') &&
    !read('index.html').includes('temu.com/ca/'),
);
check(
  'the product page carries both offers',
  productPage.includes('Buy the 12-Pack on Amazon') && productPage.includes('Buy the 6-Pack on Temu'),
);

// The price lives in lib/products.ts only; check the page and its structured data
// agree rather than hard-coding a figure that goes stale every time it changes.
const jsonLdPrice = [...productPage.matchAll(/"price":"?([\d.]+)"?/g)].map((m) => m[1])[0];
check('the product page shows a price', /\$\d+\.\d{2}/.test(productPage));
check(
  'the structured-data price matches the rendered price',
  Boolean(jsonLdPrice) && productPage.includes(`$${jsonLdPrice}`),
  `jsonld=${jsonLdPrice}`,
);

// -----------------------------------------------------------------------------
console.log('confirmed commercial facts are present');
const wholesale = read('wholesale/index.html');
for (const [label, needle] of [
  ['5,000 per colour minimum', '5,000 pieces per colour'],
  ['18 in (46 cm)', '18 in (46 cm)'],
  ['silk-screen printing', 'silk-screen'],
  ['200 per carton', '200 pieces per export carton'],
  ['2-week lead time', '2 weeks'],
  ['50% deposit', '50% deposit'],
  ['quoted per project', 'Quoted per project'],
  ['freight forwarder', 'freight forwarder'],
]) {
  check(label, wholesale.includes(needle));
}
check(
  'the wholesale page keeps a route to the retail packs',
  wholesale.includes('amazon.com/dp/B0GXC35N85') && wholesale.includes('temu.com'),
);
check(
  'the enquiry form starts at the real minimum',
  wholesale.includes('5,000 - 10,000 pieces') && wholesale.includes('Fewer than 5,000'),
);

// -----------------------------------------------------------------------------
console.log('structured data matches what the page shows');
check('wholesale Service schema', wholesale.includes('"@type":"Service"'));

// Compare the markup against the page rather than hard-coding a count that has to
// be edited every time a question is added.
const wholesaleVisible = wholesale.replace(/<script[\s\S]*?<\/script>/g, ' ');
const faqQuestions = [...wholesale.matchAll(/"@type":"Question","name":"([^"]+)"/g)].map((m) => m[1]);
check('FAQPage lists at least 8 questions', faqQuestions.length >= 8, `${faqQuestions.length}`);
const faqNotVisible = faqQuestions.filter((q) => !wholesaleVisible.includes(q.replace(/&amp;/g, '&')));
check('every FAQPage question is visible on the page', faqNotVisible.length === 0, faqNotVisible.slice(0, 2).join(' | '));

// The owner asked the wholesale page to rank for "foam finger bulk"; these guard
// the two placements that matter most so a later copy edit cannot quietly drop it.
const wholesaleTitle = (wholesale.match(/<title>([^<]*)</) || [, ''])[1];
check('wholesale title targets "foam finger bulk"', /foam finger bulk/i.test(wholesaleTitle), wholesaleTitle);
check(
  'wholesale H1 targets "foam finger bulk"',
  /<h1[^>]*>\s*foam finger bulk/i.test(wholesale),
  (wholesale.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].slice(0, 80),
);
check(
  'the phrase also appears in body copy, not only the heading',
  (wholesaleVisible.match(/foam finger bulk/gi) || []).length >= 2,
  `${(wholesaleVisible.match(/foam finger bulk/gi) || []).length} occurrences`,
);
// Google matches word order loosely, but the natural plural ("bulk foam fingers")
// is a real query in its own right and was missing from the body entirely.
check(
  'the natural variant "bulk foam fingers" is covered',
  /bulk foam fingers/i.test(wholesaleVisible),
);

// -----------------------------------------------------------------------------
console.log('icons and manifest');
check('favicon.ico exists', exists('favicon.ico'));
if (exists('favicon.ico')) {
  const ico = fs.readFileSync(path.join(dist, 'favicon.ico'));
  const reserved = ico.readUInt16LE(0);
  const type = ico.readUInt16LE(2);
  const count = ico.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i += 1) {
    const entry = 6 + i * 16;
    sizes.push(`${ico[entry] || 256}x${ico[entry + 1] || 256}`);
  }
  check('favicon.ico is a valid ICO', reserved === 0 && type === 1, `reserved=${reserved} type=${type}`);
  check(
    'favicon.ico carries 16/32/48',
    ['16x16', '32x32', '48x48'].every((s) => sizes.includes(s)),
    sizes.join(','),
  );
}
check('icon.svg exists', exists('icon.svg'));
if (exists('icon.svg')) {
  const svg = read('icon.svg');
  check('icon.svg uses the brand red', svg.includes('#DC2626'));
  check('icon.svg has a scalable viewBox and no fixed-only sizing', svg.includes('viewBox="0 0 256 256"'));
}

check('apple-icon.png exists at 180x180', exists('apple-icon.png') && (() => {
  const { width, height } = pngSize(path.join(dist, 'apple-icon.png'));
  return width === 180 && height === 180;
})());
check('apple-icon.png is opaque (iOS masks it itself)', exists('apple-icon.png') && (() => {
  // A fully opaque square is what iOS expects; the rounded tab tile is wrong here.
  const size = pngSize(path.join(dist, 'apple-icon.png'));
  return size.bytes[25] === 2 || size.bytes[25] === 6; // PNG colour type 2 = RGB, 6 = RGBA
})());

check('manifest.webmanifest exists', exists('manifest.webmanifest'));
if (exists('manifest.webmanifest')) {
  const manifest = JSON.parse(read('manifest.webmanifest'));
  check('manifest lists three icons', Array.isArray(manifest.icons) && manifest.icons.length === 3);
  check('manifest has a maskable icon', (manifest.icons || []).some((i) => i.purpose === 'maskable'));
  check('manifest theme colour is the brand red', manifest.theme_color === '#DC2626');
  for (const icon of manifest.icons || []) {
    const rel = icon.src.replace(/^\//, '');
    check(`manifest icon exists: ${icon.src}`, exists(rel));
    if (exists(rel) && icon.sizes) {
      const [w, h] = icon.sizes.split('x').map(Number);
      const got = pngSize(path.join(dist, rel));
      check(`${icon.src} is really ${icon.sizes}`, got.width === w && got.height === h, `${got.width}x${got.height}`);
    }
  }
}

// Every page must advertise the icons, including the 404.
const pagesMissingIcons = pages.filter((p) => {
  const hasIcon = /rel="icon"/.test(p.body) && /rel="apple-touch-icon"/.test(p.body);
  const hasManifest = /rel="manifest"/.test(p.body);
  return !hasIcon || !hasManifest;
});
check(
  'every page links an icon, an apple-touch-icon and the manifest',
  pagesMissingIcons.length === 0,
  pagesMissingIcons.map((p) => p.rel).slice(0, 3).join(', '),
);

// -----------------------------------------------------------------------------
console.log('technical SEO regression checks');
check('no prefers-color-scheme in CSS', !allCss.includes('prefers-color-scheme'));
check(
  '/products/ still renders statically',
  read('products/index.html').includes('<h1') && !read('products/index.html').includes('animate-pulse'),
);
check('robots.txt generated', read('robots.txt').includes('Sitemap:'));
check(
  'sitemap lists the remaining pages only',
  read('sitemap.xml').includes('/products/eva-foam-finger/') && !read('sitemap.xml').includes('party-led-lights'),
);
check(
  'sitemap has no icon or manifest entries',
  !/manifest\.webmanifest|favicon\.ico|apple-icon\.png/.test(read('sitemap.xml')),
);

// Build-time lastmod on every URL is a lie (all values identical) and teaches
// Google to ignore the signal. Real article dates differ from each other.
const sitemapXml = read('sitemap.xml');
const lastmods = [...sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].length;
check(
  'sitemap does not stamp every URL with the build time',
  lastmods.length > 0 && new Set(lastmods).size > 1 && lastmods.length < sitemapUrls,
  `${lastmods.length} lastmod of ${sitemapUrls} urls, ${new Set(lastmods).size} distinct`,
);

// The three 404 outputs are one noindexed page, so they legitimately share a
// title; only indexable pages are compared.
const indexable = pages.filter((p) => !p.body.includes('noindex'));
const titles = indexable.map((p) => (p.body.match(/<title>([^<]*)</) || [, ''])[1]).filter(Boolean);
check('every indexable title is unique', new Set(titles).size === titles.length);
check('no title exceeds 70 characters', titles.every((t) => t.length <= 70), titles.filter((t) => t.length > 70).join(' | '));
check(
  'no title repeats the brand name',
  indexable.every((p) => ((p.body.match(/<title>([^<]*)</) || [, ''])[1].match(/EYRYA/g) || []).length <= 1),
);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
