import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { G as CircleX, K as CircleCheck, c as Trash2, p as Share2, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as saveSocialPost, i as fetchSocialPosts, n as checkIntegrationHealth, r as deleteSocialPost, t as CONNECTORS } from "./social-D5QMRJSl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-Ds4-wl6q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function SocialPage() {
	const connected = isSupabaseConfigured();
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		channel: "instagram",
		body: "",
		scheduled_for: "",
		media_url: ""
	});
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const health = useQuery({
		queryKey: ["integration-health"],
		queryFn: checkIntegrationHealth
	});
	const posts = useQuery({
		queryKey: ["social-posts"],
		queryFn: fetchSocialPosts,
		enabled: connected
	});
	const save = useMutation({
		mutationFn: () => saveSocialPost(form),
		onSuccess: async () => {
			toast.success("Post saved");
			setForm({
				channel: "instagram",
				body: "",
				scheduled_for: "",
				media_url: ""
			});
			setShowForm(false);
			await queryClient.invalidateQueries({ queryKey: ["social-posts"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	const remove = useMutation({
		mutationFn: (id) => deleteSocialPost(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["social-posts"] })
	});
	function submit(event) {
		event.preventDefault();
		save.mutate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Social",
				description: "Connect your accounts and plan posts. Each platform shows what it really allows.",
				actions: connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowForm((value) => !value),
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Plan a post"]
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 md:grid-cols-2",
				children: CONNECTORS.map((connector) => {
					const ready = (health.data ?? []).find((item) => item.key === connector.key)?.ok ?? false;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground",
									children: connector.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${ready ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
									children: [ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), ready ? "Connected" : "Not connected"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground",
								children: "What it can do"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 list-disc space-y-0.5 pl-5 text-sm text-foreground",
								children: connector.can.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground",
								children: "What it cannot do"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground",
								children: connector.cannot.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 rounded-lg bg-muted p-3 text-xs text-muted-foreground",
								children: connector.setup
							})
						]
					}, connector.key);
				})
			}),
			!connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Share2,
				title: "Connect your database to plan posts",
				description: "Open Settings and add your database keys. Then you can write and plan posts here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [showForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "Where"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputClass,
							value: form.channel,
							onChange: (event) => setForm({
								...form,
								channel: event.target.value
							}),
							children: CONNECTORS.map((connector) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: connector.key,
								children: connector.label
							}, connector.key))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "When"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "datetime-local",
							className: inputClass,
							value: form.scheduled_for,
							onChange: (event) => setForm({
								...form,
								scheduled_for: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "Post text"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							className: inputClass,
							value: form.body,
							onChange: (event) => setForm({
								...form,
								body: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-medium text-foreground",
							children: "Picture link (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: form.media_url,
							onChange: (event) => setForm({
								...form,
								media_url: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: save.isPending,
							className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
							children: "Save post"
						})
					})
				]
			}) : null, posts.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading…"
			}) : (posts.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Share2,
				title: "No posts planned",
				description: "Write your first post. It will be kept here until the account is connected and it can go out."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: (posts.data ?? []).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: [
									CONNECTORS.find((item) => item.key === post.channel)?.label ?? post.channel,
									" · ",
									post.status
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 whitespace-pre-wrap text-sm text-foreground",
								children: post.body
							}),
							post.scheduled_for ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: ["Planned for ", new Date(post.scheduled_for).toLocaleString()]
							}) : null,
							post.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: post.error
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Delete post",
							onClick: () => remove.mutate(post.id),
							className: "rounded-lg border border-border p-2 text-muted-foreground hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})
				}, post.id))
			})] })
		]
	});
}
//#endregion
export { SocialPage as component };
