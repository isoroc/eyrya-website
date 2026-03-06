'use client';

import { motion } from 'framer-motion';
import { PartyPopper, ToyBrick, Trophy, Tent } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Party Supplies',
    description: 'Fun accessories that make celebrations more exciting.',
    icon: PartyPopper,
    color: 'from-pink-500 to-rose-400',
    bgColor: 'bg-pink-50',
    href: '/products?category=party-supplies',
  },
  {
    name: 'Toys \u0026 Play',
    description: 'Creative products for kids, families and joyful play.',
    icon: ToyBrick,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-50',
    href: '/products?category=toys-play',
  },
  {
    name: 'Sports Fan Gear',
    description: 'Cheer louder and stand out at every event.',
    icon: Trophy,
    color: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-50',
    href: '/products?category=sports-fan-gear',
  },
  {
    name: 'Outdoor Fun',
    description: 'Products made for active moments and family adventures.',
    icon: Tent,
    color: 'from-green-500 to-emerald-400',
    bgColor: 'bg-green-50',
    href: '/products?category=outdoor-fun',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Our Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From party supplies and fan gear to outdoor fun products, EYRYA is designed to bring more energy, creativity and excitement to everyday moments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`} />
                  
                  <div className={`p-8 ${category.bgColor} rounded-2xl h-full`}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-pink-500 transition-colors">
                      Explore 
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
