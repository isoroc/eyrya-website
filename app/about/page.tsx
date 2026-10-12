import { Metadata } from 'next';
import { BRAND, formatCount, MARKETPLACES } from '@/lib/products';
import { WHOLESALE, formatMinimumOrderPerColor, formatWholesaleSize } from '@/lib/wholesale';

// This page used to carry an invented history and invented statistics: "Started
// in 2022", "50,000+ products sold", "20+ countries", a 4.7 average rating and a
// 24-hour response time. None of it was real, so all of it is gone. What is left
// is the manufacturing capability the owner confirmed, plus the two retail
// listings that actually exist.
export const metadata: Metadata = {
  title: { absolute: 'About EYRYA® | Custom EVA Foam Finger Manufacturing' },
  description: `EYRYA makes ${formatWholesaleSize()} EVA foam hands. Custom production from ${formatMinimumOrderPerColor()}: thickness and colours made to order, logos by silk-screen printing. Retail packs ship from Amazon and Temu.`,
  keywords:
    'EYRYA about, EVA foam finger manufacturer, custom foam finger supplier, foam hand manufacturer, promotional foam fingers',
  alternates: {
    canonical: `${BRAND.siteUrl}/about/`,
  },
  openGraph: {
    title: 'About EYRYA - Custom EVA Foam Finger Manufacturing',
    description: `We make ${formatWholesaleSize()} EVA foam hands to order from ${formatMinimumOrderPerColor()}.`,
    type: 'website',
    url: `${BRAND.siteUrl}/about/`,
    siteName: 'EYRYA',
    images: [
      {
        url: `${BRAND.siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'About EYRYA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EYRYA - Custom EVA Foam Finger Manufacturing',
    description: `We make ${formatWholesaleSize()} EVA foam hands to order from ${formatMinimumOrderPerColor()}.`,
    images: [`${BRAND.siteUrl}/images/og-image.png`],
  },
};

// Every figure here is a confirmed production fact rather than a marketing
// statistic.
const stats = [
  { value: `${WHOLESALE.sizeInches} in`, label: 'Foam hand size', accent: true },
  { value: String(5), label: 'Retail colours', accent: true },
  { value: formatCount(WHOLESALE.minimumOrderPerColor), label: 'Pieces per colour, custom', accent: true },
  { value: `${WHOLESALE.leadTimeWeeks} weeks`, label: 'Production lead time', accent: false },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">
            About EYRYA
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We make {formatWholesaleSize()} EVA foam hands. On a custom run you choose the thickness,
            the colours, and the print, and we produce from {formatMinimumOrderPerColor()} with a lead
            time of about {WHOLESALE.leadTimeWeeks} weeks.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Alongside that we sell a retail 12-pack on{' '}
            <a href={MARKETPLACES.amazon.url} target="_blank" rel="noopener noreferrer" className="text-[#DC2626] hover:underline">
              Amazon
            </a>{' '}
            and a 6-pack on{' '}
            <a href={MARKETPLACES.temu.url} target="_blank" rel="noopener noreferrer" className="text-[#DC2626] hover:underline">
              Temu
            </a>{' '}
            for anyone who needs a handful rather than a container.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#fafafa] p-8">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">What we do</h2>
            <ul className="space-y-3 text-gray-600">
              {WHOLESALE.customisation.map((item) => (
                <li key={item}>• {item}</li>
              ))}
              <li>• {WHOLESALE.packing[0]}, with individual OPP bagging on request</li>
              <li>• {WHOLESALE.shipping}</li>
            </ul>
          </div>

          <div className="bg-[#fafafa] p-8">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">What we don&apos;t do</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Publish numbers we cannot evidence</li>
              <li>• Quote a price before we know the quantity and the printing</li>
              <li>• Take an order we cannot produce to the specification you asked for</li>
              <li>• Hide the minimum order behind a sales conversation</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-8">By the numbers</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className={`text-3xl md:text-4xl font-bold mb-1 ${
                    stat.accent ? 'text-[#DC2626]' : 'text-[#1a1a1a]'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-white mb-4">Questions?</h2>
            <p className="text-gray-400 mb-6">
              Tell us the quantity per colour, the colours, the thickness, and where it ships, and we
              will come back with a quote.
            </p>
            <a
              href="mailto:support@eyrya.com"
              className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-6 py-3 font-semibold hover:bg-red-700 transition-colors rounded-sm"
            >
              support@eyrya.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
