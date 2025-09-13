-- Remove real estate specific columns from deals table
ALTER TABLE public.deals 
DROP COLUMN IF EXISTS property_name,
DROP COLUMN IF EXISTS property_type,
DROP COLUMN IF EXISTS property_subtype,
DROP COLUMN IF EXISTS square_footage,
DROP COLUMN IF EXISTS year_built,
DROP COLUMN IF EXISTS occupancy_rate,
DROP COLUMN IF EXISTS price_per_sf,
DROP COLUMN IF EXISTS cap_rate,
DROP COLUMN IF EXISTS latitude,
DROP COLUMN IF EXISTS longitude,
DROP COLUMN IF EXISTS buyer_type,
DROP COLUMN IF EXISTS seller_type,
DROP COLUMN IF EXISTS broker,
DROP COLUMN IF EXISTS lender;

-- Add PE-specific fields to deals table
ALTER TABLE public.deals 
ADD COLUMN IF NOT EXISTS sector TEXT,
ADD COLUMN IF NOT EXISTS sub_sector TEXT,
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS company_description TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS stage TEXT,
ADD COLUMN IF NOT EXISTS investors JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS specific_funds JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS lead_partners JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS board_representatives JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS entry_multiple NUMERIC,
ADD COLUMN IF NOT EXISTS exit_multiple NUMERIC,
ADD COLUMN IF NOT EXISTS irr_percentage NUMERIC,
ADD COLUMN IF NOT EXISTS cash_on_cash_multiple NUMERIC,
ADD COLUMN IF NOT EXISTS hold_period_months INTEGER,
ADD COLUMN IF NOT EXISTS investment_date DATE,
ADD COLUMN IF NOT EXISTS exit_date DATE;

-- Make company_id required for PE deals (but allow existing nulls to remain for now)
-- ALTER TABLE public.deals ALTER COLUMN company_id SET NOT NULL;

-- Update existing transaction types to be more PE-focused
UPDATE public.deals 
SET transaction_type = CASE 
  WHEN transaction_type ILIKE '%acquisition%' THEN 'Buyout'
  WHEN transaction_type ILIKE '%investment%' THEN 'Growth Investment'
  WHEN transaction_type ILIKE '%sale%' THEN 'Exit'
  WHEN transaction_type ILIKE '%merger%' THEN 'Merger'
  ELSE 'Growth Investment'
END
WHERE transaction_type IS NOT NULL;

-- Update deal_size_category to use PE terminology
UPDATE public.deals 
SET deal_size_category = CASE 
  WHEN deal_value_usd < 10000000 THEN 'Small-cap'
  WHEN deal_value_usd < 100000000 THEN 'Mid-market'
  WHEN deal_value_usd < 1000000000 THEN 'Large-cap'
  ELSE 'Mega-deal'
END
WHERE deal_value_usd IS NOT NULL;

-- Add indexes for better query performance on new PE fields
CREATE INDEX IF NOT EXISTS idx_deals_sector ON public.deals(sector);
CREATE INDEX IF NOT EXISTS idx_deals_sub_sector ON public.deals(sub_sector);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON public.deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_investment_strategy ON public.deals(investment_strategy);
CREATE INDEX IF NOT EXISTS idx_deals_investment_date ON public.deals(investment_date);
CREATE INDEX IF NOT EXISTS idx_deals_exit_date ON public.deals(exit_date);