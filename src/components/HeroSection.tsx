import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Flowing Wave Background */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full opacity-60">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(190 95% 45%)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(180 84% 40%)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(210 98% 55%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(190 95% 45%)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Flowing wave paths */}
          <path 
            d="M0,400 C300,200 600,600 1200,300 L1200,800 L0,800 Z" 
            fill="url(#wave1)"
            className="animate-pulse"
          />
          <path 
            d="M0,500 C400,300 700,700 1200,400 L1200,800 L0,800 Z" 
            fill="url(#wave2)"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          
          {/* Mesh overlay */}
          <pattern id="mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,40 L40,0" stroke="hsl(142 76% 36%)" strokeWidth="0.5" opacity="0.3"/>
            <path d="M0,0 L40,40" stroke="hsl(142 76% 36%)" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#mesh)" opacity="0.2"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="w-full max-w-4xl">
          {/* Notification Badge */}
          <div className="mb-8">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Series A funding round was closed
            </Badge>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8">
            <span className="block text-white mb-2">Your smartest PE intelligence</span>
            <span className="block text-green-400">
              work faster and smarter
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl leading-relaxed">
            Smarter investments, faster decisions. AI powered dashboard with 
            deal analytics, market insights, due diligence and more.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Button 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              GET STARTED
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <button className="text-white/70 hover:text-white font-medium text-lg underline underline-offset-4 transition-colors">
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}