// Post-deploy audit of the live site. Run after Cloudflare finishes deploying:
//
//   npm run verify:live
//
// scripts/verify-site.mjs proves the build on disk is right; this proves the
// thing users actually get is right. It reads the live sitemap and checks every
// page itself rather than trusting a page list that can drift, and it asserts both
// directions: fabricated content absent, confirmed facts present. A harness that
// only checked "absent" once passed while reading an empty string.
import { FORBIDDEN, CONFIRMED_FACTS, REDIRECTED_PATHS, USER_AGENT } from './content-rules.mjs';

const BASE = (process.env.SITE_URL || 'https://www.eyrya.com').replace(/\/$/, '');

let pass = 0;
let fail = 0;
const check = (name, ok, detail = '') => {
  if (ok) {
    pass += 1;
    console.log(`  \u2713 ${name}`);
  } else {
    fail += 1;
    console.log(`  \u2717 ${name}${detail ? ` -> ${detail}` : ''}`);
  }
};

const cacheBust = () => `?cb=${Date.now()}${Math.floor(Math.random() * 1e6)}`;
const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

// Retry on transport errors. A single ECONNRESET on a 23-page crawl used to abort
// the whole audit as an unhandled rejection, which reads like a site failure and
// is worse than no check at all.
async function get(url, { redirect = 'follow', attempts = 3 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, {
        headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'en-US,en;q=0.9' },
        redirect,
      });
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(400 * attempt);
    }
  }
  throw lastError;
}

async function getBytes(url) {
  const response = await get(url);
  return { status: response.status, type: response.headers.get('content-type') || '', buffer: Buffer.from(await response.arrayBuffer()) };
}

/** Visible text: drop scripts, styles, the RSC payload and tag markup. */
function visibleText(html) {
  return html
    .replace(/<!-- -->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const png = (buffer) => ({ width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) });

// -----------------------------------------------------------------------------
const sitemapResponse = await get(`${BASE}/sitemap.xml${cacheBust()}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check('sitemap is reachable and lists pages', sitemapResponse.status === 200 && urls.length > 0, `${urls.length} urls`);

const texts = new Map();
for (const url of urls) {
  let response;
  try {
    response = await get(`${url}${cacheBust()}`);
  } catch (error) {
    check(`${url.replace(BASE, '')} returns 200`, false, `network: ${error.message}`);
    continue;
  }
  if (response.status !== 200) {
    check(`${url.replace(BASE, '')} returns 200`, false, `got ${response.status}`);
    continue;
  }
  texts.set(url, visibleText(await response.text()));
}
check(`every sitemap page returns 200 (${urls.length})`, texts.size === urls.length);

const blob = [...texts.values()].join(' ').toLowerCase();
for (const [label, phrases] of Object.entries(FORBIDDEN)) {
  const hits = [];
  for (const phrase of phrases) {
    for (const [url, text] of texts) {
      if (text.toLowerCase().includes(phrase)) hits.push(`"${phrase}" on ${url.replace(BASE, '')}`);
    }
  }
  check(`no ${label}`, hits.length === 0, hits.slice(0, 3).join(', '));
}

for (const fact of CONFIRMED_FACTS) {
  check(`confirmed fact published: "${fact}"`, blob.includes(fact.toLowerCase()));
}

// -----------------------------------------------------------------------------
// `redirect: 'manual'` keeps fetch from following the 301, which is the thing
// being asserted. Node's default would report the 200 it landed on instead.
for (const { path, to } of REDIRECTED_PATHS) {
  const response = await get(`${BASE}${path}${cacheBust()}`, { redirect: 'manual' });
  const location = response.headers.get('location') || '';
  // Pages preserves the query string on the redirect (desirable: tracking params
  // survive), so compare the pathname only rather than the raw header.
  let target = '';
  try {
    target = new URL(location, BASE).pathname.replace(/\/$/, '');
  } catch {
    target = '';
  }
  check(
    `deleted ${path} redirects to ${to}/`,
    [301, 308].includes(response.status) && target === to,
    `${response.status} ${location}`,
  );
}

const missing = await get(`${BASE}/definitely-not-a-page-${Date.now()}/`, { redirect: 'manual' });
const missingBody = await missing.text();
check('a missing page 404s and is noindex', missing.status === 404 && /noindex/.test(missingBody), `status ${missing.status}`);

// -----------------------------------------------------------------------------
const home = await (await get(`${BASE}/${cacheBust()}`)).text();
for (const [label, pattern] of [
  ['favicon.ico', /rel="icon"[^>]*href="\/favicon\.ico/],
  ['icon.svg', /rel="icon"[^>]*href="\/icon\.svg/],
  ['apple-touch-icon', /rel="apple-touch-icon"[^>]*href="\/apple-icon\.png/],
  ['manifest', /rel="manifest"[^>]*href="\/manifest\.webmanifest/],
]) {
  check(`home page links ${label}`, pattern.test(home));
}

const ico = await getBytes(`${BASE}/favicon.ico${cacheBust()}`);
if (ico.status === 200) {
  const count = ico.buffer.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i += 1) {
    const entry = 6 + i * 16;
    sizes.push(`${ico.buffer[entry] || 256}x${ico.buffer[entry + 1] || 256}`);
  }
  check('favicon.ico serves a valid ICO with 16/32/48', ico.buffer.readUInt16LE(2) === 1 && ['16x16', '32x32', '48x48'].every((s) => sizes.includes(s)), sizes.join(','));
} else {
  check('favicon.ico is served', false, `status ${ico.status}`);
}

const apple = await getBytes(`${BASE}/apple-icon.png${cacheBust()}`);
check('apple-icon.png is served at 180x180', apple.status === 200 && png(apple.buffer).width === 180 && png(apple.buffer).height === 180, `${apple.status} ${JSON.stringify(png(apple.buffer))}`);

const svg = await get(`${BASE}/icon.svg${cacheBust()}`);
const svgBody = await svg.text();
check('icon.svg is served with the brand red', svg.status === 200 && svgBody.includes('#DC2626'));

const manifestResponse = await get(`${BASE}/manifest.webmanifest${cacheBust()}`);
check('manifest uses application/manifest+json', (manifestResponse.headers.get('content-type') || '').includes('manifest+json'), manifestResponse.headers.get('content-type') || '');
const manifest = await manifestResponse.json();
check('manifest lists three icons, one maskable', (manifest.icons || []).length === 3 && manifest.icons.some((i) => i.purpose === 'maskable'));

for (const icon of manifest.icons || []) {
  const response = await getBytes(`${BASE}${icon.src}${cacheBust()}`);
  const [w, h] = icon.sizes.split('x').map(Number);
  const size = response.status === 200 ? png(response.buffer) : { width: 0, height: 0 };
  check(`manifest icon ${icon.src} is served at ${icon.sizes}`, response.status === 200 && size.width === w && size.height === h, `${response.status} ${size.width}x${size.height}`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
