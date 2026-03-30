import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProductSection from './components/FeaturedProductSection';
import UseScenariosSection from './components/UseScenariosSection';
import WhereToBuySection from './components/WhereToBuySection';
import IdeasPreviewSection from './components/IdeasPreviewSection';

export const metadata: Metadata = {
  title: 'EYRYA® | Professional Sports Fan Products & Party Supplies',
  description: 'EYRYA offers premium EVA foam fingers, party supplies, and outdoor products. Trusted by 50,000+ customers. Shop on Amazon & Temu.',
  keywords: 'EYRYA, foam fingers, sports fan gear, party supplies, bulk party supplies, EVA foam',
  alternates: {
    canonical: 'https://www.eyrya.com/',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductSection />
      <UseScenariosSection />
      <WhereToBuySection />
      <IdeasPreviewSection />
    </>
  );
}
