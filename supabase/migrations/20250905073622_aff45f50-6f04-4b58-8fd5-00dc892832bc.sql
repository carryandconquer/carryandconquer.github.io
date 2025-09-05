-- Simple seed data for 4 deals with proper escaping

-- 1) Insert industries
INSERT INTO deals_industries (name, slug) VALUES
  ('Software', 'software'),
  ('Food', 'food'),
  ('Pharmaceuticals', 'pharmaceuticals')
ON CONFLICT (slug) DO NOTHING;

-- 2) Insert companies
INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region, total_known_funding_usd)
VALUES
  (
    'ZenScreen',
    'Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage.',
    'www.zenscreen.ai',
    'San Jose', 'California', 'United States', 'North America', NULL
  ),
  (
    'Van Leeuwen Artisan Ice Cream',
    'Founded in 2008 and based in New York, US, Van Leeuwen Artisan Ice Cream operates as a producer of dairy-based and vegan ice cream products.',
    'www.vanleeuwenicecream.com',
    'Brooklyn', 'New York', 'United States', 'North America', 18700000
  ),
  (
    'Conifer Point Pharmaceuticals LLC',
    'Founded in 2014 and based in Pennsylvania, US, Conifer Point Pharmaceuticals LLC develops drug discovery technology using computational tools.',
    'www.coniferpoint.com',
    'Doylestown', 'Pennsylvania', 'United States', 'North America', NULL
  ),
  (
    'OmniView Sports Inc.',
    'Founded in 2020 and based in Massachusetts, US, OmniView Sports Inc. operates as sports viewing application.',
    'www.ovszone.com',
    'Boston', 'Massachusetts', 'United States', 'North America', NULL
  )
ON CONFLICT (name) DO NOTHING;

-- 3) Insert deals with rich data
INSERT INTO deals (
  deal_id, deal_name, company_id, deal_status, transaction_type,
  deal_value_usd, deal_value_formatted, announcement_date, closing_date,
  description, city, state_province, country, region,
  revenue_ltm, ebitda_ltm, ebitda_margin, revenue_growth_yoy,
  multiple_label, investment_strategy, stage_label,
  deal_highlights, strategic_significance, market_intelligence,
  published, featured_deal, recent_deal
) VALUES
(
  'zenscreen-deal-2024',
  'ZenScreen AI Platform Investment',
  (SELECT id FROM deals_companies WHERE name = 'ZenScreen' LIMIT 1),
  'Completed', 'Add-on Investment',
  2500000, '$2.5M', '2024-03-15', '2024-03-15',
  'Strategic investment in AI-powered screen time monitoring platform with strong growth trajectory.',
  'San Jose','California','United States','North America',
  5500000,2000000,36.4,127.0,
  'N/A','Growth Capital','Add-on',
  '["Market-leading AI technology platform", "Strong recurring SaaS revenue model", "Significant expansion opportunities", "Proven management team", "Strategic partnerships with major tech companies"]'::jsonb,
  'ZenScreen represents a compelling investment in the rapidly growing digital wellness market.',
  'The digital wellness market is expected to reach $18.6B by 2027.',
  true, true, true
),
(
  'vanleeuwen-deal-2024',
  'Van Leeuwen Artisan Ice Cream Series A',
  (SELECT id FROM deals_companies WHERE name = 'Van Leeuwen Artisan Ice Cream' LIMIT 1),
  'Completed', 'Series A',
  18700000, '$18.7M', '2024-02-20', '2024-02-20',
  'Series A funding to accelerate expansion of premium ice cream brand.',
  'Brooklyn','New York','United States','North America',
  41140000,14098000,34.2,43.0,
  'N/A','Growth Capital','Series A',
  '["Premium brand with strong consumer loyalty", "Omnichannel distribution strategy", "Sustainable product portfolio", "Experienced management team", "Strong unit economics"]'::jsonb,
  'Van Leeuwen has built a premium ice cream brand that bridges artisanal quality and mass market appeal.',
  'The premium ice cream market is growing at 5.4% CAGR.',
  true, true, true
),
(
  'coniferpoint-deal-2024',
  'Conifer Point Pharmaceuticals Add-on Investment',
  (SELECT id FROM deals_companies WHERE name = 'Conifer Point Pharmaceuticals LLC' LIMIT 1),
  'Completed', 'Add-on Investment',
  5000000, '$5.0M', '2024-01-10', '2024-01-10',
  'Follow-on investment to accelerate drug discovery technology platform.',
  'Doylestown','Pennsylvania','United States','North America',
  11000000,4000000,36.4,67.0,
  'N/A','Growth Capital','Add-on',
  '["Breakthrough drug discovery technology", "Strong IP portfolio", "Strategic partnerships", "Experienced leadership team", "Large addressable market"]'::jsonb,
  'Conifer Point is positioned to capitalize on computational drug discovery demand.',
  'The computational drug discovery market is projected to reach $7.8B by 2027.',
  true, false, true
),
(
  'omniview-deal-2024',
  'OmniView Sports Seed Investment',
  (SELECT id FROM deals_companies WHERE name = 'OmniView Sports Inc.' LIMIT 1),
  'Completed', 'Seed Investment',
  1200000, '$1.2M', '2024-04-05', '2024-04-05',
  'Seed funding to develop personalized sports viewing platform.',
  'Boston','Massachusetts','United States','North America',
  2640000,960000,36.4,89.0,
  'N/A','Early Stage','Seed',
  '["Innovative personalized sports viewing technology", "Strong user engagement metrics", "Experienced team", "Large addressable market", "Strategic partnerships"]'::jsonb,
  'OmniView is transforming the sports viewing experience through personalization technology.',
  'The sports streaming market is expected to reach $87B by 2030.',
  true, false, true
)
ON CONFLICT (deal_id) DO NOTHING;

-- 4) Insert investors
INSERT INTO deals_investors (name, country, region) VALUES
  ('500 Startups', 'United States', 'North America'),
  ('Bessemer Venture Partners', 'United States', 'North America'),
  ('BMW i Ventures', 'Germany', 'Europe'),
  ('Strand Equity', 'United States', 'North America'),
  ('180 Degree Capital', 'United States', 'North America'),
  ('AbbVie Biotech Ventures', 'United States', 'North America'),
  ('ARCH Venture Partners', 'United States', 'North America'),
  ('Undisclosed Investors', 'United States', 'North America')
ON CONFLICT (name) DO NOTHING;

-- 5) Link deals to investors
INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 800000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = '500 Startups'
ON CONFLICT (deal_id, investor_id) DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'participant', 600000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = 'Bessemer Venture Partners'
ON CONFLICT (deal_id, investor_id) DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 18700000
FROM deals d, deals_investors i
WHERE d.deal_id = 'vanleeuwen-deal-2024' AND i.name = 'Strand Equity'
ON CONFLICT (deal_id, investor_id) DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 2000000
FROM deals d, deals_investors i
WHERE d.deal_id = 'coniferpoint-deal-2024' AND i.name = '180 Degree Capital'
ON CONFLICT (deal_id, investor_id) DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 1200000
FROM deals d, deals_investors i
WHERE d.deal_id = 'omniview-deal-2024' AND i.name = 'Undisclosed Investors'
ON CONFLICT (deal_id, investor_id) DO NOTHING;