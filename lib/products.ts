// Single source of truth for every product, category, and brand-level claim
// shown on the storefront.
//
// Before this module existed the same facts (price, rating, review count, units
// sold, pack size, marketplace URLs) were hardcoded independently in the hero,
// the featured section, the product list, the product detail pages, and the
// about page - and they had drifted apart. Add or change a product here and
// every page picks it up.
import { AMAZON_FLAGSHIP_ASIN, AMAZON_FLAGSHIP_URL, TEMU_LISTING_URL } from './links';

export type CategorySlug = 'party-supplies' | 'toys-play' | 'sports-fan-gear' | 'outdoor-fun';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Shown as a non-clickable tile: there is no product to link to yet. */
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
  /** The marketplace's own identifier for this listing, e.g. an Amazon ASIN. */
  sku?: string;
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
// Brand-level figures that were never verified (50,000 units sold, 4.7 average
// rating, 20+ countries shipped, a $20 free-shipping threshold, a 24-hour reply
// time) have been removed rather than restated. Add a figure here only when it
// can be evidenced.
export const BRAND = {
  name: 'EYRYA',
  siteUrl: 'https://www.eyrya.com',
} as const;

export const MARKETPLACES = {
  amazon: {
    name: 'Amazon' as const,
    // Every Amazon call to action points at the flagship listing rather than the
    // storefront: the storefront's first product is a single colourway, so
    // visitors who followed it saw a pink-only page.
    url: AMAZON_FLAGSHIP_URL,
    description: 'Our EVA foam fingers are sold here as a 12-pack, with Amazon Prime delivery and the A-to-Z Guarantee.',
    features: ['12-pack listing', 'Amazon return policy', 'A-to-Z Guarantee'],
  },
  temu: {
    name: 'Temu' as const,
    url: TEMU_LISTING_URL,
    description: 'Our flagship foam fingers are listed here as a 6-pack, sized for smaller groups.',
    features: ['6-pack listing', 'Fulfilled by Temu', 'Priced on Temu'],
  },
} as const;

export const CATEGORIES: Category[] = [
  {
    slug: 'party-supplies',
    name: 'Party Supplies',
    description: 'No products in this category yet.',
  },
  {
    slug: 'toys-play',
    name: 'Kids & Toys',
    description: 'No products in this category yet.',
  },
  {
    slug: 'sports-fan-gear',
    name: 'Sports & Fan Gear',
    description: '18-inch EVA foam hands for game day.',
  },
  {
    slug: 'outdoor-fun',
    name: 'Outdoor & Camping',
    description: 'No products in this category yet.',
  },
];

// The foam finger's Amazon listing URL and ASIN live in lib/links.ts, which the
// client-side navbar can import without pulling this catalogue into the bundle.

// Only products that actually exist belong here.
//
// The catalogue used to carry three entries. Two of them - a "Party LED Lights
// Set" and an "Outdoor Game Kit" - were placeholders the owner had invented to
// fill the page: no such listings exist, and their prices, specs, ratings and
// sales figures were all fabricated. They have been removed. The one real
// product is the foam finger, and its figures come from the owner or from the
// live Amazon listing.
export const PRODUCTS: Product[] = [
  {
    slug: 'eva-foam-finger',
    name: 'EVA Foam Finger (12 Pack)',
    categorySlug: 'sports-fan-gear',
    badge: 'Best Seller',
    tagline: `18-inch EVA foam hand. Reusable, lightweight, and available in ${5} colours.`,
    shortDescription: '18-inch EVA foam hand, reusable season after season.',
    description:
      'An 18-inch EVA foam hand for game day: light enough to hold through a whole match, and reusable season after season. The retail pack is available in five colours, and we manufacture custom colours, thickness, and logo printing for larger runs.',
    image: '/images/products/foam-finger-multi.webp',
    imageAlt: 'EYRYA EVA foam hand in several team colours - 18 inch foam finger for sports fans',
    colorSwatches: [
      { name: 'Blue', hex: '#3B82F6', image: '/images/products/foam-finger-blue.webp' },
      { name: 'Black', hex: '#1a1a1a', image: '/images/products/foam-finger-black.webp' },
      { name: 'Pink', hex: '#FF6B6B', image: '/images/products/foam-finger-pink.webp' },
      { name: 'Green', hex: '#22C55E', image: '/images/products/foam-finger-green.webp' },
      { name: 'Yellow', hex: '#FFE66D', image: '/images/products/foam-finger-yellow.webp' },
    ],
    features: [
      '18-inch EVA foam hand',
      'Lightweight enough to hold for a full game',
      'Reusable season after season',
      'Available in 5 colours',
      'Custom colours, thickness and logo printing on larger runs',
    ],
    specs: {
      size: '18 in (46 cm)',
      material: 'EVA foam',
      colours: '5 in the retail range',
      thickness: 'Made to order for custom runs',
    },
    faq: [
      {
        question: 'How many foam fingers do I get?',
        answer:
          'The Amazon listing is a 12-pack and the Temu listing is a 6-pack. Both pack sizes are shown with their own price on this page.',
      },
      {
        question: 'Can I choose the colour?',
        answer:
          'The retail pack comes in five colours. On a custom run the colours are matched to your specification instead.',
      },
      {
        question: 'Is the foam thickness fixed?',
        answer:
          'On custom production runs the EVA thickness is made to order. Retail packs ship in our standard weight.',
      },
      {
        question: 'Can you print our logo on them?',
        answer:
          'Yes, by silk-screen printing. Logos are part of a custom run, which starts at 5,000 pieces per colour - see the wholesale page for the full terms.',
      },
      {
        question: 'How fast is shipping?',
        answer:
          "Shipping is handled by the marketplace you buy from, so the delivery options and any free-shipping threshold are theirs and are shown at checkout. Amazon Prime members get Amazon's 2-day service; Temu shows its own estimate on the listing.",
      },
    ],
    offers: [
      {
        name: 'Amazon',
        url: AMAZON_FLAGSHIP_URL,
        label: 'Buy the 12-Pack on Amazon',
        packSize: 12,
        sku: AMAZON_FLAGSHIP_ASIN,
        // The current Amazon price, supplied by the owner (34.99 as of the most
        // recent update; it was 39.99 before that). There is deliberately no
        // originalPrice: a struck-through "was" price is a former-price claim,
        // and the site's first attempt at one invented the pair ($29.99 against a
        // "was" $39.99) to make the real price look discounted. Add originalPrice
        // only when the owner confirms the old price was genuinely offered long
        // enough to be a bona fide former price.
        price: 34.99,
      },
      {
        name: 'Temu',
        url: TEMU_LISTING_URL,
        label: 'Buy the 6-Pack on Temu',
        packSize: 6,
        price: null,
        note: 'The Temu listing is a 6-pack and priced on Temu. Amazon ships the 12-pack.',
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
