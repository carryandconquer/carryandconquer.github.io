import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Building, Clock, Target, Users, Briefcase, Zap, Globe } from "lucide-react"

const Snapshot = () => {
  const marketMetrics = [
    {
      icon: DollarSign,
      value: "$47.3B",
      label: "Transaction Volume",
      sublabel: "Value & number of transactions",
      change: "+18.5%",
      isPositive: true
    },
    {
      icon: Building,
      value: "324",
      label: "New Deals",
      sublabel: "Deals newly announced",
      change: "+12.7%",
      isPositive: true
    },
    {
      icon: Clock,
      value: "89",
      label: "Avg Days to Close",
      sublabel: "Time to transaction",
      change: "-8.3%",
      isPositive: false
    },
    {
      icon: Target,
      value: "14.2x",
      label: "Exit Multiple",
      sublabel: "Average across major funds",
      change: "+5.9%",
      isPositive: true
    }
  ]

  const investmentMetrics = [
    {
      icon: Globe,
      value: "12.8%",
      label: "Average IRR",
      sublabel: "Weighted by fund size",
      change: "+1.2%",
      isPositive: true
    },
    {
      icon: Briefcase,
      value: "3.2%",
      label: "Management Fee",
      sublabel: "Standard across funds",
      change: "-0.1%",
      isPositive: false
    },
    {
      icon: Zap,
      value: "$892B",
      label: "Dry Powder",
      sublabel: "Available capital deployment",
      change: "+22.4%",
      isPositive: true
    },
    {
      icon: Users,
      value: "67.5%",
      label: "Deployment Rate",
      sublabel: "Capital deployed vs committed",
      change: "+15.8%",
      isPositive: true
    }
  ]

  const additionalMetrics = [
    { value: "8.5%", label: "Fund Carry Rate", sublabel: "Standard carried interest" },
    { value: "78%", label: "% Deals Leveraged", sublabel: "Share of leveraged transactions" },
    { value: "425 bps", label: "Credit Spread", sublabel: "vs 10-year treasury" }
  ]

  const trendingPeople = [
    {
      initials: "JB",
      name: "Jennifer Brooks",
      title: "Managing Partner",
      firm: "Apollo Global Management",
      achievement: "Led $3.2B healthcare buyout",
      sector: "Healthcare & Technology"
    },
    {
      initials: "MR",
      name: "Michael Rivera",
      title: "Senior Partner",
      firm: "KKR & Co",
      achievement: "Closed $850M growth fund",
      sector: "Growth Equity"
    },
    {
      initials: "SL",
      name: "Sarah Liu",
      title: "Investment Director",
      firm: "Blackstone",
      achievement: "Structured €1.2B infrastructure deal",
      sector: "Infrastructure"
    },
    {
      initials: "DK",
      name: "David Kim",
      title: "Principal",
      firm: "Carlyle Group",
      achievement: "Pioneering ESG-focused investments",
      sector: "Sustainable Investing"
    }
  ]

  const trendingProjects = [
    { status: "Due Diligence", icon: Building },
    { status: "Portfolio Growth", icon: TrendingUp },
    { status: "Pre-Exit", icon: Target },
    { status: "Capital Deployment", icon: DollarSign }
  ]

  return (
    <div className="min-h-screen bg-black text-white font-primary pt-24">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Market Snapshot</h1>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">REGION</label>
              <Select defaultValue="all-regions">
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-regions">All Regions</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">COUNTRY</label>
              <Select defaultValue="all-countries">
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-countries">All Countries</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">SECTOR</label>
              <Select defaultValue="all-sectors">
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sectors">All Sectors</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">SUB-SECTOR</label>
              <Select defaultValue="all-sub-sectors">
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sub-sectors">All Sub-Sectors</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="biotech">Biotech</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="commercial">Commercial RE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">TERTIARY SECTOR</label>
              <Select defaultValue="all-tertiary">
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-tertiary">All Tertiary</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Market Activity */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Market Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <metric.icon className="w-6 h-6 text-accent-green" />
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {metric.change}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">{metric.value}</div>
                    <div className="text-lg font-semibold text-white">{metric.label}</div>
                    <div className="text-sm text-white/60">{metric.sublabel}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Investment Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <metric.icon className="w-6 h-6 text-accent-green" />
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {metric.change}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">{metric.value}</div>
                    <div className="text-lg font-semibold text-white">{metric.label}</div>
                    <div className="text-sm text-white/60">{metric.sublabel}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Metrics */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-lg font-semibold text-white">{metric.label}</div>
                    <div className="text-sm text-white/60">{metric.sublabel}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending People */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending People</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingPeople.map((person, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-green to-accent-teal rounded-full flex items-center justify-center text-black font-bold">
                      {person.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-accent-green font-medium">{person.sector}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-bold text-white">{person.name}</div>
                    <div className="text-sm text-white/80">{person.title}</div>
                    <div className="text-sm text-accent-green">{person.firm}</div>
                    <div className="text-sm text-white/60">{person.achievement}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Trending Project Stages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProjects.map((project, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <project.icon className="w-8 h-8 text-accent-green" />
                    <div className="font-semibold text-white">{project.status}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Snapshot