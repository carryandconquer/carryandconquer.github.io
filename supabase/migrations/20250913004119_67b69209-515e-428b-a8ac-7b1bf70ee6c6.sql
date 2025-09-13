-- Fix security warning: set search_path on function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Insert remaining deals
-- Deal 3: Conifer Point Pharmaceuticals Add-on Investment
INSERT INTO public.deals (
  deal_id, deal_name, company_name, deal_value_formatted, announcement_date, 
  sector, sub_sector, description, website, city, state_province, country, region,
  deal_status, stage_label, transaction_type, region_id, country_id, sector_id, sub_sector_id
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
  AND s.slug = 'health-care' 
  AND ss.slug = 'pharmaceuticals-biotechnology-life-sciences'
  AND NOT EXISTS (SELECT 1 FROM public.deals WHERE deal_id = '3');

-- Deal 4: OmniView Sports Seed Investment
INSERT INTO public.deals (
  deal_id, deal_name, company_name, deal_value_formatted, announcement_date, 
  sector, sub_sector, description, website, city, state_province, country, region,
  deal_status, stage_label, transaction_type, region_id, country_id, sector_id, sub_sector_id
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
  'Venture Capital' as transaction_type,
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