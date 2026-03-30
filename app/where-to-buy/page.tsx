import { Metadata } from 'next';
import { ExternalLink, ShoppingBag, Truck, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EYRYA® Where to Buy | Shop on Amazon & Temu',
  description: 'Buy EYRYA products on Amazon (Prime shipping) or Temu (best prices). Official stores with A-to-Z Guarantee.',
  keywords: 'buy EYRYA, EYRYA Amazon, EYRYA Temu, foam fingers online, party supplies Amazon',
  alternates: {
    canonical: 'https://www.eyrya.com/where-to-buy/',
  },
};

const AmazonLogo = () => (
  <div className="h-12 w-auto [&>img]:brightness-0 [&>img]:invert">
    <img src="/Amazon_logo.svg" alt="Amazon" className="h-full w-auto" />
  </div>
);

const TemuLogo = () => (
  <div className="h-10 w-auto [&>img]:brightness-0 [&>img]:invert">
    <img src="/Temu_logo.svg" alt="Temu" className="h-full w-auto" />
  </div>
);

const platforms = [
  {
    name: 'Amazon',
    description: 'Official Amazon Store. Prime fast shipping. 4.6/5 stars.',
    url: 'https://www.amazon.com/shops/eyrya',
    features: ['Free Prime shipping', 'Easy returns', 'A-to-Z Guarantee'],
  },
  {
    name: 'Temu',
    description: 'Official Temu Store. Budget-friendly. Exclusive discounts.',
    url: 'https://www.temu.com/ca/set-of-6-oversized-foam-fingers-measuring-18-inches-46-cm----events-parties-concerts-and-celebrations-offered-in--colors-g-605652411892197.html',
    features: ['Best prices', 'Worldwide shipping', 'Flash deals'],
  },
];

export default function WhereToBuyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
            Where to Buy
          </h1>
          <p className="text-gray-600">
            Find EYRYA on trusted marketplaces. Same products, your preferred platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-gray-200 p-8 hover:border-[#1a1a1a] transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  {platform.name === 'Amazon' ? <AmazonLogo /> : <TemuLogo />}
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
          ))}
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
              <p className="text-gray-600 text-sm">Most orders ship within 24 hours. Prime members get free 2-day shipping.</p>
            </div>

            <div>
              <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Protected purchases</h3>
              <p className="text-gray-600 text-sm">Full refund guarantee on both platforms. No questions asked returns.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-white mb-4">Bulk orders?</h2>
            <p className="text-gray-400 mb-6">
              Need 50+ units? Get wholesale pricing direct from us.
            </p>
            <a 
              href="/wholesale"
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-sm"
            >
              View wholesale options
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
