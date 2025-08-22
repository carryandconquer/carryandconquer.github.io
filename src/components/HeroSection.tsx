import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Sparkles, Hexagon, Triangle, Circle } from "lucide-react"

export function HeroSection() {

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Advanced Tech Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="techGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(142 76% 36%)" strokeWidth="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#techGrid)" />
          </svg>
        </div>

        {/* Circuit Lines */}
        <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(190 95% 45%)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Circuit paths */}
          <path 
            d="M0,200 L200,200 L200,400 L600,400 L600,600 L1200,600" 
            fill="none" 
            stroke="url(#circuitGrad)" 
            strokeWidth="2"
            className="animate-pulse"
          />
          <path 
            d="M0,600 L400,600 L400,200 L800,200 L800,400 L1200,400" 
            fill="none" 
            stroke="url(#circuitGrad)" 
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          
          {/* Circuit nodes */}
          {[
            [200, 200], [200, 400], [600, 400], [600, 600],
            [400, 600], [400, 200], [800, 200], [800, 400]
          ].map(([x, y], i) => (
            <circle 
              key={i}
              cx={x} 
              cy={y} 
              r="4" 
              fill="hsl(142 76% 36%)" 
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>

        {/* Floating Data Points */}
        <div className="absolute top-20 right-20 opacity-60">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style={{
                top: `${Math.sin(i) * 100}px`,
                left: `${Math.cos(i) * 100}px`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Status Badge */}
            <div className="mb-8">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
                <Activity className="w-4 h-4 mr-2" />
                LIVE MARKET DATA
              </Badge>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="block text-white mb-2">Your smartest PE</span>
              <span className="block bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                intelligence platform
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl leading-relaxed">
              Series A funded platform delivering real-time market intelligence, 
              deal analytics, and AI-powered insights for smarter investment decisions.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-black font-semibold rounded-xl px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
              >
                <Zap className="w-5 h-5 mr-2" />
                GET STARTED
              </Button>
              
              <button className="text-white/70 hover:text-green-400 font-medium text-lg underline underline-offset-4 transition-colors">
                EXPLORE DEMO
              </button>
            </div>

          </div>

          {/* Right Column - Animated Design Elements */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="relative w-full max-w-lg h-96">
              {/* Central Core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400/20 to-teal-400/20 backdrop-blur-sm border border-green-400/30 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-green-400 animate-pulse" />
                </div>
                
                {/* Pulsing Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-green-400/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-[-20px] rounded-full border border-teal-400/10 animate-ping" style={{ animationDuration: '4s' }}></div>
              </div>

              {/* Orbiting Design Elements */}
              {[
                { icon: Hexagon, size: 'w-8 h-8', orbit: 100, duration: '15s', delay: '0s', color: 'text-green-400' },
                { icon: Triangle, size: 'w-6 h-6', orbit: 130, duration: '20s', delay: '3s', color: 'text-teal-400' },
                { icon: Circle, size: 'w-4 h-4', orbit: 160, duration: '25s', delay: '6s', color: 'text-blue-400' },
                { icon: Hexagon, size: 'w-5 h-5', orbit: 80, duration: '12s', delay: '9s', color: 'text-green-300' },
                { icon: Triangle, size: 'w-7 h-7', orbit: 140, duration: '18s', delay: '12s', color: 'text-teal-300' },
                { icon: Circle, size: 'w-3 h-3', orbit: 180, duration: '30s', delay: '15s', color: 'text-blue-300' }
              ].map((element, i) => {
                const IconComponent = element.icon
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      animation: `orbit-${element.orbit} ${element.duration} linear infinite`,
                      animationDelay: element.delay
                    }}
                  >
                    <div className={`${element.size} ${element.color} opacity-70 animate-pulse backdrop-blur-sm`}>
                      <IconComponent className="w-full h-full" />
                    </div>
                  </div>
                )
              })}

              {/* Floating Particles */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-green-400 rounded-full opacity-40 animate-pulse"
                  style={{
                    top: `${20 + Math.sin(i) * 60}%`,
                    left: `${20 + Math.cos(i) * 60}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(180 84% 40%)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {[
                  { x1: '30%', y1: '30%', x2: '70%', y2: '70%' },
                  { x1: '70%', y1: '30%', x2: '30%', y2: '70%' },
                  { x1: '50%', y1: '10%', x2: '50%', y2: '90%' }
                ].map((line, i) => (
                  <line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="url(#connectionGradient)"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 1}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for orbit animations */}
      <style>{`
        @keyframes orbit-80 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes orbit-100 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes orbit-130 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(130px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(130px) rotate(-360deg); }
        }
        @keyframes orbit-140 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        @keyframes orbit-160 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(160px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        @keyframes orbit-180 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(180px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(180px) rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}