-- Insert the hardcoded deals into the database with proper taxonomy references
-- Deal 1: ZenScreen AI Platform Investment
INSERT INTO public.deals (
  deal_id, deal_name, company_name, deal_value_formatted, announcement_date, 
  sector, sub_sector, description, website, city, state_province, country, region,
  deal_status, stage_label, region_id, country_id, sector_id, sub_sector_id
) 
SELECT 
  '1' as deal_id,
  'ZenScreen AI Platform Investment' as deal_name,
  'ZenScreen' as company_name,
  '$2.5M' as deal_value_formatted,
  '2024-01-01'::date as announcement_date,
  'Information Technology' as sector,
  'Software & Services' as sub_sector,
  'Founded in 2017 and based in California, US, ZenScreen operates as a provider of an AI-based platform that enables users to monitor screen time and control electronic device usage.' as description,
  'www.zenscreen.ai' as website,
  'San Jose' as city,
  'California' as state_province,
  'United States' as country,
  'North America' as region,
  'Completed' as deal_status,
  'Add-on' as stage_label,
  r.id as region_id,
  c.id as country_id,
  s.id as sector_id,
  ss.id as sub_sector_id
FROM public.snapshot_geographic_regions r, 
     public.snapshot_countries c, 
     public.snapshot_sectors s, 
     public.snapshot_sub_sectors ss
WHERE r.slug = 'north-america' 
  AND c.slug = 'united-states'
  AND s.slug = 'information-technology' 
  AND ss.slug = 'software-services'
  AND NOT EXISTS (SELECT 1 FROM public.deals WHERE deal_id = '1');

-- Deal 2: Van Leeuwen Artisan Ice Cream Series A
INSERT INTO public.deals (
  deal_id, deal_name, company_name, deal_value_formatted, announcement_date, 
  sector, sub_sector, description, website, city, state_province, country, region,
  deal_status, stage_label, region_id, country_id, sector_id, sub_sector_id
) 
SELECT 
  '2' as deal_id,
  'Van Leeuwen Artisan Ice Cream Series A' as deal_name,
  'Van Leeuwen Artisan Ice Cream' as company_name,
  '$18.7M' as deal_value_formatted,
  '2024-01-01'::date as announcement_date,
  'Consumer Staples' as sector,
  'Food, Beverage & Tobacco' as sub_sector,
  'Founded in 2008 and based in New York, US, Van Leeuwen Artisan Ice Cream operates as a producer of dairy-based and vegan ice cream products.' as description,
  'www.vanleeuwenicecream.com' as website,
  'Brooklyn' as city,
  'New York' as state_province,
  'United States' as country,
  'North America' as region,
  'Completed' as deal_status,
  'Series A/Round 1' as stage_label,
  r.id as region_id,
  c.id as country_id,
  s.id as sector_id,
  ss.id as sub_sector_id
FROM public.snapshot_geographic_regions r, 
     public.snapshot_countries c, 
     public.snapshot_sectors s, 
     public.snapshot_sub_sectors ss
WHERE r.slug = 'north-america' 
  AND c.slug = 'united-states'
  AND s.slug = 'consumer-staples' 
  AND ss.slug = 'food-beverage-tobacco'
  AND NOT EXISTS (SELECT 1 FROM public.deals WHERE deal_id = '2');

-- Deal 3: Conifer Point Pharmaceuticals Add-on Investment
INSERT INTO public.deals (
  deal_id, deal_name, company_name, deal_value_formatted, announcement_date, 
  sector, sub_sector, description, website, city, state_province, country, region,
  deal_status, stage_label, region_id, country_id, sector_id, sub_sector_id
) 
SELECT 
  '3' as deal_id,
  'Conifer Point Pharmaceuticals Add-on Investment' as deal_name,
  'Conifer Point Pharmaceuticals LLC' as company_name,
  '$5.0M' as deal_value_formatted,
  '2024-01-01'::date as announcement_date,
  'Health Care' as sector,
  'Pharmaceuticals, Biotechnology & Life Sciences' as sub_sector,
  'Founded in 2014 and based in Pennsylvania, US, Conifer Point Pharmaceuticals LLC develops drug discovery technology using computational tools.' as description,
  'www.coniferpoint.com' as website,
  'Doylestown' as city,
  'Pennsylvania' as state_province,
  'United States' as country,
  'North America' as region,
  'Completed' as deal_status,
  'Add-on' as stage_label,
  r.id as region_id,
  c.id as country_id,
  s.id as sector_id,
  ss.id as sub_sector_id
FROM public.snapshot_geographic_regions r, 
     public.snapshot_countries c, 
     public.snapshot_sectors s, 
     public.snapshot_sub_sectors ss
WHERE r.slug = 'north-america' 
  AND c.slug = 'united-states'
  AND s.slug = 'health-care' 
  AND ss.slug = 'pharmaceuticals-biotechnology-life-sciences'
  AND NOT EXISTS (SELECT 1 FROM public.deals WHERE deal_id = '3');

-- Deal 4: OmniView Sports Seed Investment
INSERT INTO public.deals (
  deal_id, deal_name, company_name, deal_value_formatted, announcement_date, 
  sector, sub_sector, description, website, city, state_province, country, region,
  deal_status, stage_label, region_id, country_id, sector_id, sub_sector_id
) 
SELECT 
  '4' as deal_id,
  'OmniView Sports Seed Investment' as deal_name,
  'OmniView Sports Inc.' as company_name,
  '$1.2M' as deal_value_formatted,
  '2024-01-01'::date as announcement_date,
  'Information Technology' as sector,
  'Software & Services' as sub_sector,
  'Founded in 2020 and based in Massachusetts, US, OmniView Sports Inc. operates as sports viewing application.' as description,
  'www.ovszone.com' as website,
  'Boston' as city,
  'Massachusetts' as state_province,
  'United States' as country,
  'North America' as region,
  'Completed' as deal_status,
  'Seed' as stage_label,
  r.id as region_id,
  c.id as country_id,
  s.id as sector_id,
  ss.id as sub_sector_id
FROM public.snapshot_geographic_regions r, 
     public.snapshot_countries c, 
     public.snapshot_sectors s, 
     public.snapshot_sub_sectors ss
WHERE r.slug = 'north-america' 
  AND c.slug = 'united-states'
  AND s.slug = 'information-technology' 
  AND ss.slug = 'software-services'
  AND NOT EXISTS (SELECT 1 FROM public.deals WHERE deal_id = '4');