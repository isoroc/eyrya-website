import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, ShoppingBag, Truck, Shield } from 'lucide-react';
import { MARKETPLACES } from '@/lib/products';
import { formatMinimumOrderPerColor } from '@/lib/wholesale';

export const metadata: Metadata = {
  title: { absolute: 'Where to Buy EYRYA® | Shop Foam Fingers on Amazon & Temu' },
  description:
    'Buy EYRYA 18-inch EVA foam fingers on Amazon, with Prime shipping and the A-to-Z Guarantee, or on Temu as a 6-pack.',
  keywords:
    'buy EYRYA, EYRYA Amazon, EYRYA Temu, buy foam fingers online, foam fingers Amazon, EVA foam finger store',
  alternates: {
    canonical: 'https://www.eyrya.com/where-to-buy/',
  },
  openGraph: {
    title: 'Where to Buy EYRYA - Amazon & Temu',
    description:
      'Buy EYRYA EVA foam fingers on Amazon or Temu. Same product, your preferred marketplace.',
    type: 'website',
    url: 'https://www.eyrya.com/where-to-buy/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Where to Buy EYRYA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where to Buy EYRYA - Amazon & Temu',
    description: 'Buy EYRYA EVA foam fingers on Amazon or Temu.',
    images: ['https://www.eyrya.com/images/og-image.png'],
  },
};

const platformLogos: Record<string, { src: string; alt: string; height: string }> = {
  Amazon: { src: '/images/Amazon_logo.svg', alt: 'Amazon', height: 'h-8' },
  Temu: { src: '/images/Temu_logo.svg', alt: 'Temu', height: 'h-6' },
};

const platforms = [MARKETPLACES.amazon, MARKETPLACES.temu];

export default function WhereToBuyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
            Where to Buy
          </h1>
          <p className="text-gray-600">
            Find EYRYA on trusted marketplaces. The same product, on your preferred platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {platforms.map((platform) => {
            const logo = platformLogos[platform.name];
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-gray-200 p-8 hover:border-[#1a1a1a] transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  {/* No colour filter here: this page sits on the light #F4F1EA
                      background, so the logos keep their real brand colours. The
                      white-out filter belongs to the dark home-page section
                      (app/components/WhereToBuySection.tsx). */}
                  <div className={logo.height}>
                    <img src={logo.src} alt={logo.alt} className="h-full w-auto" />
                  </div>

                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#1a1a1a] transition-colors" />
                </div>

                <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
                  {platform.name}
                </h2>

                <p className="text-gray-600 mb-6">
                  {platform.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {platform.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 border border-[#DC2626] text-[#DC2626] text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-[#1a1a1a] font-semibold">
                  Shop Now
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-8">Why buy from these platforms?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <ShoppingBag className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Trusted platforms</h3>
              <p className="text-gray-600 text-sm">Shop with confidence on marketplaces you already use.</p>
            </div>

            <div>
              <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Fast shipping</h3>
              <p className="text-gray-600 text-sm">
                Delivery is the marketplace&apos;s: Amazon Prime members get Amazon&apos;s 2-day
                service, and Temu shows its own estimate on the listing. Free-shipping thresholds are
                set by the marketplace and shown at checkout.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Protected purchases</h3>
              <p className="text-gray-600 text-sm">
                Returns and refunds follow the marketplace&apos;s policy. If something arrives
                defective, email us and we will sort it out.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-white mb-4">Bulk orders?</h2>
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
      </div>
    </div>
  );
}
