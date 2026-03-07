'use client';

import Link from 'next/link';

const categories = [
  {
    name: 'Party Supplies',
    description: 'Party essentials that actually work. Birthday banners, tableware, and decor that wont fall apart mid-celebration.',
    color: '#FF6B6B',
    bgColor: 'bg-[#FF6B6B]/5',
    productCount: '12 products',
    href: '/products?category=party-supplies',
  },
  {
    name: 'Kids & Toys',
    description: 'Toys kids actually play with. No gimmicks, no 5-minute wonders. Just solid fun that lasts.',
    color: '#4ECDC4',
    bgColor: 'bg-[#4ECDC4]/5',
    productCount: '8 products',
    href: '/products?category=toys-play',
  },
  {
    name: 'Sports & Fan Gear',
    description: 'Game day essentials. Foam fingers, banners, and noise makers that make you the loudest fan in the stadium.',
    color: '#FFE66D',
    bgColor: 'bg-[#FFE66D]/5',
    productCount: '15 products',
    href: '/products?category=sports-fan-gear',
  },
  {
    name: 'Outdoor & Camping',
    description: 'Camping gear that survives real trips. Tested on actual family vacations, not just photo shoots.',
    color: '#1a1a1a',
    bgColor: 'bg-gray-100',
    productCount: '6 products',
    href: '/products?category=outdoor-fun',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            We specialize in party supplies and fan gear. That's it. No random gadgets, no dropshipping junk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div className={`group ${category.bgColor} border border-gray-200 p-6 hover:border-[${category.color}] transition-colors h-full flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#1a1a1a]">
                    {category.name}
                  </h3>
                  <span className="text-xs font-medium text-gray-500">
                    {category.productCount}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-6 flex-grow">
                  {category.description}
                </p>
                
                <div className="flex items-center text-sm font-semibold text-[#1a1a1a] group-hover:gap-3 gap-2 transition-all">
                  Browse
                  <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
