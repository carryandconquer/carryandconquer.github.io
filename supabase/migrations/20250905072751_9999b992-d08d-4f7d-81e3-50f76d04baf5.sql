-- Insert Industries
INSERT INTO deals_industries (name, slug) VALUES
('Software', 'software'),
('Food', 'food'), 
('Pharmaceuticals', 'pharmaceuticals')
ON CONFLICT (slug) DO NOTHING;

-- Insert Sub-Industries
INSERT INTO deals_sub_industries (industry_id, name, slug) VALUES
((SELECT id FROM deals_industries WHERE slug = 'software'), 'Web Applications', 'web-applications'),
((SELECT id FROM deals_industries WHERE slug = 'software'), 'Analytics Software', 'analytics-software'),
((SELECT id FROM deals_industries WHERE slug = 'software'), 'Mobile Applications', 'mobile-applications'),
((SELECT id FROM deals_industries WHERE slug = 'software'), 'Gaming Software', 'gaming-software'),
((SELECT id FROM deals_industries WHERE slug = 'food'), 'Dairy Products', 'dairy-products'),
((SELECT id FROM deals_industries WHERE slug = 'pharmaceuticals'), 'Drug Discovery', 'drug-discovery'),
((SELECT id FROM deals_industries WHERE slug = 'pharmaceuticals'), 'BioPharmaceuticals', 'biopharmaceuticals')
ON CONFLICT (slug) DO NOTHING;

-- Insert Companies
INSERT INTO deals_companies (id, name, description, website, headquarters_city, state_province, country, region) VALUES
('zenscreen-id', 'ZenScreen', 'Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage. The platform offers digital-dieting features including App Analytics, App Categories, Smart Mornings, Calm Nights, Zen breaks, Daily Time Limit, Quiet Time, and Screen Sense.', 'www.zenscreen.ai', 'San Jose', 'California', 'United States', 'North America'),
('vanleeuwen-id', 'Van Leeuwen Artisan Ice Cream', 'Founded in 2008 and based in New York, US, Van Leeuwen Artisan Ice Cream operates as a producer of dairy-based and vegan ice cream products. The products are offered through their ice cream trucks and grocery stores.', 'www.vanleeuwenicecream.com', 'Brooklyn', 'New York', 'United States', 'North America'),
('coniferpoint-id', 'Conifer Point Pharmaceuticals LLC', 'Founded in 2014 and based in Pennsylvania, US, Conifer Point Pharmaceuticals LLC develops drug discovery technology using computational tools to help drug researchers improve early stage compounds. The company also offers industry-standard computational chemistry services to help small firms solve chemistry research and development problems.', 'www.coniferpoint.com', 'Doylestown', 'Pennsylvania', 'United States', 'North America'),
('omniview-id', 'OmniView Sports Inc.', 'Founded in 2020 and based in Massachusetts, US, OmniView Sports Inc. operates as sports viewing application that shows its users a personalized view experience according to the user preference.', 'www.ovszone.com', 'Boston', 'Massachusetts', 'United States', 'North America')
ON CONFLICT (id) DO NOTHING;

-- Insert Investors
INSERT INTO deals_investors (id, name, type, country, region) VALUES
('500startups-id', '500 Startups', 'venture_capital', 'United States', 'North America'),
('bessemer-id', 'Bessemer Venture Partners', 'venture_capital', 'United States', 'North America'),
('bmw-ventures-id', 'BMW i Ventures', 'corporate_venture', 'Germany', 'Europe'),
('strand-equity-id', 'Strand Equity', 'private_equity', 'United States', 'North America'),
('180degree-id', '180 Degree Capital', 'venture_capital', 'United States', 'North America'),
('abbvie-ventures-id', 'AbbVie Biotech Ventures', 'corporate_venture', 'United States', 'North America'),
('arch-ventures-id', 'ARCH Venture Partners', 'venture_capital', 'United States', 'North America'),
('undisclosed-id', 'Undisclosed Investors', 'other', 'United States', 'North America')
ON CONFLICT (id) DO NOTHING;

