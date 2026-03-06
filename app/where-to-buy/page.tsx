import { Metadata } from 'next';
import { ExternalLink, ShoppingBag, Truck, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Where to Buy - EYRYA',
  description: 'Find EYRYA products on trusted online marketplaces like Amazon and Temu.',
};

const platforms = [
  {
    name: 'Amazon',
    description: 'Shop EYRYA products with convenient delivery and trusted service. Prime members enjoy free shipping.',
    url: 'https://amazon.com',
    color: 'from-orange-400 to-amber-500',
    bgColor: 'bg-orange-50',
    features: ['Fast Shipping', 'Prime Eligible', 'Easy Returns'],
    isActive: true,
  },
  {
    name: 'Temu',
    description: 'Discover EYRYA products and great deals on Temu. Competitive prices and worldwide shipping.',
    url: 'https://temu.com',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    features: ['Great Prices', 'Global Shipping', 'Flash Deals'],
    isActive: true,
  },
];

export default function WhereToBuyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Where to Buy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            EYRYA products are available through trusted online marketplaces and retail channels.
          </p>
        </div>

        {/* Platforms */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className={`${platform.bgColor} rounded-3xl p-8 h-full hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-2xl font-bold`}>
                    {platform.name.charAt(0)}
                  </div>
                  
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {platform.name}
                </h2>

                <p className="text-gray-600 mb-6">
                  {platform.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {platform.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-pink-600 font-semibold">
                  Shop Now
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-gray-50 rounded-3xl p-8 text-center mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-2">More Platforms Coming Soon</h3>
          <p className="text-gray-600">
            We are expanding to more online marketplaces to make EYRYA products even more accessible.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Shopping</h3>
            <p className="text-gray-600 text-sm">Shop with confidence on trusted platforms</p>
          </div>

          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Truck className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-gray-600 text-sm">Quick delivery to your doorstep</p>
          </div>

          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">Protected transactions on all platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
