import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Building, Clock, Target, Users, Briefcase, Zap, Globe } from "lucide-react"
import { useState, useEffect } from "react"

const Snapshot = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all-regions")
  const [selectedCountry, setSelectedCountry] = useState<string>("all-countries")
  const [selectedSector, setSelectedSector] = useState<string>("all-sectors")
  const [selectedSubSector, setSelectedSubSector] = useState<string>("all-sub-sectors")
  const [selectedTertiary, setSelectedTertiary] = useState<string>("all-tertiary")

  // Region to countries mapping based on Private Equity Regional Taxonomy
  const regionCountries = {
    "north-america": [
      { value: "canada", label: "Canada" },
      { value: "mexico", label: "Mexico" },
      { value: "usa", label: "United States" }
    ],
    "europe": [
      { value: "austria", label: "Austria" },
      { value: "belgium", label: "Belgium" },
      { value: "denmark", label: "Denmark" },
      { value: "finland", label: "Finland" },
      { value: "france", label: "France" },
      { value: "germany", label: "Germany" },
      { value: "ireland", label: "Ireland" },
      { value: "italy", label: "Italy" },
      { value: "netherlands", label: "Netherlands" },
      { value: "norway", label: "Norway" },
      { value: "poland", label: "Poland" },
      { value: "portugal", label: "Portugal" },
      { value: "spain", label: "Spain" },
      { value: "sweden", label: "Sweden" },
      { value: "switzerland", label: "Switzerland" },
      { value: "uk", label: "United Kingdom" }
    ],
    "asia-pacific": [
      { value: "australia", label: "Australia" },
      { value: "hong-kong", label: "Hong Kong" },
      { value: "japan", label: "Japan" },
      { value: "new-zealand", label: "New Zealand" },
      { value: "singapore", label: "Singapore" },
      { value: "south-korea", label: "South Korea" },
      { value: "taiwan", label: "Taiwan" }
    ],
    "emerging-asia": [
      { value: "china", label: "China" },
      { value: "india", label: "India" },
      { value: "indonesia", label: "Indonesia" },
      { value: "malaysia", label: "Malaysia" },
      { value: "philippines", label: "Philippines" },
      { value: "thailand", label: "Thailand" },
      { value: "vietnam", label: "Vietnam" }
    ],
    "latin-america": [
      { value: "argentina", label: "Argentina" },
      { value: "brazil", label: "Brazil" },
      { value: "chile", label: "Chile" },
      { value: "colombia", label: "Colombia" },
      { value: "costa-rica", label: "Costa Rica" },
      { value: "panama", label: "Panama" },
      { value: "peru", label: "Peru" },
      { value: "uruguay", label: "Uruguay" }
    ],
    "middle-east-africa": [
      { value: "egypt", label: "Egypt" },
      { value: "israel", label: "Israel" },
      { value: "kenya", label: "Kenya" },
      { value: "morocco", label: "Morocco" },
      { value: "nigeria", label: "Nigeria" },
      { value: "qatar", label: "Qatar" },
      { value: "saudi-arabia", label: "Saudi Arabia" },
      { value: "south-africa", label: "South Africa" },
      { value: "uae", label: "UAE" }
    ]
  }

  // Sector mapping based on provided taxonomy
  const sectorMapping = {
    "ai-data-emerging-tech": {
      label: "AI, Data & Emerging Tech",
      subsectors: {
        "artificial-intelligence": {
          label: "Artificial Intelligence",
          tertiary: ["Machine Learning", "NLP", "Computer Vision", "General AI"]
        },
        "data-analytics": {
          label: "Data & Analytics",
          tertiary: ["Data Platforms", "BI", "Predictive Analytics"]
        },
        "developer-tools": {
          label: "Developer Tools & Infrastructure",
          tertiary: ["APIs", "DevOps", "Cloud Infra", "Databases"]
        },
        "ar-vr": {
          label: "AR/VR & Spatial Computing",
          tertiary: ["Gaming", "Enterprise Applications", "Social"]
        },
        "quantum-computing": {
          label: "Quantum Computing",
          tertiary: ["Hardware", "Algorithms", "Quantum-as-a-Service"]
        },
        "emerging-tech-rd": {
          label: "Emerging Tech R&D",
          tertiary: ["Frontier Labs", "Early Research Commercialization"]
        }
      }
    },
    "agtech-food-systems": {
      label: "AgTech & Food Systems",
      subsectors: {
        "agtech": {
          label: "AgTech",
          tertiary: ["Precision Farming", "Smart Irrigation", "Crop Genomics"]
        },
        "food-technology": {
          label: "Food Technology",
          tertiary: ["Alternative Proteins", "Cellular Agriculture", "Novel Ingredients"]
        },
        "food-beverage": {
          label: "Food & Beverage",
          tertiary: ["Functional Foods", "Alcohol Innovation", "Consumer Packaged Goods"]
        },
        "supply-chain-cold": {
          label: "Supply Chain & Cold Chain Logistics",
          tertiary: []
        }
      }
    },
    "biotech-pharma": {
      label: "Biotech, Pharma & Life Sciences",
      subsectors: {
        "biotechnology": {
          label: "Biotechnology",
          tertiary: ["Drug Discovery", "Biologics", "Gene Therapy"]
        },
        "pharmaceuticals": {
          label: "Pharmaceuticals",
          tertiary: ["Generic", "Specialty", "Manufacturing"]
        },
        "medtech-tools": {
          label: "MedTech & Tools",
          tertiary: ["Medical Devices", "Diagnostics", "Surgical", "Monitoring"]
        },
        "synthetic-biology": {
          label: "Synthetic Biology",
          tertiary: ["Industrial Biotech", "Biomanufacturing"]
        }
      }
    },
    "blockchain-web3": {
      label: "Blockchain, Web3 & Digital Assets",
      subsectors: {
        "blockchain-infrastructure": { label: "Blockchain Infrastructure", tertiary: [] },
        "defi": { label: "DeFi", tertiary: [] },
        "nfts": { label: "NFTs & Digital Collectibles", tertiary: [] },
        "web3-applications": { label: "Web3 Applications", tertiary: [] },
        "crypto-exchanges": { label: "Crypto Exchanges & Custody", tertiary: [] }
      }
    },
    "cleantech-climate": {
      label: "CleanTech, Climate & Sustainability",
      subsectors: {
        "clean-energy": {
          label: "Clean Energy",
          tertiary: ["Solar", "Wind", "Hydro", "Energy Storage"]
        },
        "climate-tech": {
          label: "Climate Tech",
          tertiary: ["Carbon Capture", "Removal", "Trading"]
        },
        "energy-efficiency": {
          label: "Energy Efficiency",
          tertiary: ["Smart Grid", "Building Efficiency", "Industrial Retrofits"]
        },
        "sustainable-materials": {
          label: "Sustainable Materials",
          tertiary: ["Recycling", "Circular Economy", "Packaging Innovation"]
        },
        "climate-adaptation": {
          label: "Climate Adaptation",
          tertiary: ["Water Tech", "Agriculture Resilience", "Disaster Management"]
        },
        "environmental-services": {
          label: "Environmental Services",
          tertiary: ["Waste Management", "Pollution Control"]
        }
      }
    },
    "financial-services-fintech": {
      label: "Financial Services & FinTech",
      subsectors: {
        "payments": { label: "Payments", tertiary: [] },
        "lending": { label: "Lending", tertiary: [] },
        "wealth-management": { label: "Wealth Management / Investment Platforms", tertiary: [] },
        "neobanking": { label: "Neobanking & Digital Banking", tertiary: [] },
        "insurtech": { label: "InsurTech", tertiary: [] },
        "regtech": { label: "RegTech", tertiary: [] },
        "capital-markets": { label: "Capital Markets Infrastructure", tertiary: [] }
      }
    },
    "enterprise-software": {
      label: "Enterprise Software",
      subsectors: {
        "enterprise-saas": { label: "Enterprise SaaS", tertiary: [] },
        "enterprise-software": {
          label: "Enterprise Software",
          tertiary: ["ERP", "CRM", "HR Tech", "Sales Tech"]
        },
        "productivity-collaboration": { label: "Productivity & Collaboration Tools", tertiary: [] },
        "vertical-saas": {
          label: "Vertical SaaS",
          tertiary: ["LegalTech", "PropTech", "AgriTech SaaS", "GovTech"]
        }
      }
    }
  }

  // Get filtered countries based on selected region
  const getFilteredCountries = () => {
    if (selectedRegion === "all-regions") {
      return Object.values(regionCountries).flat()
    }
    return regionCountries[selectedRegion as keyof typeof regionCountries] || []
  }

  // Get filtered subsectors based on selected sector
  const getFilteredSubSectors = () => {
    if (selectedSector === "all-sectors") {
      return Object.values(sectorMapping).flatMap(sector => 
        Object.entries(sector.subsectors).map(([key, value]) => ({ value: key, label: value.label }))
      )
    }
    const sector = sectorMapping[selectedSector as keyof typeof sectorMapping]
    if (!sector) return []
    return Object.entries(sector.subsectors).map(([key, value]) => ({ value: key, label: value.label }))
  }

  // Get filtered tertiary sectors based on selected subsector
  const getFilteredTertiary = () => {
    if (selectedSubSector === "all-sub-sectors") return []
    
    // Find the subsector in the mapping
    for (const [sectorKey, sectorData] of Object.entries(sectorMapping)) {
      for (const [subsectorKey, subsectorData] of Object.entries(sectorData.subsectors)) {
        if (subsectorKey === selectedSubSector) {
          return subsectorData.tertiary.map(t => ({ 
            value: t.toLowerCase().replace(/\s+/g, '-'), 
            label: t 
          }))
        }
      }
    }
    return []
  }

  // Reset dependent selections when parent selections change
  useEffect(() => {
    setSelectedCountry("all-countries")
  }, [selectedRegion])

  useEffect(() => {
    setSelectedSubSector("all-sub-sectors")
    setSelectedTertiary("all-tertiary")
  }, [selectedSector])

  useEffect(() => {
    setSelectedTertiary("all-tertiary")
  }, [selectedSubSector])

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
  }

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
  }

  const handleSectorChange = (value: string) => {
    setSelectedSector(value)
  }

  const handleSubSectorChange = (value: string) => {
    setSelectedSubSector(value)
  }

  const handleTertiaryChange = (value: string) => {
    setSelectedTertiary(value)
  }
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
              <Select value={selectedRegion} onValueChange={handleRegionChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white z-50">
                  <SelectItem value="all-regions">All Regions</SelectItem>
                  <SelectItem value="north-america">🍁 North America</SelectItem>
                  <SelectItem value="europe">🇪🇺 Europe</SelectItem>
                  <SelectItem value="asia-pacific">🌏 Asia Pacific</SelectItem>
                  <SelectItem value="emerging-asia">🌅 Emerging Asia</SelectItem>
                  <SelectItem value="latin-america">🌎 Latin America</SelectItem>
                  <SelectItem value="middle-east-africa">🌍 Middle East & Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">COUNTRY</label>
              <Select value={selectedCountry} onValueChange={handleCountryChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white z-50 max-h-60 overflow-y-auto">
                  <SelectItem value="all-countries">All Countries</SelectItem>
                  {getFilteredCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">SECTOR</label>
              <Select value={selectedSector} onValueChange={handleSectorChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white z-50 max-h-60 overflow-y-auto">
                  <SelectItem value="all-sectors">All Sectors</SelectItem>
                  {Object.entries(sectorMapping).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">SUB-SECTOR</label>
              <Select value={selectedSubSector} onValueChange={handleSubSectorChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white z-50 max-h-60 overflow-y-auto">
                  <SelectItem value="all-sub-sectors">All Sub-Sectors</SelectItem>
                  {getFilteredSubSectors().map((subsector) => (
                    <SelectItem key={subsector.value} value={subsector.value}>
                      {subsector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">TERTIARY SECTOR</label>
              <Select value={selectedTertiary} onValueChange={handleTertiaryChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white z-50 max-h-60 overflow-y-auto">
                  <SelectItem value="all-tertiary">All Tertiary</SelectItem>
                  {getFilteredTertiary().map((tertiary) => (
                    <SelectItem key={tertiary.value} value={tertiary.value}>
                      {tertiary.label}
                    </SelectItem>
                  ))}
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