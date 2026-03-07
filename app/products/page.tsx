import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products - EYRYA',
  description: 'Party supplies, fan gear, and outdoor products. Real stuff that actually works.',
};

const categories = [
  {
    name: 'Party Supplies',
    description: 'Party props and celebration accessories that dont fall apart.',
    slug: 'party-supplies',
    products: 12,
  },
  {
    name: 'Kids \u0026 Toys',
    description: 'Toys kids actually play with. No gimmicks.',
    slug: 'toys-play',
    products: 8,
  },
  {
    name: 'Sports Fan Gear',
    description: 'Cheering accessories for real fans. Foam fingers and more.',
    slug: 'sports-fan-gear',
    products: 15,
  },
  {
    name: 'Outdoor \u0026 Camping',
    description: 'Gear for actual outdoor adventures. Tested in the wild.',
    slug: 'outdoor-fun',
    products: 6,
  },
];

const featuredProducts = [
  {
    name: 'EVA Foam Finger',
    description: 'The original 18-inch foam finger. Over 50,000 sold. 4.8/5 stars.',
    slug: 'eva-foam-finger',
    category: 'Sports Fan Gear',
    price: '$12.99',
    originalPrice: '$16.99',
    rating: '4.8',
    reviews: 328,
  },
  {
    name: 'Party LED Lights Set',
    description: 'Battery-powered LED string lights. 33 feet, 100 LEDs. Lasts 8+ hours.',
    slug: 'party-led-lights',
    category: 'Party Supplies',
    price: '$24.99',
    originalPrice: '$29.99',
    rating: '4.6',
    reviews: 156,
  },
  {
    name: 'Camping Chair Set',
    description: 'Two-pack folding chairs. Supports 300 lbs. Includes carry bags.',
    slug: 'camping-chair-set',
    category: 'Outdoor \u0026 Camping',
    price: '$49.99',
    originalPrice: '$59.99',
    rating: '4.7',
    reviews: 89,
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3">
            All Products
          </h1>
          <p className="text-gray-600">
            Party supplies, fan gear, and outdoor products. We only sell stuff we would use ourselves.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Categories</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group border border-gray-200 p-6 hover:border-[#FF6B6B] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                    <span className="text-xs text-gray-400">
                      {category.products} products
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B6B] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Featured</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group border border-gray-200 hover:border-[#1a1a1a] transition-colors"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#FF6B6B] flex items-center justify-center text-white text-2xl font-bold">
                    {product.name.charAt(0)}
                  </div>
                </div>
                
                <div className="p-5">
                  <span className="text-xs font-medium text-[#4ECDC4] uppercase tracking-wider">
                    {product.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-[#1a1a1a] mt-2 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#1a1a1a]">{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#1a1a1a] group-hover:gap-2 gap-1 transition-all inline-flex items-center">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to buy?</h2>
            <p className="text-gray-400 mb-8">
              Find EYRYA on Amazon and Temu. Same products, fast shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://temu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
              >
                Shop Temu
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
