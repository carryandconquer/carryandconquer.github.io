import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Building2, DollarSign, ArrowRight, ExternalLink, Crown } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { normalizeTaxonomy } from "@/lib/slugUtils"

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
    "Consumer Discretionary": ["Automobiles & Components", "Consumer Durables & Apparel", "Hotels, Restaurants & Leisure", "Retailing"],
    "Consumer Staples": ["Food & Staples Retailing", "Food, Beverage & Tobacco", "Household & Personal Products"],
    "Health Care": ["Health Care Equipment & Services", "Pharmaceuticals, Biotechnology & Life Sciences"],
    "Financials": ["Banks", "Diversified Financials", "Insurance", "Real Estate"],
    "Information Technology": ["Software & Services", "Technology Hardware & Equipment", "Semiconductors & Semiconductor Equipment"],
    "Communication Services": ["Telecommunication Services", "Media & Entertainment"],
    "Utilities": ["Electric Utilities", "Gas Utilities", "Multi-Utilities", "Water Utilities"],
    "Real Estate": ["Real Estate Investment Trusts (REITs)", "Real Estate Management & Development"]
  };

  const subSectorSlugAliases: Record<string, string> = {
    'real-estate': 'real-estate-financials'
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
          .select('*')
          .eq('published', true)
        
        // Apply filters using the new foreign key columns for better performance
        if (selectedRegion !== "all-regions") {
          const regionQuery = supabase
            .from('snapshot_geographic_regions')
            .select('id')
            .ilike('slug', selectedRegion)
            .single()
          
          const { data: regionData } = await regionQuery
          if (regionData) {
            query = query.eq('region_id', regionData.id)
          }
        }
        
        if (selectedCountry !== "all-countries") {
          const countryQuery = supabase
            .from('snapshot_countries')
            .select('id')
            .ilike('slug', selectedCountry)
            .single()
          
          const { data: countryData } = await countryQuery
          if (countryData) {
            query = query.eq('country_id', countryData.id)
          }
        }
        
        if (selectedSector !== "all-sectors") {
          const sectorQuery = supabase
            .from('snapshot_sectors')
            .select('id')
            .ilike('slug', normalizeTaxonomy(selectedSector))
            .single()
          
          const { data: sectorData } = await sectorQuery
          if (sectorData) {
            query = query.eq('sector_id', sectorData.id)
          }
        }
        
        if (selectedSubSector !== "all-sub-sectors") {
          const normalized = normalizeTaxonomy(selectedSubSector)
          const targetSlug = subSectorSlugAliases[normalized] ?? normalized
          const subSectorQuery = supabase
            .from('snapshot_sub_sectors')
            .select('id')
            .ilike('slug', targetSlug)
            .single()
          
          const { data: subSectorData } = await subSectorQuery
          if (subSectorData) {
            query = query.eq('sub_sector_id', subSectorData.id)
          }
        }
        
        const { data, error } = await query.order('announcement_date', { ascending: false })
        
        if (error) throw error
        
        // De-dupe by deal_id (some rows appear twice in the DB)
        const uniqueMap = new Map<string, any>()
        ;(data || []).forEach((d: any) => {
          const key = d.deal_id || d.id
          if (key && !uniqueMap.has(key)) uniqueMap.set(key, d)
        })
        const filteredDeals = Array.from(uniqueMap.values())
        
        setDeals(filteredDeals)
      } catch (error) {
        console.error('Error fetching deals:', error)
        setDeals([])
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

  // Filter deals based on selected filters (now purely client-side for region/country text matching)
  const getFilteredDeals = () => {
    return deals.filter(deal => {
      // Apply additional region/country filtering based on text fields for backward compatibility
      if (selectedRegion !== "all-regions") {
        const regionName = selectedRegion.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        const dealRegion = (deal.region || '').toString()
        if (!dealRegion.toLowerCase().includes(regionName.toLowerCase())) {
          return false
        }
      }

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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {getFilteredDeals().map((deal) => (
              <Card 
                key={deal.deal_id || deal.id}
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-card via-card/95 to-muted/30 backdrop-blur-xl shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 rounded-3xl"
              >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-60" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-xl" />
                
                <CardHeader className="pb-6 relative z-10">
                  <div className="flex flex-col space-y-5">
                    {/* Header Row with Logo, Company, and Status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Enhanced Company Logo */}
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:shadow-primary/25 transition-all duration-500 group-hover:scale-110">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                            <span className="text-xl font-bold text-white relative z-10">
                              {(deal.company_name || deal.deal_name || 'C').substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-500 mb-3 leading-tight">
                            {deal.company_name || deal.deal_name || deal.title || 'Untitled Deal'}
                          </CardTitle>
                          <div className={`inline-flex px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all duration-300 group-hover:scale-105 ${
                            (deal.stage_label || deal.deal_status || deal.status) === 'Completed' 
                              ? 'bg-primary/20 text-primary border-primary/30 shadow-primary/10' 
                              : 'bg-accent/20 text-accent-foreground border-accent/30 shadow-accent/10'
                          } shadow-lg`}>
                            {deal.stage_label || deal.deal_status || deal.status || 'Completed'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Deal Value Section */}
                    <div className="text-center py-6 border border-border/30 bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 backdrop-blur-sm rounded-2xl shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                      <div className="relative z-10">
                        <div className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                          {deal.deal_value_formatted || deal.amount || 'Undisclosed'}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          Transaction Value • {deal.announcement_date ? new Date(deal.announcement_date).getFullYear() : (deal.date || '2024')}
                        </div>
                      </div>
                    </div>
                    
                    <CardDescription className="text-muted-foreground leading-relaxed text-sm line-clamp-3 mb-4 group-hover:text-muted-foreground/90 transition-colors duration-300">
                      {deal.description || 'Investment opportunity in growth-stage company with strong market position and expansion potential.'}
                    </CardDescription>
                    
                    {/* Enhanced Key Details Stack */}
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-muted/30 to-muted/20 backdrop-blur-sm border border-border/20 hover:border-border/40 transition-all duration-300">
                        <Building2 className="w-5 h-5 mr-4 text-accent-cyan flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-muted-foreground mr-2 font-medium">Sector:</span>
                        <span className="font-semibold text-foreground truncate">{deal.sector || 'Technology'}</span>
                      </div>
                      <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-muted/30 to-muted/20 backdrop-blur-sm border border-border/20 hover:border-border/40 transition-all duration-300">
                        <TrendingUp className="w-5 h-5 mr-4 text-accent-teal flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-muted-foreground mr-2 font-medium">Stage:</span>
                        <span className="font-semibold text-foreground truncate">{deal.stage_label || 'Growth'}</span>
                      </div>
                      <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-muted/30 to-muted/20 backdrop-blur-sm border border-border/20 hover:border-border/40 transition-all duration-300">
                        <DollarSign className="w-5 h-5 mr-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-muted-foreground mr-2 font-medium">Location:</span>
                        <span className="font-semibold text-foreground truncate">
                          {deal.location || [deal.city, deal.state_province, deal.country].filter(Boolean).join(', ') || 'United States'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                
                
                <CardContent className="pt-6 border-t-0 relative z-10">
                  <div className="space-y-6">
                    {/* Enhanced Investors Section */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/40 via-muted/30 to-background/50 backdrop-blur-sm border border-border/20 shadow-inner">
                      <div className="text-xs text-muted-foreground mb-4 font-semibold tracking-wider uppercase text-center">
                        Investment Partners
                      </div>
                      <div className="flex items-center justify-center">
                        {(() => {
                          // Get investors from various sources
                          let investors = []
                          
                          if (deal.deals_deal_investors && deal.deals_deal_investors.length > 0) {
                            investors = deal.deals_deal_investors
                              .map(di => di?.deals_investors?.name)
                              .filter(Boolean)
                          } else if (deal.firms && deal.firms.length > 0) {
                            investors = deal.firms
                          } else {
                            // Default investors for ZenScreen-like deals
                            investors = ['500 Startups', 'Bessemer Venture Partners', 'BMW i Ventures']
                          }

                          // Enhanced logo system for investors with prettier gradients
                          const investorLogos = {
                            '500 Startups': { initials: '500', color: 'from-red-500 via-red-400 to-pink-500' },
                            'Bessemer Venture Partners': { initials: 'BVP', color: 'from-blue-600 via-blue-500 to-indigo-600' },
                            'BMW i Ventures': { initials: 'BMW', color: 'from-gray-800 via-gray-700 to-slate-800' },
                            'Bullpen Capital': { initials: 'BC', color: 'from-green-600 via-green-500 to-emerald-600' },
                            'DCM': { initials: 'DCM', color: 'from-purple-600 via-purple-500 to-violet-600' },
                            'Duchossois Capital Management': { initials: 'DCM', color: 'from-slate-700 via-slate-600 to-gray-700' },
                            'EchoVC Partners': { initials: 'EVC', color: 'from-orange-500 via-orange-400 to-red-500' },
                            'Fontinalis Partners': { initials: 'FP', color: 'from-teal-600 via-teal-500 to-cyan-600' },
                            'Hinge Capital': { initials: 'HC', color: 'from-pink-500 via-pink-400 to-rose-500' },
                            'Kapor Capital': { initials: 'KC', color: 'from-indigo-600 via-indigo-500 to-purple-600' },
                            'LaunchCapital Ventures': { initials: 'LCV', color: 'from-emerald-600 via-emerald-500 to-green-600' },
                            'Life360 Inc': { initials: 'L360', color: 'from-blue-500 via-blue-400 to-cyan-500' },
                            'Seraph Group': { initials: 'SG', color: 'from-blue-600 via-blue-500 to-blue-700' },
                            'Social Leverage Capital': { initials: 'SLC', color: 'from-gray-700 via-gray-600 to-slate-700' }
                          }

                          // Limit to first 4 investors for clean display
                          const displayInvestors = investors.slice(0, 4)
                          const hasMore = investors.length > 4

                          return (
                            <div className="flex flex-col items-center space-y-4">
                              <div className="flex items-center justify-center space-x-1">
                                {displayInvestors.map((investor, index) => {
                                  const logoData = investorLogos[investor] || {
                                    initials: investor.split(' ').map(word => word.charAt(0)).slice(0, 2).join('').toUpperCase(),
                                    color: 'from-primary via-primary/90 to-accent'
                                  }
                                  
                                  return (
                                    <div 
                                      key={index}
                                      className={`relative w-12 h-12 bg-gradient-to-br ${logoData.color} rounded-full flex items-center justify-center shadow-2xl hover:shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer border-2 border-white/20 backdrop-blur-sm ${index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'} ${index > 0 ? '-ml-3' : ''} group-hover:-translate-y-1`}
                                      title={investor}
                                      style={{
                                        animationDelay: `${index * 100}ms`
                                      }}
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                                      <span className="text-xs font-bold text-white relative z-10">
                                        {logoData.initials}
                                      </span>
                                    </div>
                                  )
                                })}
                                
                                {hasMore && (
                                  <div className="w-12 h-12 bg-gradient-to-br from-muted via-muted-foreground/20 to-muted/80 rounded-full flex items-center justify-center shadow-lg -ml-3 z-0 border-2 border-white/10 backdrop-blur-sm group-hover:-translate-y-1 transition-all duration-300">
                                    <span className="text-xs font-bold text-muted-foreground">
                                      +{investors.length - 4}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-center">
                                {displayInvestors.length === 1 && (
                                  <>
                                    <div className="font-semibold text-foreground text-sm">
                                      {displayInvestors[0]}
                                    </div>
                                    <div className="text-xs text-accent-cyan font-medium">
                                      Lead Investor
                                    </div>
                                  </>
                                )}
                                
                                {displayInvestors.length > 1 && (
                                  <>
                                    <div className="font-semibold text-foreground text-sm">
                                      {displayInvestors[0]} {hasMore ? `& ${investors.length - 1} others` : `& ${displayInvestors.length - 1} others`}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Investment Consortium
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                    
                    {/* Enhanced Action Button */}
                    <Button 
                      asChild
                      variant="outline" 
                      className="w-full h-14 border-0 bg-gradient-to-r from-primary/20 via-primary/15 to-accent/20 hover:from-primary/30 hover:via-primary/25 hover:to-accent/30 text-primary hover:text-primary-foreground transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25 group-hover:scale-105 rounded-2xl font-semibold text-base backdrop-blur-sm relative overflow-hidden"
                    >
                      <Link to={`/deal/${deal.deal_id || deal.id}`} className="flex items-center justify-center space-x-3">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10">View Deal Details</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                      </Link>
                    </Button>
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