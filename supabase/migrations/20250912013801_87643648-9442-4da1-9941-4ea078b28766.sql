BEGIN;

-- Ensure industry and sub-industry exist
INSERT INTO deals_industries (name, slug)
SELECT 'Consumer Discretionary', 'consumer-discretionary'
WHERE NOT EXISTS (
  SELECT 1 FROM deals_industries WHERE slug = 'consumer-discretionary'
);

INSERT INTO deals_sub_industries (name, slug, industry_id)
SELECT 'Automobiles & Components', 'automobiles-components', di.id
FROM deals_industries di
WHERE di.slug = 'consumer-discretionary'
AND NOT EXISTS (
  SELECT 1 FROM deals_sub_industries si WHERE si.slug = 'automobiles-components'
);

-- Helper: returns id for industry/sub-industry
WITH i AS (
  SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'
), si AS (
  SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'
)
SELECT 1;

-- Upsert companies and link to industry/sub-industry
-- 1) Teijin Automotive Technologies North America (CSP)
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Teijin Automotive Technologies North America (CSP)', 'Leading manufacturer of advanced composite materials for automotive heavy truck marine and recreational vehicle sectors with 4500+ employees across 14 locations', 'https://www.teijinautomotive.com/', 'Auburn Hills', 'Michigan', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Teijin Automotive Technologies North America (CSP)'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Teijin Automotive Technologies North America (CSP)')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Teijin Automotive Technologies North America (CSP)')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 2) Fenix Parts
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Fenix Parts', 'Quality used auto parts recycler and distributor with over 1 million automotive parts inventory', 'https://fenixparts.com/', 'Hurst', 'Texas', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Fenix Parts'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Fenix Parts')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Fenix Parts')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 3) RealTruck Inc
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'RealTruck Inc', 'Premier manufacturer and digital destination of accessories for truck Jeep Bronco and off-road vehicles', 'https://realtruck.com/', 'Ann Arbor', 'Michigan', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'RealTruck Inc'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'RealTruck Inc')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'RealTruck Inc')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 4) Race Winning Brands
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Race Winning Brands', 'Leading manufacturer of high-performance and racing parts for automotive and powersports aftermarkets', 'https://www.racewinningbrands.com/', 'Mentor', 'Ohio', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Race Winning Brands'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Race Winning Brands')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Race Winning Brands')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 5) GO Car Wash
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'GO Car Wash', 'Express car wash operator focused on rapid expansion and market consolidation', 'https://gocarwash.com/', 'Phoenix', 'Arizona', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'GO Car Wash'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'GO Car Wash')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'GO Car Wash')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 6) El Car Wash
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'El Car Wash', 'Prominent car wash operator in South Florida with premium service offerings', 'https://elcarwash.com/', 'Miami', 'Florida', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'El Car Wash'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'El Car Wash')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'El Car Wash')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 7) Repairify Inc
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Repairify Inc', 'Provider of automotive diagnostic repair solutions and remote diagnostic technology', 'https://repairify.com/', 'Plano', 'Texas', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Repairify Inc'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Repairify Inc')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Repairify Inc')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 8) Bestop Inc
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Bestop Inc', 'Leading manufacturer of soft tops and fabric accessories for Jeep vehicles and sole supplier of factory soft tops', 'https://www.bestop.com/', 'Louisville', 'Colorado', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Bestop Inc'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Bestop Inc')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Bestop Inc')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 9) Nivel Parts & Manufacturing
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Nivel Parts & Manufacturing', 'Global supplier of aftermarket parts for specialty vehicles with focus on performance and racing applications', NULL, 'Jacksonville', 'Florida', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Nivel Parts & Manufacturing'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Nivel Parts & Manufacturing')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Nivel Parts & Manufacturing')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 10) Sun Auto Tire & Service
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Sun Auto Tire & Service', 'Leading provider of automotive aftermarket services including tire installation and automotive maintenance', NULL, 'Tucson', 'Arizona', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Sun Auto Tire & Service'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Sun Auto Tire & Service')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Sun Auto Tire & Service')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 11) Big Brand Tire & Service
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Big Brand Tire & Service', 'Prominent tire and automotive service provider with strong California market presence', NULL, 'Moorpark', 'California', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Big Brand Tire & Service'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Big Brand Tire & Service')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Big Brand Tire & Service')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 12) Clarience Technologies
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Clarience Technologies', 'Provider of lighting and safety solutions for the transportation industry with focus on advanced technology', NULL, 'Falconer', 'New York', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Clarience Technologies'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Clarience Technologies')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Clarience Technologies')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 13) Ace Fence of Dallas
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Ace Fence of Dallas', 'Automotive-related infrastructure and fencing company serving commercial and industrial clients', NULL, 'Dallas', 'Texas', 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Ace Fence of Dallas'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Ace Fence of Dallas')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Ace Fence of Dallas')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 14) Brian's Cabinets
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Brian''s Cabinets', 'Custom manufacturing company with automotive applications and specialized fabrication capabilities', NULL, NULL, NULL, 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Brian''s Cabinets'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Brian''s Cabinets')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Brian''s Cabinets')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 15) Chance Rides
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Chance Rides', 'Manufacturing company with transportation sector ties and entertainment equipment production', NULL, NULL, NULL, 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Chance Rides'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Chance Rides')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Chance Rides')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- 16) Rylee + Cru
WITH upsert_company AS (
  INSERT INTO deals_companies (name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Rylee + Cru', 'Consumer products company with potential automotive consumer goods overlap and lifestyle brand focus', NULL, NULL, NULL, 'United States', 'North America'
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_companies WHERE name = 'Rylee + Cru'
  )
  RETURNING id
)
INSERT INTO deals_company_industries (company_id, industry_id, sub_industry_id, is_primary)
SELECT 
  COALESCE((SELECT id FROM upsert_company), (SELECT id FROM deals_companies WHERE name = 'Rylee + Cru')),
  (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary'),
  (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components'),
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deals_company_industries 
  WHERE company_id = (SELECT id FROM deals_companies WHERE name = 'Rylee + Cru')
  AND industry_id = (SELECT id FROM deals_industries WHERE slug = 'consumer-discretionary')
  AND sub_industry_id = (SELECT id FROM deals_sub_industries WHERE slug = 'automobiles-components')
);

-- Insert/Update deals for all 16 records
-- Helper function: upsert deal by slug
-- Teijin Automotive Technologies North America
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Teijin Automotive Technologies North America (CSP)'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, deal_value_usd, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  full_address, city, state_province, country, region, description, company_id, published, investment_strategy, enterprise_value, revenue_ltm
) VALUES (
  'teijin-auto-tech-na','Teijin Automotive Technologies North America','>$1B', 1000000000, to_date('3/31/2025','MM/DD/YYYY'), 'Acquisition', 'Large Cap', 'Completed', 'Completed',
  '255 Rex Blvd Auburn Hills MI 48326','Auburn Hills','Michigan','United States','North America',
  'Leading manufacturer of advanced composite materials for automotive heavy truck marine and recreational vehicle sectors with 4500+ employees across 14 locations',
  (SELECT id FROM comp), true, 'Buyout', 1000000000, 1500000000
)
ON CONFLICT DO NOTHING;

