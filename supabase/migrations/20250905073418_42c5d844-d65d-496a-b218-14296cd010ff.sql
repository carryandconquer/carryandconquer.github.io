-- Seed core taxonomy and 4 deals with enriched placeholders

-- 1) Industries
INSERT INTO deals_industries (name, slug) VALUES
  ('Software', 'software'),
  ('Food', 'food'),
  ('Pharmaceuticals', 'pharmaceuticals')
ON CONFLICT DO NOTHING;

-- 2) Sub-Industries (use SELECT to resolve industry_id)
INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT id, 'Web Applications', 'web-applications' FROM deals_industries WHERE slug = 'software'
ON CONFLICT DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT id, 'Analytics Software', 'analytics-software' FROM deals_industries WHERE slug = 'software'
ON CONFLICT DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT id, 'Mobile Applications', 'mobile-applications' FROM deals_industries WHERE slug = 'software'
ON CONFLICT DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT id, 'Gaming Software', 'gaming-software' FROM deals_industries WHERE slug = 'software'
ON CONFLICT DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT id, 'Dairy Products', 'dairy-products' FROM deals_industries WHERE slug = 'food'
ON CONFLICT DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT id, 'Drug Discovery', 'drug-discovery' FROM deals_industries WHERE slug = 'pharmaceuticals'
ON CONFLICT DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug)
SELECT id, 'BioPharmaceuticals', 'biopharmaceuticals' FROM deals_industries WHERE slug = 'pharmaceuticals'
ON CONFLICT DO NOTHING;

-- 3) Companies
INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region, total_known_funding_usd)
VALUES
  (
    'ZenScreen',
    'Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage. The platform offers digital-dieting features including App Analytics, App Categories, Smart Mornings, Calm Nights, Zen breaks, Daily Time Limit, Quiet Time, and Screen Sense.',
    'www.zenscreen.ai',
    'San Jose', 'California', 'United States', 'North America', NULL
  ),
  (
    'Van Leeuwen Artisan Ice Cream',
    'Founded in 2008 and based in New York, US, Van Leeuwen Artisan Ice Cream operates as a producer of dairy-based and vegan ice cream products. The products are offered through their ice cream trucks and grocery stores.',
    'www.vanleeuwenicecream.com',
    'Brooklyn', 'New York', 'United States', 'North America', 18700000
  ),
  (
    'Conifer Point Pharmaceuticals LLC',
    'Founded in 2014 and based in Pennsylvania, US, Conifer Point Pharmaceuticals LLC develops drug discovery technology using computational tools to help drug researchers improve early stage compounds. The company also offers industry-standard computational chemistry services to help small firms solve chemistry research and development problems.',
    'www.coniferpoint.com',
    'Doylestown', 'Pennsylvania', 'United States', 'North America', NULL
  ),
  (
    'OmniView Sports Inc.',
    "Founded in 2020 and based in Massachusetts, US, OmniView Sports Inc. operates as sports viewing application that's showing its users a personalized view experience according to the user preference.",
    'www.ovszone.com',
    'Boston', 'Massachusetts', 'United States', 'North America', NULL
  )
ON CONFLICT DO NOTHING;

