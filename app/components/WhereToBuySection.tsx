'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ShoppingCart } from 'lucide-react';

const platforms = [
  {
    name: 'Amazon',
    description: 'Shop EYRYA products with convenient delivery and trusted service.',
    url: 'https://amazon.com',
    color: 'from-orange-400 to-amber-500',
    logo: 'A',
  },
  {
    name: 'Temu',
    description: 'Discover EYRYA products and deals on Temu.',
    url: 'https://temu.com',
    color: 'from-pink-500 to-rose-500',
    logo: 'T',
  },
];

export default function WhereToBuySection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <ShoppingCart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-white">Shop Now</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Shop EYRYA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Find EYRYA products on trusted online marketplaces.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {platform.logo}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        {platform.name}
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                      </h3>
                      
                      <p className="text-gray-400">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${platform.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 border-dashed p-8 text-center"
            >
              <p className="text-gray-400">
                More platforms coming soon. We are expanding to more online marketplaces.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
