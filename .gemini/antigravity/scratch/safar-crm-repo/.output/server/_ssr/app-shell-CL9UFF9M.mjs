import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured, r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useWorkspaceSettings, r as useThemeSync, t as BrandMark } from "./brand-mark-BwZJuO4D.mjs";
import { $ as Activity, L as Handshake, M as LayoutDashboard, O as Menu, R as Globe, T as MessageSquare, U as ClipboardList, X as BookOpen, a as Users, i as Wallet, k as LogOut, m as Settings, n as Wrench, p as Share2, r as Workflow, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-CL9UFF9M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_ICONS = {
	"/dashboard": LayoutDashboard,
	"/website": Globe,
	"/customers": Users,
	"/inbox": MessageSquare,
	"/knowledge": BookOpen,
	"/automations": Workflow,
	"/social": Share2,
	"/operations": ClipboardList,
	"/intelligence": Activity,
	"/finance": Wallet,
	"/vendors": Handshake,
	"/tools": Wrench,
	"/settings": Settings
};
function NavLinks({ onNavigate }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const { settings } = useWorkspaceSettings();
	const items = settings.nav.filter((item) => item.enabled || item.id === "/settings");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: items.map((item) => {
			const Icon = NAV_ICONS[item.id] ?? LayoutDashboard;
			const active = pathname.startsWith(item.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.id,
				onClick: onNavigate,
				className: `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), item.label]
			}, item.id);
		})
	});
}
function Brand() {
	const { settings } = useWorkspaceSettings();
	const { branding } = settings;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {
			name: branding.name,
			logoUrl: branding.logoUrl,
			style: branding.logoStyle
		})
	});
}
function SignOutButton() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isSupabaseConfigured()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		disabled: busy,
		onClick: async () => {
			setBusy(true);
			try {
				await getSupabase()?.auth.signOut();
			} finally {
				navigate({
					to: "/auth",
					replace: true
				});
			}
		},
		className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground disabled:opacity-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign out"]
	});
}
function SetupBanner() {
	if (isSupabaseConfigured()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border bg-accent px-4 py-2.5 text-center text-sm text-accent-foreground",
		children: [
			"Database not connected yet.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/settings",
				className: "font-semibold underline underline-offset-2",
				children: "Open Settings → Connections"
			}),
			" ",
			"to paste your Supabase keys and bring the CRM to life."
		]
	});
}
function AppShell({ children }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const { settings } = useWorkspaceSettings();
	useThemeSync(settings);
	const pad = settings.theme.density === "compact" ? "px-4 py-4 sm:px-5" : "px-4 py-6 sm:px-6 lg:px-8";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-sidebar-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutButton, {})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center justify-between border-b border-border bg-sidebar px-4 py-3 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Open menu",
						onClick: () => setMobileOpen(true),
						className: "rounded-lg p-2 hover:bg-sidebar-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})]
				}),
				mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-30 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-foreground/30",
						onClick: () => setMobileOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-sidebar-border px-3 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Close menu",
									onClick: () => setMobileOpen(false),
									className: "rounded-lg p-2 hover:bg-sidebar-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-y-auto p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { onNavigate: () => setMobileOpen(false) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-sidebar-border p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutButton, {})
							})
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupBanner, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: `min-w-0 flex-1 ${pad}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-full max-w-[1500px]",
						children
					})
				})
			]
		})]
	});
}
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold tracking-tight text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: actions
		}) : null]
	});
}
//#endregion
export { PageHeader as n, AppShell as t };
