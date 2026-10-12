import { BRAND, formatCount, getFeaturedProduct } from '@/lib/products';
import { WHOLESALE } from '@/lib/wholesale';

const scenarios = [
  {
    title: 'Sports Events',
    description: 'The original foam finger. 18 inches of pure team spirit, built to last season after season.',
    stat: `${getFeaturedProduct().rating.toFixed(1)}/5 rating`,
  },
  {
    title: 'Birthday Parties',
    description: 'Party supplies that don\u2019t look like you grabbed them at a gas station. Coordinated sets that actually match.',
    stat: 'Ships in 24 hours',
  },
  {
    title: 'School Events',
    description: 'Custom production runs for pep rallies, graduations, and brand giveaways.',
    stat: `Custom from ${formatCount(WHOLESALE.minimumOrderPerColor)}`,
  },
  {
    title: 'Family Camping',
    description: 'Outdoor gear that fits in your car. No assembly required. Just unpack and enjoy.',
    stat: '30-day returns',
  },
];

export default function UseScenariosSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-3">
            What People Use Them For
          </h2>
          <p className="text-gray-600">
            Real products for real situations. Here&apos;s what our {formatCount(BRAND.productsSold)}+ customers
            actually do with EYRYA gear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <div
              key={scenario.title}
              className="bg-white border border-gray-200 p-6 lg:p-8"
            >
              <div className="flex items-start justify-between mb-4 gap-3">
                <h3 className="text-xl font-bold text-[#1a1a1a]">
                  {scenario.title}
                </h3>
                <span className="text-xs font-bold px-2 py-1 bg-[#DC2626] text-white whitespace-nowrap">
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
