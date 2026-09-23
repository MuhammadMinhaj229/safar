import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { i as useWorkspaceSettings, n as formatMoney } from "./brand-mark-BwZJuO4D.mjs";
import { I as HeartHandshake, Q as ArrowRight, a as Users, g as Search, o as UserPlus, t as X, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as createLead, c as fetchInvoices, d as fetchTasks, f as markReactivated, i as createFollowUpTask, l as fetchLeads, n as completeTask, o as fetchContacts, p as updateLeadStatus, r as convertLeadToContact, s as fetchCustomerTimeline, t as buildRetention, u as fetchRequests } from "./crm-BTOFSzLd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-D5uv5llu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TIMELINE_TONES = {
	website: "bg-secondary text-secondary-foreground",
	request: "bg-primary/15 text-primary",
	invoice: "bg-accent text-accent-foreground",
	payment: "bg-primary text-primary-foreground",
	task: "bg-muted text-muted-foreground",
	lead: "bg-secondary text-secondary-foreground"
};
/** Everything this person did, newest first — website visits included. */
function Timeline({ contactId }) {
	const { data = [], isLoading } = useQuery({
		queryKey: ["customer-timeline", contactId],
		queryFn: () => fetchCustomerTimeline(contactId)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Nothing recorded for this customer yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-2.5",
		children: data.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mt-1 h-2 w-2 shrink-0 rounded-full ${TIMELINE_TONES[entry.kind] ?? "bg-muted"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-foreground",
					children: entry.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [new Date(entry.at).toLocaleString("en-IN", {
						dateStyle: "medium",
						timeStyle: "short"
					}), entry.detail ? ` · ${entry.detail}` : ""]
				})]
			})]
		}, entry.id))
	});
}
/** Slide-over 360° view of a single customer. */
function ContactProfile({ contact, requests, invoices, onClose }) {
	const { settings } = useWorkspaceSettings();
	const outstanding = invoices.reduce((sum, invoice) => sum + Number(invoice.outstanding ?? 0), 0);
	const lifetime = invoices.reduce((sum, invoice) => sum + Number(invoice.amount_paid ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-foreground/30",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-card shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3 border-b border-border px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold text-foreground",
					children: contact.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						contact.lifecycle_status,
						" · customer since",
						" ",
						new Date(contact.created_at).toLocaleDateString(settings.locale)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Close",
					onClick: onClose,
					className: "rounded-lg p-2 hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-6 overflow-y-auto px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Lifetime paid",
								value: formatMoney(lifetime, settings)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Outstanding",
								value: formatMoney(outstanding, settings)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Service requests",
								value: String(requests.length)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Invoices",
								value: String(invoices.length)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Contact details",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Phone",
								value: contact.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "WhatsApp",
								value: contact.whatsapp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Email",
								value: contact.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Gulf residence",
								value: [contact.gulf_city, contact.gulf_country].filter(Boolean).join(", ") || null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "India coordination address",
								value: contact.india_address
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Service history",
						children: requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No service requests yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: requests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start justify-between gap-3 rounded-lg border border-border px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-foreground",
									children: request.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										request.service_category ?? "Uncategorised",
										" ·",
										" ",
										new Date(request.created_at).toLocaleDateString(settings.locale)
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground",
									children: request.status
								})]
							}, request.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Invoices & payments",
						children: invoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No invoices yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: invoices.map((invoice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-foreground",
									children: invoice.invoice_number
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										invoice.issued_at ? new Date(invoice.issued_at).toLocaleDateString(settings.locale) : "Not issued",
										" ",
										"· ",
										invoice.status
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: formatMoney(Number(invoice.total ?? 0), settings)
								})]
							}, invoice.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Full story",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { contactId: contact.id })
					}),
					contact.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap text-sm text-muted-foreground",
							children: contact.notes
						})
					}) : null
				]
			})]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-background px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 font-display text-lg font-bold text-foreground",
			children: value
		})]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-2 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground",
		children: title
	}), children] });
}
function Detail({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-3 border-b border-border/60 py-1.5 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-right text-sm font-medium text-foreground",
			children: value ?? "—"
		})]
	});
}
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function Tag({ children, tone = "neutral" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-2.5 py-1 text-xs font-medium ${{
			neutral: "bg-accent text-accent-foreground",
			good: "bg-primary/15 text-foreground",
			warn: "bg-secondary/40 text-foreground",
			danger: "bg-destructive/10 text-destructive"
		}[tone]}`,
		children
	});
}
var EMPTY_LEAD = {
	name: "",
	phone: "",
	email: "",
	source: "",
	source_detail: "",
	service_interest: "",
	location: "",
	notes: ""
};
function LeadForm({ onDone }) {
	const { settings } = useWorkspaceSettings();
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		...EMPTY_LEAD,
		source: settings.leadSources[0] ?? "Manual entry"
	});
	const save = useMutation({
		mutationFn: () => createLead(form),
		onSuccess: async () => {
			toast.success("Lead added");
			await queryClient.invalidateQueries({ queryKey: ["leads"] });
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
				className: "text-sm font-medium text-foreground",
				children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: form.name,
					onChange: (e) => setForm({
						...form,
						name: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Phone / WhatsApp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.phone,
					placeholder: "+91…",
					onChange: (e) => setForm({
						...form,
						phone: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: form.email,
					onChange: (e) => setForm({
						...form,
						email: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Came from", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.source,
					onChange: (e) => setForm({
						...form,
						source: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`,
					children: settings.leadSources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: source,
						children: source
					}, source))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Source detail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.source_detail,
					placeholder: "Instagram reel, referral name, campaign…",
					onChange: (e) => setForm({
						...form,
						source_detail: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Service interest", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: form.service_interest,
					onChange: (e) => setForm({
						...form,
						service_interest: e.target.value
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
				children: ["Location", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.location,
					placeholder: "Family location in India / Gulf city",
					onChange: (e) => setForm({
						...form,
						location: e.target.value
					}),
					className: `mt-1.5 ${inputClass}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium text-foreground sm:col-span-2",
				children: ["Notes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 2,
					value: form.notes,
					onChange: (e) => setForm({
						...form,
						notes: e.target.value
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
					children: save.isPending ? "Saving…" : "Save lead"
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
function LeadsTab() {
	const { settings } = useWorkspaceSettings();
	const queryClient = useQueryClient();
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [sourceFilter, setSourceFilter] = (0, import_react.useState)("");
	const { data: leads = [], isLoading } = useQuery({
		queryKey: ["leads"],
		queryFn: fetchLeads
	});
	const convert = useMutation({
		mutationFn: (lead) => convertLeadToContact(lead),
		onSuccess: async () => {
			toast.success("Lead converted to a customer contact");
			await queryClient.invalidateQueries({ queryKey: ["leads"] });
			await queryClient.invalidateQueries({ queryKey: ["contacts"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Conversion failed")
	});
	const setStatus = useMutation({
		mutationFn: ({ id, status }) => updateLeadStatus(id, status),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
		onError: (error) => toast.error(error instanceof Error ? error.message : "Update failed")
	});
	const filtered = (0, import_react.useMemo)(() => leads.filter((lead) => {
		const matchesQuery = query ? `${lead.name} ${lead.phone ?? ""} ${lead.email ?? ""}`.toLowerCase().includes(query.toLowerCase()) : true;
		const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
		return matchesQuery && matchesSource;
	}), [
		leads,
		query,
		sourceFilter
	]);
	const bySource = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const lead of leads) counts.set(lead.source, (counts.get(lead.source) ?? 0) + 1);
		return [...counts.entries()].sort((a, b) => b[1] - a[1]);
	}, [leads]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[200px] flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search leads by name, phone or email",
						className: `${inputClass} pl-9`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: sourceFilter,
					onChange: (e) => setSourceFilter(e.target.value),
					className: "w-auto rounded-lg border border-input bg-background px-3 py-2.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All sources"
					}), settings.leadSources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: source,
						children: source
					}, source))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setAdding((value) => !value),
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add lead"]
				})
			]
		}),
		adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, { onDone: () => setAdding(false) }) : null,
		bySource.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: bySource.map(([source, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground",
				children: [
					source,
					" · ",
					count
				]
			}, source))
		}) : null,
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Loading leads…"
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: UserPlus,
			title: leads.length === 0 ? "No leads yet" : "No leads match this filter",
			description: "Leads arrive from the website form, WhatsApp, social media, referrals and manual entry — each tagged with exactly where it came from."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[820px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Came from"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Interest"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Added"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium text-foreground",
							children: lead.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: lead.phone ?? lead.email ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: lead.source }), lead.source_detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: lead.source_detail
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: lead.service_interest ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: lead.status,
								onChange: (e) => setStatus.mutate({
									id: lead.id,
									status: e.target.value
								}),
								className: "rounded-lg border border-input bg-background px-2 py-1 text-xs",
								children: settings.leadStatuses.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: status,
									children: status
								}, status))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: new Date(lead.created_at).toLocaleDateString(settings.locale)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right",
							children: lead.status === "converted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "good",
								children: "Converted"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => convert.mutate(lead),
								disabled: convert.isPending,
								className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50",
								children: ["Convert ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})
						})
					]
				}, lead.id)) })]
			})
		})
	] });
}
function ContactsTab() {
	const { settings } = useWorkspaceSettings();
	const [query, setQuery] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const { data: contacts = [], isLoading } = useQuery({
		queryKey: ["contacts"],
		queryFn: fetchContacts
	});
	const { data: requests = [] } = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests
	});
	const { data: invoices = [] } = useQuery({
		queryKey: ["invoices"],
		queryFn: fetchInvoices
	});
	const filtered = contacts.filter((contact) => query ? `${contact.name} ${contact.phone ?? ""} ${contact.email ?? ""}`.toLowerCase().includes(query.toLowerCase()) : true);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-center text-sm text-muted-foreground",
		children: "Loading contacts…"
	});
	if (contacts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Users,
		title: "No customer contacts yet",
		description: "When a lead becomes a trusted customer it converts into a contact — with the full 360° profile: addresses, requests, invoices, payments and conversations."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search customers",
				className: `${inputClass} pl-9`
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Phone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Gulf base"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Stage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Since"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					onClick: () => setSelected(contact),
					className: "cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium text-foreground",
							children: contact.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: contact.phone ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: [contact.gulf_city, contact.gulf_country].filter(Boolean).join(", ") || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: contact.lifecycle_status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: new Date(contact.created_at).toLocaleDateString(settings.locale)
						})
					]
				}, contact.id)) })]
			})
		}),
		selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactProfile, {
			contact: selected,
			requests: requests.filter((request) => request.contact_id === selected.id),
			invoices: invoices.filter((invoice) => invoice.contact_id === selected.id),
			onClose: () => setSelected(null)
		}) : null
	] });
}
function ChurnTab() {
	const { settings } = useWorkspaceSettings();
	const queryClient = useQueryClient();
	const { data: contacts = [] } = useQuery({
		queryKey: ["contacts"],
		queryFn: fetchContacts
	});
	const { data: requests = [] } = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests
	});
	const { data: tasks = [] } = useQuery({
		queryKey: ["tasks"],
		queryFn: fetchTasks
	});
	const openFollowUps = (0, import_react.useMemo)(() => new Set(tasks.filter((task) => task.status === "open" && task.contact_id).map((task) => task.contact_id)), [tasks]);
	const followUp = useMutation({
		mutationFn: ({ contactId, title }) => createFollowUpTask(contactId, title),
		onSuccess: async () => {
			toast.success("Follow-up task created");
			await queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not create task")
	});
	const reactivate = useMutation({
		mutationFn: (contactId) => markReactivated(contactId),
		onSuccess: async () => {
			toast.success("Marked as reactivated");
			await queryClient.invalidateQueries({ queryKey: ["contacts"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not update")
	});
	const closeTask = useMutation({
		mutationFn: (id) => completeTask(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["tasks"] });
		}
	});
	const rows = (0, import_react.useMemo)(() => buildRetention(contacts, requests, settings), [
		contacts,
		requests,
		settings
	]);
	const needsAttention = rows.filter((row) => row.state === "at_risk" || row.state === "churned");
	if (contacts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: HeartHandshake,
		title: "Retention intelligence activates with your first customers",
		description: `For every customer: days since their last order, what they repeatedly need, and a follow-up prompt when they go quiet. Currently at risk after ${settings.retention.defaultInactivityDays} days, churned after ${settings.retention.churnedAfterDays} — change this in Settings → Business rules.`
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						label: "Customers",
						value: rows.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						label: `At risk (${settings.retention.defaultInactivityDays}+ days quiet)`,
						value: rows.filter((row) => row.state === "at_risk").length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						label: `Churn follow-up (${settings.retention.churnedAfterDays}+ days)`,
						value: rows.filter((row) => row.state === "churned").length
					})
				]
			}),
			needsAttention.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card px-5 py-8 text-center text-sm text-muted-foreground",
				children: "Everyone is active — nobody has gone quiet past your thresholds."
			}) : null,
			tasks.filter((task) => task.status === "open" && task.kind === "follow_up").length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Open follow-ups"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: tasks.filter((task) => task.status === "open" && task.kind === "follow_up").map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: task.title
						}), task.due_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Due ", new Date(task.due_at).toLocaleDateString(settings.locale)]
						}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => closeTask.mutate(task.id),
							className: "shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent",
							children: "Done"
						})]
					}, task.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: row.contact.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: row.lastOrderAt ? `Last order ${new Date(row.lastOrderAt).toLocaleDateString(settings.locale)} · ${row.daysQuiet} days ago` : "Never placed an order"
							})] }), row.state === "churned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "danger",
								children: "Churn follow-up"
							}) : row.state === "at_risk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "warn",
								children: "At risk"
							}) : row.state === "never_ordered" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: "No orders" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "good",
								children: "Active"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: row.categoryCounts.slice(0, 4).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground",
								children: [
									entry.category,
									" ×",
									entry.count
								]
							}, entry.category))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								row.orderCount,
								" order",
								row.orderCount === 1 ? "" : "s",
								" · usually needs",
								" ",
								row.topCategory ?? "—",
								" · threshold ",
								row.thresholdDays,
								" days"
							]
						}),
						row.state === "at_risk" || row.state === "churned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								openFollowUps.has(row.contact.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground",
									children: "Follow-up already open"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => followUp.mutate({
										contactId: row.contact.id,
										title: `Re-engage ${row.contact.name} — quiet ${row.daysQuiet} days${row.topCategory ? `, usually orders ${row.topCategory}` : ""}`
									}),
									disabled: followUp.isPending,
									className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
									children: "Create follow-up"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => reactivate.mutate(row.contact.id),
									disabled: reactivate.isPending,
									className: "rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50",
									children: "Mark reactivated"
								}),
								row.contact.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://wa.me/${row.contact.phone.replace(/[^\d]/g, "")}`,
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent",
									children: "WhatsApp"
								}) : null
							]
						}) : null
					]
				}, row.contact.id))
			})
		]
	});
}
function Summary({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl font-bold text-foreground",
			children: value
		})]
	});
}
var TABS = [
	{
		id: "leads",
		label: "Leads"
	},
	{
		id: "contacts",
		label: "Contacts"
	},
	{
		id: "churn",
		label: "Churn & Retention"
	}
];
function CustomersPage() {
	const [tab, setTab] = (0, import_react.useState)("leads");
	const connected = isSupabaseConfigured();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Customers",
		description: "Leads with their true origin, trusted customer contacts, and retention intelligence — the full lifecycle in one place."
	}), !connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Users,
		title: "Connect your database to start",
		description: "Open Settings → Connections, paste your Supabase project URL and keys, and run the one-time setup script. Leads and customers appear here immediately after."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-1 rounded-lg border border-border bg-card p-1",
			children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(item.id),
				className: `flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors sm:flex-none sm:px-4 ${tab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`,
				children: item.label
			}, item.id))
		}),
		tab === "leads" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadsTab, {}) : null,
		tab === "contacts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactsTab, {}) : null,
		tab === "churn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChurnTab, {}) : null
	] })] });
}
//#endregion
export { CustomersPage as component };
