import { Metadata } from 'next';
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
        url: 'https://www.eyrya.com/images/og-image.svg',
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
    images: ['https://www.eyrya.com/images/og-image.svg'],
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
