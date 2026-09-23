import { r as getSupabase } from "./supabase-C462Pq8m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/providers-DyXuO0qC.js
/** Vendor & partner directory data access. */
var VERIFICATION_STATES = [
	"pending",
	"verified",
	"suspended"
];
var AVAILABILITY_STATES = [
	"available",
	"busy",
	"offline"
];
var EMPTY_PROVIDER = {
	name: "",
	business_name: "",
	phone: "",
	whatsapp: "",
	email: "",
	city: "",
	service_areas: "",
	verification_status: "pending",
	availability: "available",
	is_primary: false,
	rate_card_label: "",
	rate_card_amount: "",
	rating: "",
	notes: "",
	category_id: ""
};
function providerToInput(provider) {
	const [label, amount] = Object.entries(provider.rate_card ?? {})[0] ?? ["", ""];
	return {
		id: provider.id,
		name: provider.name,
		business_name: provider.business_name ?? "",
		phone: provider.phone ?? "",
		whatsapp: provider.whatsapp ?? "",
		email: provider.email ?? "",
		city: provider.city ?? "",
		service_areas: (provider.service_areas ?? []).join(", "),
		verification_status: provider.verification_status,
		availability: provider.availability,
		is_primary: provider.is_primary,
		rate_card_label: label ?? "",
		rate_card_amount: amount === "" || amount === void 0 ? "" : String(amount),
		rating: provider.rating === null ? "" : String(provider.rating),
		notes: provider.notes ?? "",
		category_id: provider.category_id ?? ""
	};
}
async function fetchProviders() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("providers").select("id, name, business_name, phone, whatsapp, email, city, service_areas, verification_status, availability, is_primary, rate_card, rating, notes, category_id, created_at").order("name").limit(500);
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function fetchProviderCategories() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("provider_categories").select("id, name").order("name");
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function saveProvider(input) {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	const rateCard = input.rate_card_label.trim() && input.rate_card_amount.trim() ? { [input.rate_card_label.trim()]: Number(input.rate_card_amount) } : {};
	const payload = {
		name: input.name.trim(),
		business_name: input.business_name.trim() || null,
		phone: input.phone.trim() || null,
		whatsapp: input.whatsapp.trim() || input.phone.trim() || null,
		email: input.email.trim().toLowerCase() || null,
		city: input.city.trim() || null,
		service_areas: input.service_areas.split(",").map((area) => area.trim()).filter(Boolean),
		verification_status: input.verification_status,
		availability: input.availability,
		is_primary: input.is_primary,
		rate_card: rateCard,
		rating: input.rating.trim() ? Number(input.rating) : null,
		notes: input.notes.trim() || null,
		category_id: input.category_id || null,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	const { error } = input.id ? await supabase.from("providers").update(payload).eq("id", input.id) : await supabase.from("providers").insert(payload);
	if (error) throw new Error(error.message);
}
async function deleteProvider(id) {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	const { error } = await supabase.from("providers").delete().eq("id", id);
	if (error) throw new Error(error.message);
}
//#endregion
export { fetchProviderCategories as a, saveProvider as c, deleteProvider as i, EMPTY_PROVIDER as n, fetchProviders as o, VERIFICATION_STATES as r, providerToInput as s, AVAILABILITY_STATES as t };
