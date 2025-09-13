-- First, let's ensure we have the taxonomy data we need

-- Insert missing regions if they don't exist
INSERT INTO public.snapshot_geographic_regions (name, slug) 
VALUES ('North America', 'north-america')
ON CONFLICT (slug) DO NOTHING;

-- Insert missing countries if they don't exist  
INSERT INTO public.snapshot_countries (name, slug, region_id)
SELECT 'United States', 'united-states', r.id 
FROM public.snapshot_geographic_regions r 
WHERE r.slug = 'north-america'
ON CONFLICT (slug) DO NOTHING;

-- Insert missing sectors if they don't exist
INSERT INTO public.snapshot_sectors (name, slug) VALUES
('Consumer Discretionary', 'consumer-discretionary'),
('Health Care', 'health-care'),
('Information Technology', 'information-technology'),
('Consumer Staples', 'consumer-staples')
ON CONFLICT (slug) DO NOTHING;

-- Insert missing sub-sectors if they don't exist
INSERT INTO public.snapshot_sub_sectors (name, slug, sector_id) 
SELECT 'Automobiles & Components', 'automobiles-components', s.id 
FROM public.snapshot_sectors s WHERE s.slug = 'consumer-discretionary'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.snapshot_sub_sectors (name, slug, sector_id) 
SELECT 'Pharmaceuticals, Biotechnology & Life Sciences', 'pharmaceuticals-biotechnology-life-sciences', s.id 
FROM public.snapshot_sectors s WHERE s.slug = 'health-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.snapshot_sub_sectors (name, slug, sector_id) 
SELECT 'Software & Services', 'software-services', s.id 
FROM public.snapshot_sectors s WHERE s.slug = 'information-technology'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.snapshot_sub_sectors (name, slug, sector_id) 
SELECT 'Food, Beverage & Tobacco', 'food-beverage-tobacco', s.id 
FROM public.snapshot_sectors s WHERE s.slug = 'consumer-staples'
ON CONFLICT (slug) DO NOTHING;

-- Add new columns to deals table to reference taxonomy tables
ALTER TABLE public.deals 
ADD COLUMN IF NOT EXISTS region_id UUID REFERENCES public.snapshot_geographic_regions(id),
ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES public.snapshot_countries(id),
ADD COLUMN IF NOT EXISTS sector_id UUID REFERENCES public.snapshot_sectors(id),
ADD COLUMN IF NOT EXISTS sub_sector_id UUID REFERENCES public.snapshot_sub_sectors(id);

-- Create indexes for better performance on the new foreign key columns
CREATE INDEX IF NOT EXISTS idx_deals_region_id ON public.deals(region_id);
CREATE INDEX IF NOT EXISTS idx_deals_country_id ON public.deals(country_id);
CREATE INDEX IF NOT EXISTS idx_deals_sector_id ON public.deals(sector_id);
CREATE INDEX IF NOT EXISTS idx_deals_sub_sector_id ON public.deals(sub_sector_id);

-- Insert the hardcoded deals into the database with proper taxonomy references
WITH region_lookup AS (
  SELECT id, slug FROM public.snapshot_geographic_regions WHERE slug = 'north-america'
),
country_lookup AS (
  SELECT id, slug FROM public.snapshot_countries WHERE slug = 'united-states'
),
sector_lookup AS (
  SELECT id, name, slug FROM public.snapshot_sectors
),
sub_sector_lookup AS (
  SELECT id, name, slug, sector_id FROM public.snapshot_sub_sectors
)
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
FROM region_lookup r, country_lookup c, 
     sector_lookup s, sub_sector_lookup ss
WHERE s.slug = 'information-technology' AND ss.slug = 'software-services'
ON CONFLICT (deal_id) DO NOTHING

UNION ALL

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
FROM region_lookup r, country_lookup c, 
     sector_lookup s, sub_sector_lookup ss
WHERE s.slug = 'consumer-staples' AND ss.slug = 'food-beverage-tobacco'

UNION ALL

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
FROM region_lookup r, country_lookup c, 
     sector_lookup s, sub_sector_lookup ss
WHERE s.slug = 'health-care' AND ss.slug = 'pharmaceuticals-biotechnology-life-sciences'

UNION ALL

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
FROM region_lookup r, country_lookup c, 
     sector_lookup s, sub_sector_lookup ss
WHERE s.slug = 'information-technology' AND ss.slug = 'software-services';

-- Create a function to validate taxonomy alignment for new deals
CREATE OR REPLACE FUNCTION public.validate_deal_taxonomy()
RETURNS TRIGGER AS $$
BEGIN
  -- If region_id is provided, validate it exists
  IF NEW.region_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM public.snapshot_geographic_regions WHERE id = NEW.region_id) THEN
      RAISE EXCEPTION 'Invalid region_id: %', NEW.region_id;
    END IF;
  END IF;

  -- If country_id is provided, validate it exists and matches region
  IF NEW.country_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.snapshot_countries c 
      WHERE c.id = NEW.country_id 
      AND (NEW.region_id IS NULL OR c.region_id = NEW.region_id)
    ) THEN
      RAISE EXCEPTION 'Invalid country_id or country does not belong to specified region';
    END IF;
  END IF;

  -- If sector_id is provided, validate it exists
  IF NEW.sector_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM public.snapshot_sectors WHERE id = NEW.sector_id) THEN
      RAISE EXCEPTION 'Invalid sector_id: %', NEW.sector_id;
    END IF;
  END IF;

  -- If sub_sector_id is provided, validate it exists and belongs to sector
  IF NEW.sub_sector_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.snapshot_sub_sectors ss 
      WHERE ss.id = NEW.sub_sector_id 
      AND (NEW.sector_id IS NULL OR ss.sector_id = NEW.sector_id)
    ) THEN
      RAISE EXCEPTION 'Invalid sub_sector_id or sub-sector does not belong to specified sector';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate taxonomy on insert/update
DROP TRIGGER IF EXISTS validate_deal_taxonomy_trigger ON public.deals;
CREATE TRIGGER validate_deal_taxonomy_trigger
  BEFORE INSERT OR UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.validate_deal_taxonomy();