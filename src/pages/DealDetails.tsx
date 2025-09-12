import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowLeft, Building2, TrendingUp, Calendar, DollarSign, Users, MapPin, FileText, Target, Briefcase, ExternalLink, Globe, ChevronRight, Award, Shield, Zap, BarChart3, PieChart, LineChart, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { keyDeals } from "./KeyDeals"
import { supabase } from "@/integrations/supabase/client"
import { generateSlug } from "@/lib/slugUtils"

// Enhanced deal data with placeholders for missing information
const enrichDealData = (deal: any) => ({
  ...deal,
  // Financial placeholders based on deal amount
  keyMetrics: {
    enterpriseValue: deal.amount,
    revenue: deal.totalFundingUSD ? `$${(parseFloat(deal.totalFundingUSD) * 2.2).toFixed(1)}M` : "$12.4M",
    ebitda: deal.totalFundingUSD ? `$${(parseFloat(deal.totalFundingUSD) * 0.8).toFixed(1)}M` : "$4.2M", 
    ebitdaMargin: "34.2%",
    revenueGrowth: deal.sector === "Software & Related" ? "127%" : "43%",
    customerRetention: deal.sector === "Software & Related" ? "94%" : "89%",
    grossMargin: deal.sector === "Software & Related" ? "82%" : "67%"
  },
  
  // Investment highlights based on sector
  highlights: deal.sector === "Software & Related" ? [
    "Market-leading AI technology platform with patent portfolio",
    "Strong recurring SaaS revenue model with 94% customer retention", 
    "Significant expansion opportunities in enterprise market",
    "Proven management team with previous successful exits",
    "Strategic partnerships with major tech companies"
  ] : deal.sector === "Healthcare" ? [
    "Breakthrough drug discovery technology platform",
    "Strong IP portfolio with 12+ patents pending",
    "Partnerships with major pharmaceutical companies", 
    "Experienced leadership team from Big Pharma",
    "Large addressable market opportunity ($50B+)"
  ] : deal.sector === "Food and Ag." ? [
    "Premium brand with strong consumer loyalty",
    "Omnichannel distribution strategy showing rapid growth",
    "Sustainable and innovative product portfolio", 
    "Experienced management team with CPG expertise",
    "Strong unit economics and scalable business model"
  ] : [
    "Strong market position with competitive moats",
    "Proven business model with recurring revenue",
    "Experienced leadership team with track record",
    "Significant market opportunity for expansion", 
    "Strong financial performance and unit economics"
  ],

  // Risk factors
  risks: [
    "Competitive pressure from larger industry players",
    "Market volatility and economic downturn risks",
    "Key person dependency and talent retention",
    "Technology disruption and obsolescence risk",
    "Regulatory and compliance challenges"
  ],

  // Investment thesis
  investmentThesis: `${deal.companyName} represents a compelling investment opportunity in the ${deal.sector.toLowerCase()} sector. The company's strong market position, innovative technology platform, and experienced management team position it well for significant growth and value creation.`,

  // Company background
  foundingYear: deal.description.includes("Founded in") ? 
    deal.description.match(/Founded in (\d{4})/)?.[1] : "2015",
  
  // Deal structure placeholders
  dealStructure: {
    buyer: deal.firms[0] || "Lead Investor",
    seller: "Founders & Early Investors", 
    advisors: {
      financial: "Goldman Sachs",
      legal: "Kirkland & Ellis",
      technical: "McKinsey & Company"
    }
  },

  // Timeline
  timeline: [
    { date: "Q1 2024", event: "Initial Due Diligence", status: "completed" },
    { date: "Q2 2024", event: "Term Sheet Signed", status: "completed" },
    { date: "Q3 2024", event: "Final Due Diligence", status: "completed" },
    { date: deal.date, event: "Deal Closed", status: "completed" }
  ]
})

