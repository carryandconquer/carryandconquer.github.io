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
    <section id="features" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Intelligence That 
            <span className="block bg-gradient-text bg-clip-text text-transparent">
              Drives Decisions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50 hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color.split('-')[1]}/10 to-${feature.color.split('-')[1]}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-card-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm text-muted-foreground">
              And much more with our comprehensive analytics suite
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}