-- Fenix Parts
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Fenix Parts'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, deal_value_usd, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy, enterprise_value, revenue_ltm
) VALUES (
  'fenix-parts','Fenix Parts','$69M', 69000000, to_date('4/18/2018','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Hurst','Texas','United States','North America',
  'Quality used auto parts recycler and distributor with over 1 million automotive parts inventory',
  (SELECT id FROM comp), true, 'Growth/Buyout', 69000000, 69000000
)
ON CONFLICT DO NOTHING;

-- RealTruck Inc
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'RealTruck Inc'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  full_address, city, state_province, country, region, description, company_id, published, investment_strategy, revenue_ltm
) VALUES (
  'realtruck','RealTruck','Undisclosed', to_date('12/8/2020','MM/DD/YYYY'), 'Investment', 'Large Cap', 'Completed', 'Completed',
  '5400 Data Ct Ann Arbor MI 48108','Ann Arbor','Michigan','United States','North America',
  'Premier manufacturer and digital destination of accessories for truck Jeep Bronco and off-road vehicles',
  (SELECT id FROM comp), true, 'Growth/Buyout', 1100000000
)
ON CONFLICT DO NOTHING;

-- Race Winning Brands
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Race Winning Brands'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'race-winning-brands','Race Winning Brands','Undisclosed', to_date('11/23/2021','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Mentor','Ohio','United States','North America',
  'Leading manufacturer of high-performance and racing parts for automotive and powersports aftermarkets',
  (SELECT id FROM comp), true, 'Buyout'
)
ON CONFLICT DO NOTHING;

-- GO Car Wash
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'GO Car Wash'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'go-car-wash','Go Car Wash','Undisclosed', to_date('2/22/2019','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Phoenix','Arizona','United States','North America',
  'Express car wash operator focused on rapid expansion and market consolidation',
  (SELECT id FROM comp), true, 'Growth/Buyout'
)
ON CONFLICT DO NOTHING;

-- El Car Wash
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'El Car Wash'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'el-car-wash','El Car Wash','Undisclosed', to_date('7/18/2022','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Miami','Florida','United States','North America',
  'Prominent car wash operator in South Florida with premium service offerings',
  (SELECT id FROM comp), true, 'Growth/Buyout'
)
ON CONFLICT DO NOTHING;

