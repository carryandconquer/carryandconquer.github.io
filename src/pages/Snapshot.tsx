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
                <SelectContent className="bg-gray-900 border-gray-700 text-white z-50">
                  <SelectItem value="all-regions">All Regions</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                  <SelectItem value="emerging-asia">Emerging Asia</SelectItem>
                  <SelectItem value="latin-america">Latin America</SelectItem>
                  <SelectItem value="middle-east-africa">Middle East & Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">COUNTRY</label>
              <Select defaultValue="all-countries">
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white z-50 max-h-60 overflow-y-auto">
                  <SelectItem value="all-countries">All Countries</SelectItem>
                  
                  {/* North America */}
                  <SelectItem value="united-states" className="text-green-400 font-medium">🍁 North America</SelectItem>
                  <SelectItem value="canada" className="pl-6">Canada</SelectItem>
                  <SelectItem value="mexico" className="pl-6">Mexico</SelectItem>
                  <SelectItem value="usa" className="pl-6">United States</SelectItem>
                  
                  {/* Europe */}
                  <SelectItem value="europe-header" className="text-blue-400 font-medium">🇪🇺 Europe</SelectItem>
                  <SelectItem value="austria" className="pl-6">Austria</SelectItem>
                  <SelectItem value="belgium" className="pl-6">Belgium</SelectItem>
                  <SelectItem value="denmark" className="pl-6">Denmark</SelectItem>
                  <SelectItem value="finland" className="pl-6">Finland</SelectItem>
                  <SelectItem value="france" className="pl-6">France</SelectItem>
                  <SelectItem value="germany" className="pl-6">Germany</SelectItem>
                  <SelectItem value="ireland" className="pl-6">Ireland</SelectItem>
                  <SelectItem value="italy" className="pl-6">Italy</SelectItem>
                  <SelectItem value="netherlands" className="pl-6">Netherlands</SelectItem>
                  <SelectItem value="norway" className="pl-6">Norway</SelectItem>
                  <SelectItem value="poland" className="pl-6">Poland</SelectItem>
                  <SelectItem value="portugal" className="pl-6">Portugal</SelectItem>
                  <SelectItem value="spain" className="pl-6">Spain</SelectItem>
                  <SelectItem value="sweden" className="pl-6">Sweden</SelectItem>
                  <SelectItem value="switzerland" className="pl-6">Switzerland</SelectItem>
                  <SelectItem value="uk" className="pl-6">United Kingdom</SelectItem>
                  
                  {/* Asia Pacific */}
                  <SelectItem value="asia-pacific-header" className="text-purple-400 font-medium">🌏 Asia Pacific</SelectItem>
                  <SelectItem value="australia" className="pl-6">Australia</SelectItem>
                  <SelectItem value="hong-kong" className="pl-6">Hong Kong</SelectItem>
                  <SelectItem value="japan" className="pl-6">Japan</SelectItem>
                  <SelectItem value="new-zealand" className="pl-6">New Zealand</SelectItem>
                  <SelectItem value="singapore" className="pl-6">Singapore</SelectItem>
                  <SelectItem value="south-korea" className="pl-6">South Korea</SelectItem>
                  <SelectItem value="taiwan" className="pl-6">Taiwan</SelectItem>
                  
                  {/* Emerging Asia */}
                  <SelectItem value="emerging-asia-header" className="text-yellow-400 font-medium">🌅 Emerging Asia</SelectItem>
                  <SelectItem value="china" className="pl-6">China</SelectItem>
                  <SelectItem value="india" className="pl-6">India</SelectItem>
                  <SelectItem value="indonesia" className="pl-6">Indonesia</SelectItem>
                  <SelectItem value="malaysia" className="pl-6">Malaysia</SelectItem>
                  <SelectItem value="philippines" className="pl-6">Philippines</SelectItem>
                  <SelectItem value="thailand" className="pl-6">Thailand</SelectItem>
                  <SelectItem value="vietnam" className="pl-6">Vietnam</SelectItem>
                  
                  {/* Latin America */}
                  <SelectItem value="latin-america-header" className="text-orange-400 font-medium">🌎 Latin America</SelectItem>
                  <SelectItem value="argentina" className="pl-6">Argentina</SelectItem>
                  <SelectItem value="brazil" className="pl-6">Brazil</SelectItem>
                  <SelectItem value="chile" className="pl-6">Chile</SelectItem>
                  <SelectItem value="colombia" className="pl-6">Colombia</SelectItem>
                  <SelectItem value="costa-rica" className="pl-6">Costa Rica</SelectItem>
                  <SelectItem value="panama" className="pl-6">Panama</SelectItem>
                  <SelectItem value="peru" className="pl-6">Peru</SelectItem>
                  <SelectItem value="uruguay" className="pl-6">Uruguay</SelectItem>
                  
                  {/* Middle East & Africa */}
                  <SelectItem value="mea-header" className="text-red-400 font-medium">🌍 Middle East & Africa</SelectItem>
                  <SelectItem value="egypt" className="pl-6">Egypt</SelectItem>
                  <SelectItem value="israel" className="pl-6">Israel</SelectItem>
                  <SelectItem value="kenya" className="pl-6">Kenya</SelectItem>
                  <SelectItem value="morocco" className="pl-6">Morocco</SelectItem>
                  <SelectItem value="nigeria" className="pl-6">Nigeria</SelectItem>
                  <SelectItem value="qatar" className="pl-6">Qatar</SelectItem>
                  <SelectItem value="saudi-arabia" className="pl-6">Saudi Arabia</SelectItem>
                  <SelectItem value="south-africa" className="pl-6">South Africa</SelectItem>
                  <SelectItem value="uae" className="pl-6">UAE</SelectItem>
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