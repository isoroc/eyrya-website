import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProductSection from './components/FeaturedProductSection';
import UseScenariosSection from './components/UseScenariosSection';
import WhereToBuySection from './components/WhereToBuySection';
import IdeasPreviewSection from './components/IdeasPreviewSection';

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
