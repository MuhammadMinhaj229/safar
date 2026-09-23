import { r as __toESM } from "../_runtime.mjs";
import { r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-aBL8NDQc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BaTot3Az.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$22 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SAFAR N MANZIL — Business Console" },
			{
				name: "description",
				content: "The operating console for SAFAR N MANZIL — customers, vendors, finance, website and WhatsApp in one place. We do. We assist. We connect."
			},
			{
				name: "author",
				content: "SAFAR N MANZIL"
			},
			{
				property: "og:title",
				content: "SAFAR N MANZIL — Business Console"
			},
			{
				property: "og:description",
				content: "Customers, vendors, finance, website and WhatsApp in one operational console."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Manrope:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				richColors: true,
				position: "top-right"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$22.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$18 = () => import("./routes-CvcJ0oXJ.mjs");
var Route$21 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "SAFAR N MANZIL — Help for your family in India, while you work in the Gulf" },
		{
			name: "description",
			content: "You live in the Gulf, your family lives in India. We do the shopping, parcels, home repairs, hospital visits and paperwork for them, with photos and a clear price."
		},
		{
			property: "og:title",
			content: "SAFAR N MANZIL — We do. We assist. We connect."
		},
		{
			property: "og:description",
			content: "People you can trust doing the shopping, parcels, repairs, hospital visits and paperwork for your family back home."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./route-DrWFeCJv.mjs");
/**
* Auth gate for the whole CRM subtree. When the owner has not connected
* the database yet, the shell still renders (with a setup banner) so the
* Settings → Connections screen stays reachable.
*/
var Route$20 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const supabase = getSupabase();
		if (!supabase) return { user: null };
		const { data } = await supabase.auth.getUser();
		if (!data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./auth-6R4DmKGr.mjs");
var Route$19 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Secure sign-in to the SAFAR N MANZIL business console."
		},
		{
			property: "og:title",
			content: "Sign in — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Secure sign-in to the SAFAR N MANZIL business console."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./privacy-B57RR49K.mjs");
var Route$18 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — SAFAR N MANZIL" }, {
		name: "description",
		content: "Privacy Policy for SAFAR N MANZIL"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./reviews-jNhq8-S5.mjs");
var Route$17 = createFileRoute("/reviews")({
	head: () => ({ meta: [{ title: "Customer Reviews — SAFAR N MANZIL" }, {
		name: "description",
		content: "See what our customers have to say about SAFAR N MANZIL"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./terms-CFWJprLr.mjs");
var Route$16 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Service — SAFAR N MANZIL" }, {
		name: "description",
		content: "Terms of Service for SAFAR N MANZIL"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./automations-Ccz5SjAU.mjs");
var Route$15 = createFileRoute("/_authenticated/automations")({
	head: () => ({ meta: [
		{ title: "Automations — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Rules that do the small jobs for you when something happens."
		},
		{
			property: "og:title",
			content: "Automations — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "When this happens, do that — and keep a record of it."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./customers-D5uv5llu.mjs");
var Route$14 = createFileRoute("/_authenticated/customers")({
	head: () => ({ meta: [
		{ title: "Customers — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Leads with source tracking, 360° customer contacts and retention intelligence."
		},
		{
			property: "og:title",
			content: "Customers — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Leads, customer contacts and retention intelligence."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./dashboard-CszimLsN.mjs");
var Route$13 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Daily operational pulse: tasks, handoffs, revenue and inquiries."
		},
		{
			property: "og:title",
			content: "Dashboard — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Daily operational pulse of the business."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./finance-MHqBWKWk.mjs");
var Route$12 = createFileRoute("/_authenticated/finance")({
	head: () => ({ meta: [
		{ title: "Finance — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Money billed, money received, money spent, money invested and what partners are owed."
		},
		{
			property: "og:title",
			content: "Finance — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Invoices, payments, expenses, partner payouts and profit."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./inbox-7h3inYiW.mjs");
var Route$11 = createFileRoute("/_authenticated/inbox")({
	head: () => ({ meta: [
		{ title: "Inbox — SAFAR N MANZIL" },
		{
			name: "description",
			content: "One place for every WhatsApp and social message from families."
		},
		{
			property: "og:title",
			content: "Inbox — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Every conversation with one customer, in one thread."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./intelligence-CQZ80km7.mjs");
var Route$10 = createFileRoute("/_authenticated/intelligence")({
	head: () => ({ meta: [
		{ title: "Website intelligence — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Who visited the website, where they came from and what they looked at."
		},
		{
			property: "og:title",
			content: "Website intelligence — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Visitors, sources and actions on the website."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./knowledge-BGHmKHlB.mjs");
var Route$9 = createFileRoute("/_authenticated/knowledge")({
	head: () => ({ meta: [
		{ title: "Business Knowledge — SAFAR N MANZIL" },
		{
			name: "description",
			content: "One place for services, prices, areas covered, working hours, questions and policies."
		},
		{
			property: "og:title",
			content: "Business Knowledge — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Your services and prices written down once, used everywhere."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./operations-Do6wGQUY.mjs");
var Route$8 = createFileRoute("/_authenticated/operations")({
	head: () => ({ meta: [
		{ title: "Service Requests — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Work orders from request to completion: assign a verified serviceman, track status, close the loop."
		},
		{
			property: "og:title",
			content: "Service Requests — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Work orders from request to completion."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./settings-CxiUoMMi.mjs");
var Route$7 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "Settings — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Connections, API keys and access control for the business console."
		},
		{
			property: "og:title",
			content: "Settings — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Connections, API keys and access control."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./social-Ds4-wl6q.mjs");
var Route$6 = createFileRoute("/_authenticated/social")({
	head: () => ({ meta: [
		{ title: "Social — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Connect your accounts and plan posts, with honest limits shown."
		},
		{
			property: "og:title",
			content: "Social — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Plan posts and see exactly what each platform allows."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./tools-CCnPsH56.mjs");
var Route$5 = createFileRoute("/_authenticated/tools")({
	head: () => ({ meta: [
		{ title: "Tools — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Professional tools: invoicing, social scheduling, business intelligence, finance and WhatsApp."
		},
		{
			property: "og:title",
			content: "Tools — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Invoicing, scheduling, BI, finance and WhatsApp tools."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./vendors-C7Ll-fzZ.mjs");
var Route$4 = createFileRoute("/_authenticated/vendors")({
	head: () => ({ meta: [
		{ title: "Vendors & Partners — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Directory of verified servicemen, contractors and partners with rate cards, availability and ratings."
		},
		{
			property: "og:title",
			content: "Vendors & Partners — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Verified servicemen and partners, ready to assign."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./website-BrO5IcN5.mjs");
var Route$3 = createFileRoute("/_authenticated/website")({
	head: () => ({ meta: [
		{ title: "Website — SAFAR N MANZIL" },
		{
			name: "description",
			content: "Website control desk: edit every section of the public site, draft, publish, roll back."
		},
		{
			property: "og:title",
			content: "Website — SAFAR N MANZIL"
		},
		{
			property: "og:description",
			content: "Structured section editor with draft, publish and rollback."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Tells the console which outside services really have their keys set. No secret values are returned. */
var Route$2 = createFileRoute("/api/integrations/health")({ server: { handlers: { GET: async () => {
	const has = (name) => Boolean(processModule.env[name]);
	const checks = [
		{
			key: "whatsapp_meta",
			label: "WhatsApp (official Meta Cloud API)",
			ok: has("WHATSAPP_CLOUD_TOKEN") && has("WHATSAPP_CLOUD_PHONE_ID"),
			detail: "Needs WHATSAPP_CLOUD_TOKEN and WHATSAPP_CLOUD_PHONE_ID"
		},
		{
			key: "whatsapp_evolution",
			label: "WhatsApp (own server)",
			ok: has("EVOLUTION_API_URL") && has("EVOLUTION_API_KEY") && has("EVOLUTION_INSTANCE"),
			detail: "Needs EVOLUTION_API_URL, EVOLUTION_API_KEY and EVOLUTION_INSTANCE"
		},
		{
			key: "whatsapp_webhook",
			label: "WhatsApp incoming messages",
			ok: has("SUPABASE_URL") && has("SUPABASE_SERVICE_ROLE_KEY") && has("WHATSAPP_WEBHOOK_SECRET"),
			detail: "Needs SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and WHATSAPP_WEBHOOK_SECRET"
		},
		{
			key: "instagram",
			label: "Instagram (Business)",
			ok: has("INSTAGRAM_TOKEN") && has("INSTAGRAM_ACCOUNT_ID"),
			detail: "Needs INSTAGRAM_TOKEN and INSTAGRAM_ACCOUNT_ID"
		},
		{
			key: "facebook",
			label: "Facebook Page",
			ok: has("FACEBOOK_PAGE_TOKEN") && has("FACEBOOK_PAGE_ID"),
			detail: "Needs FACEBOOK_PAGE_TOKEN and FACEBOOK_PAGE_ID"
		},
		{
			key: "gbp",
			label: "Google Business Profile",
			ok: has("GBP_TOKEN") && has("GBP_ACCOUNT_ID"),
			detail: "Needs GBP_TOKEN and GBP_ACCOUNT_ID"
		},
		{
			key: "linkedin",
			label: "LinkedIn Page",
			ok: has("LINKEDIN_TOKEN") && has("LINKEDIN_ORG_ID"),
			detail: "Needs LINKEDIN_TOKEN and LINKEDIN_ORG_ID"
		},
		{
			key: "youtube",
			label: "YouTube channel",
			ok: has("YOUTUBE_TOKEN") && has("YOUTUBE_CHANNEL_ID"),
			detail: "Needs YOUTUBE_TOKEN and YOUTUBE_CHANNEL_ID"
		}
	];
	return Response.json({ checks });
} } } });
/** Sends one message through the configured provider. Secrets stay on the server. */
var Route$1 = createFileRoute("/api/messaging/send")({ server: { handlers: { POST: async ({ request }) => {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return Response.json({
			ok: false,
			error: "Bad request body"
		}, { status: 400 });
	}
	const channel = String(payload.channel ?? "").trim();
	const to = String(payload.to ?? "").trim();
	const body = String(payload.body ?? "").trim();
	if (!channel || !to || !body) return Response.json({
		ok: false,
		error: "channel, to and body are required"
	}, { status: 400 });
	if (body.length > 4e3) return Response.json({
		ok: false,
		error: "Message is too long"
	}, { status: 400 });
	const { adapterFor } = await import("./messaging.server-BaTk9umT.mjs");
	const adapter = adapterFor(channel);
	if (!adapter) return Response.json({
		ok: false,
		error: `Sending on ${channel} is not connected yet.`
	}, { status: 501 });
	if (!adapter.configured()) return Response.json({
		ok: false,
		error: `${adapter.label} is not set up. Add its keys in the server settings.`
	}, { status: 503 });
	const outcome = await adapter.send({
		to,
		body
	});
	if (!outcome.ok) return Response.json({
		ok: false,
		error: outcome.error
	}, { status: 502 });
	return Response.json({
		ok: true,
		externalId: outcome.externalId ?? null
	});
} } } });
function digitsOnly(value) {
	return value.replace(/[^\d]/g, "");
}
function parseMeta(payload) {
	const root = payload;
	const out = [];
	for (const entry of root.entry ?? []) for (const change of entry.changes ?? []) {
		const name = change.value?.contacts?.[0]?.profile?.name;
		for (const message of change.value?.messages ?? []) {
			if (!message.id || !message.from) continue;
			out.push({
				provider: "whatsapp_meta",
				eventId: message.id,
				from: message.from,
				...name ? { name } : {},
				body: message.text?.body ?? "",
				sentAt: message.timestamp ? (/* @__PURE__ */ new Date(Number(message.timestamp) * 1e3)).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
			});
		}
	}
	return out;
}
function parseEvolution(payload) {
	const data = payload.data;
	if (!data?.key?.id || data.key.fromMe) return [];
	const from = digitsOnly(data.key.remoteJid ?? "");
	if (!from) return [];
	return [{
		provider: "whatsapp_evolution",
		eventId: data.key.id,
		from,
		...data.pushName ? { name: data.pushName } : {},
		body: data.message?.conversation ?? data.message?.extendedTextMessage?.text ?? "",
		sentAt: data.messageTimestamp ? (/* @__PURE__ */ new Date(data.messageTimestamp * 1e3)).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
	}];
}
var Route = createFileRoute("/api/public/whatsapp/webhook")({ server: { handlers: {
	GET: async ({ request }) => {
		const url = new URL(request.url);
		const verifyToken = processModule.env["WHATSAPP_VERIFY_TOKEN"] ?? "";
		if (verifyToken && url.searchParams.get("hub.mode") === "subscribe" && url.searchParams.get("hub.verify_token") === verifyToken) return new Response(url.searchParams.get("hub.challenge") ?? "", { status: 200 });
		return new Response("Forbidden", { status: 403 });
	},
	POST: async ({ request }) => {
		const secret = processModule.env["WHATSAPP_WEBHOOK_SECRET"] ?? "";
		const raw = await request.text();
		if (secret) {
			const provided = request.headers.get("x-webhook-secret") ?? new URL(request.url).searchParams.get("secret") ?? "";
			const a = new TextEncoder().encode(provided);
			const b = new TextEncoder().encode(secret);
			if (!(a.length === b.length && a.every((value, index) => value === b[index]))) return new Response("Invalid signature", { status: 401 });
		}
		let payload;
		try {
			payload = JSON.parse(raw);
		} catch {
			return new Response("Bad payload", { status: 400 });
		}
		const url = processModule.env["SUPABASE_URL"] ?? "";
		const serviceKey = processModule.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "";
		if (!url || !serviceKey) return Response.json({
			ok: false,
			error: "Database is not set up on the server"
		}, { status: 503 });
		const { createClient } = await import("../_libs/supabase__supabase-js.mjs").then((n) => n.n);
		const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
		const incoming = [...parseMeta(payload), ...parseEvolution(payload)];
		let stored = 0;
		for (const item of incoming) {
			const { error: seen } = await supabase.from("webhook_events").insert({
				provider: item.provider,
				event_id: item.eventId,
				event_type: "message.received",
				payload,
				processing_status: "processing"
			});
			if (seen) continue;
			const phone = `+${digitsOnly(item.from)}`;
			const { data: contact } = await supabase.from("contacts").select("id").eq("phone", phone).maybeSingle();
			const { data: conversation } = await supabase.from("conversations").upsert({
				channel: "whatsapp",
				external_id: phone,
				phone,
				display_name: item.name ?? phone,
				contact_id: contact?.id ?? null,
				status: "open",
				last_message_at: item.sentAt,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "channel,external_id" }).select("id, unread_count").single();
			if (!conversation) continue;
			await supabase.from("messages").insert({
				conversation_id: conversation.id,
				direction: "in",
				channel: "whatsapp",
				external_id: item.eventId,
				body: item.body,
				status: "delivered",
				sent_at: item.sentAt
			});
			await supabase.from("conversations").update({ unread_count: (conversation.unread_count ?? 0) + 1 }).eq("id", conversation.id);
			await supabase.from("webhook_events").update({ processing_status: "done" }).eq("provider", item.provider).eq("event_id", item.eventId);
			stored += 1;
		}
		return Response.json({
			ok: true,
			stored
		});
	}
} } });
var IndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var AuthenticatedRouteRoute = Route$20.update({
	id: "/_authenticated",
	getParentRoute: () => Route$22
});
var AuthRoute = Route$19.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$22
});
var PrivacyRoute = Route$18.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$22
});
var ReviewsRoute = Route$17.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => Route$22
});
var TermsRoute = Route$16.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$22
});
var AuthenticatedAutomationsRoute = Route$15.update({
	id: "/automations",
	path: "/automations",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCustomersRoute = Route$14.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$13.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFinanceRoute = Route$12.update({
	id: "/finance",
	path: "/finance",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInboxRoute = Route$11.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedIntelligenceRoute = Route$10.update({
	id: "/intelligence",
	path: "/intelligence",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedKnowledgeRoute = Route$9.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOperationsRoute = Route$8.update({
	id: "/operations",
	path: "/operations",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$7.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSocialRoute = Route$6.update({
	id: "/social",
	path: "/social",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedToolsRoute = Route$5.update({
	id: "/tools",
	path: "/tools",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedVendorsRoute = Route$4.update({
	id: "/vendors",
	path: "/vendors",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedWebsiteRoute = Route$3.update({
	id: "/website",
	path: "/website",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiIntegrationsHealthRoute = Route$2.update({
	id: "/api/integrations/health",
	path: "/api/integrations/health",
	getParentRoute: () => Route$22
});
var ApiMessagingSendRoute = Route$1.update({
	id: "/api/messaging/send",
	path: "/api/messaging/send",
	getParentRoute: () => Route$22
});
var ApiPublicWhatsappWebhookRoute = Route.update({
	id: "/api/public/whatsapp/webhook",
	path: "/api/public/whatsapp/webhook",
	getParentRoute: () => Route$22
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAutomationsRoute,
	AuthenticatedCustomersRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedFinanceRoute,
	AuthenticatedInboxRoute,
	AuthenticatedIntelligenceRoute,
	AuthenticatedKnowledgeRoute,
	AuthenticatedOperationsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSocialRoute,
	AuthenticatedToolsRoute,
	AuthenticatedVendorsRoute,
	AuthenticatedWebsiteRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	PrivacyRoute,
	ReviewsRoute,
	TermsRoute,
	ApiIntegrationsHealthRoute,
	ApiMessagingSendRoute,
	ApiPublicWhatsappWebhookRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
