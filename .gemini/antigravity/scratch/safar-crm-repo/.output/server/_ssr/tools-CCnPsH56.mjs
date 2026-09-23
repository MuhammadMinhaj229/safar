import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { B as FileText, D as MessageCircle, J as ChartColumn, Y as CalendarClock, i as Wallet } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-CCnPsH56.js
var import_jsx_runtime = require_jsx_runtime();
var TOOLS = [
	{
		id: "invoify",
		name: "Safar Invoify",
		description: "Generate professional invoices with the customer and service request pre-filled.",
		icon: FileText,
		status: "Connect in Settings"
	},
	{
		id: "social",
		name: "Social Media Scheduler",
		description: "Buffer-style calendar for scheduled posting across Instagram, Facebook, LinkedIn and X.",
		icon: CalendarClock,
		status: "Connect in Settings"
	},
	{
		id: "bi",
		name: "Business Intelligence",
		description: "Every number in the CRM as simple, readable charts — demand, repeats, revenue curves.",
		icon: ChartColumn,
		status: "Activates with your data"
	},
	{
		id: "finance",
		name: "Finance & Investments",
		description: "Cash flow, operating expenses, capital investments and provider payouts in one ledger.",
		icon: Wallet,
		status: "Connect in Settings"
	},
	{
		id: "whatsapp",
		name: "WhatsApp Toolbox",
		description: "QR session pairing, quick-reply macros and paced broadcast queues — no Meta API needed.",
		icon: MessageCircle,
		status: "Connect in Settings"
	}
];
function ToolsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Tools",
		description: "The professional toolkit. Connect each tool once in Settings → Connections and it lights up here."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
		children: TOOLS.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tool.icon, { className: "h-5 w-5 text-accent-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-foreground",
						children: tool.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 flex-1 text-sm text-muted-foreground",
					children: tool.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: tool.status
				})
			]
		}, tool.id))
	})] });
}
//#endregion
export { ToolsPage as component };
