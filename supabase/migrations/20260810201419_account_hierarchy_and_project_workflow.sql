alter type public.user_role add value if not exists 'vendor';

do $$ begin
  create type public.account_type as enum ('client', 'business');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.business_account_type as enum ('professional', 'vendor');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.business_role as enum ('interior_designer', 'contractor', 'retailer');
exception when duplicate_object then null; end $$;

alter table public.profiles
  add column if not exists account_type public.account_type,
  add column if not exists business_account_type public.business_account_type,
  add column if not exists business_role public.business_role;

update public.profiles
set
  account_type = case when primary_role = 'customer' then 'client'::public.account_type else 'business'::public.account_type end,
  business_account_type = case when primary_role = 'customer' then null else 'professional'::public.business_account_type end,
  business_role = case
    when primary_role = 'designer' then 'interior_designer'::public.business_role
    when primary_role = 'contractor' then 'contractor'::public.business_role
    else null
  end
where account_type is null;

alter table public.profiles alter column account_type set not null;
alter table public.profiles alter column account_type set default 'client';

alter table public.profiles drop constraint if exists profiles_account_hierarchy_check;
alter table public.profiles add constraint profiles_account_hierarchy_check check (
  (account_type = 'client' and primary_role = 'customer' and business_account_type is null and business_role is null)
  or
  (account_type = 'business' and business_account_type = 'professional' and business_role in ('interior_designer', 'contractor') and primary_role in ('designer', 'contractor'))
  or
  (account_type = 'business' and business_account_type = 'vendor' and business_role = 'retailer' and primary_role::text = 'vendor')
);

create table if not exists public.business_accounts (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null unique references public.profiles(id) on delete cascade,
  account_type public.business_account_type not null,
  phase_one_role public.business_role not null,
  display_name text,
  legal_name text,
  registration_number text,
  tax_identifier text,
  verification_status text not null default 'unverified',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint business_accounts_phase_one_role_check check (
    (account_type = 'professional' and phase_one_role in ('interior_designer', 'contractor'))
    or (account_type = 'vendor' and phase_one_role = 'retailer')
  )
);

create table if not exists public.vendor_products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  category text not null,
  price numeric(12,2) check (price is null or price >= 0),
  currency text not null default 'INR',
  stock_status text not null default 'in_stock',
  specifications jsonb not null default '{}',
  image_paths text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (vendor_id, slug)
);

