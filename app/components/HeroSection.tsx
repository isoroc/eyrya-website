'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-start overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2C3E50] to-[#1a1a1a]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonal-stripes" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M-10,10 l20,-20 M0,40 l40,-40 M30,50 l20,-20" 
                        stroke="#ffffff" 
                        strokeWidth="1" 
                        fill="none" 
                        opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
            </svg>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="inline-block text-sm font-semibold tracking-[0.2em] text-white/80 uppercase font-sans">
              New Arrival
            </span>
          </div>

          <h1 className="font-['Teko'] text-6xl sm:text-7xl lg:text-8xl font-bold text-white uppercase leading-[0.9] mb-6 tracking-wide">
            BRING THE
            <br />
            <span className="text-[#DC2626]">NOISE</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 font-sans font-medium mb-8 max-w-lg leading-relaxed">
            The original EVA foam fingers. Trusted by 50,000+ fans.
          </p>

          <div className="mb-8">
            <span className="text-4xl sm:text-5xl font-bold text-white font-sans">
              $12.99
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-colors duration-200"
            >
              SHOP ON AMAZON
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-gray-300 transition-colors duration-200 underline underline-offset-4"
            >
              VIEW ALL PRODUCTS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
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
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span>Ships from US</span>
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#DC2626]"></div>
      <div className="absolute bottom-2 left-0 w-full h-1 bg-[#FFE66D]"></div>
    </section>
  );
}