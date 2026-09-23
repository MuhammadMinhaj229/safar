import { r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { E as MessageSquareWarning, N as IndianRupee, T as MessageSquare, U as ClipboardList, a as Users, l as Timer, z as Flame } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { n as checkIntegrationHealth } from "./social-D5QMRJSl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CszimLsN.js
var import_jsx_runtime = require_jsx_runtime();
async function fetchStats() {
	const supabase = getSupabase();
	if (!supabase) return {
		activeRequests: 0,
		pendingInquiries: 0,
		todayRevenue: 0,
		urgentHandoffs: 0,
		visitorsToday: 0,
		unreadMessages: 0,
		hotLeads: 0
	};
	const dayStart = `${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}T00:00:00Z`;
	const empty = { count: 0 };
	const [requests, inquiries, handoffs] = await Promise.all([
		supabase.from("service_requests").select("id", {
			count: "exact",
			head: true
		}).in("status", ["open", "in_progress"]).then((r) => r.error ? empty : r),
		supabase.from("leads").select("id", {
			count: "exact",
			head: true
		}).eq("status", "new").then((r) => r.error ? empty : r),
		supabase.from("tasks").select("id", {
			count: "exact",
			head: true
		}).eq("priority", "urgent").eq("status", "open").then((r) => r.error ? empty : r)
	]);
	const [sessions, hot, conversations] = await Promise.all([
		supabase.from("visitor_sessions").select("id", {
			count: "exact",
			head: true
		}).gte("started_at", dayStart).then((r) => r.error ? empty : r),
		supabase.from("leads").select("id", {
			count: "exact",
			head: true
		}).gte("score", 60).then((r) => r.error ? empty : r),
		supabase.from("conversations").select("unread_count").gt("unread_count", 0).then((r) => r.error ? { data: [] } : r)
	]);
	const unreadMessages = (conversations.data ?? []).reduce((sum, row) => sum + Number(row.unread_count ?? 0), 0);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const { data: payments } = await supabase.from("payments").select("amount").gte("paid_at", `${today}T00:00:00Z`);
	const todayRevenue = (payments ?? []).reduce((sum, row) => sum + Number(row.amount), 0);
	return {
		activeRequests: requests.count ?? 0,
		pendingInquiries: inquiries.count ?? 0,
		todayRevenue,
		urgentHandoffs: handoffs.count ?? 0,
		visitorsToday: sessions.count ?? 0,
		unreadMessages,
		hotLeads: hot.count ?? 0
	};
}
var CARDS = [
	{
		key: "activeRequests",
		label: "Active service requests",
		icon: ClipboardList,
		hint: "Open and in-progress work orders"
	},
	{
		key: "pendingInquiries",
		label: "Pending inquiries",
		icon: MessageSquareWarning,
		hint: "New leads waiting for a first reply"
	},
	{
		key: "todayRevenue",
		label: "Today's revenue",
		icon: IndianRupee,
		hint: "Payments received today"
	},
	{
		key: "visitorsToday",
		label: "Visits today",
		icon: Users,
		hint: "People who opened the website today"
	},
	{
		key: "unreadMessages",
		label: "Unread messages",
		icon: MessageSquare,
		hint: "Messages waiting for a reply in the Inbox"
	},
	{
		key: "hotLeads",
		label: "Hot leads",
		icon: Flame,
		hint: "Leads with strong interest, ready for a call"
	},
	{
		key: "urgentHandoffs",
		label: "Urgent handoffs",
		icon: Timer,
		hint: "Tasks marked urgent and still open"
	}
];
function DashboardPage() {
	const { data } = useQuery({
		queryKey: ["dashboard-stats"],
		queryFn: fetchStats
	});
	const health = useQuery({
		queryKey: ["integration-health"],
		queryFn: checkIntegrationHealth
	});
	const notReady = (health.data ?? []).filter((item) => !item.ok);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Dashboard",
			description: "The daily pulse — nothing more, nothing less."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: CARDS.map((card) => {
				const value = data?.[card.key] ?? 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: card.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-4 w-4 text-primary" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-3xl font-bold text-foreground",
							children: card.key === "todayRevenue" ? `₹${value.toLocaleString("en-IN")}` : value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: value === 0 ? "Nothing right now" : card.hint
						})
					]
				}, card.key);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-xl border border-border bg-card p-5 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-foreground",
				children: "Connections"
			}), health.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Checking…"
			}) : notReady.length === 0 && (health.data ?? []).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Everything that is set up is working."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 text-sm text-muted-foreground",
				children: notReady.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: item.label
					}),
					" — not connected. ",
					item.detail,
					"."
				] }, item.key))
			})]
		})
	] });
}
//#endregion
export { DashboardPage as component };
