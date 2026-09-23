import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useWorkspaceSettings, t as BrandMark } from "./brand-mark-BwZJuO4D.mjs";
import { i as fetchPublishedContent, r as defaultSections } from "./cms-C-fbWjA1.mjs";
import { t as SiteFooter } from "./site-footer-Ce-PGTXK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-CFWJprLr.js
var import_jsx_runtime = require_jsx_runtime();
function TermsPage() {
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
							children: "Terms of Service"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Last Updated: August 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "prose prose-neutral mt-8 max-w-none text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "1. Acceptance of Terms" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"By accessing and using the services of ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SAFAR N MANZIL" }),
									", you accept and agree to be bound by the terms and provision of this agreement. Our services are primarily accessed and coordinated via WhatsApp."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "2. Description of Services" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SAFAR N MANZIL" }), " is an assistance coordination service. We assist individuals traveling to or living in the Gulf by coordinating services such as packing materials, local transportation, family grocery delivery, and providing guidance on documentation."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "3. Role and Limitation of Liability" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SAFAR N MANZIL" }),
									" acts as an assistant and coordinator. We are not a government entity, embassy, or airline. While we assist with visa form guidance and flight ticket coordination, the ultimate approval of visas, entry to countries, and airline operations are entirely at the discretion of the respective authorities and airlines. ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SAFAR N MANZIL" }),
									" shall not be held liable for visa rejections, flight cancellations, or customs issues."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "4. Payments and Fees" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All service fees, product costs (such as boxes or food), and third-party fees (like cab fares) will be clearly communicated to you upfront via WhatsApp before any service is rendered. There are no hidden fees." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "5. Contact" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "For any inquiries regarding these terms, please contact us on WhatsApp at +91 7207071874." })
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
export { TermsPage as component };
