-- Insert trending companies
INSERT INTO snapshot_trending_companies (id, name, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440020', 'Fresh Produce Group', 'Market leader in premium citrus distribution', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 25.4, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_companies WHERE name = 'Fresh Produce Group');

INSERT INTO snapshot_trending_companies (id, name, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440021', 'Australian Banana Growers Cooperative', 'Collective representing 95% of banana producers', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 18.7, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_companies WHERE name = 'Australian Banana Growers Cooperative');

INSERT INTO snapshot_trending_companies (id, name, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440022', 'Perfection Fresh Australia', 'Innovation in packaging and supply chain technology', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 22.1, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_companies WHERE name = 'Perfection Fresh Australia');

INSERT INTO snapshot_trending_companies (id, name, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440023', 'Costa Group Holdings', 'Integrated horticulture company with sustainable farming practices', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 31.2, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_companies WHERE name = 'Costa Group Holdings');

INSERT INTO snapshot_trending_companies (id, name, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440024', 'Harvest Moon Organics', 'Rapid expansion in organic stone fruit production', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 45.8, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_companies WHERE name = 'Harvest Moon Organics');

INSERT INTO snapshot_trending_companies (id, name, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440025', 'Select Harvests', 'Leading almond producer with export focus', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 15.9, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_companies WHERE name = 'Select Harvests');

-- Insert trending people  
INSERT INTO snapshot_trending_people (id, name, company, position, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440030', 'Sarah Chen', 'Fresh Produce Group', 'CEO', 'Leading digital transformation initiatives', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 28.5, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_people WHERE name = 'Sarah Chen');

INSERT INTO snapshot_trending_people (id, name, company, position, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440031', 'Michael O''Brien', 'Perfection Fresh Australia', 'Head of Innovation', 'Pioneering sustainable packaging solutions', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 22.7, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_people WHERE name = 'Michael O''Brien');

INSERT INTO snapshot_trending_people (id, name, company, position, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440032', 'Dr. Emily Watson', 'Australian Banana Growers Cooperative', 'Research Director', 'Advancing disease-resistant banana varieties', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 35.2, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_people WHERE name = 'Dr. Emily Watson');

INSERT INTO snapshot_trending_people (id, name, company, position, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440033', 'James Thompson', 'Costa Group Holdings', 'Managing Director', 'Driving vertical integration strategies', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 19.8, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_people WHERE name = 'James Thompson');

INSERT INTO snapshot_trending_people (id, name, company, position, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440034', 'Lisa Rodriguez', 'Harvest Moon Organics', 'Founder', 'Expanding organic certification programs', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 42.1, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_people WHERE name = 'Lisa Rodriguez');

INSERT INTO snapshot_trending_people (id, name, company, position, description, sector_id, region_id, country_id, change_percentage, image_url, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440035', 'David Kim', 'Select Harvests', 'Export Manager', 'Opening new Asian market channels', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 16.4, null, true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM snapshot_trending_people WHERE name = 'David Kim');

-- Insert deals
INSERT INTO deals (id, deal_id, deal_name, transaction_type, deal_value_formatted, announcement_date, city, country, region, description, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440040', 'FPG-2024-001', 'Fresh Produce Group Acquisition', 'Acquisition', 'A$45M', '2024-03-15', 'Sydney', 'Australia', 'Asia Pacific', 'Fresh Produce Group acquires regional citrus distributor for A$45M', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM deals WHERE deal_id = 'FPG-2024-001');

INSERT INTO deals (id, deal_id, deal_name, transaction_type, deal_value_formatted, announcement_date, city, country, region, description, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440041', 'CGH-2024-002', 'Costa Group Tech Partnership', 'Partnership', 'A$12M', '2024-02-28', 'Melbourne', 'Australia', 'Asia Pacific', 'Costa Group Holdings partners with tech startup for A$12M automation investment', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM deals WHERE deal_id = 'CGH-2024-002');

INSERT INTO deals (id, deal_id, deal_name, transaction_type, deal_value_formatted, announcement_date, city, country, region, description, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440042', 'PFA-2024-003', 'Perfection Fresh Funding', 'Funding', 'A$28M', '2024-04-10', 'Brisbane', 'Australia', 'Asia Pacific', 'Perfection Fresh Australia secures A$28M funding for sustainable packaging facility', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM deals WHERE deal_id = 'PFA-2024-003');

INSERT INTO deals (id, deal_id, deal_name, transaction_type, deal_value_formatted, announcement_date, city, country, region, description, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440043', 'SH-2024-004', 'Select Harvests Expansion', 'Investment', 'A$35M', '2024-01-22', 'Adelaide', 'Australia', 'Asia Pacific', 'Select Harvests expands almond processing capacity with A$35M investment', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM deals WHERE deal_id = 'SH-2024-004');

INSERT INTO deals (id, deal_id, deal_name, transaction_type, deal_value_formatted, announcement_date, city, country, region, description, published, created_at, updated_at)
SELECT '550e8400-e29b-41d4-a716-446655440044', 'HMO-2024-005', 'Harvest Moon Series A', 'Series A', 'A$8M', '2024-05-03', 'Perth', 'Australia', 'Asia Pacific', 'Harvest Moon Organics raises A$8M Series A for organic farm expansion', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM deals WHERE deal_id = 'HMO-2024-005');