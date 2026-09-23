import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useWorkspaceSettings, t as BrandMark } from "./brand-mark-BwZJuO4D.mjs";
import { i as fetchPublishedContent, r as defaultSections } from "./cms-C-fbWjA1.mjs";
import { t as SiteFooter } from "./site-footer-Ce-PGTXK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-jNhq8-S5.js
var import_jsx_runtime = require_jsx_runtime();
function list(content, key) {
	const value = content[key];
	return Array.isArray(value) ? value : [];
}
function ReviewsPage() {
	const { settings } = useWorkspaceSettings();
	const brandName = settings.branding.name || "SAFAR N MANZIL";
	const fallback = defaultSections();
	const { data: sections = fallback } = useQuery({
		queryKey: ["cms-published"],
		queryFn: fetchPublishedContent,
		initialData: fallback
	});
	const items = list(sections["testimonials"] ?? {}, "items");
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-6xl flex-1 px-5 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl",
						children: "What Our Customers Say"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
						children: "Real stories and experiences from the people we've helped settle, travel, and thrive in the Gulf."
					})]
				}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-dashed border-border p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold text-foreground",
						children: "No reviews yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Check back soon to read customer experiences!"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: items.map((item, idx) => {
						const initial = item.author ? item.author.charAt(0).toUpperCase() : "C";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1 text-primary mb-4",
									children: [
										1,
										2,
										3,
										4,
										5
									].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-5 w-5 fill-current",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
									}, star))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-6 font-medium italic text-foreground leading-relaxed text-lg",
									children: [
										"\"",
										item.quote,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary",
										children: initial
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: item.author || "Happy Customer"
									}), item.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: item.location
									})] })]
								})
							]
						}, idx);
					})
				})]
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
export { ReviewsPage as component };
