create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('customer', 'designer', 'contractor', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.project_status as enum ('draft', 'published', 'receiving_proposals', 'matching', 'professional_selected', 'discussion', 'in_progress', 'awaiting_customer_review', 'revision_required', 'completed', 'cancelled', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.proposal_status as enum ('submitted', 'under_review', 'shortlisted', 'accepted', 'rejected', 'withdrawn');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.verification_status as enum ('verification_pending', 'verified', 'rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.verification_type as enum ('identity', 'business', 'experience');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  primary_role public.user_role not null,
  roles public.user_role[] not null default '{}',
  account_status text not null default 'active',
  profile_photo_url text,
  city text,
  state text,
  bio text,
  business_name text,
  years_experience int,
  service_area text,
  service_areas text[] not null default '{}',
  services text[] not null default '{}',
  specializations text[] not null default '{}',
  starting_price numeric(12,2),
  project_size_range text,
  availability_status text,
  experience_level text,
  verification_status text not null default 'unverified',
  rating_avg numeric(3,2) not null default 0,
  reviews_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  slug text not null unique,
  role_scope public.user_role[] not null default '{}',
  description text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  description text,
  status public.project_status not null default 'draft',
  scope jsonb not null default '{}',
  services text[] not null default '{}',
  city text,
  state text,
  locality text,
  dimensions jsonb not null default '{}',
  budget_range text,
  custom_budget numeric(12,2),
  preferred_start_date date,
  expected_timeline text,
  preferences jsonb not null default '{}',
  selected_proposal_id uuid,
  selected_professional_id uuid references public.profiles(id),
  published_at timestamptz,
  completed_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id),
  storage_bucket text not null default 'project-files',
  storage_path text not null,
  file_name text not null,
  mime_type text,
  file_size bigint,
  visibility text not null default 'project_participants',
  created_at timestamptz not null default now()
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  customer_id uuid not null references public.profiles(id),
  professional_id uuid not null references public.profiles(id),
  professional_role public.user_role not null,
  status public.proposal_status not null default 'submitted',
  proposed_amount numeric(12,2),
  proposed_amount_min numeric(12,2),
  proposed_amount_max numeric(12,2),
  estimated_timeline text not null,
  message text not null,
  experience_summary text,
  deliverables text[] not null default '{}',
  terms text,
  shortlisted_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  withdrawn_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspace_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  text text not null,
  attachment_file_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  deleted_at timestamptz
);

create table if not exists public.project_activity (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  kind text not null,
  description text not null,
  meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  kind text not null,
  message text not null,
  data jsonb not null default '{}',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text,
  description text,
  location text,
  completion_year int,
  project_size text,
  services_provided text[] not null default '{}',
  is_featured boolean not null default false,
  is_platform_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  portfolio_project_id uuid references public.portfolio_projects(id) on delete cascade,
  professional_id uuid not null references public.profiles(id) on delete cascade,
  storage_bucket text not null default 'portfolio-media',
  storage_path text not null,
  file_name text,
  mime_type text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.professional_verifications (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.profiles(id) on delete cascade,
  verification_type public.verification_type not null,
  status public.verification_status not null default 'verification_pending',
  note text,
  reviewer_id uuid references public.profiles(id),
  review_note text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.verification_documents (
  id uuid primary key default gen_random_uuid(),
  verification_id uuid references public.professional_verifications(id) on delete cascade,
  professional_id uuid not null references public.profiles(id),
  document_type text,
  storage_bucket text not null default 'verification-documents',
  storage_path text not null,
  file_name text,
  mime_type text,
  file_size bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  customer_id uuid not null references public.profiles(id),
  professional_id uuid not null references public.profiles(id),
  proposal_id uuid references public.proposals(id),
  rating int not null check (rating between 1 and 5),
  review_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_primary_role_idx on public.profiles(primary_role);
create index if not exists profiles_city_idx on public.profiles(city);
create index if not exists profiles_services_gin_idx on public.profiles using gin(services);
create index if not exists profiles_service_areas_gin_idx on public.profiles using gin(service_areas);
create index if not exists services_category_idx on public.services(category);
create index if not exists projects_customer_status_idx on public.projects(customer_id, status);
create index if not exists projects_status_created_idx on public.projects(status, created_at desc);
create index if not exists projects_city_idx on public.projects(city);
create index if not exists projects_services_gin_idx on public.projects using gin(services);
create index if not exists projects_scope_gin_idx on public.projects using gin(scope);
create index if not exists projects_discoverable_idx on public.projects(created_at desc) where status in ('published','receiving_proposals','matching');
create index if not exists project_files_project_idx on public.project_files(project_id, created_at desc);
create unique index if not exists proposals_project_professional_idx on public.proposals(project_id, professional_id);
create index if not exists proposals_project_status_idx on public.proposals(project_id, status);
create index if not exists proposals_professional_status_idx on public.proposals(professional_id, status);
create index if not exists workspace_messages_project_idx on public.workspace_messages(project_id, created_at);
create index if not exists project_activity_project_idx on public.project_activity(project_id, created_at desc);
create index if not exists notifications_user_created_idx on public.notifications(user_id, created_at desc);
create index if not exists notifications_unread_idx on public.notifications(user_id) where read_at is null;
create index if not exists portfolio_professional_featured_idx on public.portfolio_projects(professional_id, is_featured);
create index if not exists verification_professional_status_idx on public.professional_verifications(professional_id, status);
create index if not exists reviews_professional_created_idx on public.reviews(professional_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.project_files enable row level security;
alter table public.proposals enable row level security;
alter table public.workspace_messages enable row level security;
alter table public.project_activity enable row level security;
alter table public.notifications enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_media enable row level security;
alter table public.professional_verifications enable row level security;
alter table public.verification_documents enable row level security;
alter table public.reviews enable row level security;

create policy "profiles self read" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "profiles self update" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "profiles public professionals" on public.profiles for select to anon, authenticated using (account_status = 'active' and primary_role in ('designer','contractor'));
create policy "services public read" on public.services for select to anon, authenticated using (is_active = true);
create policy "projects owner full access" on public.projects for all to authenticated using ((select auth.uid()) = customer_id) with check ((select auth.uid()) = customer_id);
create policy "projects professional discover" on public.projects for select to authenticated using (status in ('published','receiving_proposals','matching'));
create policy "projects assigned professional read" on public.projects for select to authenticated using ((select auth.uid()) = selected_professional_id);
create policy "project files participant read" on public.project_files for select to authenticated using (
  exists (select 1 from public.projects p where p.id = project_id and (p.customer_id = (select auth.uid()) or p.selected_professional_id = (select auth.uid())))
);
create policy "project files participant insert" on public.project_files for insert to authenticated with check (
  uploaded_by = (select auth.uid()) and exists (select 1 from public.projects p where p.id = project_id and (p.customer_id = (select auth.uid()) or p.selected_professional_id = (select auth.uid())))
);
create policy "proposals participant read" on public.proposals for select to authenticated using (customer_id = (select auth.uid()) or professional_id = (select auth.uid()));
create policy "proposals professional insert" on public.proposals for insert to authenticated with check (professional_id = (select auth.uid()));
create policy "proposals professional update own" on public.proposals for update to authenticated using (professional_id = (select auth.uid())) with check (professional_id = (select auth.uid()));
create policy "messages participants" on public.workspace_messages for select to authenticated using (
  exists (select 1 from public.projects p where p.id = project_id and (p.customer_id = (select auth.uid()) or p.selected_professional_id = (select auth.uid())))
);
create policy "messages participant insert" on public.workspace_messages for insert to authenticated with check (
  sender_id = (select auth.uid()) and exists (select 1 from public.projects p where p.id = project_id and (p.customer_id = (select auth.uid()) or p.selected_professional_id = (select auth.uid())))
);
create policy "activity participants read" on public.project_activity for select to authenticated using (
  exists (select 1 from public.projects p where p.id = project_id and (p.customer_id = (select auth.uid()) or p.selected_professional_id = (select auth.uid())))
);
create policy "notifications owner read" on public.notifications for select to authenticated using (user_id = (select auth.uid()));
create policy "notifications owner update" on public.notifications for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "portfolio public read" on public.portfolio_projects for select to anon, authenticated using (
  exists (select 1 from public.profiles p where p.id = professional_id and p.account_status = 'active' and p.primary_role in ('designer','contractor'))
);
create policy "portfolio owner full access" on public.portfolio_projects for all to authenticated using (professional_id = (select auth.uid())) with check (professional_id = (select auth.uid()));
create policy "portfolio media public read" on public.portfolio_media for select to anon, authenticated using (true);
create policy "portfolio media owner full access" on public.portfolio_media for all to authenticated using (professional_id = (select auth.uid())) with check (professional_id = (select auth.uid()));
create policy "verifications owner read" on public.professional_verifications for select to authenticated using (professional_id = (select auth.uid()));
create policy "verifications owner insert" on public.professional_verifications for insert to authenticated with check (professional_id = (select auth.uid()));
create policy "verification docs owner read" on public.verification_documents for select to authenticated using (professional_id = (select auth.uid()));
create policy "verification docs owner insert" on public.verification_documents for insert to authenticated with check (professional_id = (select auth.uid()));
create policy "reviews public read" on public.reviews for select to anon, authenticated using (true);
create policy "reviews customer insert" on public.reviews for insert to authenticated with check (customer_id = (select auth.uid()));

insert into public.services (category, name, slug, role_scope, description, sort_order)
values
  ('Design', 'Full Home Interior Design', 'full-home-interior-design', array['designer']::public.user_role[], 'Concept, planning, materials, and execution-ready drawings.', 10),
  ('Design', 'Modular Kitchen Design', 'modular-kitchen-design', array['designer']::public.user_role[], 'Kitchen layouts, storage planning, finishes, and vendor-ready details.', 20),
  ('Ceiling', 'False Ceiling', 'false-ceiling', array['contractor']::public.user_role[], 'Gypsum, POP, lighting coves, rafters, and ceiling execution.', 30),
  ('Wall', 'Wall Paneling', 'wall-paneling', array['designer','contractor']::public.user_role[], 'Feature walls, fluted panels, veneer, paint, texture, and cladding.', 40),
  ('Flooring', 'Flooring Installation', 'flooring-installation', array['contractor']::public.user_role[], 'Tile, wooden, vinyl, stone, and floor preparation work.', 50),
  ('Execution', 'End-to-End Execution', 'end-to-end-execution', array['contractor']::public.user_role[], 'Site coordination, procurement, labour, and handover support.', 60)
on conflict (slug) do update set
  category = excluded.category,
  name = excluded.name,
  role_scope = excluded.role_scope,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = true;

insert into storage.buckets (id, name, public)
values
  ('project-files', 'project-files', false),
  ('portfolio-media', 'portfolio-media', true),
  ('verification-documents', 'verification-documents', false)
on conflict (id) do nothing;
