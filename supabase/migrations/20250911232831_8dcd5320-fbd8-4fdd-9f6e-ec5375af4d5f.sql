-- Insert automotive industry data for North America > United States > Consumer Discretionary > Automobiles & Components

-- First, let's get the IDs we need (these should already exist based on the network requests)
-- North America region ID: b396b824-6c73-40bd-bc4f-f93b60b08234
-- United States country ID: d82444f9-7934-46bb-b667-a84fcba44806

-- We need to find or create the Consumer Discretionary sector and Automobiles & Components subsector
DO $$
DECLARE
    north_america_id UUID := 'b396b824-6c73-40bd-bc4f-f93b60b08234';
    united_states_id UUID := 'd82444f9-7934-46bb-b667-a84fcba44806';
    consumer_discretionary_id UUID;
    automobiles_components_id UUID;
BEGIN
    -- Insert or get Consumer Discretionary sector
    INSERT INTO snapshot_sectors (id, name, slug, created_at, updated_at)
    VALUES (gen_random_uuid(), 'Consumer Discretionary', 'consumer-discretionary', now(), now())
    ON CONFLICT (slug) DO NOTHING;
    
    SELECT id INTO consumer_discretionary_id FROM snapshot_sectors WHERE slug = 'consumer-discretionary';
    
    -- Insert or get Automobiles & Components subsector
    INSERT INTO snapshot_sub_sectors (id, sector_id, name, slug, created_at, updated_at)
    VALUES (gen_random_uuid(), consumer_discretionary_id, 'Automobiles & Components', 'automobiles-components', now(), now())
    ON CONFLICT (slug) DO NOTHING;
    
    SELECT id INTO automobiles_components_id FROM snapshot_sub_sectors WHERE slug = 'automobiles-components';

    -- Insert market metrics for automotive industry
    INSERT INTO snapshot_market_metrics (
        id, metric_name, metric_category, metric_family, current_value, change_percentage, change_direction,
        region_id, country_id, sector_id, sub_sector_id, data_date, created_at, updated_at
    ) VALUES 
    (gen_random_uuid(), 'PE Deal Activity', 'news', 'market_activity', 'H1 2025 impacted by global tariffs and elevated interest rates - deal activity cautious', NULL, 'down', north_america_id, united_states_id, consumer_discretionary_id, automobiles_components_id, CURRENT_DATE, now(), now()),
    (gen_random_uuid(), 'Distressed Asset Focus', 'news', 'market_activity', 'PE firms actively seeking tariff-impacted opportunities - strong focus on distressed assets', NULL, 'up', north_america_id, united_states_id, consumer_discretionary_id, automobiles_components_id, CURRENT_DATE, now(), now()),
    (gen_random_uuid(), 'Consolidation Activity', 'news', 'market_activity', 'Divestiture of non-core assets driving larger deals - growing consolidation activity', NULL, 'up', north_america_id, united_states_id, consumer_discretionary_id, automobiles_components_id, CURRENT_DATE, now(), now()),
    (gen_random_uuid(), 'Aftermarket M&A', 'news', 'market_activity', 'Q2 2025 saw significant North American automotive aftermarket investments - strong activity', NULL, 'up', north_america_id, united_states_id, consumer_discretionary_id, automobiles_components_id, CURRENT_DATE, now(), now());

    -- Insert trending companies
    INSERT INTO snapshot_trending_companies (
        id, name, description, change_percentage, image_url, sector_id, region_id, country_id, published, created_at, updated_at
    ) VALUES 
    (gen_random_uuid(), 'Robert Bosch GmbH', 'Leading global supplier of technology and services, divided into four business sectors. World''s largest automotive supplier with roughly 418,000 associates worldwide.', 45.2, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=300', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'DENSO CORPORATION', 'Global manufacturer of automotive components offering advanced automotive technologies, systems and products. Focuses on advanced mobility with approximately 168,000 employees.', 38.7, 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=400&h=300', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'Continental AG', 'German multinational automotive parts manufacturing company specializing in brake systems, interior electronics, automotive safety, powertrain and chassis components.', 34.1, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&h=300', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'ZF Friedrichshafen AG', 'Global technology company supplying systems for passenger cars, commercial vehicles and industrial technology. Leading worldwide automotive supplier for driveline and chassis technology.', 31.8, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&h=300', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'Magna International Inc.', 'Leading global automotive supplier with manufacturing facilities and product development centers in 28 countries. Mobility technology company with approximately 164,000 employees.', 29.4, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&h=300', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'Hyundai Mobis Co., Ltd.', 'Manufacturer and marketer of automotive parts and modules. The "parts and service" arm for Hyundai Motor Company, Genesis Motors and Kia Motors, focusing on autonomous driving, connectivity and electrification.', 26.3, 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=400&h=300', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now());

    -- Insert trending people
    INSERT INTO snapshot_trending_people (
        id, name, company, position, description, change_percentage, image_url, sector_id, region_id, country_id, published, created_at, updated_at
    ) VALUES 
    (gen_random_uuid(), 'Carlos Tavares', 'Stellantis', 'Former CEO', 'Former CEO of Stellantis, leading automotive industry transformation and electrification initiatives across global markets.', 42.5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'Seetarama "Swamy" Kotagiri', 'Magna International', 'CEO', 'CEO of Magna International, driving mobility technology innovation and leading global automotive supplier operations across 28 countries.', 38.9, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'Henrik Fisker', 'Fisker', 'CEO', 'CEO of Fisker, pioneering electric vehicle innovation and sustainable automotive design with focus on next-generation mobility solutions.', 35.7, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'Peter Rawlinson', 'Lucid Motors', 'CEO and CTO', 'CEO and CTO of Lucid Motors, leading luxury electric vehicle development and advanced automotive technology innovation.', 33.2, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'McKeel Hagerty', 'Hagerty', 'CEO', 'CEO of Hagerty, transforming automotive insurance and lifestyle services while building the largest automotive enthusiast community.', 30.1, 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=400', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now()),
    (gen_random_uuid(), 'Roger Penske', 'Penske Corporation', 'CEO', 'CEO of Penske Corporation, leading diversified automotive services and transportation solutions across multiple business segments.', 28.6, 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=400', consumer_discretionary_id, north_america_id, united_states_id, true, now(), now());

END $$;