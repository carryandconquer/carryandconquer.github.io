import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Building2, User, Target, Calendar, ExternalLink, Star, ArrowUpRight, DollarSign, Users } from "lucide-react"

const marketTrends = [
  {
    title: "Healthcare AI Surge",
    change: "+34%",
    positive: true,
    description: "AI-powered healthcare solutions seeing massive PE investment",
    value: "$12.4B",
    timeframe: "Q4 2024"
  },
  {
    title: "ESG Compliance Tech",
    change: "+28%",
    positive: true,
    description: "Growing demand for environmental compliance solutions",
    value: "$8.7B",
    timeframe: "Q4 2024"
  },
  {
    title: "Traditional Retail",
    change: "-15%",
    positive: false,
    description: "Continued decline in brick-and-mortar retail investments",
    value: "$4.2B",
    timeframe: "Q4 2024"
  }
]

const keyDeals = [
  {
    company: "MedTech Solutions",
    amount: "$2.4B",
    firm: "Vista Equity Partners",
    sector: "Healthcare Technology",
    status: "Closed",
    date: "Dec 2024"
  },
  {
    company: "CloudSecure Inc",
    amount: "$1.8B",
    firm: "Blackstone",
    sector: "Cybersecurity",
    status: "Pending",
    date: "Jan 2025"
  },
  {
    company: "GreenEnergy Corp",
    amount: "$3.1B",
    firm: "KKR",
    sector: "Renewable Energy",
    status: "Closed",
    date: "Nov 2024"
  }
]

const newsItems = [
  {
    headline: "Blackstone Announces $50B Climate Fund",
    summary: "New fund targets carbon-neutral investments across energy and infrastructure sectors",
    source: "PE Weekly",
    time: "2 hours ago",
    category: "Fund Launch"
  },
  {
    headline: "AI Startup Valuations Reach Record Highs",
    summary: "Average Series B valuations for AI companies hit $180M, up 40% from last quarter",
    source: "TechCrunch",
    time: "5 hours ago",
    category: "Market Analysis"
  },
  {
    headline: "European PE Activity Slows Amid Regulatory Changes",
    summary: "New EU regulations impact deal flow, with transaction volume down 22% year-over-year",
    source: "Financial Times",
    time: "1 day ago",
    category: "Regulation"
  }
]

const peopleProfiles = [
  {
    name: "Sarah Chen",
    title: "Managing Partner",
    firm: "Vista Equity Partners",
    specialty: "Technology Investments",
    recentDeal: "MedTech Solutions - $2.4B",
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    title: "Senior Partner",
    firm: "Blackstone",
    specialty: "Growth Equity",
    recentDeal: "CloudSecure Inc - $1.8B",
    avatar: "MR"
  },
  {
    name: "Jennifer Park",
    title: "Investment Director",
    firm: "KKR",
    specialty: "Energy & Infrastructure",
    recentDeal: "GreenEnergy Corp - $3.1B",
    avatar: "JP"
  }
]

const companyProfiles = [
  {
    name: "Vista Equity Partners",
    aum: "$100B",
    headquarters: "Austin, TX",
    founded: "2000",
    portfolio: "300+ companies",
    focus: "Enterprise Software",
    performance: "+28% IRR"
  },
  {
    name: "Blackstone",
    aum: "$975B",
    headquarters: "New York, NY",
    founded: "1985",
    portfolio: "200+ companies",
    focus: "Multi-Strategy",
    performance: "+22% IRR"
  },
  {
    name: "KKR & Co",
    aum: "$504B",
    headquarters: "New York, NY",
    founded: "1976",
    portfolio: "500+ companies",
    focus: "Global Investment",
    performance: "+25% IRR"
  }
]

const investmentStrategies = [
  {
    strategy: "AI-First Healthcare",
    description: "Focus on healthcare companies leveraging artificial intelligence for diagnostics and treatment",
    allocation: "25%",
    expectedReturn: "35-40%",
    timeHorizon: "3-5 years",
    riskLevel: "Medium-High"
  },
  {
    strategy: "ESG-Compliant Infrastructure",
    description: "Investments in renewable energy and sustainable infrastructure projects",
    allocation: "30%",
    expectedReturn: "15-20%",
    timeHorizon: "7-10 years",
    riskLevel: "Low-Medium"
  },
  {
    strategy: "Enterprise SaaS Consolidation",
    description: "Roll-up strategy for fragmented enterprise software markets",
    allocation: "20%",
    expectedReturn: "25-30%",
    timeHorizon: "4-6 years",
    riskLevel: "Medium"
  }
]

