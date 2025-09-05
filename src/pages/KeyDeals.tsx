import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Building2, DollarSign, ArrowRight, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const keyDeals = [
  {
    id: "1",
    title: "ZenScreen AI Platform Investment",
    companyName: "ZenScreen",
    amount: "$2.5M",
    date: "2024",
    sector: "Software & Related",
    primaryIndustry: "Software",
    subIndustries: "Web Applications, Analytics & Performance Software, Mobile Applications",
    stage: "Add-on",
    description: "Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage. The platform offers digital-dieting features including App Analytics, App Categories, Smart Mornings, Calm Nights, Zen breaks, Daily Time Limit, Quiet Time, and Screen Sense.",
    website: "www.zenscreen.ai",
    location: "San Jose, California, US",
    region: "North America",
    status: "Completed",
    investmentStatus: "Active",
    firms: ["500 Startups", "Bessemer Venture Partners", "BMW i Ventures", "Bullpen Capital", "DCM", "Duchossois Capital Management", "EchoVC Partners", "Fontinalis Partners", "Hinge Capital", "Kapor Capital", "LaunchCapital Ventures", "Life360, Inc.", "Seraph Group", "Social Leverage Capital"],
    leadPartners: "",
    boardReps: "",
    multiple: "N/A"
  },
  {
    id: "2",
    title: "Van Leeuwen Artisan Ice Cream Series A",
    companyName: "Van Leeuwen Artisan Ice Cream",
    amount: "$18.7M",
    date: "2024",
    sector: "Food and Ag.",
    primaryIndustry: "Food",
    subIndustries: "Dairy Products",
    stage: "Series A/Round 1",
    description: "Founded in 2008 and based in New York, US, Van Leeuwen Artisan Ice Cream operates as a producer of dairy-based and vegan ice cream products. The products are offered through their ice cream trucks and grocery stores.",
    website: "www.vanleeuwenicecream.com",
    location: "Brooklyn, New York, US",
    region: "North America",
    status: "Completed",
    investmentStatus: "Active",
    firms: ["Strand Equity"],
    leadPartners: "Seth Rodsky",
    boardReps: "Seth Rodsky",
    totalFundingUSD: "18.7",
    totalFundingEUR: "16.99",
    multiple: "N/A"
  },
  {
    id: "3",
    title: "Conifer Point Pharmaceuticals Add-on Investment",
    companyName: "Conifer Point Pharmaceuticals LLC",
    amount: "$5.0M",
    date: "2024",
    sector: "Healthcare",
    primaryIndustry: "Pharmaceuticals",
    subIndustries: "Pharmaceutical Development, BioPharmaceuticals, Medical Software, Medical Devices",
    stage: "Add-on",
    description: "Founded in 2014 and based in Pennsylvania, US, Conifer Point Pharmaceuticals LLC develops drug discovery technology using computational tools to help drug researchers improve early stage compounds. The company also offers industry-standard computational chemistry services to help small firms solve chemistry research and development problems.",
    website: "www.coniferpoint.com",
    location: "Doylestown, Pennsylvania, US",
    region: "North America",
    status: "Completed",
    investmentStatus: "Active",
    firms: ["180 Degree Capital", "AbbVie Biotech Ventures", "Alexandria Venture Investments", "ARCH Venture Partners", "Bill & Melinda Gates Foundation", "Eli Lilly & Company", "Innovate NY Fund", "Johnson & Johnson", "Lodo Therapeutics Corporation", "Partnership Fund for New York City", "Pfizer Venture Investments", "Watson Group Investments", "WuXi AppTec Group"],
    leadPartners: "",
    boardReps: "",
    multiple: "N/A"
  },
  {
    id: "4",
    title: "OmniView Sports Seed Investment",
    companyName: "OmniView Sports Inc.",
    amount: "$1.2M",
    date: "2024",
    sector: "Software & Related",
    primaryIndustry: "Software",
    subIndustries: "Conferencing Software, Gaming, Connectivity Software, Web Applications, Mobile Applications, Application Integration Software",
    stage: "Seed",
    description: "Founded in 2020 and based in Massachusetts, US, OmniView Sports Inc. operates as sports viewing application that's showing its users a personalized view experience according to the user preference.",
    website: "www.ovszone.com",
    location: "Boston, Massachusetts, US",
    region: "North America",
    status: "Completed",
    investmentStatus: "Active",
    firms: ["Undisclosed Investors"],
    leadPartners: "",
    boardReps: "",
    multiple: "N/A"
  }
]

