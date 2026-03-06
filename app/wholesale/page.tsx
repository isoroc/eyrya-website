import { Metadata } from 'next';
import { Building2, Globe, Package, TrendingUp, Send, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wholesale \u0026 Business Inquiry - EYRYA',
  description: 'Interested in retail, distribution or business cooperation with EYRYA? Contact us for partnership opportunities.',
};

const benefits = [
  {
    icon: Package,
    title: 'Bulk Pricing',
    description: 'Competitive wholesale prices for bulk orders',
  },
  {
    icon: Globe,
    title: 'Global Distribution',
    description: 'We ship to retailers worldwide',
  },
  {
    icon: TrendingUp,
    title: 'Growing Brand',
    description: 'Join a fast-growing lifestyle brand',
  },
  {
    icon: Building2,
    title: 'B2B Support',
    description: 'Dedicated support for business partners',
  },
];

export default function WholesalePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wholesale \u0026 Business Inquiry
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interested in retail, distribution or business cooperation with EYRYA? Contact us for partnership opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Partner with EYRYA?</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <benefit.icon className="w-10 h-10 text-pink-500 mb-4" />
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Ideal Partners:</h3>
              
              <ul className="space-y-2">
                {[
                  'Retail stores and chains',
                  'Online marketplaces',
                  'Distributors and wholesalers',
                  'Event planning companies',
                  'Sports organizations',
                  'Corporate gift suppliers',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    placeholder="Your country"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                >
                  <option value="">Select business type</option>
                  <option value="retailer">Retailer</option>
                  <option value="distributor">Distributor</option>
                  <option value="online-marketplace">Online Marketplace</option>
                  <option value="event-company">Event Company</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
                  placeholder="Tell us about your business and how you'd like to partner with EYRYA..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
