-- Enable required extensions
create extension if not exists pgcrypto;

-- Timestamp trigger function (shared)
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 1) Core lookup tables for Snapshot
create table if not exists public.snapshot_geographic_regions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_snapshot_geographic_regions_updated
before update on public.snapshot_geographic_regions
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  region_id uuid not null references public.snapshot_geographic_regions(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_snapshot_countries_region on public.snapshot_countries(region_id);
create trigger trg_snapshot_countries_updated
before update on public.snapshot_countries
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  country_id uuid not null references public.snapshot_countries(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_snapshot_cities_country on public.snapshot_cities(country_id);
create trigger trg_snapshot_cities_updated
before update on public.snapshot_cities
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_sectors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_snapshot_sectors_updated
before update on public.snapshot_sectors
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_sub_sectors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sector_id uuid not null references public.snapshot_sectors(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_snapshot_sub_sectors_sector on public.snapshot_sub_sectors(sector_id);
create trigger trg_snapshot_sub_sectors_updated
before update on public.snapshot_sub_sectors
for each row execute function public.update_updated_at_column();

-- 2) Content tables
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  description text,
  color text default 'primary',
  created_at timestamptz not null default now()
);
create unique index if not exists idx_categories_slug on public.categories(slug);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  content text,
  category text not null,
  image_url text,
  read_time int,
  metric_value text,
  slug text,
  author_id uuid,
  published boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  featured boolean default false,
  featured_order int,
  excerpt text,
  author_name text,
  view_count int default 0,
  published_date date
);
create index if not exists idx_articles_slug on public.articles(slug);
create index if not exists idx_articles_category on public.articles(category);
create trigger trg_articles_updated
before update on public.articles
for each row execute function public.update_updated_at_column();

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  deal_id text not null,
  deal_name text not null,
  deal_status text not null default 'Draft',
  transaction_type text not null,
  announcement_date date,
  closing_date date,
  deal_value bigint,
  deal_value_formatted text,
  deal_size_category text,
  price_per_sf numeric,
  cap_rate numeric,
  investment_strategy text,
  property_name text,
  property_type text,
  property_subtype text,
  square_footage int,
  year_built int,
  occupancy_rate numeric,
  image_url text,
  full_address text,
  street_address text,
  city text,
  state_province text,
  country text,
  region text,
  postal_code text,
  latitude numeric,
  longitude numeric,
  buyer text,
  buyer_type text,
  seller text,
  seller_type text,
  broker text,
  lender text,
  deal_highlights jsonb default '[]'::jsonb,
  market_intelligence text,
  strategic_significance text,
  competitive_dynamics text,
  source text,
  confidence_score numeric,
  data_quality_score numeric,
  featured_deal boolean default false,
  recent_deal boolean default false,
  pipeline_deal boolean default false,
  trending_deal boolean default false,
  published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_updated timestamptz default now(),
  description text
);
create trigger trg_deals_updated
before update on public.deals
for each row execute function public.update_updated_at_column();

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_type text not null,
  start_date timestamptz not null,
  end_date timestamptz,
  location text,
  venue text,
  image_url text,
  registration_url text,
  price numeric,
  capacity int,
  organizer text,
  featured boolean default false,
  published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_events_updated
before update on public.events
for each row execute function public.update_updated_at_column();

-- 3) Snapshot data tables
create table if not exists public.snapshot_market_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_name text not null,
  metric_category text not null,
  metric_family text not null,
  current_value text not null,
  change_percentage numeric,
  change_direction text,
  sparkline_data jsonb,
  region_id uuid references public.snapshot_geographic_regions(id) on delete set null,
  country_id uuid references public.snapshot_countries(id) on delete set null,
  city_id uuid references public.snapshot_cities(id) on delete set null,
  sector_id uuid references public.snapshot_sectors(id) on delete set null,
  sub_sector_id uuid references public.snapshot_sub_sectors(id) on delete set null,
  data_date date not null default CURRENT_DATE,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_market_metrics_lookup on public.snapshot_market_metrics(region_id, country_id, city_id, sector_id, sub_sector_id);
