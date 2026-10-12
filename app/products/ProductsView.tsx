import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';
import { AMAZON_FLAGSHIP_URL } from '@/lib/links';
import {
  BRAND,
  CATEGORIES,
  MARKETPLACES,
  formatOfferPrice,
  formatPrice,
  getAllProducts,
  getCategory,
  getPrimaryOffer,
  getProductsByCategory,
  productCountForCategory,
  type Category,
} from '@/lib/products';

interface ProductsViewProps {
  /** When set, the grid is filtered to this category. */
  activeCategory?: Category;
}

// Server component: the product grid is rendered into the static HTML rather
// than hydrated on the client. Filtering is expressed as a real route
// (/products/category/<slug>/) so every view is crawlable.
export default function ProductsView({ activeCategory }: ProductsViewProps) {
  const allProducts = getAllProducts();
  const products = activeCategory ? getProductsByCategory(activeCategory.slug) : allProducts;
  const heading = activeCategory ? activeCategory.name : 'All Products';

  return (
    <div className="pt-24 pb-20 bg-[#F4F1EA]">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: activeCategory ? `${activeCategory.name} from EYRYA` : 'EYRYA Products',
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
            {activeCategory ? `${activeCategory.description} ` : ''}
            Party supplies, fan gear, and outdoor products. We only sell stuff we would use ourselves.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="font-['Teko'] text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-wide">
            Categories
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => {
              const count = productCountForCategory(category.slug);
              const isActive = activeCategory?.slug === category.slug;

              // A category with no products is shown as a plain tile: linking to
              // an empty listing is a dead end for users and for crawlers.
              if (count === 0) {
                return (
                  <div
                    key={category.slug}
                    className="bg-white/60 border border-dashed border-gray-300 p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-500">{category.name}</h3>
                      <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Coming soon
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                );
              }

              return (
                <Link
                  key={category.slug}
                  href={isActive ? '/products/' : `/products/category/${category.slug}/`}
                  className={`group bg-white border p-6 transition-colors ${
                    isActive
                      ? 'border-[#DC2626] bg-[#DC2626]/5'
                      : 'border-gray-200 hover:border-[#DC2626]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[#1A1A1A]">
                      {category.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#DC2626] transition-colors" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {count} {count === 1 ? 'product' : 'products'}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-['Teko'] text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-wide">
            {activeCategory ? activeCategory.name : 'Featured'}
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

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                      </div>

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
              Find EYRYA on Amazon and Temu. Same products, fast shipping.
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
