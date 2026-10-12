import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import IdeasView from '../../IdeasView';
import { getPostCategory, getPopulatedPostCategories, getPostsByCategory } from '@/lib/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPopulatedPostCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getPostCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: true },
    };
  }

  const url = `https://www.eyrya.com/ideas/category/${category.slug}/`;
  const description = `${category.name} articles and guides from EYRYA. Tips, tricks, and real talk on party planning, game day, bulk ordering, and outdoor activities.`;

  return {
    title: category.name,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.name} | EYRYA`,
      description,
      type: 'website',
      url,
      siteName: 'EYRYA',
      images: [
        {
          url: 'https://www.eyrya.com/images/og-image.png',
          width: 1200,
          height: 630,
          alt: `${category.name} ideas from EYRYA`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | EYRYA`,
      description,
      images: ['https://www.eyrya.com/images/og-image.png'],
    },
  };
}

export default async function IdeaCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getPostCategory(slug);

  // A category with no posts must 404 rather than render an empty listing.
  if (!category || getPostsByCategory(category.slug).length === 0) {
    notFound();
  }

  return (
    <>
      <IdeasView activeCategory={category} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eyrya.com/' },
          { '@type': 'ListItem', position: 2, name: 'Ideas', item: 'https://www.eyrya.com/ideas/' },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `https://www.eyrya.com/ideas/category/${category.slug}/`,
          },
        ],
      }} />
    </>
  );
}