create trigger trg_snapshot_market_metrics_updated
before update on public.snapshot_market_metrics
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_market_comparisons (
  id uuid primary key default gen_random_uuid(),
  comparison_type text not null,
  title text not null,
  description text,
  comparison_data jsonb not null,
  region_id uuid references public.snapshot_geographic_regions(id) on delete set null,
  country_id uuid references public.snapshot_countries(id) on delete set null,
  sector_id uuid references public.snapshot_sectors(id) on delete set null,
  published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_snapshot_market_comparisons_updated
before update on public.snapshot_market_comparisons
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_sector_intelligence (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  metrics jsonb,
  sector_id uuid not null references public.snapshot_sectors(id) on delete restrict,
  sub_sector_id uuid references public.snapshot_sub_sectors(id) on delete set null,
  region_id uuid references public.snapshot_geographic_regions(id) on delete set null,
  country_id uuid references public.snapshot_countries(id) on delete set null,
  published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_snapshot_sector_intelligence_updated
before update on public.snapshot_sector_intelligence
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_trending_people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  position text not null,
  image_url text,
  change_percentage numeric,
  description text,
  sector_id uuid references public.snapshot_sectors(id) on delete set null,
  region_id uuid references public.snapshot_geographic_regions(id) on delete set null,
  country_id uuid references public.snapshot_countries(id) on delete set null,
  published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_snapshot_trending_people_updated
before update on public.snapshot_trending_people
for each row execute function public.update_updated_at_column();

create table if not exists public.snapshot_trending_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  project_value text not null,
  project_status text not null,
  image_url text,
  change_percentage numeric,
  description text,
  sector_id uuid references public.snapshot_sectors(id) on delete set null,
  sub_sector_id uuid references public.snapshot_sub_sectors(id) on delete set null,
  region_id uuid references public.snapshot_geographic_regions(id) on delete set null,
  country_id uuid references public.snapshot_countries(id) on delete set null,
  city_id uuid references public.snapshot_cities(id) on delete set null,
  published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_snapshot_trending_projects_updated
before update on public.snapshot_trending_projects
for each row execute function public.update_updated_at_column();

-- Enable Row Level Security
alter table public.snapshot_geographic_regions enable row level security;
alter table public.snapshot_countries enable row level security;
alter table public.snapshot_cities enable row level security;
alter table public.snapshot_sectors enable row level security;
alter table public.snapshot_sub_sectors enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.deals enable row level security;
alter table public.events enable row level security;
alter table public.snapshot_market_metrics enable row level security;
alter table public.snapshot_market_comparisons enable row level security;
alter table public.snapshot_sector_intelligence enable row level security;
alter table public.snapshot_trending_people enable row level security;
alter table public.snapshot_trending_projects enable row level security;

-- RLS Policies (avoid IF NOT EXISTS for policies)
-- Lookup tables: public can read, authenticated can write
create policy "Public can read regions" on public.snapshot_geographic_regions for select using (true);
create policy "Auth can write regions" on public.snapshot_geographic_regions for all to authenticated using (true) with check (true);

create policy "Public can read countries" on public.snapshot_countries for select using (true);
create policy "Auth can write countries" on public.snapshot_countries for all to authenticated using (true) with check (true);

create policy "Public can read cities" on public.snapshot_cities for select using (true);
create policy "Auth can write cities" on public.snapshot_cities for all to authenticated using (true) with check (true);

create policy "Public can read sectors" on public.snapshot_sectors for select using (true);
create policy "Auth can write sectors" on public.snapshot_sectors for all to authenticated using (true) with check (true);

create policy "Public can read sub sectors" on public.snapshot_sub_sectors for select using (true);
create policy "Auth can write sub sectors" on public.snapshot_sub_sectors for all to authenticated using (true) with check (true);

create policy "Public can read categories" on public.categories for select using (true);
create policy "Auth can write categories" on public.categories for all to authenticated using (true) with check (true);

-- Content tables
create policy "Public can read published articles" on public.articles for select using (published = true);
create policy "Auth can write articles" on public.articles for all to authenticated using (true) with check (true);

create policy "Public can read published deals" on public.deals for select using (published = true);
create policy "Auth can write deals" on public.deals for all to authenticated using (true) with check (true);

create policy "Public can read published events" on public.events for select using (published = true);
create policy "Auth can write events" on public.events for all to authenticated using (true) with check (true);

-- Snapshot data tables
create policy "Public can read market metrics" on public.snapshot_market_metrics for select using (true);
create policy "Auth can write market metrics" on public.snapshot_market_metrics for all to authenticated using (true) with check (true);

create policy "Public can read published market comparisons" on public.snapshot_market_comparisons for select using (published = true);
create policy "Auth can write market comparisons" on public.snapshot_market_comparisons for all to authenticated using (true) with check (true);

create policy "Public can read published sector intelligence" on public.snapshot_sector_intelligence for select using (published = true);
create policy "Auth can write sector intelligence" on public.snapshot_sector_intelligence for all to authenticated using (true) with check (true);

create policy "Public can read published trending people" on public.snapshot_trending_people for select using (published = true);
create policy "Auth can write trending people" on public.snapshot_trending_people for all to authenticated using (true) with check (true);

create policy "Public can read published trending projects" on public.snapshot_trending_projects for select using (published = true);
create policy "Auth can write trending projects" on public.snapshot_trending_projects for all to authenticated using (true) with check (true);