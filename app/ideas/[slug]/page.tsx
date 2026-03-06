import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Article - EYRYA Ideas',
  description: 'Read our latest ideas and inspiration for parties, sports events and outdoor fun.',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'best-foam-finger-ideas' },
    { slug: 'make-birthday-party-fun' },
    { slug: 'outdoor-activities-families' },
    { slug: 'party-supply-ideas' },
    { slug: 'sports-fan-gear-guide' },
    { slug: 'gifts-active-kids' },
    { slug: 'party-planning-tips' },
    { slug: 'sports-event-essentials' },
  ];
}

export default async function IdeaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // This would normally fetch from CMS
  const article = {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h2>Why This Matters</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Key Tips</h2>
      <ul>
        <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</li>
        <li>Nemo enim ipsam voluptatem quia voluptas sit aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem ipsum quia dolor</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
    `,
    category: 'Party Ideas',
    author: 'EYRYA Team',
    date: 'March 7, 2024',
    readTime: '5 min read',
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ideas
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-4">
            {article.category}
          </span>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
            
            <span>{article.date}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-8 flex items-center justify-center">
          <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Party Planning Tips for Beginners', slug: 'party-planning-tips' },
              { title: 'Sports Event Essentials', slug: 'sports-event-essentials' },
            ].map((related) => (
              <Link
                key={related.slug}
                href={`/ideas/${related.slug}`}
                className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                  {related.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
