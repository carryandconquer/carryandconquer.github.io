-- Create table for header carousel metrics
create table if not exists public.header_carousel_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  is_positive boolean not null default true,
  change_percentage numeric,
  order_index integer not null default 0,
  published boolean not null default true,
  metric_key text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.header_carousel_metrics enable row level security;

-- Policies: public can read published rows
create policy if not exists "Public can read published header carousel metrics"
  on public.header_carousel_metrics
  for select
  using (published = true);

-- Authenticated users can read all
create policy if not exists "Authenticated can read all header carousel metrics"
  on public.header_carousel_metrics
  for select
  to authenticated
  using (true);

-- Authenticated can insert
create policy if not exists "Authenticated can insert header carousel metrics"
  on public.header_carousel_metrics
  for insert
  to authenticated
  with check (true);

-- Authenticated can update
create policy if not exists "Authenticated can update header carousel metrics"
  on public.header_carousel_metrics
  for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated can delete
create policy if not exists "Authenticated can delete header carousel metrics"
  on public.header_carousel_metrics
  for delete
  to authenticated
  using (true);

-- Updated at trigger
create trigger if not exists update_header_carousel_metrics_updated_at
before update on public.header_carousel_metrics
for each row execute function public.update_updated_at_column();

-- Helpful index for ordering and filtering
create index if not exists idx_header_carousel_metrics_published_order
  on public.header_carousel_metrics (published, order_index);
