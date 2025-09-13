-- Update deals with proper GICS sector and sub-sector classifications based on business analysis

-- Consumer Discretionary > Automobiles & Components (Automotive deals)
UPDATE public.deals SET 
  sector = 'Consumer Discretionary',
  sub_sector = 'Automobiles & Components'
WHERE deal_id IN (
  'bestop',           -- Automotive soft tops
  'big-brand-tire',   -- Tire services
  'fenix-parts',      -- Automotive parts
  'nivel-parts-mfg',  -- Parts manufacturing
  'race-winning-brands', -- Automotive aftermarket
  'realtruck'         -- Truck accessories
);

-- Consumer Discretionary > Consumer Durables & Apparel (Fashion/Apparel)
UPDATE public.deals SET 
  sector = 'Consumer Discretionary',
  sub_sector = 'Consumer Durables & Apparel'
WHERE deal_id IN (
  'rylee-cru',        -- Children's apparel brand
  'brians-cabinets'   -- Custom cabinetry/home furnishings
);

-- Consumer Discretionary > Hotels, Restaurants & Leisure (Entertainment)
UPDATE public.deals SET 
  sector = 'Consumer Discretionary',
  sub_sector = 'Hotels, Restaurants & Leisure'
WHERE deal_id IN (
  'chance-rides'      -- Amusement park rides
);

-- Industrials > Commercial & Professional Services (Service businesses)
UPDATE public.deals SET 
  sector = 'Industrials',
  sub_sector = 'Commercial & Professional Services'
WHERE deal_id IN (
  'ace-fence-dallas', -- Fencing services
  'el-car-wash',      -- Car wash services
  'go-car-wash'       -- Car wash services
);

-- Information Technology > Software & Services (Tech companies)
UPDATE public.deals SET 
  sector = 'Information Technology',
  sub_sector = 'Software & Services'
WHERE deal_id IN (
  'clarience-tech',   -- Technology company
  'repairify',        -- Automotive software
  'omniview-deal-2024' -- Sports technology
);

-- Health Care > Pharmaceuticals, Biotechnology & Life Sciences (Pharma)
UPDATE public.deals SET 
  sector = 'Health Care',
  sub_sector = 'Pharmaceuticals, Biotechnology & Life Sciences'
WHERE deal_id IN (
  'coniferpoint-deal-2024' -- Pharmaceuticals
);

-- Consumer Staples > Food Products (Food/Agriculture - Australian deals)
UPDATE public.deals SET 
  sector = 'Consumer Staples',
  sub_sector = 'Food Products'
WHERE deal_id IN (
  'CGH-2024-002',     -- Costa Group Tech Partnership (agriculture tech)
  'FPG-2024-001',     -- Fresh Produce Group
  'HMO-2024-005',     -- Harvest Moon (likely agriculture)
  'PFA-2024-003'      -- Perfection Fresh (produce)
);