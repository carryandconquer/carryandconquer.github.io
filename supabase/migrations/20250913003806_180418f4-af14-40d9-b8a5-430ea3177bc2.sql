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