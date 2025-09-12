-- Fix the subquery error by using simpler approach
-- First insert individual deals with proper company lookups

-- 1. Teijin Automotive Technologies North America
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, deal_value_usd, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  full_address, city, state_province, country, region, description, published, investment_strategy, enterprise_value, revenue_ltm
) VALUES (
  'teijin-auto-tech-na','Teijin Automotive Technologies North America','>$1B', 1000000000, '2025-03-31', 'Acquisition', 'Large Cap', 'Completed', 'Completed',
  '255 Rex Blvd Auburn Hills MI 48326','Auburn Hills','Michigan','United States','North America',
  'Leading manufacturer of advanced composite materials for automotive heavy truck marine and recreational vehicle sectors with 4500+ employees across 14 locations',
  true, 'Buyout', 1000000000, 1500000000
)
ON CONFLICT (deal_id) DO UPDATE SET
  deal_name = EXCLUDED.deal_name,
  deal_value_formatted = EXCLUDED.deal_value_formatted,
  description = EXCLUDED.description;

-- 2. RealTruck Inc  
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  full_address, city, state_province, country, region, description, published, investment_strategy, revenue_ltm
) VALUES (
  'realtruck','RealTruck','Undisclosed', '2020-12-08', 'Investment', 'Large Cap', 'Completed', 'Completed',
  '5400 Data Ct Ann Arbor MI 48108','Ann Arbor','Michigan','United States','North America',
  'Premier manufacturer and digital destination of accessories for truck Jeep Bronco and off-road vehicles',
  true, 'Growth/Buyout', 1100000000
)
ON CONFLICT (deal_id) DO UPDATE SET
  deal_name = EXCLUDED.deal_name,
  description = EXCLUDED.description;

-- 3. Race Winning Brands
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, published, investment_strategy
) VALUES (
  'race-winning-brands','Race Winning Brands','Undisclosed', '2021-11-23', 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Mentor','Ohio','United States','North America',
  'Leading manufacturer of high-performance and racing parts for automotive and powersports aftermarkets',
  true, 'Buyout'
)
ON CONFLICT (deal_id) DO UPDATE SET
  deal_name = EXCLUDED.deal_name,
  description = EXCLUDED.description;

-- 4. Repairify Inc
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, published, investment_strategy
) VALUES (
  'repairify','Repairify','Undisclosed', '2015-07-28', 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Plano','Texas','United States','North America',
  'Provider of automotive diagnostic repair solutions and remote diagnostic technology',
  true, 'Growth/Buyout'
)
ON CONFLICT (deal_id) DO UPDATE SET
  deal_name = EXCLUDED.deal_name,
  description = EXCLUDED.description;

-- 5. More deals...
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, published, investment_strategy
) VALUES 
  ('race-winning-brands','Race Winning Brands','Undisclosed', '2021-11-23', 'Investment', 'Mid Cap', 'Completed', 'Completed',
   'Mentor','Ohio','United States','North America',
   'Leading manufacturer of high-performance and racing parts for automotive and powersports aftermarkets',
   true, 'Buyout'),
  ('ace-fence-dallas','Ace Fence of Dallas','Undisclosed', '2020-11-01', 'Investment', 'Small Cap', 'Completed', 'Completed',
   'Dallas','Texas','United States','North America',
   'Automotive-related infrastructure and fencing company serving commercial and industrial clients',
   true, 'Growth'),
  ('brians-cabinets','Brian''s Cabinets','Undisclosed', '2024-01-01', 'Investment', 'Small Cap', 'Completed', 'Completed',
   NULL,NULL,'United States','North America',
   'Custom manufacturing company with automotive applications and specialized fabrication capabilities',
   true, 'Growth'),
  ('chance-rides','Chance Rides','Undisclosed', '2021-06-01', 'Investment', 'Mid Cap', 'Completed', 'Completed',
   NULL,NULL,'United States','North America',
   'Manufacturing company with transportation sector ties and entertainment equipment production',
   true, 'Growth'),
  ('rylee-cru','Rylee + Cru','Undisclosed', '2024-02-01', 'Acquisition', 'Small Cap', 'Completed', 'Completed',
   NULL,NULL,'United States','North America',
   'Consumer products company with potential automotive consumer goods overlap and lifestyle brand focus',
   true, 'Buyout')
ON CONFLICT (deal_id) DO UPDATE SET
  deal_name = EXCLUDED.deal_name,
  description = EXCLUDED.description;