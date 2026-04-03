'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const categories = [
  {
    name: 'Party Supplies',
    description: 'Party props and celebration accessories that dont fall apart.',
    slug: 'party-supplies',
  },
  {
    name: 'Kids & Toys',
    description: 'Toys kids actually play with. No gimmicks.',
    slug: 'toys-play',
  },
  {
    name: 'Sports Fan Gear',
    description: 'Cheering accessories for real fans. Foam fingers and more.',
    slug: 'sports-fan-gear',
  },
  {
    name: 'Outdoor & Camping',
    description: 'Gear for actual outdoor adventures. Tested in the wild.',
    slug: 'outdoor-fun',
  },
];

const allProducts = [
  {
    name: 'EVA Foam Finger (12 Pack)',
    description: '12-pack of 18-inch foam fingers. Over 50,000 sets sold. 4.8/5 stars.',
    slug: 'eva-foam-finger',
    image: '/images/products/foam-finger-multi.webp',
    category: 'Sports Fan Gear',
    categorySlug: 'sports-fan-gear',
    price: '$29.99',
    originalPrice: '$39.99',
    rating: '4.8',
    reviews: 328,
  },
  {
    name: 'Party LED Lights Set',
    description: 'Battery-powered LED string lights. 33 feet, 100 LEDs. Lasts 8+ hours.',
    slug: 'party-led-lights',
    image: '/images/products/party-led-lights.jpg',
    category: 'Party Supplies',
    categorySlug: 'party-supplies',
    price: '$24.99',
    originalPrice: '$29.99',
    rating: '4.6',
    reviews: 156,
  },
  {
    name: 'Outdoor Game Kit',
    description: '6 classic games in one portable kit. Perfect for camping, beach, and backyard.',
    slug: 'outdoor-game-kit',
    image: '/images/products/outdoor-game-kit.jpg',
    category: 'Outdoor & Camping',
    categorySlug: 'outdoor-fun',
    price: '$39.99',
    originalPrice: '$49.99',
    rating: '4.7',
    reviews: 89,
  },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return allProducts;
    return allProducts.filter((p) => p.categorySlug === activeCategory);
  }, [activeCategory]);

  const activeCategoryName = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.name
    : null;

  return (
    <div className="pt-24 pb-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3 tracking-wide">
            {activeCategoryName ? activeCategoryName : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {activeCategoryName
              ? `Browsing ${activeCategoryName.toLowerCase()}. `
              : ''}
            Party supplies, fan gear, and outdoor products. We only sell stuff we would use ourselves.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="font-['Teko'] text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-wide">
            Categories
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={
                  activeCategory === category.slug
                    ? '/products'
                    : `/products?category=${category.slug}`
                }
                className={`group bg-white border p-6 transition-colors ${
                  activeCategory === category.slug
                    ? 'border-[#DC2626] bg-[#DC2626]/5'
                    : 'border-gray-200 hover:border-[#DC2626]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#1A1A1A] mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#DC2626] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-['Teko'] text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-wide">
            {activeCategoryName ? activeCategoryName : 'Featured'}
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products in this category yet.</p>
              <Link href="/products" className="text-[#DC2626] hover:underline">
                View all products
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group bg-white border border-gray-200 hover:border-[#1A1A1A] transition-colors"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <span className="text-xs font-medium text-[#DC2626] uppercase tracking-wider">
                      {product.category}
                    </span>

                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-2 mb-2">
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
                        <span className="text-xl font-bold text-[#1A1A1A]">{product.price}</span>
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#DC2626] group-hover:gap-2 gap-1 transition-all inline-flex items-center">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="bg-[#DC2626] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="font-['Teko'] text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Ready to buy?
            </h2>
            <p className="text-white/80 mb-8">
              Find EYRYA on Amazon and Temu. Same products, fast shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.amazon.com/shops/eyrya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#DC2626] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-sm"
              >
                Shop Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.temu.com/ca/set-of-6-oversized-foam-fingers-measuring-18-inches-46-cm----events-parties-concerts-and-celebrations-offered-in--colors-g-605652411892197.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 font-semibold hover:bg-white/20 transition-colors rounded-sm"
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
