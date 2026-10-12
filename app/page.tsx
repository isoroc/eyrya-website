import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProductSection from './components/FeaturedProductSection';
import UseScenariosSection from './components/UseScenariosSection';
import WhereToBuySection from './components/WhereToBuySection';
import IdeasPreviewSection from './components/IdeasPreviewSection';
import JsonLd from './components/JsonLd';
import { BRAND, formatCount, getAllProducts, getFeaturedProduct } from '@/lib/products';

export const metadata: Metadata = {
  // `absolute` keeps the root layout template from appending a second brand name.
  title: { absolute: 'EYRYA® | Premium Foam Fingers, Party Supplies & Outdoor Products' },
  description: `Shop premium EVA foam fingers, LED party lights, and outdoor game kits. ${formatCount(BRAND.productsSold)}+ sold with a ${getFeaturedProduct().rating.toFixed(1)}-star rating. Free shipping on Amazon & Temu.`,
  keywords: 'EYRYA, foam fingers, EVA foam finger, party supplies, sports fan gear, bulk foam fingers, outdoor games',
  alternates: {
    canonical: 'https://www.eyrya.com/',
  },
  openGraph: {
    title: 'EYRYA - Premium Foam Fingers & Party Supplies',
    description: 'Shop premium EVA foam fingers, LED party lights, and outdoor game kits. 50,000+ sold with 4.8-star rating.',
    type: 'website',
    url: 'https://www.eyrya.com/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EYRYA - Premium Foam Fingers & Party Supplies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA - Premium Foam Fingers & Party Supplies',
    description: 'Shop premium EVA foam fingers, LED party lights, and outdoor game kits. 50,000+ sold.',
    images: ['https://www.eyrya.com/images/og-image.png'],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "EYRYA - Foam Fingers, Party Supplies & Outdoor Products",
        "description": "EYRYA offers premium EVA foam fingers, party supplies, and outdoor products.",
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
