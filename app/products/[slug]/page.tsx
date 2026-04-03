import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ExternalLink, ChevronRight, Star } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'eva-foam-finger' },
    { slug: 'party-led-lights' },
    { slug: 'outdoor-game-kit' },
  ];
}

interface ProductData {
  name: string;
  tagline: string;
  description: string;
  price: string;
  originalPrice: string;
  rating: string;
  reviews: number;
  sold: number;
  badge?: string;
  image: string;
  imageAlt: string;
  features: string[];
  specs: Record<string, string>;
  faq: { question: string; answer: string }[];
}

const products: Record<string, ProductData> = {
  'eva-foam-finger': {
    name: 'EVA Foam Finger',
    tagline: 'The original 18-inch foam finger. Over 50,000 sold to fans across the country.',
    description: 'Show your team spirit with our premium EVA foam finger. This is not the flimsy foam finger that falls apart after one game. Our foam fingers use 8mm high-density EVA foam that holds its shape through rain, sweat, and celebration. Whether you are cheering at an NFL game, NBA match, or your kid\'s school event, this foam hand delivers.',
    price: '$12.99',
    originalPrice: '$16.99',
    rating: '4.8',
    reviews: 328,
    sold: 50000,
    badge: 'Best Seller',
    image: '/images/products/foam-finger-multi.webp',
    imageAlt: 'EYRYA EVA Foam Finger in multiple team colors - 18 inch foam hand for sports fans',
    features: [
      '18 inches of pure team spirit',
      '8mm high-density EVA foam - will not collapse',
      'Comfortable hand opening - fits most adults',
      'Weather-resistant - works in rain or shine',
      'Reusable for multiple seasons',
      'Available in 12 team colors',
    ],
    specs: {
      dimensions: '18" x 8" x 1"',
      weight: '3.2 oz',
      material: 'High-density EVA foam',
      colors: '12 options',
    },
    faq: [
      {
        question: 'What makes EYRYA foam fingers different from cheap ones?',
        answer: 'Most foam fingers use 3-4mm low-density foam that collapses after a few uses. Ours uses 8mm high-density EVA foam that keeps its shape game after game. That is why we have sold over 50,000 units with a 4.8-star rating.',
      },
      {
        question: 'Will the foam finger fit my hand?',
        answer: 'The hand opening is 4 inches wide and fits most adult hands comfortably. Kids can hold it by the base or use both hands.',
      },
      {
        question: 'Can I use this foam finger in the rain?',
        answer: 'Yes. EVA foam is naturally water-resistant. Our foam fingers work perfectly in rain, snow, or intense sun. Just wipe them down and they are good to go.',
      },
      {
        question: 'How fast is shipping?',
        answer: 'Amazon Prime members get free 2-day shipping. Temu orders typically arrive in 7-10 days.',
      },
    ],
  },
  'party-led-lights': {
    name: 'Party LED Lights Set',
    tagline: 'Battery-powered LED string lights that last all night. 33 feet, 100 LEDs.',
    description: 'Transform any space into a party zone with our LED string lights. These battery-powered lights run for 8+ hours on a single set of batteries, making them perfect for birthday parties, tailgates, dorm rooms, and outdoor events. Unlike cheap LED lights that die after an hour, our party LED lights are built to last through the entire celebration.',
    price: '$24.99',
    originalPrice: '$29.99',
    rating: '4.6',
    reviews: 156,
    sold: 15000,
    badge: 'Popular',
    image: '/images/products/party-led-lights.jpg',
    imageAlt: 'EYRYA Party LED Lights Set - 33ft battery powered string lights for parties and events',
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
        answer: 'On a fresh set of quality AA batteries, the lights run for 8+ hours in steady mode. Flash modes may extend battery life even further.',
      },
      {
        question: 'Are these lights waterproof?',
        answer: 'The wire is waterproof and safe for outdoor use. The battery pack is water-resistant but should be kept under cover in heavy rain.',
      },
      {
        question: 'Can I connect multiple sets together?',
        answer: 'Each set runs independently on its own batteries. You can use multiple sets side by side for larger coverage areas.',
      },
      {
        question: 'Do these lights get hot?',
        answer: 'No. LED lights run cool and are safe to touch. They are safe around kids, fabrics, and decorations.',
      },
    ],
  },
  'outdoor-game-kit': {
    name: 'Outdoor Game Kit',
    tagline: 'Everything you need for backyard fun. 6 games in one portable kit.',
    description: 'Our outdoor game kit packs six classic games into one carry bag. Perfect for camping trips, beach days, backyard BBQs, and family gatherings. Each game is built with durable materials that can handle real outdoor use. No more cheap plastic that cracks after one season.',
    price: '$39.99',
    originalPrice: '$49.99',
    rating: '4.7',
    reviews: 89,
    sold: 8000,
    badge: 'New',
    image: '/images/products/outdoor-game-kit.jpg',
    imageAlt: 'EYRYA Outdoor Game Kit - 6 games in one portable bag for camping, beach, and backyard fun',
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
        answer: 'The kit includes ring toss, bean bag toss, ladder ball, bocce ball, horseshoes, and a flying disc. Six classic games that everyone knows how to play.',
      },
      {
        question: 'Is this kit suitable for young kids?',
        answer: 'Yes. All games are suitable for ages 6 and up. The bean bag toss and ring toss are especially popular with younger kids.',
      },
      {
        question: 'How portable is the kit?',
        answer: 'Everything fits in a 24" x 8" x 8" carry bag with a shoulder strap. It weighs about 5 lbs total - easy to carry to the beach, park, or campsite.',
      },
      {
        question: 'Can I play these games on grass and sand?',
        answer: 'All six games work on grass, sand, and most flat outdoor surfaces. The stakes are designed for both soft and firm ground.',
      },
    ],
  },
};

