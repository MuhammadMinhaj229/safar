import { r as __toESM } from "../_runtime.mjs";
import { i as performance_default } from "../_libs/h3-v2+rou3+srvx+unenv.mjs";
import { a as saveStoredSupabaseConfig, i as isSupabaseConfigured, n as getStoredSupabaseConfig, o as testSupabaseConnection, r as getSupabase, t as clearStoredSupabaseConfig } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { i as useWorkspaceSettings } from "./brand-mark-BwZJuO4D.mjs";
import { G as CircleX, H as Database, K as CircleCheck, S as PlugZap, W as ClipboardCopy, c as Trash2, j as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CxiUoMMi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INTEGRATIONS = [
	{
		id: "supabase",
		name: "Database (Supabase)",
		description: "The single source of truth for customers, invoices, vendors and the website.",
		fields: [
			{
				key: "url",
				label: "Project URL",
				placeholder: "https://yourproject.supabase.co",
				secret: false
			},
			{
				key: "anonKey",
				label: "Anon (public) key",
				placeholder: "eyJhbGciOi…",
				secret: true
			},
			{
				key: "serviceRoleKey",
				label: "Service-role key (server jobs only)",
				placeholder: "eyJhbGciOi…",
				secret: true,
				optional: true
			}
		]
	},
	{
		id: "whatsapp",
		name: "WhatsApp (Evolution API)",
		description: "Self-hosted WhatsApp Web engine: QR pairing, inbox, quick replies, broadcasts.",
		fields: [
			{
				key: "baseUrl",
				label: "Server URL",
				placeholder: "https://wa.yourdomain.com",
				secret: false
			},
			{
				key: "apiKey",
				label: "API key",
				placeholder: "Global or instance API key",
				secret: true
			},
			{
				key: "instance",
				label: "Instance name",
				placeholder: "safar",
				secret: false,
				optional: true
			}
		]
	},
	{
		id: "invoify",
		name: "Safar Invoify",
		description: "Professional invoice generator, linked to customers and service requests.",
		fields: [{
			key: "baseUrl",
			label: "Invoify URL",
			placeholder: "https://invoice.yourdomain.com",
			secret: false
		}, {
			key: "syncKey",
			label: "Sync key",
			placeholder: "Shared secret for invoice sync",
			secret: true,
			optional: true
		}]
	},
	{
		id: "social",
		name: "Social Media Scheduler",
		description: "Buffer-style scheduled posting across Instagram, Facebook, LinkedIn and X.",
		fields: [{
			key: "baseUrl",
			label: "Scheduler URL",
			placeholder: "https://social.yourdomain.com",
			secret: false
		}, {
			key: "apiKey",
			label: "API key",
			placeholder: "Scheduler API key",
			secret: true,
			optional: true
		}]
	},
	{
		id: "finance",
		name: "Finance & Investments",
		description: "Cash flow, expenses, capital investments and provider payouts ledger.",
		fields: [{
			key: "baseUrl",
			label: "Finance URL (optional external ledger)",
			placeholder: "https://finance.yourdomain.com",
			secret: false,
			optional: true
		}, {
			key: "apiKey",
			label: "API key",
			placeholder: "Ledger API key",
			secret: true,
			optional: true
		}]
	}
];
var STORAGE_KEY = "safar.integrations.config";
function readAll() {
	if (typeof window === "undefined") return {};
	try {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
	} catch {
		return {};
	}
}
function getIntegrationValues(id) {
	return readAll()[id] ?? {};
}
function saveIntegrationValues(id, values) {
	const all = readAll();
	all[id] = values;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
function removeIntegrationValues(id) {
	const all = readAll();
	delete all[id];
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
function isIntegrationConfigured(definition) {
	const values = getIntegrationValues(definition.id);
	const requiredOk = definition.fields.filter((field) => !field.optional).every((field) => Boolean(values[field.key]?.trim()));
	const anyFilled = definition.fields.some((field) => Boolean(values[field.key]?.trim()));
	return requiredOk && anyFilled;
}
/** Generic reachability probe for non-database integrations. */
async function testHttpEndpoint(url, apiKey) {
	const started = performance_default.now();
	try {
		const response = await fetch(url.replace(/\/+$/, ""), {
			method: "GET",
			headers: apiKey ? {
				apikey: apiKey,
				Authorization: `Bearer ${apiKey}`
			} : {},
			mode: "cors"
		});
		const latencyMs = Math.round(performance_default.now() - started);
		return {
			ok: response.status < 500,
			latencyMs,
			message: response.status < 500 ? `Reachable (${response.status}) in ${latencyMs} ms` : `Server error ${response.status}`
		};
	} catch {
		return {
			ok: false,
			latencyMs: Math.round(performance_default.now() - started),
			message: "Unreachable — check the URL and that the service is running"
		};
	}
}
/**
* Lead scoring — a simple, editable points system.
*
* Score means "how much interest has this person shown", not "how sure
* we are who they are". Rules are saved in `app_settings` under the key
* `lead_scoring`, so the team can change them without any code change.
*/
var DEFAULT_SCORING = {
	hotFrom: 60,
	warmFrom: 30,
	rules: [
		{
			id: "page",
			label: "Looked at a page",
			match: "page.viewed",
			points: 1,
			enabled: true
		},
		{
			id: "service",
			label: "Opened a service",
			match: "service.viewed",
			points: 5,
			enabled: true
		},
		{
			id: "price",
			label: "Looked at prices",
			match: "pricing.viewed",
			points: 8,
			enabled: true
		},
		{
			id: "faq",
			label: "Read the FAQ",
			match: "faq.opened",
			points: 3,
			enabled: true
		},
		{
			id: "cta",
			label: "Clicked a button",
			match: "cta.clicked",
			points: 5,
			enabled: true
		},
		{
			id: "form_start",
			label: "Started the form",
			match: "form.started",
			points: 8,
			enabled: true
		},
		{
			id: "form",
			label: "Sent the form",
			match: "form.submitted",
			points: 25,
			enabled: true
		},
		{
			id: "whatsapp",
			label: "Clicked WhatsApp",
			match: "whatsapp.clicked",
			points: 25,
			enabled: true
		},
		{
			id: "call",
			label: "Clicked the phone number",
			match: "phone.clicked",
			points: 20,
			enabled: true
		},
		{
			id: "email",
			label: "Clicked the email",
			match: "email.clicked",
			points: 12,
			enabled: true
		},
		{
			id: "repeat",
			label: "Came back another day",
			match: "session.returning",
			points: 10,
			enabled: true
		}
	]
};
function mergeScoring(value) {
	if (!value || typeof value !== "object") return DEFAULT_SCORING;
	const raw = value;
	return {
		hotFrom: typeof raw.hotFrom === "number" ? raw.hotFrom : DEFAULT_SCORING.hotFrom,
		warmFrom: typeof raw.warmFrom === "number" ? raw.warmFrom : DEFAULT_SCORING.warmFrom,
		rules: Array.isArray(raw.rules) && raw.rules.length ? raw.rules : DEFAULT_SCORING.rules
	};
}
async function loadScoring() {
	const supabase = getSupabase();
	if (!supabase) return DEFAULT_SCORING;
	const { data } = await supabase.from("app_settings").select("value").eq("key", "lead_scoring").maybeSingle();
	return mergeScoring(data?.value);
}
async function saveScoring(config) {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	const { data: userData } = await supabase.auth.getUser();
	const { error } = await supabase.from("app_settings").upsert({
		key: "lead_scoring",
		value: config,
		updated_by: userData.user?.id ?? null
	}, { onConflict: "key" });
	if (error) throw new Error(error.message);
}
var foundation_default = "-- SAFAR N MANZIL — Foundation schema\n-- Run once in your Supabase project's SQL editor (Dashboard → SQL Editor → New query → paste → Run).\n-- Creates the core business tables, roles, row-level security and audit log.\n\ncreate extension if not exists pgcrypto;\n\n-- ---------- Organizations: the three ventures stay separate ----------\ncreate table if not exists public.organizations (\n  id uuid primary key default gen_random_uuid(),\n  slug text not null unique, -- safar-n-manzil | safa-fresh | safa-foods\n  name text not null,\n  created_at timestamptz not null default now()\n);\n\n-- ---------- Roles ----------\ndo $$ begin\n  create type public.app_role as enum\n    ('super_admin', 'admin', 'ops_manager', 'sales_agent', 'finance_officer', 'viewer');\nexception when duplicate_object then null;\nend $$;\n\ncreate table if not exists public.profiles (\n  id uuid primary key default gen_random_uuid(),\n  full_name text,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists public.user_roles (\n  id uuid primary key default gen_random_uuid(),\n  user_id uuid not null references auth.users(id) on delete cascade,\n  role public.app_role not null,\n  unique (user_id, role)\n);\n\ncreate or replace function public.has_role(_user_id uuid, _role public.app_role)\nreturns boolean\nlanguage sql stable security definer set search_path = public\nas $$\n  select exists (\n    select 1 from public.user_roles\n    where user_id = _user_id and role = _role\n  )\n$$;\n\ncreate or replace function public.is_team(_user_id uuid)\nreturns boolean\nlanguage sql stable security definer set search_path = public\nas $$\n  select exists (select 1 from public.user_roles where user_id = _user_id)\n$$;\n\ncreate or replace function public.can_write(_user_id uuid)\nreturns boolean\nlanguage sql stable security definer set search_path = public\nas $$\n  select exists (\n    select 1 from public.user_roles\n    where user_id = _user_id and role <> 'viewer'\n  )\n$$;\n\n-- ---------- CRM core ----------\ncreate table if not exists public.leads (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  name text not null,\n  phone text,\n  email text,\n  source text not null default 'manual', -- website | whatsapp | instagram | facebook | referral | manual | campaign | api\n  source_detail text,\n  campaign text,\n  service_interest text,\n  location text,\n  status text not null default 'new', -- new | contacted | qualified | converted | lost\n  assigned_to uuid references auth.users(id),\n  notes text,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists public.contacts (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  lead_id uuid references public.leads(id),\n  name text not null,\n  phone text,\n  phone_normalized text,\n  email text,\n  email_normalized text,\n  whatsapp text,\n  gulf_country text,\n  gulf_city text,\n  india_address text,\n  lifecycle_status text not null default 'customer',\n  -- qualified | converted | customer | active | inactive | churn_risk | reactivated | lost\n  tags text[] not null default '{}',\n  notes text,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate unique index if not exists contacts_phone_normalized_key\n  on public.contacts (phone_normalized) where phone_normalized is not null;\ncreate unique index if not exists contacts_email_normalized_key\n  on public.contacts (email_normalized) where email_normalized is not null;\n\ncreate table if not exists public.provider_categories (\n  id uuid primary key default gen_random_uuid(),\n  name text not null unique -- ac_repair | legal | healthcare | parcel | grocery | ...\n);\n\ncreate table if not exists public.providers (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  category_id uuid references public.provider_categories(id),\n  name text not null,\n  business_name text,\n  phone text,\n  whatsapp text,\n  email text,\n  city text,\n  service_areas text[] not null default '{}',\n  verification_status text not null default 'pending', -- pending | verified | suspended\n  availability text not null default 'available', -- available | busy | offline\n  is_primary boolean not null default false,\n  rate_card jsonb not null default '{}',\n  rating numeric(3,2),\n  notes text,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists public.service_requests (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  contact_id uuid not null references public.contacts(id),\n  title text not null,\n  description text,\n\n  service_category text,\n  status text not null default 'open', -- open | in_progress | waiting | completed | cancelled\n  priority text not null default 'normal', -- low | normal | high | urgent\n  assigned_provider_id uuid references public.providers(id),\n  created_by uuid references auth.users(id),\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now(),\n  completed_at timestamptz\n);\n\n-- ---------- Finance: structured money, never notes ----------\ncreate table if not exists public.invoices (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  contact_id uuid not null references public.contacts(id),\n  service_request_id uuid references public.service_requests(id),\n  invoice_number text not null unique,\n  status text not null default 'draft', -- draft | sent | paid | partially_paid | cancelled | refunded\n  currency char(3) not null default 'INR',\n  subtotal numeric(14,2) not null default 0,\n  third_party_cost numeric(14,2) not null default 0,\n  safar_fee numeric(14,2) not null default 0,\n  tax numeric(14,2) not null default 0,\n  discount numeric(14,2) not null default 0,\n  total numeric(14,2) not null default 0,\n  amount_paid numeric(14,2) not null default 0,\n  outstanding numeric(14,2) not null default 0,\n  issued_at timestamptz,\n  due_at timestamptz,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists public.invoice_items (\n  id uuid primary key default gen_random_uuid(),\n  invoice_id uuid not null references public.invoices(id) on delete cascade,\n  description text not null,\n  quantity numeric(10,2) not null default 1,\n  unit_price numeric(14,2) not null,\n  line_total numeric(14,2) not null\n);\n\ncreate table if not exists public.payments (\n  id uuid primary key default gen_random_uuid(),\n  invoice_id uuid not null references public.invoices(id),\n  amount numeric(14,2) not null,\n  method text, -- upi | bank_transfer | cash | card\n  reference text,\n  paid_at timestamptz not null default now()\n);\n\ncreate table if not exists public.expenses (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  category text not null, -- operating | capital_investment | marketing | salary | other\n  description text not null,\n  amount numeric(14,2) not null,\n  spent_at date not null default current_date,\n  created_by uuid references auth.users(id),\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists public.provider_payables (\n  id uuid primary key default gen_random_uuid(),\n  provider_id uuid not null references public.providers(id),\n  service_request_id uuid references public.service_requests(id),\n  amount numeric(14,2) not null,\n  status text not null default 'owed', -- owed | paid\n  paid_at timestamptz,\n  created_at timestamptz not null default now()\n);\n\n-- ---------- Communication ----------\ncreate table if not exists public.conversations (\n  id uuid primary key default gen_random_uuid(),\n  contact_id uuid references public.contacts(id),\n  channel text not null default 'whatsapp',\n  last_message_at timestamptz,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists public.messages (\n  id uuid primary key default gen_random_uuid(),\n  conversation_id uuid not null references public.conversations(id) on delete cascade,\n  direction text not null, -- inbound | outbound\n  body text,\n  media_url text,\n  external_id text, -- idempotency key from WhatsApp\n  sent_at timestamptz not null default now()\n);\ncreate unique index if not exists messages_external_id_key\n  on public.messages (external_id) where external_id is not null;\n\n-- ---------- CMS ----------\ncreate table if not exists public.cms_sections (\n  id uuid primary key default gen_random_uuid(),\n  page text not null default 'home',\n  section_key text not null, -- hero | services | trust | how_it_works | testimonials | cta | faq | contact | footer\n  content jsonb not null default '{}',        -- published content\n  draft_content jsonb,                        -- work in progress, not public\n\n  status text not null default 'draft', -- draft | published\n  version int not null default 1,\n  updated_by uuid references auth.users(id),\n  updated_at timestamptz not null default now(),\n  unique (page, section_key)\n);\n\n-- safe to re-run on an existing install\nalter table public.cms_sections add column if not exists draft_content jsonb;\nalter table public.service_requests add column if not exists description text;\n\n\n\ncreate table if not exists public.cms_revisions (\n  id uuid primary key default gen_random_uuid(),\n  section_id uuid not null references public.cms_sections(id) on delete cascade,\n  content jsonb not null,\n  version int not null,\n  saved_by uuid references auth.users(id),\n  saved_at timestamptz not null default now()\n);\n\n-- Shared presentation and workspace configuration. Public reads only the\n-- non-secret workspace row; only signed-in administrators can change it.\ncreate table if not exists public.app_settings (\n  key text primary key,\n  value jsonb not null default '{}',\n  updated_by uuid references auth.users(id),\n  updated_at timestamptz not null default now()\n);\n\n-- ---------- Operations ----------\ncreate table if not exists public.tasks (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  title text not null,\n  kind text not null default 'general', -- general | follow_up | handoff | churn_check\n  priority text not null default 'normal',\n  status text not null default 'open', -- open | done | cancelled\n  contact_id uuid references public.contacts(id),\n  assigned_to uuid references auth.users(id),\n  due_at timestamptz,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists public.integrations (\n  id uuid primary key default gen_random_uuid(),\n  key text not null unique, -- supabase | whatsapp | invoify | social | finance\n  status text not null default 'disconnected', -- connected | paused | failed | disconnected\n  config jsonb not null default '{}', -- non-secret config only\n  last_ok_at timestamptz,\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists public.audit_logs (\n  id uuid primary key default gen_random_uuid(),\n  actor_id uuid references auth.users(id),\n  action text not null,\n  entity text not null,\n  entity_id uuid,\n  before jsonb,\n  after jsonb,\n  created_at timestamptz not null default now()\n);\n\n-- ---------- Grants ----------\ngrant select, insert, update, delete on all tables in schema public to authenticated;\ngrant all on all tables in schema public to service_role;\ngrant select on public.cms_sections to anon;\ngrant select on public.app_settings to anon;\ngrant select, insert, update, delete on public.app_settings to authenticated;\ngrant all on public.app_settings to service_role;\n\n-- ---------- RLS ----------\nalter table public.organizations enable row level security;\nalter table public.profiles enable row level security;\nalter table public.user_roles enable row level security;\nalter table public.leads enable row level security;\nalter table public.contacts enable row level security;\nalter table public.service_requests enable row level security;\nalter table public.provider_categories enable row level security;\nalter table public.providers enable row level security;\nalter table public.invoices enable row level security;\nalter table public.invoice_items enable row level security;\nalter table public.payments enable row level security;\nalter table public.expenses enable row level security;\nalter table public.provider_payables enable row level security;\nalter table public.conversations enable row level security;\nalter table public.messages enable row level security;\nalter table public.cms_sections enable row level security;\nalter table public.cms_revisions enable row level security;\nalter table public.tasks enable row level security;\nalter table public.integrations enable row level security;\nalter table public.audit_logs enable row level security;\nalter table public.app_settings enable row level security;\n\ncreate policy team_read_organizations on public.organizations for select to authenticated using (true);\ncreate policy team_read_profiles on public.profiles for select to authenticated using (public.is_team(auth.uid()));\ncreate policy team_read_user_roles on public.user_roles for select to authenticated using (public.is_team(auth.uid()));\n\n-- Read for any team member, write for non-viewers, delete for admins.\ndo $$\ndeclare t text;\nbegin\n  foreach t in array array[\n    'leads','contacts','service_requests','provider_categories','providers',\n    'invoices','invoice_items','payments','expenses','provider_payables',\n    'conversations','messages','tasks','cms_sections','cms_revisions'\n  ] loop\n    execute format('create policy team_read_%1$s on public.%1$s for select to authenticated using (public.is_team(auth.uid()))', t);\n    execute format('create policy team_write_%1$s on public.%1$s for insert to authenticated with check (public.can_write(auth.uid()))', t);\n    execute format('create policy team_update_%1$s on public.%1$s for update to authenticated using (public.can_write(auth.uid()))', t);\n    execute format('create policy admin_delete_%1$s on public.%1$s for delete to authenticated using (public.has_role(auth.uid(), ''super_admin'') or public.has_role(auth.uid(), ''admin''))', t);\n  end loop;\nend $$;\n\ncreate policy admin_integrations on public.integrations for all to authenticated\n  using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'))\n  with check (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'));\ncreate policy team_read_audit on public.audit_logs for select to authenticated\n  using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'));\ncreate policy team_insert_audit on public.audit_logs for insert to authenticated\n  with check (public.is_team(auth.uid()));\n\n-- Public website reads only published CMS sections.\ncreate policy public_read_published_cms on public.cms_sections for select to anon\n  using (status = 'published');\ncreate policy public_read_workspace_settings on public.app_settings for select to anon\n  using (key = 'workspace');\ncreate policy team_read_workspace_settings on public.app_settings for select to authenticated\n  using (public.is_team(auth.uid()));\ncreate policy admin_write_workspace_settings on public.app_settings for all to authenticated\n  using (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'))\n  with check (public.has_role(auth.uid(), 'super_admin') or public.has_role(auth.uid(), 'admin'));\n\n-- Seed the three ventures (identity only, no business data).\ninsert into public.organizations (slug, name) values\n  ('safar-n-manzil', 'SAFAR N MANZIL'),\n  ('safa-fresh', 'SAFA FRESH'),\n  ('safa-foods', 'SAFA FOODS')\non conflict (slug) do nothing;\n\n-- ============================================================\n-- VISITOR INTELLIGENCE, IDENTITY AND EVENT BACKBONE\n-- Safe to re-run. Adds website tracking and the customer journey.\n-- ============================================================\n\n-- Anonymous website visitor. Never holds personal information until\n-- the person identifies themselves through a form or a message.\ncreate table if not exists public.visitors (\n  id uuid primary key default gen_random_uuid(),\n  visitor_key text not null unique,      -- first-party id stored in the browser\n  contact_id uuid references public.contacts(id) on delete set null,\n  first_seen_at timestamptz not null default now(),\n  last_seen_at timestamptz not null default now(),\n  first_landing_page text,\n  first_referrer text,\n  first_utm_source text,\n  first_utm_medium text,\n  first_utm_campaign text,\n  session_count integer not null default 0,\n  event_count integer not null default 0\n);\n\ncreate table if not exists public.visitor_sessions (\n  id uuid primary key default gen_random_uuid(),\n  session_key text not null unique,\n  visitor_key text not null,\n  started_at timestamptz not null default now(),\n  last_event_at timestamptz not null default now(),\n  landing_page text,\n  referrer text,\n  utm_source text,\n  utm_medium text,\n  utm_campaign text,\n  utm_term text,\n  utm_content text,\n  device text,\n  browser text,\n  os text,\n  language text,\n  country text\n);\n\n-- One row per meaningful action on the public website.\ncreate table if not exists public.events (\n  id uuid primary key default gen_random_uuid(),\n  event_key text not null unique,        -- client generated; makes retries harmless\n  name text not null,                    -- page.viewed | service.viewed | whatsapp.clicked | ...\n  visitor_key text not null,\n  session_key text,\n  contact_id uuid references public.contacts(id) on delete set null,\n  lead_id uuid references public.leads(id) on delete set null,\n  route text,\n  page_title text,\n  properties jsonb not null default '{}',\n  occurred_at timestamptz not null default now(),\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists events_visitor_idx on public.events (visitor_key, occurred_at desc);\ncreate index if not exists events_contact_idx on public.events (contact_id, occurred_at desc);\ncreate index if not exists events_name_idx on public.events (name, occurred_at desc);\ncreate index if not exists visitor_sessions_visitor_idx on public.visitor_sessions (visitor_key, started_at desc);\n\n-- Which anonymous device belongs to which known person, and why we believe it.\ncreate table if not exists public.identity_links (\n  id uuid primary key default gen_random_uuid(),\n  visitor_key text not null,\n  contact_id uuid not null references public.contacts(id) on delete cascade,\n  signal text not null,                  -- form | whatsapp | phone | email | manual\n  confidence text not null default 'confirmed', -- confirmed | probable\n  linked_at timestamptz not null default now(),\n  unique (visitor_key, contact_id)\n);\n\n-- Anything we are not sure about waits here for a human decision.\ncreate table if not exists public.identity_review_queue (\n  id uuid primary key default gen_random_uuid(),\n  visitor_key text,\n  candidate_contact_id uuid references public.contacts(id) on delete cascade,\n  reason text not null,\n  payload jsonb not null default '{}',\n  status text not null default 'open',   -- open | merged | dismissed\n  created_at timestamptz not null default now(),\n  resolved_at timestamptz,\n  resolved_by uuid references auth.users(id)\n);\n\n-- ---------- Marketing attribution ----------\ncreate table if not exists public.campaigns (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  name text not null,\n  utm_source text,\n  utm_medium text,\n  utm_campaign text unique,\n  channel text,\n  started_on date,\n  ended_on date,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists public.attribution_touches (\n  id uuid primary key default gen_random_uuid(),\n  visitor_key text,\n  contact_id uuid references public.contacts(id) on delete cascade,\n  lead_id uuid references public.leads(id) on delete cascade,\n  touch_type text not null,              -- first | latest | conversion\n  source text,\n  medium text,\n  campaign text,\n  landing_page text,\n  occurred_at timestamptz not null default now()\n);\n\n-- ---------- Lead history, scoring and feedback ----------\ncreate table if not exists public.lead_events (\n  id uuid primary key default gen_random_uuid(),\n  lead_id uuid not null references public.leads(id) on delete cascade,\n  kind text not null,                    -- status_changed | assigned | note | scored | contacted\n  detail text,\n  from_value text,\n  to_value text,\n  actor_id uuid references auth.users(id),\n  created_at timestamptz not null default now()\n);\n\nalter table public.leads add column if not exists visitor_key text;\nalter table public.leads add column if not exists score integer not null default 0;\nalter table public.leads add column if not exists score_updated_at timestamptz;\nalter table public.leads add column if not exists contact_id uuid references public.contacts(id) on delete set null;\nalter table public.leads add column if not exists consent_marketing boolean not null default false;\n\ncreate table if not exists public.feedback (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  contact_id uuid references public.contacts(id) on delete cascade,\n  service_request_id uuid references public.service_requests(id) on delete set null,\n  rating integer check (rating between 1 and 5),\n  comment text,\n  channel text not null default 'website',\n  status text not null default 'received', -- received | reviewed | actioned\n  created_at timestamptz not null default now()\n);\n\n-- ---------- Channels, automation and reliability ----------\ncreate table if not exists public.social_accounts (\n  id uuid primary key default gen_random_uuid(),\n  platform text not null,                -- instagram | facebook | google_business | linkedin | youtube\n  account_label text not null,\n  external_id text,\n  status text not null default 'disconnected',\n  config jsonb not null default '{}',    -- non-secret config only\n  last_ok_at timestamptz,\n  created_at timestamptz not null default now(),\n  unique (platform, account_label)\n);\n\ncreate table if not exists public.automations (\n  id uuid primary key default gen_random_uuid(),\n  name text not null,\n  trigger_event text not null,\n  conditions jsonb not null default '[]',\n  actions jsonb not null default '[]',\n  is_active boolean not null default true,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists public.automation_runs (\n  id uuid primary key default gen_random_uuid(),\n  automation_id uuid references public.automations(id) on delete cascade,\n  event_key text,\n  status text not null,                  -- success | skipped | failed\n  detail text,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists public.webhook_events (\n  id uuid primary key default gen_random_uuid(),\n  provider text not null,\n  external_id text,\n  event_type text,\n  payload jsonb not null default '{}',\n  processing_status text not null default 'received', -- received | processed | failed\n  error text,\n  retry_count integer not null default 0,\n  received_at timestamptz not null default now(),\n  unique (provider, external_id)\n);\n\ncreate table if not exists public.notifications (\n  id uuid primary key default gen_random_uuid(),\n  kind text not null,                    -- high_priority_lead | sla_breach | automation_failed | integration_down\n  title text not null,\n  body text,\n  entity text,\n  entity_id uuid,\n  severity text not null default 'info', -- info | warning | critical\n  read_at timestamptz,\n  created_at timestamptz not null default now()\n);\n\n-- Single place for services, prices, areas, hours, FAQs and policies.\ncreate table if not exists public.knowledge_entries (\n  id uuid primary key default gen_random_uuid(),\n  organization_id uuid references public.organizations(id),\n  category text not null,                -- service | price | area | hours | faq | policy | offer | brand\n  code text,\n  title text not null,\n  body text,\n  amount numeric(14,2),\n  currency text not null default 'INR',\n  metadata jsonb not null default '{}',\n  is_public boolean not null default false,\n  sort_order integer not null default 0,\n  updated_at timestamptz not null default now(),\n  unique (category, code)\n);\n\n-- ---------- Grants ----------\ngrant select, insert, update, delete on all tables in schema public to authenticated;\ngrant all on all tables in schema public to service_role;\n\n-- The public website may only ADD its own tracking rows and enquiries.\ngrant insert on public.visitors to anon;\ngrant insert, update on public.visitor_sessions to anon;\ngrant insert on public.events to anon;\ngrant insert on public.leads to anon;\ngrant insert on public.feedback to anon;\ngrant select on public.knowledge_entries to anon;\n\n-- ---------- Row level security ----------\ndo $$\ndeclare t text;\nbegin\n  foreach t in array array[\n    'visitors','visitor_sessions','events','identity_links','identity_review_queue',\n    'campaigns','attribution_touches','lead_events','feedback','social_accounts',\n    'automations','automation_runs','webhook_events','notifications','knowledge_entries'\n  ] loop\n    execute format('alter table public.%1$s enable row level security', t);\n    begin\n      execute format('create policy team_read_%1$s on public.%1$s for select to authenticated using (public.is_team(auth.uid()))', t);\n      execute format('create policy team_write_%1$s on public.%1$s for insert to authenticated with check (public.can_write(auth.uid()))', t);\n      execute format('create policy team_update_%1$s on public.%1$s for update to authenticated using (public.can_write(auth.uid()))', t);\n      execute format('create policy admin_delete_%1$s on public.%1$s for delete to authenticated using (public.has_role(auth.uid(), ''super_admin'') or public.has_role(auth.uid(), ''admin''))', t);\n    exception when duplicate_object then null;\n    end;\n  end loop;\nend $$;\n\ndo $$\nbegin\n  create policy public_insert_visitors on public.visitors for insert to anon with check (true);\n  create policy public_insert_sessions on public.visitor_sessions for insert to anon with check (true);\n  create policy public_update_sessions on public.visitor_sessions for update to anon using (true) with check (true);\n  create policy public_insert_events on public.events for insert to anon with check (contact_id is null and lead_id is null);\n  create policy public_insert_leads on public.leads for insert to anon with check (source = 'website');\n  create policy public_insert_feedback on public.feedback for insert to anon with check (true);\n  create policy public_read_knowledge on public.knowledge_entries for select to anon using (is_public);\nexception when duplicate_object then null;\nend $$;\n\n-- ============================================================\n-- Phase D — Conversations, integrations, social and automation\n-- Additive only. Safe to run again.\n-- ============================================================\n\ncreate table if not exists public.conversations (\n  id uuid primary key default gen_random_uuid(),\n  channel text not null,                    -- whatsapp | instagram | facebook | email | web\n  account_id text,                          -- which connected account/number\n  external_id text,                         -- chat id at the provider\n  contact_id uuid references public.contacts(id) on delete set null,\n  lead_id uuid references public.leads(id) on delete set null,\n  display_name text,\n  phone text,\n  status text not null default 'open',      -- open | pending | closed\n  assigned_to uuid,\n  tags text[] not null default '{}',\n  service_interest text,\n  unread_count integer not null default 0,\n  last_message_at timestamptz,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now(),\n  unique (channel, external_id)\n);\ncreate index if not exists conversations_last_message_idx on public.conversations (last_message_at desc);\ncreate index if not exists conversations_contact_idx on public.conversations (contact_id);\n\ncreate table if not exists public.messages (\n  id uuid primary key default gen_random_uuid(),\n  conversation_id uuid not null references public.conversations(id) on delete cascade,\n  direction text not null check (direction in ('in','out')),\n  channel text not null,\n  external_id text,\n  body text,\n  media_url text,\n  media_type text,\n  status text not null default 'sent',      -- queued | sent | delivered | read | failed\n  error text,\n  author text,\n  sent_at timestamptz not null default now(),\n  created_at timestamptz not null default now(),\n  unique (channel, external_id)\n);\ncreate index if not exists messages_conversation_idx on public.messages (conversation_id, sent_at);\n\ncreate table if not exists public.message_templates (\n  id uuid primary key default gen_random_uuid(),\n  name text not null unique,\n  channel text not null default 'whatsapp',\n  body text not null,\n  updated_at timestamptz not null default now()\n);\n\n-- Non-secret integration state. Secrets stay in server environment variables.\ncreate table if not exists public.integrations (\n  key text primary key,                     -- whatsapp_evolution | whatsapp_meta | instagram | facebook | gbp | linkedin | youtube\n  label text not null,\n  status text not null default 'not_connected', -- not_connected | connected | error\n  config jsonb not null default '{}',\n  last_checked_at timestamptz,\n  last_error text,\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists public.social_posts (\n  id uuid primary key default gen_random_uuid(),\n  channel text not null,\n  account_key text,\n  body text not null,\n  media_url text,\n  scheduled_for timestamptz,\n  status text not null default 'draft',     -- draft | scheduled | published | failed\n  external_id text,\n  error text,\n  created_at timestamptz not null default now(),\n  published_at timestamptz\n);\n\nalter table public.leads add column if not exists score_reasons jsonb not null default '[]';\nalter table public.leads add column if not exists last_scored_at timestamptz;\n\n-- Upgrade older installs that already had simpler conversation tables.\nalter table public.conversations add column if not exists account_id text;\nalter table public.conversations add column if not exists external_id text;\nalter table public.conversations add column if not exists lead_id uuid references public.leads(id) on delete set null;\nalter table public.conversations add column if not exists display_name text;\nalter table public.conversations add column if not exists phone text;\nalter table public.conversations add column if not exists status text not null default 'open';\nalter table public.conversations add column if not exists assigned_to uuid;\nalter table public.conversations add column if not exists tags text[] not null default '{}';\nalter table public.conversations add column if not exists service_interest text;\nalter table public.conversations add column if not exists unread_count integer not null default 0;\nalter table public.conversations add column if not exists last_message_at timestamptz;\nalter table public.conversations add column if not exists updated_at timestamptz not null default now();\ncreate unique index if not exists conversations_channel_external_key\n  on public.conversations (channel, external_id) where external_id is not null;\n\nalter table public.messages add column if not exists channel text not null default 'whatsapp';\nalter table public.messages add column if not exists media_type text;\nalter table public.messages add column if not exists status text not null default 'sent';\nalter table public.messages add column if not exists error text;\nalter table public.messages add column if not exists author text;\nalter table public.messages add column if not exists created_at timestamptz not null default now();\nupdate public.messages set direction = 'in' where direction = 'inbound';\nupdate public.messages set direction = 'out' where direction = 'outbound';\n\nalter table public.integrations add column if not exists label text;\nalter table public.integrations add column if not exists last_checked_at timestamptz;\nalter table public.integrations add column if not exists last_error text;\nupdate public.integrations set label = coalesce(label, key);\n\ndo $$\ndeclare t text;\nbegin\n  foreach t in array array['conversations','messages','message_templates','integrations','social_posts'] loop\n    execute format('alter table public.%1$s enable row level security', t);\n    begin\n      execute format('create policy team_read_%1$s on public.%1$s for select to authenticated using (public.is_team(auth.uid()))', t);\n      execute format('create policy team_write_%1$s on public.%1$s for insert to authenticated with check (public.can_write(auth.uid()))', t);\n      execute format('create policy team_update_%1$s on public.%1$s for update to authenticated using (public.can_write(auth.uid()))', t);\n      execute format('create policy admin_delete_%1$s on public.%1$s for delete to authenticated using (public.has_role(auth.uid(), ''super_admin'') or public.has_role(auth.uid(), ''admin''))', t);\n    exception when duplicate_object then null;\n    end;\n  end loop;\nend $$;\n\ngrant select, insert, update, delete on public.conversations, public.messages,\n  public.message_templates, public.integrations, public.social_posts to authenticated;\ngrant all on public.conversations, public.messages, public.message_templates,\n  public.integrations, public.social_posts to service_role;\n";
function StatusBadge({ ok }) {
	return ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }), " Connected"]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), " Not connected"]
	});
}
function DatabaseCard() {
	const queryClient = useQueryClient();
	const stored = getStoredSupabaseConfig();
	const [url, setUrl] = (0, import_react.useState)(stored?.url ?? "");
	const [anonKey, setAnonKey] = (0, import_react.useState)(stored?.anonKey ?? "");
	const [serviceRoleKey, setServiceRoleKey] = (0, import_react.useState)(stored?.serviceRoleKey ?? "");
	const [result, setResult] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [showSql, setShowSql] = (0, import_react.useState)(false);
	const connect = useMutation({
		mutationFn: async () => {
			const config = {
				url: url.trim(),
				anonKey: anonKey.trim()
			};
			if (serviceRoleKey.trim()) config.serviceRoleKey = serviceRoleKey.trim();
			const test = await testSupabaseConnection(config);
			if (!test.ok) throw new Error(test.message);
			saveStoredSupabaseConfig(config);
			return test;
		},
		onSuccess: (test) => {
			setResult({
				ok: true,
				message: test.message
			});
			queryClient.clear();
		},
		onError: (err) => {
			setResult({
				ok: false,
				message: err instanceof Error ? err.message : "Connection failed"
			});
		}
	});
	function handleConnect(event) {
		event.preventDefault();
		setResult(null);
		connect.mutate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-6 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-5 w-5 text-accent-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold text-foreground",
						children: "Database (Supabase)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "The source of truth for customers, invoices, vendors and the website."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { ok: Boolean(stored) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleConnect,
				className: "mt-5 grid grid-cols-1 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-sm font-medium text-foreground",
						children: "Project URL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: url,
						onChange: (e) => setUrl(e.target.value),
						required: true,
						placeholder: "https://yourproject.supabase.co",
						className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-sm font-medium text-foreground",
						children: "Anon (public) key"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: anonKey,
						onChange: (e) => setAnonKey(e.target.value),
						required: true,
						type: "password",
						placeholder: "eyJhbGciOi…",
						className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mb-1.5 block text-sm font-medium text-foreground",
							children: ["Service-role key ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-normal text-muted-foreground",
								children: "(optional — server jobs only)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: serviceRoleKey,
							onChange: (e) => setServiceRoleKey(e.target.value),
							type: "password",
							placeholder: "eyJhbGciOi…",
							className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Never used by the browser. Reserved for privileged background jobs."
						})
					] }),
					result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `rounded-lg px-3 py-2 text-sm ${result.ok ? "bg-primary/15 text-foreground" : "bg-destructive/10 text-destructive"}`,
						children: result.message
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: connect.isPending,
							className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-50",
							children: [connect.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "h-4 w-4" }), "Save & test connection"]
						}), stored ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								clearStoredSupabaseConfig();
								setUrl("");
								setAnonKey("");
								setServiceRoleKey("");
								setResult(null);
								queryClient.clear();
							},
							className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Disconnect"]
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-lg border border-dashed border-border bg-background p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: "First-time database setup"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "After connecting, create the tables once: open your Supabase dashboard → SQL Editor → New query → paste the setup script → Run. It creates every table, role and security policy the CRM needs."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: async () => {
								await navigator.clipboard.writeText(foundation_default);
								setCopied(true);
								setTimeout(() => setCopied(false), 2e3);
							},
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: "h-4 w-4" }), copied ? "Copied!" : "Copy setup SQL"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowSql(!showSql),
							className: "rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
							children: showSql ? "Hide script" : "Preview script"
						})]
					}),
					showSql ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-3 max-h-72 overflow-auto rounded-lg bg-foreground p-4 text-xs text-background",
						children: foundation_default
					}) : null
				]
			})
		]
	});
}
function IntegrationCard({ definition }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [values, setValues] = (0, import_react.useState)(() => getIntegrationValues(definition.id));
	const [result, setResult] = (0, import_react.useState)(null);
	const [testing, setTesting] = (0, import_react.useState)(false);
	const configured = isIntegrationConfigured(definition);
	(0, import_react.useEffect)(() => {
		setValues(getIntegrationValues(definition.id));
	}, [definition.id]);
	function handleSave(event) {
		event.preventDefault();
		saveIntegrationValues(definition.id, values);
		setOpen(false);
		setResult({
			ok: true,
			message: "Saved."
		});
	}
	async function handleTest() {
		const baseUrl = values["baseUrl"] ?? values["url"] ?? "";
		if (!baseUrl) return;
		setTesting(true);
		const test = await testHttpEndpoint(baseUrl, values["apiKey"]);
		setResult({
			ok: test.ok,
			message: test.message
		});
		setTesting(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-5 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold text-foreground",
					children: definition.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: definition.description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { ok: configured })]
			}),
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-3 rounded-lg px-3 py-2 text-sm ${result.ok ? "bg-primary/15 text-foreground" : "bg-destructive/10 text-destructive"}`,
				children: result.message
			}) : null,
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				className: "mt-4 space-y-3",
				children: [definition.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-1 block text-sm font-medium text-foreground",
					children: [field.label, field.optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-normal text-muted-foreground",
						children: " (optional)"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: field.secret ? "password" : "text",
					required: !field.optional,
					placeholder: field.placeholder,
					value: values[field.key] ?? "",
					onChange: (e) => setValues({
						...values,
						[field.key]: e.target.value
					}),
					className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
				})] }, field.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90",
						children: "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(false),
						className: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent",
						children: "Cancel"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(true),
					className: "rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
					children: configured ? "Edit keys" : "Add keys"
				}), configured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleTest,
					disabled: testing,
					className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50",
					children: [testing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : null, "Test"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						removeIntegrationValues(definition.id);
						setValues({});
						setResult(null);
					},
					className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
				})] }) : null]
			})
		]
	});
}
var fieldClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "mb-1.5 block text-sm font-medium text-foreground",
			children: label
		}),
		children,
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: hint
		}) : null
	] });
}
function Panel({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-6 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-4",
				children
			})
		]
	});
}
function ColorField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value,
				onChange: (e) => onChange(e.target.value),
				className: "h-10 w-12 cursor-pointer rounded-lg border border-input bg-background p-1",
				"aria-label": label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: fieldClass
			})]
		})
	});
}
function ListEditor({ label, hint, items, onChange }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
		label,
		hint,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground",
				children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Remove ${item}`,
					onClick: () => onChange(items.filter((value) => value !== item)),
					className: "opacity-60 hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" })
				})]
			}, item))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				placeholder: "Add an option…",
				className: fieldClass,
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						const value = draft.trim();
						if (value && !items.includes(value)) onChange([...items, value]);
						setDraft("");
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					const value = draft.trim();
					if (value && !items.includes(value)) onChange([...items, value]);
					setDraft("");
				},
				className: "shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent",
				children: "Add"
			})]
		})]
	});
}
function ConnectionsTab() {
	const otherIntegrations = INTEGRATIONS.filter((i) => i.id !== "supabase");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabaseCard, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "pt-4 font-display text-lg font-semibold text-foreground",
				children: "Tools & integrations"
			}),
			otherIntegrations.map((definition) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationCard, { definition }, definition.id))
		]
	});
}
function AppearanceTab() {
	const { settings, update, reset } = useWorkspaceSettings();
	const { theme, branding } = settings;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Brand identity",
				description: "Shown in the sidebar, sign-in screen and every page header.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Business name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: branding.name,
							onChange: (e) => update({ branding: {
								...branding,
								name: e.target.value
							} }),
							className: fieldClass
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tagline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: branding.tagline,
							onChange: (e) => update({ branding: {
								...branding,
								tagline: e.target.value
							} }),
							className: fieldClass
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Logo style",
								hint: "Drawn mark stays sharp at any size and animates on hover.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: branding.logoStyle,
									onChange: (e) => update({ branding: {
										...branding,
										logoStyle: e.target.value
									} }),
									className: fieldClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "lockup",
										children: "Drawn mark (plane + script name + circled N)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "image",
										children: "Logo picture"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Monogram letter",
								hint: "Used when no logo image is set.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: branding.initial,
									maxLength: 2,
									onChange: (e) => update({ branding: {
										...branding,
										initial: e.target.value
									} }),
									className: fieldClass
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Logo image URL",
								hint: "Optional — overrides the monogram.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: branding.logoUrl,
									placeholder: "https://…",
									onChange: (e) => update({ branding: {
										...branding,
										logoUrl: e.target.value
									} }),
									className: fieldClass
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Favicon image URL",
								hint: "Optional browser-tab icon for your deployed website.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: branding.faviconUrl,
									placeholder: "https://…",
									onChange: (e) => update({ branding: {
										...branding,
										faviconUrl: e.target.value
									} }),
									className: fieldClass
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Colour palette",
				description: "Every colour in the console updates live as you change these.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: "Primary",
							value: theme.primary,
							onChange: (primary) => update({ theme: {
								...theme,
								primary
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: "Secondary",
							value: theme.secondary,
							onChange: (secondary) => update({ theme: {
								...theme,
								secondary
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: "Accent",
							value: theme.accent,
							onChange: (accent) => update({ theme: {
								...theme,
								accent
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: "Canvas background",
							value: theme.background,
							onChange: (background) => update({ theme: {
								...theme,
								background
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: "Text colour",
							value: theme.foreground,
							onChange: (foreground) => update({ theme: {
								...theme,
								foreground
							} })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Layout feel",
				description: "Corner softness, spacing and sidebar tone.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: `Corner radius — ${theme.radius}px`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 24,
							value: theme.radius,
							onChange: (e) => update({ theme: {
								...theme,
								radius: Number(e.target.value)
							} }),
							className: "w-full accent-[var(--primary)]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Density",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: theme.density,
									onChange: (e) => update({ theme: {
										...theme,
										density: e.target.value
									} }),
									className: fieldClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "comfortable",
										children: "Comfortable"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "compact",
										children: "Compact"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Sidebar tone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: theme.sidebarStyle,
									onChange: (e) => update({ theme: {
										...theme,
										sidebarStyle: e.target.value
									} }),
									className: fieldClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "warm",
										children: "Warm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "plain",
										children: "Plain white"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Button style",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: theme.buttonStyle,
									onChange: (e) => update({ theme: {
										...theme,
										buttonStyle: e.target.value
									} }),
									className: fieldClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "soft",
										children: "Soft corners"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "square",
										children: "Crisp corners"
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: `Heading scale — ${theme.headingScale}%`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 90,
							max: 110,
							value: theme.headingScale,
							onChange: (e) => update({ theme: {
								...theme,
								headingScale: Number(e.target.value)
							} }),
							className: "w-full accent-[var(--primary)]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-background p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase text-primary",
								children: "Live preview"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "site-display mt-2 font-display text-2xl font-bold text-foreground",
								children: "We do. We assist. We connect."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Sora headings, Manrope body copy, and your approved palette."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "brand-button mt-4 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
								children: "Primary action"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold text-foreground",
								children: "Website presentation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Choose how published website sections are presented."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Service section layout",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: settings.websiteAppearance.sectionStyle,
										onChange: (e) => update({ websiteAppearance: {
											...settings.websiteAppearance,
											sectionStyle: e.target.value
										} }),
										className: fieldClass,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "zigzag",
											children: "Story-led alternating sections"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "grid",
											children: "Compact service grid"
										})]
									})
								}), [
									["showHeroHighlights", "Hero trust highlights"],
									["showTrustSection", "Accountability section"],
									["showProcessSection", "How it works"],
									["showFaqSection", "Frequently asked questions"]
								].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground",
									children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: settings.websiteAppearance[key],
										onChange: (e) => update({ websiteAppearance: {
											...settings.websiteAppearance,
											[key]: e.target.checked
										} }),
										className: "h-4 w-4 accent-[var(--primary)]"
									})]
								}, key))]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: reset,
						className: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent",
						children: "Restore SAFAR defaults"
					})
				]
			})
		]
	});
}
function WorkspaceTab() {
	const { settings, update } = useWorkspaceSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Menu",
			description: "Rename any section or hide the ones you do not use. Settings always stays visible.",
			children: settings.nav.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: item.label,
					onChange: (e) => {
						const nav = [...settings.nav];
						nav[index] = {
							...item,
							label: e.target.value
						};
						update({ nav });
					},
					className: fieldClass
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex shrink-0 items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: item.enabled,
						disabled: item.id === "/settings",
						onChange: (e) => {
							const nav = [...settings.nav];
							nav[index] = {
								...item,
								enabled: e.target.checked
							};
							update({ nav });
						},
						className: "h-4 w-4 accent-[var(--primary)]"
					}), "Show"]
				})]
			}, item.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Money & language",
			description: "Used for every amount shown in the console.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Currency code",
					hint: "INR, AED, SAR, QAR, KWD, OMR, BHD, USD…",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: settings.currency,
						onChange: (e) => update({ currency: e.target.value.toUpperCase() }),
						className: fieldClass
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Number & date format",
					hint: "e.g. en-IN, en-AE, ar-SA",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: settings.locale,
						onChange: (e) => update({ locale: e.target.value }),
						className: fieldClass
					})
				})]
			})
		})]
	});
}
function BusinessRulesTab() {
	const { settings, update } = useWorkspaceSettings();
	const { retention } = settings;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Lead & customer vocabulary",
			description: "These options drive the dropdowns across Customers, Vendors and Requests.",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListEditor, {
					label: "Where leads come from",
					hint: "Each lead records exactly one of these as its origin.",
					items: settings.leadSources,
					onChange: (leadSources) => update({ leadSources })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListEditor, {
					label: "Lead statuses",
					hint: "The pipeline a lead moves through before conversion.",
					items: settings.leadStatuses,
					onChange: (leadStatuses) => update({ leadStatuses })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListEditor, {
					label: "Customer lifecycle stages",
					hint: "Stage shown on every customer profile.",
					items: settings.lifecycleStages,
					onChange: (lifecycleStages) => update({ lifecycleStages })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListEditor, {
					label: "Service categories",
					hint: "Used for service interest, provider trades and demand reporting.",
					items: settings.serviceCategories,
					onChange: (serviceCategories) => update({ serviceCategories })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Retention & churn rules",
			description: "How long a customer can stay quiet before the team is prompted to reach out.",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "At risk after (days of silence)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							value: retention.defaultInactivityDays,
							onChange: (e) => update({ retention: {
								...retention,
								defaultInactivityDays: Number(e.target.value)
							} }),
							className: fieldClass
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Treat as churned after (days)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							value: retention.churnedAfterDays,
							onChange: (e) => update({ retention: {
								...retention,
								churnedAfterDays: Number(e.target.value)
							} }),
							className: fieldClass
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: retention.autoFollowUpTask,
						onChange: (e) => update({ retention: {
							...retention,
							autoFollowUpTask: e.target.checked
						} }),
						className: "h-4 w-4 accent-[var(--primary)]"
					}), "Create a follow-up task automatically when a customer goes quiet"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 text-sm font-medium text-foreground",
						children: ["Per-category exceptions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 font-normal text-muted-foreground",
							children: "(groceries go quiet faster than legal work)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: retention.categoryOverrides.map((override, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: override.category,
									onChange: (e) => {
										const categoryOverrides = [...retention.categoryOverrides];
										categoryOverrides[index] = {
											...override,
											category: e.target.value
										};
										update({ retention: {
											...retention,
											categoryOverrides
										} });
									},
									className: fieldClass,
									children: settings.serviceCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: category,
										children: category
									}, category))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 1,
									value: override.days,
									onChange: (e) => {
										const categoryOverrides = [...retention.categoryOverrides];
										categoryOverrides[index] = {
											...override,
											days: Number(e.target.value)
										};
										update({ retention: {
											...retention,
											categoryOverrides
										} });
									},
									className: "w-28 rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Remove exception",
									onClick: () => update({ retention: {
										...retention,
										categoryOverrides: retention.categoryOverrides.filter((_, i) => i !== index)
									} }),
									className: "shrink-0 rounded-lg border border-border px-3 text-destructive hover:bg-destructive/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						}, `${override.category}-${index}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => update({ retention: {
							...retention,
							categoryOverrides: [...retention.categoryOverrides, {
								category: settings.serviceCategories[0] ?? "",
								days: retention.defaultInactivityDays
							}]
						} }),
						className: "mt-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent",
						children: "Add exception"
					})
				] })
			]
		})]
	});
}
function ScoringTab() {
	const connected = isSupabaseConfigured();
	const [config, setConfig] = (0, import_react.useState)(DEFAULT_SCORING);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!connected || loaded) return;
		loadScoring().then((value) => {
			setConfig(value);
			setLoaded(true);
		}).catch(() => setLoaded(true));
	}, [connected, loaded]);
	async function save() {
		setSaving(true);
		try {
			await saveScoring(config);
			toast.success("Scoring saved");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Lead scoring",
			description: "Points show how much interest someone has shown on the website. They do not say how sure we are about who the person is.",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: config.rules.map((rule, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-1 items-center gap-2 text-sm text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: rule.enabled,
								onChange: (event) => {
									const rules = [...config.rules];
									rules[index] = {
										...rule,
										enabled: event.target.checked
									};
									setConfig({
										...config,
										rules
									});
								}
							}), rule.label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: rule.points,
							onChange: (event) => {
								const rules = [...config.rules];
								rules[index] = {
									...rule,
									points: Number(event.target.value) || 0
								};
								setConfig({
									...config,
									rules
								});
							},
							className: "w-24 rounded-lg border border-input bg-background px-3 py-2 text-sm"
						})]
					}, rule.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Warm from",
						hint: "Points needed before a lead counts as warm.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: config.warmFrom,
							onChange: (event) => setConfig({
								...config,
								warmFrom: Number(event.target.value) || 0
							}),
							className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hot from",
						hint: "Points needed before a lead counts as hot.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: config.hotFrom,
							onChange: (event) => setConfig({
								...config,
								hotFrom: Number(event.target.value) || 0
							}),
							className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: save,
						disabled: !connected || saving,
						className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: "Save scoring"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConfig(DEFAULT_SCORING),
						className: "rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground",
						children: "Back to defaults"
					})]
				}),
				!connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Connect your database first to save these points for the whole team."
				}) : null
			]
		})
	});
}
var SETTINGS_TABS = [
	{
		id: "connections",
		label: "Connections"
	},
	{
		id: "appearance",
		label: "Appearance"
	},
	{
		id: "workspace",
		label: "Workspace"
	},
	{
		id: "rules",
		label: "Business rules"
	},
	{
		id: "scoring",
		label: "Lead scoring"
	}
];
function SettingsPage() {
	const [tab, setTab] = (0, import_react.useState)("connections");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Settings",
				description: "Connect the database and every tool, and shape how the whole console looks and behaves. Keys you paste here stay on your devices — never in the code, never in the repos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1",
				children: SETTINGS_TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(item.id),
					className: `flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${tab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`,
					children: item.label
				}, item.id))
			}),
			tab === "connections" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionsTab, {}) : null,
			tab === "appearance" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppearanceTab, {}) : null,
			tab === "workspace" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceTab, {}) : null,
			tab === "rules" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessRulesTab, {}) : null,
			tab === "scoring" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoringTab, {}) : null
		]
	});
}
//#endregion
export { SettingsPage as component };
