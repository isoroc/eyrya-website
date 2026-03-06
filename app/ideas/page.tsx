import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ideas & Inspiration - EYRYA',
  description: 'Explore ideas, tips and inspiration for parties, sports events and outdoor fun.',
};

const categories = [
  { name: 'Party Ideas', slug: 'party-ideas', color: 'bg-pink-100 text-pink-700' },
  { name: 'Sports Events', slug: 'sports-events', color: 'bg-orange-100 text-orange-700' },
  { name: 'Outdoor Activities', slug: 'outdoor-activities', color: 'bg-green-100 text-green-700' },
  { name: 'Gift Guides', slug: 'gift-guides', color: 'bg-purple-100 text-purple-700' },
];

const ideas = [
  {
    title: 'Best Foam Finger Ideas for Sports Events',
    excerpt: 'Discover creative ways to use foam fingers at sports events, from team spirit to fan engagement activities.',
    category: 'Sports Events',
    slug: 'best-foam-finger-ideas',
    readTime: '5 min read',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'How to Make a Birthday Party More Fun',
    excerpt: 'Essential tips and product ideas to create unforgettable birthday celebrations for kids and adults.',
    category: 'Party Ideas',
    slug: 'make-birthday-party-fun',
    readTime: '6 min read',
    color: 'bg-pink-100 text-pink-700',
  },
  {
    title: 'Outdoor Activity Ideas for Families',
    excerpt: 'Fun outdoor games and activities that bring families together for quality time and adventure.',
    category: 'Outdoor Activities',
    slug: 'outdoor-activities-families',
    readTime: '7 min read',
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Party Supply Ideas for Group Celebrations',
    excerpt: 'Complete guide to party supplies that will make your group celebrations memorable and exciting.',
    category: 'Party Ideas',
    slug: 'party-supply-ideas',
    readTime: '5 min read',
    color: 'bg-pink-100 text-pink-700',
  },
  {
    title: 'Sports Fan Gear Guide 2024',
    excerpt: 'Everything you need to know about choosing the best fan gear for game day.',
    category: 'Sports Events',
    slug: 'sports-fan-gear-guide',
    readTime: '8 min read',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Best Gifts for Active Kids',
    excerpt: 'Gift ideas that encourage outdoor play and active lifestyles for children.',
    category: 'Gift Guides',
    slug: 'gifts-active-kids',
    readTime: '4 min read',
    color: 'bg-purple-100 text-purple-700',
  },
];

export default function IdeasPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ideas \u0026 Inspiration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore ideas, tips and inspiration for parties, sports events and outdoor fun.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/ideas?category=${category.slug}`}
              className={`px-6 py-2 rounded-full text-sm font-medium ${category.color} hover:opacity-80 transition-opacity`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Link
              key={idea.slug}
              href={`/ideas/${idea.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${idea.color}`}>
                    {idea.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {idea.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {idea.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {idea.readTime}
                  </div>
                  
                  <span className="text-pink-600 font-medium flex items-center gap-1">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
