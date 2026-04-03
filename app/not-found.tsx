import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | EYRYA',
  description: 'The page you are looking for does not exist. Browse our foam fingers, party supplies, and outdoor products.',
  alternates: {
    canonical: 'https://www.eyrya.com/404',
  },
};

export default function NotFound() {
  return (
    <div className="pt-24 pb-20 bg-[#F4F1EA] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-['Teko'] uppercase font-bold text-[#DC2626]">404</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-12 max-w-lg mx-auto">
          The page you are looking for does not exist. Maybe it was moved, or you typed the wrong address.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors rounded-sm"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-[#1a1a1a] px-8 py-4 font-semibold hover:border-[#1a1a1a] transition-colors rounded-sm"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">Popular Pages</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link href="/products/eva-foam-finger" className="p-4 bg-white border border-gray-200 hover:border-[#DC2626] transition-colors">
              <h3 className="font-semibold text-[#1a1a1a]">EVA Foam Finger (12 Pack)</h3>
            </Link>
            <Link href="/products/party-led-lights" className="p-4 bg-white border border-gray-200 hover:border-[#DC2626] transition-colors">
              <h3 className="font-semibold text-[#1a1a1a]">Party LED Lights</h3>
            </Link>
            <Link href="/products/outdoor-game-kit" className="p-4 bg-white border border-gray-200 hover:border-[#DC2626] transition-colors">
              <h3 className="font-semibold text-[#1a1a1a]">Outdoor Game Kit</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
