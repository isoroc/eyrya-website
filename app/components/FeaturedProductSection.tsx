import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProductSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#FFE66D] text-[#1a1a1a] text-xs font-bold px-2 py-1 uppercase tracking-wider">
                Best Seller
              </span>
              <span className="text-sm text-gray-500">1,247 sold</span>
            </div>

            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              EVA Foam Finger #1
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-[#1a1a1a]">$12.99</span>
              <span className="text-lg text-gray-400 line-through">$16.99</span>
              <span className="text-sm text-[#FF6B6B] font-medium">Save 24%</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Our flagship product. 18-inch foam hand that's lightweight enough to hold all day, 
              durable enough to last season after season. Perfect for sporting events, concerts, 
              and parties.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#4ECDC4]"></div>
                <span className="text-gray-700">Lightweight EVA foam</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#4ECDC4]"></div>
                <span className="text-gray-700">18" x 8" dimensions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#4ECDC4]"></div>
                <span className="text-gray-700">Available in 5 colors</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products/eva-foam-finger"
                className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-black transition-colors"
              >
                View Product
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 font-semibold hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Buy on Amazon
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <span className="text-[#4ECDC4] font-medium">✓ In Stock</span>
              <span>• Ships within 24 hours</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-[#f5f5f5] flex items-center justify-center relative">
              <div className="w-2/3 h-2/3 bg-[#FF6B6B] transform -rotate-6 shadow-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl font-black">#1</div>
                  <div className="text-2xl font-bold tracking-widest">FAN</div>
                </div>
              </div>

              {/* Color Options */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {['#FF6B6B', '#4ECDC4', '#FFE66D', '#1a1a1a'].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 border-2 border-white shadow-sm cursor-pointer"
                    style={{ backgroundColor: color }}
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
