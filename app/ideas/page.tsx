import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - EYRYA',
  description: 'Tips, tricks, and real talk about party planning and sports events.',
};

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Parties', slug: 'party-ideas' },
  { name: 'Sports', slug: 'sports-events' },
  { name: 'Outdoor', slug: 'outdoor-activities' },
  { name: 'Wholesale', slug: 'wholesale' },
];

const ideas = [
  {
    title: 'The Ultimate Game Day Checklist',
    excerpt: 'Everything you need for the perfect tailgate. From foam fingers to face paint, coolers to portable chairs.',
    category: 'Sports',
    slug: 'game-day-checklist',
    date: 'Dec 15, 2024',
    readTime: '6 min',
  },
  {
    title: 'Why Our Foam Fingers Are Different',
    excerpt: 'Most foam fingers fall apart after one game. Heres how we fixed that problem.',
    category: 'Sports',
    slug: 'foam-finger-quality',
    date: 'Dec 12, 2024',
    readTime: '4 min',
  },
  {
    title: 'Party Supplies That Actually Last',
    excerpt: 'Why buy disposable decorations when you can get quality party supplies that work for multiple events?',
    category: 'Parties',
    slug: 'reusable-party-supplies',
    date: 'Dec 10, 2024',
    readTime: '5 min',
  },
  {
    title: 'Bulk Orders: What You Need to Know',
    excerpt: 'Ordering for a school or team? Heres how to get the best deal on 50+ units.',
    category: 'Wholesale',
    slug: 'bulk-order-guide',
    date: 'Dec 5, 2024',
    readTime: '7 min',
  },
  {
    title: 'Camping with Kids: A Survival Guide',
    excerpt: 'Real tips from parents who have actually taken their kids camping. What works, what doesnt.',
    category: 'Outdoor',
    slug: 'camping-with-kids',
    date: 'Dec 1, 2024',
    readTime: '8 min',
  },
  {
    title: 'The Problem with Cheap Party Decorations',
    excerpt: 'We tested 12 brands of party banners. Only 3 made it through a full birthday party.',
    category: 'Parties',
    slug: 'cheap-party-decorations',
    date: 'Nov 28, 2024',
    readTime: '6 min',
  },
];

export default function IdeasPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3">
            From the Blog
          </h1>
          <p className="text-gray-600">
            Tips, tricks, and real talk about party planning and sports events.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/ideas?category=${category.slug}`}
              className="px-4 py-2 text-sm font-medium border border-gray-200 hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Link
              key={idea.slug}
              href={`/ideas/${idea.slug}`}
              className="group border border-gray-200 p-6 hover:border-[#FF6B6B] transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
                  {idea.category}
                </span>
                <span className="text-xs text-gray-400">{idea.date}</span>
              </div>

              <h2 className="text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#FF6B6B] transition-colors">
                {idea.title}
              </h2>
              
              <p className="text-gray-600 mb-6 flex-grow">
                {idea.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{idea.readTime} read</span>
                <span className="text-sm font-semibold text-[#1a1a1a] group-hover:gap-2 gap-1 transition-all inline-flex items-center">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
