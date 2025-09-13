-- Remove duplicate columns that were added in the previous migration
-- since existing columns already serve the same purpose

-- Remove 'stage' column since 'stage_label' already exists and has data
ALTER TABLE public.deals DROP COLUMN IF EXISTS stage;

-- Remove 'company_description' column since 'description' already exists and has data  
ALTER TABLE public.deals DROP COLUMN IF EXISTS company_description;

-- Drop the index that was created for the duplicate stage column
DROP INDEX IF EXISTS idx_deals_stage;