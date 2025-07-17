import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, DollarSign, Users, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center">
      {/* Clean Floating Geometric Elements */}
      <div className="absolute top-32 right-20 w-24 h-24 bg-accent-green rounded-3xl animate-float"></div>
      <div className="absolute top-20 right-40 w-16 h-16 bg-accent-green rounded-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-48 right-32 w-20 h-8 bg-accent-green rounded-2xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="absolute bottom-40 right-16 w-28 h-28 bg-primary/80 rounded-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-44 w-20 h-20 bg-primary/80 rounded-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-56 right-28 w-16 h-8 bg-primary/80 rounded-2xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      
      <div className="absolute top-1/3 left-20 w-32 h-16 bg-accent-gold/80 rounded-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/3 left-16 w-24 h-24 bg-accent-gold/80 rounded-3xl animate-float" style={{ animationDelay: '0.8s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Clean Typography */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-8">
            Discover the joy of{" "}
            <span className="inline-flex items-center">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 mr-4 text-primary" />
              <span className="bg-gradient-text bg-clip-text text-transparent">
                effortless
              </span>
            </span>
            {" "}private equity intelligence{" "}
            <span className="bg-foreground text-background px-4 py-2 rounded-2xl">
              with Carry & Conquer.
            </span>
          </h1>
          
          {/* Clean Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
            Carry & Conquer's intelligence platform is now available and ready to 
            revolutionize the way you think about private equity analysis and deal sourcing.
          </p>
          
          {/* Simple CTA */}
          <Button 
            size="lg" 
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-12 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            GET STARTED
          </Button>
        </div>
      </div>
    </section>
  )
}