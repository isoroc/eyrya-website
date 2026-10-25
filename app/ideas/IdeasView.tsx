import Link from 'next/link';
import { getAllPosts, getPostCategory } from '@/lib/posts';

// Server component: the post grid is rendered into the static HTML rather than
// hydrated on the client.
//
// The per-category filter chips used to link to /ideas/category/<slug>/, which
// rendered the same seven articles under a different heading. Four thin
// duplicates were not worth the crawl budget, so those routes are gone and this
// lists everything.
export default function IdeasView() {
  const posts = getAllPosts();
  const heading = 'From the Blog';

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
