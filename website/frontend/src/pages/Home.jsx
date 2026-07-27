import SEO from '../components/SEO';
import { HeroSection } from './home-sections/HeroSection';
import { FractureSection } from './home-sections/FractureSection';
import { GuardiansPreviewSection } from './home-sections/GuardiansPreviewSection';
import { RoadmapSection } from './home-sections/RoadmapSection';
import { FAQSection } from './home-sections/FAQSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-text overflow-x-hidden selection:bg-primary/30">
      <SEO 
        title="RedVerse Genesis | The First Guardians" 
        description="A premium Dark Luxury NFT experience on Polygon. 20 Handcrafted cinematic Guardians forged in the fracture."
        url="https://redverse.xyz/"
      />
      
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. The Fracture Lore Preview */}
      <FractureSection />

      {/* 3. Guardians Preview */}
      <GuardiansPreviewSection />

      {/* 4. Interactive Roadmap */}
      <RoadmapSection />

      {/* 5. FAQ */}
      <FAQSection />

    </div>
  );
};

export default Home;