-- Repairify Inc
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Repairify Inc'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'repairify','Repairify','Undisclosed', to_date('7/28/2015','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Plano','Texas','United States','North America',
  'Provider of automotive diagnostic repair solutions and remote diagnostic technology',
  (SELECT id FROM comp), true, 'Growth/Buyout'
)
ON CONFLICT DO NOTHING;

-- Bestop Inc
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Bestop Inc'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'bestop','Bestop','Undisclosed', to_date('8/3/2015','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Louisville','Colorado','United States','North America',
  'Leading manufacturer of soft tops and fabric accessories for Jeep vehicles and sole supplier of factory soft tops',
  (SELECT id FROM comp), true, 'Buyout'
)
ON CONFLICT DO NOTHING;

-- Nivel Parts & Manufacturing
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Nivel Parts & Manufacturing'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'nivel-parts-mfg','Nivel Parts & Manufacturing','Undisclosed', to_date('5/21/2021','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Jacksonville','Florida','United States','North America',
  'Global supplier of aftermarket parts for specialty vehicles with focus on performance and racing applications',
  (SELECT id FROM comp), true, 'Buyout'
)
ON CONFLICT DO NOTHING;

-- Sun Auto Tire & Service
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Sun Auto Tire & Service'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'sun-auto-tire','Sun Auto Tire & Service','Undisclosed', to_date('9/16/2021','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Tucson','Arizona','United States','North America',
  'Leading provider of automotive aftermarket services including tire installation and automotive maintenance',
  (SELECT id FROM comp), true, 'Growth/Buyout'
)
ON CONFLICT DO NOTHING;

-- Big Brand Tire & Service
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Big Brand Tire & Service'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'big-brand-tire','Big Brand Tire & Service','Undisclosed', to_date('3/1/2021','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Moorpark','California','United States','North America',
  'Prominent tire and automotive service provider with strong California market presence',
  (SELECT id FROM comp), true, 'Buyout'
)
ON CONFLICT DO NOTHING;

-- Clarience Technologies
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Clarience Technologies'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'clarience-tech','Clarience Technologies','Undisclosed', to_date('12/17/2019','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'Falconer','New York','United States','North America',
  'Provider of lighting and safety solutions for the transportation industry with focus on advanced technology',
  (SELECT id FROM comp), true, 'Buyout'
)
ON CONFLICT DO NOTHING;

-- Ace Fence of Dallas
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Ace Fence of Dallas'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  city, state_province, country, region, description, company_id, published, investment_strategy
) VALUES (
  'ace-fence-dallas','Ace Fence of Dallas','Undisclosed', to_date('11/1/2020','MM/DD/YYYY'), 'Investment', 'Small Cap', 'Completed', 'Completed',
  'Dallas','Texas','United States','North America',
  'Automotive-related infrastructure and fencing company serving commercial and industrial clients',
  (SELECT id FROM comp), true, 'Growth'
)
ON CONFLICT DO NOTHING;

-- Brian''s Cabinets
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Brian''s Cabinets'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  country, region, description, company_id, published, investment_strategy
) VALUES (
  'brians-cabinets','Brian''s Cabinets','Undisclosed', to_date('1/1/2024','MM/DD/YYYY'), 'Investment', 'Small Cap', 'Completed', 'Completed',
  'United States','North America',
  'Custom manufacturing company with automotive applications and specialized fabrication capabilities',
  (SELECT id FROM comp), true, 'Growth'
)
ON CONFLICT DO NOTHING;

-- Chance Rides
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Chance Rides'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  country, region, description, company_id, published, investment_strategy
) VALUES (
  'chance-rides','Chance Rides','Undisclosed', to_date('6/1/2021','MM/DD/YYYY'), 'Investment', 'Mid Cap', 'Completed', 'Completed',
  'United States','North America',
  'Manufacturing company with transportation sector ties and entertainment equipment production',
  (SELECT id FROM comp), true, 'Growth'
)
ON CONFLICT DO NOTHING;

-- Rylee + Cru
WITH comp AS (
  SELECT id FROM deals_companies WHERE name = 'Rylee + Cru'
)
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, transaction_type, deal_size_category, deal_status, stage_label,
  country, region, description, company_id, published, investment_strategy
) VALUES (
  'rylee-cru','Rylee + Cru','Undisclosed', to_date('2/1/2024','MM/DD/YYYY'), 'Acquisition', 'Small Cap', 'Completed', 'Completed',
  'United States','North America',
  'Consumer products company with potential automotive consumer goods overlap and lifestyle brand focus',
  (SELECT id FROM comp), true, 'Buyout'
)
ON CONFLICT DO NOTHING;

COMMIT;