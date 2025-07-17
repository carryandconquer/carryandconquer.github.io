import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, DollarSign, Users, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Refined Floating Geometric Elements */}
      <div className="absolute top-32 right-20 w-20 h-20 bg-accent-green rounded-3xl animate-float"></div>
      <div className="absolute top-20 right-48 w-12 h-12 bg-accent-green rounded-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="absolute top-1/3 right-16 w-24 h-12 bg-primary rounded-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-32 w-16 h-16 bg-primary rounded-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="absolute bottom-40 right-20 w-28 h-28 bg-gradient-to-br from-primary to-accent rounded-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-60 right-48 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      
      <div className="absolute top-40 left-20 w-24 h-12 bg-accent-gold rounded-3xl animate-float" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-1/3 left-16 w-16 h-32 bg-accent-orange rounded-3xl animate-float" style={{ animationDelay: '1.8s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full max-w-5xl">
          {/* Main Headline with Better Typography */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-8">
            <span className="block text-foreground">Discover the joy of</span>
            <span className="flex items-center gap-4 my-4">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-primary flex-shrink-0" />
              <span className="bg-gradient-to-r from-primary via-accent to-accent-green bg-clip-text text-transparent">
                effortless
              </span>
            </span>
            <span className="block text-foreground">private</span>
            <span className="block text-foreground">equity intelligence</span>
            <span className="inline-flex items-center gap-4 mt-4">
              <span className="text-foreground">with</span>
              <span className="bg-foreground text-background px-6 py-3 rounded-3xl">
                Carry &
              </span>
            </span>
            <span className="block mt-2">
              <span className="bg-foreground text-background px-6 py-3 rounded-3xl">
                Conquer.
              </span>
            </span>
          </h1>
          
          {/* Clean Subheading */}
          <div className="max-w-3xl mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed">
              Carry & Conquer's intelligence platform is now available and ready to 
              revolutionize the way you think about private equity analysis and deal sourcing.
            </p>
          </div>
          
          {/* Single Clean CTA */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}