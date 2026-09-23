import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured, r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { c as Trash2, r as Workflow, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/automations-Ccz5SjAU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Automation engine — EVENT → CONDITION → ACTION → LOG.
*
* Rules are stored in the `automations` table. Runs are written to
* `automation_runs` so every automatic action can be checked later.
* Nothing runs silently: each run records what happened and why.
*/
var TRIGGERS = [
	{
		id: "lead.created",
		label: "A new lead comes in"
	},
	{
		id: "lead.hot",
		label: "A lead becomes hot"
	},
	{
		id: "message.received",
		label: "A WhatsApp message arrives"
	},
	{
		id: "request.completed",
		label: "A job is finished"
	},
	{
		id: "invoice.paid",
		label: "An invoice is paid"
	},
	{
		id: "customer.quiet",
		label: "A customer goes quiet"
	}
];
var ACTIONS = [
	{
		id: "notify",
		label: "Tell the team"
	},
	{
		id: "task",
		label: "Create a follow-up task"
	},
	{
		id: "whatsapp",
		label: "Send a WhatsApp message"
	},
	{
		id: "tag",
		label: "Add a tag"
	}
];
async function db() {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	return supabase;
}
async function fetchAutomations() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("automations").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function fetchAutomationRuns(limit = 50) {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("automation_runs").select("*").order("created_at", { ascending: false }).limit(limit);
	if (error) throw error;
	return data ?? [];
}
async function saveAutomation(input) {
	const supabase = await db();
	const row = {
		name: input.name,
		trigger: input.trigger,
		action: input.action,
		action_config: input.action_config ?? {},
		condition: input.condition ?? {},
		enabled: input.enabled ?? true
	};
	const { error } = input.id ? await supabase.from("automations").update(row).eq("id", input.id) : await supabase.from("automations").insert(row);
	if (error) throw error;
}
async function setAutomationEnabled(id, enabled) {
	const { error } = await (await db()).from("automations").update({ enabled }).eq("id", id);
	if (error) throw error;
}
async function deleteAutomation(id) {
	const { error } = await (await db()).from("automations").delete().eq("id", id);
	if (error) throw error;
}
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
var EMPTY_FORM = {
	name: "",
	trigger: TRIGGERS[0].id,
	action: ACTIONS[0].id,
	message: ""
};
function AutomationsPage() {
	const connected = isSupabaseConfigured();
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const rules = useQuery({
		queryKey: ["automations"],
		queryFn: fetchAutomations,
		enabled: connected
	});
	const runs = useQuery({
		queryKey: ["automation-runs"],
		queryFn: () => fetchAutomationRuns(),
		enabled: connected
	});
	const save = useMutation({
		mutationFn: () => saveAutomation({
			name: form.name,
			trigger: form.trigger,
			action: form.action,
			action_config: { message: form.message }
		}),
		onSuccess: async () => {
			toast.success("Rule saved");
			setForm(EMPTY_FORM);
			setShowForm(false);
			await queryClient.invalidateQueries({ queryKey: ["automations"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	const toggle = useMutation({
		mutationFn: ({ id, enabled }) => setAutomationEnabled(id, enabled),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["automations"] })
	});
	const remove = useMutation({
		mutationFn: (id) => deleteAutomation(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["automations"] })
	});
	function submit(event) {
		event.preventDefault();
		if (!form.name.trim()) {
			toast.error("Give the rule a name.");
			return;
		}
		save.mutate();
	}
	if (!connected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Automations",
			description: "Small jobs that happen on their own."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Workflow,
			title: "Connect your database first",
			description: "Open Settings and add your database keys to start making rules."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Automations",
				description: "When something happens, do this. Every run is written down so you can check it.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowForm((value) => !value),
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New rule"]
				})
			}),
			showForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "Rule name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: form.name,
							onChange: (event) => setForm({
								...form,
								name: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "When this happens"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputClass,
							value: form.trigger,
							onChange: (event) => setForm({
								...form,
								trigger: event.target.value
							}),
							children: TRIGGERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "Do this"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputClass,
							value: form.action,
							onChange: (event) => setForm({
								...form,
								action: event.target.value
							}),
							children: ACTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "Message or note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 2,
							className: inputClass,
							value: form.message,
							onChange: (event) => setForm({
								...form,
								message: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: save.isPending,
							className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
							children: "Save rule"
						})
					})
				]
			}) : null,
			rules.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading…"
			}) : (rules.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Workflow,
				title: "No rules yet",
				description: "Make your first rule, for example: when a new lead comes in, tell the team."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: (rules.data ?? []).map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: rule.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							TRIGGERS.find((item) => item.id === rule.trigger)?.label ?? rule.trigger,
							" →",
							" ",
							ACTIONS.find((item) => item.id === rule.action)?.label ?? rule.action,
							rule.last_run_at ? ` · last run ${new Date(rule.last_run_at).toLocaleString()}` : " · never run"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: rule.enabled,
								onChange: (event) => toggle.mutate({
									id: rule.id,
									enabled: event.target.checked
								})
							}), "On"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Delete rule",
							onClick: () => remove.mutate(rule.id),
							className: "rounded-lg border border-border p-2 text-muted-foreground hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}, rule.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-foreground",
					children: "Recent runs"
				}), (runs.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Nothing has run yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: (runs.data ?? []).map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap justify-between gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: run.detail ?? run.status
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								run.status,
								" · ",
								new Date(run.created_at).toLocaleString()
							]
						})]
					}, run.id))
				})]
			})
		]
	});
}
//#endregion
export { AutomationsPage as component };