export default function KeyDeals() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all-regions")
  const [selectedCountry, setSelectedCountry] = useState<string>("all-countries")
  const [selectedSector, setSelectedSector] = useState<string>("all-sectors")
  const [selectedSubSector, setSelectedSubSector] = useState<string>("all-sub-sectors")
  const [selectedTertiary, setSelectedTertiary] = useState<string>("all-tertiary")

  // Region to countries mapping based on Private Equity Regional Taxonomy
  const regionCountries = {
    "asia-pacific": [
      { value: "australia", label: "Australia" },
      { value: "hong-kong", label: "Hong Kong" },
      { value: "japan", label: "Japan" },
      { value: "new-zealand", label: "New Zealand" },
      { value: "singapore", label: "Singapore" },
      { value: "south-korea", label: "South Korea" }
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
    "europe": [
      { value: "france", label: "France" },
      { value: "germany", label: "Germany" },
      { value: "italy", label: "Italy" },
      { value: "netherlands", label: "Netherlands" },
      { value: "spain", label: "Spain" },
      { value: "united-kingdom", label: "United Kingdom" }
    ],
    "latin-america": [
      { value: "argentina", label: "Argentina" },
      { value: "brazil", label: "Brazil" },
      { value: "chile", label: "Chile" },
      { value: "colombia", label: "Colombia" },
      { value: "mexico", label: "Mexico" }
    ],
    "middle-east-africa": [
      { value: "egypt", label: "Egypt" },
      { value: "israel", label: "Israel" },
      { value: "saudi-arabia", label: "Saudi Arabia" },
      { value: "south-africa", label: "South Africa" },
      { value: "uae-united-arab-emirates", label: "UAE (United Arab Emirates)" }
    ],
    "north-america": [
      { value: "canada", label: "Canada" },
      { value: "united-states", label: "United States" }
    ]
  }

  // Sector mapping
  const sectorMapping: Record<string, string[]> = {
    "Business Services": ["Business Services", "Financial Services", "Insurance", "Outsourcing"],
    "Clean Tech.": ["Clean Technology", "Environmental Services", "Renewable Energy"],
    "Consumer Disc.": ["Beverages", "Consumer Products", "Consumer Services", "Education / Training", "Leisure", "Retail"],
    "Diversified": ["Diversified"],
    "Energy and Util.": ["Energy", "Oil & Gas", "Power", "Utilities"],
    "Food and Ag.": ["Agriculture", "Food"],
    "Healthcare": ["Biomedical", "Biotechnology", "Healthcare", "Healthcare IT", "Medical Devices", "Medical Instruments", "Medical Technologies", "Pharmaceuticals"],
    "Industrials": ["Aerospace", "Construction", "Defence", "Industrial", "Logistics", "Manufacturing", "Transportation"],
    "Internet": ["Internet"],
    "Materials": ["Chemicals", "Materials", "Mining", "Timber"],
    "Other IT": ["Information Services", "IT", "IT Infrastructure", "IT Security"],
    "Real Estate": ["Hotels and Offices", "Property"],
    "Semic. & Electronics": ["Electronics", "Hardware", "Semiconductors"],
    "Software & Related": ["Software", "Technology"],
    "Telecoms": ["Advertising", "Media", "Network", "Telecom Media", "Telecoms"]
  }

  const subsectorMapping: Record<string, string[]> = {
    "Business Services": ["Accounting Services", "Business Services", "Consulting Services", "Legal Services"],
    "Financial Services": ["Banks", "Consumer Finance", "Investment Banking", "Securities Brokers"],
    "Insurance": ["Insurance Agencies", "Healthcare Insurance"],
    "Outsourcing": ["BPO Services", "IT Outsourcing"],
    "Clean Technology": ["Clean Technology", "Solar Power", "Wind Power"],
    "Environmental Services": ["Waste Management", "Water Treatment"],
    "Renewable Energy": ["Solar Power", "Wind Power", "Hydro Power"],
    "Healthcare": ["Biotechnology", "Medical Devices", "Pharmaceuticals", "Healthcare Services"],
    "Technology": ["Software", "Hardware", "Internet", "AI/ML"],
    "Manufacturing": ["Automotive", "Industrial Equipment", "Aerospace"]
  }

  // Reset dependent filters when parent changes
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
      return Object.values(sectorMapping).flatMap(subsectors => 
        subsectors.map(subsector => ({ value: subsector, label: subsector }))
      )
    }
    const subsectors = sectorMapping[selectedSector]
    if (!subsectors) return []
    return subsectors.map(subsector => ({ value: subsector, label: subsector }))
  }

  // Get filtered tertiary sectors based on selected subsector
  const getFilteredTertiary = () => {
    if (selectedSubSector === "all-sub-sectors") return []
    
    const tertiarySectors = subsectorMapping[selectedSubSector] || []
    return tertiarySectors.map(tertiary => ({ 
      value: tertiary.toLowerCase().replace(/\s+/g, '-').replace(/[&/()]/g, ''), 
      label: tertiary 
    }))
  }

  // Filter deals based on selected filters
  const getFilteredDeals = () => {
    return keyDeals.filter(deal => {
      // Region filter
      if (selectedRegion !== "all-regions") {
        const regionName = selectedRegion.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        if (!deal.region.toLowerCase().includes(regionName.toLowerCase())) {
          return false
        }
      }

      // Country filter (supports abbreviations like US, UK, UAE)
      if (selectedCountry !== "all-countries") {
        const allCountries = Object.values(regionCountries).flat()
        const entry = allCountries.find(c => c.value === selectedCountry)
        const baseLabel = entry?.label || selectedCountry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        const synonyms: string[] = [baseLabel.toLowerCase()]

        // Parenthetical alt labels, e.g., "UAE (United Arab Emirates)"
        const parenMatch = baseLabel.match(/^(.*)\s*\((.*)\)\s*$/)
        if (parenMatch) {
          synonyms.push(parenMatch[1].trim().toLowerCase())
          synonyms.push(parenMatch[2].trim().toLowerCase())
        }

        // Common aliases
        const slug = selectedCountry
        if (slug === 'united-states') {
          synonyms.push('us','u.s.','usa','united states')
        }
        if (slug === 'united-kingdom') {
          synonyms.push('uk','u.k.','united kingdom','britain')
        }
        if (slug === 'uae-united-arab-emirates') {
          synonyms.push('uae','united arab emirates')
        }

        const location = deal.location.toLowerCase()
        if (!synonyms.some(s => location.includes(s))) {
          return false
        }
      }

      // Sector filter
      if (selectedSector !== "all-sectors") {
        if (deal.sector !== selectedSector) {
          return false
        }
      }

      // Sub-sector filter
      if (selectedSubSector !== "all-sub-sectors") {
        if (!deal.subIndustries.toLowerCase().includes(selectedSubSector.toLowerCase())) {
          return false
        }
      }

      return true
    })
  }

  return (
    <div className="min-h-screen font-primary bg-black">
      <Navigation />
      
      {/* Streamlined Header Section */}
      <section className="pt-32 pb-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Key Deals
            </h1>
            <p className="text-lg text-white/70">
              Track significant private equity transactions and market activity
            </p>
          </div>
          

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
                  {Object.keys(sectorMapping).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
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
      </section>

      {/* Key Deals */}
      <section className="pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Recent Transactions
            </h2>
            <p className="text-white/70">
              Latest high-impact deals in the private equity market ({getFilteredDeals().length} {getFilteredDeals().length === 1 ? 'deal' : 'deals'})
            </p>
          </div>

          <div className="space-y-6">
            {getFilteredDeals().map((deal, index) => (
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
                      <div className="text-sm text-white/70 mb-1">Location</div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-teal-400" />
                        <span className="font-medium text-white">{deal.location}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">Lead Firm</div>
                      <div className="font-medium text-white">{deal.firms[0]}</div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        asChild
                        variant="outline" 
                        className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
                      >
                        <Link to={`/deal/${index + 1}`}>
                          View Details
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
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