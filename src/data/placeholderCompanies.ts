import { Company } from '@/hooks/useCompanies'

export const placeholderCompanies: Record<string, Company> = {
  'zenscreen': {
    id: 'zenscreen-placeholder',
    name: 'ZenScreen',
    slug: 'zenscreen',
    description: 'ZenScreen is a market-leading SaaS platform transforming how enterprises manage and deploy screens across multiple locations with AI-powered content optimization. Our cutting-edge technology enables businesses to seamlessly coordinate digital displays, optimize content delivery, and maximize audience engagement through intelligent automation and real-time analytics.',
    website: 'https://zenscreen.ai',
    logo_url: null,
    company_type: 'startup',
    founded_date: '2019-03-15',
    employee_count: 85,
    industry_tags: [
      'Digital Signage',
      'AI/ML',
      'SaaS',
      'Enterprise Software',
      'Content Management',
      'Real-time Analytics',
      'IoT',
      'Computer Vision'
    ],
    city: 'San Francisco',
    country: 'United States',
    region: 'North America',
    social_links: {
      linkedin: 'https://linkedin.com/company/zenscreen',
      twitter: 'https://twitter.com/zenscreen',
      github: 'https://github.com/zenscreen'
    },
    contact_email: 'hello@zenscreen.ai',
    meta_description: 'ZenScreen - AI-powered digital signage platform for enterprise screen management',
    featured: true,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  'agritech-solutions': {
    id: 'agritech-solutions-placeholder',
    name: 'AgriTech Solutions',
    slug: 'agritech-solutions',
    description: 'AgriTech Solutions is revolutionizing modern agriculture through precision farming technologies, IoT sensors, and AI-driven crop optimization. Our comprehensive platform helps farmers increase yields, reduce waste, and implement sustainable farming practices while providing real-time insights into soil health, weather patterns, and crop performance.',
    website: 'https://agritechsolutions.com',
    logo_url: null,
    company_type: 'startup',
    founded_date: '2020-06-01',
    employee_count: 142,
    industry_tags: [
      'AgriTech',
      'IoT',
      'Precision Farming',
      'AI/ML',
      'Sustainability',
      'Supply Chain',
      'Data Analytics',
      'Climate Tech'
    ],
    city: 'Melbourne',
    country: 'Australia',
    region: 'Asia-Pacific',
    social_links: {
      linkedin: 'https://linkedin.com/company/agritech-solutions',
      twitter: 'https://twitter.com/agritechsol',
      instagram: 'https://instagram.com/agritechsolutions'
    },
    contact_email: 'info@agritechsolutions.com',
    meta_description: 'AgriTech Solutions - Precision farming and agricultural technology for sustainable agriculture',
    featured: true,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  'freshproduce-logistics': {
    id: 'freshproduce-logistics-placeholder',
    name: 'FreshProduce Logistics',
    slug: 'freshproduce-logistics',
    description: 'FreshProduce Logistics is the leading cold-chain logistics provider specializing in fresh fruit and vegetable distribution across Asia-Pacific. Our temperature-controlled supply chain network ensures maximum freshness from farm to consumer, utilizing advanced tracking systems, predictive analytics, and sustainable transportation methods to minimize food waste and optimize delivery efficiency.',
    website: 'https://freshproducelogistics.com.au',
    logo_url: null,
    company_type: 'growth',
    founded_date: '2015-09-20',
    employee_count: 320,
    industry_tags: [
      'Cold Chain Logistics',
      'Fresh Produce',
      'Supply Chain',
      'Food Safety',
      'Sustainability',
      'Transportation',
      'B2B Services',
      'Food Technology'
    ],
    city: 'Sydney',
    country: 'Australia',
    region: 'Asia-Pacific',
    social_links: {
      linkedin: 'https://linkedin.com/company/freshproduce-logistics',
      website: 'https://freshproducelogistics.com.au'
    },
    contact_email: 'partnerships@freshproducelogistics.com.au',
    meta_description: 'FreshProduce Logistics - Cold-chain logistics and fresh produce distribution across Australia',
    featured: false,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  'vertical-farms-innovations': {
    id: 'vertical-farms-innovations-placeholder',
    name: 'Vertical Farms Innovations',
    slug: 'vertical-farms-innovations',
    description: 'Vertical Farms Innovations is pioneering the future of urban agriculture through advanced hydroponic and aeroponic farming systems. Our scalable vertical farming solutions enable year-round production of fresh vegetables and herbs in controlled environments, using 95% less water and 90% less land than traditional farming while eliminating pesticides and reducing carbon footprint.',
    website: 'https://verticalfarmsinnovations.com',
    logo_url: null,
    company_type: 'startup',
    founded_date: '2021-11-10',
    employee_count: 67,
    industry_tags: [
      'Vertical Farming',
      'Hydroponics',
      'Urban Agriculture',
      'Climate Tech',
      'Sustainability',
      'Food Security',
      'AgriTech',
      'Clean Energy'
    ],
    city: 'Brisbane',
    country: 'Australia',
    region: 'Asia-Pacific',
    social_links: {
      linkedin: 'https://linkedin.com/company/vertical-farms-innovations',
      twitter: 'https://twitter.com/verticalfarms',
      youtube: 'https://youtube.com/verticalfarmsinnovations'
    },
    contact_email: 'hello@verticalfarmsinnovations.com',
    meta_description: 'Vertical Farms Innovations - Advanced hydroponic farming systems for urban agriculture',
    featured: false,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
}

export const getPlaceholderCompany = (slug: string): Company | null => {
  return placeholderCompanies[slug] || null
}