import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, DollarSign, Users, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Floating Geometric Elements */}
      <div className="absolute top-20 right-20 w-40 h-20 bg-accent-green/20 rounded-full rotate-45 animate-float"></div>
      <div className="absolute top-1/3 left-10 w-24 h-24 bg-accent-gold/20 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 right-1/4 w-32 h-32 bg-primary/20 rounded-2xl rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-10 w-16 h-40 bg-accent-green/15 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Trust Indicator */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-in">
              <Users className="w-4 h-4 mr-2" />
              500+ PE firms trust our intelligence
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up">
              Discover the joy of
              <span className="block bg-gradient-to-r from-accent-gold to-accent-green bg-clip-text text-transparent flex items-center justify-center lg:justify-start">
                <Sparkles className="w-12 h-12 mr-4 text-accent-green" />
                effortless
              </span>
              <span className="block">private equity intelligence with Carry & Conquer.</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-white/80 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Carry & Conquer's intelligence platform is now available and ready to 
              revolutionize the way you think about private equity analysis and deal sourcing.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-gradient-button hover:shadow-glow transition-all duration-300 hover:scale-105 rounded-full px-8">
                GET STARTED
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                View Sample Report
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">$2.5T+</div>
                <div className="text-white/70 text-sm">Assets Tracked</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-white/70 text-sm">Deals Analyzed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-white/70 text-sm">PE Firms</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Dashboard Preview */}
          <div className="relative animate-float">
            <div className="relative">
              {/* Main Dashboard Mockup */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-lift">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Deal Flow Analytics</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accent-orange"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-gold"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="h-32 bg-gradient-to-r from-primary/20 to-accent-green/20 rounded-lg mb-4 flex items-end justify-around p-4">
                  <div className="w-8 bg-primary h-16 rounded-t"></div>
                  <div className="w-8 bg-accent-green h-24 rounded-t"></div>
                  <div className="w-8 bg-accent-gold h-12 rounded-t"></div>
                  <div className="w-8 bg-primary h-20 rounded-t"></div>
                  <div className="w-8 bg-accent-green h-28 rounded-t"></div>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-accent-green mr-2" />
                      <span className="text-white/70 text-xs">Growth Rate</span>
                    </div>
                    <div className="text-white font-semibold">+23.4%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-accent-gold mr-2" />
                      <span className="text-white/70 text-xs">Avg Deal Size</span>
                    </div>
                    <div className="text-white font-semibold">$847M</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-accent-green/20 backdrop-blur-lg rounded-lg p-3 border border-accent-green/30">
                <div className="text-white text-xs">Live Data</div>
                <div className="text-accent-green font-bold">+5.2%</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-accent-gold/20 backdrop-blur-lg rounded-lg p-3 border border-accent-gold/30">
                <div className="text-white text-xs">New Deal</div>
                <div className="text-accent-gold font-bold">$1.2B</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}