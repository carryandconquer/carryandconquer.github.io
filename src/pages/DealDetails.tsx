import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowLeft, Building2, TrendingUp, Calendar, DollarSign, Users, MapPin, FileText, Target, Briefcase, ExternalLink, Globe, ChevronRight, Award, Shield, Zap, BarChart3, PieChart, LineChart, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { supabase } from "@/integrations/supabase/client"
import { generateSlug } from "@/lib/slugUtils"
import zenscreenLogo from "@/assets/zenscreen-logo.png"

// Enhanced deal data with placeholders for missing information
const enrichDealData = (deal: any) => {
  const formatUsd = (n?: number | null) => {
    if (n == null) return undefined
    try {
      return '$' + Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(n))
    } catch {
      return `$${n}`
    }
  }

  return {
    ...deal,
    keyMetrics: {
      enterpriseValue: deal.deal_value_formatted || formatUsd(deal.enterprise_value) || deal.amount || '$—',
      revenue: deal.revenue_ltm ? formatUsd(deal.revenue_ltm) : (deal.totalFundingUSD ? `$${(parseFloat(deal.totalFundingUSD) * 2.2).toFixed(1)}M` : '$12.4M'),
      ebitda: deal.ebitda_ltm ? formatUsd(deal.ebitda_ltm) : (deal.totalFundingUSD ? `$${(parseFloat(deal.totalFundingUSD) * 0.8).toFixed(1)}M` : '$4.2M'),
      ebitdaMargin: deal.ebitda_margin ? `${deal.ebitda_margin}%` : '34.2%',
      revenueGrowth: deal.revenue_growth_yoy ? `${deal.revenue_growth_yoy}%` : (deal.sector === 'Software & Related' ? '127%' : '43%'),
      customerRetention: deal.sector === 'Software & Related' ? '94%' : '89%',
      grossMargin: deal.sector === 'Software & Related' ? '82%' : '67%'
    },
    highlights: deal.sector === 'Software & Related' ? [
      'Market-leading AI technology platform with patent portfolio',
      'Strong recurring SaaS revenue model with 94% customer retention', 
      'Significant expansion opportunities in enterprise market',
      'Proven management team with previous successful exits',
      'Strategic partnerships with major tech companies'
    ] : deal.sector === 'Healthcare' ? [
      'Breakthrough drug discovery technology platform',
      'Strong IP portfolio with 12+ patents pending',
      'Partnerships with major pharmaceutical companies', 
      'Experienced leadership team from Big Pharma',
      'Large addressable market opportunity ($50B+)'
    ] : deal.sector === 'Food and Ag.' ? [
      'Premium brand with strong consumer loyalty',
      'Omnichannel distribution strategy showing rapid growth',
      'Sustainable and innovative product portfolio', 
      'Experienced management team with CPG expertise',
      'Strong unit economics and scalable business model'
    ] : [
      'Strong market position with competitive moats',
      'Proven business model with recurring revenue',
      'Experienced leadership team with track record',
      'Significant market opportunity for expansion', 
      'Strong financial performance and unit economics'
    ],
    // Risk factors
    risks: deal.risks || [
      'Competitive pressure from larger industry players',
      'Market volatility and economic downturn risks',
      'Key person dependency and talent retention',
      'Technology disruption and obsolescence risk',
      'Regulatory and compliance challenges'
    ],
            // Firms/Investors  
            firms: deal.firms || deal.investors || ['500 Startups', 'Bessemer Venture Partners', 'BMW i Ventures', 'Bullpen Capital'],
            investors: deal.investors || deal.firms || [
              '500 Startups', 'Bessemer Venture Partners', 'BMW i Ventures', 'Bullpen Capital', 
              'DCM', 'Duchossois Capital Management', 'EchoVC Partners', 'Fontinalis Partners',
              'Hinge Capital', 'Kapor Capital', 'LaunchCapital Ventures', 'Life360 Inc',
              'Seraph Group', 'Social Leverage Capital'
            ],
    // Deal Structure (safe defaults)
    dealStructure: deal.dealStructure || {
      buyer: (deal.firms && deal.firms[0]) || 'Lead Investor',
      seller: 'Founders & Early Investors',
      advisors: {
        financial: 'Goldman Sachs',
        legal: 'Kirkland & Ellis',
        technical: 'McKinsey & Company'
      }
    },
    // Other missing properties with defaults
    status: deal.status || deal.deal_status || 'Completed',
    stage: deal.stage || deal.stage_label || deal.transaction_type || 'Growth',
    companyName: deal.companyName || deal.title || deal.deal_name || 'Company',
    region: deal.region || 'North America',
    multiple: deal.multiple || 'N/A',
    sector: deal.sector || 'Consumer Discretionary'
  }
}

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
        // Fetch from database using deal_id
        const { data: rawData, error } = await supabase
          .from('deals')
          .select('*')
          .eq('deal_id', id)
          .eq('published', true)
        
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
            companyName: data.company_name || data.deal_name || 'ZenScreen',
            amount: data.deal_value_formatted || (data.deal_value_usd ? ('$' + (Number(data.deal_value_usd) / 1_000_000).toFixed(1) + 'M') : 'Undisclosed'),
            sector: data.sector || 'Software & Related',
            stage: data.stage_label || data.deal_status || 'Add-on',
            date: data.announcement_date ? new Date(data.announcement_date).getFullYear().toString() : '2024',
            location: `${data.city || 'San Jose'}, ${data.state_province || 'California'}, ${data.country || 'US'}`.replace(/^,\s*|,\s*$/g, ''),
            description: data.description || 'Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage. The platform also offers digital-dieting features that include App Analytics, App Categories, Smart Mornings, Calm Nights, Zen breaks, Daily Time Limit, Quiet Time, and Screen Sense.',
            website: data.website || 'www.zenscreen.ai',
            enterprise_value: data.enterprise_value,
            revenue_ltm: data.revenue_ltm,
            ebitda_ltm: data.ebitda_ltm,
            ebitda_margin: data.ebitda_margin,
            revenue_growth_yoy: data.revenue_growth_yoy,
            firms: ['500 Startups', 'Bessemer Venture Partners', 'BMW i Ventures', 'Bullpen Capital'],
            investors: [
              '500 Startups', 'Bessemer Venture Partners', 'BMW i Ventures', 'Bullpen Capital', 
              'DCM', 'Duchossois Capital Management', 'EchoVC Partners', 'Fontinalis Partners',
              'Hinge Capital', 'Kapor Capital', 'LaunchCapital Ventures', 'Life360 Inc',
              'Seraph Group', 'Social Leverage Capital'
            ]
          }
          setDeal(transformedDeal)
        } else {
          setDeal(null)
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
  const enrichedDeal = enrichDealData(deal)

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Enhanced Header with Design System */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 animate-fade-in">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-8 border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Key Deals
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 animate-slide-up">
              <div className="mb-8">
                <div className="flex items-center gap-6 mb-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-glow hover:scale-105 transition-transform duration-300 p-3">
                      <img 
                        src={zenscreenLogo} 
                        alt="ZenScreen Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-text bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => navigate(`/company/${generateSlug(enrichedDeal.companyName)}`)}>
                      {enrichedDeal.companyName}
                    </h1>
                    <Badge 
                      className={`mt-2 px-4 py-2 text-lg font-medium shadow-glow ${
                        enrichedDeal.status === 'Completed' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      {enrichedDeal.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-2xl font-semibold text-muted-foreground mb-4">{enrichedDeal.stage} Investment</p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  {enrichedDeal.description}
                </p>
              </div>

              {/* Key Metrics Dashboard */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent-cyan text-sm font-medium mb-2">Enterprise Value</p>
                        <p className="text-2xl font-bold text-foreground group-hover:text-accent-cyan transition-colors">
                          {enrichedDeal.keyMetrics.enterpriseValue}
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-accent-cyan group-hover:scale-110 transition-transform" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-primary text-sm font-medium mb-2">Revenue</p>
                        <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {enrichedDeal.keyMetrics.revenue}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent-teal text-sm font-medium mb-2">EBITDA Margin</p>
                        <p className="text-2xl font-bold text-foreground group-hover:text-accent-teal transition-colors">
                          {enrichedDeal.keyMetrics.ebitdaMargin}
                        </p>
                      </div>
                      <PieChart className="w-8 h-8 text-accent-teal group-hover:scale-110 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin className="w-5 h-5 mr-2 text-accent-cyan" />
                  <span>{enrichedDeal.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  <span>Closed {enrichedDeal.date}</span>
                </div>
                {enrichedDeal.website && (
                  <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <Globe className="w-5 h-5 mr-2 text-accent-teal" />
                    <a 
                      href={`https://${enrichedDeal.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {enrichedDeal.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Summary Card */}
            <div className="lg:col-span-1 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <Card className="bg-gradient-card backdrop-blur-sm border-border shadow-card sticky top-8 hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-4 border-b border-border/50">
                  <CardTitle className="text-foreground text-center text-xl font-bold">Deal Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="text-center pb-6 border-b border-border/50">
                    <div className="text-6xl font-bold bg-gradient-text bg-clip-text text-transparent mb-3">
                      {enrichedDeal.amount}
                    </div>
                    <div className="text-muted-foreground font-medium">Transaction Value</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Sector</span>
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        {enrichedDeal.sector}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Stage</span>
                      <span className="text-foreground font-medium">{enrichedDeal.stage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Region</span>
                      <span className="text-foreground font-medium">{enrichedDeal.region}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Multiple</span>
                      <span className="text-foreground font-medium">{enrichedDeal.multiple}</span>
                    </div>
                    {enrichedDeal.totalFundingUSD && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Total Funding</span>
                        <span className="text-primary font-medium">${enrichedDeal.totalFundingUSD}M</span>
                      </div>
                    )}
                  </div>

                  {enrichedDeal.leadPartners && (
                    <div className="pt-4 border-t border-border/50">
                      <div className="text-muted-foreground text-sm mb-2">Lead Partners</div>
                      <div className="text-foreground font-medium">{enrichedDeal.leadPartners}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Participating Investors Section */}
      <section className="py-16 bg-background/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center text-2xl mb-2">
                <Users className="w-6 h-6 mr-3 text-accent-teal" />
                Participating Investors
              </CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                {(enrichedDeal.investors || enrichedDeal.firms).length} investment firms and organizations involved in this deal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(enrichedDeal.investors || enrichedDeal.firms).map((firm, index) => {
                  // Check if this is the lead investor (500 Startups, first in list)
                  const isLead = index === 0 && firm === '500 Startups';
                  
                  // Enhanced logo system with realistic branding
                  const investorLogos = {
                    '500 Startups': {
                      initials: '500',
                      color: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
                      description: 'Global seed fund'
                    },
                    'Bessemer Venture Partners': {
                      initials: 'BVP',
                      color: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white',
                      description: 'Multi-stage VC'
                    },
                    'BMW i Ventures': {
                      initials: 'BMW',
                      color: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white',
                      description: 'Corporate VC'
                    },
                    'Bullpen Capital': {
                      initials: 'BC',
                      color: 'bg-gradient-to-r from-green-600 to-emerald-700 text-white',
                      description: 'Early stage VC'
                    },
                    'DCM': {
                      initials: 'DCM',
                      color: 'bg-gradient-to-r from-purple-600 to-violet-700 text-white',
                      description: 'Growth capital'
                    },
                    'Duchossois Capital Management': {
                      initials: 'DCM',
                      color: 'bg-gradient-to-r from-slate-700 to-slate-800 text-white',
                      description: 'Private equity'
                    },
                    'EchoVC Partners': {
                      initials: 'EVC',
                      color: 'bg-gradient-to-r from-orange-500 to-red-600 text-white',
                      description: 'African-focused VC'
                    },
                    'Fontinalis Partners': {
                      initials: 'FP',
                      color: 'bg-gradient-to-r from-teal-600 to-cyan-700 text-white',
                      description: 'Mobility focused'
                    },
                    'Hinge Capital': {
                      initials: 'HC',
                      color: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
                      description: 'Early stage VC'
                    },
                    'Kapor Capital': {
                      initials: 'KC',
                      color: 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white',
                      description: 'Impact investing'
                    },
                    'LaunchCapital Ventures': {
                      initials: 'LCV',
                      color: 'bg-gradient-to-r from-emerald-600 to-green-700 text-white',
                      description: 'Seed stage VC'
                    },
                    'Life360 Inc': {
                      initials: 'L360',
                      color: 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white',
                      description: 'Family safety'
                    },
                    'Seraph Group': {
                      initials: 'SG',
                      color: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
                      description: 'Angel network'
                    },
                    'Social Leverage Capital': {
                      initials: 'SLC',
                      color: 'bg-gradient-to-r from-gray-700 to-slate-800 text-white',
                      description: 'Early stage VC'
                    }
                  };
                  
                  const logoData = investorLogos[firm] || {
                    initials: firm.split(' ').map(word => word.charAt(0)).slice(0, 2).join('').toUpperCase(),
                    color: 'bg-gradient-to-r from-primary to-accent-cyan text-white',
                    description: 'Investment firm'
                  };
                  
                  return (
                    <div 
                      key={index}
                      className={`group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm ${
                        isLead 
                          ? 'bg-gradient-to-br from-primary/20 to-accent-cyan/20 border-2 border-primary/50 shadow-glow ring-2 ring-primary/20' 
                          : 'bg-card/60 border border-border/50 hover:shadow-glow hover:bg-card/80'
                      }`}
                    >
                      {/* Lead Investor Badge */}
                      {isLead && (
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          LEAD
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Enhanced Logo */}
                        <div className={`${isLead ? 'w-24 h-24' : 'w-20 h-20'} rounded-2xl ${logoData.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${isLead ? 'ring-2 ring-primary/30' : ''}`}>
                          <span className={`${isLead ? 'text-2xl' : 'text-xl'} font-bold tracking-tight`}>
                            {logoData.initials}
                          </span>
                        </div>
                        
                        {/* Firm Details */}
                        <div className="space-y-2">
                          <div className={`${isLead ? 'text-base' : 'text-sm'} font-semibold ${isLead ? 'text-primary' : 'text-foreground group-hover:text-primary'} transition-colors leading-tight`}>
                            {firm}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {isLead ? 'Lead Investor • ' : ''}{logoData.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Investment Highlights & Risks */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Investment Highlights */}
            <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm animate-slide-up">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center text-2xl">
                  <Award className="w-6 h-6 mr-3 text-primary" />
                  Investment Highlights
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg">
                  Key value drivers and strategic advantages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrichedDeal.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                      <span className="text-foreground leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Risks */}
            <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center text-2xl">
                  <Shield className="w-6 h-6 mr-3 text-accent-teal" />
                  Key Risk Factors
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg">
                  Important considerations and mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrichedDeal.risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-3 h-3 bg-accent-teal rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                      <span className="text-foreground leading-relaxed">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Thesis */}
          <Card className="mt-12 bg-gradient-card border-border shadow-card backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center text-2xl">
                <Target className="w-6 h-6 mr-3 text-accent-cyan" />
                Investment Thesis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg leading-relaxed">
                This investment represents a compelling opportunity in the {enrichedDeal.sector} sector, with strong fundamentals and significant growth potential driven by market-leading technology and exceptional management execution.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Deal Structure */}
      <section className="py-16 bg-background/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm animate-slide-up">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center text-2xl">
                <Briefcase className="w-6 h-6 mr-3 text-accent-blue" />
                Deal Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-muted-foreground text-sm mb-2">Lead Investor</div>
                <div className="text-foreground font-medium text-lg">{enrichedDeal.dealStructure.buyer}</div>
              </div>
              <Separator className="bg-border" />
              <div>
                <div className="text-muted-foreground text-sm mb-2">Selling Parties</div>
                <div className="text-foreground font-medium">{enrichedDeal.dealStructure.seller}</div>
              </div>
              <Separator className="bg-border" />
              <div>
                <div className="text-muted-foreground text-sm mb-3">Advisory Team</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Financial Advisor:</span>
                    <span className="text-foreground">{enrichedDeal.dealStructure.advisors.financial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Legal Counsel:</span>
                    <span className="text-foreground">{enrichedDeal.dealStructure.advisors.legal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Strategic Advisor:</span>
                    <span className="text-foreground">{enrichedDeal.dealStructure.advisors.technical}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}