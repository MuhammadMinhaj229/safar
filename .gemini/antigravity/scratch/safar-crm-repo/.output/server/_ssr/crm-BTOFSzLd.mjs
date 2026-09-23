import { r as getSupabase } from "./supabase-C462Pq8m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm-BTOFSzLd.js
/**
* CRM domain helpers — one canonical place for identity rules, lead
* conversion and the reads behind the Customers workspace.
*
* Identity rule: a person is identified by their normalised phone
* (digits only, E.164-ish) or lower-cased email. Every write goes
* through these helpers so duplicates cannot creep in.
*/
function normalizePhone(raw) {
	if (!raw) return null;
	const digits = raw.replace(/[^\d+]/g, "").replace(/^00/, "+");
	if (!digits) return null;
	return digits.startsWith("+") ? digits : `+${digits}`;
}
function normalizeEmail(raw) {
	const value = raw?.trim().toLowerCase();
	return value ? value : null;
}
async function must() {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	return supabase;
}
async function fetchLeads() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("leads").select("id, name, phone, email, source, source_detail, campaign, service_interest, location, status, notes, created_at").order("created_at", { ascending: false }).limit(500);
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function fetchContacts() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("contacts").select("id, name, phone, email, whatsapp, gulf_country, gulf_city, india_address, lifecycle_status, tags, notes, created_at").order("created_at", { ascending: false }).limit(500);
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function fetchRequests() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("service_requests").select("id, contact_id, title, service_category, status, created_at, completed_at").order("created_at", { ascending: false }).limit(1e3);
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function fetchInvoices() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("invoices").select("id, contact_id, invoice_number, status, total, amount_paid, outstanding, issued_at").order("created_at", { ascending: false }).limit(1e3);
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function createLead(input) {
	const { error } = await (await must()).from("leads").insert({
		name: input.name.trim(),
		phone: normalizePhone(input.phone),
		email: normalizeEmail(input.email),
		source: input.source,
		source_detail: input.source_detail.trim() || null,
		service_interest: input.service_interest || null,
		location: input.location.trim() || null,
		notes: input.notes.trim() || null,
		status: "new"
	});
	if (error) throw new Error(error.message);
}
async function updateLeadStatus(id, status) {
	const { error } = await (await must()).from("leads").update({
		status,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id);
	if (error) throw new Error(error.message);
}
/**
* Converts a lead into a customer contact. If someone with the same
* normalised phone or email already exists, the lead is linked to that
* person instead of creating a duplicate.
*/
async function convertLeadToContact(lead) {
	const supabase = await must();
	const phone = normalizePhone(lead.phone);
	const email = normalizeEmail(lead.email);
	let existingId = null;
	if (phone || email) {
		const filters = [];
		if (phone) filters.push(`phone_normalized.eq.${phone}`);
		if (email) filters.push(`email_normalized.eq.${email}`);
		const { data } = await supabase.from("contacts").select("id").or(filters.join(",")).limit(1).maybeSingle();
		existingId = data?.id ?? null;
	}
	let contactId = existingId;
	if (!contactId) {
		const { data, error } = await supabase.from("contacts").insert({
			lead_id: lead.id,
			name: lead.name,
			phone: lead.phone,
			phone_normalized: phone,
			email: lead.email,
			email_normalized: email,
			whatsapp: lead.phone,
			lifecycle_status: "customer",
			notes: lead.notes
		}).select("id").single();
		if (error) throw new Error(error.message);
		contactId = data.id;
	}
	const { error: leadError } = await supabase.from("leads").update({
		status: "converted",
		contact_id: contactId,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", lead.id);
	if (leadError) throw new Error(leadError.message);
	await attachVisitorHistory(lead.visitor_key ?? null, contactId, "form");
	supabase.from("lead_events").insert({
		lead_id: lead.id,
		kind: "status_changed",
		to_value: "converted",
		detail: "Lead became a customer"
	});
	return contactId;
}
/**
* Connects an anonymous device to a known person, and stamps that person's
* name onto everything the device did before. Only called when the person
* identified themselves — never guessed.
*/
async function attachVisitorHistory(visitorKey, contactId, signal) {
	if (!visitorKey) return;
	const supabase = getSupabase();
	if (!supabase) return;
	await supabase.from("identity_links").upsert({
		visitor_key: visitorKey,
		contact_id: contactId,
		signal,
		confidence: "confirmed"
	}, { onConflict: "visitor_key,contact_id" });
	await supabase.from("visitors").update({ contact_id: contactId }).eq("visitor_key", visitorKey);
	await supabase.from("events").update({ contact_id: contactId }).eq("visitor_key", visitorKey).is("contact_id", null);
}
async function fetchCustomerTimeline(contactId) {
	const supabase = getSupabase();
	if (!supabase) return [];
	const [events, requests, invoices, payments, tasks] = await Promise.all([
		supabase.from("events").select("id, name, route, occurred_at").eq("contact_id", contactId).order("occurred_at", { ascending: false }).limit(100),
		supabase.from("service_requests").select("id, title, status, created_at").eq("contact_id", contactId),
		supabase.from("invoices").select("id, invoice_number, total, status, created_at").eq("contact_id", contactId),
		supabase.from("payments").select("id, amount, paid_at, invoices!inner(contact_id)").eq("invoices.contact_id", contactId),
		supabase.from("tasks").select("id, title, status, created_at").eq("contact_id", contactId)
	]);
	const entries = [];
	const push = (entry) => entries.push(entry);
	for (const row of events.data ?? []) push({
		id: `e-${row["id"]}`,
		at: row["occurred_at"],
		label: WEBSITE_LABELS[row["name"]] ?? row["name"],
		...row["route"] ? { detail: row["route"] } : {},
		kind: "website"
	});
	for (const row of requests.data ?? []) push({
		id: `r-${row["id"]}`,
		at: row["created_at"],
		label: `Service request: ${row["title"] ?? "Untitled"}`,
		detail: row["status"],
		kind: "request"
	});
	for (const row of invoices.data ?? []) push({
		id: `i-${row["id"]}`,
		at: row["created_at"],
		label: `Invoice ${row["number"] ?? ""}`.trim(),
		detail: `₹${Number(row["total_amount"] ?? 0).toLocaleString("en-IN")} · ${row["status"]}`,
		kind: "invoice"
	});
	for (const row of payments.data ?? []) push({
		id: `p-${row["id"]}`,
		at: row["paid_at"] ?? (/* @__PURE__ */ new Date()).toISOString(),
		label: "Payment received",
		detail: `₹${Number(row["amount"] ?? 0).toLocaleString("en-IN")}`,
		kind: "payment"
	});
	for (const row of tasks.data ?? []) push({
		id: `t-${row["id"]}`,
		at: row["created_at"],
		label: row["title"],
		detail: row["status"],
		kind: "task"
	});
	return entries.filter((entry) => Boolean(entry.at)).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}
var WEBSITE_LABELS = {
	"page.viewed": "Opened a page on the website",
	"service.viewed": "Looked at a service",
	"pricing.viewed": "Looked at prices",
	"cta.clicked": "Clicked a button",
	"form.started": "Started the enquiry form",
	"form.submitted": "Sent an enquiry",
	"whatsapp.clicked": "Clicked WhatsApp",
	"phone.clicked": "Clicked the phone number",
	"email.clicked": "Clicked the email"
};
function buildRetention(contacts, requests, settings) {
	const byContact = /* @__PURE__ */ new Map();
	for (const request of requests) {
		const list = byContact.get(request.contact_id) ?? [];
		list.push(request);
		byContact.set(request.contact_id, list);
	}
	const overrides = new Map(settings.retention.categoryOverrides.map((o) => [o.category, o.days]));
	return contacts.map((contact) => {
		const history = byContact.get(contact.id) ?? [];
		const counts = /* @__PURE__ */ new Map();
		for (const request of history) {
			const key = request.service_category ?? "Uncategorised";
			counts.set(key, (counts.get(key) ?? 0) + 1);
		}
		const categoryCounts = [...counts.entries()].map(([category, count]) => ({
			category,
			count
		})).sort((a, b) => b.count - a.count);
		const topCategory = categoryCounts[0]?.category ?? null;
		const lastOrderAt = history[0]?.created_at ?? null;
		const daysQuiet = lastOrderAt ? Math.floor((Date.now() - new Date(lastOrderAt).getTime()) / 864e5) : null;
		const thresholdDays = (topCategory ? overrides.get(topCategory) : void 0) ?? settings.retention.defaultInactivityDays;
		let state = "healthy";
		if (daysQuiet === null) state = "never_ordered";
		else if (daysQuiet >= settings.retention.churnedAfterDays) state = "churned";
		else if (daysQuiet >= thresholdDays) state = "at_risk";
		return {
			contact,
			lastOrderAt,
			daysQuiet,
			orderCount: history.length,
			topCategory,
			categoryCounts,
			thresholdDays,
			state
		};
	}).sort((a, b) => (b.daysQuiet ?? -1) - (a.daysQuiet ?? -1));
}
async function fetchTasks() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("tasks").select("id, title, kind, status, priority, contact_id, due_at, created_at").order("created_at", { ascending: false }).limit(500);
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function createFollowUpTask(contactId, title, dueInDays = 1) {
	const supabase = await must();
	const dueAt = new Date(Date.now() + dueInDays * 864e5).toISOString();
	const { error } = await supabase.from("tasks").insert({
		title,
		kind: "follow_up",
		priority: "high",
		status: "open",
		contact_id: contactId,
		due_at: dueAt
	});
	if (error) throw new Error(error.message);
}
async function completeTask(id) {
	const { error } = await (await must()).from("tasks").update({ status: "done" }).eq("id", id);
	if (error) throw new Error(error.message);
}
/** Records a reactivation / re-engagement outcome against the customer. */
async function markReactivated(contactId) {
	const { error } = await (await must()).from("contacts").update({
		lifecycle_status: "reactivated",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", contactId);
	if (error) throw new Error(error.message);
}
//#endregion
export { createLead as a, fetchInvoices as c, fetchTasks as d, markReactivated as f, createFollowUpTask as i, fetchLeads as l, completeTask as n, fetchContacts as o, updateLeadStatus as p, convertLeadToContact as r, fetchCustomerTimeline as s, buildRetention as t, fetchRequests as u };
