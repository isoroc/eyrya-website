import { Metadata } from 'next';
import { Package, Globe, TrendingUp, Building2, Check } from 'lucide-react';
import WholesaleForm from './WholesaleForm';

export const metadata: Metadata = {
  title: 'EYRYA® Wholesale | Bulk Foam Fingers & Party Supplies Pricing',
  description: 'Wholesale pricing on EYRYA foam fingers and party supplies. 15-30% off retail for 50+ units. Schools, teams, retailers, event planners welcome.',
  keywords: 'EYRYA wholesale, bulk foam fingers, wholesale foam fingers, bulk party supplies, school spirit supplies, team merchandise',
  alternates: {
    canonical: 'https://www.eyrya.com/wholesale/',
  },
  openGraph: {
    title: 'EYRYA Wholesale - Bulk Foam Fingers & Party Supplies',
    description: 'Get 15-30% off retail on 50+ units of EYRYA foam fingers and party supplies.',
    type: 'website',
    url: 'https://www.eyrya.com/wholesale/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'EYRYA Wholesale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA Wholesale - Bulk Foam Fingers & Party Supplies',
    description: 'Get 15-30% off retail on 50+ units of EYRYA foam fingers and party supplies.',
    images: ['https://www.eyrya.com/images/og-image.svg'],
  },
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
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
            Wholesale
          </h1>
          <p className="text-gray-600">
            Bulk pricing for schools, teams, retailers, and event planners. 
            Minimum order: 50 units. Discounts up to 30%.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">Why buy wholesale?</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-[#fafafa] p-5">
                  <benefit.icon className="w-6 h-6 text-[#DC2626] mb-3" />
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
                    <Check className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <WholesaleForm />
        </div>
      </div>
    </div>
  );
}
