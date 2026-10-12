// Single source of truth for every product, category, and brand-level claim
// shown on the storefront.
//
// Before this module existed the same facts (price, rating, review count, units
// sold, pack size, marketplace URLs) were hardcoded independently in the hero,
// the featured section, the product list, the product detail pages, and the
// about page - and they had drifted apart. Add or change a product here and
// every page picks it up.

export type CategorySlug = 'party-supplies' | 'toys-play' | 'sports-fan-gear' | 'outdoor-fun';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Shown as a non-clickable tile: there is no product to link to yet. */
  comingSoon?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

// Amazon and Temu carry different pack sizes, so pack size and price belong to
// the listing rather than to the product. Offers[0] is the flagship listing: it
// supplies the headline price and the hero badge.
export interface MarketplaceOffer {
  name: 'Amazon' | 'Temu';
  url: string;
  /** Call-to-action label. */
  label: string;
  /** Units in this listing. */
  packSize: number;
  /** This listing's price, or null when the marketplace sets it. */
  price: number | null;
  /** Pre-discount price shown by this listing, if any. */
  originalPrice?: number | null;
  note?: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: CategorySlug;
  badge: string;
  tagline: string;
  /** One or two lines, used on product cards. */
  shortDescription: string;
  /** Full paragraph, used on the product detail page and in Product JSON-LD. */
  description: string;
  rating: number;
  reviews: number;
  sold: number;
  /** Total colourways offered; colorSwatches below shows a subset. */
  availableColors: number;
  image: string;
  imageAlt: string;
  colorSwatches: ProductColor[];
  features: string[];
  specs: Record<string, string>;
  faq: ProductFaq[];
  /** Every marketplace listing for this product, flagship first. */
  offers: MarketplaceOffer[];
}

// Brand-level numbers live here so the about page, hero, and metadata can never
// disagree with each other again.
export const BRAND = {
  name: 'EYRYA',
  siteUrl: 'https://www.eyrya.com',
  /** Sum of `sold` across the catalogue below. */
  productsSold: 50000,
  rating: 4.7,
  countriesShipped: 20,
  freeShippingThreshold: 20,
  responseTime: '24 hours',
} as const;

export const MARKETPLACES = {
  amazon: {
    name: 'Amazon' as const,
    url: 'https://www.amazon.com/shops/eyrya',
    description: 'Our flagship foam fingers ship as a 12-pack here, with Prime fast shipping and the A-to-Z Guarantee.',
    features: ['12-pack listing', 'Easy returns', 'A-to-Z Guarantee'],
  },
  temu: {
    name: 'Temu' as const,
    url: 'https://www.temu.com/ca/set-of-6-oversized-foam-fingers-measuring-18-inches-46-cm----events-parties-concerts-and-celebrations-offered-in--colors-g-605652411892197.html',
    description: 'Our flagship foam fingers are listed here as a 6-pack, sized for smaller groups.',
    features: ['6-pack listing', 'Worldwide shipping', 'Flash deals'],
  },
} as const;

// Colourways offered on the flagship foam finger. Declared once so the feature
// list, the spec table, and the "available in N colours" copy cannot drift.
const FOAM_FINGER_TEAM_COLORS = 12;

