-- Ensure Consumer Staples taxonomy matches requested list
DO $$
DECLARE
  cs_id uuid;
  hpp_id uuid;
  old_household_id uuid;
  old_personal_id uuid;
  fbt_id uuid;
  beverages_id uuid;
  food_products_id uuid;
BEGIN
  -- Get Consumer Staples sector id
  SELECT id INTO cs_id FROM public.snapshot_sectors WHERE name = 'Consumer Staples' LIMIT 1;

  -- Create "Household & Personal Products" if missing
  SELECT id INTO hpp_id 
  FROM public.snapshot_sub_sectors 
  WHERE name = 'Household & Personal Products' AND sector_id = cs_id LIMIT 1;

  IF hpp_id IS NULL THEN
    INSERT INTO public.snapshot_sub_sectors (id, sector_id, name, slug)
    VALUES (gen_random_uuid(), cs_id, 'Household & Personal Products', 'household-personal-products')
    RETURNING id INTO hpp_id;
  END IF;

  -- Resolve IDs for old/other sub-sectors
  SELECT id INTO old_household_id FROM public.snapshot_sub_sectors WHERE name='Household Products' AND sector_id=cs_id LIMIT 1;
  SELECT id INTO old_personal_id FROM public.snapshot_sub_sectors WHERE name='Personal Products' AND sector_id=cs_id LIMIT 1;
  SELECT id INTO fbt_id FROM public.snapshot_sub_sectors WHERE name='Food, Beverage & Tobacco' AND sector_id=cs_id LIMIT 1;
  SELECT id INTO beverages_id FROM public.snapshot_sub_sectors WHERE name='Beverages' AND sector_id=cs_id LIMIT 1;
  SELECT id INTO food_products_id FROM public.snapshot_sub_sectors WHERE name='Food Products' AND sector_id=cs_id LIMIT 1;

  -- Reassign deals by current sub_sector_id
  IF old_household_id IS NOT NULL THEN
    UPDATE public.deals SET sub_sector_id = hpp_id, sector_id = cs_id WHERE sub_sector_id = old_household_id;
  END IF;
  IF old_personal_id IS NOT NULL THEN
    UPDATE public.deals SET sub_sector_id = hpp_id, sector_id = cs_id WHERE sub_sector_id = old_personal_id;
  END IF;

  IF beverages_id IS NOT NULL AND fbt_id IS NOT NULL THEN
    UPDATE public.deals SET sub_sector_id = fbt_id, sector_id = cs_id WHERE sub_sector_id = beverages_id;
  END IF;
  IF food_products_id IS NOT NULL AND fbt_id IS NOT NULL THEN
    UPDATE public.deals SET sub_sector_id = fbt_id, sector_id = cs_id WHERE sub_sector_id = food_products_id;
  END IF;

  -- Also fix deals that only have text labels
  UPDATE public.deals 
  SET sub_sector_id = hpp_id, sector_id = cs_id
  WHERE sub_sector_id IS NULL AND LOWER(sub_sector) IN ('household products','personal products');

  IF fbt_id IS NOT NULL THEN
    UPDATE public.deals 
    SET sub_sector_id = fbt_id, sector_id = cs_id
    WHERE sub_sector_id IS NULL AND LOWER(sub_sector) IN ('beverages','food products');
  END IF;

  -- Clean up deprecated sub-sectors (safe after reassignments)
  IF old_household_id IS NOT NULL THEN
    DELETE FROM public.snapshot_sub_sectors WHERE id = old_household_id;
  END IF;
  IF old_personal_id IS NOT NULL THEN
    DELETE FROM public.snapshot_sub_sectors WHERE id = old_personal_id;
  END IF;
  IF beverages_id IS NOT NULL THEN
    DELETE FROM public.snapshot_sub_sectors WHERE id = beverages_id;
  END IF;
  IF food_products_id IS NOT NULL THEN
    DELETE FROM public.snapshot_sub_sectors WHERE id = food_products_id;
  END IF;
END $$;

-- Enforce uniqueness to prevent future duplicates within a sector
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'snapshot_sub_sectors_unique_sector_name'
  ) THEN
    ALTER TABLE public.snapshot_sub_sectors
    ADD CONSTRAINT snapshot_sub_sectors_unique_sector_name UNIQUE (sector_id, name);
  END IF;
END $$;