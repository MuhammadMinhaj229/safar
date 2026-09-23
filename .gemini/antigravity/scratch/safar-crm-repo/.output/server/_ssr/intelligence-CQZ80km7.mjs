import { r as __toESM } from "../_runtime.mjs";
import { r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as Activity, a as Users, h as Send, w as MousePointerClick } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intelligence-CQZ80km7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Website intelligence reads for the CRM.
* Every number here traces back to real rows — nothing is estimated.
*/
var RANGE_OPTIONS = [
	{
		id: "today",
		label: "Today",
		days: 1
	},
	{
		id: "7d",
		label: "Last 7 days",
		days: 7
	},
	{
		id: "30d",
		label: "Last 30 days",
		days: 30
	},
	{
		id: "90d",
		label: "Last 90 days",
		days: 90
	}
];
function sinceIso(days) {
	if (days === 1) {
		const start = /* @__PURE__ */ new Date();
		start.setHours(0, 0, 0, 0);
		return start.toISOString();
	}
	return (/* @__PURE__ */ new Date(Date.now() - days * 24 * 60 * 60 * 1e3)).toISOString();
}
function tally(values) {
	const counts = /* @__PURE__ */ new Map();
	for (const value of values) {
		const key = value && value.trim() ? value.trim() : "direct";
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}
	return [...counts.entries()].map(([label, count]) => ({
		label,
		count
	})).sort((a, b) => b.count - a.count);
}
function sourceOf(session) {
	if (session.utm_source) return session.utm_source;
	if (!session.referrer) return "direct";
	try {
		const host = new URL(session.referrer).hostname.replace(/^www\./, "");
		if (host.includes("google")) return "google";
		if (host.includes("instagram")) return "instagram";
		if (host.includes("facebook")) return "facebook";
		return host;
	} catch {
		return "direct";
	}
}
async function fetchIntelligence(range) {
	const empty = {
		connected: false,
		visitors: 0,
		sessions: 0,
		events: 0,
		enquiries: 0,
		sources: [],
		topEvents: [],
		recentSessions: []
	};
	const supabase = getSupabase();
	if (!supabase) return empty;
	const since = sinceIso(RANGE_OPTIONS.find((option) => option.id === range)?.days ?? 7);
	const [sessionsRes, eventsRes, enquiriesRes] = await Promise.all([
		supabase.from("visitor_sessions").select("id, session_key, visitor_key, started_at, landing_page, referrer, utm_source, utm_medium, utm_campaign, device, browser, country").gte("started_at", since).order("started_at", { ascending: false }).limit(500),
		supabase.from("events").select("name, visitor_key").gte("occurred_at", since).limit(5e3),
		supabase.from("leads").select("id", {
			count: "exact",
			head: true
		}).eq("source", "website").gte("created_at", since)
	]);
	if (sessionsRes.error && eventsRes.error) return empty;
	const sessions = sessionsRes.data ?? [];
	const events = eventsRes.data ?? [];
	return {
		connected: true,
		visitors: new Set(sessions.map((session) => session.visitor_key)).size,
		sessions: sessions.length,
		events: events.length,
		enquiries: enquiriesRes.count ?? 0,
		sources: tally(sessions.map(sourceOf)).slice(0, 8),
		topEvents: tally(events.map((event) => event.name)).slice(0, 10),
		recentSessions: sessions.slice(0, 25)
	};
}
/** Everything one anonymous device did, newest first. */
async function fetchVisitorJourney(visitorKey) {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("events").select("id, name, visitor_key, session_key, route, page_title, properties, occurred_at").eq("visitor_key", visitorKey).order("occurred_at", { ascending: false }).limit(200);
	if (error) return [];
	return data ?? [];
}
var EVENT_LABELS = {
	"page.viewed": "Opened a page",
	"session.started": "Started a visit",
	"service.viewed": "Looked at a service",
	"pricing.viewed": "Looked at prices",
	"faq.viewed": "Read the questions",
	"search.performed": "Searched",
	"cta.clicked": "Clicked a button",
	"form.started": "Started the form",
	"form.submitted": "Sent the form",
	"whatsapp.clicked": "Clicked WhatsApp",
	"phone.clicked": "Clicked the phone number",
	"email.clicked": "Clicked the email",
	"feedback.submitted": "Left feedback"
};
function labelEvent(name) {
	return EVENT_LABELS[name] ?? name;
}
function timeAgo(iso) {
	const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 6e4);
	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes} min ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours} h ago`;
	return `${Math.round(hours / 24)} d ago`;
}
function IntelligencePage() {
	const [range, setRange] = (0, import_react.useState)("7d");
	const [openVisitor, setOpenVisitor] = (0, import_react.useState)(null);
	const { data, isLoading } = useQuery({
		queryKey: ["intelligence", range],
		queryFn: () => fetchIntelligence(range)
	});
	const { data: journey = [] } = useQuery({
		queryKey: ["visitor-journey", openVisitor],
		queryFn: () => fetchVisitorJourney(openVisitor),
		enabled: Boolean(openVisitor)
	});
	const cards = [
		{
			label: "People who visited",
			value: data?.visitors ?? 0,
			icon: Users
		},
		{
			label: "Visits",
			value: data?.sessions ?? 0,
			icon: Activity
		},
		{
			label: "Actions recorded",
			value: data?.events ?? 0,
			icon: MousePointerClick
		},
		{
			label: "Enquiries sent",
			value: data?.enquiries ?? 0,
			icon: Send
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Website intelligence",
			description: "Who came to the website, where they came from, and what they did."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: RANGE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setRange(option.id),
				className: `rounded-lg border px-3 py-1.5 text-sm transition ${range === option.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`,
				children: option.label
			}, option.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground",
						children: card.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-4 w-4 text-primary" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-3xl font-bold text-foreground",
					children: card.value
				})]
			}, card.label))
		}),
		!isLoading && (data?.sessions ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Activity,
				title: "No website visits recorded yet",
				description: "Once the website is live with the database details in place, every visit, click and enquiry will show here."
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Where they came from"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2",
					children: [(data?.sources ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "capitalize text-muted-foreground",
							children: row.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: row.count
						})]
					}, row.label)), (data?.sources ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted-foreground",
						children: "Nothing yet."
					}) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "What they did most"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2",
					children: [(data?.topEvents ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: labelEvent(row.label)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: row.count
						})]
					}, row.label)), (data?.topEvents ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted-foreground",
						children: "Nothing yet."
					}) : null]
				})]
			})]
		}),
		(data?.recentSessions ?? []).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl border border-border bg-card p-5 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Recent visits"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: (data?.recentSessions ?? []).map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpenVisitor(openVisitor === session.visitor_key ? null : session.visitor_key),
						className: "flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 px-4 py-3 text-left text-sm transition hover:border-primary/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: session.landing_page ?? "/"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								session.utm_campaign ?? session.utm_source ?? "direct",
								" · ",
								session.device ?? "—",
								" ·",
								" ",
								timeAgo(session.started_at)
							]
						})]
					}, session.id))
				}),
				openVisitor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-lg border border-primary/30 bg-secondary/20 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "What this person did"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 space-y-2",
						children: [journey.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [labelEvent(event.name), event.route ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [" · ", event.route]
							}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-muted-foreground",
								children: timeAgo(event.occurred_at)
							})]
						}, event.id)), journey.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted-foreground",
							children: "No actions recorded for this visit."
						}) : null]
					})]
				}) : null
			]
		}) : null
	] });
}
//#endregion
export { IntelligencePage as component };