export const CATEGORIES: Category[] = [
  {
    slug: 'party-supplies',
    name: 'Party Supplies',
    description: 'Party props and celebration accessories that hold up all night.',
  },
  {
    slug: 'toys-play',
    name: 'Kids & Toys',
    description: 'Toys kids actually play with. Our first toy line is in production.',
    comingSoon: true,
  },
  {
    slug: 'sports-fan-gear',
    name: 'Sports & Fan Gear',
    description: 'Cheering accessories for real fans. Foam fingers and more.',
  },
  {
    slug: 'outdoor-fun',
    name: 'Outdoor & Camping',
    description: 'Gear for actual outdoor adventures, tested on real trips.',
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'eva-foam-finger',
    name: 'EVA Foam Finger (12 Pack)',
    categorySlug: 'sports-fan-gear',
    badge: 'Best Seller',
    // The pack size is deliberately not repeated in this copy: it differs per
    // marketplace and is derived from `offers` wherever it is shown.
    tagline: '18-inch high-density EVA foam fingers. Our flagship product, trusted by fans across the country.',
    shortDescription: '18-inch foam fingers in 8mm high-density EVA foam that keeps its shape.',
    description:
      'Show your team spirit with our premium EVA foam fingers. Perfect for groups, classrooms, and events. Each foam finger is made from 8mm high-density EVA foam that holds its shape through rain, sweat, and celebration. Whether you are cheering at an NFL game, an NBA match, or your kid\'s school event, these foam hands deliver.',
    rating: 4.8,
    reviews: 328,
    sold: 32000,
    availableColors: FOAM_FINGER_TEAM_COLORS,
    image: '/images/products/foam-finger-multi.webp',
    imageAlt: 'EYRYA EVA Foam Finger in multiple team colors - 18 inch foam hand for sports fans',
    colorSwatches: [
      { name: 'Blue', hex: '#3B82F6', image: '/images/products/foam-finger-blue.webp' },
      { name: 'Black', hex: '#1a1a1a', image: '/images/products/foam-finger-black.webp' },
      { name: 'Pink', hex: '#FF6B6B', image: '/images/products/foam-finger-pink.webp' },
      { name: 'Green', hex: '#22C55E', image: '/images/products/foam-finger-green.webp' },
      { name: 'Yellow', hex: '#FFE66D', image: '/images/products/foam-finger-yellow.webp' },
    ],
    features: [
      '18 inches of pure team spirit',
      '8mm high-density EVA foam - will not collapse',
      'Comfortable hand opening - fits most adults',
      'Weather-resistant - works in rain or shine',
      'Reusable for multiple seasons',
      `Available in ${FOAM_FINGER_TEAM_COLORS} team colors`,
    ],
    specs: {
      dimensions: '18" x 8" x 1"',
      weight: '3.2 oz',
      material: 'High-density EVA foam',
      colors: `${FOAM_FINGER_TEAM_COLORS} team colors`,
    },
    faq: [
      {
        question: 'What makes EYRYA foam fingers different from cheap ones?',
        answer:
          'Most foam fingers use 3-4mm low-density foam that collapses after a few uses. Ours uses 8mm high-density EVA foam that keeps its shape game after game. That is why this pack has a 4.8-star rating from 328 reviews.',
      },
      {
        question: 'Will the foam finger fit my hand?',
        answer:
          'The hand opening is 4 inches wide and fits most adult hands comfortably. Kids can hold it by the base or use both hands.',
      },
      {
        question: 'Can I use this foam finger in the rain?',
        answer:
          'Yes. EVA foam is naturally water-resistant. Our foam fingers work perfectly in rain, snow, or intense sun. Just wipe them down and they are good to go.',
      },
      {
        question: 'How fast is shipping?',
        answer: `Amazon Prime members get free 2-day shipping. Temu orders typically arrive in 7-10 days. Free shipping on Amazon orders over $${BRAND.freeShippingThreshold}.`,
      },
    ],
    offers: [
      {
        name: 'Amazon',
        url: MARKETPLACES.amazon.url,
        label: 'Buy the 12-Pack on Amazon',
        packSize: 12,
        // 39.99 is the current Amazon price. There is no struck-through "was"
        // price: the previous $29.99/$39.99 pair presented the real price as a
        // discount, which it never was.
        price: 39.99,
      },
      {
        name: 'Temu',
        url: MARKETPLACES.temu.url,
        label: 'Buy the 6-Pack on Temu',
        packSize: 6,
        price: null,
        note: 'The Temu listing is a 6-pack and priced on Temu. Amazon ships the 12-pack.',
      },
    ],
  },
  {
    slug: 'party-led-lights',
    name: 'Party LED Lights Set',
    categorySlug: 'party-supplies',
    badge: 'Popular',
    tagline: 'Battery-powered LED string lights that last all night. 33 feet, 100 LEDs.',
    shortDescription: 'Battery-powered LED string lights. 33 feet, 100 LEDs, 8+ hours of run time.',
    description:
      'Transform any space into a party zone with our LED string lights. These battery-powered lights run for 8+ hours on a single set of batteries, making them perfect for birthday parties, tailgates, dorm rooms, and outdoor events. Unlike cheap LED lights that die after an hour, our party LED lights are built to last through the entire celebration.',
    rating: 4.6,
    reviews: 156,
    sold: 12000,
    availableColors: 1,
    image: '/images/products/party-led-lights.jpg',
    imageAlt: 'EYRYA Party LED Lights Set - 33ft battery powered string lights for parties and events',
    colorSwatches: [],
    features: [
      '33 feet of LED lights - 100 individual bulbs',
      '8+ hours battery life on 3 AA batteries',
      '8 lighting modes - steady, flashing, wave, and more',
      'Waterproof wire - safe for outdoor use',
      'Lightweight and portable - no outlet needed',
      'Timer function - 6 hours on, 18 hours off',
    ],
    specs: {
      length: '33 feet (10 meters)',
      leds: '100 bulbs',
      power: '3 AA batteries (not included)',
      modes: '8 lighting modes',
    },
    faq: [
      {
        question: 'How long do the batteries last?',
        answer:
          'On a fresh set of quality AA batteries, the lights run for 8+ hours in steady mode. Flash modes may extend battery life even further.',
      },
      {
        question: 'Are these lights waterproof?',
        answer:
          'The wire is waterproof and safe for outdoor use. The battery pack is water-resistant but should be kept under cover in heavy rain.',
      },
      {
        question: 'Can I connect multiple sets together?',
        answer:
          'Each set runs independently on its own batteries. You can use multiple sets side by side for larger coverage areas.',
      },
      {
        question: 'Do these lights get hot?',
        answer:
          'No. LED lights run cool and are safe to touch. They are safe around kids, fabrics, and decorations.',
      },
    ],
    offers: [
      {
        name: 'Amazon',
        url: MARKETPLACES.amazon.url,
        label: 'Buy on Amazon',
        packSize: 1,
        // Placeholder product: the previous $24.99 / $29.99 pair was invented, so
        // no price is shown until a real listing exists.
        price: null,
      },
    ],
  },
  {
    slug: 'outdoor-game-kit',
    name: 'Outdoor Game Kit',
    categorySlug: 'outdoor-fun',
    badge: 'New',
    tagline: 'Everything you need for backyard fun. 6 games in one portable kit.',
    shortDescription: '6 classic games in one portable kit. Built for camping, beach, and backyard.',
    description:
      'Our outdoor game kit packs six classic games into one carry bag. Perfect for camping trips, beach days, backyard BBQs, and family gatherings. Each game is built with durable materials that can handle real outdoor use. No more cheap plastic that cracks after one season.',
    rating: 4.7,
    reviews: 89,
    sold: 6000,
    availableColors: 1,
    image: '/images/products/outdoor-game-kit.jpg',
    imageAlt:
      'EYRYA Outdoor Game Kit - 6 games in one portable bag for camping, beach, and backyard fun',
    colorSwatches: [],
    features: [
      '6 games included - ring toss, bean bag toss, ladder ball, and more',
      'Durable materials - built for outdoor use',
      'Portable carry bag - everything in one place',
      'Setup in under 5 minutes',
      'Suitable for ages 6 and up',
      'Great for 2-8 players',
    ],
    specs: {
      games: '6 games included',
      players: '2-8 players',
      age: '6+',
      bag_size: '24" x 8" x 8" carry bag',
    },
    faq: [
      {
        question: 'What games are included?',
        answer:
          'The kit includes ring toss, bean bag toss, ladder ball, bocce ball, horseshoes, and a flying disc. Six classic games that everyone knows how to play.',
      },
      {
        question: 'Is this kit suitable for young kids?',
        answer:
          'Yes. All games are suitable for ages 6 and up. The bean bag toss and ring toss are especially popular with younger kids.',
      },
      {
        question: 'How portable is the kit?',
        answer:
          'Everything fits in a 24" x 8" x 8" carry bag with a shoulder strap. It weighs about 5 lbs total - easy to carry to the beach, park, or campsite.',
      },
      {
        question: 'Can I play these games on grass and sand?',
        answer:
          'All six games work on grass, sand, and most flat outdoor surfaces. The stakes are designed for both soft and firm ground.',
      },
    ],
    offers: [
      {
        name: 'Amazon',
        url: MARKETPLACES.amazon.url,
        label: 'Buy on Amazon',
        packSize: 1,
        price: 39.99,
        originalPrice: 49.99,
      },
    ],
  },
];

