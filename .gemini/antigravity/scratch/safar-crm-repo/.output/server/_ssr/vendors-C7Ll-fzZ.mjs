import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { i as useWorkspaceSettings, n as formatMoney } from "./brand-mark-BwZJuO4D.mjs";
import { C as Pencil, L as Handshake, c as Trash2, g as Search, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as fetchProviderCategories, c as saveProvider, i as deleteProvider, n as EMPTY_PROVIDER, o as fetchProviders, r as VERIFICATION_STATES, s as providerToInput, t as AVAILABILITY_STATES } from "./providers-DyXuO0qC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendors-C7Ll-fzZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function ProviderForm({ initial, categories, onDone }) {
	const [form, setForm] = (0, import_react.useState)(initial);
	const queryClient = useQueryClient();
	const save = useMutation({
		mutationFn: () => saveProvider(form),
		onSuccess: async () => {
			toast.success(form.id ? "Partner updated" : "Partner added");
			await queryClient.invalidateQueries({ queryKey: ["providers"] });
			onDone();
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	function submit(event) {
		event.preventDefault();
		save.mutate();
	}
	const set = (patch) => setForm({
		...form,
		...patch
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "mb-5 grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: form.name,
					onChange: (e) => set({ name: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Business name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.business_name,
					onChange: (e) => set({ business_name: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Phone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.phone,
					onChange: (e) => set({ phone: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["WhatsApp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.whatsapp,
					placeholder: "Same as phone if left blank",
					onChange: (e) => set({ whatsapp: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: form.email,
					onChange: (e) => set({ email: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Trade / category", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: form.category_id,
					onChange: (e) => set({ category_id: e.target.value }),
					className: `mt-1.5 ${inputClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Not categorised"
					}), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: category.id,
						children: category.name
					}, category.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["City", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.city,
					onChange: (e) => set({ city: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Service areas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.service_areas,
					placeholder: "Comma separated — Hyderabad, Secunderabad",
					onChange: (e) => set({ service_areas: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Verification", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.verification_status,
					onChange: (e) => set({ verification_status: e.target.value }),
					className: `mt-1.5 ${inputClass}`,
					children: VERIFICATION_STATES.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: state,
						children: state
					}, state))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Availability", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.availability,
					onChange: (e) => set({ availability: e.target.value }),
					className: `mt-1.5 ${inputClass}`,
					children: AVAILABILITY_STATES.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: state,
						children: state
					}, state))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Rate card label", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.rate_card_label,
					placeholder: "Visit charge / per hour / per delivery",
					onChange: (e) => set({ rate_card_label: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Rate amount", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					step: "0.01",
					value: form.rate_card_amount,
					onChange: (e) => set({ rate_card_amount: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Rating (0–5)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					step: "0.1",
					min: "0",
					max: "5",
					value: form.rating,
					onChange: (e) => set({ rating: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 self-end text-sm font-medium text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: form.is_primary,
					onChange: (e) => set({ is_primary: e.target.checked }),
					className: "h-4 w-4 rounded border-input"
				}), "Primary partner for this trade"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground sm:col-span-2",
				children: ["Notes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 2,
					value: form.notes,
					onChange: (e) => set({ notes: e.target.value }),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: save.isPending,
					className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
					children: save.isPending ? "Saving…" : form.id ? "Save changes" : "Add partner"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDone,
					className: "rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent",
					children: "Cancel"
				})]
			})
		]
	});
}
function VendorsPage() {
	const { settings } = useWorkspaceSettings();
	const queryClient = useQueryClient();
	const connected = isSupabaseConfigured();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("");
	const [availabilityFilter, setAvailabilityFilter] = (0, import_react.useState)("");
	const { data: providers = [], isLoading } = useQuery({
		queryKey: ["providers"],
		queryFn: fetchProviders,
		enabled: connected
	});
	const { data: categories = [] } = useQuery({
		queryKey: ["provider-categories"],
		queryFn: fetchProviderCategories,
		enabled: connected
	});
	const categoryName = (0, import_react.useMemo)(() => new Map(categories.map((category) => [category.id, category.name])), [categories]);
	const remove = useMutation({
		mutationFn: (id) => deleteProvider(id),
		onSuccess: async () => {
			toast.success("Partner removed");
			await queryClient.invalidateQueries({ queryKey: ["providers"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not remove")
	});
	const filtered = providers.filter((provider) => {
		const haystack = `${provider.name} ${provider.business_name ?? ""} ${provider.phone ?? ""} ${provider.city ?? ""} ${(provider.service_areas ?? []).join(" ")}`.toLowerCase();
		if (query && !haystack.includes(query.toLowerCase())) return false;
		if (categoryFilter && provider.category_id !== categoryFilter) return false;
		if (availabilityFilter && provider.availability !== availabilityFilter) return false;
		return true;
	});
	if (!connected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Vendors & Partners",
		description: "Every serviceman, contractor and partner — verified, rated and ready to assign to work orders."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Handshake,
		title: "Connect your database to start",
		description: "Open Settings → Connections, paste your project URL and keys, and run the one-time setup script."
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Vendors & Partners",
			description: "Every serviceman, contractor and partner — verified, rated and ready to assign to work orders."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[200px] flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search by name, business, phone, city or area",
						className: `${inputClass} pl-9`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: categoryFilter,
					onChange: (e) => setCategoryFilter(e.target.value),
					className: "rounded-lg border border-input bg-background px-3 py-2.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All trades"
					}), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: category.id,
						children: category.name
					}, category.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: availabilityFilter,
					onChange: (e) => setAvailabilityFilter(e.target.value),
					className: "rounded-lg border border-input bg-background px-3 py-2.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Any availability"
					}), AVAILABILITY_STATES.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: state,
						children: state
					}, state))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setEditing(editing ? null : { ...EMPTY_PROVIDER }),
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add partner"]
				})
			]
		}),
		editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderForm, {
			initial: editing,
			categories,
			onDone: () => setEditing(null)
		}, editing.id ?? "new") : null,
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Loading directory…"
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Handshake,
			title: providers.length === 0 ? "The directory is empty" : "No partners match this filter",
			description: "Add your servicemen and partners — trade, service areas, rate card, availability, verification and rating. They become one-click assignable to customer work orders."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
			children: filtered.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderCard, {
				provider,
				categoryLabel: provider.category_id ? categoryName.get(provider.category_id) ?? null : null,
				money: (value) => formatMoney(value, settings),
				onEdit: () => setEditing(providerToInput(provider)),
				onDelete: () => {
					if (confirm(`Remove ${provider.name} from the directory?`)) remove.mutate(provider.id);
				}
			}, provider.id))
		})
	] });
}
function ProviderCard({ provider, categoryLabel, money, onEdit, onDelete }) {
	const rate = Object.entries(provider.rate_card ?? {})[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col rounded-xl border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium text-foreground",
					children: [provider.name, provider.is_primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium",
						children: "Primary"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: provider.business_name ?? categoryLabel ?? "Independent"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-2.5 py-1 text-xs font-medium ${provider.verification_status === "verified" ? "bg-primary/15 text-foreground" : provider.verification_status === "suspended" ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"}`,
					children: provider.verification_status
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-1 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Trade",
						value: categoryLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Phone",
						value: provider.phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "City",
						value: provider.city
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Areas",
						value: provider.service_areas?.length ? provider.service_areas.join(", ") : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Rate",
						value: rate ? `${rate[0]} · ${money(Number(rate[1]))}` : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Rating",
						value: provider.rating !== null ? `${provider.rating} / 5` : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Availability",
						value: provider.availability
					})
				]
			}),
			provider.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 line-clamp-3 text-xs text-muted-foreground",
				children: provider.notes
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onEdit,
						className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
					}),
					provider.whatsapp || provider.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `https://wa.me/${(provider.whatsapp ?? provider.phone ?? "").replace(/[^\d]/g, "")}`,
						target: "_blank",
						rel: "noreferrer",
						className: "rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent",
						children: "WhatsApp"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onDelete,
						className: "ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
					})
				]
			})
		]
	});
}
function Row({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right font-medium text-foreground",
			children: value
		})]
	});
}
//#endregion
export { VendorsPage as component };