-- 4) Deals (use company_id subselects)
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
  'Strategic investment in AI-powered screen time monitoring platform with strong growth trajectory and innovative digital wellness features.',
  'San Jose','California','United States','North America',
  5500000,2000000,36.4,127.0,
  'N/A','Growth Capital','Add-on',
  '["Market-leading AI technology platform with patent portfolio","Strong recurring SaaS revenue model with 94% customer retention","Significant expansion opportunities in enterprise market","Proven management team with previous successful exits","Strategic partnerships with major tech companies"]'::jsonb,
  'ZenScreen represents a compelling investment in the rapidly growing digital wellness market, leveraging AI technology to address increasing concerns about screen time and digital addiction.',
  'The digital wellness market is expected to reach $18.6B by 2027, driven by increased awareness of screen time impacts and corporate wellness initiatives.',
  true, true, true
),
(
  'vanleeuwen-deal-2024',
  'Van Leeuwen Artisan Ice Cream Series A',
  (SELECT id FROM deals_companies WHERE name = 'Van Leeuwen Artisan Ice Cream' LIMIT 1),
  'Completed', 'Series A',
  18700000, '$18.7M', '2024-02-20', '2024-02-20',
  'Series A funding to accelerate expansion of premium ice cream brand with strong omnichannel distribution strategy.',
  'Brooklyn','New York','United States','North America',
  41140000,14098000,34.2,43.0,
  'N/A','Growth Capital','Series A',
  '["Premium brand with strong consumer loyalty","Omnichannel distribution strategy showing rapid growth","Sustainable and innovative product portfolio including vegan options","Experienced management team with CPG expertise","Strong unit economics and scalable business model"]'::jsonb,
  'Van Leeuwen has built a premium ice cream brand that successfully bridges the gap between artisanal quality and mass market appeal, with significant expansion opportunities.',
  'The premium ice cream market is growing at 5.4% CAGR, driven by consumer preferences for high-quality, artisanal products and innovative flavors.',
  true, true, true
),
(
  'coniferpoint-deal-2024',
  'Conifer Point Pharmaceuticals Add-on Investment',
  (SELECT id FROM deals_companies WHERE name = 'Conifer Point Pharmaceuticals LLC' LIMIT 1),
  'Completed', 'Add-on Investment',
  5000000, '$5.0M', '2024-01-10', '2024-01-10',
  'Follow-on investment to accelerate drug discovery technology platform and expand computational chemistry services to pharmaceutical partners.',
  'Doylestown','Pennsylvania','United States','North America',
  11000000,4000000,36.4,67.0,
  'N/A','Growth Capital','Add-on',
  '["Breakthrough drug discovery technology platform with AI capabilities","Strong IP portfolio with 12+ patents pending approval","Strategic partnerships with major pharmaceutical companies","Experienced leadership team from Big Pharma backgrounds","Large addressable market opportunity exceeding $50B annually"]'::jsonb,
  'Conifer Point is positioned to capitalize on the growing demand for computational drug discovery solutions, offering significant cost and time savings to pharmaceutical companies.',
  'The computational drug discovery market is projected to reach $7.8B by 2027, with increasing adoption of AI and machine learning in pharmaceutical R&D.',
  true, false, true
),
(
  'omniview-deal-2024',
  'OmniView Sports Seed Investment',
  (SELECT id FROM deals_companies WHERE name = 'OmniView Sports Inc.' LIMIT 1),
  'Completed', 'Seed Investment',
  1200000, '$1.2M', '2024-04-05', '2024-04-05',
  'Seed funding to develop personalized sports viewing platform and expand user base in key demographic segments.',
  'Boston','Massachusetts','United States','North America',
  2640000,960000,36.4,89.0,
  'N/A','Early Stage','Seed',
  '["Innovative personalized sports viewing technology","Strong user engagement and retention metrics","Experienced team with sports and technology backgrounds","Large addressable market in sports media and entertainment","Strategic partnerships with sports content providers"]'::jsonb,
  'OmniView is transforming the sports viewing experience through personalization technology, addressing the evolving preferences of digital-native sports fans.',
  'The sports streaming market is expected to reach $87B by 2030, with increasing demand for personalized and interactive viewing experiences.',
  true, false, true
)
ON CONFLICT DO NOTHING;

-- 5) Map Company to Industries/Sub-industries
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT c.id, i.id, si.id, true
FROM deals_companies c
JOIN deals_industries i ON i.slug = 'software'
JOIN deals_sub_industries si ON si.slug = 'web-applications'
WHERE c.name = 'ZenScreen'
ON CONFLICT DO NOTHING;

INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT c.id, i.id, si.id, false
FROM deals_companies c
JOIN deals_industries i ON i.slug = 'software'
JOIN deals_sub_industries si ON si.slug = 'analytics-software'
WHERE c.name = 'ZenScreen'
ON CONFLICT DO NOTHING;

INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT c.id, i.id, si.id, false
FROM deals_companies c
JOIN deals_industries i ON i.slug = 'software'
JOIN deals_sub_industries si ON si.slug = 'mobile-applications'
WHERE c.name = 'ZenScreen'
ON CONFLICT DO NOTHING;

INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT c.id, i.id, si.id, true
FROM deals_companies c
JOIN deals_industries i ON i.slug = 'food'
JOIN deals_sub_industries si ON si.slug = 'dairy-products'
WHERE c.name = 'Van Leeuwen Artisan Ice Cream'
ON CONFLICT DO NOTHING;

INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT c.id, i.id, si.id, true
FROM deals_companies c
JOIN deals_industries i ON i.slug = 'pharmaceuticals'
JOIN deals_sub_industries si ON si.slug = 'drug-discovery'
WHERE c.name = 'Conifer Point Pharmaceuticals LLC'
ON CONFLICT DO NOTHING;

INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT c.id, i.id, si.id, false
FROM deals_companies c
JOIN deals_industries i ON i.slug = 'pharmaceuticals'
JOIN deals_sub_industries si ON si.slug = 'biopharmaceuticals'
WHERE c.name = 'Conifer Point Pharmaceuticals LLC'
ON CONFLICT DO NOTHING;

INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT c.id, i.id, si.id, true
FROM deals_companies c
JOIN deals_industries i ON i.slug = 'software'
JOIN deals_sub_industries si ON si.slug = 'gaming-software'
WHERE c.name = 'OmniView Sports Inc.'
ON CONFLICT DO NOTHING;

-- 6) Investors (omit enum type to avoid incompatibilities)
INSERT INTO deals_investors (name, country, region) VALUES
  ('500 Startups', 'United States', 'North America'),
  ('Bessemer Venture Partners', 'United States', 'North America'),
  ('BMW i Ventures', 'Germany', 'Europe'),
  ('Strand Equity', 'United States', 'North America'),
  ('180 Degree Capital', 'United States', 'North America'),
  ('AbbVie Biotech Ventures', 'United States', 'North America'),
  ('ARCH Venture Partners', 'United States', 'North America'),
  ('Undisclosed Investors', 'United States', 'North America')
ON CONFLICT DO NOTHING;

-- 7) Link Deals to Investors
INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 800000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = '500 Startups'
ON CONFLICT DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 600000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = 'Bessemer Venture Partners'
ON CONFLICT DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 400000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = 'BMW i Ventures'
ON CONFLICT DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 18700000
FROM deals d, deals_investors i
WHERE d.deal_id = 'vanleeuwen-deal-2024' AND i.name = 'Strand Equity'
ON CONFLICT DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 2000000
FROM deals d, deals_investors i
WHERE d.deal_id = 'coniferpoint-deal-2024' AND i.name = '180 Degree Capital'
ON CONFLICT DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 1500000
FROM deals d, deals_investors i
WHERE d.deal_id = 'coniferpoint-deal-2024' AND i.name = 'AbbVie Biotech Ventures'
ON CONFLICT DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 1000000
FROM deals d, deals_investors i
WHERE d.deal_id = 'coniferpoint-deal-2024' AND i.name = 'ARCH Venture Partners'
ON CONFLICT DO NOTHING;

INSERT INTO deals_deal_investors (deal_id, investor_id, committed_amount_usd)
SELECT d.id, i.id, 1200000
FROM deals d, deals_investors i
WHERE d.deal_id = 'omniview-deal-2024' AND i.name = 'Undisclosed Investors'
ON CONFLICT DO NOTHING;