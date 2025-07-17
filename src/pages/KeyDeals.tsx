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
    <div className="min-h-screen font-primary bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Floating Geometric Elements */}
        <div className="absolute top-16 right-16 w-28 h-28 bg-primary/20 rounded-3xl rotate-12 animate-float"></div>
        <div className="absolute top-40 left-20 w-20 h-40 bg-accent-green/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-accent-gold/20 rounded-2xl -rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Key
              <span className="block bg-gradient-text bg-clip-text text-transparent">
                Deals
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Track the most significant private equity transactions, from mega-deals 
              to strategic acquisitions shaping the market landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Deal Analytics Overview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-8 bg-background rounded-3xl shadow-card border border-border/50">
              <div className="text-4xl font-bold bg-gradient-text bg-clip-text text-transparent mb-2">
                $847B
              </div>
              <div className="text-muted-foreground font-medium">Total Deal Value</div>
            </div>
            <div className="text-center p-8 bg-background rounded-3xl shadow-card border border-border/50">
              <div className="text-4xl font-bold text-primary mb-2">
                2,543
              </div>
              <div className="text-muted-foreground font-medium">Transactions</div>
            </div>
            <div className="text-center p-8 bg-background rounded-3xl shadow-card border border-border/50">
              <div className="text-4xl font-bold text-accent-green mb-2">
                11.2x
              </div>
              <div className="text-muted-foreground font-medium">Avg Multiple</div>
            </div>
            <div className="text-center p-8 bg-background rounded-3xl shadow-card border border-border/50">
              <div className="text-4xl font-bold text-accent-gold mb-2">
                +23%
              </div>
              <div className="text-muted-foreground font-medium">YoY Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Key Deals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Recent Transactions
            </h2>
            <p className="text-xl text-muted-foreground">
              Latest high-impact deals in the private equity market
            </p>
          </div>

          <div className="space-y-6">
            {keyDeals.map((deal, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <CardTitle className="text-2xl font-bold text-card-foreground">
                          {deal.title}
                        </CardTitle>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          deal.status === 'Completed' 
                            ? 'bg-accent-green/10 text-accent-green' 
                            : 'bg-accent-gold/10 text-accent-gold'
                        }`}>
                          {deal.status}
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                        {deal.description}
                      </CardDescription>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold bg-gradient-text bg-clip-text text-transparent">
                        {deal.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">{deal.date}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Sector</div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium text-foreground">{deal.sector}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Multiple</div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-accent-green" />
                        <span className="font-medium text-foreground">{deal.multiple}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Lead Firm</div>
                      <div className="font-medium text-foreground">{deal.firms[0]}</div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
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
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Market Trends
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-background rounded-3xl p-8 shadow-card border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Deal Volume by Sector</h3>
              <div className="space-y-4">
                {[
                  { sector: "Technology", percentage: 34, color: "primary" },
                  { sector: "Healthcare", percentage: 28, color: "accent-green" },
                  { sector: "Financial Services", percentage: 22, color: "accent-gold" },
                  { sector: "Consumer", percentage: 16, color: "accent-orange" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 bg-${item.color} rounded-full mr-3`}></div>
                      <span className="text-foreground font-medium">{item.sector}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`flex-1 h-2 bg-muted rounded-full overflow-hidden w-24`}>
                        <div 
                          className={`h-full bg-${item.color} rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-muted-foreground font-medium w-8">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background rounded-3xl p-8 shadow-card border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Average Deal Size Trend</h3>
              <div className="h-48 bg-gradient-to-br from-primary/5 to-accent-green/5 rounded-2xl flex items-end justify-around p-4">
                <div className="w-8 bg-gradient-to-t from-primary/50 to-primary h-24 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-primary/50 to-primary h-32 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-primary/50 to-primary h-28 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-primary/50 to-primary h-36 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-primary/50 to-primary h-40 rounded-t"></div>
                <div className="w-8 bg-gradient-to-t from-primary/50 to-primary h-44 rounded-t"></div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-muted-foreground text-sm">Consistent growth in average deal sizes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}