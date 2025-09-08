-- Insert geographic dimensions
INSERT INTO snapshot_geographic_regions (id, name, slug, created_at, updated_at) 
SELECT '550e8400-e29b-41d4-a716-446655440001', 'Asia Pacific', 'asia-pacific', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_geographic_regions WHERE slug = 'asia-pacific');

INSERT INTO snapshot_countries (id, region_id, name, slug, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Australia', 'australia', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_countries WHERE slug = 'australia');

-- Insert sector dimensions
INSERT INTO snapshot_sectors (id, name, slug, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440003', 'Food and Ag', 'food-and-ag', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_sectors WHERE slug = 'food-and-ag');

INSERT INTO snapshot_sub_sectors (id, sector_id, name, slug, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'Food', 'food', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_sub_sectors WHERE slug = 'food');

-- Create missing table for trending companies
CREATE TABLE IF NOT EXISTS snapshot_trending_companies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  sector_id uuid,
  region_id uuid,
  country_id uuid,
  change_percentage numeric,
  image_url text,
  published boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE snapshot_trending_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can manage trending companies" 
ON snapshot_trending_companies 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insert market activity metrics for Australia Fruit & Vegetables
INSERT INTO snapshot_market_metrics (id, metric_name, metric_category, metric_family, current_value, change_percentage, change_direction, region_id, country_id, sector_id, sub_sector_id, data_date, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440010', 'Transaction Volume', 'Market Activity', 'Volume', 'A$2.8B', null, null, '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', CURRENT_DATE, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_market_metrics WHERE metric_name = 'Transaction Volume' AND region_id = '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO snapshot_market_metrics (id, metric_name, metric_category, metric_family, current_value, change_percentage, change_direction, region_id, country_id, sector_id, sub_sector_id, data_date, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440011', 'New Deals', 'Market Activity', 'Count', '47', null, null, '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', CURRENT_DATE, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_market_metrics WHERE metric_name = 'New Deals' AND region_id = '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO snapshot_market_metrics (id, metric_name, metric_category, metric_family, current_value, change_percentage, change_direction, region_id, country_id, sector_id, sub_sector_id, data_date, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440012', 'Active Companies', 'Market Activity', 'Count', '156', null, null, '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', CURRENT_DATE, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_market_metrics WHERE metric_name = 'Active Companies' AND region_id = '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO snapshot_market_metrics (id, metric_name, metric_category, metric_family, current_value, change_percentage, change_direction, region_id, country_id, sector_id, sub_sector_id, data_date, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440013', 'Pricing Index', 'Market Activity', 'Index', '+12.3%', 12.3, 'up', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', CURRENT_DATE, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_market_metrics WHERE metric_name = 'Pricing Index' AND region_id = '550e8400-e29b-41d4-a716-446655440001');