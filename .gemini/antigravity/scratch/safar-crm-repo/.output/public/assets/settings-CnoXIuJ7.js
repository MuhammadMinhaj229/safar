import{Y as e,Z as t,a as n,i as r,n as i,o as a,p as o,r as s,t as c}from"./supabase-RWjCmIdL.js";import{n as l}from"./app-shell-BXhbSvIf.js";import{t as u}from"./useMutation-0k7ZvogN.js";import{_ as d,t as f}from"./index-CEYE__Nj.js";import{a as p,r as m}from"./brand-mark-DT0xWeP5.js";import{t as h}from"./circle-check-BOM9eT6H.js";import{t as g}from"./circle-x-DBmcXzgF.js";import{t as _}from"./trash-2-Bog-g8dT.js";var v=p(`clipboard-copy`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2`,key:`4jdomd`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v4`,key:`3hqy98`}],[`path`,{d:`M21 14H11`,key:`1bme5i`}],[`path`,{d:`m15 10-4 4 4 4`,key:`5dvupr`}]]),y=p(`database`,[[`ellipse`,{cx:`12`,cy:`5`,rx:`9`,ry:`3`,key:`msslwz`}],[`path`,{d:`M3 5V19A9 3 0 0 0 21 19V5`,key:`1wlel7`}],[`path`,{d:`M3 12A9 3 0 0 0 21 12`,key:`mv7ke4`}]]),b=p(`loader-circle`,[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]]),x=p(`plug-zap`,[[`path`,{d:`M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z`,key:`goz73y`}],[`path`,{d:`m2 22 3-3`,key:`19mgm9`}],[`path`,{d:`M7.5 13.5 10 11`,key:`7xgeeb`}],[`path`,{d:`M10.5 16.5 13 14`,key:`10btkg`}],[`path`,{d:`m18 3-4 4h6l-4 4`,key:`16psg9`}]]),S=t(e()),C=[{id:`supabase`,name:`Database (Supabase)`,description:`The single source of truth for customers, invoices, vendors and the website.`,fields:[{key:`url`,label:`Project URL`,placeholder:`https://yourproject.supabase.co`,secret:!1},{key:`anonKey`,label:`Anon (public) key`,placeholder:`eyJhbGciOi…`,secret:!0},{key:`serviceRoleKey`,label:`Service-role key (server jobs only)`,placeholder:`eyJhbGciOi…`,secret:!0,optional:!0}]},{id:`whatsapp`,name:`WhatsApp (Evolution API)`,description:`Self-hosted WhatsApp Web engine: QR pairing, inbox, quick replies, broadcasts.`,fields:[{key:`baseUrl`,label:`Server URL`,placeholder:`https://wa.yourdomain.com`,secret:!1},{key:`apiKey`,label:`API key`,placeholder:`Global or instance API key`,secret:!0},{key:`instance`,label:`Instance name`,placeholder:`safar`,secret:!1,optional:!0}]},{id:`invoify`,name:`Safar Invoify`,description:`Professional invoice generator, linked to customers and service requests.`,fields:[{key:`baseUrl`,label:`Invoify URL`,placeholder:`https://invoice.yourdomain.com`,secret:!1},{key:`syncKey`,label:`Sync key`,placeholder:`Shared secret for invoice sync`,secret:!0,optional:!0}]},{id:`social`,name:`Social Media Scheduler`,description:`Buffer-style scheduled posting across Instagram, Facebook, LinkedIn and X.`,fields:[{key:`baseUrl`,label:`Scheduler URL`,placeholder:`https://social.yourdomain.com`,secret:!1},{key:`apiKey`,label:`API key`,placeholder:`Scheduler API key`,secret:!0,optional:!0}]},{id:`finance`,name:`Finance & Investments`,description:`Cash flow, expenses, capital investments and provider payouts ledger.`,fields:[{key:`baseUrl`,label:`Finance URL (optional external ledger)`,placeholder:`https://finance.yourdomain.com`,secret:!1,optional:!0},{key:`apiKey`,label:`API key`,placeholder:`Ledger API key`,secret:!0,optional:!0}]}],w=`safar.integrations.config`;function T(){if(typeof window>`u`)return{};try{return JSON.parse(window.localStorage.getItem(w)??`{}`)}catch{return{}}}function E(e){return T()[e]??{}}function D(e,t){let n=T();n[e]=t,window.localStorage.setItem(w,JSON.stringify(n))}function O(e){let t=T();delete t[e],window.localStorage.setItem(w,JSON.stringify(t))}function k(e){let t=E(e.id),n=e.fields.filter(e=>!e.optional).every(e=>!!t[e.key]?.trim()),r=e.fields.some(e=>!!t[e.key]?.trim());return n&&r}async function A(e,t){let n=performance.now();try{let r=await fetch(e.replace(/\/+$/,``),{method:`GET`,headers:t?{apikey:t,Authorization:`Bearer ${t}`}:{},mode:`cors`}),i=Math.round(performance.now()-n);return{ok:r.status<500,latencyMs:i,message:r.status<500?`Reachable (${r.status}) in ${i} ms`:`Server error ${r.status}`}}catch{return{ok:!1,latencyMs:Math.round(performance.now()-n),message:`Unreachable — check the URL and that the service is running`}}}var j={hotFrom:60,warmFrom:30,rules:[{id:`page`,label:`Looked at a page`,match:`page.viewed`,points:1,enabled:!0},{id:`service`,label:`Opened a service`,match:`service.viewed`,points:5,enabled:!0},{id:`price`,label:`Looked at prices`,match:`pricing.viewed`,points:8,enabled:!0},{id:`faq`,label:`Read the FAQ`,match:`faq.opened`,points:3,enabled:!0},{id:`cta`,label:`Clicked a button`,match:`cta.clicked`,points:5,enabled:!0},{id:`form_start`,label:`Started the form`,match:`form.started`,points:8,enabled:!0},{id:`form`,label:`Sent the form`,match:`form.submitted`,points:25,enabled:!0},{id:`whatsapp`,label:`Clicked WhatsApp`,match:`whatsapp.clicked`,points:25,enabled:!0},{id:`call`,label:`Clicked the phone number`,match:`phone.clicked`,points:20,enabled:!0},{id:`email`,label:`Clicked the email`,match:`email.clicked`,points:12,enabled:!0},{id:`repeat`,label:`Came back another day`,match:`session.returning`,points:10,enabled:!0}]};function M(e){if(!e||typeof e!=`object`)return j;let t=e;return{hotFrom:typeof t.hotFrom==`number`?t.hotFrom:j.hotFrom,warmFrom:typeof t.warmFrom==`number`?t.warmFrom:j.warmFrom,rules:Array.isArray(t.rules)&&t.rules.length?t.rules:j.rules}}async function N(){let e=s();if(!e)return j;let{data:t}=await e.from(`app_settings`).select(`value`).eq(`key`,`lead_scoring`).maybeSingle();return M(t?.value)}async function P(e){let t=s();if(!t)throw Error(`Connect your database in Settings first.`);let{data:n}=await t.auth.getUser(),{error:r}=await t.from(`app_settings`).upsert({key:`lead_scoring`,value:e,updated_by:n.user?.id??null},{onConflict:`key`});if(r)throw Error(r.message)}var F=`-- SAFAR N MANZIL — Foundation schema
-- Run once in your Supabase project's SQL editor (Dashboard → SQL Editor → New query → paste → Run).
-- Creates the core business tables, roles, row-level security and audit log.

create extension if not exists pgcrypto;

-- ---------- Organizations: the three ventures stay separate ----------
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, -- safar-n-manzil | safa-fresh | safa-foods
  name text not null,
  created_at timestamptz not null default now()
);

-- ---------- Roles ----------
do $$ begin
  create type public.app_role as enum
    ('super_admin', 'admin', 'ops_manager', 'sales_agent', 'finance_officer', 'viewer');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create or replace function public.is_team(_user_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id)
$$;

create or replace function public.can_write(_user_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role <> 'viewer'
  )
$$;

-- ---------- CRM core ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  name text not null,
  phone text,
  email text,
  source text not null default 'manual', -- website | whatsapp | instagram | facebook | referral | manual | campaign | api
  source_detail text,
  campaign text,
  service_interest text,
  location text,
  status text not null default 'new', -- new | contacted | qualified | converted | lost
  assigned_to uuid references auth.users(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  lead_id uuid references public.leads(id),
  name text not null,
  phone text,
  phone_normalized text,
  email text,
  email_normalized text,
  whatsapp text,
  gulf_country text,
  gulf_city text,
  india_address text,
  lifecycle_status text not null default 'customer',
  -- qualified | converted | customer | active | inactive | churn_risk | reactivated | lost
  tags text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists contacts_phone_normalized_key
  on public.contacts (phone_normalized) where phone_normalized is not null;
create unique index if not exists contacts_email_normalized_key
  on public.contacts (email_normalized) where email_normalized is not null;

create table if not exists public.provider_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique -- ac_repair | legal | healthcare | parcel | grocery | ...
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  category_id uuid references public.provider_categories(id),
  name text not null,
  business_name text,
  phone text,
  whatsapp text,
  email text,
  city text,
  service_areas text[] not null default '{}',
  verification_status text not null default 'pending', -- pending | verified | suspended
  availability text not null default 'available', -- available | busy | offline
  is_primary boolean not null default false,
  rate_card jsonb not null default '{}',
  rating numeric(3,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  contact_id uuid not null references public.contacts(id),
  title text not null,
  description text,

  service_category text,
  status text not null default 'open', -- open | in_progress | waiting | completed | cancelled
  priority text not null default 'normal', -- low | normal | high | urgent
  assigned_provider_id uuid references public.providers(id),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ---------- Finance: structured money, never notes ----------
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  contact_id uuid not null references public.contacts(id),
  service_request_id uuid references public.service_requests(id),
  invoice_number text not null unique,
  status text not null default 'draft', -- draft | sent | paid | partially_paid | cancelled | refunded
  currency char(3) not null default 'INR',
  subtotal numeric(14,2) not null default 0,
  third_party_cost numeric(14,2) not null default 0,
  safar_fee numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  amount_paid numeric(14,2) not null default 0,
  outstanding numeric(14,2) not null default 0,
  issued_at timestamptz,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(14,2) not null,
  line_total numeric(14,2) not null
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id),
  amount numeric(14,2) not null,
  method text, -- upi | bank_transfer | cash | card
  reference text,
  paid_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  category text not null, -- operating | capital_investment | marketing | salary | other
  description text not null,
  amount numeric(14,2) not null,
  spent_at date not null default current_date,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.provider_payables (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id),
  service_request_id uuid references public.service_requests(id),
  amount numeric(14,2) not null,
  status text not null default 'owed', -- owed | paid
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Communication ----------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.contacts(id),
  channel text not null default 'whatsapp',
  last_message_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  direction text not null, -- inbound | outbound
  body text,
  media_url text,
  external_id text, -- idempotency key from WhatsApp
  sent_at timestamptz not null default now()
);
create unique index if not exists messages_external_id_key
  on public.messages (external_id) where external_id is not null;

-- ---------- CMS ----------
create table if not exists public.cms_sections (
  id uuid primary key default gen_random_uuid(),
  page text not null default 'home',
  section_key text not null, -- hero | services | trust | how_it_works | testimonials | cta | faq | contact | footer
  content jsonb not null default '{}',        -- published content
  draft_content jsonb,                        -- work in progress, not public

  status text not null default 'draft', -- draft | published
  version int not null default 1,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  unique (page, section_key)
);

-- safe to re-run on an existing install
alter table public.cms_sections add column if not exists draft_content jsonb;
alter table public.service_requests add column if not exists description text;



create table if not exists public.cms_revisions (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.cms_sections(id) on delete cascade,
  content jsonb not null,
  version int not null,
  saved_by uuid references auth.users(id),
  saved_at timestamptz not null default now()
);

-- Shared presentation and workspace configuration. Public reads only the
-- non-secret workspace row; only signed-in administrators can change it.
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

-- ---------- Operations ----------
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  title text not null,
  kind text not null default 'general', -- general | follow_up | handoff | churn_check
  priority text not null default 'normal',
  status text not null default 'open', -- open | done | cancelled
  contact_id uuid references public.contacts(id),
  assigned_to uuid references auth.users(id),
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  key text not null unique, -- supabase | whatsapp | invoify | social | finance
  status text not null default 'disconnected', -- connected | paused | failed | disconnected
  config jsonb not null default '{}', -- non-secret config only
  last_ok_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity text not null,
  entity_id uuid,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

-- ---------- Grants ----------
grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;
grant select on public.cms_sections to anon;
grant select on public.app_settings to anon;
grant select, insert, update, delete on public.app_settings to authenticated;
grant all on public.app_settings to service_role;

-- ---------- RLS ----------
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.leads enable row level security;
alter table public.contacts enable row level security;
alter table public.service_requests enable row level security;
alter table public.provider_categories enable row level security;
alter table public.providers enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;
alter table public.expenses enable row level security;
alter table public.provider_payables enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.cms_sections enable row level security;
alter table public.cms_revisions enable row level security;
alter table public.tasks enable row level security;
alter table public.integrations enable row level security;
alter table public.audit_logs enable row level security;
alter table public.app_settings enable row level security;

create policy team_read_organizations on public.organizations for select to authenticated using (true);
create policy team_read_profiles on public.profiles for select to authenticated using (public.is_team(auth.uid()));
create policy team_read_user_roles on public.user_roles for select to authenticated using (public.is_team(auth.uid()));

-- Read for any team member, write for non-viewers, delete for admins.
do $$
declare t text;
begin
  foreach t in array array[
    'leads','contacts','service_requests','provider_categories','providers',
    'invoices','invoice_items','payments','expenses','provider_payables',
    'conversations','messages','tasks','cms_sections','cms_revisions'
  ] loop
    execute format('create policy team_read_%1$s on public.%1$s for select to authenticated using (public.is_team(auth.uid()))', t);
    execute format('create policy team_write_%1$s on public.%1$s for insert to authenticated with check (public.can_write(auth.uid()))', t);
    execute format('create policy team_update_%1$s on public.%1$s for update to authenticated using (public.can_write(auth.uid()))', t);
    execute format('create policy admin_delete_%1$s on public.%1$s for delete to authenticated using (public.has_role(auth.uid(), ''super_admin'') or public.has_role(auth.uid(), ''admin''))', t);
  end loop;
end $$;

create policy admin_integrations on public.integrations for all to authenticated
  using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'));
create policy team_read_audit on public.audit_logs for select to authenticated
  using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'));
create policy team_insert_audit on public.audit_logs for insert to authenticated
  with check (public.is_team(auth.uid()));

-- Public website reads only published CMS sections.
create policy public_read_published_cms on public.cms_sections for select to anon
  using (status = 'published');
create policy public_read_workspace_settings on public.app_settings for select to anon
  using (key = 'workspace');
create policy team_read_workspace_settings on public.app_settings for select to authenticated
  using (public.is_team(auth.uid()));
create policy admin_write_workspace_settings on public.app_settings for all to authenticated
  using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'));

-- Seed the three ventures (identity only, no business data).
insert into public.organizations (slug, name) values
  ('safar-n-manzil', 'SAFAR N MANZIL'),
  ('safa-fresh', 'SAFA FRESH'),
  ('safa-foods', 'SAFA FOODS')
on conflict (slug) do nothing;

-- ============================================================
-- VISITOR INTELLIGENCE, IDENTITY AND EVENT BACKBONE
-- Safe to re-run. Adds website tracking and the customer journey.
-- ============================================================

-- Anonymous website visitor. Never holds personal information until
-- the person identifies themselves through a form or a message.
create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  visitor_key text not null unique,      -- first-party id stored in the browser
  contact_id uuid references public.contacts(id) on delete set null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  first_landing_page text,
  first_referrer text,
  first_utm_source text,
  first_utm_medium text,
  first_utm_campaign text,
  session_count integer not null default 0,
  event_count integer not null default 0
);

create table if not exists public.visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  session_key text not null unique,
  visitor_key text not null,
  started_at timestamptz not null default now(),
  last_event_at timestamptz not null default now(),
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  device text,
  browser text,
  os text,
  language text,
  country text
);

-- One row per meaningful action on the public website.
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  event_key text not null unique,        -- client generated; makes retries harmless
  name text not null,                    -- page.viewed | service.viewed | whatsapp.clicked | ...
  visitor_key text not null,
  session_key text,
  contact_id uuid references public.contacts(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  route text,
  page_title text,
  properties jsonb not null default '{}',
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists events_visitor_idx on public.events (visitor_key, occurred_at desc);
create index if not exists events_contact_idx on public.events (contact_id, occurred_at desc);
create index if not exists events_name_idx on public.events (name, occurred_at desc);
create index if not exists visitor_sessions_visitor_idx on public.visitor_sessions (visitor_key, started_at desc);

-- Which anonymous device belongs to which known person, and why we believe it.
create table if not exists public.identity_links (
  id uuid primary key default gen_random_uuid(),
  visitor_key text not null,
  contact_id uuid not null references public.contacts(id) on delete cascade,
  signal text not null,                  -- form | whatsapp | phone | email | manual
  confidence text not null default 'confirmed', -- confirmed | probable
  linked_at timestamptz not null default now(),
  unique (visitor_key, contact_id)
);

-- Anything we are not sure about waits here for a human decision.
create table if not exists public.identity_review_queue (
  id uuid primary key default gen_random_uuid(),
  visitor_key text,
  candidate_contact_id uuid references public.contacts(id) on delete cascade,
  reason text not null,
  payload jsonb not null default '{}',
  status text not null default 'open',   -- open | merged | dismissed
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references auth.users(id)
);

-- ---------- Marketing attribution ----------
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  name text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text unique,
  channel text,
  started_on date,
  ended_on date,
  created_at timestamptz not null default now()
);

create table if not exists public.attribution_touches (
  id uuid primary key default gen_random_uuid(),
  visitor_key text,
  contact_id uuid references public.contacts(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  touch_type text not null,              -- first | latest | conversion
  source text,
  medium text,
  campaign text,
  landing_page text,
  occurred_at timestamptz not null default now()
);

-- ---------- Lead history, scoring and feedback ----------
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  kind text not null,                    -- status_changed | assigned | note | scored | contacted
  detail text,
  from_value text,
  to_value text,
  actor_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.leads add column if not exists visitor_key text;
alter table public.leads add column if not exists score integer not null default 0;
alter table public.leads add column if not exists score_updated_at timestamptz;
alter table public.leads add column if not exists contact_id uuid references public.contacts(id) on delete set null;
alter table public.leads add column if not exists consent_marketing boolean not null default false;

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  contact_id uuid references public.contacts(id) on delete cascade,
  service_request_id uuid references public.service_requests(id) on delete set null,
  rating integer check (rating between 1 and 5),
  comment text,
  channel text not null default 'website',
  status text not null default 'received', -- received | reviewed | actioned
  created_at timestamptz not null default now()
);

-- ---------- Channels, automation and reliability ----------
create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  platform text not null,                -- instagram | facebook | google_business | linkedin | youtube
  account_label text not null,
  external_id text,
  status text not null default 'disconnected',
  config jsonb not null default '{}',    -- non-secret config only
  last_ok_at timestamptz,
  created_at timestamptz not null default now(),
  unique (platform, account_label)
);

create table if not exists public.automations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trigger_event text not null,
  conditions jsonb not null default '[]',
  actions jsonb not null default '[]',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.automation_runs (
  id uuid primary key default gen_random_uuid(),
  automation_id uuid references public.automations(id) on delete cascade,
  event_key text,
  status text not null,                  -- success | skipped | failed
  detail text,
  created_at timestamptz not null default now()
);

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  external_id text,
  event_type text,
  payload jsonb not null default '{}',
  processing_status text not null default 'received', -- received | processed | failed
  error text,
  retry_count integer not null default 0,
  received_at timestamptz not null default now(),
  unique (provider, external_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  kind text not null,                    -- high_priority_lead | sla_breach | automation_failed | integration_down
  title text not null,
  body text,
  entity text,
  entity_id uuid,
  severity text not null default 'info', -- info | warning | critical
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- Single place for services, prices, areas, hours, FAQs and policies.
create table if not exists public.knowledge_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  category text not null,                -- service | price | area | hours | faq | policy | offer | brand
  code text,
  title text not null,
  body text,
  amount numeric(14,2),
  currency text not null default 'INR',
  metadata jsonb not null default '{}',
  is_public boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (category, code)
);

-- ---------- Grants ----------
grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

-- The public website may only ADD its own tracking rows and enquiries.
grant insert on public.visitors to anon;
grant insert, update on public.visitor_sessions to anon;
grant insert on public.events to anon;
grant insert on public.leads to anon;
grant insert on public.feedback to anon;
grant select on public.knowledge_entries to anon;

-- ---------- Row level security ----------
do $$
declare t text;
begin
  foreach t in array array[
    'visitors','visitor_sessions','events','identity_links','identity_review_queue',
    'campaigns','attribution_touches','lead_events','feedback','social_accounts',
    'automations','automation_runs','webhook_events','notifications','knowledge_entries'
  ] loop
    execute format('alter table public.%1$s enable row level security', t);
    begin
      execute format('create policy team_read_%1$s on public.%1$s for select to authenticated using (public.is_team(auth.uid()))', t);
      execute format('create policy team_write_%1$s on public.%1$s for insert to authenticated with check (public.can_write(auth.uid()))', t);
      execute format('create policy team_update_%1$s on public.%1$s for update to authenticated using (public.can_write(auth.uid()))', t);
      execute format('create policy admin_delete_%1$s on public.%1$s for delete to authenticated using (public.has_role(auth.uid(), ''super_admin'') or public.has_role(auth.uid(), ''admin''))', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

do $$
begin
  create policy public_insert_visitors on public.visitors for insert to anon with check (true);
  create policy public_insert_sessions on public.visitor_sessions for insert to anon with check (true);
  create policy public_update_sessions on public.visitor_sessions for update to anon using (true) with check (true);
  create policy public_insert_events on public.events for insert to anon with check (contact_id is null and lead_id is null);
  create policy public_insert_leads on public.leads for insert to anon with check (source = 'website');
  create policy public_insert_feedback on public.feedback for insert to anon with check (true);
  create policy public_read_knowledge on public.knowledge_entries for select to anon using (is_public);
exception when duplicate_object then null;
end $$;

-- ============================================================
-- Phase D — Conversations, integrations, social and automation
-- Additive only. Safe to run again.
-- ============================================================

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  channel text not null,                    -- whatsapp | instagram | facebook | email | web
  account_id text,                          -- which connected account/number
  external_id text,                         -- chat id at the provider
  contact_id uuid references public.contacts(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  display_name text,
  phone text,
  status text not null default 'open',      -- open | pending | closed
  assigned_to uuid,
  tags text[] not null default '{}',
  service_interest text,
  unread_count integer not null default 0,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (channel, external_id)
);
create index if not exists conversations_last_message_idx on public.conversations (last_message_at desc);
create index if not exists conversations_contact_idx on public.conversations (contact_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  direction text not null check (direction in ('in','out')),
  channel text not null,
  external_id text,
  body text,
  media_url text,
  media_type text,
  status text not null default 'sent',      -- queued | sent | delivered | read | failed
  error text,
  author text,
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (channel, external_id)
);
create index if not exists messages_conversation_idx on public.messages (conversation_id, sent_at);

create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  channel text not null default 'whatsapp',
  body text not null,
  updated_at timestamptz not null default now()
);

-- Non-secret integration state. Secrets stay in server environment variables.
create table if not exists public.integrations (
  key text primary key,                     -- whatsapp_evolution | whatsapp_meta | instagram | facebook | gbp | linkedin | youtube
  label text not null,
  status text not null default 'not_connected', -- not_connected | connected | error
  config jsonb not null default '{}',
  last_checked_at timestamptz,
  last_error text,
  updated_at timestamptz not null default now()
);

create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  channel text not null,
  account_key text,
  body text not null,
  media_url text,
  scheduled_for timestamptz,
  status text not null default 'draft',     -- draft | scheduled | published | failed
  external_id text,
  error text,
  created_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.leads add column if not exists score_reasons jsonb not null default '[]';
alter table public.leads add column if not exists last_scored_at timestamptz;

-- Upgrade older installs that already had simpler conversation tables.
alter table public.conversations add column if not exists account_id text;
alter table public.conversations add column if not exists external_id text;
alter table public.conversations add column if not exists lead_id uuid references public.leads(id) on delete set null;
alter table public.conversations add column if not exists display_name text;
alter table public.conversations add column if not exists phone text;
alter table public.conversations add column if not exists status text not null default 'open';
alter table public.conversations add column if not exists assigned_to uuid;
alter table public.conversations add column if not exists tags text[] not null default '{}';
alter table public.conversations add column if not exists service_interest text;
alter table public.conversations add column if not exists unread_count integer not null default 0;
alter table public.conversations add column if not exists last_message_at timestamptz;
alter table public.conversations add column if not exists updated_at timestamptz not null default now();
create unique index if not exists conversations_channel_external_key
  on public.conversations (channel, external_id) where external_id is not null;

alter table public.messages add column if not exists channel text not null default 'whatsapp';
alter table public.messages add column if not exists media_type text;
alter table public.messages add column if not exists status text not null default 'sent';
alter table public.messages add column if not exists error text;
alter table public.messages add column if not exists author text;
alter table public.messages add column if not exists created_at timestamptz not null default now();
update public.messages set direction = 'in' where direction = 'inbound';
update public.messages set direction = 'out' where direction = 'outbound';

alter table public.integrations add column if not exists label text;
alter table public.integrations add column if not exists last_checked_at timestamptz;
alter table public.integrations add column if not exists last_error text;
update public.integrations set label = coalesce(label, key);

do $$
declare t text;
begin
  foreach t in array array['conversations','messages','message_templates','integrations','social_posts'] loop
    execute format('alter table public.%1$s enable row level security', t);
    begin
      execute format('create policy team_read_%1$s on public.%1$s for select to authenticated using (public.is_team(auth.uid()))', t);
      execute format('create policy team_write_%1$s on public.%1$s for insert to authenticated with check (public.can_write(auth.uid()))', t);
      execute format('create policy team_update_%1$s on public.%1$s for update to authenticated using (public.can_write(auth.uid()))', t);
      execute format('create policy admin_delete_%1$s on public.%1$s for delete to authenticated using (public.has_role(auth.uid(), ''super_admin'') or public.has_role(auth.uid(), ''admin''))', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

grant select, insert, update, delete on public.conversations, public.messages,
  public.message_templates, public.integrations, public.social_posts to authenticated;
grant all on public.conversations, public.messages, public.message_templates,
  public.integrations, public.social_posts to service_role;
`,I=o();function L({ok:e}){return e?(0,I.jsxs)(`span`,{className:`inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-foreground`,children:[(0,I.jsx)(h,{className:`h-3.5 w-3.5 text-primary`}),` Connected`]}):(0,I.jsxs)(`span`,{className:`inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground`,children:[(0,I.jsx)(g,{className:`h-3.5 w-3.5`}),` Not connected`]})}function R(){let e=d(),t=i(),[r,o]=(0,S.useState)(t?.url??``),[s,l]=(0,S.useState)(t?.anonKey??``),[f,p]=(0,S.useState)(t?.serviceRoleKey??``),[m,h]=(0,S.useState)(null),[g,C]=(0,S.useState)(!1),[w,T]=(0,S.useState)(!1),E=u({mutationFn:async()=>{let e={url:r.trim(),anonKey:s.trim()};f.trim()&&(e.serviceRoleKey=f.trim());let t=await a(e);if(!t.ok)throw Error(t.message);return n(e),t},onSuccess:t=>{h({ok:!0,message:t.message}),e.clear()},onError:e=>{h({ok:!1,message:e instanceof Error?e.message:`Connection failed`})}});function D(e){e.preventDefault(),h(null),E.mutate()}return(0,I.jsxs)(`section`,{className:`rounded-xl border border-border bg-card p-6 shadow-sm`,children:[(0,I.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,I.jsx)(`div`,{className:`flex h-10 w-10 items-center justify-center rounded-lg bg-accent`,children:(0,I.jsx)(y,{className:`h-5 w-5 text-accent-foreground`})}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h2`,{className:`font-display text-lg font-semibold text-foreground`,children:`Database (Supabase)`}),(0,I.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`The source of truth for customers, invoices, vendors and the website.`})]})]}),(0,I.jsx)(L,{ok:!!t})]}),(0,I.jsxs)(`form`,{onSubmit:D,className:`mt-5 grid grid-cols-1 gap-4`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`label`,{className:`mb-1.5 block text-sm font-medium text-foreground`,children:`Project URL`}),(0,I.jsx)(`input`,{value:r,onChange:e=>o(e.target.value),required:!0,placeholder:`https://yourproject.supabase.co`,className:`w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30`})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`label`,{className:`mb-1.5 block text-sm font-medium text-foreground`,children:`Anon (public) key`}),(0,I.jsx)(`input`,{value:s,onChange:e=>l(e.target.value),required:!0,type:`password`,placeholder:`eyJhbGciOi…`,className:`w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30`})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`label`,{className:`mb-1.5 block text-sm font-medium text-foreground`,children:[`Service-role key `,(0,I.jsx)(`span`,{className:`font-normal text-muted-foreground`,children:`(optional — server jobs only)`})]}),(0,I.jsx)(`input`,{value:f,onChange:e=>p(e.target.value),type:`password`,placeholder:`eyJhbGciOi…`,className:`w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30`}),(0,I.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:`Never used by the browser. Reserved for privileged background jobs.`})]}),m?(0,I.jsx)(`p`,{className:`rounded-lg px-3 py-2 text-sm ${m.ok?`bg-primary/15 text-foreground`:`bg-destructive/10 text-destructive`}`,children:m.message}):null,(0,I.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,I.jsxs)(`button`,{type:`submit`,disabled:E.isPending,className:`inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-50`,children:[E.isPending?(0,I.jsx)(b,{className:`h-4 w-4 animate-spin`}):(0,I.jsx)(x,{className:`h-4 w-4`}),`Save & test connection`]}),t?(0,I.jsxs)(`button`,{type:`button`,onClick:()=>{c(),o(``),l(``),p(``),h(null),e.clear()},className:`inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent`,children:[(0,I.jsx)(_,{className:`h-4 w-4`}),` Disconnect`]}):null]})]}),(0,I.jsxs)(`div`,{className:`mt-6 rounded-lg border border-dashed border-border bg-background p-4`,children:[(0,I.jsx)(`p`,{className:`text-sm font-medium text-foreground`,children:`First-time database setup`}),(0,I.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:`After connecting, create the tables once: open your Supabase dashboard → SQL Editor → New query → paste the setup script → Run. It creates every table, role and security policy the CRM needs.`}),(0,I.jsxs)(`div`,{className:`mt-3 flex flex-wrap gap-2`,children:[(0,I.jsxs)(`button`,{onClick:async()=>{await navigator.clipboard.writeText(F),C(!0),setTimeout(()=>C(!1),2e3)},className:`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent`,children:[(0,I.jsx)(v,{className:`h-4 w-4`}),g?`Copied!`:`Copy setup SQL`]}),(0,I.jsx)(`button`,{onClick:()=>T(!w),className:`rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent`,children:w?`Hide script`:`Preview script`})]}),w?(0,I.jsx)(`pre`,{className:`mt-3 max-h-72 overflow-auto rounded-lg bg-foreground p-4 text-xs text-background`,children:F}):null]})]})}function z({definition:e}){let[t,n]=(0,S.useState)(!1),[r,i]=(0,S.useState)(()=>E(e.id)),[a,o]=(0,S.useState)(null),[s,c]=(0,S.useState)(!1),l=k(e);(0,S.useEffect)(()=>{i(E(e.id))},[e.id]);function u(t){t.preventDefault(),D(e.id,r),n(!1),o({ok:!0,message:`Saved.`})}async function d(){let e=r.baseUrl??r.url??``;if(!e)return;c(!0);let t=await A(e,r.apiKey);o({ok:t.ok,message:t.message}),c(!1)}return(0,I.jsxs)(`section`,{className:`rounded-xl border border-border bg-card p-5 shadow-sm`,children:[(0,I.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h3`,{className:`font-display text-base font-semibold text-foreground`,children:e.name}),(0,I.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:e.description})]}),(0,I.jsx)(L,{ok:l})]}),a?(0,I.jsx)(`p`,{className:`mt-3 rounded-lg px-3 py-2 text-sm ${a.ok?`bg-primary/15 text-foreground`:`bg-destructive/10 text-destructive`}`,children:a.message}):null,t?(0,I.jsxs)(`form`,{onSubmit:u,className:`mt-4 space-y-3`,children:[e.fields.map(e=>(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`label`,{className:`mb-1 block text-sm font-medium text-foreground`,children:[e.label,e.optional?(0,I.jsx)(`span`,{className:`font-normal text-muted-foreground`,children:` (optional)`}):null]}),(0,I.jsx)(`input`,{type:e.secret?`password`:`text`,required:!e.optional,placeholder:e.placeholder,value:r[e.key]??``,onChange:t=>i({...r,[e.key]:t.target.value}),className:`w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30`})]},e.key)),(0,I.jsxs)(`div`,{className:`flex flex-wrap gap-2 pt-1`,children:[(0,I.jsx)(`button`,{type:`submit`,className:`rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90`,children:`Save`}),(0,I.jsx)(`button`,{type:`button`,onClick:()=>n(!1),className:`rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent`,children:`Cancel`})]})]}):(0,I.jsxs)(`div`,{className:`mt-4 flex flex-wrap gap-2`,children:[(0,I.jsx)(`button`,{onClick:()=>n(!0),className:`rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent`,children:l?`Edit keys`:`Add keys`}),l?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(`button`,{onClick:d,disabled:s,className:`inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50`,children:[s?(0,I.jsx)(b,{className:`h-3.5 w-3.5 animate-spin`}):null,`Test`]}),(0,I.jsxs)(`button`,{onClick:()=>{O(e.id),i({}),o(null)},className:`inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10`,children:[(0,I.jsx)(_,{className:`h-3.5 w-3.5`}),` Remove`]})]}):null]})]})}var B=`w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30`;function V({label:e,hint:t,children:n}){return(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`label`,{className:`mb-1.5 block text-sm font-medium text-foreground`,children:e}),n,t?(0,I.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:t}):null]})}function H({title:e,description:t,children:n}){return(0,I.jsxs)(`section`,{className:`rounded-xl border border-border bg-card p-6 shadow-sm`,children:[(0,I.jsx)(`h2`,{className:`font-display text-lg font-semibold text-foreground`,children:e}),(0,I.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:t}),(0,I.jsx)(`div`,{className:`mt-5 space-y-4`,children:n})]})}function U({label:e,value:t,onChange:n}){return(0,I.jsx)(V,{label:e,children:(0,I.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,I.jsx)(`input`,{type:`color`,value:t,onChange:e=>n(e.target.value),className:`h-10 w-12 cursor-pointer rounded-lg border border-input bg-background p-1`,"aria-label":e}),(0,I.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),className:B})]})})}function W({label:e,hint:t,items:n,onChange:r}){let[i,a]=(0,S.useState)(``);return(0,I.jsxs)(V,{label:e,hint:t,children:[(0,I.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:n.map(e=>(0,I.jsxs)(`span`,{className:`inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground`,children:[e,(0,I.jsx)(`button`,{type:`button`,"aria-label":`Remove ${e}`,onClick:()=>r(n.filter(t=>t!==e)),className:`opacity-60 hover:opacity-100`,children:(0,I.jsx)(g,{className:`h-3.5 w-3.5`})})]},e))}),(0,I.jsxs)(`div`,{className:`mt-2 flex gap-2`,children:[(0,I.jsx)(`input`,{value:i,onChange:e=>a(e.target.value),placeholder:`Add an option…`,className:B,onKeyDown:e=>{if(e.key===`Enter`){e.preventDefault();let t=i.trim();t&&!n.includes(t)&&r([...n,t]),a(``)}}}),(0,I.jsx)(`button`,{type:`button`,onClick:()=>{let e=i.trim();e&&!n.includes(e)&&r([...n,e]),a(``)},className:`shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent`,children:`Add`})]})]})}function G(){let e=C.filter(e=>e.id!==`supabase`);return(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsx)(R,{}),(0,I.jsx)(`h2`,{className:`pt-4 font-display text-lg font-semibold text-foreground`,children:`Tools & integrations`}),e.map(e=>(0,I.jsx)(z,{definition:e},e.id))]})}function K(){let{settings:e,update:t,reset:n}=m(),{theme:r,branding:i}=e;return(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsxs)(H,{title:`Brand identity`,description:`Shown in the sidebar, sign-in screen and every page header.`,children:[(0,I.jsx)(V,{label:`Business name`,children:(0,I.jsx)(`input`,{value:i.name,onChange:e=>t({branding:{...i,name:e.target.value}}),className:B})}),(0,I.jsx)(V,{label:`Tagline`,children:(0,I.jsx)(`input`,{value:i.tagline,onChange:e=>t({branding:{...i,tagline:e.target.value}}),className:B})}),(0,I.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,I.jsx)(V,{label:`Logo style`,hint:`Drawn mark stays sharp at any size and animates on hover.`,children:(0,I.jsxs)(`select`,{value:i.logoStyle,onChange:e=>t({branding:{...i,logoStyle:e.target.value}}),className:B,children:[(0,I.jsx)(`option`,{value:`lockup`,children:`Drawn mark (plane + script name + circled N)`}),(0,I.jsx)(`option`,{value:`image`,children:`Logo picture`})]})}),(0,I.jsx)(V,{label:`Monogram letter`,hint:`Used when no logo image is set.`,children:(0,I.jsx)(`input`,{value:i.initial,maxLength:2,onChange:e=>t({branding:{...i,initial:e.target.value}}),className:B})}),(0,I.jsx)(V,{label:`Logo image URL`,hint:`Optional — overrides the monogram.`,children:(0,I.jsx)(`input`,{value:i.logoUrl,placeholder:`https://…`,onChange:e=>t({branding:{...i,logoUrl:e.target.value}}),className:B})}),(0,I.jsx)(V,{label:`Favicon image URL`,hint:`Optional browser-tab icon for your deployed website.`,children:(0,I.jsx)(`input`,{value:i.faviconUrl,placeholder:`https://…`,onChange:e=>t({branding:{...i,faviconUrl:e.target.value}}),className:B})})]})]}),(0,I.jsx)(H,{title:`Colour palette`,description:`Every colour in the console updates live as you change these.`,children:(0,I.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,I.jsx)(U,{label:`Primary`,value:r.primary,onChange:e=>t({theme:{...r,primary:e}})}),(0,I.jsx)(U,{label:`Secondary`,value:r.secondary,onChange:e=>t({theme:{...r,secondary:e}})}),(0,I.jsx)(U,{label:`Accent`,value:r.accent,onChange:e=>t({theme:{...r,accent:e}})}),(0,I.jsx)(U,{label:`Canvas background`,value:r.background,onChange:e=>t({theme:{...r,background:e}})}),(0,I.jsx)(U,{label:`Text colour`,value:r.foreground,onChange:e=>t({theme:{...r,foreground:e}})})]})}),(0,I.jsxs)(H,{title:`Layout feel`,description:`Corner softness, spacing and sidebar tone.`,children:[(0,I.jsx)(V,{label:`Corner radius — ${r.radius}px`,children:(0,I.jsx)(`input`,{type:`range`,min:0,max:24,value:r.radius,onChange:e=>t({theme:{...r,radius:Number(e.target.value)}}),className:`w-full accent-[var(--primary)]`})}),(0,I.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,I.jsx)(V,{label:`Density`,children:(0,I.jsxs)(`select`,{value:r.density,onChange:e=>t({theme:{...r,density:e.target.value}}),className:B,children:[(0,I.jsx)(`option`,{value:`comfortable`,children:`Comfortable`}),(0,I.jsx)(`option`,{value:`compact`,children:`Compact`})]})}),(0,I.jsx)(V,{label:`Sidebar tone`,children:(0,I.jsxs)(`select`,{value:r.sidebarStyle,onChange:e=>t({theme:{...r,sidebarStyle:e.target.value}}),className:B,children:[(0,I.jsx)(`option`,{value:`warm`,children:`Warm`}),(0,I.jsx)(`option`,{value:`plain`,children:`Plain white`})]})}),(0,I.jsx)(V,{label:`Button style`,children:(0,I.jsxs)(`select`,{value:r.buttonStyle,onChange:e=>t({theme:{...r,buttonStyle:e.target.value}}),className:B,children:[(0,I.jsx)(`option`,{value:`soft`,children:`Soft corners`}),(0,I.jsx)(`option`,{value:`square`,children:`Crisp corners`})]})})]}),(0,I.jsx)(V,{label:`Heading scale — ${r.headingScale}%`,children:(0,I.jsx)(`input`,{type:`range`,min:90,max:110,value:r.headingScale,onChange:e=>t({theme:{...r,headingScale:Number(e.target.value)}}),className:`w-full accent-[var(--primary)]`})}),(0,I.jsxs)(`div`,{className:`rounded-lg border border-border bg-background p-5`,children:[(0,I.jsx)(`p`,{className:`text-xs font-bold uppercase text-primary`,children:`Live preview`}),(0,I.jsx)(`p`,{className:`site-display mt-2 font-display text-2xl font-bold text-foreground`,children:`We do. We assist. We connect.`}),(0,I.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`Sora headings, Manrope body copy, and your approved palette.`}),(0,I.jsx)(`button`,{type:`button`,className:`brand-button mt-4 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground`,children:`Primary action`})]}),(0,I.jsxs)(`div`,{className:`border-t border-border pt-5`,children:[(0,I.jsx)(`h3`,{className:`font-display text-base font-semibold text-foreground`,children:`Website presentation`}),(0,I.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:`Choose how published website sections are presented.`}),(0,I.jsxs)(`div`,{className:`mt-4 space-y-3`,children:[(0,I.jsx)(V,{label:`Service section layout`,children:(0,I.jsxs)(`select`,{value:e.websiteAppearance.sectionStyle,onChange:n=>t({websiteAppearance:{...e.websiteAppearance,sectionStyle:n.target.value}}),className:B,children:[(0,I.jsx)(`option`,{value:`zigzag`,children:`Story-led alternating sections`}),(0,I.jsx)(`option`,{value:`grid`,children:`Compact service grid`})]})}),[[`showHeroHighlights`,`Hero trust highlights`],[`showTrustSection`,`Accountability section`],[`showProcessSection`,`How it works`],[`showFaqSection`,`Frequently asked questions`]].map(([n,r])=>(0,I.jsxs)(`label`,{className:`flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground`,children:[r,(0,I.jsx)(`input`,{type:`checkbox`,checked:e.websiteAppearance[n],onChange:r=>t({websiteAppearance:{...e.websiteAppearance,[n]:r.target.checked}}),className:`h-4 w-4 accent-[var(--primary)]`})]},n))]})]}),(0,I.jsx)(`button`,{type:`button`,onClick:n,className:`rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent`,children:`Restore SAFAR defaults`})]})]})}function q(){let{settings:e,update:t}=m();return(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsx)(H,{title:`Menu`,description:`Rename any section or hide the ones you do not use. Settings always stays visible.`,children:e.nav.map((n,r)=>(0,I.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,I.jsx)(`input`,{value:n.label,onChange:i=>{let a=[...e.nav];a[r]={...n,label:i.target.value},t({nav:a})},className:B}),(0,I.jsxs)(`label`,{className:`flex shrink-0 items-center gap-2 text-sm text-muted-foreground`,children:[(0,I.jsx)(`input`,{type:`checkbox`,checked:n.enabled,disabled:n.id===`/settings`,onChange:i=>{let a=[...e.nav];a[r]={...n,enabled:i.target.checked},t({nav:a})},className:`h-4 w-4 accent-[var(--primary)]`}),`Show`]})]},n.id))}),(0,I.jsx)(H,{title:`Money & language`,description:`Used for every amount shown in the console.`,children:(0,I.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,I.jsx)(V,{label:`Currency code`,hint:`INR, AED, SAR, QAR, KWD, OMR, BHD, USD…`,children:(0,I.jsx)(`input`,{value:e.currency,onChange:e=>t({currency:e.target.value.toUpperCase()}),className:B})}),(0,I.jsx)(V,{label:`Number & date format`,hint:`e.g. en-IN, en-AE, ar-SA`,children:(0,I.jsx)(`input`,{value:e.locale,onChange:e=>t({locale:e.target.value}),className:B})})]})})]})}function J(){let{settings:e,update:t}=m(),{retention:n}=e;return(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsxs)(H,{title:`Lead & customer vocabulary`,description:`These options drive the dropdowns across Customers, Vendors and Requests.`,children:[(0,I.jsx)(W,{label:`Where leads come from`,hint:`Each lead records exactly one of these as its origin.`,items:e.leadSources,onChange:e=>t({leadSources:e})}),(0,I.jsx)(W,{label:`Lead statuses`,hint:`The pipeline a lead moves through before conversion.`,items:e.leadStatuses,onChange:e=>t({leadStatuses:e})}),(0,I.jsx)(W,{label:`Customer lifecycle stages`,hint:`Stage shown on every customer profile.`,items:e.lifecycleStages,onChange:e=>t({lifecycleStages:e})}),(0,I.jsx)(W,{label:`Service categories`,hint:`Used for service interest, provider trades and demand reporting.`,items:e.serviceCategories,onChange:e=>t({serviceCategories:e})})]}),(0,I.jsxs)(H,{title:`Retention & churn rules`,description:`How long a customer can stay quiet before the team is prompted to reach out.`,children:[(0,I.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,I.jsx)(V,{label:`At risk after (days of silence)`,children:(0,I.jsx)(`input`,{type:`number`,min:1,value:n.defaultInactivityDays,onChange:e=>t({retention:{...n,defaultInactivityDays:Number(e.target.value)}}),className:B})}),(0,I.jsx)(V,{label:`Treat as churned after (days)`,children:(0,I.jsx)(`input`,{type:`number`,min:1,value:n.churnedAfterDays,onChange:e=>t({retention:{...n,churnedAfterDays:Number(e.target.value)}}),className:B})})]}),(0,I.jsxs)(`label`,{className:`flex items-center gap-2 text-sm text-foreground`,children:[(0,I.jsx)(`input`,{type:`checkbox`,checked:n.autoFollowUpTask,onChange:e=>t({retention:{...n,autoFollowUpTask:e.target.checked}}),className:`h-4 w-4 accent-[var(--primary)]`}),`Create a follow-up task automatically when a customer goes quiet`]}),(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`p`,{className:`mb-2 text-sm font-medium text-foreground`,children:[`Per-category exceptions`,(0,I.jsx)(`span`,{className:`ml-1 font-normal text-muted-foreground`,children:`(groceries go quiet faster than legal work)`})]}),(0,I.jsx)(`div`,{className:`space-y-2`,children:n.categoryOverrides.map((r,i)=>(0,I.jsxs)(`div`,{className:`flex gap-2`,children:[(0,I.jsx)(`select`,{value:r.category,onChange:e=>{let a=[...n.categoryOverrides];a[i]={...r,category:e.target.value},t({retention:{...n,categoryOverrides:a}})},className:B,children:e.serviceCategories.map(e=>(0,I.jsx)(`option`,{value:e,children:e},e))}),(0,I.jsx)(`input`,{type:`number`,min:1,value:r.days,onChange:e=>{let a=[...n.categoryOverrides];a[i]={...r,days:Number(e.target.value)},t({retention:{...n,categoryOverrides:a}})},className:`w-28 rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30`}),(0,I.jsx)(`button`,{type:`button`,"aria-label":`Remove exception`,onClick:()=>t({retention:{...n,categoryOverrides:n.categoryOverrides.filter((e,t)=>t!==i)}}),className:`shrink-0 rounded-lg border border-border px-3 text-destructive hover:bg-destructive/10`,children:(0,I.jsx)(_,{className:`h-4 w-4`})})]},`${r.category}-${i}`))}),(0,I.jsx)(`button`,{type:`button`,onClick:()=>t({retention:{...n,categoryOverrides:[...n.categoryOverrides,{category:e.serviceCategories[0]??``,days:n.defaultInactivityDays}]}}),className:`mt-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent`,children:`Add exception`})]})]})]})}function Y(){let e=r(),[t,n]=(0,S.useState)(j),[i,a]=(0,S.useState)(!1),[o,s]=(0,S.useState)(!1);(0,S.useEffect)(()=>{!e||i||N().then(e=>{n(e),a(!0)}).catch(()=>a(!0))},[e,i]);async function c(){s(!0);try{await P(t),f.success(`Scoring saved`)}catch(e){f.error(e instanceof Error?e.message:`Could not save`)}finally{s(!1)}}return(0,I.jsx)(`div`,{className:`space-y-4`,children:(0,I.jsxs)(H,{title:`Lead scoring`,description:`Points show how much interest someone has shown on the website. They do not say how sure we are about who the person is.`,children:[(0,I.jsx)(`div`,{className:`space-y-2`,children:t.rules.map((e,r)=>(0,I.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 rounded-lg border border-border p-3`,children:[(0,I.jsxs)(`label`,{className:`flex flex-1 items-center gap-2 text-sm text-foreground`,children:[(0,I.jsx)(`input`,{type:`checkbox`,checked:e.enabled,onChange:i=>{let a=[...t.rules];a[r]={...e,enabled:i.target.checked},n({...t,rules:a})}}),e.label]}),(0,I.jsx)(`input`,{type:`number`,value:e.points,onChange:i=>{let a=[...t.rules];a[r]={...e,points:Number(i.target.value)||0},n({...t,rules:a})},className:`w-24 rounded-lg border border-input bg-background px-3 py-2 text-sm`})]},e.id))}),(0,I.jsxs)(`div`,{className:`mt-4 grid gap-4 sm:grid-cols-2`,children:[(0,I.jsx)(V,{label:`Warm from`,hint:`Points needed before a lead counts as warm.`,children:(0,I.jsx)(`input`,{type:`number`,value:t.warmFrom,onChange:e=>n({...t,warmFrom:Number(e.target.value)||0}),className:`w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm`})}),(0,I.jsx)(V,{label:`Hot from`,hint:`Points needed before a lead counts as hot.`,children:(0,I.jsx)(`input`,{type:`number`,value:t.hotFrom,onChange:e=>n({...t,hotFrom:Number(e.target.value)||0}),className:`w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm`})})]}),(0,I.jsxs)(`div`,{className:`mt-4 flex gap-3`,children:[(0,I.jsx)(`button`,{type:`button`,onClick:c,disabled:!e||o,className:`rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60`,children:`Save scoring`}),(0,I.jsx)(`button`,{type:`button`,onClick:()=>n(j),className:`rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground`,children:`Back to defaults`})]}),e?null:(0,I.jsx)(`p`,{className:`mt-3 text-sm text-muted-foreground`,children:`Connect your database first to save these points for the whole team.`})]})})}var X=[{id:`connections`,label:`Connections`},{id:`appearance`,label:`Appearance`},{id:`workspace`,label:`Workspace`},{id:`rules`,label:`Business rules`},{id:`scoring`,label:`Lead scoring`}];function Z(){let[e,t]=(0,S.useState)(`connections`);return(0,I.jsxs)(`div`,{className:`mx-auto max-w-3xl`,children:[(0,I.jsx)(l,{title:`Settings`,description:`Connect the database and every tool, and shape how the whole console looks and behaves. Keys you paste here stay on your devices — never in the code, never in the repos.`}),(0,I.jsx)(`div`,{className:`mb-5 flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1`,children:X.map(n=>(0,I.jsx)(`button`,{onClick:()=>t(n.id),className:`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${e===n.id?`bg-primary text-primary-foreground`:`text-muted-foreground hover:bg-accent`}`,children:n.label},n.id))}),e===`connections`?(0,I.jsx)(G,{}):null,e===`appearance`?(0,I.jsx)(K,{}):null,e===`workspace`?(0,I.jsx)(q,{}):null,e===`rules`?(0,I.jsx)(J,{}):null,e===`scoring`?(0,I.jsx)(Y,{}):null]})}export{Z as component};