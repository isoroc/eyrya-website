import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProductSection from './components/FeaturedProductSection';
import UseScenariosSection from './components/UseScenariosSection';
import WhereToBuySection from './components/WhereToBuySection';
import IdeasPreviewSection from './components/IdeasPreviewSection';
import JsonLd from './components/JsonLd';

export const metadata: Metadata = {
  title: 'EYRYA® | Premium Foam Fingers, Party Supplies & Outdoor Products',
  description: 'Shop premium EVA foam fingers, LED party lights, and outdoor game kits. 50,000+ sold with 4.8-star rating. Free shipping on Amazon & Temu.',
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
        url: 'https://www.eyrya.com/images/og-image.svg',
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
    images: ['https://www.eyrya.com/images/og-image.svg'],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "EYRYA - Foam Fingers, Party Supplies & Outdoor Products",
        "description": "EYRYA offers premium EVA foam fingers, party supplies, and outdoor products. Trusted by 50,000+ customers.",
        "url": "https://www.eyrya.com/",
        "mainEntity": {
          "@type": "ItemList",
          "name": "EYRYA Products",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "EVA Foam Finger (12 Pack)", "url": "https://www.eyrya.com/products/eva-foam-finger/" },
            { "@type": "ListItem", "position": 2, "name": "Party LED Lights Set", "url": "https://www.eyrya.com/products/party-led-lights/" },
            { "@type": "ListItem", "position": 3, "name": "Outdoor Game Kit", "url": "https://www.eyrya.com/products/outdoor-game-kit/" },
          ],
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
