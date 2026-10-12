'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ideas = [
  {
    title: 'Custom Foam Fingers: The Complete Guide for Schools, Teams & Events',
    slug: 'custom-foam-fingers-guide',
    excerpt: 'Everything you need to know about ordering custom foam fingers, from design and pricing to minimums and lead times.',
    category: 'Wholesale',
    date: 'Sep 18, 2026',
  },
  {
    title: 'The Ultimate Game Day Checklist',
    slug: 'game-day-checklist',
    excerpt: 'Everything you need for the perfect tailgate. From foam fingers to face paint, we have got you covered.',
    category: 'Sports',
    date: 'Aug 29, 2026',
  },
  {
    title: 'Why Our Foam Fingers Are Different',
    slug: 'foam-finger-quality',
    excerpt: 'Most foam fingers fall apart after one game. Here is how we built ours to last season after season.',
    category: 'Sports',
    date: 'Aug 7, 2026',
  },
];

export default function IdeasPreviewSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3">
              From the Blog
            </h2>
            <p className="text-gray-600">
              Tips, tricks, and real talk about party planning and sports events.
            </p>
          </div>

          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 text-[#1a1a1a] font-semibold hover:gap-3 transition-all mt-4 md:mt-0"
          >
            Read all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Link key={idea.title} href={`/ideas/${idea.slug}`}>
              <div className="group border border-gray-200 p-6 hover:border-[#DC2626] transition-colors h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                    {idea.category}
                  </span>
                  <span className="text-xs text-gray-400">{idea.date}</span>
                </div>

                <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 group-hover:text-[#DC2626] transition-colors">
                  {idea.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {idea.excerpt}
                </p>
                
                <span className="text-sm font-semibold text-[#1a1a1a] group-hover:gap-3 gap-2 transition-all inline-flex items-center">
                  Read more
                  <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
