BEGIN;

-- Enums for investors and roles
CREATE TYPE public.investor_type AS ENUM ('vc','pe','strategic','sovereign','family_office','angel');
CREATE TYPE public.deal_investor_role AS ENUM ('lead','co_lead','participant','seller','lender');

-- Industries (for deals taxonomy)
CREATE TABLE public.deals_industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_industries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_industries" ON public.deals_industries FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_industries" ON public.deals_industries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_industries" ON public.deals_industries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_industries" ON public.deals_industries FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_deals_industries_updated_at
BEFORE UPDATE ON public.deals_industries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Sub-industries
CREATE TABLE public.deals_sub_industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id uuid NOT NULL REFERENCES public.deals_industries(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_sub_industries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_sub_industries" ON public.deals_sub_industries FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_sub_industries" ON public.deals_sub_industries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_sub_industries" ON public.deals_sub_industries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_sub_industries" ON public.deals_sub_industries FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_deals_sub_industries_updated_at
BEFORE UPDATE ON public.deals_sub_industries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Companies (portfolio companies / targets)
CREATE TABLE public.deals_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_company_id text UNIQUE,
  name text NOT NULL,
  description text,
  website text,
  headquarters_city text,
  state_province text,
  country text,
  region text,
  total_known_funding_usd numeric(20,2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_companies" ON public.deals_companies FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_companies" ON public.deals_companies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_companies" ON public.deals_companies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_companies" ON public.deals_companies FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_deals_companies_updated_at
BEFORE UPDATE ON public.deals_companies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Company ↔ industries mapping
CREATE TABLE public.deals_company_industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.deals_companies(id) ON DELETE CASCADE,
  industry_id uuid NOT NULL REFERENCES public.deals_industries(id) ON DELETE RESTRICT,
  sub_industry_id uuid REFERENCES public.deals_sub_industries(id) ON DELETE SET NULL,
  classification text,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_company_industries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_company_industries" ON public.deals_company_industries FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_company_industries" ON public.deals_company_industries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_company_industries" ON public.deals_company_industries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_company_industries" ON public.deals_company_industries FOR DELETE TO authenticated USING (true);
CREATE INDEX deals_company_industries_company_idx ON public.deals_company_industries(company_id);
CREATE INDEX deals_company_industries_industry_idx ON public.deals_company_industries(industry_id);

-- Investors (firms)
CREATE TABLE public.deals_investors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  type public.investor_type,
  region text,
  country text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_investors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_investors" ON public.deals_investors FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_investors" ON public.deals_investors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_investors" ON public.deals_investors FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_investors" ON public.deals_investors FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_deals_investors_updated_at
BEFORE UPDATE ON public.deals_investors
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Funds (specific vehicles)
CREATE TABLE public.deals_funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid NOT NULL REFERENCES public.deals_investors(id) ON DELETE CASCADE,
  name text NOT NULL,
  vintage_year integer,
  fund_size_usd numeric(20,2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_funds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_funds" ON public.deals_funds FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_funds" ON public.deals_funds FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_funds" ON public.deals_funds FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_funds" ON public.deals_funds FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_deals_funds_updated_at
BEFORE UPDATE ON public.deals_funds
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX deals_funds_investor_idx ON public.deals_funds(investor_id);

-- People (partners/board reps)
CREATE TABLE public.deals_people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid REFERENCES public.deals_investors(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  role text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_people ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_people" ON public.deals_people FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_people" ON public.deals_people FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_people" ON public.deals_people FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_people" ON public.deals_people FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_deals_people_updated_at
BEFORE UPDATE ON public.deals_people
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Deal ↔ Investors (roles and amounts)
CREATE TABLE public.deals_deal_investors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  investor_id uuid NOT NULL REFERENCES public.deals_investors(id) ON DELETE CASCADE,
  fund_id uuid REFERENCES public.deals_funds(id) ON DELETE SET NULL,
  role public.deal_investor_role NOT NULL DEFAULT 'participant',
  committed_amount numeric(20,2),
  committed_currency char(3),
  committed_amount_usd numeric(20,2),
  lead_partner_person_id uuid REFERENCES public.deals_people(id) ON DELETE SET NULL,
  board_representative_person_id uuid REFERENCES public.deals_people(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.deals_deal_investors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read deals_deal_investors" ON public.deals_deal_investors FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert deals_deal_investors" ON public.deals_deal_investors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update deals_deal_investors" ON public.deals_deal_investors FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete deals_deal_investors" ON public.deals_deal_investors FOR DELETE TO authenticated USING (true);
CREATE INDEX deals_deal_investors_deal_idx ON public.deals_deal_investors(deal_id);
CREATE INDEX deals_deal_investors_investor_idx ON public.deals_deal_investors(investor_id);
CREATE INDEX deals_deal_investors_fund_idx ON public.deals_deal_investors(fund_id);

-- Augment existing deals table without breaking changes
ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS company_id uuid REFERENCES public.deals_companies(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS deal_currency char(3),
  ADD COLUMN IF NOT EXISTS deal_value_usd numeric(20,2),
  ADD COLUMN IF NOT EXISTS fx_rate numeric(18,6),
  ADD COLUMN IF NOT EXISTS enterprise_value numeric(20,2),
  ADD COLUMN IF NOT EXISTS revenue_ltm numeric(20,2),
  ADD COLUMN IF NOT EXISTS ebitda_ltm numeric(20,2),
  ADD COLUMN IF NOT EXISTS ebitda_margin numeric(6,3),
  ADD COLUMN IF NOT EXISTS revenue_growth_yoy numeric(6,3),
  ADD COLUMN IF NOT EXISTS multiple_label text,
  ADD COLUMN IF NOT EXISTS stage_label text,
  ADD COLUMN IF NOT EXISTS investment_status_label text;
CREATE INDEX IF NOT EXISTS deals_company_id_idx ON public.deals(company_id);

COMMIT;