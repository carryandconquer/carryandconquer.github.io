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

  // Sector mapping
  const sectorMapping: Record<string, string[]> = {
    "Business Services": ["Business Services", "Financial Services", "Insurance", "Outsourcing"],
    "Clean Tech.": ["Clean Technology", "Environmental Services", "Renewable Energy"],
    "Consumer Disc.": ["Beverages", "Consumer Products", "Consumer Services", "Education / Training", "Leisure", "Retail"],
    "Diversified": ["Diversified"],
    "Energy and Util.": ["Energy", "Oil & Gas", "Power", "Utilities"],
    "Food and Ag.": ["Agriculture", "Food"],
    "Healthcare": ["Biomedical", "Biotechnology", "Healthcare", "Healthcare IT", "Medical Devices", "Medical Instruments", "Medical Technologies", "Pharmaceuticals"],
    "Industrials": ["Aerospace", "Armaments", "Construction", "Defence", "Industrial", "Logistics", "Manufacturing", "Shipping", "Transportation"],
    "Internet": ["Internet"],
    "Materials": ["Chemicals", "Materials", "Mining", "Timber"],
    "Other IT": ["Information Services", "IT", "IT Infrastructure", "IT Security"],
    "Real Estate": ["Hotels and Offices", "Property"],
    "Semic. & Electronics": ["Electronics", "Hardware", "Semiconductors"],
    "Software & Related": ["Software", "Technology"],
    "Telecoms": ["Advertising", "Media", "Network", "Telecom Media", "Telecoms"]
  };

  const subsectorMapping: Record<string, string[]> = {
    "Business Services": ["Accounting Services", "Accounting/Finance Software", "Business Services", "Cloud Computing & Solutions", "Commercial Printing", "Computer and Office Equipment Distributors", "Conferencing Software", "Consulting Services", "Consumer Electronics Stores", "Consumer Products", "Data Storage", "Digital Media", "Engineering", "Food Distributors", "Home Centres and Hardware Stores", "IT", "Internet", "Legal Services", "Legal Software", "Manufacturing", "Mobile Applications", "Office Equipment", "Oil and Gas Exploration and Production", "Paper Products Manufacturing", "Software", "Technology", "Web Applications", "e-Commerce"],
    "Financial Services": ["Accounting Services", "Accounting/Finance Software", "Accounting/Finance Websites", "Analytics & Performance Software", "Banks", "Billing", "Cloud Computing & Solutions", "Consulting Services", "Consumer Finance", "Consumer Services", "Credit Collections and Services", "Finance and Insurance Sector", "Gaming", "HR & Workforce Software", "Infrastructure", "Investment Banking", "Legal Software", "Logistics Software", "Mobile Applications", "Mortgage Banking", "Nanotechnology", "Payments and Procurement Software", "Property", "Securities Brokers", "Social Networking & Communication Platform", "Solar Power", "Solar Thermal", "Technology", "Web Applications", "e-Commerce", "e-Financial"],
    "Insurance": ["Accounting/Finance Software", "Application Integration Software", "Financial Services", "Healthcare", "Healthcare IT", "Insurance Agencies", "Network & Connectivity", "Web Applications", "e-Commerce", "e-Financial"],
    "Outsourcing": ["Application Integration Software", "BPO Services", "Customer Relationship Management", "Education & Training Website", "HR & Workforce Software", "Healthcare", "Healthcare IT", "Offshore IT Services/IT Outsourcing"],
    "Clean Technology": ["Clean Technology", "Emissions Control", "Energy Storage", "Green IT", "Recycling", "Solar Power", "Solar Thermal", "Waste Management", "Water Purification and Recycling"],
    "Environmental Services": ["Analytics & Performance Software", "Clean Technology", "Cloud Computing & Solutions", "Efficiency Infrastructure", "Electric Energy Distribution", "Emissions Control", "Energy Storage", "Engineering Software", "Green IT", "Grid Management Systems", "Infrastructure", "Manufacturing", "Recycling", "Solar Power", "Solar Thermal", "Waste Management", "Water Purification and Recycling", "Web Applications"],
    "Renewable Energy": ["Agriculture Technologies", "Clean Technology", "Manufacturing", "Solar Power", "Solar Thermal", "Solid State Lighting (SSL)"],
    "Beverages": ["Beverage Manufacture and Bottling", "Coffee and Tea Manufacturing", "Soft Drinks & Carbonated Waters"],
    "Consumer Products": ["Advanced Materials", "Advanced Medical Equipment", "Analytics & Performance Software", "Application Integration Software", "Beverage Manufacture and Bottling", "Bioinformatics", "Clothes Manufacturing", "Clothing Stores", "Cloud Computing & Solutions", "Coffee Shops", "Connectivity Software", "Cosmetics & Toiletries", "Courier & Delivery Services", "Elective/Aesthetic Medicine", "Electronic Components", "Electronic Components & Semiconductor Manufacture", "Electronic Components & Semiconductor Wholesalers", "Footwear Manufacture", "Furniture Manufacturing", "Gaming", "Hardware", "High-Tech", "Household Appliance Manufacture", "Household Appliances", "IT Security", "Manufacturing", "Mobile Applications", "Monitoring & Security Software", "Perfumes", "Personal Care Products Manufacturing", "Retail", "Soft Drinks & Carbonated Waters", "Supermarkets & Grocery Stores", "Technology", "Telecoms Equipment", "Video Streaming Software", "Web Applications", "Wholesale, and Retail", "e-Commerce", "eMarketing"],
    "Consumer Services": ["Automobile Repair", "Child Care Organisations", "Courier & Delivery Services", "Customer Relationship Management", "Mobile Applications", "Packaging", "Search Engines", "Software", "e-Commerce"],
    "Education / Training": ["Analytics & Performance Software", "Consulting Services", "Consumer Services", "Education & Training Software", "Education & Training Website", "Education and Training Services", "IT", "Mobile Applications", "Schools", "Technology", "Web Applications", "Web Development", "e-Commerce"],
    "Leisure": ["Beverages", "Digital Media", "Entertainment", "Fitness & Gyms", "Fruit and Vegetables", "Gaming", "Hotels", "Internet/Web Games", "Mobile Applications", "Music & Recording Industry", "Professional Sports Teams", "Restaurants", "Sales & Marketing Software", "Snack Foods", "Social Networking & Communication Platform", "Technology", "Travel & Tourism", "Video Games", "e-Commerce", "eMarketing"],
    "Retail": ["Automobile Dealerships", "Automobile and Parts Manufacturing", "Clothes Manufacturing", "Clothing Stores", "Coffee Shops", "Coffee and Tea Manufacturing", "Computer Services", "Customer Relationship Management", "Department Stores", "Electric/Hybrid Vehicles", "Footwear Manufacture", "Home Centres and Hardware Stores", "Internet", "Manufacturing", "Mobile Applications", "Pet Food", "Search Engines", "Supermarkets & Grocery Stores", "Toy & Hobby Stores", "Web Applications", "Wholesale, and Retail", "e-Commerce"],
    "Diversified": [],
    "Energy": ["Electric Energy Distribution", "Power Generation", "Solar Power", "Solar Thermal"],
    "Oil & Gas": ["Industrial Wholesalers", "Oil and Gas Field Services", "e-Commerce"],
    "Power": ["Education and Training Services", "Healthcare", "Manufacturing", "Power Generation", "Semiconductor Equipment & Testing", "Solar Power", "Solar Thermal", "Waste Management", "Water Purification and Recycling", "Water and Sewer Utilities", "e-Commerce"],
    "Utilities": ["Energy", "Power", "Power Generation"],
    "Agriculture": ["Agribusiness", "Agriculture Crop Production", "Agriculture Technologies", "Alternative Medicine", "Biotechnology", "Clean Technology", "Farm Equipment", "Farm Support Services", "High-Tech", "Manufacturing", "Retail", "Technology"],
    "Food": ["Bioinformatics", "Coffee and Tea Manufacturing", "Courier & Delivery Services", "Dairy Products", "Fruit and Vegetables", "Internet", "Manufacturing", "Mobile Applications", "Nutritional Supplements", "Scientific Software", "Snack Foods", "Web Applications", "e-Commerce"],
    "Biomedical": ["Bioinformatics", "Biotechnology", "Medical Technologies", "Molecular Medicine"],
    "Biotechnology": ["Advanced Medical Equipment", "Agricultural Chemicals", "Agriculture Technologies", "Alternative Medicine", "Analytics & Performance Software", "BioPharmaceuticals", "Biofuels", "Bioinformatics", "Biomedical", "Biopolymers", "Cardiology", "Chiropractor Offices", "Clean Technology", "Disease Diagnosis", "Fishing & Seafood", "Genetics & Gene Therapy", "Green IT", "Healthcare", "Healthcare IT", "Life Sciences", "Manufacturing", "Medical Devices", "Medical Diagnostics", "Medical Research", "Medical Software", "Medical Technologies", "Nutritional Supplements", "Oncology/Cancer Treatment", "Optometrists and Opticians", "Pharmaceutical Development", "Pharmaceutical Manufacturing", "Pharmaceuticals", "Pharmacogenomics", "Predictive Medicine", "Scientific Software", "Systems Management Software", "Technology", "Web Applications", "e-Commerce"],
    "Healthcare": ["Advanced Medical Equipment", "Alternative Medicine", "Analytics & Performance Software", "BPO Services", "BioPharmaceuticals", "Biotechnology", "Cardiology", "Disease Diagnosis", "Electronic Components & Semiconductor Manufacture", "Fitness & Gyms", "Health & Wellbeing Centres", "Healthcare IT", "Home Healthcare Services", "Hospitals", "Insurance", "Life Sciences", "Manufacturing", "Medical Devices", "Medical Diagnostics", "Medical Equipment Distributors", "Medical Research", "Medical Software", "Medical Technologies", "Mental Health and Substance Abuse Services", "Mobile Applications", "Nursing Homes and Assisted Living", "Oncology/Cancer Treatment", "Optometrists and Opticians", "Pharmaceutical Development", "Pharmaceutical Manufacturing", "Pharmaceuticals", "Retail", "Specialty Pharmaceuticals", "Surgical Centres", "Technology", "Web Applications", "e-Commerce"],
    "Healthcare IT": ["Advanced Medical Equipment", "Analytics & Performance Software", "Application Integration Software", "Biotechnology", "Browser Software & Plug-ins", "Cardiology", "Chiropractor Offices", "Clothes Manufacturing", "Conferencing Software", "Connectivity Software", "Domain & SEO Services", "Genetics & Gene Therapy", "Healthcare", "Home Healthcare Services", "Hospitals", "Information Services", "Internet", "Life Sciences", "Manufacturing", "Medical Diagnostics", "Medical Research", "Medical Software", "Medical Technologies", "Mental Health and Substance Abuse Services", "Mobile Applications", "Scientific Software", "Social Networking & Communication Platform", "Software", "Storage Management Software", "Technology", "Video Streaming Software", "Web Applications", "e-Commerce"],
    "Medical Devices": ["Advanced Medical Equipment", "Analytics & Performance Software", "Bioinformatics", "Biopolymers", "Biotechnology", "Cardiology", "Chiropractor Offices", "Healthcare", "Healthcare IT", "Manufacturing", "Medical & Imaging Laboratories", "Medical Diagnostics", "Medical Equipment Distributors", "Medical Instruments", "Medical Research", "Medical Software", "Medical Technologies", "Mobile Applications", "Oncology/Cancer Treatment", "Optometrists and Opticians", "Pharmaceutical Development", "Search Engines"],
    "Medical Instruments": ["Advanced Medical Equipment", "Biomedical", "Cardiology", "Distribution", "Healthcare", "Hospitals", "Manufacturing", "Medical & Imaging Laboratories", "Medical Devices", "Medical Diagnostics", "Medical Equipment Distributors", "Medical Research", "Medical Technologies", "Optometrists and Opticians", "Pharmaceutical Development", "Surgical Centres"],
    "Medical Technologies": ["Advanced Medical Equipment", "Biomedical", "Biotechnology", "Medical Devices", "Medical Software"],
    "Pharmaceuticals": ["Advanced Medical Equipment", "Analytics & Performance Software", "BioPharmaceuticals", "Bioinformatics", "Biomedical", "Biopolymers", "Biotechnology", "Chemicals", "Disease Diagnosis", "Genetics & Gene Therapy", "Healthcare", "Healthcare IT", "Internet", "Manufacturing", "Medical & Imaging Laboratories", "Medical Devices", "Medical Research", "Medical Software", "Medical Technologies", "Molecular Medicine", "Nanotechnology", "Oncology/Cancer Treatment", "Pharmaceutical Development", "Pharmaceutical Manufacturing", "Pharmacogenomics", "Specialty Pharmaceuticals", "Technology"],
    "Aerospace": ["Manufacturing"],
    "Armaments": ["Armaments", "Defence"],
    "Construction": ["Engineering Software", "Infrastructure"],
    "Defence": ["Armaments", "Defence"],
    "Industrial": ["Industrial Machinery Manufacturing", "Machine Tool Manufacture", "Manufacturing"],
    "Logistics": ["Deep Sea Shipping", "Electronic Components & Semiconductor Wholesalers", "Freight Shipping Services", "Manufacturing"],
    "Manufacturing": ["Industrial Machinery Manufacturing", "Machine Tool Manufacture", "Manufacturing"],
    "Shipping": ["Deep Sea Shipping", "Freight Shipping Services"],
    "Transportation": ["Deep Sea Shipping", "Freight Shipping Services", "Transportation"],
    "Internet": ["Accounting/Finance Software", "Accounting/Finance Websites", "Adult Entertainment Software", "Advertising", "Analytics & Performance Software", "Application Integration Software", "Automobile Dealerships", "Automobile and Parts Manufacturing", "Billing", "Clean Technology", "Cloud Computing & Solutions", "Communications", "Conferencing Software", "Connectivity Software", "Consumer Products", "Consumer Services", "Content Management Software", "Cosmetics & Toiletries", "Courier & Delivery Services", "Customer Relationship Management", "Digital Media", "Direct Marketing Services", "Domain & SEO Services", "Education & Training Software", "Education & Training Website", "Electronic Components", "Email", "Entertainment", "Finance and Insurance Sector", "Footwear Manufacture", "Furniture Manufacturing", "Gambling", "Gaming", "Green IT", "HR & Workforce Software", "Hardware", "Healthcare", "Healthcare IT", "IT", "IT Security", "Information Services", "Internet Service Providers", "Internet/Web Games", "Legal Software", "Logistics Software", "Media", "Medical Software", "Mental Health and Substance Abuse Services", "Mobile Applications", "Music & Recording Industry", "Music Production and Distribution", "Music Software", "Music Website", "Network", "Network & Connectivity", "Newspapers and News Organisations", "Nutritional Supplements", "Payments and Procurement Software", "Perfumes", "Personal Care Products Manufacturing", "Professional Sports Teams", "Property", "Publishing", "Real Estate", "Retail", "Sales & Marketing Software", "Search Engines", "Social Networking & Communication Platform", "Software", "Systems Management Software", "Technology", "Telecoms Equipment", "Travel & Tourism", "Video Streaming Software", "Warehouses", "Web Applications", "Web Development", "Website Hosting", "Wholesale, and Retail", "e-Commerce", "e-Financial", "eMarketing"],
    "Chemicals": ["Adhesives & Sealants", "Hardware", "Manufacturing"],
    "Materials": ["Adhesives & Sealants", "Biopolymers", "Engineering", "Glass", "Glass & Fibre Optic Manufacturing", "Healthcare", "Manufacturing", "Molecular Chemicals", "Nanotechnology", "Plastic and Rubber Manufacturing", "Rubber & Plastics", "Wireless"],
    "Mining": [],
    "Timber": ["Digital Media", "Information Services", "Manufacturing", "Materials", "Mobile Applications", "Paper Products Manufacturing", "Search Engines"],
    "Information Services": ["Analytics & Performance Software", "Digital Media", "Multimedia & Graphics", "Search Engines", "Systems Management Software", "Web Applications", "eMarketing"],
    "IT": ["Cloud Computing & Solutions", "IT Infrastructure", "IT Security", "Network", "Software", "Technology"],
    "IT Infrastructure": ["Analytics & Performance Software", "Application Integration Software", "Browser Software & Plug-ins", "Cloud Computing & Solutions", "Connectivity Software", "Consulting Services", "IT", "IT Security", "Integrated Telecoms Services", "Mobile Applications", "Monitoring & Security Software", "Network", "Operating Systems (OS)", "Search Engines", "Systems Management Software", "Technology", "Telecoms Services", "Website Hosting", "Wire-line Telecoms Services & Equipment", "Wireless", "Wireless Telecoms Services & Equipment", "e-Commerce", "eMarketing"],
    "IT Security": ["Analytics & Performance Software", "Application Integration Software", "Browser Software & Plug-ins", "Cloud Computing & Solutions", "Consulting Services", "Content Management Software", "Data Storage", "Education and Training Services", "Email", "IT", "IT Infrastructure", "Intellectual Property", "Mobile Applications", "Monitoring & Security Software", "Network", "Storage Management Software", "Systems Management Software", "Technology", "Web Applications", "Wireless Telecoms Services & Equipment", "e-Commerce"],
    "Hotels and Offices": ["Hotels", "Real Estate"],
    "Property": ["Property", "Real Estate"],
    "Electronics": ["Analytics & Performance Software", "Connectivity Software", "Electronic Components", "Electronic Components & Semiconductor Manufacture", "Electronic Connectors", "Engineering", "Integrated Circuits", "Manufacturing", "Multimedia & Graphics", "Nanotechnology", "Network", "Semiconductors", "Solid State Lighting (SSL)", "Technology", "e-Commerce"],
    "Hardware": ["Analytics & Performance Software", "Armaments", "Communications", "Computer Services", "Consumer Services", "Data Storage", "Defence", "Digital Media", "Electronic Components", "Electronic Components & Semiconductor Manufacture", "Fabless Semiconductors", "Fitness & Gyms", "High-Tech", "IT Infrastructure", "Industrial Machinery Manufacturing", "Logistics Software", "Machine Tool Manufacture", "Manufacturing", "Mobile Applications", "Network", "Operating Systems (OS)", "Retail", "Semiconductors", "Systems Management Software", "Technology", "Wireless Telecoms Services & Equipment", "e-Commerce"],
    "Semiconductors": ["Analytics & Performance Software", "Application Integration Software", "Business Services", "Communications", "Electronic Components", "Electronic Components & Semiconductor Manufacture", "Electronic Components & Semiconductor Wholesalers", "Fabless Semiconductors", "Hardware", "Infrastructure", "Integrated Circuits", "Manufacturing", "Network", "Power Generation", "Scientific Software", "Semiconductor Equipment & Testing", "Software", "Technology", "Wireless", "Wireless Telecoms Services & Equipment"],
    "Software": ["Accounting Services", "Accounting/Finance Software", "Advanced Materials", "Advanced Medical Equipment", "Advertising", "Advertising Exchange Software", "Aerospace", "Agriculture Technologies", "Alcohol Distributors", "Analytics & Performance Software", "Application Integration Software", "Automobile and Parts Manufacturing", "Billing", "Bioinformatics", "Biotechnology", "Browser Software & Plug-ins", "Business Services", "Child Care Organisations", "Cloud Computing & Solutions", "Communications", "Computer Services", "Conferencing Software", "Connectivity Software", "Construction", "Consulting Services", "Consumer Finance", "Content Management Software", "Credit Collections and Services", "Customer Relationship Management", "Data Storage", "Dental Products & Services", "Dentists Offices & Clinics", "Digital Media", "Direct Marketing Services", "Domain & SEO Services", "Education & Training Software", "Education & Training Website", "Education and Training Services", "Electric Energy Distribution", "Electric Power Generation", "Electronic Components", "Electronic Components & Semiconductor Manufacture", "Electronics", "Email", "Energy", "Engineering", "Engineering Software", "Entertainment", "Environmental Services", "Fiber Optics", "Finance and Insurance Sector", "Financial Services", "Fitness & Gyms", "Food", "Food Distributors", "Freight Shipping Services", "Gaming", "Green IT", "HR & Workforce Software", "Hardware", "Healthcare IT", "High-Tech", "IT", "IT Infrastructure", "IT Security", "Information Services", "Infrastructure", "Integrated Telecoms Services", "Intelligent Sensors", "Internet", "Internet/Web Games", "Legal Software", "Life Sciences", "Logistics Software", "Manufacturing", "Marketing", "Media", "Medical Devices", "Medical Software", "Mobile Applications", "Mobile Messaging", "Monitoring & Security Software", "Multimedia & Graphics", "Music & Recording Industry", "Music Production and Distribution", "Network", "Network & Connectivity", "Offshore IT Services/IT Outsourcing", "Operating Systems (OS)", "Packaging", "Payments and Procurement Software", "Professional Sports Teams", "Property", "Restaurants", "Retail", "Sales & Marketing Software", "Scientific Software", "Search Engines", "Social Networking & Communication Platform", "Solar Power", "Solar Thermal", "Storage Management Software", "Systems Management Software", "Technology", "Telecom Media", "Telecoms", "Telecoms Equipment", "Telecoms Services", "Transportation", "Travel & Tourism", "Video Games", "Video Streaming Software", "Warehouses", "Web Applications", "Web Development", "Website Hosting", "Wireless", "Wireless Telecoms Services & Equipment", "e-Commerce", "e-Financial", "eMarketing"],
    "Technology": ["Cloud Computing & Solutions", "High-Tech", "Software", "Technology", "Web Applications"],
    "Advertising": ["Analytics & Performance Software", "Business Services", "Cloud Computing & Solutions", "Communications", "Conferencing Software", "Consulting Services", "Direct Marketing Services", "Education and Training Services", "Fiber Optics", "Integrated Telecoms Services", "Internet", "Mobile Applications", "Network", "Sales & Marketing Software", "Search Engines", "Software", "Technology", "Telecoms", "Telecoms Equipment", "Telecoms Services", "Video Streaming Software", "Web Applications", "e-Commerce", "eMarketing"],
    "Media": ["Book Publishers", "Consulting Services", "Digital Media", "Education and Training Services", "Information Services", "Multimedia & Graphics", "Newspapers and News Organisations", "Radio Broadcasting and Programming", "Search Engines", "Social Networking & Communication Platform", "Television Broadcasting and Programming", "Video Streaming Software", "Web Applications", "e-Commerce"],
    "Network": ["Network", "Network & Connectivity", "Telecoms Equipment", "Telecoms Services", "Wire-line Telecoms Services & Equipment", "Wireless", "Wireless Telecoms Services & Equipment"],
    "Telecom Media": ["Digital Media", "Multimedia & Graphics", "Radio Broadcasting and Programming", "Television Broadcasting and Programming", "Video Streaming Software"],
    "Telecoms": ["Aerospace", "Airlines and Air Travel", "Cloud Computing & Solutions", "Communications", "Connectivity Software", "Consulting Services", "Electronic Components", "Fiber Optics", "Hardware", "IT", "Integrated Telecoms Services", "Internet", "Internet Service Providers", "Manufacturing", "Mobile Applications", "Network", "Network & Connectivity", "Semiconductors", "Software", "Systems Management Software", "Technology", "Telecom Media", "Telecoms Equipment", "Telecoms Services", "Telecoms Towers & Infrastructure", "Wire-line Telecoms Services & Equipment", "Wireless", "Wireless Telecoms Services & Equipment"]
  };

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