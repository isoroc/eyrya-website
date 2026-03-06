'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

const ideas = [
  {
    title: 'Best Party Accessories for Kids Events',
    excerpt: 'Discover the essential party accessories that will make any kids celebration unforgettable.',
    category: 'Party Ideas',
    readTime: '5 min read',
    color: 'bg-pink-100 text-pink-700',
  },
  {
    title: 'How Foam Fingers Make Sports Events More Fun',
    excerpt: 'Learn why foam fingers are the ultimate cheering accessory for sports fans.',
    category: 'Sports Event Ideas',
    readTime: '4 min read',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Outdoor Activity Ideas for Families',
    excerpt: 'Fun outdoor activities and products for quality family time together.',
    category: 'Outdoor Activities',
    readTime: '6 min read',
    color: 'bg-green-100 text-green-700',
  },
];

export default function IdeasPreviewSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Ideas \u0026 Inspiration
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-xl"
            >
              Explore ideas, tips and inspiration for parties, sports events and outdoor fun.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/ideas"
              className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors mt-4 md:mt-0"
            >
              View All Ideas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/ideas/${idea.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${idea.color}`}>
                        {idea.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {idea.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {idea.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {idea.readTime}
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
