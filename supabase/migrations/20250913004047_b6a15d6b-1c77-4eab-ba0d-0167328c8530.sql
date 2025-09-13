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

-- Insert the hardcoded deals into the database with all required fields
-- Deal 1: ZenScreen AI Platform Investment
INSERT INTO public.deals (
  deal_id, deal_name, company_name, deal_value_formatted, announcement_date, 
  sector, sub_sector, description, website, city, state_province, country, region,
  deal_status, stage_label, transaction_type, region_id, country_id, sector_id, sub_sector_id
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
  'Growth Equity' as transaction_type,
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
  deal_status, stage_label, transaction_type, region_id, country_id, sector_id, sub_sector_id
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
  'Growth Equity' as transaction_type,
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