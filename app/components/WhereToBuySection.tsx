import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { MARKETPLACES } from '@/lib/products';
import { formatMinimumOrderPerColor } from '@/lib/wholesale';

const platformLogos: Record<string, { src: string; alt: string; height: string }> = {
  Amazon: { src: '/images/Amazon_logo.svg', alt: 'Amazon', height: 'h-8' },
  Temu: { src: '/images/Temu_logo.svg', alt: 'Temu', height: 'h-6' },
};

const platforms = [MARKETPLACES.amazon, MARKETPLACES.temu];

export default function WhereToBuySection() {
  return (
    <section className="py-16 lg:py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Where to Buy
          </h2>
          <p className="text-gray-400">
            Find us on major marketplaces. The same product, on your preferred platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
          {platforms.map((platform) => {
            const logo = platformLogos[platform.name];
            return (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${logo.height} [&>img]:brightness-0 [&>img]:invert`}>
                      <img src={logo.src} alt={logo.alt} className="h-full w-auto" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </div>

                  <p className="text-gray-400 text-sm">
                    {platform.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 max-w-3xl">
          <p className="text-gray-500 text-sm">
            <Link href="/wholesale/" className="text-gray-300 underline underline-offset-4 hover:text-white">
              Foam finger bulk
            </Link>{' '}
            and custom manufacturing start at {formatMinimumOrderPerColor()}. Or email
            wholesale@eyrya.com.
          </p>
        </div>
      </div>
    </section>
  );
}