export default function Analysis() {
  return (
    <div className="min-h-screen font-primary bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
            <path d="M0,500 C400,300 800,700 1200,400 L1200,800 L0,800 Z" fill="url(#analysisWave)" />
            <defs>
              <linearGradient id="analysisWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(210 98% 55%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Deep Market
              <span className="block text-green-400">
                Analysis
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Comprehensive insights into private equity market trends, key deals, 
              and strategic opportunities shaping investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Market Trends</h2>
            <p className="text-white/70">Latest sector performance and investment flows</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{trend.title}</CardTitle>
                    <div className={`flex items-center ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {trend.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      <span className="font-bold">{trend.change}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-4">{trend.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{trend.value}</div>
                      <div className="text-xs text-white/60">{trend.timeframe}</div>
                    </div>
                    <Badge variant="outline" className="border-gray-700 text-white/70">
                      {trend.timeframe}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Deals */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Deals</h2>
            <p className="text-white/70">Recent high-impact transactions</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {keyDeals.map((deal, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-xl">{deal.company}</CardTitle>
                      <CardDescription className="text-white/70">{deal.sector}</CardDescription>
                    </div>
                    <Badge className={deal.status === 'Closed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                      {deal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-white/60">Deal Value</div>
                      <div className="text-2xl font-bold text-white">{deal.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Lead Firm</div>
                      <div className="text-white font-medium">{deal.firm}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white/60 text-sm">{deal.date}</span>
                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                      View Details <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest News</h2>
            <p className="text-white/70">Breaking news and market updates</p>
          </div>
          
          <div className="space-y-6">
            {newsItems.map((news, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="border-gray-700 text-white/70">
                          {news.category}
                        </Badge>
                        <span className="text-white/60 text-sm">{news.time}</span>
                      </div>
                      <h3 className="text-white text-lg font-semibold mb-2">{news.headline}</h3>
                      <p className="text-white/70 mb-3">{news.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Source: {news.source}</span>
                        <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                          Read More <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* People & Company Profiles */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* People Profiles */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Key People</h2>
                <p className="text-white/70">Industry leaders and decision makers</p>
              </div>
              
              <div className="space-y-4">
                {peopleProfiles.map((person, index) => (
                  <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {person.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{person.name}</h3>
                          <p className="text-white/70 text-sm">{person.title} at {person.firm}</p>
                          <p className="text-green-400 text-sm">{person.specialty}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-green-400">
                          <User className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="text-white/60 text-sm">Recent Deal:</div>
                        <div className="text-white text-sm font-medium">{person.recentDeal}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Company Profiles */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Top Firms</h2>
                <p className="text-white/70">Leading private equity firms</p>
              </div>
              
              <div className="space-y-4">
                {companyProfiles.map((company, index) => (
                  <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{company.name}</h3>
                          <p className="text-white/70 text-sm">{company.headquarters} • Founded {company.founded}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white/70 text-sm">Top Performer</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-white/60 text-sm">AUM</div>
                          <div className="text-white font-bold">{company.aum}</div>
                        </div>
                        <div>
                          <div className="text-white/60 text-sm">Portfolio</div>
                          <div className="text-white">{company.portfolio}</div>
                        </div>
                        <div>
                          <div className="text-white/60 text-sm">Focus</div>
                          <div className="text-white">{company.focus}</div>
                        </div>
                        <div>
                          <div className="text-white/60 text-sm">Performance</div>
                          <div className="text-green-400 font-bold">{company.performance}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Investment Strategies</h2>
            <p className="text-white/70">Current market strategies and allocation recommendations</p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {investmentStrategies.map((strategy, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{strategy.strategy}</CardTitle>
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-6">{strategy.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Allocation</span>
                      <span className="text-white font-medium">{strategy.allocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Expected Return</span>
                      <span className="text-green-400 font-medium">{strategy.expectedReturn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Time Horizon</span>
                      <span className="text-white font-medium">{strategy.timeHorizon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Risk Level</span>
                      <Badge variant={strategy.riskLevel === 'Low-Medium' ? 'default' : strategy.riskLevel === 'Medium' ? 'secondary' : 'destructive'} className="text-xs">
                        {strategy.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}