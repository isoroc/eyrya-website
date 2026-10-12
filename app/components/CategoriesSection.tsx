import Link from 'next/link';
import { CATEGORIES, productCountForCategory } from '@/lib/products';

export default function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            We specialize in party supplies and fan gear. That&apos;s it. No random gadgets, no dropshipping junk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const count = productCountForCategory(category.slug);

            // No products yet: render a static tile instead of a link that
            // lands on an empty listing.
            if (count === 0) {
              return (
                <div key={category.slug} className="bg-white/60 border border-dashed border-gray-300 p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-500">{category.name}</h3>
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Coming soon
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 flex-grow">{category.description}</p>
                </div>
              );
            }

            return (
              <Link key={category.slug} href={`/products/category/${category.slug}/`}>
                <div className="group bg-white border border-gray-200 p-6 hover:border-[#DC2626] transition-colors h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#DC2626]">
                      {category.name}
                    </h3>
                    <span className="text-xs font-medium text-gray-500">
                      {count} {count === 1 ? 'product' : 'products'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-6 flex-grow">
                    {category.description}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-[#1a1a1a] group-hover:gap-3 gap-2 transition-all">
                    Browse
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
