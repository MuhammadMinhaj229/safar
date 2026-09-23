import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured, r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useWorkspaceSettings, r as useThemeSync, t as BrandMark } from "./brand-mark-BwZJuO4D.mjs";
import { A as Lock, D as MessageCircle, K as CircleCheck, P as House, Q as ArrowRight, Z as BadgeCheck, b as Quote, d as ShoppingBasket, f as ShieldCheck, q as ChevronDown, u as Stethoscope } from "../_libs/lucide-react.mjs";
import { i as fetchPublishedContent, r as defaultSections } from "./cms-C-fbWjA1.mjs";
import { t as SiteFooter } from "./site-footer-Ce-PGTXK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CvcJ0oXJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* First-party website intelligence.
*
* Every visitor gets an anonymous key stored in their own browser. Nothing
* personal is collected until the person identifies themselves through the
* enquiry form or a message. Events are queued and sent in the background so
* the website never waits for tracking, and the site keeps working normally
* if the database is unreachable.
*/
var VISITOR_KEY = "safar.visitor";
var SESSION_KEY = "safar.session";
var SESSION_STARTED = "safar.session.started";
var FIRST_TOUCH_KEY = "safar.first_touch";
var SESSION_TIMEOUT_MS = 18e5;
function browserId(prefix) {
	return `${prefix}_${typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}
function readStore(store, key) {
	try {
		return store?.getItem(key) ?? null;
	} catch {
		return null;
	}
}
function writeStore(store, key, value) {
	try {
		store?.setItem(key, value);
	} catch {}
}
function getVisitorKey() {
	if (typeof window === "undefined") return null;
	let key = readStore(window.localStorage, VISITOR_KEY);
	if (!key) {
		key = browserId("vis");
		writeStore(window.localStorage, VISITOR_KEY, key);
	}
	return key;
}
function currentTouch() {
	const params = new URLSearchParams(window.location.search);
	const pick = (name) => params.get(name) || null;
	return {
		landing_page: window.location.pathname + window.location.search,
		referrer: document.referrer || "",
		utm_source: pick("utm_source"),
		utm_medium: pick("utm_medium"),
		utm_campaign: pick("utm_campaign"),
		utm_term: pick("utm_term"),
		utm_content: pick("utm_content")
	};
}
function getFirstTouch() {
	if (typeof window === "undefined") return null;
	const raw = readStore(window.localStorage, FIRST_TOUCH_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function describeDevice() {
	const ua = navigator.userAgent;
	return {
		device: /Mobi|Android|iPhone/i.test(ua) ? "mobile" : /iPad|Tablet/i.test(ua) ? "tablet" : "desktop",
		browser: /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : /Firefox\//.test(ua) ? "Firefox" : "Other",
		os: /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" : /iPhone|iPad|iOS/.test(ua) ? "iOS" : /Mac OS/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "Other"
	};
}
var sessionEnsured = null;
async function ensureSession() {
	if (typeof window === "undefined") return null;
	const visitorKey = getVisitorKey();
	if (!visitorKey) return null;
	const existing = readStore(window.sessionStorage, SESSION_KEY);
	const startedAt = Number(readStore(window.sessionStorage, SESSION_STARTED) ?? 0);
	if (existing && Date.now() - startedAt < SESSION_TIMEOUT_MS && existing) return existing;
	const sessionKey = browserId("ses");
	writeStore(window.sessionStorage, SESSION_KEY, sessionKey);
	writeStore(window.sessionStorage, SESSION_STARTED, String(Date.now()));
	const touch = currentTouch();
	if (!getFirstTouch()) writeStore(window.localStorage, FIRST_TOUCH_KEY, JSON.stringify(touch));
	const supabase = getSupabase();
	if (!supabase) return sessionKey;
	const firstTouch = getFirstTouch() ?? touch;
	const { device, browser, os } = describeDevice();
	supabase.from("visitors").insert({
		visitor_key: visitorKey,
		first_landing_page: firstTouch.landing_page,
		first_referrer: firstTouch.referrer,
		first_utm_source: firstTouch.utm_source,
		first_utm_medium: firstTouch.utm_medium,
		first_utm_campaign: firstTouch.utm_campaign
	}).then(() => void 0);
	supabase.from("visitor_sessions").insert({
		session_key: sessionKey,
		visitor_key: visitorKey,
		landing_page: touch.landing_page,
		referrer: touch.referrer,
		utm_source: touch.utm_source,
		utm_medium: touch.utm_medium,
		utm_campaign: touch.utm_campaign,
		utm_term: touch.utm_term,
		utm_content: touch.utm_content,
		device,
		browser,
		os,
		language: navigator.language
	}).then(() => void 0);
	return sessionKey;
}
var queue = [];
var flushTimer = null;
async function flush() {
	flushTimer = null;
	if (queue.length === 0) return;
	const supabase = getSupabase();
	if (!supabase) {
		queue.length = 0;
		return;
	}
	const batch = queue.splice(0, queue.length);
	try {
		await supabase.from("events").insert(batch);
	} catch {}
}
function scheduleFlush() {
	if (flushTimer) return;
	flushTimer = setTimeout(() => void flush(), 800);
}
/** Record a website action. Safe to call anywhere; never throws. */
function track(name, properties = {}) {
	if (typeof window === "undefined" || !isSupabaseConfigured()) return;
	const visitorKey = getVisitorKey();
	if (!visitorKey) return;
	if (!sessionEnsured) sessionEnsured = ensureSession();
	sessionEnsured.then((sessionKey) => {
		if (!sessionKey) return;
		queue.push({
			event_key: browserId("evt"),
			name,
			visitor_key: visitorKey,
			session_key: sessionKey,
			route: window.location.pathname,
			page_title: document.title,
			properties,
			occurred_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		scheduleFlush();
	});
}
/** Call once when a public page mounts. */
function trackPageView(extra = {}) {
	track("page.viewed", {
		...extra,
		search: window.location.search || void 0
	});
}
if (typeof window !== "undefined") {
	window.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") flush();
	});
	window.addEventListener("pagehide", () => void flush());
}
/**
* Website enquiry capture.
*
* Turns a form submission on the public site into a real lead row in the
* business database, carrying the visitor's earlier browsing history and the
* campaign they arrived from. If the database is not reachable the form still
* works — the person is handed over to WhatsApp and nothing is lost on screen.
*/
async function submitWebsiteEnquiry(input) {
	track("form.submitted", {
		service_interest: input.serviceInterest ?? null,
		has_city: Boolean(input.city)
	});
	const supabase = getSupabase();
	if (!supabase) return {
		saved: false,
		reason: "not_connected"
	};
	const firstTouch = getFirstTouch();
	const visitorKey = getVisitorKey();
	const { data, error } = await supabase.from("leads").insert({
		name: input.name.trim(),
		phone: input.phone.trim(),
		source: "website",
		source_detail: firstTouch?.landing_page ?? "/",
		campaign: firstTouch?.utm_campaign ?? null,
		service_interest: input.serviceInterest ?? null,
		location: input.city?.trim() || null,
		notes: input.need.trim(),
		visitor_key: visitorKey,
		status: "new"
	}).select("id").single();
	if (error || !data) return {
		saved: false,
		reason: error?.message
	};
	const touches = [];
	if (firstTouch) touches.push({
		visitor_key: visitorKey,
		lead_id: data.id,
		touch_type: "first",
		source: firstTouch.utm_source ?? referrerSource(firstTouch.referrer),
		medium: firstTouch.utm_medium,
		campaign: firstTouch.utm_campaign,
		landing_page: firstTouch.landing_page
	});
	touches.push({
		visitor_key: visitorKey,
		lead_id: data.id,
		touch_type: "conversion",
		source: "website",
		medium: "form",
		campaign: firstTouch?.utm_campaign ?? null,
		landing_page: typeof window !== "undefined" ? window.location.pathname : null
	});
	supabase.from("attribution_touches").insert(touches);
	supabase.from("lead_events").insert({
		lead_id: data.id,
		kind: "note",
		detail: "Created from the website enquiry form"
	});
	return {
		saved: true,
		leadId: data.id
	};
}
function referrerSource(referrer) {
	if (!referrer) return "direct";
	try {
		const host = new URL(referrer).hostname.replace(/^www\./, "");
		if (host.includes("google")) return "google";
		if (host.includes("instagram")) return "instagram";
		if (host.includes("facebook")) return "facebook";
		if (host.includes("whatsapp")) return "whatsapp";
		return host;
	} catch {
		return "direct";
	}
}
var safar_cast_default = "/assets/safar-cast-DHMIJK5u.png";
var CAST_FACES = [
	"/assets/safar-face-son-DcEEqhD9.png",
	"/assets/safar-face-daughter-BSU0g8zX.png",
	"/assets/safar-face-parents-BnzxPMiP.png"
];
function str(content, key, fallback = "") {
	const value = content[key];
	return typeof value === "string" && value.trim() ? value : fallback;
}
function list(content, key) {
	const value = content[key];
	return Array.isArray(value) ? value : [];
}
function SiteHeader({ brandName, logoUrl, logoStyle }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const links = [
		{
			label: "Services",
			href: "#services"
		},
		{
			label: "How it works",
			href: "#how-it-works"
		},
		{
			label: "FAQ",
			href: "#faq"
		},
		{
			label: "Contact",
			href: "#contact"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-4 px-5 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {
						name: brandName,
						logoUrl,
						style: logoStyle,
						compact: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-auto hidden items-center gap-7 md:flex",
					"aria-label": "Main",
					children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						className: "text-sm font-medium text-muted-foreground transition hover:text-foreground",
						children: link.label
					}, link.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#contact",
					onClick: () => track("cta.clicked", {
						place: "header",
						label: "Ask for help"
					}),
					className: "brand-button ml-auto hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-md md:ml-0 md:inline-block",
					children: "Ask for help"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen((value) => !value),
					className: "ml-auto rounded-lg border border-border px-3 py-2 text-sm font-medium md:hidden",
					"aria-expanded": open,
					children: "Menu"
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border bg-background px-5 py-3 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-1",
				children: [links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: link.href,
					onClick: () => setOpen(false),
					className: "block rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-accent",
					children: link.label
				}) }, link.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#contact",
					onClick: () => setOpen(false),
					className: "mt-1 block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground",
					children: "Ask for help"
				}) })]
			})
		}) : null]
	});
}
function ContactForm({ whatsapp, email }) {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		city: "",
		need: ""
	});
	const [started, setStarted] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const digits = whatsapp.replace(/[^\d]/g, "");
	const message = `Hello SAFAR N MANZIL,%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0ACity in India: ${encodeURIComponent(form.city)}%0AWhat is needed: ${encodeURIComponent(form.need)}`;
	const target = digits ? `https://wa.me/${digits}?text=${message}` : email ? `mailto:${email}?subject=${encodeURIComponent("Assistance request")}&body=${message}` : "";
	const fieldClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25";
	function noteStart() {
		if (started) return;
		setStarted(true);
		track("form.started");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onFocus: noteStart,
		onSubmit: (event) => {
			event.preventDefault();
			setSending(true);
			submitWebsiteEnquiry({
				name: form.name,
				phone: form.phone,
				city: form.city,
				need: form.need
			}).finally(() => {
				setSending(false);
				if (target) window.open(target, "_blank", "noopener");
			});
		},
		className: "rounded-lg border border-border bg-card p-6 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium text-foreground",
						children: ["Your name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							}),
							className: `mt-1.5 ${fieldClass}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium text-foreground",
						children: ["Your number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: form.phone,
							onChange: (e) => setForm({
								...form,
								phone: e.target.value
							}),
							placeholder: "+971…",
							className: `mt-1.5 ${fieldClass}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium text-foreground sm:col-span-2",
						children: ["City in India", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.city,
							onChange: (e) => setForm({
								...form,
								city: e.target.value
							}),
							className: `mt-1.5 ${fieldClass}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium text-foreground sm:col-span-2",
						children: ["What do you need done?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							rows: 4,
							value: form.need,
							onChange: (e) => setForm({
								...form,
								need: e.target.value
							}),
							placeholder: "Monthly groceries for my parents in Hyderabad, first week of every month…",
							className: `mt-1.5 ${fieldClass}`
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				disabled: !target || sending,
				className: "brand-button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), sending ? "Sending…" : "Send the request"]
			}),
			!target ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "Add a WhatsApp number or email in the CRM under Website → Contact to activate this form."
			}) : null
		]
	});
}
function LandingPage() {
	const { settings } = useWorkspaceSettings();
	useThemeSync(settings);
	(0, import_react.useEffect)(() => {
		trackPageView({ page: "home" });
	}, []);
	const fallback = (0, import_react.useMemo)(() => defaultSections(), []);
	const { data: sections = fallback } = useQuery({
		queryKey: ["cms-published"],
		queryFn: fetchPublishedContent,
		initialData: fallback
	});
	const hero = sections["hero"] ?? {};
	const services = sections["services"] ?? {};
	const trust = sections["trust"] ?? {};
	const how = sections["how_it_works"] ?? {};
	const testimonials = sections["testimonials"] ?? {};
	const ctaSection = sections["cta"] ?? {};
	const faq = sections["faq"] ?? {};
	const contact = sections["contact"] ?? {};
	const footer = sections["footer"] ?? {};
	const cast = sections["cast"] ?? {};
	const updates = sections["updates"] ?? {};
	const promise = sections["promise"] ?? {};
	const brandName = settings.branding.name || "SAFAR N MANZIL";
	const testimonialItems = list(testimonials, "items");
	const serviceItems = list(services, "items");
	const storyGroups = [
		{
			items: serviceItems.slice(0, 2),
			image: str(services, "groceriesImageUrl") || "/assets/safar-story-groceries-BdU1EYRc.png",
			alt: "Groceries delivered to parents in India with an update sent to family in the Gulf",
			Icon: ShoppingBasket
		},
		{
			items: serviceItems.slice(2, 3).concat(serviceItems.slice(5, 6)),
			image: str(services, "repairsImageUrl") || "/assets/safar-story-repairs-CC0uiQok.png",
			alt: "A trusted worker fixing something at home while our man takes photos",
			Icon: House
		},
		{
			items: serviceItems.slice(3, 5),
			image: str(services, "healthcareImageUrl") || "/assets/safar-story-health-J9PcQXVd.png",
			alt: "Our man taking an elderly parent to see the doctor",
			Icon: Stethoscope
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				brandName,
				logoUrl: settings.branding.logoUrl,
				logoStyle: settings.branding.logoStyle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 sm:py-14 md:min-h-[660px] md:grid-cols-[0.92fr_1.08fr] md:gap-8 md:py-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 order-1 md:col-start-1 md:row-start-1 md:self-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold uppercase tracking-wide text-primary",
									children: str(hero, "eyebrow", "Help for your family back home")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "site-display mt-4 max-w-2xl font-display text-[2.1rem] font-extrabold leading-[1.08] text-foreground sm:text-5xl md:text-6xl",
									children: str(hero, "title", "We do. We assist. We connect.")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative order-2 md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:-mr-16 md:self-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "absolute inset-x-4 top-6 bottom-6 -z-10 rounded-[2.5rem] bg-accent/60 blur-2xl"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: str(hero, "imageUrl") || "/assets/safar-hero-family-BK4zYqKK.png",
									alt: str(hero, "imageAlt", "A Gulf-based family member coordinating trusted help for parents in India"),
									width: 1600,
									height: 1008,
									fetchPriority: "high",
									className: "w-full rounded-2xl object-cover object-center md:rounded-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 order-3 md:col-start-1 md:row-start-2 md:self-start",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-xl text-base leading-7 text-muted-foreground md:text-lg",
										children: str(hero, "subtitle")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: str(hero, "primaryCtaHref", "#contact"),
											onClick: () => track("cta.clicked", {
												place: "hero",
												label: str(hero, "primaryCtaLabel", "Ask for help")
											}),
											className: "brand-button inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:py-3.5 sm:text-sm",
											children: [str(hero, "primaryCtaLabel", "Ask for help"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: str(hero, "secondaryCtaHref", "#how-it-works"),
											className: "brand-button inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-background px-6 py-4 text-base font-bold text-foreground transition hover:border-primary hover:text-primary sm:py-3.5 sm:text-sm",
											children: str(hero, "secondaryCtaLabel", "See how it works")
										})]
									}),
									settings.websiteAppearance.showHeroHighlights ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-8 grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3",
										children: list(hero, "highlights").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2 text-sm font-medium text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 text-primary" }), item]
										}, item))
									}) : null
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#services",
						"aria-label": "Explore services",
						className: "absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-muted-foreground md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-6 w-6 animate-bounce" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-b border-border bg-accent/40 py-14 md:py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-3xl px-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold uppercase tracking-wide text-primary",
								children: str(promise, "eyebrow", "We understand")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "site-display mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl",
								children: str(promise, "title", "You can't always be there for your parents in India. But we can.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-base leading-8 text-muted-foreground md:text-lg",
								children: str(promise, "body")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#contact",
								onClick: () => track("cta.clicked", {
									place: "promise",
									label: "Ask for help now"
								}),
								className: "brand-button mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:py-3.5 sm:text-sm",
								children: ["Ask for help now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-b border-border bg-card py-14 md:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold uppercase tracking-wide text-primary",
										children: str(cast, "eyebrow", "Who we help")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "site-display mt-3 font-display text-3xl font-extrabold md:text-4xl",
										children: str(cast, "title", "One family, two countries")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 leading-7 text-muted-foreground",
										children: str(cast, "subtitle")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: safar_cast_default,
								alt: "A son and daughter in the Gulf, our helper in the middle, and parents at home in India",
								loading: "lazy",
								width: 1600,
								height: 912,
								className: "mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-4 sm:grid-cols-3",
								children: list(cast, "items").map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-xl border border-border bg-background p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: CAST_FACES[index % CAST_FACES.length],
											alt: "",
											"aria-hidden": true,
											loading: "lazy",
											width: 816,
											height: 816,
											className: "h-16 w-16 shrink-0 rounded-full object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-lg font-semibold",
											children: item.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: item.description
										})
									]
								}, item.name ?? index))
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "services",
					className: "py-20 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold uppercase text-primary",
									children: "Practical help, handled properly"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "site-display mt-3 font-display text-3xl font-extrabold md:text-5xl",
									children: str(services, "title", "What we handle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 leading-7 text-muted-foreground",
									children: str(services, "subtitle")
								})
							]
						}), settings.websiteAppearance.sectionStyle === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: serviceItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "group rounded-lg border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-lg font-semibold",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: item.description
									})
								]
							}, item.title))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 space-y-20 md:space-y-28",
							children: storyGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "grid items-center gap-8 md:grid-cols-2 md:gap-14",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: groupIndex % 2 ? "md:order-2" : "",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: group.image,
										alt: group.alt,
										loading: "lazy",
										width: 1200,
										height: 912,
										className: "aspect-[4/3] w-full rounded-lg object-cover shadow-sm"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: groupIndex % 2 ? "md:order-1" : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(group.Icon, { className: "h-7 w-7 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 divide-y divide-border",
										children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "py-5 first:pt-0 last:pb-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "site-display font-display text-2xl font-bold text-foreground",
												children: item.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 leading-7 text-muted-foreground",
												children: item.description
											})]
										}, item.title))
									})]
								})]
							}, groupIndex))
						})]
					})
				}),
				settings.websiteAppearance.showTrustSection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y border-border bg-card py-20 md:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold uppercase text-primary",
								children: "Trust is the service"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "site-display mt-3 font-display text-3xl font-extrabold md:text-4xl",
								children: str(trust, "title", "Built on accountability")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid gap-4 md:grid-cols-3",
								children: list(trust, "items").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "border-l-2 border-primary py-2 pl-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-lg font-semibold",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: item.description
										})
									]
								}, item.title))
							})
						]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "py-14 md:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2 md:gap-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: str(updates, "imageUrl") || "/assets/safar-updates-Bv3rcd5B.png",
							alt: "A family member in the Gulf seeing a photo update of work finished at home in India",
							loading: "lazy",
							width: 1200,
							height: 912,
							className: "w-full rounded-2xl object-cover shadow-sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold uppercase tracking-wide text-primary",
								children: str(updates, "eyebrow", "You always know")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "site-display mt-3 font-display text-3xl font-extrabold md:text-4xl",
								children: str(updates, "title", "Every job comes back with proof")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-7 text-muted-foreground",
								children: str(updates, "subtitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 space-y-3",
								children: list(updates, "points").map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3 text-base text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), point]
								}, point))
							})
						] })]
					})
				}),
				settings.websiteAppearance.showProcessSection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "how-it-works",
					className: "py-20 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-bold tracking-tight md:text-4xl",
								children: str(how, "title", "How it works")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-muted-foreground",
								children: str(how, "subtitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "relative mt-12 grid gap-8 md:grid-cols-4 md:before:absolute md:before:left-[12.5%] md:before:right-[12.5%] md:before:top-[18px] md:before:h-px md:before:bg-border",
								children: list(how, "steps").map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative bg-background",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative z-10 grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground",
											children: index + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-base font-semibold",
											children: step.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: step.description
										})
									]
								}, step.title))
							})
						]
					})
				}) : null,
				testimonialItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-bold tracking-tight md:text-4xl",
							children: str(testimonials, "title", "Families we look after")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-3",
							children: testimonialItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "rounded-2xl border border-border bg-card p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-5 w-5 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
										className: "mt-3 text-sm leading-relaxed text-foreground",
										children: item.quote
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
										className: "mt-4 text-xs font-medium text-muted-foreground",
										children: [item.author, item.location ? ` · ${item.location}` : ""]
									})
								]
							}, item.quote))
						})]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-6xl px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-foreground px-8 py-12 text-background md:px-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl",
									children: str(ctaSection, "title", "Something needs doing back home?")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-2xl text-background/80",
									children: str(ctaSection, "subtitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: str(ctaSection, "buttonHref", "#contact"),
									onClick: () => track("cta.clicked", {
										place: "closing",
										label: str(ctaSection, "buttonLabel", "Talk to us")
									}),
									className: "brand-button mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5",
									children: [str(ctaSection, "buttonLabel", "Talk to us"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						})
					})
				}),
				settings.websiteAppearance.showFaqSection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "faq",
					className: "py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-3xl px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-bold tracking-tight md:text-4xl",
							children: str(faq, "title", "Questions before you start")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 space-y-3",
							children: list(faq, "items").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group rounded-lg border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex cursor-pointer items-center justify-between gap-4 font-display text-base font-semibold",
									children: [item.question, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary transition group-open:rotate-45",
										children: "+"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: item.answer
								})]
							}, item.question))
						})]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "contact",
					className: "border-t border-border bg-secondary/20 py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-bold tracking-tight md:text-4xl",
								children: str(contact, "title", "Talk to us")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: str(contact, "subtitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-7 space-y-2.5 text-sm",
								children: [
									str(contact, "phone") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${str(contact, "phone")}`,
										onClick: () => track("phone.clicked", { place: "contact" }),
										className: "font-medium hover:text-primary",
										children: str(contact, "phone")
									}) }) : null,
									str(contact, "email") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${str(contact, "email")}`,
										onClick: () => track("email.clicked", { place: "contact" }),
										className: "font-medium hover:text-primary",
										children: str(contact, "email")
									}) }) : null,
									str(contact, "location") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "text-muted-foreground",
										children: str(contact, "location")
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								className: "mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), " Team member? Open the CRM"]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {
							whatsapp: str(contact, "whatsapp"),
							email: str(contact, "email")
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {
				footer,
				contact,
				brandName,
				logoStyle: settings.branding.logoStyle
			}),
			str(contact, "whatsapp") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://wa.me/${str(contact, "whatsapp").replace(/[^\d]/g, "")}`,
				target: "_blank",
				rel: "noopener",
				onClick: () => track("cta.clicked", {
					place: "sticky",
					label: "WhatsApp"
				}),
				className: "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-bold text-primary-foreground shadow-lg md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }), "WhatsApp us"]
			}) : null
		]
	});
}
//#endregion
export { LandingPage as component };
