import { Metadata } from 'next';
import { BRAND, formatCount } from '@/lib/products';

export const metadata: Metadata = {
  title: { absolute: 'About EYRYA® | Premium Foam Fingers & Party Supplies Brand' },
  description: `EYRYA makes premium EVA foam fingers and party supplies that actually last. Over ${formatCount(BRAND.productsSold)} products sold across ${BRAND.countriesShipped}+ countries. No gimmicks, no dropshipping.`,
  keywords: 'EYRYA about, EYRYA brand, foam finger company, party supplies brand, EVA foam finger manufacturer',
  alternates: {
    canonical: 'https://www.eyrya.com/about/',
  },
  openGraph: {
    title: 'About EYRYA - Premium Foam Fingers Brand',
    description: `EYRYA makes premium EVA foam fingers and party supplies. ${formatCount(BRAND.productsSold)}+ sold across ${BRAND.countriesShipped}+ countries.`,
    type: 'website',
    url: 'https://www.eyrya.com/about/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About EYRYA - Premium Foam Fingers Brand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EYRYA - Premium Foam Fingers Brand',
    description: `EYRYA makes premium EVA foam fingers and party supplies. ${formatCount(BRAND.productsSold)}+ sold.`,
    images: ['https://www.eyrya.com/images/og-image.png'],
  },
};

const stats = [
  { value: `${Math.round(BRAND.productsSold / 1000)}K+`, label: 'Products sold', accent: true },
  { value: BRAND.rating.toFixed(1), label: 'Average rating', accent: true },
  { value: `${BRAND.countriesShipped}+`, label: 'Countries shipped', accent: true },
  { value: '24h', label: 'Avg. response time', accent: false },
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
            We make party supplies and fan gear that actually work. No gimmicks, no dropshipping junk, 
            no products that fall apart after one use.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Started in 2022, we have sold over {formatCount(BRAND.productsSold)} foam fingers and party
            supplies to customers in {BRAND.countriesShipped}+ countries. Our products show up at
            tailgates, birthday parties, school events, and family camping trips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#fafafa] p-8">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">What we do</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Design products that solve real problems</li>
              <li>• Test everything before it goes to market</li>
              <li>• Sell directly and through trusted retailers</li>
              <li>• Run custom production for brands, distributors, and event organisers</li>
            </ul>
          </div>

          <div className="bg-[#fafafa] p-8">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">What we don&apos;t do</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Sell products we wouldn&apos;t use ourselves</li>
              <li>• Make vague marketing claims</li>
              <li>• Hide behind complicated return policies</li>
              <li>• Spam you with emails</li>
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
              We read every email. Usually reply within 24 hours.
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
