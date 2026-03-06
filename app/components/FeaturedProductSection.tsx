'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, ExternalLink } from 'lucide-react';

const features = [
  'Lightweight EVA material',
  'Comfortable to hold',
  'Perfect for games and parties',
  'Fun and eye-catching',
];

export default function FeaturedProductSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Featured Product
          </motion.h2>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-pink-100 to-orange-100 p-12 flex items-center justify-center min-h-[400px] lg:min-h-full"
            >
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-white/50 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 rounded-3xl w-full h-full flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="text-white text-center p-8">
                    <div className="text-8xl font-black mb-4">#1</div>
                    <div className="text-2xl font-bold">FAN</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4 w-fit">
                Best Seller
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                EVA Foam Finger
              </h3>

              <p className="text-lg text-gray-600 mb-6">
                A lightweight cheering prop for sports fans, parties and events. Easy to hold, easy to notice, and perfect for creating energy in any crowd.
              </p>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products/eva-foam-finger"
                  className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  View Product
                </Link>
                <Link
                  href="https://amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Buy on Amazon
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
