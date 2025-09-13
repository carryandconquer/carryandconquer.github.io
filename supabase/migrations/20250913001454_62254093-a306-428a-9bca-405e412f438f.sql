-- Clear all foreign key references first
DELETE FROM public.deals_company_industries;
DELETE FROM public.deals_sub_industries;
DELETE FROM public.deals_industries;

-- Insert the exact GICS-based sectors as requested
INSERT INTO public.deals_industries (name, slug) VALUES
('Energy', 'energy'),
('Materials', 'materials'),
('Industrials', 'industrials'),
('Consumer Discretionary', 'consumer-discretionary'),
('Consumer Staples', 'consumer-staples'),
('Health Care', 'health-care'),
('Financials', 'financials'),
('Information Technology', 'information-technology'),
('Communication Services', 'communication-services'),
('Utilities', 'utilities'),
('Real Estate', 'real-estate');

-- Insert the exact GICS-based subsectors as requested
WITH industry_ids AS (
  SELECT id, slug FROM public.deals_industries
)
INSERT INTO public.deals_sub_industries (industry_id, name, slug) VALUES
-- Energy subsectors
((SELECT id FROM industry_ids WHERE slug = 'energy'), 'Oil, Gas & Consumable Fuels', 'oil-gas-consumable-fuels'),
((SELECT id FROM industry_ids WHERE slug = 'energy'), 'Energy Equipment & Services', 'energy-equipment-services'),

-- Materials subsectors
((SELECT id FROM industry_ids WHERE slug = 'materials'), 'Chemicals', 'chemicals'),
((SELECT id FROM industry_ids WHERE slug = 'materials'), 'Construction Materials', 'construction-materials'),
((SELECT id FROM industry_ids WHERE slug = 'materials'), 'Containers & Packaging', 'containers-packaging'),
((SELECT id FROM industry_ids WHERE slug = 'materials'), 'Metals & Mining', 'metals-mining'),
((SELECT id FROM industry_ids WHERE slug = 'materials'), 'Paper & Forest Products', 'paper-forest-products'),

-- Industrials subsectors
((SELECT id FROM industry_ids WHERE slug = 'industrials'), 'Capital Goods', 'capital-goods'),
((SELECT id FROM industry_ids WHERE slug = 'industrials'), 'Commercial & Professional Services', 'commercial-professional-services'),
((SELECT id FROM industry_ids WHERE slug = 'industrials'), 'Transportation', 'transportation'),

-- Consumer Discretionary subsectors
((SELECT id FROM industry_ids WHERE slug = 'consumer-discretionary'), 'Automobiles & Components', 'automobiles-components'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-discretionary'), 'Consumer Durables & Apparel', 'consumer-durables-apparel'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-discretionary'), 'Hotels, Restaurants & Leisure', 'hotels-restaurants-leisure'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-discretionary'), 'Retailing', 'retailing'),

-- Consumer Staples subsectors
((SELECT id FROM industry_ids WHERE slug = 'consumer-staples'), 'Food & Staples Retailing', 'food-staples-retailing'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-staples'), 'Beverages', 'beverages'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-staples'), 'Food Products', 'food-products'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-staples'), 'Household Products', 'household-products'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-staples'), 'Personal Products', 'personal-products'),

-- Health Care subsectors
((SELECT id FROM industry_ids WHERE slug = 'health-care'), 'Health Care Equipment & Services', 'health-care-equipment-services'),
((SELECT id FROM industry_ids WHERE slug = 'health-care'), 'Pharmaceuticals, Biotechnology & Life Sciences', 'pharmaceuticals-biotechnology-life-sciences'),

-- Financials subsectors
((SELECT id FROM industry_ids WHERE slug = 'financials'), 'Banks', 'banks'),
((SELECT id FROM industry_ids WHERE slug = 'financials'), 'Diversified Financials', 'diversified-financials'),
((SELECT id FROM industry_ids WHERE slug = 'financials'), 'Insurance', 'insurance'),
((SELECT id FROM industry_ids WHERE slug = 'financials'), 'Real Estate', 'real-estate-financials'),

-- Information Technology subsectors
((SELECT id FROM industry_ids WHERE slug = 'information-technology'), 'Software & Services', 'software-services'),
((SELECT id FROM industry_ids WHERE slug = 'information-technology'), 'Technology Hardware & Equipment', 'technology-hardware-equipment'),
((SELECT id FROM industry_ids WHERE slug = 'information-technology'), 'Semiconductors & Semiconductor Equipment', 'semiconductors-semiconductor-equipment'),

-- Communication Services subsectors
((SELECT id FROM industry_ids WHERE slug = 'communication-services'), 'Telecommunication Services', 'telecommunication-services'),
((SELECT id FROM industry_ids WHERE slug = 'communication-services'), 'Media & Entertainment', 'media-entertainment'),

-- Utilities subsectors
((SELECT id FROM industry_ids WHERE slug = 'utilities'), 'Electric Utilities', 'electric-utilities'),
((SELECT id FROM industry_ids WHERE slug = 'utilities'), 'Gas Utilities', 'gas-utilities'),
((SELECT id FROM industry_ids WHERE slug = 'utilities'), 'Multi-Utilities', 'multi-utilities'),
((SELECT id FROM industry_ids WHERE slug = 'utilities'), 'Water Utilities', 'water-utilities'),

-- Real Estate subsectors
((SELECT id FROM industry_ids WHERE slug = 'real-estate'), 'Real Estate Investment Trusts (REITs)', 'real-estate-investment-trusts-reits'),
((SELECT id FROM industry_ids WHERE slug = 'real-estate'), 'Real Estate Management & Development', 'real-estate-management-development');