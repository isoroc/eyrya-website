import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice, getFeaturedProduct, getPrimaryOffer } from '@/lib/products';

// Server component: no state, no browser APIs, so nothing here needs to ship as
// client JavaScript.
//
// Every claim in this section is either a product fact the owner confirmed or a
// fact about the marketplaces they sell through. The previous copy ("Trusted by
// 50,000+ customers", "4.8/5 (328 reviews)", "Ships from US", "30-day returns")
// was invented placeholder text.
export default function HeroSection() {
  const product = getFeaturedProduct();
  const offer = getPrimaryOffer(product);

  return (
    <section className="relative w-full min-h-dvh flex items-center justify-start overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="inline-block text-sm font-semibold tracking-[0.2em] text-white/80 uppercase font-sans">
              {product.name}
            </span>
          </div>

          <h1 className="font-['Teko'] text-6xl sm:text-7xl lg:text-8xl font-bold text-white uppercase leading-[0.9] mb-6 tracking-wide">
            BRING THE
            <br />
            <span className="text-[#DC2626]">NOISE</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 font-sans font-medium mb-8 max-w-lg leading-relaxed">
            18-inch EVA foam hands. Sold as a {offer.packSize}-pack on {offer.name}.
          </p>

          <div className="mb-8 flex items-baseline gap-3">
            {offer.price !== null && (
              <span className="text-4xl sm:text-5xl font-bold text-white font-sans">
                {formatPrice(offer.price)}
              </span>
            )}
            <span className="bg-[#DC2626] text-white text-sm font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
              {offer.packSize} Pack
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-colors duration-200 rounded-sm"
            >
              SHOP ON {offer.name.toUpperCase()}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/products/"
              className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-gray-300 transition-colors duration-200 underline underline-offset-4"
            >
              VIEW THE PRODUCT
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <span>Sold on Amazon &amp; Temu</span>
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span>Amazon Prime 2-day shipping</span>
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span>A-to-Z Guarantee on Amazon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
