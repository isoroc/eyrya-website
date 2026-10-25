// The content rules the site must never break again.
//
// Single source of truth for both checks: scripts/verify-site.mjs (the local
// build) and scripts/live-audit.mjs (the deployed site). They existed separately
// for a while, which is how a rule can end up enforced in one place and not the
// other.
//
// Every entry below was published for real: fabricated ratings and sales figures,
// two products that never existed, service promises the business does not
// control, invented first-hand experience, a minimum order that was wrong by a
// factor of 100, and copy advertising categories that are empty.

/** Lower-cased substrings that must not appear in any page's visible text. */
export const FORBIDDEN = {
  'invented ratings': [
    '328 reviews',
    '156 reviews',
    '89 reviews',
    '4.8/5',
    '4.6/5',
    '4.8-star',
    '4.6-star',
    'average rating of',
  ],
  'invented sales figures': [
    '50,000 foam fingers',
    '32,000',
    '12,000+',
    '6,000+',
    '1,247',
    '50k+',
    'over 50,000 products',
  ],
  'fake review markup': ['aggregaterating', 'reviewcount', 'ratingvalue'],
  'invented service promises': [
    'ships from us',
    'ships within 24 hours',
    '30-day return',
    '3-5 business days',
    'orders over $20',
    'free 2-day shipping',
    '20+ countries',
    '1-2 business day',
    'fast shipping',
  ],
  'products that do not exist': [
    'led party lights',
    'outdoor game kit',
    '33 feet of led',
    '100 individual bulbs',
    '6 games in one',
  ],
  'fabricated first-hand claims': [
    'we bought 12 different brands',
    'we tested',
    'we have been there',
    'we rated each product',
    '9 out of 10 paper banners',
    'tested on real trips',
  ],
  'wrong minimum order': [
    '50+ units',
    '50 units per',
    '100+ units',
    'minimum order: 50',
    '15-30%',
    '15% off retail',
    '30% off retail',
  ],
  'unfounded product claims': [
    'toy line is in production',
    'party supplies and fan gear',
    'foam fingers and more',
    '8mm high-density',
    'foam fingers, party supplies & more',
  ],
};

/** Facts the owner confirmed; each must appear somewhere on the live site. */
export const CONFIRMED_FACTS = [
  '5,000 pieces per colour',
  '18 in (46 cm)',
  'silk-screen',
  '200 pieces per export carton',
  '50% deposit',
  'quoted per project',
  'freight forwarder',
];

/** Deleted URLs that must redirect, each with the page it should land on. */
export const REDIRECTED_PATHS = [
  { path: '/products/party-led-lights/', to: '/products' },
  { path: '/products/outdoor-game-kit/', to: '/products' },
  { path: '/products/category/party-supplies/', to: '/products' },
  { path: '/products/category/toys-play/', to: '/products' },
  { path: '/products/category/outdoor-fun/', to: '/products' },
  // category routes deleted 2026-10-25
  { path: '/products/category/sports-fan-gear/', to: '/products' },
  { path: '/ideas/category/party-ideas/', to: '/ideas' },
  { path: '/ideas/category/sports-events/', to: '/ideas' },
  { path: '/ideas/category/outdoor-activities/', to: '/ideas' },
  { path: '/ideas/category/wholesale/', to: '/ideas' },
  // off-topic articles deleted 2026-10-25
  { path: '/ideas/camping-with-kids/', to: '/ideas' },
  { path: '/ideas/cheap-party-decorations/', to: '/ideas' },
  { path: '/ideas/reusable-party-supplies/', to: '/ideas' },
];

export const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
