-- First, populate the industries and sub-industries tables with the Consumer Discretionary sector
INSERT INTO deals_industries (name, slug) VALUES 
('Consumer Discretionary', 'consumer-discretionary')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO deals_sub_industries (industry_id, name, slug) 
SELECT di.id, 'Automobiles & Components', 'automobiles-components'
FROM deals_industries di 
WHERE di.slug = 'consumer-discretionary'
ON CONFLICT (slug) DO NOTHING;

-- Create companies for automotive deals and link them to industries
INSERT INTO deals_companies (id, name, description, country, region) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Tesla Motors', 'Electric vehicle and clean energy company', 'United States', 'North America'),
('550e8400-e29b-41d4-a716-446655440002', 'Ford Motor Company', 'American multinational automaker', 'United States', 'North America'),
('550e8400-e29b-41d4-a716-446655440003', 'General Motors', 'American multinational automotive manufacturing corporation', 'United States', 'North America'),
('550e8400-e29b-41d4-a716-446655440004', 'Sun Auto Tire & Service', 'Automotive tire and service company', 'United States', 'North America'),
('550e8400-e29b-41d4-a716-446655440005', 'Teijin Automotive Technologies', 'Automotive technology and materials company', 'United States', 'North America')
ON CONFLICT (id) DO NOTHING;

-- Link companies to the automobiles & components sub-industry
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  dc.id,
  di.id,
  dsi.id,
  true
FROM deals_companies dc
CROSS JOIN deals_industries di
CROSS JOIN deals_sub_industries dsi
WHERE dc.name IN ('Tesla Motors', 'Ford Motor Company', 'General Motors', 'Sun Auto Tire & Service', 'Teijin Automotive Technologies')
  AND di.slug = 'consumer-discretionary'
  AND dsi.slug = 'automobiles-components'
ON CONFLICT (company_id, industry_id) DO NOTHING;

-- Update existing automotive deals to link to the correct companies
UPDATE deals 
SET company_id = (SELECT id FROM deals_companies WHERE name = 'Tesla Motors' LIMIT 1)
WHERE deal_name LIKE '%Tesla%';

UPDATE deals 
SET company_id = (SELECT id FROM deals_companies WHERE name = 'Ford Motor Company' LIMIT 1)  
WHERE deal_name LIKE '%Ford%';

UPDATE deals 
SET company_id = (SELECT id FROM deals_companies WHERE name = 'General Motors' LIMIT 1)
WHERE deal_name LIKE '%GM%' OR deal_name LIKE '%General Motors%';

UPDATE deals 
SET company_id = (SELECT id FROM deals_companies WHERE name = 'Sun Auto Tire & Service' LIMIT 1)
WHERE deal_name LIKE '%Sun Auto%';

UPDATE deals 
SET company_id = (SELECT id FROM deals_companies WHERE name = 'Teijin Automotive Technologies' LIMIT 1)
WHERE deal_name LIKE '%Teijin%';