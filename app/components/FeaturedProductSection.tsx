'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import {
  discountPercent,
  formatPrice,
  getFeaturedProduct,
  getPrimaryOffer,
} from '@/lib/products';

export default function FeaturedProductSection() {
  const product = getFeaturedProduct();
  const colors = product.colorSwatches;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const savings = discountPercent(product);
  // The flagship (Amazon 12-pack) listing supplies the headline price.
  const offer = getPrimaryOffer(product);

  return (
    <section className="py-20 bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#DC2626] text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                {product.badge}
              </span>
            </div>

            <h2 className="text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              {offer.price !== null && (
                <span className="text-3xl font-bold text-[#1a1a1a]">{formatPrice(offer.price)}</span>
              )}
              {offer.originalPrice ? (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(offer.originalPrice)}
                </span>
              ) : null}
              {savings > 0 && (
                <span className="text-sm text-[#DC2626] font-medium">Save {savings}%</span>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DC2626]"></div>
                <span className="text-gray-700">{product.specs.material}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DC2626]"></div>
                <span className="text-gray-700">{product.specs.size}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DC2626]"></div>
                <span className="text-gray-700">Available in {colors.length} colours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/products/${product.slug}/`}
                className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-black transition-colors rounded-sm"
              >
                View Product
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 font-semibold hover:bg-[#1a1a1a] hover:text-white transition-colors rounded-sm"
              >
                {offer.label}
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Sold and shipped by {offer.name}, so their delivery options and buyer protection apply.
            </p>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square flex items-center justify-center relative -mt-4">
              <div className="w-3/4 h-3/4 relative transform -rotate-6 shadow-xl overflow-hidden -mt-8">
                <Image
                  src={selectedColor.image}
                  alt={`${product.name} - ${selectedColor.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 75vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Color Options */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {colors.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    type="button"
                    onClick={() => setSelectedColor(colorOption)}
                    aria-label={`Show ${colorOption.name}`}
                    aria-pressed={selectedColor.name === colorOption.name}
                    className={`w-12 h-8 border-2 shadow-sm cursor-pointer transition-transform hover:scale-110 ${
                      selectedColor.name === colorOption.name
                        ? 'border-[#1a1a1a] scale-110'
                        : 'border-white'
                    }`}
                    style={{ backgroundColor: colorOption.hex }}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
