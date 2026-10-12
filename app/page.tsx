import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProductSection from './components/FeaturedProductSection';
import UseScenariosSection from './components/UseScenariosSection';
import WhereToBuySection from './components/WhereToBuySection';
import IdeasPreviewSection from './components/IdeasPreviewSection';
import JsonLd from './components/JsonLd';
import { BRAND, getAllProducts } from '@/lib/products';
import { formatMinimumOrderPerColor } from '@/lib/wholesale';

export const metadata: Metadata = {
  // `absolute` keeps the root layout template from appending a second brand name.
  title: { absolute: 'EYRYA® | EVA Foam Fingers & Custom Manufacturing' },
  description: `18-inch EVA foam hands. Buy the 12-pack on Amazon or the 6-pack on Temu, or order custom production from ${formatMinimumOrderPerColor()} with your own colours, thickness and logo.`,
  keywords: 'EYRYA, EVA foam finger, foam hand, custom foam fingers, promotional foam fingers, bulk foam fingers',
  alternates: {
    canonical: `${BRAND.siteUrl}/`,
  },
  openGraph: {
    title: 'EYRYA - EVA Foam Fingers & Custom Manufacturing',
    description: `18-inch EVA foam hands. Retail packs from Amazon and Temu, custom production from ${formatMinimumOrderPerColor()}.`,
    type: 'website',
    url: `${BRAND.siteUrl}/`,
    siteName: 'EYRYA',
    images: [
      {
        url: `${BRAND.siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'EYRYA - EVA Foam Fingers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA - EVA Foam Fingers & Custom Manufacturing',
    description: `18-inch EVA foam hands. Retail packs from Amazon and Temu, custom production from ${formatMinimumOrderPerColor()}.`,
    images: [`${BRAND.siteUrl}/images/og-image.png`],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "EYRYA - EVA Foam Fingers & Custom Manufacturing",
        "description": "EYRYA makes 18-inch EVA foam hands, sold as a 12-pack on Amazon and a 6-pack on Temu, with custom production from 5,000 pieces per colour.",
        "url": "https://www.eyrya.com/",
        "mainEntity": {
          "@type": "ItemList",
          "name": "EYRYA Products",
          "itemListElement": getAllProducts().map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": product.name,
            "url": `${BRAND.siteUrl}/products/${product.slug}/`,
          })),
        },
      }} />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductSection />
      <UseScenariosSection />
      <WhereToBuySection />
      <IdeasPreviewSection />
    </>
  );
}
