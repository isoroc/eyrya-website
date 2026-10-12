import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ExternalLink, ChevronRight } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';
import {
  BRAND,
  PRODUCT_SLUGS,
  discountPercent,
  formatOfferPrice,
  formatPackSize,
  formatPrice,
  getPrimaryOffer,
  getProduct,
  getRelatedProducts,
  type MarketplaceOffer,
} from '@/lib/products';
import { formatMinimumOrderPerColor } from '@/lib/wholesale';

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
  const description = `Shop the ${product.name} by EYRYA. ${product.tagline}`;

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
  const primaryOffer = getPrimaryOffer(product);

  // "12-pack on Amazon · 6-pack on Temu" - derived so it cannot drift from the
  // offer data above.
  const packSummary = product.offers
    .map((offer) => `${formatPackSize(offer.packSize)} on ${offer.name}`)
    .join(' · ');

  // Only listings with a known price go into structured data, so the markup never
  // advertises a number that no listing shows.
  const pricedOffers = product.offers.filter(
    (offer): offer is MarketplaceOffer & { price: number } => offer.price !== null,
  );

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

            <div className="flex items-baseline gap-3 mb-2">
              {primaryOffer.price !== null && (
                <span className="text-3xl font-bold text-[#1a1a1a]">
                  {formatPrice(primaryOffer.price)}
                </span>
              )}
              {primaryOffer.originalPrice ? (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(primaryOffer.originalPrice)}
                </span>
              ) : null}
              {savings > 0 && (
                <span className="text-sm font-medium text-white bg-[#DC2626] px-2 py-1">
                  Save {savings}%
                </span>
              )}
            </div>

            {/* Amazon and Temu carry different pack sizes, so say which listing
                each price belongs to instead of showing one price next to both. */}
            <p className="text-sm text-gray-500 mb-8">{packSummary}</p>

            <div className="space-y-3 mb-8">
              {product.offers.map((offer) => (
                <div
                  key={offer.name}
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 border border-gray-200 bg-[#fafafa] p-4"
                >
                  <span className="w-20 font-semibold text-[#1a1a1a]">{offer.name}</span>
                  <span className="text-sm text-gray-600">{formatPackSize(offer.packSize)}</span>
                  <span className="text-sm font-medium text-[#1a1a1a]">{formatOfferPrice(offer)}</span>
                  <a
                    href={offer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 font-semibold hover:bg-[#333] transition-colors rounded-sm"
                  >
                    {offer.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {offer.note ? (
                    <p className="w-full text-xs text-gray-500">{offer.note}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mb-8">
              Sold and shipped by the marketplace you buy from, so their delivery options and buyer
              protection apply.
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
                {/* "How many do I get" differs per marketplace and is the question
                    buyers ask first, so it leads the table and stays derived. */}
                <div>
                  <dt className="text-gray-400 mb-1">Pack</dt>
                  <dd className="font-medium text-[#1a1a1a]">{packSummary}</dd>
                </div>
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
              Need a custom production run? The minimum is {formatMinimumOrderPerColor()}.
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
          // One Offer per listing whose price we actually know, named with its
          // pack size so the 12-pack and the 6-pack stay distinguishable.
          offers: pricedOffers.map((offer) => ({
            '@type': 'Offer',
            name: `${product.name} - ${formatPackSize(offer.packSize)} on ${offer.name}`,
            // The marketplace's own id (an Amazon ASIN) when we know it, so the
            // markup carries a real listing identifier rather than only our slug.
            ...(offer.sku ? { sku: offer.sku } : {}),
            price: offer.price.toFixed(2),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: offer.url,
            seller: {
              '@type': 'Organization',
              name: offer.name,
            },
          })),
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
