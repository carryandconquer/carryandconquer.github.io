-- Insert geographic regions, countries, and sectors if they don't exist
INSERT INTO snapshot_geographic_regions (id, name, slug) 
VALUES ('north-america-region-id'::uuid, 'North America', 'north-america')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO snapshot_countries (id, region_id, name, slug)
VALUES ('united-states-id'::uuid, 'north-america-region-id'::uuid, 'United States', 'united-states')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO snapshot_sectors (id, name, slug)
VALUES ('healthcare-sector-id'::uuid, 'Healthcare', 'healthcare')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO snapshot_sub_sectors (id, sector_id, name, slug)
VALUES ('medical-devices-id'::uuid, 'healthcare-sector-id'::uuid, 'Medical Devices', 'medical-devices')
ON CONFLICT (slug) DO NOTHING;

-- Add news items to header carousel metrics
INSERT INTO header_carousel_metrics (
  id, item_type, title, description, icon_name, color_scheme, 
  label, value, published, order_index, priority
) VALUES 
('news-boston-scientific-id'::uuid, 'news', 'Boston Scientific Wire Safety Issues', 'Endotak Reliance device under review', 'AlertTriangle', 'warning', 'Breaking', 'AP News', true, 1, 1),
('news-medtronic-appeal-id'::uuid, 'news', 'Medtronic Wins Patent Appeal', 'Heart valve patent litigation victory', 'Trophy', 'success', 'Legal', 'Reuters', true, 2, 1),
('news-jj-varipulse-id'::uuid, 'news', 'J&J Resumes Varipulse Rollout', 'US market expansion continues', 'Rocket', 'primary', 'Product Launch', 'Reuters', true, 3, 1),
('news-peerbridge-ecg-id'::uuid, 'news', 'Peerbridge Launches Wearable ECG', 'New Peerbridge Cor® device announced', 'Zap', 'accent', 'Innovation', 'PR Newswire', true, 4, 1),
('news-afib-detection-id'::uuid, 'news', 'New AFib Detection Technology', '95% accuracy wearable device', 'Target', 'secondary', 'Research', 'arXiv', true, 5, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();

-- Add trending companies
INSERT INTO snapshot_trending_companies (
  id, name, description, image_url, change_percentage,
  sector_id, region_id, country_id, published
) VALUES
('medtronic-trending-id'::uuid, 'Medtronic', 'Global leader in medical devices, especially cardiac rhythm management and heart valves. Recently expanded cardiac ablation portfolio.', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=300', 15.2, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('boston-scientific-trending-id'::uuid, 'Boston Scientific', 'Strong presence in interventional cardiology and structural heart devices. Investing in AI-driven cardiac diagnostics.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&h=300', 12.8, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('abbott-trending-id'::uuid, 'Abbott Laboratories', 'Known for heart valves, coronary stents, and diagnostic systems. Recently launched minimally invasive heart valve solutions.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&h=300', 18.5, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('edwards-trending-id'::uuid, 'Edwards Lifesciences', 'Pioneer in transcatheter aortic valve replacement (TAVR) devices, focusing on structural heart disease innovations.', 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=400&h=300', 22.1, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('ge-healthcare-trending-id'::uuid, 'GE Healthcare', 'Major player in cardiac imaging and diagnostics technology, supporting hospitals with advanced cardiology imaging equipment.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&h=300', 9.7, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('peerbridge-trending-id'::uuid, 'Peerbridge Health', 'Emerging U.S. startup offering wearable ECG monitoring devices. Recently recognized for innovation in cardiology technology.', 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&h=300', 45.3, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('elixir-trending-id'::uuid, 'Elixir Medical', 'Specializes in bioresorbable stents and advanced coronary scaffolds, contributing to next-gen interventional cardiology solutions.', 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=400&h=300', 31.6, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('reva-trending-id'::uuid, 'REVA Medical', 'Focused on bioresorbable polymer-based stents and scaffolds for cardiovascular disease treatment.', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&h=300', 28.4, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  change_percentage = EXCLUDED.change_percentage,
  updated_at = now();

-- Add trending people  
INSERT INTO snapshot_trending_people (
  id, name, company, position, image_url, description, change_percentage,
  sector_id, region_id, country_id, published
) VALUES
('jeff-wessler-trending-id'::uuid, 'Jeff Wessler', 'Heartbeat Health', 'CEO', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400', 'Leading digital cardiology innovation at Heartbeat Health with focus on virtual cardiac care.', 25.8, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('david-mortara-trending-id'::uuid, 'David W. Mortara', 'Mortara Instrument', 'Founder', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400', 'Pioneer in cardiac monitoring technology and founder of leading ECG equipment manufacturer.', 18.2, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true),
('john-puskas-trending-id'::uuid, 'John D. Puskas', 'Emory University Hospital Midtown', 'Cardiac Surgeon & Research', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=400', 'Leading cardiac surgeon and researcher advancing minimally invasive heart surgery techniques.', 32.4, 'healthcare-sector-id'::uuid, 'north-america-region-id'::uuid, 'united-states-id'::uuid, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  company = EXCLUDED.company,
  position = EXCLUDED.position,
  change_percentage = EXCLUDED.change_percentage,
  updated_at = now();

-- Add some market metrics for cardiology
INSERT INTO snapshot_market_metrics (
  id, metric_name, metric_category, metric_family, current_value, 
  change_percentage, change_direction, region_id, country_id, sector_id, sub_sector_id
) VALUES
('cardiology-market-size-id'::uuid, 'Market Size', 'financial', 'market_overview', '$52.2B', 8.4, 'up', 'north-america-region-id'::uuid, 'united-states-id'::uuid, 'healthcare-sector-id'::uuid, 'medical-devices-id'::uuid),
('cardiology-funding-id'::uuid, 'Total Funding', 'financial', 'investment', '$1.8B', 12.7, 'up', 'north-america-region-id'::uuid, 'united-states-id'::uuid, 'healthcare-sector-id'::uuid, 'medical-devices-id'::uuid),
('cardiology-devices-id'::uuid, 'Device Approvals', 'regulatory', 'innovation', '23', 15.0, 'up', 'north-america-region-id'::uuid, 'united-states-id'::uuid, 'healthcare-sector-id'::uuid, 'medical-devices-id'::uuid),
('cardiology-patents-id'::uuid, 'Patent Applications', 'innovation', 'research', '847', 6.2, 'up', 'north-america-region-id'::uuid, 'united-states-id'::uuid, 'healthcare-sector-id'::uuid, 'medical-devices-id'::uuid)
ON CONFLICT (id) DO UPDATE SET
  current_value = EXCLUDED.current_value,
  change_percentage = EXCLUDED.change_percentage,
  updated_at = now();