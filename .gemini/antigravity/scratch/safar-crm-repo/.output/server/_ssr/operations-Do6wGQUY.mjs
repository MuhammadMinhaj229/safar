import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured, r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { i as useWorkspaceSettings } from "./brand-mark-BwZJuO4D.mjs";
import { U as ClipboardList, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as fetchContacts } from "./crm-BTOFSzLd.mjs";
import { o as fetchProviders } from "./providers-DyXuO0qC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/operations-Do6wGQUY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Service request (work order) data access. */
var REQUEST_STATUSES = [
	"open",
	"in_progress",
	"waiting",
	"completed",
	"cancelled"
];
var REQUEST_PRIORITIES = [
	"low",
	"normal",
	"high",
	"urgent"
];
var EMPTY_REQUEST = {
	contact_id: "",
	title: "",
	description: "",
	service_category: "",
	priority: "normal",
	assigned_provider_id: ""
};
function client() {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	return supabase;
}
async function fetchServiceRequests() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("service_requests").select("id, contact_id, title, description, service_category, status, priority, assigned_provider_id, created_at, completed_at").order("created_at", { ascending: false }).limit(500);
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function createServiceRequest(input) {
	const { error } = await client().from("service_requests").insert({
		contact_id: input.contact_id || null,
		title: input.title.trim(),
		description: input.description.trim() || null,
		service_category: input.service_category || null,
		priority: input.priority,
		assigned_provider_id: input.assigned_provider_id || null,
		status: "open"
	});
	if (error) throw new Error(error.message);
}
async function updateServiceRequest(id, patch) {
	const supabase = client();
	const payload = {
		...patch,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (patch.status === "completed") payload["completed_at"] = (/* @__PURE__ */ new Date()).toISOString();
	if (patch.status && patch.status !== "completed") payload["completed_at"] = null;
	const { error } = await supabase.from("service_requests").update(payload).eq("id", id);
	if (error) throw new Error(error.message);
}
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function RequestForm({ contacts, providers, onDone }) {
	const { settings } = useWorkspaceSettings();
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(EMPTY_REQUEST);
	const save = useMutation({
		mutationFn: () => createServiceRequest(form),
		onSuccess: async () => {
			toast.success("Service request created");
			await queryClient.invalidateQueries({ queryKey: ["service-requests"] });
			await queryClient.invalidateQueries({ queryKey: ["requests"] });
			onDone();
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	function submit(event) {
		event.preventDefault();
		save.mutate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "mb-5 grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground sm:col-span-2",
				children: ["What needs to be done", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: form.title,
					placeholder: "AC servicing at parents' home, Hyderabad",
					onChange: (e) => setForm({
						...form,
						title: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Customer", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					required: true,
					value: form.contact_id,
					onChange: (e) => setForm({
						...form,
						contact_id: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select a customer"
					}), contacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: contact.id,
						children: contact.name
					}, contact.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Service category", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: form.service_category,
					onChange: (e) => setForm({
						...form,
						service_category: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Not specified"
					}), settings.serviceCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: category,
						children: category
					}, category))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Assign serviceman / partner", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: form.assigned_provider_id,
					onChange: (e) => setForm({
						...form,
						assigned_provider_id: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Unassigned for now"
					}), providers.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: provider.id,
						children: provider.name
					}, provider.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Priority", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.priority,
					onChange: (e) => setForm({
						...form,
						priority: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`,
					children: REQUEST_PRIORITIES.map((priority) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: priority,
						children: priority
					}, priority))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground sm:col-span-2",
				children: ["Details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 3,
					value: form.description,
					placeholder: "Address, timing, who to contact locally, what the family expects…",
					onChange: (e) => setForm({
						...form,
						description: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: save.isPending,
					className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
					children: save.isPending ? "Creating…" : "Create request"
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
function OperationsPage() {
	const { settings } = useWorkspaceSettings();
	const queryClient = useQueryClient();
	const connected = isSupabaseConfigured();
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("");
	const { data: requests = [], isLoading } = useQuery({
		queryKey: ["service-requests"],
		queryFn: fetchServiceRequests,
		enabled: connected
	});
	const { data: contacts = [] } = useQuery({
		queryKey: ["contacts"],
		queryFn: fetchContacts,
		enabled: connected
	});
	const { data: providers = [] } = useQuery({
		queryKey: ["providers"],
		queryFn: fetchProviders,
		enabled: connected
	});
	const contactName = (0, import_react.useMemo)(() => new Map(contacts.map((contact) => [contact.id, contact.name])), [contacts]);
	const providerName = (0, import_react.useMemo)(() => new Map(providers.map((provider) => [provider.id, provider.name])), [providers]);
	const update = useMutation({
		mutationFn: ({ id, patch }) => updateServiceRequest(id, patch),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["service-requests"] });
			await queryClient.invalidateQueries({ queryKey: ["requests"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not update")
	});
	const filtered = statusFilter ? requests.filter((request) => request.status === statusFilter) : requests;
	if (!connected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Service Requests",
		description: "Every job from request to completion — assigned to a verified serviceman and tracked to the end."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ClipboardList,
		title: "Connect your database to start",
		description: "Open Settings → Connections, paste your project URL and keys, and run the one-time setup script."
	})] });
	const openCount = requests.filter((request) => request.status !== "completed" && request.status !== "cancelled").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Service Requests",
			description: "Every job from request to completion — assigned to a verified serviceman and tracked to the end."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground",
					children: [openCount, " open"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: statusFilter,
					onChange: (e) => setStatusFilter(e.target.value),
					className: "rounded-lg border border-input bg-background px-3 py-2.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All statuses"
					}), REQUEST_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: status,
						children: status
					}, status))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setAdding((value) => !value),
					className: "ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New request"]
				})
			]
		}),
		adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestForm, {
			contacts,
			providers,
			onDone: () => setAdding(false)
		}) : null,
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Loading requests…"
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ClipboardList,
			title: requests.length === 0 ? "No service requests yet" : "Nothing matches this filter",
			description: "Create a request for a customer, assign the right serviceman from your directory, and track it through to completion."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: filtered.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-card p-4 md:flex md:items-start md:justify-between md:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: request.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [
								request.contact_id ? contactName.get(request.contact_id) ?? "Unknown customer" : "No customer",
								" · ",
								request.service_category ?? "Uncategorised",
								" · raised ",
								new Date(request.created_at).toLocaleDateString(settings.locale),
								request.completed_at ? ` · completed ${new Date(request.completed_at).toLocaleDateString(settings.locale)}` : ""
							]
						}),
						request.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: request.description
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"Assigned to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: request.assigned_provider_id ? providerName.get(request.assigned_provider_id) ?? "Removed partner" : "nobody yet"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2 md:mt-0 md:shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: request.assigned_provider_id ?? "",
							onChange: (e) => update.mutate({
								id: request.id,
								patch: { assigned_provider_id: e.target.value || null }
							}),
							className: "rounded-lg border border-input bg-background px-2 py-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Unassigned"
							}), providers.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: provider.id,
								children: provider.name
							}, provider.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: request.priority,
							onChange: (e) => update.mutate({
								id: request.id,
								patch: { priority: e.target.value }
							}),
							className: "rounded-lg border border-input bg-background px-2 py-1.5 text-xs",
							children: REQUEST_PRIORITIES.map((priority) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: priority,
								children: priority
							}, priority))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: request.status,
							onChange: (e) => update.mutate({
								id: request.id,
								patch: { status: e.target.value }
							}),
							className: "rounded-lg border border-input bg-background px-2 py-1.5 text-xs font-medium",
							children: REQUEST_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: status,
								children: status
							}, status))
						})
					]
				})]
			}, request.id))
		})
	] });
}
//#endregion
export { OperationsPage as component };
