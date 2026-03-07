import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ExternalLink, ChevronRight, Star } from 'lucide-react';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - EYRYA`,
    description: 'Product details and features.',
  };
}

const product = {
  name: 'EVA Foam Finger',
  tagline: 'The original 18-inch foam finger. Over 50,000 sold to fans across the country.',
  description: 'Show your team spirit with our premium EVA foam finger. This is not the flimsy foam finger that falls apart after one game. Our fingers use 8mm high-density EVA foam that holds its shape through rain, sweat, and celebration.',
  price: '$12.99',
  originalPrice: '$16.99',
  rating: '4.8',
  reviews: 328,
  sold: 50000,
  features: [
    '18 inches of pure team spirit',
    '8mm high-density EVA foam - will not collapse',
    'Comfortable hand opening - fits most adults',
    'Weather-resistant - works in rain or shine',
    'Reusable for multiple seasons',
    'Available in 12 colors',
  ],
  specs: {
    dimensions: '18" x 8" x 1"',
    weight: '3.2 oz',
    material: 'High-density EVA foam',
    colors: '12 options',
  },
  faq: [
    {
      question: 'What makes this different from cheap foam fingers?',
      answer: 'Most foam fingers use 3-4mm low-density foam that collapses after a few uses. Ours uses 8mm high-density EVA foam that keeps its shape game after game.',
    },
    {
      question: 'Will it fit my hand?',
      answer: 'The hand opening is 4 inches wide and fits most adult hands. Kids can hold it by the base.',
    },
    {
      question: 'How fast is shipping?',
      answer: 'Amazon Prime members get free 2-day shipping. Temu orders typically arrive in 7-10 days.',
    },
  ],
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
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

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-[#fafafa] border border-gray-200 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            <div className="w-48 h-64 bg-[#FF6B6B] flex flex-col items-center justify-center text-white">
              <div className="text-7xl font-black mb-1">#1</div>
              <div className="text-2xl font-bold">FAN</div>
            </div>
          </div>

          <div>
            <div className="inline-block px-3 py-1 bg-[#FF6B6B]/10 text-[#FF6B6B] text-xs font-bold uppercase tracking-wider mb-4">
              Best Seller
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3">
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
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1">Save 24%</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors"
              >
                Buy on Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://temu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-200 text-[#1a1a1a] px-8 py-4 font-semibold hover:border-[#1a1a1a] transition-colors"
              >
                Buy on Temu
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              {product.sold.toLocaleString()}+ sold. Free shipping on orders over $25.
            </p>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
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

        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-8">FAQ</h2>
          
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
            <h2 className="text-2xl font-bold text-white mb-4">Need more than one?</h2>
            <p className="text-gray-400 mb-6">
              Ordering for a team or event? Get wholesale pricing on 50+ units.
            </p>
            <a
              href="/wholesale"
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors"
            >
              View wholesale options
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
