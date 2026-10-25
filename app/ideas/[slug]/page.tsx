import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';
import { getProduct, type Product } from '@/lib/products';
import { POST_FALLBACK_IMAGE, POST_SLUGS, getPost, getPostCategory, getRelatedPosts } from '@/lib/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Every article is written by the EYRYA team, so the byline lives here rather
// than being repeated on every post in lib/posts.ts.
const AUTHOR = 'EYRYA Team';

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: true },
    };
  }

  const url = `https://www.eyrya.com/ideas/${slug}/`;
  const description = `Read our guide: ${post.title}. ${post.excerpt}`;
  const imageUrl = `https://www.eyrya.com${post.image}`;
  const category = getPostCategory(post.categorySlug);
  // Commas and colons inside a title would split it into bogus keywords.
  const titleKeyword = post.title.toLowerCase().replace(/[,:]/g, '');

  return {
    title: { absolute: `${post.title} | EYRYA` },
    description,
    keywords: `EYRYA, ${titleKeyword}, ${category?.name.toLowerCase() ?? 'ideas'}, party tips, sports event guide, foam fingers`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | EYRYA`,
      description,
      type: 'article',
      url,
      siteName: 'EYRYA',
      publishedTime: post.isoDate,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | EYRYA`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function IdeaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const category = getPostCategory(post.categorySlug);
  const relatedPosts = getRelatedPosts(slug);
  // Product names come from lib/products, so the two modules cannot disagree.
  const relatedProducts = (post.relatedProductSlugs ?? [])
    .map((productSlug) => getProduct(productSlug))
    .filter((product): product is Product => product !== undefined);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/ideas/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#DC2626] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ideas
        </Link>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#DC2626]/10 text-[#DC2626] text-sm font-medium mb-4">
            {category?.name}
          </span>

          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {AUTHOR}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>

            <span>{post.date}</span>
          </div>
        </div>

        {/* A lead image renders as soon as the post carries its own. Until the
            owner supplies photographs every post falls back to the shared OG
            image, which is right for social previews but not something to show
            a reader twice. */}
        {post.image !== POST_FALLBACK_IMAGE && (
          <img
            src={post.image}
            alt={post.imageAlt ?? post.title}
            className="w-full h-auto mb-8 border border-gray-200"
          />
        )}

        <article
          className="prose prose-lg max-w-none prose-headings:font-['Teko'] prose-headings:uppercase prose-headings:tracking-wide prose-h2:text-2xl prose-h2:font-bold prose-h2:text-[#1a1a1a] prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-[#DC2626] prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600 prose-strong:text-[#1a1a1a] prose-ul:my-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">Related Products</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}/`}
                  className="group p-4 bg-[#fafafa] border border-gray-200 hover:border-[#DC2626] transition-colors"
                >
                  <h4 className="font-semibold text-[#1a1a1a] group-hover:text-[#DC2626] transition-colors">
                    {product.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">You Might Also Like</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/ideas/${related.slug}/`}
                className="group p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-[#DC2626] transition-colors">
                  {related.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: [`https://www.eyrya.com${post.image}`],
          author: {
            '@type': 'Organization',
            name: AUTHOR,
            url: 'https://www.eyrya.com/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'EYRYA',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.eyrya.com/images/logo.svg',
            },
          },
          datePublished: post.isoDate,
          dateModified: post.isoDate,
          mainEntityOfPage: `https://www.eyrya.com/ideas/${slug}/`,
        }} />
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eyrya.com/' },
            { '@type': 'ListItem', position: 2, name: 'Ideas', item: 'https://www.eyrya.com/ideas/' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.eyrya.com/ideas/${slug}/` },
          ],
        }} />
      </div>
    </div>
  );
}
