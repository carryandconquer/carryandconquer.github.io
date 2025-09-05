import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Building2, TrendingUp, Calendar, DollarSign, Users, MapPin, FileText, Target, Briefcase, ExternalLink, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { keyDeals } from "./KeyDeals"

export default function DealDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find the deal from our real data
  const deal = keyDeals.find(d => d.id === id)

  // If no deal found, show error
  if (!deal) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <section className="pt-32 pb-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Deal Not Found</h1>
            <p className="text-white/70 mb-8">The requested deal could not be found.</p>
            <Button onClick={() => navigate('/key-deals')} className="bg-blue-600 hover:bg-blue-700">
              Back to Key Deals
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    )
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
                  {deal.stage}
                </div>
                {deal.website && (
                  <div className="flex items-center text-white/70">
                    <Globe className="w-4 h-4 mr-2" />
                    <a href={`https://${deal.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {deal.website}
                    </a>
                  </div>
                )}
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
                  <span className="text-white/70">Stage:</span>
                  <span className="text-white font-medium">{deal.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sector:</span>
                  <span className="text-white font-medium">{deal.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Region:</span>
                  <span className="text-white font-medium">{deal.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Status:</span>
                  <span className="text-white font-medium">{deal.investmentStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Overview */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Company Information */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-400" />
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/70">Company Name:</span>
                  <span className="text-white font-medium">{deal.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Primary Industry:</span>
                  <span className="text-white font-medium">{deal.primaryIndustry}</span>
                </div>
                <div className="flex justify-between flex-col items-start">
                  <span className="text-white/70 mb-2">Sub-Industries:</span>
                  <span className="text-white font-medium text-sm">{deal.subIndustries}</span>
                </div>
                {deal.website && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Website:</span>
                    <a 
                      href={`https://${deal.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      {deal.website}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}
                {deal.totalFundingUSD && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Funding:</span>
                    <span className="text-green-400 font-medium">${deal.totalFundingUSD}M</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Investment Information */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/70">Deal Value:</span>
                  <span className="text-white font-medium">{deal.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Year:</span>
                  <span className="text-white font-medium">{deal.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Multiple:</span>
                  <span className="text-white font-medium">{deal.multiple}</span>
                </div>
                {deal.leadPartners && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Lead Partners:</span>
                    <span className="text-white font-medium">{deal.leadPartners}</span>
                  </div>
                )}
                {deal.boardReps && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Board Reps:</span>
                    <span className="text-white font-medium">{deal.boardReps}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="py-12 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Participating Investors
              </CardTitle>
              <CardDescription className="text-white/70">
                Investment firms and organizations involved in this deal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {deal.firms.map((firm, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-white border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    {firm}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}