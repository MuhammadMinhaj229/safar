import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BrandMark } from "./brand-mark-BwZJuO4D.mjs";
import { A as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-footer-Ce-PGTXK.js
var import_jsx_runtime = require_jsx_runtime();
function str(content, key, fallback = "") {
	const value = content[key];
	return typeof value === "string" && value.trim() ? value : fallback;
}
function SiteFooter({ footer, contact, brandName, logoStyle = "lockup" }) {
	const links = Array.isArray(footer["links"]) ? footer["links"] : [];
	const whatsapp = str(contact, "whatsapp");
	const email = str(contact, "email");
	const phone = str(contact, "phone");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-foreground/10 bg-foreground text-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {
						name: brandName,
						style: logoStyle,
						inverse: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm text-background/70",
						children: str(footer, "tagline", "We help Gulf families take care of their people back home in India.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm font-bold uppercase text-primary",
						children: "We do. We assist. We connect."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold uppercase text-background/60",
						children: "Explore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: link.href ?? "#",
							className: "text-background hover:text-primary",
							children: link.label
						}) }, `${link.label}-${link.href}`))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold uppercase text-background/60",
					children: "Reach us"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-background",
					children: [
						whatsapp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-primary",
							children: "WhatsApp"
						}) }) : null,
						phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${phone}`,
							className: "hover:text-primary",
							children: phone
						}) }) : null,
						email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${email}`,
							className: "hover:text-primary",
							children: email
						}) }) : null,
						!whatsapp && !phone && !email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-background/60",
							children: "Add your contact details in the CRM under Website."
						}) : null
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-background/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-background/60 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: str(footer, "legal", "© SAFAR N MANZIL. All rights reserved.") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					className: "inline-flex items-center gap-2 rounded-lg border border-background/25 px-3 py-2 font-medium text-background transition hover:border-primary hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), str(footer, "crmLabel", "Team login")]
				})]
			})
		})]
	});
}
//#endregion
export { SiteFooter as t };
