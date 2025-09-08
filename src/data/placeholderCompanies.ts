import { Company } from '@/hooks/useCompanies'

export const placeholderCompanies: Record<string, Company> = {
  'fresh-produce-group': {
    id: 'fresh-produce-group-placeholder',
    name: 'Fresh Produce Group',
    slug: 'fresh-produce-group',
    description: 'Fresh Produce Group is Australia\'s leading integrated fresh produce company, specializing in premium fruits and vegetables with a focus on sustainable farming practices and digital transformation. Our comprehensive supply chain spans from farm to retail, ensuring the highest quality fresh produce reaches consumers across Australia and Asia.',
    website: 'https://freshproducegroup.com.au',
    logo_url: null,
    company_type: 'enterprise',
    founded_date: '1995-03-20',
    employee_count: 450,
    industry_tags: [
      'Fresh Produce',
      'Supply Chain',
      'Digital Transformation',
      'Sustainable Agriculture', 
      'Cold Chain Logistics',
      'Food Safety',
      'Organic Certification',
      'Export Services'
    ],
    city: 'Melbourne',
    country: 'Australia',
    region: 'Asia-Pacific',
    social_links: {
      linkedin: 'https://linkedin.com/company/fresh-produce-group',
      facebook: 'https://facebook.com/freshproducegroup'
    },
    contact_email: 'info@freshproducegroup.com.au',
    meta_description: 'Fresh Produce Group - Leading Australian fresh produce company focused on sustainable farming and digital transformation',
    featured: true,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  'select-harvests': {
    id: 'select-harvests-placeholder',
    name: 'Select Harvests',
    slug: 'select-harvests',
    description: 'Select Harvests is Australia\'s largest almond company and a leading producer of premium nuts and health food products. With over 30 years of experience, we manage the entire value chain from orchard to consumer, focusing on sustainable farming practices and export market development across Asia.',
    website: 'https://selectharvests.com.au',
    logo_url: null,
    company_type: 'public',
    founded_date: '1987-11-15',
    employee_count: 620,
    industry_tags: [
      'Almond Production',
      'Nut Processing',
      'Export Agriculture',
      'Sustainable Farming',
      'Health Foods',
      'Asian Markets',
      'Vertical Integration',
      'Food Manufacturing'
    ],
    city: 'Melbourne',
    country: 'Australia',
    region: 'Asia-Pacific',
    social_links: {
      linkedin: 'https://linkedin.com/company/select-harvests',
      asx: 'https://asx.com.au/asxpdf/20240101/pdf/select-harvests.pdf'
    },
    contact_email: 'investors@selectharvests.com.au',
    meta_description: 'Select Harvests - Australia\'s largest almond company specializing in premium nuts and export market development',
    featured: false,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  'harvest-moon-organics': {
    id: 'harvest-moon-organics-placeholder',
    name: 'Harvest Moon Organics',
    slug: 'harvest-moon-organics',
    description: 'Harvest Moon Organics is a pioneering organic certification and support organization that helps Australian farmers transition to organic farming practices. We provide comprehensive support including certification assistance, technical guidance, market access, and premium pricing programs for organic produce.',
    website: 'https://harvestmoonorganics.com.au',
    logo_url: null,
    company_type: 'startup',
    founded_date: '2018-06-01',
    employee_count: 85,
    industry_tags: [
      'Organic Certification',
      'Sustainable Agriculture',
      'Farmer Support',
      'Organic Standards',
      'Rural Development',
      'Environmental Sustainability',
      'Agricultural Consulting',
      'Certification Services'
    ],
    city: 'Toowoomba',
    country: 'Australia',
    region: 'Asia-Pacific',
    social_links: {
      linkedin: 'https://linkedin.com/company/harvest-moon-organics',
      facebook: 'https://facebook.com/harvestmoonorganics',
      instagram: 'https://instagram.com/harvestmoonorganics'
    },
    contact_email: 'info@harvestmoonorganics.com.au',
    meta_description: 'Harvest Moon Organics - Leading organic certification and farmer support organization in Australia',
    featured: true,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  'costa-group-holdings': {
    id: 'costa-group-holdings-placeholder',
    name: 'Costa Group Holdings',
    slug: 'costa-group-holdings',
    description: 'Costa Group Holdings is Australia\'s leading fresh produce company, producing berries, citrus, avocados, and mushrooms. With operations across Australia, we are committed to sustainable farming practices, innovation in agriculture technology, and delivering premium fresh produce to domestic and international markets.',
    website: 'https://costagroup.com.au',
    logo_url: null,
    company_type: 'public',
    founded_date: '1888-01-01',
    employee_count: 4500,
    industry_tags: [
      'Fresh Produce',
      'Berries',
      'Citrus',
      'Avocados',
      'Mushrooms',
      'Precision Agriculture',
      'Sustainable Farming',
      'Export Markets',
      'Vertical Integration',
      'Agricultural Technology'
    ],
    city: 'Melbourne',
    country: 'Australia',
    region: 'Asia-Pacific',
    social_links: {
      linkedin: 'https://linkedin.com/company/costa-group',
      asx: 'https://asx.com.au/asxpdf/20240101/pdf/costa-group.pdf',
      facebook: 'https://facebook.com/costagroupaustralia'
    },
    contact_email: 'investors@costagroup.com.au',
    meta_description: 'Costa Group Holdings - Australia\'s leading fresh produce company specializing in berries, citrus, and sustainable farming',
    featured: false,
    published: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
}

export const getPlaceholderCompany = (slug: string): Company | null => {
  return placeholderCompanies[slug] || null
}