import Link from 'next/link';
import {
  POST_CATEGORIES,
  getAllPosts,
  getPostCategory,
  getPostsByCategory,
  type PostCategory,
} from '@/lib/posts';

interface IdeasViewProps {
  /** When set, the grid is filtered to this category. */
  activeCategory?: PostCategory;
}

// Server component: the post grid is rendered into the static HTML rather than
// hydrated on the client. Filtering is expressed as a real route
// (/ideas/category/<slug>/) so every view is crawlable.
export default function IdeasView({ activeCategory }: IdeasViewProps) {
  const allPosts = getAllPosts();
  const posts = activeCategory ? getPostsByCategory(activeCategory.slug) : allPosts;
  const heading = activeCategory ? activeCategory.name : 'From the Blog';

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3">
            {heading}
          </h1>
          <p className="text-gray-600">
            Tips, tricks, and real talk about party planning and sports events.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/ideas/"
            className={`px-4 py-2 text-sm font-medium border transition-colors rounded-sm ${
              activeCategory
                ? 'border-gray-200 hover:border-[#DC2626] hover:bg-[#DC2626] hover:text-white'
                : 'border-[#DC2626] bg-[#DC2626] text-white'
            }`}
          >
            All
          </Link>
          {POST_CATEGORIES.map((category) => {
            const isActive = activeCategory?.slug === category.slug;

            // A category with no posts is shown as a plain chip: linking to an
            // empty listing is a dead end for users and for crawlers.
            if (getPostsByCategory(category.slug).length === 0) {
              return (
                <span
                  key={category.slug}
                  className="px-4 py-2 text-sm font-medium border border-dashed border-gray-300 text-gray-400 rounded-sm"
                >
                  {category.name} - Coming soon
                </span>
              );
            }

            return (
              <Link
                key={category.slug}
                href={isActive ? '/ideas/' : `/ideas/category/${category.slug}/`}
                className={`px-4 py-2 text-sm font-medium border transition-colors rounded-sm ${
                  isActive
                    ? 'border-[#DC2626] bg-[#DC2626] text-white'
                    : 'border-gray-200 hover:border-[#DC2626] hover:bg-[#DC2626] hover:text-white'
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/ideas/${post.slug}/`}
              className="group border border-gray-200 p-6 hover:border-[#DC2626] transition-colors flex flex-col rounded-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  {getPostCategory(post.categorySlug)?.name ?? ''}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>

              <h2 className="text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#DC2626] transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{post.readTime}</span>
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
