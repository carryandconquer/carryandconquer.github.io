-- First, drop foreign key constraints that depend on the deals table
ALTER TABLE public.deals_deal_investors DROP CONSTRAINT IF EXISTS deals_deal_investors_deal_id_fkey;

-- Create a new deals table with proper column ordering
CREATE TABLE public.deals_new (
  -- Core identifiers
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id text NOT NULL,
  deal_name text NOT NULL,
  
  -- Deal basics
  deal_status text NOT NULL DEFAULT 'Draft'::text,
  transaction_type text NOT NULL,
  deal_size_category text,
  stage_label text,
  investment_strategy text,
  investment_status_label text,
  multiple_label text,
  
  -- Financial data
  deal_value bigint,
  deal_value_usd numeric,
  deal_value_formatted text,
  enterprise_value numeric,
  deal_currency character(3),
  fx_rate numeric,
  
  -- PE Performance metrics
  entry_multiple numeric,
  exit_multiple numeric,
  irr_percentage numeric,
  cash_on_cash_multiple numeric,
  hold_period_months integer,
  
  -- Company information
  company_id uuid,
  company_name text,
  website text,
  description text,
  sector text,
  sub_sector text,
  
  -- Financial performance
  revenue_ltm numeric,
  ebitda_ltm numeric,
  ebitda_margin numeric,
  revenue_growth_yoy numeric,
  
  -- Dates
  announcement_date date,
  closing_date date,
  investment_date date,
  exit_date date,
  
  -- Location
  full_address text,
  city text,
  state_province text,
  country text,
  region text,
  postal_code text,
  
  -- Parties involved
  buyer text,
  seller text,
  investors jsonb DEFAULT '[]'::jsonb,
  specific_funds jsonb DEFAULT '[]'::jsonb,
  lead_partners jsonb DEFAULT '[]'::jsonb,
  board_representatives jsonb DEFAULT '[]'::jsonb,
  
  -- Deal details
  deal_highlights jsonb DEFAULT '[]'::jsonb,
  market_intelligence text,
  strategic_significance text,
  competitive_dynamics text,
  source text,
  
  -- Quality metrics
  confidence_score numeric,
  data_quality_score numeric,
  
  -- Status flags
  featured_deal boolean DEFAULT false,
  recent_deal boolean DEFAULT false,
  pipeline_deal boolean DEFAULT false,
  trending_deal boolean DEFAULT false,
  published boolean DEFAULT true,
  
  -- Media
  image_url text,
  
  -- Timestamps
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_updated timestamp with time zone DEFAULT now()
);

-- Copy data from the old table to the new table
INSERT INTO public.deals_new (
  id, deal_id, deal_name, deal_status, transaction_type, deal_size_category, stage_label, 
  investment_strategy, investment_status_label, multiple_label, deal_value, deal_value_usd, 
  deal_value_formatted, enterprise_value, deal_currency, fx_rate, entry_multiple, exit_multiple, 
  irr_percentage, cash_on_cash_multiple, hold_period_months, company_id, company_name, website, 
  description, sector, sub_sector, revenue_ltm, ebitda_ltm, ebitda_margin, revenue_growth_yoy, 
  announcement_date, closing_date, investment_date, exit_date, full_address, city, state_province, 
  country, region, postal_code, buyer, seller, investors, specific_funds, lead_partners, 
  board_representatives, deal_highlights, market_intelligence, strategic_significance, 
  competitive_dynamics, source, confidence_score, data_quality_score, featured_deal, recent_deal, 
  pipeline_deal, trending_deal, published, image_url, created_at, updated_at, last_updated
)
SELECT 
  id, deal_id, deal_name, deal_status, transaction_type, deal_size_category, stage_label, 
  investment_strategy, investment_status_label, multiple_label, deal_value, deal_value_usd, 
  deal_value_formatted, enterprise_value, deal_currency, fx_rate, entry_multiple, exit_multiple, 
  irr_percentage, cash_on_cash_multiple, hold_period_months, company_id, company_name, website, 
  description, sector, sub_sector, revenue_ltm, ebitda_ltm, ebitda_margin, revenue_growth_yoy, 
  announcement_date, closing_date, investment_date, exit_date, full_address, city, state_province, 
  country, region, postal_code, buyer, seller, investors, specific_funds, lead_partners, 
  board_representatives, deal_highlights, market_intelligence, strategic_significance, 
  competitive_dynamics, source, confidence_score, data_quality_score, featured_deal, recent_deal, 
  pipeline_deal, trending_deal, published, image_url, created_at, updated_at, last_updated
FROM public.deals;

-- Drop the old table
DROP TABLE public.deals;

-- Rename the new table to the original name
ALTER TABLE public.deals_new RENAME TO deals;

-- Recreate the RLS policy
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can manage deals" 
ON public.deals 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Recreate indexes for performance
CREATE INDEX idx_deals_sector ON public.deals(sector);
CREATE INDEX idx_deals_sub_sector ON public.deals(sub_sector);
CREATE INDEX idx_deals_stage_label ON public.deals(stage_label);
CREATE INDEX idx_deals_investment_strategy ON public.deals(investment_strategy);
CREATE INDEX idx_deals_investment_date ON public.deals(investment_date);
CREATE INDEX idx_deals_exit_date ON public.deals(exit_date);

-- Add update trigger
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Recreate the foreign key constraint
ALTER TABLE public.deals_deal_investors 
ADD CONSTRAINT deals_deal_investors_deal_id_fkey 
FOREIGN KEY (deal_id) REFERENCES public.deals(id);