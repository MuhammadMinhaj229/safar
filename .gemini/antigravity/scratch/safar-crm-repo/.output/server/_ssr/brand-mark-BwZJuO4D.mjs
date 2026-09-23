import { r as __toESM } from "../_runtime.mjs";
import { r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-mark-BwZJuO4D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Workspace settings — every visible aspect of the console is driven
* from here: branding, theme palette, navigation, currency, lifecycle
* stages, lead sources and retention rules.
*
* Values live in this browser (localStorage) and, once the database is
* connected, are mirrored into the `app_settings` table so the whole
* team shares one configuration. Nothing visual is hardcoded in the
* pages themselves.
*/
var DEFAULT_SETTINGS = {
	branding: {
		name: "SAFAR N MANZIL",
		tagline: "We do. We assist. We connect.",
		initial: "S",
		logoUrl: "",
		faviconUrl: "",
		logoStyle: "lockup"
	},
	theme: {
		primary: "#FF9B70",
		secondary: "#FFC2A3",
		accent: "#FFDCCB",
		background: "#FFF8F3",
		foreground: "#18294A",
		radius: 8,
		density: "comfortable",
		sidebarStyle: "warm",
		headingScale: 100,
		buttonStyle: "soft"
	},
	nav: [
		{
			id: "/dashboard",
			label: "Dashboard",
			enabled: true
		},
		{
			id: "/website",
			label: "Website",
			enabled: true
		},
		{
			id: "/customers",
			label: "Customers",
			enabled: true
		},
		{
			id: "/inbox",
			label: "Inbox",
			enabled: true
		},
		{
			id: "/operations",
			label: "Service Requests",
			enabled: true
		},
		{
			id: "/intelligence",
			label: "Website Intelligence",
			enabled: true
		},
		{
			id: "/finance",
			label: "Finance",
			enabled: true
		},
		{
			id: "/vendors",
			label: "Vendors & Partners",
			enabled: true
		},
		{
			id: "/knowledge",
			label: "Business Knowledge",
			enabled: true
		},
		{
			id: "/automations",
			label: "Automations",
			enabled: true
		},
		{
			id: "/social",
			label: "Social",
			enabled: true
		},
		{
			id: "/tools",
			label: "Tools",
			enabled: true
		},
		{
			id: "/settings",
			label: "Settings",
			enabled: true
		}
	],
	currency: "INR",
	locale: "en-IN",
	leadSources: [
		"Website",
		"WhatsApp",
		"Instagram",
		"Facebook",
		"LinkedIn",
		"Referral",
		"Community",
		"Campaign",
		"Manual entry"
	],
	lifecycleStages: [
		"LEAD",
		"QUALIFIED",
		"CONVERTED",
		"CUSTOMER",
		"ACTIVE",
		"INACTIVE",
		"CHURN_RISK",
		"REACTIVATED"
	],
	leadStatuses: [
		"new",
		"contacted",
		"qualified",
		"converted",
		"lost"
	],
	serviceCategories: [
		"Groceries & Essentials",
		"Fresh Produce",
		"Parcel & Logistics",
		"Home Services",
		"Healthcare Assistance",
		"Documentation & Legal",
		"Property & Coordination"
	],
	retention: {
		defaultInactivityDays: 7,
		categoryOverrides: [],
		churnedAfterDays: 30,
		autoFollowUpTask: true
	},
	websiteAppearance: {
		sectionStyle: "zigzag",
		showHeroHighlights: true,
		showTrustSection: true,
		showProcessSection: true,
		showFaqSection: true
	}
};
var STORAGE_KEY = "safar.workspace.settings";
var listeners = /* @__PURE__ */ new Set();
function merge(stored) {
	if (!stored || typeof stored !== "object") return DEFAULT_SETTINGS;
	const value = stored;
	return {
		branding: {
			...DEFAULT_SETTINGS.branding,
			...value.branding ?? {}
		},
		theme: {
			...DEFAULT_SETTINGS.theme,
			...value.theme ?? {}
		},
		nav: value.nav?.length ? [...value.nav, ...DEFAULT_SETTINGS.nav.filter((item) => !value.nav?.some((saved) => saved.id === item.id))] : DEFAULT_SETTINGS.nav,
		currency: value.currency ?? DEFAULT_SETTINGS.currency,
		locale: value.locale ?? DEFAULT_SETTINGS.locale,
		leadSources: value.leadSources?.length ? value.leadSources : DEFAULT_SETTINGS.leadSources,
		lifecycleStages: value.lifecycleStages?.length ? value.lifecycleStages : DEFAULT_SETTINGS.lifecycleStages,
		leadStatuses: value.leadStatuses?.length ? value.leadStatuses : DEFAULT_SETTINGS.leadStatuses,
		serviceCategories: value.serviceCategories?.length ? value.serviceCategories : DEFAULT_SETTINGS.serviceCategories,
		retention: {
			...DEFAULT_SETTINGS.retention,
			...value.retention ?? {}
		},
		websiteAppearance: {
			...DEFAULT_SETTINGS.websiteAppearance,
			...value.websiteAppearance ?? {}
		}
	};
}
var cache = null;
function getWorkspaceSettings() {
	if (cache) return cache;
	if (typeof window === "undefined") return DEFAULT_SETTINGS;
	try {
		cache = merge(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null"));
	} catch {
		cache = DEFAULT_SETTINGS;
	}
	return cache;
}
function saveWorkspaceSettings(next) {
	cache = next;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	listeners.forEach((listener) => listener());
}
/** Loads the shared configuration when the connected project has been initialized. */
async function loadSharedWorkspaceSettings() {
	const supabase = getSupabase();
	if (!supabase) return null;
	const { data, error } = await supabase.from("app_settings").select("value").eq("key", "workspace").maybeSingle();
	if (error || !data) return null;
	const next = merge(data.value);
	cache = next;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	listeners.forEach((listener) => listener());
	return next;
}
/** Publishes configuration for the public website and every signed-in team member. */
async function saveSharedWorkspaceSettings(next) {
	const supabase = getSupabase();
	if (!supabase) return;
	const { data: userData } = await supabase.auth.getUser();
	if (!userData.user) return;
	const { error } = await supabase.from("app_settings").upsert({
		key: "workspace",
		value: next,
		updated_by: userData.user.id
	}, { onConflict: "key" });
	if (error) throw new Error(error.message);
}
function resetWorkspaceSettings() {
	cache = DEFAULT_SETTINGS;
	window.localStorage.removeItem(STORAGE_KEY);
	listeners.forEach((listener) => listener());
}
function onWorkspaceSettingsChange(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
/** Applies branding + palette to the document as CSS custom properties. */
function applyTheme(settings) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	const { theme } = settings;
	const readable = (hex) => isLight(hex) ? theme.foreground : "#FFFFFF";
	root.style.setProperty("--primary", theme.primary);
	root.style.setProperty("--primary-foreground", readable(theme.primary));
	root.style.setProperty("--secondary", theme.secondary);
	root.style.setProperty("--secondary-foreground", readable(theme.secondary));
	root.style.setProperty("--accent", theme.accent);
	root.style.setProperty("--accent-foreground", readable(theme.accent));
	root.style.setProperty("--background", theme.background);
	root.style.setProperty("--foreground", theme.foreground);
	root.style.setProperty("--card", "#FFFFFF");
	root.style.setProperty("--card-foreground", theme.foreground);
	root.style.setProperty("--popover", "#FFFFFF");
	root.style.setProperty("--popover-foreground", theme.foreground);
	root.style.setProperty("--ring", theme.primary);
	root.style.setProperty("--sidebar", theme.sidebarStyle === "warm" ? mix(theme.background, "#FFFFFF", .45) : "#FFFFFF");
	root.style.setProperty("--sidebar-foreground", theme.foreground);
	root.style.setProperty("--sidebar-accent", mix(theme.accent, "#FFFFFF", .7));
	root.style.setProperty("--sidebar-accent-foreground", theme.foreground);
	root.style.setProperty("--sidebar-border", mix(theme.foreground, theme.background, .88));
	root.style.setProperty("--border", mix(theme.foreground, theme.background, .86));
	root.style.setProperty("--input", mix(theme.foreground, theme.background, .82));
	root.style.setProperty("--muted", mix(theme.background, "#FFFFFF", .4));
	root.style.setProperty("--muted-foreground", mix(theme.foreground, theme.background, .45));
	root.style.setProperty("--radius", `${theme.radius}px`);
	root.style.setProperty("--heading-scale", `${theme.headingScale / 100}`);
	root.dataset["buttonStyle"] = theme.buttonStyle;
	root.dataset["density"] = theme.density;
}
function hexToRgb(hex) {
	const clean = hex.replace("#", "");
	const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
	const int = Number.parseInt(full.slice(0, 6) || "000000", 16);
	return [
		int >> 16 & 255,
		int >> 8 & 255,
		int & 255
	];
}
function isLight(hex) {
	const [r, g, b] = hexToRgb(hex);
	return (r * 299 + g * 587 + b * 114) / 1e3 > 165;
}
/** Blends `a` into `b` by `weight` (0 = all a, 1 = all b). */
function mix(a, b, weight) {
	const [r1, g1, b1] = hexToRgb(a);
	const [r2, g2, b2] = hexToRgb(b);
	const channel = (x, y) => Math.round(x + (y - x) * weight).toString(16).padStart(2, "0");
	return `#${channel(r1, r2)}${channel(g1, g2)}${channel(b1, b2)}`;
}
/** Currency formatter driven by the configured currency + locale. */
function formatMoney(amount, settings) {
	return new Intl.NumberFormat(settings.locale, {
		style: "currency",
		currency: settings.currency,
		maximumFractionDigits: 0
	}).format(amount);
}
/** Reactive access to the workspace configuration. */
function useWorkspaceSettings() {
	const settings = (0, import_react.useSyncExternalStore)(onWorkspaceSettingsChange, getWorkspaceSettings, () => DEFAULT_SETTINGS);
	(0, import_react.useEffect)(() => {
		loadSharedWorkspaceSettings();
	}, []);
	return {
		settings,
		update: (0, import_react.useCallback)((patch) => {
			const next = {
				...getWorkspaceSettings(),
				...patch
			};
			saveWorkspaceSettings(next);
			saveSharedWorkspaceSettings(next).catch(() => void 0);
		}, []),
		reset: resetWorkspaceSettings
	};
}
/** Keeps the document palette in sync with the configured theme. */
function useThemeSync(settings) {
	(0, import_react.useEffect)(() => {
		applyTheme(settings);
	}, [settings]);
}
var safar_logo_png_asset_default = {
	version: 1,
	asset_id: "294c32b7-e8d4-41a0-9ccc-237dd894d828",
	project_id: "5911c331-57bc-4b9f-8762-05ec7cc1cb49",
	url: "/__l5e/assets-v1/294c32b7-e8d4-41a0-9ccc-237dd894d828/safar-logo.png",
	r2_key: "a/v1/5911c331-57bc-4b9f-8762-05ec7cc1cb49/294c32b7-e8d4-41a0-9ccc-237dd894d828/safar-logo.png",
	original_filename: "safar-logo.png",
	size: 54024,
	content_type: "image/png",
	created_at: "2026-09-23T08:42:00Z"
};
/**
* Brand lockup.
*
* "lockup" renders the original hand-built SAFAR mark in code: a plane taking
* off, the script wordmark, and the circled N. It stays crisp at any size and
* animates on hover.
* "image" renders the uploaded logo picture instead.
*/
function BrandMark({ name, logoUrl, style = "lockup", compact = false, inverse = false }) {
	if (style === "image") {
		if (logoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex min-w-0 items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: logoUrl,
				alt: "",
				className: `${compact ? "h-9 w-9" : "h-11 w-11"} shrink-0 rounded-lg object-cover`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `block truncate font-display text-sm font-extrabold ${inverse ? "text-background" : "text-foreground"}`,
					children: name
				})
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex min-w-0 items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: safar_logo_png_asset_default.url,
				alt: name,
				className: `${compact ? "h-10" : "h-12"} w-auto shrink-0 rounded-xl object-contain`
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {
		name,
		compact,
		inverse
	});
}
function BrandLockup({ name, compact, inverse }) {
	const tone = inverse ? "text-background" : "text-primary";
	const wordTone = inverse ? "text-background" : "text-foreground";
	const size = compact ? "text-[22px]" : "text-[26px]";
	const words = name.trim().split(/\s+/);
	const hasN = words.length > 1 && words.some((w) => w.toUpperCase() === "N");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "group inline-flex min-w-0 items-center gap-2",
		"aria-label": name,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaneIcon, { className: `${compact ? "h-5 w-5" : "h-6 w-6"} shrink-0 ${tone}` }), hasN ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `inline-flex min-w-0 items-baseline gap-1.5 ${size}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-script leading-none ${wordTone}`,
					children: words[0]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `inline-flex ${compact ? "h-5 w-5 text-[11px]" : "h-6 w-6 text-xs"} shrink-0 translate-y-[-2px] items-center justify-center rounded-full font-display font-bold ${inverse ? "bg-background text-foreground" : "bg-primary text-background"}`,
					children: "N"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `truncate font-script leading-none ${wordTone}`,
					children: words.slice(2).join(" ")
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `truncate font-script leading-none ${size} ${wordTone}`,
			children: name
		})]
	});
}
function PlaneIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		className: `${className} origin-center rotate-45 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[62deg] group-hover:scale-110`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21.5 11.1 14 9.2 9.9 2.6a1 1 0 0 0-1.8.2L6.6 7.9 2.6 9.1a1 1 0 0 0-.1 1.9l4.3 1.7 1.2 4.6a1 1 0 0 0 1.8.2l2.4-4 7.4 2a1 1 0 0 0 .4-2l-.5-2.4Z" })
	});
}
//#endregion
export { useWorkspaceSettings as i, formatMoney as n, useThemeSync as r, BrandMark as t };
