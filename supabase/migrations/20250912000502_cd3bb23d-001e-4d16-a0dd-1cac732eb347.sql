-- Insert industries that match the Key Deals sectors
INSERT INTO deals_industries (name, slug) VALUES
  ('Business Services', 'business-services'),
  ('Clean Technology', 'clean-tech'),  
  ('Consumer Discretionary', 'consumer-disc'),
  ('Diversified', 'diversified'),
  ('Energy and Utilities', 'energy-and-util'),
  ('Food and Agriculture', 'food-and-ag'),
  ('Healthcare', 'healthcare'),
  ('Industrials', 'industrials'),
  ('Internet', 'internet'),
  ('Materials', 'materials'),
  ('Other IT', 'other-it'),
  ('Real Estate', 'real-estate'),
  ('Semiconductors & Electronics', 'semic-electronics'),
  ('Software & Related', 'software-related'),
  ('Telecommunications', 'telecoms')
ON CONFLICT (slug) DO NOTHING;

-- Insert sub-industries
INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT 
  i.id,
  sub.name,
  sub.slug
FROM (VALUES 
  ('software-related', 'Software', 'software'),
  ('software-related', 'Web Applications', 'web-applications'),
  ('software-related', 'Analytics & Performance Software', 'analytics-performance-software'),
  ('software-related', 'Mobile Applications', 'mobile-applications'),
  ('food-and-ag', 'Dairy Products', 'dairy-products'),
  ('healthcare', 'Pharmaceuticals', 'pharmaceuticals'),
  ('healthcare', 'Pharmaceutical Development', 'pharmaceutical-development'),
  ('healthcare', 'BioPharmaceuticals', 'biopharmaceuticals'),
  ('healthcare', 'Medical Software', 'medical-software'),
  ('healthcare', 'Medical Devices', 'medical-devices'),
  ('software-related', 'Conferencing Software', 'conferencing-software'),
  ('software-related', 'Gaming', 'gaming'),
  ('software-related', 'Connectivity Software', 'connectivity-software'),
  ('software-related', 'Application Integration Software', 'application-integration-software')
) AS sub(industry_slug, name, slug)
JOIN deals_industries i ON i.slug = sub.industry_slug
ON CONFLICT (slug) DO NOTHING;

-- Insert companies from the Key Deals data
INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region, external_company_id) VALUES
  ('ZenScreen', 'Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage. The platform offers digital-dieting features including App Analytics, App Categories, Smart Mornings, Calm Nights, Zen breaks, Daily Time Limit, Quiet Time, and Screen Sense.', 'www.zenscreen.ai', 'San Jose', 'California', 'United States', 'North America', 'zenscreen-1'),
  ('Van Leeuwen Artisan Ice Cream', 'Founded in 2008 and based in New York, US, Van Leeuwen Artisan Ice Cream operates as a producer of dairy-based and vegan ice cream products. The products are offered through their ice cream trucks and grocery stores.', 'www.vanleeuwenicecream.com', 'Brooklyn', 'New York', 'United States', 'North America', 'van-leeuwen-2'),
  ('Conifer Point Pharmaceuticals LLC', 'Founded in 2014 and based in Pennsylvania, US, Conifer Point Pharmaceuticals LLC develops drug discovery technology using computational tools to help drug researchers improve early stage compounds. The company also offers industry-standard computational chemistry services to help small firms solve chemistry research and development problems.', 'www.coniferpoint.com', 'Doylestown', 'Pennsylvania', 'United States', 'North America', 'conifer-point-3'),
  ('OmniView Sports Inc.', 'Founded in 2020 and based in Massachusetts, US, OmniView Sports Inc. operates as sports viewing application that''s showing its users a personalized view experience according to the user preference.', 'www.ovszone.com', 'Boston', 'Massachusetts', 'United States', 'North America', 'omniview-sports-4')
ON CONFLICT (external_company_id) DO NOTHING;

