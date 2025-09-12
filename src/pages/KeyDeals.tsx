import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Building2, DollarSign, ArrowRight, ExternalLink, Crown } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

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
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Region to countries mapping based on Private Equity Regional Taxonomy - same as Snapshot
  const regionCountries = {
    "asia-pacific": [
      { value: "australia", label: "Australia" },
      { value: "brunei", label: "Brunei" },
      { value: "cook-islands", label: "Cook Islands" },
      { value: "fiji", label: "Fiji" },
      { value: "french-polynesia", label: "French Polynesia" },
      { value: "hong-kong", label: "Hong Kong" },
      { value: "japan", label: "Japan" },
      { value: "kiribati", label: "Kiribati" },
      { value: "macau", label: "Macau" },
      { value: "marshall-islands", label: "Marshall Islands" },
      { value: "micronesia", label: "Micronesia" },
      { value: "nauru", label: "Nauru" },
      { value: "new-caledonia", label: "New Caledonia" },
      { value: "new-zealand", label: "New Zealand" },
      { value: "palau", label: "Palau" },
      { value: "papua-new-guinea", label: "Papua New Guinea" },
      { value: "samoa", label: "Samoa" },
      { value: "singapore", label: "Singapore" },
      { value: "solomon-islands", label: "Solomon Islands" },
      { value: "south-korea", label: "South Korea" },
      { value: "taiwan", label: "Taiwan" },
      { value: "tonga", label: "Tonga" },
      { value: "tuvalu", label: "Tuvalu" },
      { value: "vanuatu", label: "Vanuatu" }
    ],
    "emerging-asia": [
      { value: "afghanistan", label: "Afghanistan" },
      { value: "bangladesh", label: "Bangladesh" },
      { value: "bhutan", label: "Bhutan" },
      { value: "cambodia", label: "Cambodia" },
      { value: "china", label: "China" },
      { value: "east-timor-timor-leste", label: "East Timor (Timor-Leste)" },
      { value: "india", label: "India" },
      { value: "indonesia", label: "Indonesia" },
      { value: "kazakhstan", label: "Kazakhstan" },
      { value: "kyrgyzstan", label: "Kyrgyzstan" },
      { value: "laos", label: "Laos" },
      { value: "malaysia", label: "Malaysia" },
      { value: "maldives", label: "Maldives" },
      { value: "mongolia", label: "Mongolia" },
      { value: "myanmar", label: "Myanmar" },
      { value: "nepal", label: "Nepal" },
      { value: "north-korea", label: "North Korea" },
      { value: "pakistan", label: "Pakistan" },
      { value: "philippines", label: "Philippines" },
      { value: "sri-lanka", label: "Sri Lanka" },
      { value: "tajikistan", label: "Tajikistan" },
      { value: "thailand", label: "Thailand" },
      { value: "turkmenistan", label: "Turkmenistan" },
      { value: "uzbekistan", label: "Uzbekistan" },
      { value: "vietnam", label: "Vietnam" }
    ],
    "europe": [
      { value: "albania", label: "Albania" },
      { value: "andorra", label: "Andorra" },
      { value: "armenia", label: "Armenia" },
      { value: "austria", label: "Austria" },
      { value: "azerbaijan", label: "Azerbaijan" },
      { value: "belarus", label: "Belarus" },
      { value: "belgium", label: "Belgium" },
      { value: "bosnia-and-herzegovina", label: "Bosnia and Herzegovina" },
      { value: "bulgaria", label: "Bulgaria" },
      { value: "croatia", label: "Croatia" },
      { value: "cyprus", label: "Cyprus" },
      { value: "czech-republic", label: "Czech Republic" },
      { value: "denmark", label: "Denmark" },
      { value: "estonia", label: "Estonia" },
      { value: "finland", label: "Finland" },
      { value: "france", label: "France" },
      { value: "georgia", label: "Georgia" },
      { value: "germany", label: "Germany" },
      { value: "greece", label: "Greece" },
      { value: "hungary", label: "Hungary" },
      { value: "iceland", label: "Iceland" },
      { value: "ireland", label: "Ireland" },
      { value: "italy", label: "Italy" },
      { value: "kosovo", label: "Kosovo" },
      { value: "latvia", label: "Latvia" },
      { value: "liechtenstein", label: "Liechtenstein" },
      { value: "lithuania", label: "Lithuania" },
      { value: "luxembourg", label: "Luxembourg" },
      { value: "malta", label: "Malta" },
      { value: "moldova", label: "Moldova" },
      { value: "monaco", label: "Monaco" },
      { value: "montenegro", label: "Montenegro" },
      { value: "netherlands", label: "Netherlands" },
      { value: "north-macedonia", label: "North Macedonia" },
      { value: "norway", label: "Norway" },
      { value: "poland", label: "Poland" },
      { value: "portugal", label: "Portugal" },
      { value: "romania", label: "Romania" },
      { value: "russia", label: "Russia" },
      { value: "san-marino", label: "San Marino" },
      { value: "serbia", label: "Serbia" },
      { value: "slovakia", label: "Slovakia" },
      { value: "slovenia", label: "Slovenia" },
      { value: "spain", label: "Spain" },
      { value: "sweden", label: "Sweden" },
      { value: "switzerland", label: "Switzerland" },
      { value: "turkey", label: "Turkey" },
      { value: "ukraine", label: "Ukraine" },
      { value: "united-kingdom", label: "United Kingdom" },
      { value: "vatican-city-holy-see", label: "Vatican City (Holy See)" }
    ],
    "latin-america": [
      { value: "antigua-and-barbuda", label: "Antigua and Barbuda" },
      { value: "anguilla", label: "Anguilla" },
      { value: "argentina", label: "Argentina" },
      { value: "aruba", label: "Aruba" },
      { value: "bahamas", label: "Bahamas" },
      { value: "barbados", label: "Barbados" },
      { value: "belize", label: "Belize" },
      { value: "bermuda", label: "Bermuda" },
      { value: "bolivia", label: "Bolivia" },
      { value: "brazil", label: "Brazil" },
      { value: "cayman-islands", label: "Cayman Islands" },
      { value: "chile", label: "Chile" },
      { value: "colombia", label: "Colombia" },
      { value: "costa-rica", label: "Costa Rica" },
      { value: "cuba", label: "Cuba" },
      { value: "curacao", label: "Curaçao" },
      { value: "dominica", label: "Dominica" },
      { value: "dominican-republic", label: "Dominican Republic" },
      { value: "ecuador", label: "Ecuador" },
      { value: "el-salvador", label: "El Salvador" },
      { value: "grenada", label: "Grenada" },
      { value: "guatemala", label: "Guatemala" },
      { value: "guyana", label: "Guyana" },
      { value: "haiti", label: "Haiti" },
      { value: "honduras", label: "Honduras" },
      { value: "jamaica", label: "Jamaica" },
      { value: "montserrat", label: "Montserrat" },
      { value: "nicaragua", label: "Nicaragua" },
      { value: "panama", label: "Panama" },
      { value: "paraguay", label: "Paraguay" },
      { value: "peru", label: "Peru" },
      { value: "puerto-rico", label: "Puerto Rico" },
      { value: "saint-kitts-and-nevis", label: "Saint Kitts and Nevis" },
      { value: "saint-lucia", label: "Saint Lucia" },
      { value: "saint-vincent-and-the-grenadines", label: "Saint Vincent and the Grenadines" },
      { value: "sint-maarten", label: "Sint Maarten" },
      { value: "suriname", label: "Suriname" },
      { value: "trinidad-and-tobago", label: "Trinidad and Tobago" },
      { value: "turks-and-caicos-islands", label: "Turks and Caicos Islands" },
      { value: "uruguay", label: "Uruguay" },
      { value: "venezuela", label: "Venezuela" }
    ],
    "middle-east-africa": [
      { value: "algeria", label: "Algeria" },
      { value: "angola", label: "Angola" },
      { value: "bahrain", label: "Bahrain" },
      { value: "benin", label: "Benin" },
      { value: "botswana", label: "Botswana" },
      { value: "burkina-faso", label: "Burkina Faso" },
      { value: "burundi", label: "Burundi" },
      { value: "cameroon", label: "Cameroon" },
      { value: "cape-verde", label: "Cape Verde (Cabo Verde)" },
      { value: "central-african-republic", label: "Central African Republic" },
      { value: "chad", label: "Chad" },
      { value: "comoros", label: "Comoros" },
      { value: "congo-brazzaville", label: "Congo (Brazzaville)" },
      { value: "congo-kinshasa", label: "Congo (Kinshasa)" },
      { value: "djibouti", label: "Djibouti" },
      { value: "egypt", label: "Egypt" },
      { value: "equatorial-guinea", label: "Equatorial Guinea" },
      { value: "eritrea", label: "Eritrea" },
      { value: "eswatini", label: "Eswatini" },
      { value: "ethiopia", label: "Ethiopia" },
      { value: "gabon", label: "Gabon" },
      { value: "gambia", label: "Gambia" },
      { value: "ghana", label: "Ghana" },
      { value: "guinea", label: "Guinea" },
      { value: "guinea-bissau", label: "Guinea-Bissau" },
      { value: "iran", label: "Iran" },
      { value: "iraq", label: "Iraq" },
      { value: "israel", label: "Israel" },
      { value: "ivory-coast", label: "Ivory Coast" },
      { value: "jordan", label: "Jordan" },
      { value: "kenya", label: "Kenya" },
      { value: "kuwait", label: "Kuwait" },
      { value: "lebanon", label: "Lebanon" },
      { value: "lesotho", label: "Lesotho" },
      { value: "liberia", label: "Liberia" },
      { value: "libya", label: "Libya" },
      { value: "madagascar", label: "Madagascar" },
      { value: "malawi", label: "Malawi" },
      { value: "mali", label: "Mali" },
      { value: "mauritania", label: "Mauritania" },
      { value: "mauritius", label: "Mauritius" },
      { value: "morocco", label: "Morocco" },
      { value: "mozambique", label: "Mozambique" },
      { value: "namibia", label: "Namibia" },
      { value: "niger", label: "Niger" },
      { value: "nigeria", label: "Nigeria" },
      { value: "oman", label: "Oman" },
      { value: "palestine", label: "Palestine" },
      { value: "qatar", label: "Qatar" },
      { value: "rwanda", label: "Rwanda" },
      { value: "sao-tome-and-principe", label: "Sao Tome and Principe" },
      { value: "saudi-arabia", label: "Saudi Arabia" },
      { value: "senegal", label: "Senegal" },
      { value: "seychelles", label: "Seychelles" },
      { value: "sierra-leone", label: "Sierra Leone" },
      { value: "somalia", label: "Somalia" },
      { value: "south-africa", label: "South Africa" },
      { value: "south-sudan", label: "South Sudan" },
      { value: "sudan", label: "Sudan" },
      { value: "syria", label: "Syria" },
      { value: "tanzania", label: "Tanzania" },
      { value: "togo", label: "Togo" },
      { value: "tunisia", label: "Tunisia" },
      { value: "uae-united-arab-emirates", label: "UAE (United Arab Emirates)" },
      { value: "uganda", label: "Uganda" },
      { value: "yemen", label: "Yemen" },
      { value: "zambia", label: "Zambia" },
      { value: "zimbabwe", label: "Zimbabwe" }
    ],
    "north-america": [
      { value: "canada", label: "Canada" },
      { value: "united-states", label: "United States" }
    ]
  }

  // GICS Sector mapping - same as Snapshot
  const sectorMapping: Record<string, string[]> = {
    "Energy": ["Energy Equipment & Services", "Oil, Gas & Consumable Fuels"],
    "Materials": ["Chemicals", "Construction Materials", "Containers & Packaging", "Metals & Mining", "Paper & Forest Products"],
    "Industrials": ["Capital Goods", "Commercial & Professional Services", "Transportation"],
    "Consumer Discretionary": ["Automobiles & Components", "Consumer Durables & Apparel", "Consumer Services", "Retailing"],
    "Consumer Staples": ["Food & Staples Retailing", "Food, Beverage & Tobacco", "Household & Personal Products"],
    "Health Care": ["Health Care Equipment & Services", "Pharmaceuticals", "Biotechnology & Life Sciences"],
    "Financials": ["Banks", "Diversified Financials", "Insurance"],
    "Information Technology": ["Software & Services", "Technology Hardware & Equipment", "Semiconductors & Semiconductor Equipment"],
    "Communication Services": ["Telecommunication Services", "Media", "Entertainment"],
    "Utilities": ["Electric Utilities", "Gas Utilities", "Multi-Utilities", "Water Utilities", "Independent Power and Renewable Electricity Producers"],
    "Real Estate": ["Real Estate Management & Development", "Real Estate Investment Trusts (REITs)"]
  };

  // Tertiary sector mapping (non-functional, kept for UI consistency)
  const subsectorMapping: Record<string, string[]> = {};

  // Fetch deals from database
  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true)
      try {
        let query = supabase
          .from('deals')
          .select(`
            *,
            deals_companies!deals_company_id_fkey(name, description, website, country, region),
            deals_deal_investors(
              deals_investors(name, type)
            )
          `)
          .eq('published', true)
        
        // Apply filters
        if (selectedRegion !== "all-regions") {
          query = query.ilike('region', `%${selectedRegion.replace('-', ' ')}%`)
        }
        if (selectedCountry !== "all-countries") {
          query = query.ilike('country', `%${selectedCountry.replace('-', ' ')}%`)
        }
        
        const { data, error } = await query
        
        if (error) throw error
        setDeals(data || [])
      } catch (error) {
        console.error('Error fetching deals:', error)
        // Fallback to hardcoded data
        setDeals(keyDeals)
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [selectedRegion, selectedCountry, selectedSector, selectedSubSector])

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

  // Get filtered countries based on selected region - same as Snapshot
  const getFilteredCountries = () => {
    let countries = []
    if (selectedRegion === "all-regions") {
      countries = Object.values(regionCountries).flat()
    } else {
      countries = regionCountries[selectedRegion as keyof typeof regionCountries] || []
    }
    
    // Move United States to the front
    const unitedStatesIndex = countries.findIndex(country => country.value === "united-states")
    if (unitedStatesIndex > -1) {
      const unitedStates = countries.splice(unitedStatesIndex, 1)[0]
      return [unitedStates, ...countries]
    }
    
    return countries
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

  // Get filtered tertiary sectors (non-functional) - same as Snapshot
  const getFilteredTertiary = () => {
    return [] // Tertiary filter is disabled
  }

  // Filter deals based on selected filters
  const getFilteredDeals = () => {
    return deals.filter(deal => {
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

        const locationSource = (deal.location || [deal.city, deal.state_province, deal.country].filter(Boolean).join(' ')).toLowerCase()
        if (!synonyms.some(s => locationSource.includes(s))) {
          return false
        }
      }

      // Sector filter
      if (selectedSector !== "all-sectors") {
        const isDbDeal = !!deal.deal_id
        if (isDbDeal) {
          if (selectedSector !== "Consumer Discretionary") {
            return false
          }
        } else {
          if (deal.sector !== selectedSector) {
            return false
          }
        }
      }

      // Sub-sector filter
      if (selectedSubSector !== "all-sub-sectors") {
        const isDbDeal = !!deal.deal_id
        if (isDbDeal) {
          if (selectedSubSector !== "Automobiles & Components") {
            return false
          }
        } else {
          if (!deal.subIndustries?.toLowerCase().includes(selectedSubSector.toLowerCase())) {
            return false
          }
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
                  <SelectItem value="europe" disabled className="opacity-50 cursor-not-allowed">🇪🇺 Europe</SelectItem>
                  <SelectItem value="asia-pacific" disabled className="opacity-50 cursor-not-allowed">🌏 Asia Pacific</SelectItem>
                  <SelectItem value="emerging-asia" disabled className="opacity-50 cursor-not-allowed">🌅 Emerging Asia</SelectItem>
                  <SelectItem value="latin-america" disabled className="opacity-50 cursor-not-allowed">🌎 Latin America</SelectItem>
                  <SelectItem value="middle-east-africa" disabled className="opacity-50 cursor-not-allowed">🌍 Middle East & Africa</SelectItem>
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
                    <SelectItem 
                      key={country.value} 
                      value={country.value}
                      disabled={country.value !== "united-states"}
                      className={country.value !== "united-states" ? "opacity-50 cursor-not-allowed" : ""}
                    >
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
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                TERTIARY SECTOR
                <Crown size={16} className="text-yellow-500" />
              </label>
              <Select value={selectedTertiary} onValueChange={handleTertiaryChange} disabled>
                <SelectTrigger className="bg-white/5 border-white/10 text-white opacity-50 cursor-not-allowed">
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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-white/70">Loading deals...</div>
            </div>
          )}

          {/* Deals Grid */}
          {!loading && (
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
                          (deal.stage_label || deal.deal_status || deal.status) === 'Completed' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {deal.stage_label || deal.deal_status || deal.status || 'Completed'}
                        </div>
                      </div>
                      <CardDescription className="text-white/70 leading-relaxed mb-4">
                        {deal.description}
                      </CardDescription>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-white">
                        {deal.deal_value_formatted || deal.amount || 'Undisclosed'}
                      </div>
                      <div className="text-sm text-white/70">
                        {deal.announcement_date ? new Date(deal.announcement_date).getFullYear() : (deal.date || '—')}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <div className="text-sm text-white/70 mb-1">Sector</div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-green-400" />
                        <span className="font-medium text-white">{selectedSector !== 'all-sectors' ? selectedSector : '—'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">Location</div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-teal-400" />
                        <span className="font-medium text-white">{deal.location || [deal.city, deal.state_province, deal.country].filter(Boolean).join(', ')}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">Lead Firm</div>
                      <div className="font-medium text-white">{deal.deals_deal_investors?.[0]?.deals_investors?.name || deal.firms?.[0] || '—'}</div>
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}