-- Insert Main Deals
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
    'zenscreen-id',
    'Completed',
    'Add-on Investment',
    2500000,
    '$2.5M', 
    '2024-03-15',
    '2024-03-15',
    'Strategic investment in AI-powered screen time monitoring platform with strong growth trajectory and innovative digital wellness features.',
    'San Jose',
    'California', 
    'United States',
    'North America',
    5500000,
    2000000,
    36.4,
    127.0,
    'N/A',
    'Growth Capital',
    'Add-on',
    '["Market-leading AI technology platform with patent portfolio", "Strong recurring SaaS revenue model with 94% customer retention", "Significant expansion opportunities in enterprise market", "Proven management team with previous successful exits", "Strategic partnerships with major tech companies"]'::jsonb,
    'ZenScreen represents a compelling investment in the rapidly growing digital wellness market, leveraging AI technology to address increasing concerns about screen time and digital addiction.',
    'The digital wellness market is expected to reach $18.6B by 2027, driven by increased awareness of screen time impacts and corporate wellness initiatives.',
    true,
    true,
    true
),
(
    'vanleeuwen-deal-2024', 
    'Van Leeuwen Artisan Ice Cream Series A',
    'vanleeuwen-id',
    'Completed',
    'Series A',
    18700000,
    '$18.7M',
    '2024-02-20',
    '2024-02-20', 
    'Series A funding to accelerate expansion of premium ice cream brand with strong omnichannel distribution strategy.',
    'Brooklyn',
    'New York',
    'United States', 
    'North America',
    41140000,
    14098000,
    34.2,
    43.0,
    'N/A',
    'Growth Capital',
    'Series A',
    '["Premium brand with strong consumer loyalty and recognition", "Omnichannel distribution strategy showing rapid growth", "Sustainable and innovative product portfolio including vegan options", "Experienced management team with CPG expertise", "Strong unit economics and scalable business model"]'::jsonb,
    'Van Leeuwen has built a premium ice cream brand that successfully bridges the gap between artisanal quality and mass market appeal, with significant expansion opportunities.',
    'The premium ice cream market is growing at 5.4% CAGR, driven by consumer preferences for high-quality, artisanal products and innovative flavors.',
    true,
    true,
    true
),
(
    'coniferpoint-deal-2024',
    'Conifer Point Pharmaceuticals Add-on Investment', 
    'coniferpoint-id',
    'Completed',
    'Add-on Investment',
    5000000,
    '$5.0M',
    '2024-01-10',
    '2024-01-10',
    'Follow-on investment to accelerate drug discovery technology platform and expand computational chemistry services to pharmaceutical partners.',
    'Doylestown',
    'Pennsylvania',
    'United States',
    'North America', 
    11000000,
    4000000,
    36.4,
    67.0,
    'N/A',
    'Growth Capital', 
    'Add-on',
    '["Breakthrough drug discovery technology platform with AI capabilities", "Strong IP portfolio with 12+ patents pending approval", "Strategic partnerships with major pharmaceutical companies", "Experienced leadership team from Big Pharma backgrounds", "Large addressable market opportunity exceeding $50B annually"]'::jsonb,
    'Conifer Point is positioned to capitalize on the growing demand for computational drug discovery solutions, offering significant cost and time savings to pharmaceutical companies.',
    'The computational drug discovery market is projected to reach $7.8B by 2027, with increasing adoption of AI and machine learning in pharmaceutical R&D.',
    true,
    false,
    true
),
(
    'omniview-deal-2024',
    'OmniView Sports Seed Investment',
    'omniview-id', 
    'Completed',
    'Seed Investment',
    1200000,
    '$1.2M',
    '2024-04-05',
    '2024-04-05',
    'Seed funding to develop personalized sports viewing platform and expand user base in key demographic segments.',
    'Boston',
    'Massachusetts',
    'United States',
    'North America',
    2640000,
    960000,
    36.4,
    89.0,
    'N/A',
    'Early Stage',
    'Seed',
    '["Innovative personalized sports viewing technology", "Strong user engagement and retention metrics", "Experienced team with sports and technology backgrounds", "Large addressable market in sports media and entertainment", "Strategic partnerships with sports content providers"]'::jsonb,
    'OmniView is transforming the sports viewing experience through personalization technology, addressing the evolving preferences of digital-native sports fans.',
    'The sports streaming market is expected to reach $87B by 2030, with increasing demand for personalized and interactive viewing experiences.',
    true,
    false,
    true
)
ON CONFLICT (deal_id) DO NOTHING;

-- Link Companies to Industries
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary) VALUES
('zenscreen-id', (SELECT id FROM deals_industries WHERE slug = 'software'), (SELECT id FROM deals_sub_industries WHERE slug = 'web-applications'), true),
('zenscreen-id', (SELECT id FROM deals_industries WHERE slug = 'software'), (SELECT id FROM deals_sub_industries WHERE slug = 'analytics-software'), false),
('zenscreen-id', (SELECT id FROM deals_industries WHERE slug = 'software'), (SELECT id FROM deals_sub_industries WHERE slug = 'mobile-applications'), false),
('vanleeuwen-id', (SELECT id FROM deals_industries WHERE slug = 'food'), (SELECT id FROM deals_sub_industries WHERE slug = 'dairy-products'), true),
('coniferpoint-id', (SELECT id FROM deals_industries WHERE slug = 'pharmaceuticals'), (SELECT id FROM deals_sub_industries WHERE slug = 'drug-discovery'), true),
('coniferpoint-id', (SELECT id FROM deals_industries WHERE slug = 'pharmaceuticals'), (SELECT id FROM deals_sub_industries WHERE slug = 'biopharmaceuticals'), false),
('omniview-id', (SELECT id FROM deals_industries WHERE slug = 'software'), (SELECT id FROM deals_sub_industries WHERE slug = 'gaming-software'), true),
('omniview-id', (SELECT id FROM deals_industries WHERE slug = 'software'), (SELECT id FROM deals_sub_industries WHERE slug = 'web-applications'), false)
ON CONFLICT (company_id, industry_id, sub_industry_id) DO NOTHING;

-- Link Deals to Investors
INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd) VALUES
-- ZenScreen investors
((SELECT id FROM deals WHERE deal_id = 'zenscreen-deal-2024'), '500startups-id', 'lead', 800000),
((SELECT id FROM deals WHERE deal_id = 'zenscreen-deal-2024'), 'bessemer-id', 'participant', 600000),
((SELECT id FROM deals WHERE deal_id = 'zenscreen-deal-2024'), 'bmw-ventures-id', 'participant', 400000),

-- Van Leeuwen investors  
((SELECT id FROM deals WHERE deal_id = 'vanleeuwen-deal-2024'), 'strand-equity-id', 'lead', 18700000),

-- Conifer Point investors
((SELECT id FROM deals WHERE deal_id = 'coniferpoint-deal-2024'), '180degree-id', 'lead', 2000000),
((SELECT id FROM deals WHERE deal_id = 'coniferpoint-deal-2024'), 'abbvie-ventures-id', 'participant', 1500000),
((SELECT id FROM deals WHERE deal_id = 'coniferpoint-deal-2024'), 'arch-ventures-id', 'participant', 1000000),

-- OmniView investors
((SELECT id FROM deals WHERE deal_id = 'omniview-deal-2024'), 'undisclosed-id', 'lead', 1200000)
ON CONFLICT (deal_id, investor_id) DO NOTHING;