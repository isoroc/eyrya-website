import { Metadata } from 'next';
import { ExternalLink, ShoppingBag, Truck, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Where to Buy - EYRYA',
  description: 'Find EYRYA on Amazon and Temu. Fast shipping, easy returns.',
};

const AmazonLogoColor = () => (
  <svg viewBox="0 0 603 181" className="h-12 w-auto">
    <path fill="#FF9900" d="M270.4 140.9c-32.9 24.2-80.7 37.1-121.9 37.1-56.3 0-107-20.6-145.9-55.7-5.1-4.6-1-10.8 5.3-6.6 36.7 23.7 82.4 37.9 130.4 37.9 42.9 0 85.8-11.1 127.1-33.4 6.2-3.3 11.4 4.4 4.6 8.3-8.7 5-17.7 9.4-27 13.5v.7-.7l.2-.1zm-8.3-25.5c-33.9-2.8-63.9 20.5-80.6 20.5-16.7 0-42.6-19.1-70.2-18.6-36.1.6-69.5 20.9-87.8 52.4-18.9 31.9-16.8 62.9 13.3 88.4 15.6 13.4 34.1 22.4 52.7 22.4 22.3 0 45.5-10.4 63.6-29.2 19.7-20.4 30.1-48.1 28.7-75.9-.9-17.4-7.7-34.5-19.2-48.2-3.5-4.3-8.8-2.3-8.3 3.3 1.1 11.7 1.7 24.6-1.5 35.9-6.1 21.5-26.7 36.2-48.3 36.2-19.6 0-36.4-12.6-41.4-31.1-6.5-23.7 2.5-50.3 19.4-66.5 19.1-18.4 50.5-25.1 74.9-19.3 26.9 6.6 47.8 25.1 55.8 51.7 3.4 11.2 3.9 22.4 4.3 33.7.1 3.1 4.7 3.2 5.5.4 3.1-10.8 6.2-21.8 6.9-33.2 1.1-17.6-2.1-36.3-10.9-52.4-11.5-20.7-31.4-35.4-54.7-40.4-28.7-6.2-61.3-1.9-83.4 19.3-18.8 17.9-26.4 44.4-19.6 68.8 7.5 26.6 30.2 44.4 56.8 44.4 17.9 0 38.3-8.2 49.4-23.3 10.3-13.8 12.5-33.3 5.7-49.4-1.7-4.2-7.3-4.8-8.7-.8-11.3 32.6-52.3 41.3-78.3 19.1-18.5-15.9-23.3-44.1-10.5-65.4 14.1-23.5 45.3-34.9 73.2-34.9 19.1 0 41.4 6.2 57.6 16.6 18.3 12.1 31.2 29.8 34.6 51.4 4.7 29.3-5.2 61.3-28 81.5-15.8 13.9-36.4 21.5-56.9 21.5-20.3 0-42.7-7.6-57.4-21.8-14.5-14.2-20.3-33.9-16.4-53.3 1.1-5.4-6.2-7.7-9-2.8-20.2 36-15.5 85.7 21.4 111.4 19.5 13.5 43.4 19.1 66.7 19.1 33.3 0 65.2-11.9 92.2-33.1 4.6-3.6-.8-9.8-5.8-6.8z"/>
    <path fill="#221F1F" d="M542.2 0c-16.6 0-30.5 13.6-30.5 30.5s13.9 30.5 30.5 30.5 30.5-13.6 30.5-30.5S558.8 0 542.2 0zm0 49c-10.2 0-18.5-8.3-18.5-18.5S532 12 542.2 12s18.5 8.3 18.5 18.5-8.3 18.5-18.5 18.5zM469.7 39.6c-7.5-1.6-9.3-2.8-9.3-5.2 0-2.1 1.9-3.8 5.3-3.8 3.4 0 6.9 1.5 10.3 4.5.3.3.8.2.8-.2V22.6c0-.4-.3-.6-.7-.6h-12.8c-4.3 0-7.5 1.2-9.6 3.6-2 2.4-2.9 5.6-2.9 10 0 7.3 3.7 10.9 10.5 13.2 6.8 2.3 8.2 3.9 8.2 6.5s-2.4 4.3-6.4 4.3c-5.1 0-8.6-2.3-11.9-5.3-.4-.3-.8-.2-.8.2v10.9c0 .4.3.6.7.6h12.8c4.2 0 7.3-1.1 9.5-3.5 2.1-2.3 3.1-5.5 3.1-9.8 0-7.5-3.8-11.3-11.3-13.7zM417.2 23.3c-5.3 0-8.5 3.7-8.5 8.5 0 5.5 3.4 8.5 9.2 8.5h7.2c4.5 0 7.4-1.1 9.5-3.6 2-2.4 2.9-5.6 2.9-10 0-7.3-3.7-10.9-10.5-13.2-6.8-2.3-8.2-3.9-8.2-6.5s2.4-4.3 6.4-4.3c5.1 0 8.6 2.3 11.9 5.3.4.3.8.2.8-.2V5.8c0-.4-.3-.6-.7-.6h-12.8c-4.3 0-7.5 1.2-9.6 3.6-2 2.4-2.9 5.6-2.9 10 0 7.3 3.7 10.9 10.5 13.2 6.8 2.3 8.2 3.9 8.2 6.5s-2.4 4.3-6.4 4.3c-5.1 0-8.6-2.3-11.9-5.3-.4-.3-.8-.2-.8.2v10.9c0 .4.3.6.7.6h12.8c4.2 0 7.3-1.1 9.5-3.5 2.1-2.3 3.1-5.5 3.1-9.8 0-7.5-3.8-11.3-11.3-13.7-7.5-1.6-9.3-2.8-9.3-5.2 0-2.1 1.9-3.8 5.3-3.8 3.4 0 6.9 1.5 10.3 4.5.3.3.8.2.8-.2V22c0-.4-.3-.6-.7-.6h-12.8c-4.3 0-7.5 1.2-9.6 3.6-2 2.4-2.9 5.6-2.9 10 0 7.3 3.7 10.9 10.5 13.2 6.8 2.3 8.2 3.9 8.2 6.5s-2.4 4.3-6.4 4.3c-5.1 0-8.6-2.3-11.9-5.3-.4-.3-.8-.2-.8.2v10.9c0 .4.3.6.7.6h12.8c4.2 0 7.3-1.1 9.5-3.5 2.1-2.3 3.1-5.5 3.1-9.8 0-7.5-3.8-11.3-11.3-13.7z"/>
  </svg>
);

const TemuLogoColor = () => (
  <svg viewBox="0 0 200 60" className="h-12 w-auto">
    <text x="0" y="45" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="42" letterSpacing="-2" fill="#FF6B35">TEMU</text>
  </svg>
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
                <div className="w-14 h-14 bg-[#1a1a1a] flex items-center justify-center text-white text-2xl font-bold">
                  {platform.name.charAt(0)}
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
