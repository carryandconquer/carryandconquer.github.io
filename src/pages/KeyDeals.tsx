import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Building2, DollarSign, ArrowRight, ExternalLink } from "lucide-react"

const keyDeals = [
  {
    title: "Vista Equity Partners Acquires Solera",
    amount: "$6.5B",
    date: "March 2024",
    sector: "Technology",
    description: "Vista's acquisition of automotive software provider Solera in a take-private transaction.",
    status: "Completed",
    firms: ["Vista Equity Partners"],
    multiple: "12.3x"
  },
  {
    title: "Blackstone's Retail Portfolio Exit",
    amount: "$4.2B",
    date: "February 2024",
    sector: "Retail",
    description: "Strategic exit of retail portfolio companies generating significant returns for LPs.",
    status: "Completed",
    firms: ["Blackstone"],
    multiple: "8.7x"
  },
  {
    title: "KKR Healthcare Acquisition",
    amount: "$3.8B",
    date: "January 2024",
    sector: "Healthcare",
    description: "Acquisition of leading healthcare services provider with strong recurring revenue model.",
    status: "Pending",
    firms: ["KKR"],
    multiple: "14.2x"
  },
  {
    title: "Apollo Infrastructure Investment",
    amount: "$5.1B",
    date: "December 2023",
    sector: "Infrastructure",
    description: "Major infrastructure investment in renewable energy assets across North America.",
    status: "Completed",
    firms: ["Apollo Global Management"],
    multiple: "9.4x"
  }
]

export default function KeyDeals() {
  return (
    <div className="min-h-screen font-primary bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-black">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
            <path d="M0,600 C300,400 700,800 1200,500 L1200,800 L0,800 Z" fill="url(#keyDealsWave)" />
            <defs>
              <linearGradient id="keyDealsWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(210 98% 55%)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-16 right-16 w-28 h-28 bg-blue-500/20 rounded-3xl rotate-12 animate-float"></div>
        <div className="absolute top-40 left-20 w-20 h-40 bg-green-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-teal-500/20 rounded-2xl -rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Key
              <span className="block text-green-400">
                Deals
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Track the most significant private equity transactions, from mega-deals 
              to strategic acquisitions shaping the market landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Deal Analytics Overview */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lift border border-gray-800">
              <div className="text-4xl font-bold text-white mb-2">
                $847B
              </div>
              <div className="text-white/70 font-medium">Total Deal Value</div>
            </div>
            <div className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lift border border-gray-800">
              <div className="text-4xl font-bold text-green-400 mb-2">
                2,543
              </div>
              <div className="text-white/70 font-medium">Transactions</div>
            </div>
            <div className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lift border border-gray-800">
              <div className="text-4xl font-bold text-teal-400 mb-2">
                11.2x
              </div>
              <div className="text-white/70 font-medium">Avg Multiple</div>
            </div>
            <div className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lift border border-gray-800">
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                +23%
              </div>
              <div className="text-white/70 font-medium">YoY Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Key Deals */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Recent Transactions
            </h2>
            <p className="text-xl text-white/70">
              Latest high-impact deals in the private equity market
            </p>
          </div>

          <div className="space-y-6">
            {keyDeals.map((deal, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-1 bg-gray-900/50 backdrop-blur-sm border-gray-800"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <CardTitle className="text-2xl font-bold text-white">
                          {deal.title}
                        </CardTitle>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          deal.status === 'Completed' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {deal.status}
                        </div>
                      </div>
                      <CardDescription className="text-white/70 leading-relaxed mb-4">
                        {deal.description}
                      </CardDescription>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-white">
                        {deal.amount}
                      </div>
                      <div className="text-sm text-white/70">{deal.date}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <div className="text-sm text-white/70 mb-1">Sector</div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-green-400" />
                        <span className="font-medium text-white">{deal.sector}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">Multiple</div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-teal-400" />
                        <span className="font-medium text-white">{deal.multiple}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">Lead Firm</div>
                      <div className="font-medium text-white">{deal.firms[0]}</div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
                      >
                        View Details
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Flow Trends */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Market Trends
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-lift border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Deal Volume by Sector</h3>
              <div className="space-y-4">
                {[
                  { sector: "Technology", percentage: 34, color: "green-400" },
                  { sector: "Healthcare", percentage: 28, color: "teal-400" },
                  { sector: "Financial Services", percentage: 22, color: "cyan-400" },
                  { sector: "Consumer", percentage: 16, color: "blue-400" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 bg-${item.color} rounded-full mr-3`}></div>
                      <span className="text-white font-medium">{item.sector}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden w-24">
                        <div 
                          className={`h-full bg-${item.color} rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-white/70 font-medium w-8">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-lift border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Average Deal Size Trend</h3>
              <div className="h-48 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-2xl flex items-end justify-around p-4">
                <div className="w-8 bg-gradient-to-t from-green-500/50 to-green-500 h-24 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-green-500/50 to-green-500 h-32 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-green-500/50 to-green-500 h-28 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-green-500/50 to-green-500 h-36 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-green-500/50 to-green-500 h-40 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-green-500/50 to-green-500 h-44 rounded-t"></div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-white/70 text-sm">Consistent growth in average deal sizes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}