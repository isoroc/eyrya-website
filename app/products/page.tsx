import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Products - EYRYA',
  description: 'Explore EYRYA\'s range of products for parties, playtime, sports events and outdoor fun.',
};

const categories = [
  {
    name: 'Party Supplies',
    description: 'Party props, celebration accessories and more.',
    slug: 'party-supplies',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-500',
    products: 12,
  },
  {
    name: 'Toys \u0026 Play',
    description: 'Creative and playful products for everyday fun.',
    slug: 'toys-play',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-500',
    products: 8,
  },
  {
    name: 'Sports Fan Gear',
    description: 'Cheering accessories for fans and events.',
    slug: 'sports-fan-gear',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-500',
    products: 6,
  },
  {
    name: 'Outdoor Fun',
    description: 'Products for active family time and outdoor activities.',
    slug: 'outdoor-fun',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-500',
    products: 10,
  },
];

const featuredProducts = [
  {
    name: 'EVA Foam Finger',
    description: 'A fun and lightweight cheering accessory for sports events, parties and celebrations.',
    slug: 'eva-foam-finger',
    category: 'Sports Fan Gear',
    price: '$12.99',
  },
  {
    name: 'Party LED Lights Set',
    description: 'Colorful LED lights to brighten up any celebration.',
    slug: 'party-led-lights',
    category: 'Party Supplies',
    price: '$24.99',
  },
  {
    name: 'Outdoor Game Kit',
    description: 'Complete outdoor game set for family fun.',
    slug: 'outdoor-game-kit',
    category: 'Outdoor Fun',
    price: '$39.99',
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            EYRYA offers a growing range of products for parties, playtime, sports events and outdoor fun.
          </p>
        </div>

        {/* Categories Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className={`group p-8 rounded-2xl border-2 ${category.color} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold ${category.iconColor} mb-2`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <span className="text-sm text-gray-500">
                      {category.products} products
                    </span>
                  </div>
                  <ArrowRight className={`w-6 h-6 ${category.iconColor} transform group-hover:translate-x-2 transition-transform`} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-orange-400 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {product.name.charAt(0)}
                  </div>
                </div>
                
                <div className="p-6">
                  <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-pink-600 font-medium flex items-center gap-1">
                      View <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Find EYRYA products on your favorite marketplace with fast shipping and great prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop on Amazon
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://temu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors"
            >
              Shop on Temu
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
