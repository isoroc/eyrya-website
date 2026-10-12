import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ExternalLink, ChevronRight, Star } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';
import {
  BRAND,
  PRODUCT_SLUGS,
  discountPercent,
  formatCount,
  formatPrice,
  getProduct,
  getRelatedProducts,
} from '@/lib/products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: true },
    };
  }

  const url = `https://www.eyrya.com/products/${slug}/`;
  const description = `Shop the ${product.name} by EYRYA. ${product.tagline} Rated ${product.rating.toFixed(1)}/5 from ${product.reviews} reviews.`;

  return {
    title: { absolute: `EYRYA® ${product.name} | Premium Quality & Best Price` },
    description,
    keywords: `EYRYA ${product.name}, ${product.name.toLowerCase()} buy online, premium ${product.name.toLowerCase()}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | EYRYA`,
      description,
      type: 'website',
      url,
      siteName: 'EYRYA',
      images: [
        {
          url: `${BRAND.siteUrl}${product.image}`,
          width: 800,
          height: 800,
          alt: product.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | EYRYA`,
      description,
      images: [`${BRAND.siteUrl}${product.image}`],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  // Static export only generates the slugs in generateStaticParams, so this
  // guards against a params value that somehow reaches the renderer.
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug);
  const savings = discountPercent(product);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#1a1a1a]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products/" className="hover:text-[#1a1a1a]">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1a1a1a]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#fafafa] border border-gray-200 flex items-start justify-center min-h-[400px] lg:min-h-[500px]">
            <img
              src={product.image}
              alt={product.imageAlt}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div>
            <div className="inline-block px-3 py-1 bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wider mb-4">
              {product.badge}
            </div>

            <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-6">
              {product.tagline}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-[#1a1a1a]">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">({product.reviews} reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 text-sm font-medium">In Stock</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-[#1a1a1a]">{formatPrice(product.price)}</span>
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              {savings > 0 && (
                <span className="text-sm font-medium text-white bg-[#DC2626] px-2 py-1">
                  Save {savings}%
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {product.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    link.name === 'Amazon'
                      ? 'flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors rounded-sm'
                      : 'flex items-center justify-center gap-2 border border-gray-200 text-[#1a1a1a] px-8 py-4 font-semibold hover:border-[#1a1a1a] transition-colors rounded-sm'
                  }
                >
                  {link.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>

            {product.links.filter((link) => link.note).map((link) => (
              <p key={`${link.name}-note`} className="text-xs text-gray-500 mb-2">
                {link.note}
              </p>
            ))}

            <p className="text-sm text-gray-500 mb-8">
              {formatCount(product.sold)}+ sold. Free shipping on Amazon orders over ${BRAND.freeShippingThreshold}.
            </p>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-lg font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#fafafa] p-6">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-4 uppercase tracking-wider">Specifications</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-gray-400 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                    <dd className="font-medium text-[#1a1a1a]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}/`}
                  className="group p-5 bg-[#fafafa] border border-gray-200 hover:border-[#DC2626] transition-colors"
                >
                  <h3 className="font-semibold text-[#1a1a1a] group-hover:text-[#DC2626] transition-colors">
                    {related.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-8">FAQ</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {product.faq.map((item) => (
              <div key={item.question} className="bg-[#fafafa] p-6">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-white mb-4">Need more than one?</h2>
            <p className="text-gray-400 mb-6">
              Ordering for a team or event? Get wholesale pricing on 50+ units.
            </p>
            <Link
              href="/wholesale/"
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-sm"
            >
              View wholesale options
            </Link>
          </div>
        </div>

        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          sku: product.slug,
          mpn: product.slug,
          image: [`${BRAND.siteUrl}${product.image}`],
          brand: {
            '@type': 'Brand',
            name: BRAND.name,
          },
          category: product.categorySlug,
          // One Offer per marketplace we actually list on. Every offer carries
          // the real price, so the markup can never advertise a price no
          // listing shows.
          offers: product.links.map((link) => ({
            '@type': 'Offer',
            price: product.price.toFixed(2),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: link.url,
            seller: {
              '@type': 'Organization',
              name: link.name,
            },
          })),
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toFixed(1),
            reviewCount: product.reviews,
            bestRating: '5',
            worstRating: '1',
          },
        }} />

        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: product.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }} />

        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BRAND.siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Products', item: `${BRAND.siteUrl}/products/` },
            {
              '@type': 'ListItem',
              position: 3,
              name: product.name,
              item: `${BRAND.siteUrl}/products/${slug}/`,
            },
          ],
        }} />
      </div>
    </div>
  );
}
