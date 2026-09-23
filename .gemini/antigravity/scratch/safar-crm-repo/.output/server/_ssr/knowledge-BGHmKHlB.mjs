import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured, r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { i as useWorkspaceSettings } from "./brand-mark-BwZJuO4D.mjs";
import { C as Pencil, X as BookOpen, c as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-BGHmKHlB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Business knowledge base — one place for services, prices, areas,
* hours, FAQs, policies and offers. The website, the CRM and any future
* assistant read from here, so a price is never written twice.
*/
var KNOWLEDGE_CATEGORIES = [
	{
		id: "service",
		label: "Service"
	},
	{
		id: "price",
		label: "Price"
	},
	{
		id: "area",
		label: "Area we cover"
	},
	{
		id: "hours",
		label: "Working hours"
	},
	{
		id: "faq",
		label: "Question and answer"
	},
	{
		id: "policy",
		label: "Policy"
	},
	{
		id: "offer",
		label: "Offer"
	},
	{
		id: "brand",
		label: "Brand note"
	}
];
var EMPTY_KNOWLEDGE = {
	category: "service",
	code: "",
	title: "",
	body: "",
	amount: "",
	is_public: true
};
async function db() {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	return supabase;
}
async function fetchKnowledge(category) {
	const supabase = getSupabase();
	if (!supabase) return [];
	let query = supabase.from("knowledge_entries").select("*").order("category").order("sort_order");
	if (category) query = query.eq("category", category);
	const { data, error } = await query;
	if (error) throw error;
	return data ?? [];
}
async function saveKnowledge(input, id) {
	const supabase = await db();
	const amount = input.amount.trim() ? Number(input.amount) : null;
	if (amount !== null && (!Number.isFinite(amount) || amount < 0)) throw new Error("Price must be a number.");
	const row = {
		category: input.category,
		code: input.code.trim() || null,
		title: input.title.trim(),
		body: input.body.trim() || null,
		amount,
		is_public: input.is_public,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (!row.title) throw new Error("A title is needed.");
	const { error } = id ? await supabase.from("knowledge_entries").update(row).eq("id", id) : await supabase.from("knowledge_entries").insert(row);
	if (error) throw error;
}
async function deleteKnowledge(id) {
	const { error } = await (await db()).from("knowledge_entries").delete().eq("id", id);
	if (error) throw error;
}
function formatAmount(amount, currency = "INR", locale = "en-IN") {
	if (amount === null) return "—";
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		maximumFractionDigits: 2
	}).format(amount);
}
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function rowToInput(row) {
	return {
		category: row.category,
		code: row.code ?? "",
		title: row.title,
		body: row.body ?? "",
		amount: row.amount === null ? "" : String(row.amount),
		is_public: row.is_public
	};
}
function KnowledgePage() {
	const connected = isSupabaseConfigured();
	const queryClient = useQueryClient();
	const { settings } = useWorkspaceSettings();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const entries = useQuery({
		queryKey: ["knowledge"],
		queryFn: () => fetchKnowledge(),
		enabled: connected
	});
	const save = useMutation({
		mutationFn: () => saveKnowledge(editing.form, editing.id),
		onSuccess: async () => {
			toast.success("Saved");
			setEditing(null);
			await queryClient.invalidateQueries({ queryKey: ["knowledge"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	const remove = useMutation({
		mutationFn: (id) => deleteKnowledge(id),
		onSuccess: async () => {
			toast.success("Removed");
			await queryClient.invalidateQueries({ queryKey: ["knowledge"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not remove")
	});
	const rows = (entries.data ?? []).filter((row) => filter === "all" || row.category === filter);
	function submit(event) {
		event.preventDefault();
		save.mutate();
	}
	if (!connected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Business Knowledge",
			description: "Your services, prices and answers in one place."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: BookOpen,
			title: "Connect your database first",
			description: "Open Settings and add your database keys to start writing down your services and prices."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Business Knowledge",
				description: "Write a service or a price once here. The website and the team always read the same thing.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setEditing({ form: EMPTY_KNOWLEDGE }),
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add entry"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter("all"),
					className: `rounded-full border px-3 py-1 text-xs ${filter === "all" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`,
					children: "All"
				}), KNOWLEDGE_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(item.id),
					className: `rounded-full border px-3 py-1 text-xs ${filter === item.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`,
					children: item.label
				}, item.id))]
			}),
			editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4 rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-medium text-foreground",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass,
								value: editing.form.category,
								onChange: (event) => setEditing({
									...editing,
									form: {
										...editing.form,
										category: event.target.value
									}
								}),
								children: KNOWLEDGE_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-medium text-foreground",
								children: "Short code (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: editing.form.code,
								onChange: (event) => setEditing({
									...editing,
									form: {
										...editing.form,
										code: event.target.value
									}
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-medium text-foreground",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: editing.form.title,
								onChange: (event) => setEditing({
									...editing,
									form: {
										...editing.form,
										title: event.target.value
									}
								}),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-medium text-foreground",
								children: "Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								className: inputClass,
								value: editing.form.body,
								onChange: (event) => setEditing({
									...editing,
									form: {
										...editing.form,
										body: event.target.value
									}
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-medium text-foreground",
								children: "Price (leave empty if none)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								inputMode: "decimal",
								value: editing.form.amount,
								onChange: (event) => setEditing({
									...editing,
									form: {
										...editing.form,
										amount: event.target.value
									}
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 self-end text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: editing.form.is_public,
								onChange: (event) => setEditing({
									...editing,
									form: {
										...editing.form,
										is_public: event.target.checked
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "Show on the website"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: save.isPending,
						className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setEditing(null),
						className: "rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground",
						children: "Cancel"
					})]
				})]
			}) : null,
			entries.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading…"
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: BookOpen,
				title: "Nothing written down yet",
				description: "Add your first service, price or common question. Everyone in the team will then see the same answer."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: [KNOWLEDGE_CATEGORIES.find((item) => item.id === row.category)?.label ?? row.category, row.code ? ` · ${row.code}` : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-sm font-semibold text-foreground",
								children: row.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Edit",
									onClick: () => setEditing({
										id: row.id,
										form: rowToInput(row)
									}),
									className: "rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Delete",
									onClick: () => remove.mutate(row.id),
									className: "rounded-lg border border-border p-2 text-muted-foreground hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})]
						}),
						row.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: row.body
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm font-medium text-foreground",
							children: [formatAmount(row.amount, settings.currency, settings.locale), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs font-normal text-muted-foreground",
								children: row.is_public ? "Shown on the website" : "Team only"
							})]
						})
					]
				}, row.id))
			})
		]
	});
}
//#endregion
export { KnowledgePage as component };
