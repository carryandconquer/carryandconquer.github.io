import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { PrivateEquityAIChat } from "@/components/ui/v0-ai-chat"
import { StatsSection } from "@/components/StatsSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { TestimonialSection } from "@/components/TestimonialSection"
import { PricingSection } from "@/components/PricingSection"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen font-primary pt-24">
      <Navigation />
      <HeroSection />
      
      {/* AI Chat Assistant */}
      <section className="py-20 bg-black">
        <PrivateEquityAIChat />
      </section>
      <StatsSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