export default function DealDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deal, setDeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  console.log('DealDetails - ID from params:', id)

  useEffect(() => {
    const fetchDeal = async () => {
      if (!id) return
      
      setLoading(true)
      try {
        // First try to find in hardcoded data
        const hardcodedDeal = keyDeals.find(d => d.id === id)
        
        if (hardcodedDeal) {
          setDeal(hardcodedDeal)
        } else {
          // Try to fetch from database using deal_id
          const { data: rawData, error } = await supabase
            .from('deals')
            .select(`
              *,
              deals_companies!deals_company_id_fkey(name, description, website, country, region)
            `)
            .eq('deal_id', id)
          
          // Handle potential duplicates by taking the first result
          const data = Array.isArray(rawData) ? rawData[0] : rawData
          
          if (error) {
            console.error('Error fetching deal:', error)
            setDeal(null)
          } else if (data) {
            // Transform database deal to match expected format
            const transformedDeal = {
              id: data.deal_id,
              title: data.deal_name,
              companyName: data.deals_companies?.name || data.deal_name || 'Unknown Company',
              amount: data.deal_value_formatted || `$${(data.deal_value_usd / 1000000).toFixed(1)}M`,
              sector: 'Consumer Discretionary',
              stage: data.stage_label || data.deal_status || 'Growth',
              date: new Date(data.announcement_date).getFullYear().toString(),
              location: `${data.city || ''}, ${data.state_province || ''}, ${data.country || ''}`.replace(/^,\s*|,\s*$/g, ''),
              description: data.description || 'Automotive industry investment opportunity',
              firms: ['Private Equity Firm'] // Placeholder since we don't have investor data
            }
            setDeal(transformedDeal)
          }
        }
      } catch (error) {
        console.error('Error in fetchDeal:', error)
        setDeal(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDeal()
  }, [id])

  console.log('DealDetails - found deal:', deal)

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <section className="pt-32 pb-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Loading Deal...</h1>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  // If no deal found after loading, show error
  if (!deal) {
    console.log('DealDetails - No deal found for id:', id)
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <section className="pt-32 pb-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Deal Not Found</h1>
            <p className="text-white/70 mb-8">The requested deal could not be found. ID: {id}</p>
            <Button onClick={() => navigate('/key-deals')} className="bg-blue-600 hover:bg-blue-700">
              Back to Key Deals
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  // Enrich the deal data with placeholders
  const [enrichedDeal, setEnrichedDeal] = useState<any>(enrichDealData(deal))

  useEffect(() => {
    const map: Record<string, string> = {
      '1': 'zenscreen-deal-2024',
      '2': 'vanleeuwen-deal-2024',
      '3': 'coniferpoint-deal-2024',
      '4': 'omniview-deal-2024'
    }
    const slug = id ? map[id] : undefined
    const base = enrichDealData(deal)
    setEnrichedDeal(base)
    if (!slug) return

    const formatUsd = (n?: number | null) => {
      if (!n) return undefined
      try {
        return '$' + Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(n))
      } catch {
        return `$${n}`
      }
    }

    const fetchData = async () => {
      const { data: dealRow, error } = await supabase
        .from('deals')
        .select('*')
        .eq('deal_id', slug)
        .maybeSingle()

      if (error) {
        console.error('Fetch deal error:', error)
        return
      }
      if (!dealRow) return

      const merged: any = {
        ...base,
        title: dealRow.deal_name ?? base.title,
        status: dealRow.deal_status ?? base.status,
        amount: dealRow.deal_value_formatted ?? formatUsd((dealRow as any).deal_value_usd) ?? base.amount,
        date: (dealRow as any).announcement_date ?? (dealRow as any).closing_date ?? base.date,
        stage: (dealRow as any).stage_label ?? (dealRow as any).transaction_type ?? base.stage,
        description: dealRow.description ?? base.description,
        location: [dealRow.city, dealRow.state_province, dealRow.country].filter(Boolean).join(', ') || base.location,
        region: dealRow.region ?? base.region,
        multiple: (dealRow as any).multiple_label ?? base.multiple,
      }

      const { data: idRow } = await supabase
        .from('deals')
        .select('id')
        .eq('deal_id', slug)
        .maybeSingle()

      if (idRow?.id) {
        const { data: participation } = await supabase
          .from('deals_deal_investors')
          .select('investor_id, role')
          .eq('deal_id', idRow.id)

        if (participation?.length) {
          const investorIds = participation.map((p: any) => p.investor_id).filter(Boolean)
          if (investorIds.length) {
            const { data: investors } = await supabase
              .from('deals_investors')
              .select('id, name')
              .in('id', investorIds)
            if (investors) {
              merged.firms = investors.map(i => i.name)
              let lead = participation.find((p: any) => p.role === 'lead')
              if (!lead) lead = participation[0]
              if (lead) {
                const leadName = investors.find(i => i.id === lead.investor_id)?.name
                if (leadName) merged.leadPartners = leadName
              }
            }
          }
        }
      }

      setEnrichedDeal(merged)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      <Navigation />
      
      {/* Enhanced Header with Gradient */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Button 
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-8 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Key Deals
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/company/${generateSlug(enrichedDeal.companyName)}`)}>
                    {enrichedDeal.companyName}
                  </h1>
                  <Badge 
                    className={`px-4 py-2 text-lg font-medium ${
                      enrichedDeal.status === 'Completed' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    }`}
                  >
                    {enrichedDeal.status}
                  </Badge>
                </div>
                <p className="text-2xl font-semibold text-gray-300 mb-4">{enrichedDeal.stage} Investment</p>
                <p className="text-lg text-gray-400 leading-relaxed mb-6 max-w-3xl">
                  {enrichedDeal.description}
                </p>
              </div>

              {/* Key Metrics Dashboard */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-300 text-sm font-medium">Enterprise Value</p>
                        <p className="text-2xl font-bold text-white">{enrichedDeal.keyMetrics.enterpriseValue}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-300 text-sm font-medium">Revenue Growth</p>
                        <p className="text-2xl font-bold text-white">+{enrichedDeal.keyMetrics.revenueGrowth}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-300 text-sm font-medium">EBITDA Margin</p>
                        <p className="text-2xl font-bold text-white">{enrichedDeal.keyMetrics.ebitdaMargin}</p>
                      </div>
                      <PieChart className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{enrichedDeal.location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-green-400" />
                  <span>Founded {enrichedDeal.foundingYear}</span>
                </div>
                {enrichedDeal.website && (
                  <div className="flex items-center text-gray-300">
                    <Globe className="w-5 h-5 mr-2 text-purple-400" />
                    <a 
                      href={`https://${enrichedDeal.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors hover:underline"
                    >
                      {enrichedDeal.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Summary Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 sticky top-8">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-center text-lg">Deal Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center pb-4 border-b border-gray-700">
                    <div className="text-5xl font-bold text-white mb-2">{enrichedDeal.amount}</div>
                    <div className="text-gray-400 font-medium">Transaction Value</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Sector</span>
                      <Badge variant="outline" className="text-white border-gray-600">
                        {enrichedDeal.sector}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Stage</span>
                      <span className="text-white font-medium">{enrichedDeal.stage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Region</span>
                      <span className="text-white font-medium">{enrichedDeal.region}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Multiple</span>
                      <span className="text-white font-medium">{enrichedDeal.multiple}</span>
                    </div>
                    {enrichedDeal.totalFundingUSD && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Funding</span>
                        <span className="text-green-400 font-medium">${enrichedDeal.totalFundingUSD}M</span>
                      </div>
                    )}
                  </div>

                  {enrichedDeal.leadPartners && (
                    <div className="pt-4 border-t border-gray-700">
                      <div className="text-gray-400 text-sm mb-2">Lead Partners</div>
                      <div className="text-white font-medium">{enrichedDeal.leadPartners}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Financial Metrics Section */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Financial Performance</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <LineChart className="w-5 h-5 mr-2 text-blue-400" />
                  Revenue (LTM)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{enrichedDeal.keyMetrics.revenue}</div>
                <div className="text-green-400 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{enrichedDeal.keyMetrics.revenueGrowth} YoY
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2 text-green-400" />
                  EBITDA (LTM)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{enrichedDeal.keyMetrics.ebitda}</div>
                <div className="text-gray-400 text-sm">
                  {enrichedDeal.keyMetrics.ebitdaMargin} margin
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Gross Margin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{enrichedDeal.keyMetrics.grossMargin}</div>
                <div className="text-gray-400 text-sm">Strong profitability</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-teal-400" />
                  Retention Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{enrichedDeal.keyMetrics.customerRetention}</div>
                <div className="text-gray-400 text-sm">Customer loyalty</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Highlights & Risks */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Investment Highlights */}
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-800/20 border-green-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-2xl">
                  <Award className="w-6 h-6 mr-3 text-green-400" />
                  Investment Highlights
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Key value drivers and strategic advantages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrichedDeal.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                      <span className="text-gray-200 leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Risks */}
            <Card className="bg-gradient-to-br from-orange-900/20 to-red-800/20 border-orange-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-2xl">
                  <Shield className="w-6 h-6 mr-3 text-orange-400" />
                  Key Risk Factors
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Important considerations and mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrichedDeal.risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                      <span className="text-gray-200 leading-relaxed">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Thesis */}
          <Card className="mt-12 bg-gradient-to-br from-blue-900/20 to-indigo-800/20 border-blue-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-2xl">
                <Target className="w-6 h-6 mr-3 text-blue-400" />
                Investment Thesis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 text-lg leading-relaxed">
                {enrichedDeal.investmentThesis}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Deal Timeline & Structure */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Deal Timeline */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-2xl">
                  <Calendar className="w-6 h-6 mr-3 text-purple-400" />
                  Deal Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {enrichedDeal.timeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${
                        event.status === 'completed' ? 'bg-green-400' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{event.event}</div>
                        <div className="text-gray-400 text-sm">{event.date}</div>
                      </div>
                      {index < enrichedDeal.timeline.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Deal Structure */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-2xl">
                  <Briefcase className="w-6 h-6 mr-3 text-teal-400" />
                  Deal Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-gray-400 text-sm mb-2">Lead Investor</div>
                  <div className="text-white font-medium text-lg">{enrichedDeal.dealStructure.buyer}</div>
                </div>
                <Separator className="bg-gray-700" />
                <div>
                  <div className="text-gray-400 text-sm mb-2">Selling Parties</div>
                  <div className="text-white font-medium">{enrichedDeal.dealStructure.seller}</div>
                </div>
                <Separator className="bg-gray-700" />
                <div>
                  <div className="text-gray-400 text-sm mb-3">Advisory Team</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Financial Advisor:</span>
                      <span className="text-white">{enrichedDeal.dealStructure.advisors.financial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Legal Counsel:</span>
                      <span className="text-white">{enrichedDeal.dealStructure.advisors.legal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Strategic Advisor:</span>
                      <span className="text-white">{enrichedDeal.dealStructure.advisors.technical}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Investors Section */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-800/20 border-purple-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-2xl mb-2">
                <Users className="w-6 h-6 mr-3 text-purple-400" />
                Participating Investors
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {enrichedDeal.firms.length} investment firms and organizations involved in this deal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {enrichedDeal.firms.map((firm, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-white border-purple-600/50 bg-purple-900/20 hover:bg-purple-800/30 transition-all duration-300 p-3 text-center justify-center hover:scale-105"
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