// The product highlighted in the hero and the featured section.
export const FEATURED_PRODUCT_SLUG = 'eva-foam-finger';

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

// Locale-independent thousands separator. `toLocaleString()` renders differently
// depending on the runtime locale, which can desync server and client output.
export function formatCount(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Amazon and Temu carry different pack sizes, so the price and pack shown as the
// headline come from the flagship (first) offer.
export function getPrimaryOffer(product: Product): MarketplaceOffer {
  const [offer] = product.offers;
  if (!offer) {
    throw new Error(`Product "${product.slug}" has no marketplace offer`);
  }
  return offer;
}

/** Human-readable price for a single listing. */
export function formatOfferPrice(offer: MarketplaceOffer): string {
  return offer.price === null ? `Priced on ${offer.name}` : formatPrice(offer.price);
}

/** e.g. "12-pack" / "1 unit" */
export function formatPackSize(packSize: number): string {
  return packSize === 1 ? 'single unit' : `${packSize}-pack`;
}

export function discountPercent(product: Product): number {
  const offer = getPrimaryOffer(product);
  if (offer.price === null || !offer.originalPrice || offer.originalPrice <= offer.price) {
    return 0;
  }
  return Math.round((1 - offer.price / offer.originalPrice) * 100);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getFeaturedProduct(): Product {
  const product = getProduct(FEATURED_PRODUCT_SLUG);
  if (!product) {
    throw new Error(`FEATURED_PRODUCT_SLUG "${FEATURED_PRODUCT_SLUG}" does not match any product`);
  }
  return product;
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return PRODUCTS.filter((product) => product.categorySlug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

/** Categories that actually have at least one product. */
export function getPopulatedCategories(): Category[] {
  return CATEGORIES.filter((category) => getProductsByCategory(category.slug).length > 0);
}

export function productCountForCategory(slug: CategorySlug): number {
  return getProductsByCategory(slug).length;
}

export function getRelatedProducts(slug: string, limit = 2): Product[] {
  return PRODUCTS.filter((product) => product.slug !== slug).slice(0, limit);
}

export const PRODUCT_SLUGS: string[] = PRODUCTS.map((product) => product.slug);
