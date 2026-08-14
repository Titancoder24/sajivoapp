-- Sajivo financial documents, usage credits, OTP verification, and support identity.
-- Issued financial records are append-only from the client surface; status changes
-- happen through server-side payment/provider workflows.

create or replace function public.sajivo_public_id(prefix text)
returns text
language sql
volatile
as $$
  select upper(prefix || '-' || substr(encode(gen_random_bytes(6), 'hex'), 1, 8));
$$;

alter table public.profiles
  add column if not exists person_public_id text unique,
  add column if not exists account_public_id text unique,
  add column if not exists identity_status text not null default 'active';

update public.profiles
set person_public_id = coalesce(person_public_id, public.sajivo_public_id('PER')),
    account_public_id = coalesce(account_public_id, public.sajivo_public_id('ACC'))
where person_public_id is null or account_public_id is null;

alter table public.profiles alter column person_public_id set not null;
alter table public.profiles alter column account_public_id set not null;

create table if not exists public.credit_wallets (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.profiles(id) on delete cascade,
  credit_type text not null check (credit_type in ('requirement', 'proposal', 'ai', 'top_up')),
  plan_name text not null default 'free',
  included_limit integer not null default 0 check (included_limit >= 0),
  included_remaining integer not null default 0 check (included_remaining >= 0),
  top_up_remaining integer not null default 0 check (top_up_remaining >= 0),
  reset_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(account_id, credit_type)
);

