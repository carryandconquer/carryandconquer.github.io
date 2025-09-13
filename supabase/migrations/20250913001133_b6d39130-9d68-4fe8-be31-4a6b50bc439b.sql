-- Insert PE sectors into deals_industries table
INSERT INTO public.deals_industries (name, slug) VALUES
('Technology', 'technology'),
('Healthcare', 'healthcare'),
('Financial Services', 'financial-services'),
('Consumer & Retail', 'consumer-retail'),
('Industrial & Manufacturing', 'industrial-manufacturing'),
('Energy & Utilities', 'energy-utilities'),
('Real Estate', 'real-estate'),
('Media & Communications', 'media-communications'),
('Transportation & Logistics', 'transportation-logistics'),
('Agriculture & Food', 'agriculture-food'),
('Education', 'education'),
('Government & Defense', 'government-defense'),
('Professional Services', 'professional-services'),
('Aerospace & Aviation', 'aerospace-aviation'),
('Chemicals & Materials', 'chemicals-materials')
ON CONFLICT (slug) DO NOTHING;

-- Get industry IDs for sub-industries
-- Insert PE sub-sectors into deals_sub_industries table
WITH industry_ids AS (
  SELECT id, slug FROM public.deals_industries
)
INSERT INTO public.deals_sub_industries (industry_id, name, slug) VALUES
-- Technology sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Software & SaaS', 'software-saas'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Fintech', 'fintech'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Cybersecurity', 'cybersecurity'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Artificial Intelligence', 'artificial-intelligence'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Cloud Computing', 'cloud-computing'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'E-commerce', 'e-commerce'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Mobile & Apps', 'mobile-apps'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Data Analytics', 'data-analytics'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Hardware & Semiconductors', 'hardware-semiconductors'),
((SELECT id FROM industry_ids WHERE slug = 'technology'), 'Gaming', 'gaming'),

-- Healthcare sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'healthcare'), 'Biotech & Pharmaceuticals', 'biotech-pharmaceuticals'),
((SELECT id FROM industry_ids WHERE slug = 'healthcare'), 'Medical Devices', 'medical-devices'),
((SELECT id FROM industry_ids WHERE slug = 'healthcare'), 'Healthcare Services', 'healthcare-services'),
((SELECT id FROM industry_ids WHERE slug = 'healthcare'), 'Digital Health', 'digital-health'),
((SELECT id FROM industry_ids WHERE slug = 'healthcare'), 'Healthcare IT', 'healthcare-it'),
((SELECT id FROM industry_ids WHERE slug = 'healthcare'), 'Life Sciences', 'life-sciences'),
((SELECT id FROM industry_ids WHERE slug = 'healthcare'), 'Diagnostics', 'diagnostics'),

-- Financial Services sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'financial-services'), 'Banking', 'banking'),
((SELECT id FROM industry_ids WHERE slug = 'financial-services'), 'Insurance', 'insurance'),
((SELECT id FROM industry_ids WHERE slug = 'financial-services'), 'Asset Management', 'asset-management'),
((SELECT id FROM industry_ids WHERE slug = 'financial-services'), 'Payment Processing', 'payment-processing'),
((SELECT id FROM industry_ids WHERE slug = 'financial-services'), 'Wealth Management', 'wealth-management'),
((SELECT id FROM industry_ids WHERE slug = 'financial-services'), 'Capital Markets', 'capital-markets'),

-- Consumer & Retail sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'consumer-retail'), 'Consumer Products', 'consumer-products'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-retail'), 'Retail', 'retail'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-retail'), 'Fashion & Apparel', 'fashion-apparel'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-retail'), 'Food & Beverage', 'food-beverage'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-retail'), 'Beauty & Personal Care', 'beauty-personal-care'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-retail'), 'Sports & Recreation', 'sports-recreation'),
((SELECT id FROM industry_ids WHERE slug = 'consumer-retail'), 'Home & Garden', 'home-garden'),

-- Industrial & Manufacturing sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'industrial-manufacturing'), 'Manufacturing', 'manufacturing'),
((SELECT id FROM industry_ids WHERE slug = 'industrial-manufacturing'), 'Automation & Robotics', 'automation-robotics'),
((SELECT id FROM industry_ids WHERE slug = 'industrial-manufacturing'), 'Construction', 'construction'),
((SELECT id FROM industry_ids WHERE slug = 'industrial-manufacturing'), 'Industrial Equipment', 'industrial-equipment'),
((SELECT id FROM industry_ids WHERE slug = 'industrial-manufacturing'), 'Packaging', 'packaging'),
((SELECT id FROM industry_ids WHERE slug = 'industrial-manufacturing'), 'Environmental Services', 'environmental-services'),

-- Energy & Utilities sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'energy-utilities'), 'Oil & Gas', 'oil-gas'),
((SELECT id FROM industry_ids WHERE slug = 'energy-utilities'), 'Renewable Energy', 'renewable-energy'),
((SELECT id FROM industry_ids WHERE slug = 'energy-utilities'), 'Utilities', 'utilities'),
((SELECT id FROM industry_ids WHERE slug = 'energy-utilities'), 'Power Generation', 'power-generation'),

-- Media & Communications sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'media-communications'), 'Telecommunications', 'telecommunications'),
((SELECT id FROM industry_ids WHERE slug = 'media-communications'), 'Media & Entertainment', 'media-entertainment'),
((SELECT id FROM industry_ids WHERE slug = 'media-communications'), 'Publishing', 'publishing'),
((SELECT id FROM industry_ids WHERE slug = 'media-communications'), 'Advertising & Marketing', 'advertising-marketing'),

-- Transportation & Logistics sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'transportation-logistics'), 'Logistics & Supply Chain', 'logistics-supply-chain'),
((SELECT id FROM industry_ids WHERE slug = 'transportation-logistics'), 'Shipping', 'shipping'),
((SELECT id FROM industry_ids WHERE slug = 'transportation-logistics'), 'Aviation', 'aviation'),
((SELECT id FROM industry_ids WHERE slug = 'transportation-logistics'), 'Automotive', 'automotive'),

-- Professional Services sub-sectors
((SELECT id FROM industry_ids WHERE slug = 'professional-services'), 'Consulting', 'consulting'),
((SELECT id FROM industry_ids WHERE slug = 'professional-services'), 'Legal Services', 'legal-services'),
((SELECT id FROM industry_ids WHERE slug = 'professional-services'), 'Accounting', 'accounting'),
((SELECT id FROM industry_ids WHERE slug = 'professional-services'), 'Human Resources', 'human-resources')
ON CONFLICT (slug) DO NOTHING;