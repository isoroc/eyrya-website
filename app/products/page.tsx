import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'EYRYA® Products | Foam Fingers, Party Supplies & Outdoor Games',
  description: 'Explore EYRYA products: premium EVA foam fingers, LED party lights, outdoor game kits. 50,000+ sold. Wholesale pricing on 50+ units. Shop on Amazon & Temu.',
  keywords: 'EYRYA products, foam fingers, EVA foam finger, party supplies, sports fan gear, outdoor games, bulk order',
  alternates: {
    canonical: 'https://www.eyrya.com/products/',
  },
  openGraph: {
    title: 'EYRYA Products - Foam Fingers, Party Supplies & More',
    description: 'Explore premium EVA foam fingers, LED party lights, and outdoor game kits. Shop on Amazon & Temu.',
    type: 'website',
    url: 'https://www.eyrya.com/products/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EYRYA Products - Foam Fingers, Party Supplies & Outdoor Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA Products - Foam Fingers, Party Supplies & More',
    description: 'Explore premium EVA foam fingers, LED party lights, and outdoor game kits.',
    images: ['https://www.eyrya.com/images/og-image.png'],
  },
};

function ProductsFallback() {
  return (
    <div className="pt-24 pb-20 bg-[#F4F1EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 w-48 mb-4" />
          <div className="h-4 bg-gray-200 w-96 mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200" />
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsClient />
    </Suspense>
  );
}
