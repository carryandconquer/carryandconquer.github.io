-- Create core taxonomy
INSERT INTO deals_industries (name, slug) VALUES
  ('Software', 'software'),
  ('Food', 'food'),
  ('Pharmaceuticals', 'pharmaceuticals')
ON CONFLICT (slug) DO NOTHING;

-- Create sub-industries
INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT i.id, 'Web Applications', 'web-applications'
FROM deals_industries i WHERE i.slug = 'software'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT i.id, 'Analytics Software', 'analytics-software'
FROM deals_industries i WHERE i.slug = 'software'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT i.id, 'Dairy Products', 'dairy-products'
FROM deals_industries i WHERE i.slug = 'food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT i.id, 'Drug Discovery', 'drug-discovery'
FROM deals_industries i WHERE i.slug = 'pharmaceuticals'
ON CONFLICT (slug) DO NOTHING;

-- Create companies
INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region, total_known_funding_usd)
VALUES
  ('ZenScreen', 'AI-based platform for screen time monitoring and digital wellness', 'www.zenscreen.ai', 'San Jose', 'California', 'United States', 'North America', NULL),
  ('Van Leeuwen Artisan Ice Cream', 'Producer of premium dairy and vegan ice cream products', 'www.vanleeuwenicecream.com', 'Brooklyn', 'New York', 'United States', 'North America', 18700000),
  ('Conifer Point Pharmaceuticals LLC', 'Drug discovery technology using computational tools', 'www.coniferpoint.com', 'Doylestown', 'Pennsylvania', 'United States', 'North America', NULL),
  ('OmniView Sports Inc.', 'Personalized sports viewing application platform', 'www.ovszone.com', 'Boston', 'Massachusetts', 'United States', 'North America', NULL)
ON CONFLICT (name) DO NOTHING;

-- Create investors
INSERT INTO deals_investors (name, country, region) VALUES
  ('500 Startups', 'United States', 'North America'),
  ('Bessemer Venture Partners', 'United States', 'North America'),
  ('Strand Equity', 'United States', 'North America'),
  ('180 Degree Capital', 'United States', 'North America'),
  ('Undisclosed Investors', 'United States', 'North America')
ON CONFLICT (name) DO NOTHING;

-- Create deals
INSERT INTO deals (
  deal_id, deal_name, company_id, deal_status, transaction_type,
  deal_value_usd, deal_value_formatted, announcement_date, closing_date,
  description, city, state_province, country, region,
  revenue_ltm, ebitda_ltm, ebitda_margin, revenue_growth_yoy,
  multiple_label, investment_strategy, stage_label,
  strategic_significance, market_intelligence,
  published, featured_deal, recent_deal
) 
SELECT 
  'zenscreen-deal-2024', 'ZenScreen AI Platform Investment', c.id, 'Completed', 'Add-on Investment',
  2500000, '$2.5M', '2024-03-15'::date, '2024-03-15'::date,
  'Strategic investment in AI-powered screen time monitoring platform', 'San Jose', 'California', 'United States', 'North America',
  5500000, 2000000, 36.4, 127.0,
  'N/A', 'Growth Capital', 'Add-on',
  'ZenScreen represents a compelling investment in the digital wellness market',
  'The digital wellness market is expected to reach $18.6B by 2027',
  true, true, true
FROM deals_companies c WHERE c.name = 'ZenScreen'
ON CONFLICT (deal_id) DO NOTHING;

INSERT INTO deals (
  deal_id, deal_name, company_id, deal_status, transaction_type,
  deal_value_usd, deal_value_formatted, announcement_date, closing_date,
  description, city, state_province, country, region,
  revenue_ltm, ebitda_ltm, ebitda_margin, revenue_growth_yoy,
  multiple_label, investment_strategy, stage_label,
  strategic_significance, market_intelligence,
  published, featured_deal, recent_deal
)
SELECT 
  'vanleeuwen-deal-2024', 'Van Leeuwen Artisan Ice Cream Series A', c.id, 'Completed', 'Series A',
  18700000, '$18.7M', '2024-02-20'::date, '2024-02-20'::date,
  'Series A funding to accelerate expansion of premium ice cream brand', 'Brooklyn', 'New York', 'United States', 'North America',
  41140000, 14098000, 34.2, 43.0,
  'N/A', 'Growth Capital', 'Series A',
  'Van Leeuwen has built a premium ice cream brand with significant expansion opportunities',
  'The premium ice cream market is growing at 5.4% CAGR',
  true, true, true
FROM deals_companies c WHERE c.name = 'Van Leeuwen Artisan Ice Cream'
ON CONFLICT (deal_id) DO NOTHING;

INSERT INTO deals (
  deal_id, deal_name, company_id, deal_status, transaction_type,
  deal_value_usd, deal_value_formatted, announcement_date, closing_date,
  description, city, state_province, country, region,
  revenue_ltm, ebitda_ltm, ebitda_margin, revenue_growth_yoy,
  multiple_label, investment_strategy, stage_label,
  strategic_significance, market_intelligence,
  published, featured_deal, recent_deal
)
SELECT 
  'coniferpoint-deal-2024', 'Conifer Point Pharmaceuticals Add-on Investment', c.id, 'Completed', 'Add-on Investment',
  5000000, '$5.0M', '2024-01-10'::date, '2024-01-10'::date,
  'Follow-on investment to accelerate drug discovery technology platform', 'Doylestown', 'Pennsylvania', 'United States', 'North America',
  11000000, 4000000, 36.4, 67.0,
  'N/A', 'Growth Capital', 'Add-on',
  'Conifer Point is positioned to capitalize on computational drug discovery demand',
  'The computational drug discovery market is projected to reach $7.8B by 2027',
  true, false, true
FROM deals_companies c WHERE c.name = 'Conifer Point Pharmaceuticals LLC'
ON CONFLICT (deal_id) DO NOTHING;

INSERT INTO deals (
  deal_id, deal_name, company_id, deal_status, transaction_type,
  deal_value_usd, deal_value_formatted, announcement_date, closing_date,
  description, city, state_province, country, region,
  revenue_ltm, ebitda_ltm, ebitda_margin, revenue_growth_yoy,
  multiple_label, investment_strategy, stage_label,
  strategic_significance, market_intelligence,
  published, featured_deal, recent_deal
)
SELECT 
  'omniview-deal-2024', 'OmniView Sports Seed Investment', c.id, 'Completed', 'Seed Investment',
  1200000, '$1.2M', '2024-04-05'::date, '2024-04-05'::date,
  'Seed funding to develop personalized sports viewing platform', 'Boston', 'Massachusetts', 'United States', 'North America',
  2640000, 960000, 36.4, 89.0,
  'N/A', 'Early Stage', 'Seed',
  'OmniView is transforming sports viewing through personalization technology',
  'The sports streaming market is expected to reach $87B by 2030',
  true, false, true
FROM deals_companies c WHERE c.name = 'OmniView Sports Inc.'
ON CONFLICT (deal_id) DO NOTHING;