-- Insert deals
INSERT INTO deals (deal_id, deal_name, company_id, transaction_type, deal_value_usd, deal_value_formatted, announcement_date, deal_status, stage_label, investment_status_label, city, state_province, country, region, description, source) 
SELECT 
  d.deal_id,
  d.deal_name,
  c.id,
  'Private Equity Investment',
  d.deal_value_usd,
  d.deal_value_formatted,
  d.announcement_date::date,
  d.deal_status,
  d.stage_label,
  d.investment_status_label,
  d.city,
  d.state_province,
  d.country,
  d.region,
  d.description,
  'KeyDeals Database'
FROM (VALUES 
  ('1', 'ZenScreen AI Platform Investment', 'zenscreen-1', 2500000, '$2.5M', '2024-01-01', 'Completed', 'Add-on', 'Active', 'San Jose', 'California', 'United States', 'North America', 'Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage.'),
  ('2', 'Van Leeuwen Artisan Ice Cream Series A', 'van-leeuwen-2', 18700000, '$18.7M', '2024-01-01', 'Completed', 'Series A/Round 1', 'Active', 'Brooklyn', 'New York', 'United States', 'North America', 'Founded in 2008 and based in New York, US, Van Leeuwen Artisan Ice Cream operates as a producer of dairy-based and vegan ice cream products.'),
  ('3', 'Conifer Point Pharmaceuticals Add-on Investment', 'conifer-point-3', 5000000, '$5.0M', '2024-01-01', 'Completed', 'Add-on', 'Active', 'Doylestown', 'Pennsylvania', 'United States', 'North America', 'Founded in 2014 and based in Pennsylvania, US, Conifer Point Pharmaceuticals LLC develops drug discovery technology using computational tools.'),
  ('4', 'OmniView Sports Seed Investment', 'omniview-sports-4', 1200000, '$1.2M', '2024-01-01', 'Completed', 'Seed', 'Active', 'Boston', 'Massachusetts', 'United States', 'North America', 'Founded in 2020 and based in Massachusetts, US, OmniView Sports Inc. operates as sports viewing application.')
) AS d(deal_id, deal_name, external_company_id, deal_value_usd, deal_value_formatted, announcement_date, deal_status, stage_label, investment_status_label, city, state_province, country, region, description)
JOIN deals_companies c ON c.external_company_id = d.external_company_id
ON CONFLICT (deal_id) DO NOTHING;

-- Link companies to industries
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary, classification)
SELECT 
  c.id,
  i.id,
  si.id,
  true,
  'Primary'
FROM deals_companies c
JOIN (VALUES 
  ('zenscreen-1', 'software-related', 'software'),
  ('van-leeuwen-2', 'food-and-ag', 'dairy-products'),
  ('conifer-point-3', 'healthcare', 'pharmaceuticals'),
  ('omniview-sports-4', 'software-related', 'software')
) AS mapping(external_company_id, industry_slug, sub_industry_slug) ON c.external_company_id = mapping.external_company_id
JOIN deals_industries i ON i.slug = mapping.industry_slug
JOIN deals_sub_industries si ON si.slug = mapping.sub_industry_slug
ON CONFLICT DO NOTHING;

-- Insert investors
INSERT INTO deals_investors (name, type, country, region) VALUES
  ('500 Startups', 'venture_capital', 'United States', 'North America'),
  ('Bessemer Venture Partners', 'venture_capital', 'United States', 'North America'),
  ('Strand Equity', 'private_equity', 'United States', 'North America'),
  ('180 Degree Capital', 'venture_capital', 'United States', 'North America'),
  ('AbbVie Biotech Ventures', 'corporate_venture', 'United States', 'North America'),
  ('Alexandria Venture Investments', 'venture_capital', 'United States', 'North America'),
  ('Undisclosed Investors', 'other', NULL, NULL)
ON CONFLICT (name) DO NOTHING;