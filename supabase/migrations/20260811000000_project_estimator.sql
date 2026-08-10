create table if not exists public.project_estimates (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  inputs jsonb not null,
  minimum_estimate numeric(14,2) not null check (minimum_estimate >= 0),
  maximum_estimate numeric(14,2) not null check (maximum_estimate >= minimum_estimate),
  confidence text not null check (confidence in ('Low', 'Medium', 'High')),
  budget_status text not null check (budget_status in ('compatible', 'slight_gap', 'major_gap', 'unknown')),
  breakdown jsonb not null default '{}'::jsonb,
  rate_version text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.estimation_rate_versions (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  city_rates jsonb not null default '{}'::jsonb,
  quality_factors jsonb not null default '{}'::jsonb,
  material_factors jsonb not null default '{}'::jsonb,
  source text not null default 'Sajivo admin',
  effective_date date not null default current_date,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists project_estimates_customer_created_idx on public.project_estimates (customer_id, created_at desc);
create index if not exists project_estimates_project_idx on public.project_estimates (project_id);
alter table public.project_estimates enable row level security;
alter table public.estimation_rate_versions enable row level security;

drop policy if exists "Customers can read own estimates" on public.project_estimates;
create policy "Customers can read own estimates" on public.project_estimates for select to authenticated using ((select auth.uid()) = customer_id);
drop policy if exists "Customers can create own estimates" on public.project_estimates;
create policy "Customers can create own estimates" on public.project_estimates for insert to authenticated with check ((select auth.uid()) = customer_id);
drop policy if exists "Admins can read rate versions" on public.estimation_rate_versions;
create policy "Admins can read rate versions" on public.estimation_rate_versions for select to authenticated using (exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.primary_role = 'admin'));
drop policy if exists "Admins can create rate versions" on public.estimation_rate_versions;
create policy "Admins can create rate versions" on public.estimation_rate_versions for insert to authenticated with check (exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.primary_role = 'admin'));
grant select, insert on public.project_estimates to authenticated;
grant select, insert on public.estimation_rate_versions to authenticated;
