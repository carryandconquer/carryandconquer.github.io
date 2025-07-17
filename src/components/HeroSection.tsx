import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, DollarSign, Users, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Minimal, Well-Positioned Geometric Elements */}
      <div className="absolute top-1/4 right-20 w-16 h-16 bg-accent-green rounded-3xl animate-float"></div>
      <div className="absolute top-1/3 right-32 w-24 h-12 bg-primary rounded-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 right-16 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      
      <div className="absolute bottom-1/3 right-24 w-28 h-14 bg-gradient-to-br from-accent to-primary rounded-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/4 right-40 w-18 h-18 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="absolute top-1/3 left-16 w-20 h-10 bg-accent-gold rounded-3xl animate-float" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-1/2 left-20 w-16 h-24 bg-accent-orange rounded-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Main Content with Proper Top Spacing */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="w-full max-w-6xl">
          {/* Improved Typography Flow */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-12">
            <span className="block text-foreground mb-4">Discover the joy of</span>
            
            <span className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-primary flex-shrink-0" />
              <span className="bg-gradient-to-r from-primary via-accent to-accent-green bg-clip-text text-transparent">
                effortless
              </span>
            </span>
            
            <span className="block text-foreground mb-4">private equity</span>
            <span className="block text-foreground mb-6">intelligence</span>
            
            <span className="flex items-center gap-4 flex-wrap">
              <span className="text-foreground">with</span>
              <span className="bg-foreground text-background px-4 py-2 lg:px-6 lg:py-3 rounded-2xl lg:rounded-3xl">
                Carry & Conquer.
              </span>
            </span>
          </h1>
          
          {/* Cleaner Subheading */}
          <div className="max-w-4xl mb-16">
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Our intelligence platform is now available and ready to revolutionize 
              the way you think about private equity analysis and deal sourcing.
            </p>
          </div>
          
          {/* Call to Action */}
          <div>
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-4 lg:px-12 lg:py-6 text-lg lg:text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}