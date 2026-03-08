'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-wider text-[#FF6B6B] uppercase">
                New Arrival
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-[1.1] mb-6">
              The Original 
              <span className="text-[#FF6B6B]">EVA</span>
              <br />
              Foam Finger
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Lightweight, durable, and impossible to miss. Perfect for game days, parties, and any event where you want to stand out.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-[#1a1a1a]">$12.99</span>
              <span className="text-sm text-gray-500">Free shipping over $25</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-black transition-colors"
              >
                Shop on Amazon
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[#1a1a1a] font-semibold hover:text-[#FF6B6B] transition-colors"
              >
                View Details
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>1,247 sold this month</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span className="text-[#4ECDC4] font-medium">In Stock</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square bg-[#f5f5f5] flex items-center justify-center">
              {/* Product Image */}
              <div className="relative w-3/4 h-3/4 transform -rotate-6 shadow-2xl">
                <div className="absolute inset-0 bg-[#4ECDC4]">
                  <div className="absolute inset-4 border-4 border-white/30 overflow-hidden">
                    <Image
                      src="/images/foam-finger.jpg"
                      alt="EVA Foam Finger #1"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="absolute top-4 right-4 bg-white px-4 py-2 shadow-lg transform rotate-3">
                <span className="text-lg font-bold text-[#1a1a1a]">$12.99</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-[#FFE66D]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>4.8/5 (328 reviews)</span>
            </div>
            <div className="flex items-center gap-6">
              <span>Ships from US</span>
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
