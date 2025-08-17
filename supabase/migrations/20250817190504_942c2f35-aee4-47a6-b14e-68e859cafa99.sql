
-- Enable RLS and replace existing policies with a permissive "Public can manage …" policy
-- WARNING: This makes every table world-writable (INSERT/UPDATE/DELETE/SELECT) to anyone, including anonymous clients.

-- ARTICLES
alter table public.articles enable row level security;
drop policy if exists "Auth can write articles" on public.articles;
drop policy if exists "Public can read published articles" on public.articles;
drop policy if exists "Admins can manage articles" on public.articles;
create policy "Public can manage articles"
  on public.articles
  for all
  to public
  using (true)
  with check (true);

-- CATEGORIES
alter table public.categories enable row level security;
drop policy if exists "Auth can write categories" on public.categories;
drop policy if exists "Public can read categories" on public.categories;
drop policy if exists "Admins can manage categories" on public.categories;
create policy "Public can manage categories"
  on public.categories
  for all
  to public
  using (true)
  with check (true);

-- DEALS
alter table public.deals enable row level security;
drop policy if exists "Auth can write deals" on public.deals;
drop policy if exists "Public can read published deals" on public.deals;
drop policy if exists "Admins can manage deals" on public.deals;
create policy "Public can manage deals"
  on public.deals
  for all
  to public
  using (true)
  with check (true);

-- EVENTS
alter table public.events enable row level security;
drop policy if exists "Auth can write events" on public.events;
drop policy if exists "Public can read published events" on public.events;
drop policy if exists "Admins can manage events" on public.events;
create policy "Public can manage events"
  on public.events
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_CITIES
alter table public.snapshot_cities enable row level security;
drop policy if exists "Auth can write cities" on public.snapshot_cities;
drop policy if exists "Public can read cities" on public.snapshot_cities;
drop policy if exists "Admins can manage cities" on public.snapshot_cities;
create policy "Public can manage cities"
  on public.snapshot_cities
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_COUNTRIES
alter table public.snapshot_countries enable row level security;
drop policy if exists "Auth can write countries" on public.snapshot_countries;
drop policy if exists "Public can read countries" on public.snapshot_countries;
drop policy if exists "Admins can manage countries" on public.snapshot_countries;
create policy "Public can manage countries"
  on public.snapshot_countries
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_GEOGRAPHIC_REGIONS
alter table public.snapshot_geographic_regions enable row level security;
drop policy if exists "Auth can write regions" on public.snapshot_geographic_regions;
drop policy if exists "Public can read regions" on public.snapshot_geographic_regions;
drop policy if exists "Admins can manage regions" on public.snapshot_geographic_regions;
create policy "Public can manage regions"
  on public.snapshot_geographic_regions
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_MARKET_COMPARISONS
alter table public.snapshot_market_comparisons enable row level security;
drop policy if exists "Auth can write market comparisons" on public.snapshot_market_comparisons;
drop policy if exists "Public can read published market comparisons" on public.snapshot_market_comparisons;
drop policy if exists "Admins can manage market comparisons" on public.snapshot_market_comparisons;
create policy "Public can manage market comparisons"
  on public.snapshot_market_comparisons
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_MARKET_METRICS
alter table public.snapshot_market_metrics enable row level security;
drop policy if exists "Auth can write market metrics" on public.snapshot_market_metrics;
drop policy if exists "Public can read market metrics" on public.snapshot_market_metrics;
drop policy if exists "Admins can manage market metrics" on public.snapshot_market_metrics;
create policy "Public can manage market metrics"
  on public.snapshot_market_metrics
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_SECTOR_INTELLIGENCE
alter table public.snapshot_sector_intelligence enable row level security;
drop policy if exists "Auth can write sector intelligence" on public.snapshot_sector_intelligence;
drop policy if exists "Public can read published sector intelligence" on public.snapshot_sector_intelligence;
drop policy if exists "Admins can manage sector intelligence" on public.snapshot_sector_intelligence;
create policy "Public can manage sector intelligence"
  on public.snapshot_sector_intelligence
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_SECTORS
alter table public.snapshot_sectors enable row level security;
drop policy if exists "Auth can write sectors" on public.snapshot_sectors;
drop policy if exists "Public can read sectors" on public.snapshot_sectors;
drop policy if exists "Admins can manage sectors" on public.snapshot_sectors;
create policy "Public can manage sectors"
  on public.snapshot_sectors
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_SUB_SECTORS
alter table public.snapshot_sub_sectors enable row level security;
drop policy if exists "Auth can write sub sectors" on public.snapshot_sub_sectors;
drop policy if exists "Public can read sub sectors" on public.snapshot_sub_sectors;
drop policy if exists "Admins can manage sub sectors" on public.snapshot_sub_sectors;
create policy "Public can manage sub sectors"
  on public.snapshot_sub_sectors
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_TRENDING_PEOPLE
alter table public.snapshot_trending_people enable row level security;
drop policy if exists "Auth can write trending people" on public.snapshot_trending_people;
drop policy if exists "Public can read published trending people" on public.snapshot_trending_people;
drop policy if exists "Admins can manage trending people" on public.snapshot_trending_people;
create policy "Public can manage trending people"
  on public.snapshot_trending_people
  for all
  to public
  using (true)
  with check (true);

-- SNAPSHOT_TRENDING_PROJECTS
alter table public.snapshot_trending_projects enable row level security;
drop policy if exists "Auth can write trending projects" on public.snapshot_trending_projects;
drop policy if exists "Public can read published trending projects" on public.snapshot_trending_projects;
drop policy if exists "Admins can manage trending projects" on public.snapshot_trending_projects;
create policy "Public can manage trending projects"
  on public.snapshot_trending_projects
  for all
  to public
  using (true)
  with check (true);