create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default public.sajivo_public_id('CRD'),
  account_id uuid not null references public.profiles(id) on delete cascade,
  wallet_id uuid not null references public.credit_wallets(id) on delete cascade,
  amount integer not null check (amount <> 0),
  event_type text not null check (event_type in ('grant', 'consume', 'top_up', 'refund', 'expire', 'adjustment')),
  reference_type text,
  reference_id text,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.financial_documents (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default public.sajivo_public_id('DOC'),
  document_type text not null check (document_type in ('quotation', 'payment_request', 'invoice', 'receipt', 'refund', 'credit_note', 'debit_note')),
  document_number text not null unique,
  account_id uuid not null references public.profiles(id) on delete restrict,
  project_id uuid references public.projects(id) on delete set null,
  milestone_id uuid,
  parent_document_id uuid references public.financial_documents(id) on delete set null,
  issuer_name text not null,
  recipient_name text not null,
  currency text not null default 'INR',
  subtotal numeric(14,2) not null default 0 check (subtotal >= 0),
  tax_amount numeric(14,2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(14,2) not null check (total_amount >= 0),
  amount_paid numeric(14,2) not null default 0 check (amount_paid >= 0),
  status text not null default 'draft' check (status in ('draft', 'issued', 'viewed', 'partially_paid', 'paid', 'overdue', 'cancelled', 'disputed', 'replaced')),
  metadata jsonb not null default '{}'::jsonb,
  issued_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.financial_document_items (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.financial_documents(id) on delete cascade,
  description text not null,
  quantity numeric(12,2) not null default 1 check (quantity > 0),
  unit_price numeric(14,2) not null check (unit_price >= 0),
  taxable_value numeric(14,2) not null check (taxable_value >= 0),
  tax_rate numeric(6,3) not null default 0 check (tax_rate >= 0),
  total numeric(14,2) not null check (total >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.payment_records (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default public.sajivo_public_id('PAY'),
  invoice_id uuid references public.financial_documents(id) on delete restrict,
  account_id uuid not null references public.profiles(id) on delete restrict,
  project_id uuid references public.projects(id) on delete set null,
  amount numeric(14,2) not null check (amount > 0),
  currency text not null default 'INR',
  method text not null check (method in ('upi', 'card', 'bank_transfer', 'neft', 'rtgs', 'cash', 'cheque')),
  provider_reference text,
  status text not null default 'created' check (status in ('created', 'payment_initiated', 'processing', 'success', 'failed', 'cancelled', 'expired', 'disputed')),
  provider_payload jsonb not null default '{}'::jsonb,
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payment_records(id) on delete cascade,
  event_type text not null,
  provider_event_id text unique,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.receipts (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default public.sajivo_public_id('RCP'),
  receipt_number text not null unique,
  payment_id uuid not null unique references public.payment_records(id) on delete restrict,
  invoice_id uuid references public.financial_documents(id) on delete restrict,
  account_id uuid not null references public.profiles(id) on delete restrict,
  amount_received numeric(14,2) not null check (amount_received > 0),
  method text not null,
  verification_reference text not null,
  status text not null default 'issued' check (status in ('issued', 'voided')),
  issued_at timestamptz not null default now()
);

create table if not exists public.financial_audit_logs (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references public.profiles(id) on delete set null,
  document_id uuid references public.financial_documents(id) on delete set null,
  payment_id uuid references public.payment_records(id) on delete set null,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  previous_state jsonb,
  new_state jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.otp_transactions (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default public.sajivo_public_id('OTP'),
  account_id uuid not null references public.profiles(id) on delete cascade,
  purpose text not null check (purpose in ('signup', 'login', 'payment', 'milestone_approval', 'cash_acknowledgement', 'support_access')),
  destination text not null,
  code_hash text not null,
  attempts integer not null default 0 check (attempts >= 0),
  status text not null default 'pending' check (status in ('pending', 'verified', 'expired', 'locked')),
  expires_at timestamptz not null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default public.sajivo_public_id('SUP'),
  account_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  payment_id uuid references public.payment_records(id) on delete set null,
  subject text not null,
  status text not null default 'open' check (status in ('open', 'pending', 'resolved', 'closed')),
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_access_audit (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.profiles(id) on delete restrict,
  account_id uuid not null references public.profiles(id) on delete restrict,
  action text not null check (action in ('account_view', 'impersonation_start', 'impersonation_end', 'controlled_fix')),
  reason text not null,
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists credit_transactions_account_created_idx on public.credit_transactions(account_id, created_at desc);
create index if not exists financial_documents_account_created_idx on public.financial_documents(account_id, created_at desc);
create index if not exists payment_records_account_created_idx on public.payment_records(account_id, created_at desc);
create index if not exists otp_transactions_account_purpose_idx on public.otp_transactions(account_id, purpose, created_at desc);
create index if not exists support_tickets_account_status_idx on public.support_tickets(account_id, status, updated_at desc);

alter table public.credit_wallets enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.financial_documents enable row level security;
alter table public.financial_document_items enable row level security;
alter table public.payment_records enable row level security;
alter table public.payment_events enable row level security;
alter table public.receipts enable row level security;
alter table public.financial_audit_logs enable row level security;
alter table public.otp_transactions enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_access_audit enable row level security;

create policy "account reads own credit wallets" on public.credit_wallets for select to authenticated using ((select auth.uid()) = account_id);
create policy "account reads own credit transactions" on public.credit_transactions for select to authenticated using ((select auth.uid()) = account_id);
create policy "account reads own financial documents" on public.financial_documents for select to authenticated using ((select auth.uid()) = account_id);
create policy "account reads own financial items" on public.financial_document_items for select to authenticated using (exists (select 1 from public.financial_documents d where d.id = document_id and d.account_id = (select auth.uid())));
create policy "account reads own payments" on public.payment_records for select to authenticated using ((select auth.uid()) = account_id);
create policy "account reads own receipts" on public.receipts for select to authenticated using ((select auth.uid()) = account_id);
create policy "account reads own otp" on public.otp_transactions for select to authenticated using ((select auth.uid()) = account_id);
create policy "account reads own tickets" on public.support_tickets for select to authenticated using ((select auth.uid()) = account_id);

grant select on public.credit_wallets, public.credit_transactions, public.financial_documents, public.financial_document_items, public.payment_records, public.receipts, public.otp_transactions, public.support_tickets to authenticated;
