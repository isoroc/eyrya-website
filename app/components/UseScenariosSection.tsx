import { formatCount } from '@/lib/products';
import { WHOLESALE } from '@/lib/wholesale';

// The statistic chips used to read "4.8/5 rating", "Ships in 24 hours",
// "15-30% off 50+" and "30-day returns" - all invented. They now state either
// product facts or the wholesale terms the owner confirmed.
const scenarios = [
  {
    title: 'Sports Events',
    description:
      'An 18-inch EVA foam hand, light enough to hold for a whole match and reusable for the next one.',
    stat: '18-inch EVA',
  },
  {
    title: 'Pep Rallies & Schools',
    description:
      'Order the retail 12-pack for a section, or talk to us about a custom run in your school colours.',
    stat: '5 colours in stock',
  },
  {
    title: 'Graduations & Ceremonies',
    description:
      'Custom production for ceremonies at scale: your colours, your thickness, your logo.',
    stat: `Custom from ${formatCount(WHOLESALE.minimumOrderPerColor)}`,
  },
  {
    title: 'Brand Giveaways',
    description:
      'Promotional runs with silk-screen printing, packed 200 to a carton and shipped to your forwarder.',
    stat: 'Silk-screen logo',
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
            One product, two ways to buy it: a retail pack from Amazon or Temu, or a custom production
            run made to your specification.
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
