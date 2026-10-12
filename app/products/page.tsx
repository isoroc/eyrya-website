import { Metadata } from 'next';
import ProductsView from './ProductsView';
import { BRAND } from '@/lib/products';
import { formatMinimumOrderPerColor } from '@/lib/wholesale';

export const metadata: Metadata = {
  // `absolute` avoids the root layout template appending a second brand name.
  title: { absolute: 'EYRYA® Products | EVA Foam Fingers & Custom Manufacturing' },
  description:
    `18-inch EVA foam hands. Buy the 12-pack on Amazon or the 6-pack on Temu, or order custom production from ${formatMinimumOrderPerColor()} with your own colours, thickness and logo.`,
  keywords:
    'EYRYA products, EVA foam finger, foam hand, custom foam fingers, bulk foam fingers, promotional foam fingers',
  alternates: {
    canonical: `${BRAND.siteUrl}/products/`,
  },
  openGraph: {
    title: 'EYRYA Products - Foam Fingers, Party Supplies & More',
    description:
      '18-inch EVA foam hands: retail packs from Amazon and Temu, custom production from 5,000 pieces per colour.',
    type: 'website',
    url: `${BRAND.siteUrl}/products/`,
    siteName: 'EYRYA',
    images: [
      {
        url: `${BRAND.siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'EYRYA Products - EVA Foam Fingers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA Products - Foam Fingers, Party Supplies & More',
    description: '18-inch EVA foam hands: retail packs from Amazon and Temu, custom production from 5,000 pieces per colour.',
    images: [`${BRAND.siteUrl}/images/og-image.png`],
  },
};

export default function ProductsPage() {
  return <ProductsView />;
}
