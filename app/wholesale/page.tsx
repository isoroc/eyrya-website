import { Metadata } from 'next';
import { Package, Globe, TrendingUp, Building2, Send, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wholesale - EYRYA',
  description: 'Bulk pricing for schools, teams, and retailers. 50+ units.',
};

const benefits = [
  {
    icon: Package,
    title: 'Bulk Pricing',
    description: '15-30% off retail on 50+ units',
  },
  {
    icon: Globe,
    title: 'Global Shipping',
    description: 'We ship wholesale worldwide',
  },
  {
    icon: TrendingUp,
    title: 'Low MOQ',
    description: 'Minimum order: 50 units per SKU',
  },
  {
    icon: Building2,
    title: 'Dedicated Support',
    description: 'Direct line to our team',
  },
];

export default function WholesalePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Wholesale
          </h1>
          <p className="text-gray-600">
            Bulk pricing for schools, teams, retailers, and event planners. 
            Minimum order: 50 units. Discounts up to 30%.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Why buy wholesale?</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-[#fafafa] p-5">
                  <benefit.icon className="w-6 h-6 text-[#FF6B6B] mb-3" />
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 p-6">
              <h3 className="font-semibold text-[#1a1a1a] mb-4">Who we work with</h3>
              
              <ul className="space-y-2 text-gray-600">
                {[
                  'Schools and universities',
                  'Sports teams and leagues',
                  'Event planning companies',
                  'Retail stores and chains',
                  'Corporate gift suppliers',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4ECDC4] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Get a quote</h2>
            
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Quantity needed *
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="50-100">50-100 units</option>
                    <option value="100-500">100-500 units</option>
                    <option value="500+">500+ units</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Business type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select...</option>
                  <option value="retailer">Retailer / Store</option>
                  <option value="school">School / University</option>
                  <option value="sports">Sports Team / League</option>
                  <option value="event">Event Planning</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us what you are looking for..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors"
              >
                <Send className="w-5 h-5" />
                Request Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
