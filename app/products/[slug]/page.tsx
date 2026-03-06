import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ExternalLink, ChevronRight } from 'lucide-react';

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
  tagline: 'A fun and lightweight cheering accessory for sports events, parties and celebrations.',
  description: 'Show your team spirit with our premium EVA Foam Finger! This lightweight, comfortable cheering prop is perfect for sports events, parties, school activities, and any celebration where you want to stand out and show your support.',
  price: '$12.99',
  features: [
    'Lightweight EVA foam',
    'Easy and comfortable to hold',
    'Great for cheering and group events',
    'Fun visual impact for parties and sports',
    'Durable and reusable',
    'Available in multiple colors',
  ],
  perfectFor: [
    'Sports games',
    'Birthday parties',
    'School events',
    'Team celebrations',
    'Festival gatherings',
    'Corporate events',
  ],
  faq: [
    {
      question: 'What is the foam finger made of?',
      answer: 'It is made of lightweight, high-quality EVA foam that is durable and comfortable to hold.',
    },
    {
      question: 'Is it suitable for parties and sports events?',
      answer: 'Yes, it is specifically designed for cheering, parties, and group events of all kinds.',
    },
    {
      question: 'Where can I buy EYRYA products?',
      answer: 'You can shop through our marketplace partners such as Amazon and Temu.',
    },
  ],
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-pink-600">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-12 flex items-center justify-center min-h-[500px]">
            <div className="relative">
              <div className="w-64 h-80 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl transform -rotate-3">
                <div className="text-9xl font-black mb-2">#1</div>
                <div className="text-3xl font-bold">FAN</div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              Best Seller
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {product.tagline}
            </p>

            <div className="text-3xl font-bold text-gray-900 mb-8">
              {product.price}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Buy on Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://temu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Buy on Temu
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Key Features */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perfect For */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Perfect For</h2>
              <div className="flex flex-wrap gap-2">
                {product.perfectFor.map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {product.faq.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Where to Buy */}
        <div className="mt-20 bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Where to Buy</h2>
          <p className="text-gray-300 mb-8">
            Available on trusted online marketplaces
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Amazon
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://temu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors"
            >
              Temu
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            More platforms coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
