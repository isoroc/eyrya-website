'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const platforms = [
  {
    name: 'Amazon',
    description: 'Prime shipping. 4.6/5 stars from 2,847 reviews.',
    url: 'https://amazon.com',
    stock: 'In stock',
  },
  {
    name: 'Temu',
    description: 'Budget-friendly options. New customer discounts available.',
    url: 'https://temu.com',
    stock: 'In stock',
  },
];

export default function WhereToBuySection() {
  return (
    <section className="py-16 lg:py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Where to Buy
          </h2>
          <p className="text-gray-400">
            Find us on major marketplaces. Same products, your preferred platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
          {platforms.map((platform) => (
            <Link
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {platform.name}
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </h3>
                  <span className="text-xs font-medium text-green-400">
                    {platform.stock}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm">
                  {platform.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 max-w-3xl">
          <p className="text-gray-500 text-sm">
            Wholesale inquiries? Email us at wholesale@eyrya.com for bulk pricing on 100+ units.
          </p>
        </div>
      </div>
    </section>
  );
}
