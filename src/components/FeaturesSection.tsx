import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Search, BarChart3, Building2, Users, Target } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Transaction Intelligence",
    description: "Track key PE deals, valuations, and exits with real-time data and comprehensive analysis.",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Market Trend Analysis",
    description: "Sector performance insights, investment flows, and emerging opportunities in the PE landscape.",
    color: "text-accent-green"
  },
  {
    icon: Building2,
    title: "Firm Strategy Insights",
    description: "Portfolio moves, fundraising data, and strategic positioning of leading PE firms.",
    color: "text-accent-gold"
  },
  {
    icon: BarChart3,
    title: "Competitive Intelligence",
    description: "Peer comparisons, market positioning, and benchmarking against industry leaders.",
    color: "text-accent-orange"
  },
  {
    icon: Users,
    title: "LP-GP Analytics",
    description: "Limited partner preferences, general partner performance, and relationship mapping.",
    color: "text-primary"
  },
  {
    icon: Target,
    title: "Deal Sourcing Intel",
    description: "Pipeline opportunities, target identification, and competitive positioning insights.",
    color: "text-accent-green"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-black relative overflow-hidden">
      {/* Wave pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
          <path 
            d="M0,400 C400,200 800,600 1200,300 L1200,800 L0,800 Z" 
            fill="url(#featuresWave)"
          />
          <defs>
            <linearGradient id="featuresWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(210 98% 55%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Intelligence That 
            <span className="block text-green-400">
              Drives Decisions
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive private equity intelligence platform providing the insights you need 
            to stay ahead in a competitive market.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={feature.title}
                className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-2 bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-900/50 border border-gray-800">
            <span className="text-sm text-white/70">
              And much more with our comprehensive analytics suite
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}