const productLinks: Record<string, { name: string; slug: string }[]> = {
  'eva-foam-finger': [
    { name: 'Party LED Lights Set', slug: 'party-led-lights' },
    { name: 'Outdoor Game Kit', slug: 'outdoor-game-kit' },
  ],
  'party-led-lights': [
    { name: 'EVA Foam Finger', slug: 'eva-foam-finger' },
    { name: 'Outdoor Game Kit', slug: 'outdoor-game-kit' },
  ],
  'outdoor-game-kit': [
    { name: 'EVA Foam Finger', slug: 'eva-foam-finger' },
    { name: 'Party LED Lights Set', slug: 'party-led-lights' },
  ],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) {
    return {
      title: 'Product Not Found | EYRYA',
      description: 'The product you are looking for does not exist.',
    };
  }
  return {
    title: `EYRYA® ${product.name} | Premium Quality & Best Price`,
    description: `Shop ${product.name} by EYRYA. ${product.tagline} ${product.sold.toLocaleString()}+ sold. Best price on Amazon & Temu. Free shipping available.`,
    keywords: `EYRYA ${product.name}, ${product.name.toLowerCase()} buy online, premium ${product.name.toLowerCase()}`,
    alternates: {
      canonical: `https://www.eyrya.com/products/${slug}/`,
    },
    openGraph: {
      title: `EYRYA ${product.name} - Premium Quality`,
      description: `${product.tagline} ${product.sold.toLocaleString()}+ sold. Shop on Amazon & Temu.`,
      type: 'website',
      url: `https://www.eyrya.com/products/${slug}/`,
      siteName: 'EYRYA',
      images: [
        {
          url: `https://www.eyrya.com${product.image}`,
          width: 800,
          height: 800,
          alt: product.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `EYRYA ${product.name} - Premium Quality`,
      description: `${product.tagline} ${product.sold.toLocaleString()}+ sold.`,
      images: [`https://www.eyrya.com${product.image}`],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
          <Link href="/products" className="text-[#DC2626] hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = productLinks[slug] || [];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#1a1a1a]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-[#1a1a1a]">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1a1a1a]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#fafafa] border border-gray-200 flex items-start justify-center min-h-[400px] lg:min-h-[500px]">
            <img
              src={product.image}
              alt={product.imageAlt}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div>
            {product.badge && (
              <div className="inline-block px-3 py-1 bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wider mb-4">
                {product.badge}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-6">
              {product.tagline}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-[#1a1a1a]">{product.rating}</span>
              </div>
              <span className="text-gray-400">({product.reviews} reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 text-sm font-medium">In Stock</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-[#1a1a1a]">{product.price}</span>
              <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
              <span className="text-sm font-medium text-white bg-[#DC2626] px-2 py-1">
                Save {Math.round((1 - parseFloat(product.price.replace('$', '')) / parseFloat(product.originalPrice.replace('$', ''))) * 100)}%
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href="https://www.amazon.com/shops/eyrya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors rounded-sm"
              >
                Buy on Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.temu.com/ca/set-of-6-oversized-foam-fingers-measuring-18-inches-46-cm----events-parties-concerts-and-celebrations-offered-in--colors-g-605652411892197.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-200 text-[#1a1a1a] px-8 py-4 font-semibold hover:border-[#1a1a1a] transition-colors rounded-sm"
              >
                Buy on Temu
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              {product.sold.toLocaleString()}+ sold. Free shipping on orders over $25.
            </p>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-lg font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#fafafa] p-6">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-4 uppercase tracking-wider">Specifications</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-gray-400 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                    <dd className="font-medium text-[#1a1a1a]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="group p-5 bg-[#fafafa] border border-gray-200 hover:border-[#DC2626] transition-colors"
                >
                  <h3 className="font-semibold text-[#1a1a1a] group-hover:text-[#DC2626] transition-colors">
                    {related.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-8">FAQ</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {product.faq.map((item, index) => (
              <div key={index} className="bg-[#fafafa] p-6">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-white mb-4">Need more than one?</h2>
            <p className="text-gray-400 mb-6">
              Ordering for a team or event? Get wholesale pricing on 50+ units.
            </p>
            <a
              href="/wholesale"
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-sm"
            >
              View wholesale options
            </a>
          </div>
        </div>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": `https://www.eyrya.com${product.image}`,
          "brand": {
            "@type": "Brand",
            "name": "EYRYA",
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": product.price.replace('$', ''),
            "highPrice": product.originalPrice.replace('$', ''),
            "offerCount": 2,
            "offers": [
              {
                "@type": "Offer",
                "price": product.price.replace('$', ''),
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Amazon",
                },
                "url": "https://www.amazon.com/shops/eyrya",
              },
              {
                "@type": "Offer",
                "price": product.price.replace('$', ''),
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Temu",
                },
                "url": "https://www.temu.com",
              },
            ],
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviews,
            "bestRating": "5",
            "worstRating": "1",
          },
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": product.faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer,
            },
          })),
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eyrya.com/" },
            { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.eyrya.com/products/" },
            { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://www.eyrya.com/products/${slug}/` },
          ],
        }} />
      </div>
    </div>
  );
}