create table if not exists public.vendor_enquiries (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.profiles(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  subject text not null,
  requirements text not null,
  status text not null default 'new',
  quoted_amount numeric(12,2) check (quoted_amount is null or quoted_amount >= 0),
  quote_valid_until date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendor_orders (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid references public.vendor_enquiries(id) on delete set null,
  vendor_id uuid not null references public.profiles(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'confirmed',
  subtotal numeric(12,2) not null check (subtotal >= 0),
  tax_amount numeric(12,2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(12,2) generated always as (subtotal + tax_amount) stored,
  delivery_address jsonb not null default '{}',
  expected_delivery_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_account_hierarchy_idx on public.profiles(account_type, business_account_type, business_role);
create index if not exists vendor_products_vendor_active_idx on public.vendor_products(vendor_id, is_active, created_at desc);
create index if not exists vendor_products_category_idx on public.vendor_products(category) where is_active = true;
create index if not exists vendor_enquiries_vendor_status_idx on public.vendor_enquiries(vendor_id, status, created_at desc);
create index if not exists vendor_enquiries_customer_idx on public.vendor_enquiries(customer_id, created_at desc);
create index if not exists vendor_orders_vendor_status_idx on public.vendor_orders(vendor_id, status, created_at desc);
create index if not exists vendor_orders_customer_idx on public.vendor_orders(customer_id, created_at desc);

alter table public.business_accounts enable row level security;
alter table public.vendor_products enable row level security;
alter table public.vendor_enquiries enable row level security;
alter table public.vendor_orders enable row level security;

create policy "business account owner read" on public.business_accounts for select to authenticated using ((select auth.uid()) = owner_profile_id);
create policy "business account owner update" on public.business_accounts for update to authenticated using ((select auth.uid()) = owner_profile_id) with check ((select auth.uid()) = owner_profile_id);
create policy "vendor products public read" on public.vendor_products for select to anon, authenticated using (is_active = true);
create policy "vendor products owner insert" on public.vendor_products for insert to authenticated with check ((select auth.uid()) = vendor_id);
create policy "vendor products owner update" on public.vendor_products for update to authenticated using ((select auth.uid()) = vendor_id) with check ((select auth.uid()) = vendor_id);
create policy "vendor products owner delete" on public.vendor_products for delete to authenticated using ((select auth.uid()) = vendor_id);
create policy "vendor enquiries participants read" on public.vendor_enquiries for select to authenticated using ((select auth.uid()) in (vendor_id, customer_id));
create policy "vendor enquiries customer insert" on public.vendor_enquiries for insert to authenticated with check ((select auth.uid()) = customer_id);
create policy "vendor enquiries vendor update" on public.vendor_enquiries for update to authenticated using ((select auth.uid()) = vendor_id) with check ((select auth.uid()) = vendor_id);
create policy "vendor orders participants read" on public.vendor_orders for select to authenticated using ((select auth.uid()) in (vendor_id, customer_id));
create policy "vendor orders vendor insert" on public.vendor_orders for insert to authenticated with check ((select auth.uid()) = vendor_id);
create policy "vendor orders vendor update" on public.vendor_orders for update to authenticated using ((select auth.uid()) = vendor_id) with check ((select auth.uid()) = vendor_id);

create schema if not exists private;
revoke all on schema private from public;

create or replace function private.handle_new_sajivo_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  selected_role public.user_role;
  selected_account_type public.account_type;
  selected_business_type public.business_account_type;
  selected_business_role public.business_role;
begin
  selected_role := coalesce(new.raw_user_meta_data ->> 'primary_role', 'customer')::public.user_role;
  selected_account_type := coalesce(new.raw_user_meta_data ->> 'account_type', 'client')::public.account_type;
  selected_business_type := nullif(new.raw_user_meta_data ->> 'business_account_type', '')::public.business_account_type;
  selected_business_role := nullif(new.raw_user_meta_data ->> 'business_role', '')::public.business_role;

  insert into public.profiles (id, full_name, email, primary_role, roles, account_type, business_account_type, business_role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)), new.email, selected_role, array[selected_role], selected_account_type, selected_business_type, selected_business_role)
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    primary_role = excluded.primary_role,
    roles = excluded.roles,
    account_type = excluded.account_type,
    business_account_type = excluded.business_account_type,
    business_role = excluded.business_role,
    updated_at = now();

  if selected_account_type = 'business' then
    insert into public.business_accounts (owner_profile_id, account_type, phase_one_role, display_name)
    values (new.id, selected_business_type, selected_business_role, new.raw_user_meta_data ->> 'full_name')
    on conflict (owner_profile_id) do update set
      account_type = excluded.account_type,
      phase_one_role = excluded.phase_one_role,
      display_name = excluded.display_name,
      updated_at = now();
  end if;
  return new;
end;
$$;

revoke all on function private.handle_new_sajivo_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created_sajivo on auth.users;
create trigger on_auth_user_created_sajivo after insert on auth.users for each row execute function private.handle_new_sajivo_user();

grant usage on schema public to anon, authenticated;
grant select on public.services, public.profiles, public.portfolio_projects, public.portfolio_media, public.reviews, public.vendor_products to anon, authenticated;
grant update on public.profiles to authenticated;
grant select, insert, update, delete on public.projects, public.project_files, public.proposals, public.workspace_messages, public.project_activity, public.notifications, public.business_accounts, public.vendor_enquiries, public.vendor_orders to authenticated;
grant insert, update, delete on public.portfolio_projects, public.portfolio_media, public.professional_verifications, public.verification_documents, public.reviews to authenticated;
grant insert, update, delete on public.vendor_products to authenticated;
