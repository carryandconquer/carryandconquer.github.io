import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Users, Building2, Target, BarChart3, Activity } from "lucide-react"

interface DashboardMetric {
  id: string
  label: string
  value: string
  change_percentage: number | null
  is_positive: boolean
  color_scheme: string
  icon_name: string | null
}

interface FeaturedDeal {
  id: string
  deal_name: string
  deal_value: number | null
  deal_value_formatted: string | null
  transaction_type: string
  country: string | null
  announcement_date: string | null
  confidence_score: number | null
}

const iconMap = {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Target,
  BarChart3,
  Activity
}

export function TechDashboard() {
  // Fetch header metrics
  const { data: metrics = [] } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('header_carousel_metrics')
        .select('*')
        .eq('published', true)
        .order('priority', { ascending: false })
        .limit(6)

      if (error) throw error
      return data as DashboardMetric[]
    }
  })

  // Fetch featured deals
  const { data: deals = [] } = useQuery({
    queryKey: ['featured-deals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('published', true)
        .eq('featured_deal', true)
        .order('announcement_date', { ascending: false })
        .limit(4)

      if (error) throw error
      return data as FeaturedDeal[]
    }
  })

  const getColorClasses = (scheme: string, isPositive: boolean) => {
    const baseClasses = "transition-all duration-300 hover:scale-105 backdrop-blur-sm border"
    
    switch (scheme) {
      case 'success':
        return `${baseClasses} bg-green-900/20 border-green-500/30 hover:border-green-400/50`
      case 'warning':
        return `${baseClasses} bg-yellow-900/20 border-yellow-500/30 hover:border-yellow-400/50`
      case 'danger':
        return `${baseClasses} bg-red-900/20 border-red-500/30 hover:border-red-400/50`
      case 'info':
        return `${baseClasses} bg-blue-900/20 border-blue-500/30 hover:border-blue-400/50`
      case 'purple':
        return `${baseClasses} bg-purple-900/20 border-purple-500/30 hover:border-purple-400/50`
      default:
        return isPositive 
          ? `${baseClasses} bg-green-900/20 border-green-500/30 hover:border-green-400/50`
          : `${baseClasses} bg-red-900/20 border-red-500/30 hover:border-red-400/50`
    }
  }

  const formatValue = (value: number | null) => {
    if (!value) return 'N/A'
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`
    return `$${value}`
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 144 }, (_, i) => (
            <div 
              key={i} 
              className="border border-green-500/10 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Matrix Rain Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 20 }, (_, i) => (
            <rect
              key={i}
              x={i * 5}
              y="0"
              width="2"
              height="100"
              fill="url(#matrixGradient)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          <defs>
            <linearGradient id="matrixGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(190 95% 45%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
            <Activity className="w-4 h-4 mr-2" />
            LIVE INTELLIGENCE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real-Time Market
            <span className="block text-green-400 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Intelligence Dashboard
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Live market data, deal analytics, and trend analysis powered by AI
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric, index) => {
            const IconComponent = iconMap[metric.icon_name as keyof typeof iconMap] || TrendingUp
            const colorClasses = getColorClasses(metric.color_scheme, metric.is_positive)
            
            return (
              <Card 
                key={metric.id} 
                className={colorClasses}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">
                    {metric.label}
                  </CardTitle>
                  <IconComponent className="w-5 h-5 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  {metric.change_percentage && (
                    <div className={`text-sm flex items-center ${
                      metric.is_positive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.is_positive ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(metric.change_percentage)}%
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Deals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deals List */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Building2 className="w-6 h-6 mr-3 text-green-400" />
              Featured Deals
            </h3>
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <Card 
                  key={deal.id}
                  className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-white text-lg">
                          {deal.deal_name}
                        </h4>
                        <p className="text-sm text-white/60">
                          {deal.country} • {deal.transaction_type}
                        </p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {deal.transaction_type}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-green-400">
                        {deal.deal_value_formatted || formatValue(deal.deal_value)}
                      </div>
                      {deal.confidence_score && (
                        <div className="text-sm text-white/60">
                          Confidence: {Math.round(deal.confidence_score * 100)}%
                        </div>
                      )}
                    </div>
                    
                    {deal.announcement_date && (
                      <div className="text-xs text-white/50 mt-2">
                        {new Date(deal.announcement_date).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Analytics Visualization */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-green-400" />
              Market Analytics
            </h3>
            
            {/* Simulated Analytics Card */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Deal Volume</span>
                    <span className="text-green-400 font-bold">$47.3B</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Average IRR</span>
                    <span className="text-green-400 font-bold">12.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-1/2"></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Dry Powder</span>
                    <span className="text-yellow-400 font-bold">$892B</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full w-5/6"></div>
                  </div>
                </div>

                {/* Sparkline visualization */}
                <div className="mt-6 p-4 bg-black/30 rounded-lg">
                  <div className="text-sm text-white/60 mb-2">30-Day Trend</div>
                  <svg viewBox="0 0 200 60" className="w-full h-12">
                    <polyline
                      fill="none"
                      stroke="url(#sparklineGradient)"
                      strokeWidth="2"
                      points="0,50 20,45 40,30 60,35 80,25 100,20 120,15 140,25 160,20 180,10 200,15"
                    />
                    <defs>
                      <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(142 76% 36%)" />
                        <stop offset="50%" stopColor="hsl(180 84% 40%)" />
                        <stop offset="100%" stopColor="hsl(190 95% 45%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}