import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import ProductsView from '../../ProductsView';
import { BRAND, getCategory, getPopulatedCategories, getProductsByCategory } from '@/lib/products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPopulatedCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: true },
    };
  }

  const url = `${BRAND.siteUrl}/products/category/${category.slug}/`;
  const description = `${category.description} Browse ${category.name.toLowerCase()} from EYRYA. Free shipping on qualifying Amazon orders.`;

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
          url: `${BRAND.siteUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${category.name} from EYRYA`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | EYRYA`,
      description,
      images: [`${BRAND.siteUrl}/images/og-image.png`],
    },
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  // A category with no products must 404 rather than render an empty listing.
  if (!category || getProductsByCategory(category.slug).length === 0) {
    notFound();
  }

  return (
    <>
      <ProductsView activeCategory={category} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BRAND.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${BRAND.siteUrl}/products/` },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `${BRAND.siteUrl}/products/category/${category.slug}/`,
          },
        ],
      }} />
    </>
  );
}
