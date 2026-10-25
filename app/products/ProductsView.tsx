import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';
import { AMAZON_FLAGSHIP_URL } from '@/lib/links';
import {
  BRAND,
  MARKETPLACES,
  formatOfferPrice,
  formatPrice,
  getAllProducts,
  getCategory,
  getPrimaryOffer,
} from '@/lib/products';

// Server component: the product grid is rendered into the static HTML rather than
// hydrated on the client.
//
// This used to accept an `activeCategory` prop and render category-filtered
// variants at /products/category/<slug>/. Those pages held a single product each
// and were among the URLs Search Console left at "Discovered - currently not
// indexed", so they were deleted rather than kept as five thin crawl targets.
export default function ProductsView() {
  const products = getAllProducts();
  const heading = 'All Products';

  return (
    <div className="pt-24 pb-20 bg-[#F4F1EA]">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'EYRYA Products',
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: `${BRAND.siteUrl}/products/${product.slug}/`,
        })),
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3 tracking-wide">
            {heading}
          </h1>
          <p className="text-gray-600">
            We make 18-inch EVA foam hands. Buy the retail pack from the marketplace listing, or read
            about <Link href="/wholesale/" className="text-[#DC2626] hover:underline">foam finger bulk
            orders</Link> if you need a custom run.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="font-['Teko'] text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-wide">
            Featured
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products in this category yet.</p>
              <Link href="/products/" className="text-[#DC2626] hover:underline">
                View all products
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const categoryName = getCategory(product.categorySlug)?.name ?? '';
                // Cards show the flagship listing's price and pack.
                const offer = getPrimaryOffer(product);
                return (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}/`}
                    className="group bg-white border border-gray-200 hover:border-[#1A1A1A] transition-colors"
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-5">
                      <span className="text-xs font-medium text-[#DC2626] uppercase tracking-wider">
                        {categoryName}
                      </span>

                      <h3 className="text-lg font-bold text-[#1A1A1A] mt-2 mb-2">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-[#1A1A1A]">
                            {formatOfferPrice(offer)}
                          </span>
                          {offer.originalPrice ? (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(offer.originalPrice)}
                            </span>
                          ) : null}
                        </div>
                        <span className="text-sm font-semibold text-[#DC2626] group-hover:gap-2 gap-1 transition-all inline-flex items-center">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-[#DC2626] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="font-['Teko'] text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Ready to buy?
            </h2>
            <p className="text-white/80 mb-8">
              Find EYRYA on Amazon and Temu. The same product, on your preferred marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={AMAZON_FLAGSHIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#DC2626] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-sm"
              >
                Shop Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={MARKETPLACES.temu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 font-semibold hover:bg-white/20 transition-colors rounded-sm"
              >
                Shop Temu
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Temu currently lists our flagship foam fingers as a 6-pack.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
