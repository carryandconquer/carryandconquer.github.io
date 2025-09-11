import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Building, Clock, Target, Users, Briefcase, Zap, Globe, BarChart3, MessageSquare, AlertTriangle, Trophy, Rocket, Crown } from "lucide-react"
import { useState, useEffect } from "react"
import { usePeople } from "@/hooks/usePeople"
import { useCompanies } from "@/hooks/useCompanies"
import { Link } from "react-router-dom"
import { useSnapshotData } from "@/hooks/useSnapshotData"

const Snapshot = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all-regions")
  const [selectedCountry, setSelectedCountry] = useState<string>("all-countries")
  const [selectedSector, setSelectedSector] = useState<string>("all-sectors")
  const [selectedSubSector, setSelectedSubSector] = useState<string>("all-sub-sectors")
  const [selectedTertiary, setSelectedTertiary] = useState<string>("all-tertiary")
  
  // Build filters for the snapshot data hook (tertiary made non-functional)
  const filters = {
    region: selectedRegion !== "all-regions" ? selectedRegion.replace('-', ' ') : undefined,
    country: selectedCountry !== "all-countries" ? selectedCountry.replace('-', ' ') : undefined,
    sector: selectedSector !== "all-sectors" ? selectedSector.replace('-', ' ') : undefined,
    subSector: selectedSubSector !== "all-sub-sectors" ? selectedSubSector.replace('-', ' ') : undefined,
  }

  // Fetch data from database
  const { marketMetrics: dbMarketMetrics, trendingCompanies: dbTrendingCompanies, trendingPeople: dbTrendingPeople, deals: dbDeals, isLoading } = useSnapshotData(filters)
  
  // Fetch featured people for trending section fallback
  const { data: peopleData } = usePeople()
  const featuredPeople = peopleData?.filter(person => person.featured).slice(0, 4) || []
  
  // Fetch featured companies for trending section fallback
  const { data: companiesData } = useCompanies()
  const featuredCompanies = companiesData?.filter(company => company.featured).slice(0, 4) || []

  // Region to countries mapping based on Private Equity Regional Taxonomy
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
      { value: "congo", label: "Congo" },
      { value: "djibouti", label: "Djibouti" },
      { value: "dr-congo", label: "DR Congo" },
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
      { value: "ivory-coast-cote-divoire", label: "Ivory Coast (Côte d'Ivoire)" },
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
      { value: "sao-tome-and-principe", label: "São Tomé and Príncipe" },
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
      { value: "greenland", label: "Greenland" },
      { value: "mexico", label: "Mexico" },
      { value: "united-states", label: "United States" }
    ]
  }

  // GICS Sector mapping
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

  // Get filtered tertiary sectors (non-functional)
  const getFilteredTertiary = () => {
    return [] // Tertiary filter is disabled
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
  // Convert database market metrics to display format
  const getMarketMetrics = () => {
    if (dbMarketMetrics.length > 0) {
      return dbMarketMetrics.map(metric => {
        // Handle news items differently
        if (metric.metric_category === 'news') {
          const getNewsIcon = (title: string) => {
            if (title.toLowerCase().includes('safety') || title.toLowerCase().includes('issue')) return AlertTriangle
            if (title.toLowerCase().includes('win') || title.toLowerCase().includes('victory') || title.toLowerCase().includes('appeal')) return Trophy
            if (title.toLowerCase().includes('launch') || title.toLowerCase().includes('rollout')) return Rocket
            return MessageSquare
          }
          
          return {
            icon: getNewsIcon(metric.metric_name),
            value: "Breaking", // For news items, show "Breaking" instead of a metric value
            label: metric.metric_name,
            sublabel: metric.current_value, // The news description goes here
            change: "News",
            isPositive: true,
            isNews: true // Flag to identify news items for different styling
          }
        }
        
        // Handle regular metrics
        const getMetricIcon = (category: string) => {
          if (category === 'financial') return DollarSign
          if (category === 'regulatory') return Target
          if (category === 'innovation') return Zap
          return BarChart3
        }
        
        return {
          icon: getMetricIcon(metric.metric_category),
          value: metric.current_value,
          label: metric.metric_name,
          sublabel: metric.metric_category,
          change: metric.change_percentage ? `${metric.change_percentage > 0 ? '+' : ''}${metric.change_percentage}%` : "N/A",
          isPositive: metric.change_direction === 'up' || (metric.change_percentage || 0) > 0,
          isNews: false
        }
      })
    }
    
    // Fallback to default metrics if no database data
    return [
      {
        icon: DollarSign,
        value: "$2.1B",
        label: "Transaction Volume",
        sublabel: "YTD Total Value",
        change: "+12.5%",
        isPositive: true
      },
      {
        icon: Building,
        value: "147",
        label: "Number of New Deals",
        sublabel: "Active transactions",
        change: "+8.3%",
        isPositive: true
      },
      {
        icon: Users,
        value: "89",
        label: "Number of Active Companies",
        sublabel: "Portfolio companies",
        change: "+15.7%",
        isPositive: true
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
  }

  const marketMetrics = getMarketMetrics()

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

  // Convert database trending people to display format  
  const getTrendingPeople = () => {
    if (dbTrendingPeople.length > 0) {
      return dbTrendingPeople.map(person => ({
        name: person.name,
        company: person.company,
        achievements: person.description || person.position,
        initials: person.name.split(' ').map(n => n[0]).join(''),
        sectors: "Growth & Innovation", // Could be mapped from sector data
        profileImage: person.image_url || "https://picsum.photos/id/91/120/120",
        slug: person.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }))
    }

    // Fallback logic for featured people when no database data
    const getInitials = (name: string) => {
      return name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const getAchievement = (title: string, company: string) => {
      // Generate relevant achievements based on role and company
      if (title.includes('CEO') || title.includes('Chief Executive')) {
        return `Leading ${company} transformation`
      }
      if (title.includes('Founder') || title.includes('Co-Founder')) {
        return `Founded and scaling ${company}`
      }
      if (title.includes('CTO') || title.includes('Chief Technology')) {
        return `Driving tech innovation at ${company}`
      }
      if (title.includes('President')) {
        return `Expanding global operations`
      }
      return `Strategic leadership at ${company}`
    }

    const getSector = (tags: string[] | null, companyType: string) => {
      if (tags && tags.length > 0) {
        return tags[0] // Use first expertise tag
      }
      // Map company types to sectors
      switch (companyType) {
        case 'fintech': return 'Financial Technology'
        case 'enterprise': return 'Enterprise Technology'
        case 'startup': return 'Growth & Innovation'
        case 'biotech': return 'Biotechnology'
        case 'cybersecurity': return 'Cybersecurity'
        case 'healthcare': return 'Healthcare'
        default: return 'Technology & Innovation'
      }
    }

    const getProfileImage = (profileUrl: string | null, index: number) => {
      // Use existing profile image or generate placeholder
      if (profileUrl) return profileUrl
      const portraitIds = [91, 177, 186, 188, 203, 233, 251, 256, 280, 295]
      return `https://picsum.photos/id/${portraitIds[index % portraitIds.length]}/120/120`
    }

    return featuredPeople.map(person => ({
      name: person.full_name,
      company: person.company?.name || "Startup",
      achievements: getAchievement(person.title || "", person.company?.name || ""),
      initials: getInitials(person.full_name),
      sectors: getSector(person.expertise_tags, person.company?.company_type || 'startup'),
      profileImage: getProfileImage(person.profile_image_url, featuredPeople.indexOf(person)),
      slug: person.slug
    }))
  }

  const trendingPeople = getTrendingPeople()

  // Fallback to hardcoded data if no featured people
  const fallbackTrendingPeople = [
    {
      initials: "JB",
      name: "Jennifer Brooks",
      title: "Managing Partner",
      firm: "Apollo Global Management",
      achievement: "Led $3.2B healthcare buyout",
      sector: "Healthcare & Technology",
      profileImage: "https://picsum.photos/id/91/120/120",
      slug: null
    },
    {
      initials: "MR",
      name: "Michael Rivera",
      title: "Senior Partner",
      firm: "KKR & Co",
      achievement: "Closed $850M growth fund",
      sector: "Growth Equity",
      profileImage: "https://picsum.photos/id/177/120/120",
      slug: null
    },
    {
      initials: "SL",
      name: "Sarah Liu",
      title: "Investment Director",
      firm: "Blackstone",
      achievement: "Structured €1.2B infrastructure deal",
      sector: "Infrastructure",
      profileImage: "https://picsum.photos/id/186/120/120",
      slug: null
    },
    {
      initials: "DK",
      name: "David Kim",
      title: "Principal",
      firm: "Carlyle Group",
      achievement: "Pioneering ESG-focused investments",
      sector: "Sustainable Investing",
      profileImage: "https://picsum.photos/id/188/120/120",
      slug: null
    }
  ]

  const displayTrendingPeople = dbTrendingPeople.length > 0 ? 
    dbTrendingPeople.map(person => ({
      name: person.name,
      title: person.position,
      firm: person.company,
      achievement: person.description || person.position,
      sector: "Growth & Innovation",
      profileImage: person.image_url || "https://picsum.photos/id/91/120/120",
      initials: person.name.split(' ').map(n => n[0]).join(''),
      slug: person.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    })) : 
    (trendingPeople.length > 0 ? trendingPeople.map(person => ({
      name: person.name,
      title: person.company,
      firm: person.company,
      achievement: person.achievements,
      sector: person.sectors,
      profileImage: person.profileImage,
      initials: person.initials,
      slug: person.slug
    })) : fallbackTrendingPeople)

  // Convert database trending companies to display format
  const getTrendingCompanies = () => {
    if (dbTrendingCompanies.length > 0) {
      return dbTrendingCompanies.map(company => ({
        name: company.name,
        type: "growth",
        icon: Building,
        metric: company.change_percentage ? `+${company.change_percentage}%` : "Growth Leader",
        logo: company.image_url || "https://picsum.photos/id/100/120/120",
        slug: company.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }))
    }

    // Check for placeholder companies
    const placeholderCompanySlugs = ['zenscreen', 'agritech-solutions', 'freshproduce-logistics', 'vertical-farms-innovations']
    return placeholderCompanySlugs.map((slug, index) => ({
      name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      type: "growth",
      icon: Building,
      metric: "Growth Leader",
      logo: `https://picsum.photos/id/${100 + index}/120/120`,
      slug: slug
    }))

    // Fallback to original logic if no database data
    const getCompanyIcon = (companyType: string) => {
      switch (companyType) {
        case 'fintech': return DollarSign
        case 'enterprise': return Building
        case 'startup': return Zap
        case 'biotech': return Target
        case 'cybersecurity': return Briefcase
        case 'healthcare': return Users
        default: return TrendingUp
      }
    }

    const getGrowthMetric = (companyType: string) => {
      // Generate realistic growth metrics based on company type
      switch (companyType) {
        case 'fintech': return '+127% Revenue Growth'
        case 'enterprise': return '+85M Active Users'
        case 'startup': return '+240% YoY Growth'
        case 'biotech': return '+3 Clinical Trials'
        case 'cybersecurity': return '+95% Threat Detection'
        case 'healthcare': return '+2M Patients Served'
        default: return '+150% Market Expansion'
      }
    }

    const getCompanyLogo = (companyName: string, index: number) => {
      // Use company logos or placeholder logos
      const logoIds = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
      return `https://picsum.photos/id/${logoIds[index % logoIds.length]}/120/120`
    }

    return featuredCompanies.map(company => ({
      name: company.name,
      type: company.company_type || 'startup',
      icon: getCompanyIcon(company.company_type || 'startup'),
      metric: getGrowthMetric(company.company_type || 'startup'),
      logo: company.logo_url || getCompanyLogo(company.name, featuredCompanies.indexOf(company)),
      slug: company.slug
    }))
  }

  const trendingCompanies = getTrendingCompanies()

  // Fallback to hardcoded data if no featured companies
  const fallbackTrendingCompanies = [
    { 
      name: "TechVenture Inc", 
      type: "startup", 
      icon: Zap, 
      metric: "+240% YoY Growth", 
      logo: "https://picsum.photos/id/100/120/120",
      slug: null 
    },
    { 
      name: "FinanceCore", 
      type: "fintech", 
      icon: DollarSign, 
      metric: "+127% Revenue Growth", 
      logo: "https://picsum.photos/id/101/120/120",
      slug: null 
    },
    { 
      name: "Enterprise Solutions", 
      type: "enterprise", 
      icon: Building, 
      metric: "+85M Active Users", 
      logo: "https://picsum.photos/id/102/120/120",
      slug: null 
    },
    { 
      name: "BiosystemsAI", 
      type: "biotech", 
      icon: Target, 
      metric: "+3 Clinical Trials", 
      logo: "https://picsum.photos/id/103/120/120",
      slug: null 
    }
  ]

  const displayTrendingCompanies = trendingCompanies.length > 0 ? trendingCompanies : fallbackTrendingCompanies

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

        {/* Market Activity */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Market Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketMetrics.map((metric, index) => (
              <Card key={index} className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 ${
                metric.isNews ? 'border-l-4 border-l-accent-green' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <metric.icon className={`w-6 h-6 ${
                      metric.isNews 
                        ? metric.icon === AlertTriangle ? 'text-yellow-400' : 
                          metric.icon === Trophy ? 'text-green-400' : 
                          metric.icon === Rocket ? 'text-blue-400' : 'text-accent-green'
                        : 'text-accent-green'
                    }`} />
                    {!metric.isNews && (
                      <div className={`flex items-center gap-1 text-sm ${
                        metric.isPositive ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {metric.change}
                      </div>
                    )}
                    {metric.isNews && (
                      <Badge variant="outline" className="text-xs border-accent-green text-accent-green">
                        {metric.change}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className={`${metric.isNews ? 'text-xl' : 'text-3xl'} font-bold`}>
                      {metric.value}
                    </div>
                    <div className="text-lg font-semibold text-white">{metric.label}</div>
                    <div className={`text-sm text-white/60 ${
                      metric.isNews ? 'line-clamp-2' : ''
                    }`}>
                      {metric.sublabel}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Companies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayTrendingCompanies.map((company, index) => (
              <div key={index}>
                {company.slug ? (
                  <Link to={`/company/${company.slug}`} className="block">
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                            <img 
                              src={company.logo} 
                              alt={`${company.name} logo`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const iconWrapper = target.parentElement;
                                if (iconWrapper) {
                                  iconWrapper.innerHTML = `<company.icon className="w-8 h-8 text-accent-green" />`;
                                }
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-accent-green font-medium uppercase tracking-wide">{company.type}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="font-bold text-white">{company.name}</div>
                          <div className="text-sm text-white/60">{company.metric}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                          <img 
                            src={company.logo} 
                            alt={`${company.name} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const iconWrapper = target.parentElement;
                              if (iconWrapper) {
                                iconWrapper.innerHTML = `<company.icon className="w-8 h-8 text-accent-green" />`;
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-accent-green font-medium uppercase tracking-wide">{company.type}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-bold text-white">{company.name}</div>
                        <div className="text-sm text-white/60">{company.metric}</div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Trending People */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending People</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayTrendingPeople.map((person, index) => (
              <div key={index}>
                {person.slug ? (
                  <Link to={`/person/${person.slug}`} className="block">
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-accent-green to-accent-teal">
                            <img 
                              src={person.profileImage} 
                              alt={`${person.name} profile`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const wrapper = target.parentElement;
                                if (wrapper) {
                                  wrapper.className = "w-12 h-12 bg-gradient-to-r from-accent-green to-accent-teal rounded-full flex items-center justify-center text-black font-bold";
                                  wrapper.innerHTML = person.initials;
                                }
                              }}
                            />
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
                  </Link>
                ) : (
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-accent-green to-accent-teal">
                          <img 
                            src={person.profileImage} 
                            alt={`${person.name} profile`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const wrapper = target.parentElement;
                              if (wrapper) {
                                wrapper.className = "w-12 h-12 bg-gradient-to-r from-accent-green to-accent-teal rounded-full flex items-center justify-center text-black font-bold";
                                wrapper.innerHTML = person.initials;
                              }
                            }}
                          />
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
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Market Intelligence */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Market Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sector Outlook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Agricultural Technology</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Strong growth momentum with increasing focus on sustainability and supply chain optimization.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Growth Sector</Badge>
                      <Badge variant="outline" className="text-xs">ESG Focus</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Fresh Produce</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Increasing demand for organic and locally-sourced produce driving sector expansion.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Organic Growth</Badge>
                      <Badge variant="outline" className="text-xs">Local Sourcing</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Investment Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Food Tech Focus</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Increased investor appetite for sustainable agriculture and food tech companies.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Food Tech</Badge>
                      <Badge variant="outline" className="text-xs">Sustainability</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Supply Chain Innovation</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Growing investment in cold-chain logistics and supply chain optimization.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Logistics</Badge>
                      <Badge variant="outline" className="text-xs">Cold Chain</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Regional Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Asia-Pacific Growth</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Australia leading in agricultural innovation and vertical farming adoption.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Innovation Hub</Badge>
                      <Badge variant="outline" className="text-xs">APAC</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Export Opportunities</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Strong export potential for fresh produce to Asian markets.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Export Growth</Badge>
                      <Badge variant="outline" className="text-xs">Trade</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
      </div>
    </div>
  )
}

export default Snapshot