-- Backfill foreign key references on existing deals based on text fields

-- 1) Region
UPDATE public.deals d
SET region_id = r.id
FROM public.snapshot_geographic_regions r
WHERE d.region_id IS NULL
  AND d.region IS NOT NULL
  AND LOWER(r.name) = LOWER(d.region);

-- 2) Country (match by name and region when available)
UPDATE public.deals d
SET country_id = c.id
FROM public.snapshot_countries c
WHERE d.country_id IS NULL
  AND d.country IS NOT NULL
  AND LOWER(c.name) = LOWER(d.country)
  AND (
    d.region_id IS NULL
    OR c.region_id = d.region_id
  );

-- 3) Sector
UPDATE public.deals d
SET sector_id = s.id
FROM public.snapshot_sectors s
WHERE d.sector_id IS NULL
  AND d.sector IS NOT NULL
  AND LOWER(s.name) = LOWER(d.sector);

-- 4) Sub-sector (also set sector_id from sub-sector if sector_id is missing)
UPDATE public.deals d
SET sub_sector_id = ss.id,
    sector_id = COALESCE(d.sector_id, ss.sector_id)
FROM public.snapshot_sub_sectors ss
WHERE d.sub_sector_id IS NULL
  AND d.sub_sector IS NOT NULL
  AND LOWER(ss.name) = LOWER(d.sub_sector);

-- Create/replace function to compute and validate taxonomy on writes
CREATE OR REPLACE FUNCTION public.compute_and_validate_deal_taxonomy()
RETURNS TRIGGER AS $$
BEGIN
  -- Compute region_id from text if missing
  IF NEW.region_id IS NULL AND NEW.region IS NOT NULL THEN
    SELECT id INTO NEW.region_id
    FROM public.snapshot_geographic_regions
    WHERE LOWER(name) = LOWER(NEW.region)
    LIMIT 1;
  END IF;

  -- Compute country_id from text if missing (prefer same region)
  IF NEW.country_id IS NULL AND NEW.country IS NOT NULL THEN
    SELECT c.id INTO NEW.country_id
    FROM public.snapshot_countries c
    WHERE LOWER(c.name) = LOWER(NEW.country)
      AND (NEW.region_id IS NULL OR c.region_id = NEW.region_id)
    LIMIT 1;
  END IF;

  -- Compute sector_id from text if missing
  IF NEW.sector_id IS NULL AND NEW.sector IS NOT NULL THEN
    SELECT id INTO NEW.sector_id
    FROM public.snapshot_sectors
    WHERE LOWER(name) = LOWER(NEW.sector)
    LIMIT 1;
  END IF;

  -- Compute sub_sector_id from text if missing and align sector
  IF NEW.sub_sector_id IS NULL AND NEW.sub_sector IS NOT NULL THEN
    SELECT id, sector_id INTO NEW.sub_sector_id, NEW.sector_id
    FROM public.snapshot_sub_sectors
    WHERE LOWER(name) = LOWER(NEW.sub_sector)
    LIMIT 1;
  END IF;

  -- VALIDATION
  IF NEW.region_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.snapshot_geographic_regions WHERE id = NEW.region_id
  ) THEN
    RAISE EXCEPTION 'Invalid region_id: %', NEW.region_id;
  END IF;

  IF NEW.country_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.snapshot_countries c
    WHERE c.id = NEW.country_id
      AND (NEW.region_id IS NULL OR c.region_id = NEW.region_id)
  ) THEN
    RAISE EXCEPTION 'Invalid country_id or does not belong to region';
  END IF;

  IF NEW.sector_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.snapshot_sectors WHERE id = NEW.sector_id
  ) THEN
    RAISE EXCEPTION 'Invalid sector_id: %', NEW.sector_id;
  END IF;

  IF NEW.sub_sector_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.snapshot_sub_sectors ss
    WHERE ss.id = NEW.sub_sector_id
      AND (NEW.sector_id IS NULL OR ss.sector_id = NEW.sector_id)
  ) THEN
    RAISE EXCEPTION 'Invalid sub_sector_id or does not belong to sector';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Replace old trigger with the combined one to ensure ordering
DROP TRIGGER IF EXISTS validate_deal_taxonomy_trigger ON public.deals;
DROP TRIGGER IF EXISTS compute_and_validate_deal_taxonomy_trigger ON public.deals;
CREATE TRIGGER compute_and_validate_deal_taxonomy_trigger
  BEFORE INSERT OR UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.compute_and_validate_deal_taxonomy();