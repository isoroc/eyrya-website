'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">Party · Play · Cheer · Outdoor · TEST</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
          >
            Bring More{' '}
            <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Fun
            </span>
            <br />
            to Every Moment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            EYRYA creates fun products for parties, sports events, playtime and outdoor activities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Shop on Amazon
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-pink-500 hover:text-pink-500 transition-all duration-200"
            >
              Explore Products
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-orange-200 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm">10,000+ Happy Customers</span>
            </div>
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />
            <span className="text-sm">Fast Shipping Worldwide</span>
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />
            <span className="text-sm">Premium Quality</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-pink-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
