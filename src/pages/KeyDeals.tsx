import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Building2, DollarSign, ArrowRight, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

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