import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useWorkspaceSettings, t as BrandMark } from "./brand-mark-BwZJuO4D.mjs";
import { i as fetchPublishedContent, r as defaultSections } from "./cms-C-fbWjA1.mjs";
import { t as SiteFooter } from "./site-footer-Ce-PGTXK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-B57RR49K.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	const { settings } = useWorkspaceSettings();
	const brandName = settings.branding.name || "SAFAR N MANZIL";
	const fallback = defaultSections();
	const { data: sections = fallback } = useQuery({
		queryKey: ["cms-published"],
		queryFn: fetchPublishedContent,
		initialData: fallback
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-4 px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {
							name: brandName,
							style: "lockup",
							compact: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "ml-auto flex items-center gap-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-sm font-medium text-muted-foreground transition hover:text-foreground",
							children: "Back to Home"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-3xl flex-1 px-5 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-bold tracking-tight text-foreground",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Last Updated: August 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "prose prose-neutral mt-8 max-w-none text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "1. Introduction" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Welcome to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SAFAR N MANZIL" }),
									". We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you use our website and services, and tell you about your privacy rights."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "2. Data We Collect" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When you interact with us via WhatsApp or our request builder, we may collect your phone number, name, location, and the specific details regarding the assistance you require (such as travel plans, packing needs, or family assistance requirements)." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "3. How We Use Your Data" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We use your information exclusively to provide the Gulf-assistance services you request. This includes communicating with you, coordinating with our trusted local partners (such as cab drivers or delivery personnel), and improving our customer service." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "4. Data Sharing" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not sell your personal data. We may share necessary details (such as a pickup address or phone number) with verified third-party service providers (like taxi drivers or delivery partners) solely for the purpose of fulfilling your direct requests." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "5. Contact Us" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you have any questions about this privacy policy or our privacy practices, please contact us via our official WhatsApp number: +91 7207071874." })
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {
				footer: sections.footer || {},
				contact: sections.contact || {},
				brandName
			})
		]
	});
}
//#endregion
export { PrivacyPage as component };
