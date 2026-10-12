import { Metadata } from 'next';
import ProductsView from './ProductsView';
import { BRAND } from '@/lib/products';

export const metadata: Metadata = {
  // `absolute` avoids the root layout template appending a second brand name.
  title: { absolute: 'EYRYA® Products | Foam Fingers, Party Supplies & Outdoor Games' },
  description:
    'Explore EYRYA products: premium EVA foam fingers, LED party lights, and outdoor game kits. Wholesale pricing on 50+ units. Shop on Amazon & Temu.',
  keywords:
    'EYRYA products, foam fingers, EVA foam finger, party supplies, sports fan gear, outdoor games, bulk order',
  alternates: {
    canonical: `${BRAND.siteUrl}/products/`,
  },
  openGraph: {
    title: 'EYRYA Products - Foam Fingers, Party Supplies & More',
    description:
      'Explore premium EVA foam fingers, LED party lights, and outdoor game kits. Shop on Amazon & Temu.',
    type: 'website',
    url: `${BRAND.siteUrl}/products/`,
    siteName: 'EYRYA',
    images: [
      {
        url: `${BRAND.siteUrl}/images/og-image.png`,
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
    images: [`${BRAND.siteUrl}/images/og-image.png`],
  },
};

export default function ProductsPage() {
  return <ProductsView />;
}
