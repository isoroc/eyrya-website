'use client';

const scenarios = [
  {
    title: 'Sports Events',
    description: 'The original foam finger. 18 inches of pure team spirit. Over 50,000 sold to fans across the country.',
    color: '#FF6B6B',
    stat: '4.8/5 rating',
  },
  {
    title: 'Birthday Parties',
    description: 'Party supplies that dont look like you grabbed them at a gas station. Coordinated sets that actually match.',
    color: '#4ECDC4',
    stat: 'Same-day shipping',
  },
  {
    title: 'School Events',
    description: 'Bulk orders for pep rallies, field days, and fundraisers. Discounts on 50+ units.',
    color: '#FFE66D',
    stat: '15% off 50+',
  },
  {
    title: 'Family Camping',
    description: 'Outdoor gear that fits in your car. No assembly required. Just unpack and enjoy.',
    color: '#1a1a1a',
    stat: 'Free returns',
  },
];

export default function UseScenariosSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">
            What People Use Them For
          </h2>
          <p className="text-gray-600">
            Real products for real situations. Here's what our customers actually do with EYRYA gear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.title}
              className="bg-white border border-gray-200 p-6 lg:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#1a1a1a]">
                  {scenario.title}
                </h3>
                <span 
                  className="text-xs font-bold px-2 py-1"
                  style={{ 
                    backgroundColor: scenario.color === '#1a1a1a' ? '#f3f3f3' : scenario.color + '20',
                    color: scenario.color
                  }}
                >
                  {scenario.stat}
                </span>
              </div>
              
              <p className="text-gray-600">
                {scenario.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
