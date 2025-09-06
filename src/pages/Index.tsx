import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { PrivateEquityAIChat } from "@/components/ui/v0-ai-chat"
import { FeaturedArticles } from "@/components/FeaturedArticles"
import { FeaturesSection } from "@/components/FeaturesSection"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen font-primary pt-24">
      <Navigation />
      <HeroSection />
      
      {/* AI Chat Assistant */}
      <section className="py-12 bg-black">
        <PrivateEquityAIChat />
      </section>
      
      <FeaturedArticles />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
