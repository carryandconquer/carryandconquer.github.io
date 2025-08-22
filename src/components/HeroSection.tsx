import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, ArrowRight, Activity, Zap, Database } from "lucide-react"
import { useHeaderMetrics } from "@/hooks/useHeaderMetrics"

export function HeroSection() {
  const { metrics } = useHeaderMetrics()
  const topMetrics = metrics.slice(0, 3)

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

            {/* Live Metrics Row */}
            {topMetrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topMetrics.map((metric, index) => (
                  <Card 
                    key={metric.id}
                    className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 hover:border-green-500/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                        {metric.label}
                      </div>
                      <div className="text-lg font-bold text-white">
                        {metric.value}
                      </div>
                      {metric.change_percentage && (
                        <div className={`text-xs flex items-center mt-1 ${
                          metric.is_positive ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {metric.is_positive ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                          )}
                          {Math.abs(metric.change_percentage)}%
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Data Visualization */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Central Data Hub */}
              <div className="relative">
                <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <Database className="w-12 h-12 mx-auto mb-4 text-green-400" />
                    <div className="text-2xl font-bold text-white mb-2">
                      $47.3B
                    </div>
                    <div className="text-sm text-white/60">
                      Monthly Deal Volume
                    </div>
                    <div className="flex items-center justify-center mt-3 text-green-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+12.8%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Orbiting Elements */}
                {[
                  { label: "IRR", value: "12.8%", angle: 0 },
                  { label: "Exits", value: "247", angle: 120 },
                  { label: "Deals", value: "1.2K", angle: 240 }
                ].map((item, i) => (
                  <div
                    key={i}
                     className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 animate-spin"
                     style={{
                       top: '50%',
                       left: '50%',
                       transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-120px)`,
                       animationDuration: '20s',
                       animationDelay: `${i * 6.67}s`
                     }}
                  >
                    <Card className="bg-black/80 backdrop-blur-sm border-green-500/20 p-2">
                      <CardContent className="p-0 text-center">
                        <div className="text-xs text-white/60">{item.label}</div>
                        <div className="text-sm font-bold text-green-400">{item.value}</div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for orbit animation - moved to CSS */}
    </section>
  )
}