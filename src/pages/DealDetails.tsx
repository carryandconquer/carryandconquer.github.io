import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Building2, TrendingUp, Calendar, DollarSign, Users, MapPin, FileText, Target, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

export default function DealDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Placeholder deal data - in real app this would come from API/database
  const deal = {
    id: id || "1",
    title: "TechCorp Acquisition by Global Partners",
    status: "Completed",
    description: "Strategic acquisition of leading SaaS platform serving mid-market enterprises with comprehensive business automation solutions.",
    amount: "$2.4B",
    date: "March 15, 2024",
    sector: "Technology",
    multiple: "12.5x EBITDA",
    firms: ["KKR & Co.", "Bain Capital", "Vista Equity Partners"],
    location: "San Francisco, CA",
    dealType: "Buyout",
    closeDate: "March 15, 2024",
    announcementDate: "January 10, 2024",
    buyer: "Global Partners LP",
    seller: "TechCorp Holdings",
    advisors: {
      buyerAdvisor: "Goldman Sachs",
      sellerAdvisor: "Morgan Stanley",
      legalBuyer: "Kirkland & Ellis",
      legalSeller: "Latham & Watkins"
    },
    keyMetrics: {
      enterpriseValue: "$2.4B",
      revenue: "$420M",
      ebitda: "$192M",
      ebitdaMargin: "45.7%",
      revenueGrowth: "28%"
    },
    highlights: [
      "Market-leading position in business automation software",
      "Strong recurring revenue model with 95% retention rate",
      "Significant expansion opportunities in international markets",
      "Proven management team with track record of growth",
      "Strategic add-on acquisition potential"
    ],
    investmentThesis: "The acquisition represents a strategic opportunity to consolidate market share in the rapidly growing business automation sector while leveraging the target's strong technology platform and customer relationships.",
    risks: [
      "Integration complexity with existing portfolio companies",
      "Competitive pressure from larger enterprise software providers",
      "Customer concentration in specific industry verticals"
    ]
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Button 
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Key Deals
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {deal.title}
                </h1>
                <Badge 
                  variant="secondary"
                  className={`${
                    deal.status === 'Completed' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}
                >
                  {deal.status}
                </Badge>
              </div>
              <p className="text-xl text-white/70 leading-relaxed mb-6">
                {deal.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-white/70">
                  <MapPin className="w-4 h-4 mr-2" />
                  {deal.location}
                </div>
                <div className="flex items-center text-white/70">
                  <Calendar className="w-4 h-4 mr-2" />
                  {deal.date}
                </div>
                <div className="flex items-center text-white/70">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {deal.dealType}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 min-w-[300px]">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-white mb-2">{deal.amount}</div>
                <div className="text-white/70">Transaction Value</div>
              </div>
              <Separator className="bg-gray-800 mb-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Multiple:</span>
                  <span className="text-white font-medium">{deal.multiple}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sector:</span>
                  <span className="text-white font-medium">{deal.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Lead Firm:</span>
                  <span className="text-white font-medium">{deal.firms[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Overview */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Key Metrics */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                  Key Financials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/70">Enterprise Value:</span>
                  <span className="text-white font-medium">{deal.keyMetrics.enterpriseValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Revenue (LTM):</span>
                  <span className="text-white font-medium">{deal.keyMetrics.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">EBITDA (LTM):</span>
                  <span className="text-white font-medium">{deal.keyMetrics.ebitda}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">EBITDA Margin:</span>
                  <span className="text-white font-medium">{deal.keyMetrics.ebitdaMargin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Revenue Growth:</span>
                  <span className="text-green-400 font-medium">+{deal.keyMetrics.revenueGrowth}</span>
                </div>
              </CardContent>
            </Card>

            {/* Deal Parties */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  Deal Parties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-white/70 text-sm mb-1">Buyer:</div>
                  <div className="text-white font-medium">{deal.buyer}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Seller:</div>
                  <div className="text-white font-medium">{deal.seller}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Buyer Advisor:</div>
                  <div className="text-white font-medium">{deal.advisors.buyerAdvisor}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Seller Advisor:</div>
                  <div className="text-white font-medium">{deal.advisors.sellerAdvisor}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Legal Counsel:</div>
                  <div className="text-white font-medium text-sm">
                    {deal.advisors.legalBuyer} (Buyer)<br/>
                    {deal.advisors.legalSeller} (Seller)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                  Deal Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Announcement</div>
                    <div className="text-white/70 text-sm">{deal.announcementDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Closing</div>
                    <div className="text-white/70 text-sm">{deal.closeDate}</div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-white/70 text-sm mb-2">Participating Firms:</div>
                  <div className="space-y-1">
                    {deal.firms.map((firm, index) => (
                      <Badge key={index} variant="outline" className="text-white border-gray-700 mr-2 mb-1">
                        {firm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-12 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Highlights */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  Investment Highlights
                </CardTitle>
                <CardDescription className="text-white/70">
                  Key value drivers and strategic advantages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {deal.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Investment Thesis & Risks */}
            <div className="space-y-6">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" />
                    Investment Thesis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed">{deal.investmentThesis}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
                    Key Risks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {deal.risks.map((risk, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/90 text-sm">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}