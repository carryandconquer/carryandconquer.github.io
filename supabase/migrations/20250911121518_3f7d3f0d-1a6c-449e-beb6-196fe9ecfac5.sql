-- Insert geographic regions, countries, and sectors if they don't exist
INSERT INTO snapshot_geographic_regions (name, slug) 
VALUES ('North America', 'north-america')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO snapshot_countries (region_id, name, slug)
SELECT r.id, 'United States', 'united-states'
FROM snapshot_geographic_regions r 
WHERE r.slug = 'north-america'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO snapshot_sectors (name, slug)
VALUES ('Healthcare', 'healthcare')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO snapshot_sub_sectors (sector_id, name, slug)
SELECT s.id, 'Medical Devices', 'medical-devices'
FROM snapshot_sectors s 
WHERE s.slug = 'healthcare'
ON CONFLICT (slug) DO NOTHING;

-- Add news items to header carousel metrics
INSERT INTO header_carousel_metrics (
  item_type, title, description, icon_name, color_scheme, 
  label, value, published, order_index, priority
) VALUES 
('news', 'Boston Scientific Wire Safety Issues', 'Endotak Reliance device under review', 'AlertTriangle', 'warning', 'Breaking', 'AP News', true, 1, 1),
('news', 'Medtronic Wins Patent Appeal', 'Heart valve patent litigation victory', 'Trophy', 'success', 'Legal', 'Reuters', true, 2, 1),
('news', 'J&J Resumes Varipulse Rollout', 'US market expansion continues', 'Rocket', 'info', 'Product Launch', 'Reuters', true, 3, 1),
('news', 'Peerbridge Launches Wearable ECG', 'New Peerbridge Cor® device announced', 'Zap', 'purple', 'Innovation', 'PR Newswire', true, 4, 1),
('news', 'New AFib Detection Technology', '95% accuracy wearable device', 'Target', 'default', 'Research', 'arXiv', true, 5, 1);

-- Add trending companies
INSERT INTO snapshot_trending_companies (
  name, description, image_url, change_percentage,
  sector_id, region_id, country_id, published
) 
SELECT 
  company_data.name,
  company_data.description, 
  company_data.image_url,
  company_data.change_percentage,
  s.id as sector_id,
  r.id as region_id, 
  c.id as country_id,
  true as published
FROM (VALUES
  ('Medtronic', 'Global leader in medical devices, especially cardiac rhythm management and heart valves. Recently expanded cardiac ablation portfolio.', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=300', 15.2),
  ('Boston Scientific', 'Strong presence in interventional cardiology and structural heart devices. Investing in AI-driven cardiac diagnostics.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&h=300', 12.8),
  ('Abbott Laboratories', 'Known for heart valves, coronary stents, and diagnostic systems. Recently launched minimally invasive heart valve solutions.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&h=300', 18.5),
  ('Edwards Lifesciences', 'Pioneer in transcatheter aortic valve replacement (TAVR) devices, focusing on structural heart disease innovations.', 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=400&h=300', 22.1),
  ('GE Healthcare', 'Major player in cardiac imaging and diagnostics technology, supporting hospitals with advanced cardiology imaging equipment.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&h=300', 9.7),
  ('Peerbridge Health', 'Emerging U.S. startup offering wearable ECG monitoring devices. Recently recognized for innovation in cardiology technology.', 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&h=300', 45.3),
  ('Elixir Medical', 'Specializes in bioresorbable stents and advanced coronary scaffolds, contributing to next-gen interventional cardiology solutions.', 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=400&h=300', 31.6),
  ('REVA Medical', 'Focused on bioresorbable polymer-based stents and scaffolds for cardiovascular disease treatment.', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&h=300', 28.4)
) AS company_data(name, description, image_url, change_percentage)
CROSS JOIN snapshot_sectors s 
CROSS JOIN snapshot_geographic_regions r
CROSS JOIN snapshot_countries c
WHERE s.slug = 'healthcare' 
  AND r.slug = 'north-america' 
  AND c.slug = 'united-states';

-- Add trending people  
INSERT INTO snapshot_trending_people (
  name, company, position, image_url, description, change_percentage,
  sector_id, region_id, country_id, published
)
SELECT 
  people_data.name,
  people_data.company,
  people_data.position,
  people_data.image_url,
  people_data.description,
  people_data.change_percentage,
  s.id as sector_id,
  r.id as region_id,
  c.id as country_id,
  true as published
FROM (VALUES
  ('Jeff Wessler', 'Heartbeat Health', 'CEO', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400', 'Leading digital cardiology innovation at Heartbeat Health with focus on virtual cardiac care.', 25.8),
  ('David W. Mortara', 'Mortara Instrument', 'Founder', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400', 'Pioneer in cardiac monitoring technology and founder of leading ECG equipment manufacturer.', 18.2),
  ('John D. Puskas', 'Emory University Hospital Midtown', 'Cardiac Surgeon & Research', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=400', 'Leading cardiac surgeon and researcher advancing minimally invasive heart surgery techniques.', 32.4)
) AS people_data(name, company, position, image_url, description, change_percentage)
CROSS JOIN snapshot_sectors s 
CROSS JOIN snapshot_geographic_regions r
CROSS JOIN snapshot_countries c
WHERE s.slug = 'healthcare' 
  AND r.slug = 'north-america' 
  AND c.slug = 'united-states';

-- Add some market metrics for cardiology
INSERT INTO snapshot_market_metrics (
  metric_name, metric_category, metric_family, current_value, 
  change_percentage, change_direction, region_id, country_id, sector_id, sub_sector_id
)
SELECT 
  metrics_data.metric_name,
  metrics_data.metric_category,
  metrics_data.metric_family,
  metrics_data.current_value,
  metrics_data.change_percentage,
  metrics_data.change_direction,
  r.id as region_id,
  c.id as country_id,
  s.id as sector_id,
  ss.id as sub_sector_id
FROM (VALUES
  ('Market Size', 'financial', 'market_overview', '$52.2B', 8.4, 'up'),
  ('Total Funding', 'financial', 'investment', '$1.8B', 12.7, 'up'),
  ('Device Approvals', 'regulatory', 'innovation', '23', 15.0, 'up'),
  ('Patent Applications', 'innovation', 'research', '847', 6.2, 'up')
) AS metrics_data(metric_name, metric_category, metric_family, current_value, change_percentage, change_direction)
CROSS JOIN snapshot_sectors s 
CROSS JOIN snapshot_geographic_regions r
CROSS JOIN snapshot_countries c
CROSS JOIN snapshot_sub_sectors ss
WHERE s.slug = 'healthcare' 
  AND r.slug = 'north-america' 
  AND c.slug = 'united-states'
  AND ss.slug = 'medical-devices';