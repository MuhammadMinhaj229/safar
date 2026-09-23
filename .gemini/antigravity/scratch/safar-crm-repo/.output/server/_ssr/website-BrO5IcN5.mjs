import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { F as History, R as Globe, V as ExternalLink, _ as Save, s as Upload, v as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as fetchRevisions, c as saveDraft, l as unpublishSection, n as defaultContent, o as fetchSectionRows, s as publishSection, t as SECTION_DEFS } from "./cms-C-fbWjA1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/website-BrO5IcN5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fieldClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function TagsField({ value, onChange }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: value.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground",
				children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(value.filter((_, i) => i !== index)),
					className: "text-muted-foreground hover:text-foreground",
					"aria-label": `Remove ${item}`,
					children: "×"
				})]
			}, `${item}-${index}`))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						if (draft.trim()) onChange([...value, draft.trim()]);
						setDraft("");
					}
				},
				placeholder: "Type and press Enter",
				className: fieldClass
			})
		})]
	});
}
function ListField({ field, value, onChange }) {
	const itemFields = field.itemFields ?? [];
	const blank = Object.fromEntries(itemFields.map((item) => [item.key, ""]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1.5 space-y-3",
		children: [value.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-background p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: [
						field.itemLabel ?? "Item",
						" ",
						index + 1
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: index === 0,
							onClick: () => {
								const next = [...value];
								const [row] = next.splice(index, 1);
								next.splice(index - 1, 0, row);
								onChange(next);
							},
							className: "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent disabled:opacity-30",
							children: "↑"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: index === value.length - 1,
							onClick: () => {
								const next = [...value];
								const [row] = next.splice(index, 1);
								next.splice(index + 1, 0, row);
								onChange(next);
							},
							className: "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent disabled:opacity-30",
							children: "↓"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange(value.filter((_, i) => i !== index)),
							className: "rounded px-2 py-1 text-xs text-destructive hover:bg-destructive/10",
							children: "Remove"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: itemFields.map((itemField) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-medium text-muted-foreground",
					children: [itemField.label, itemField.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						value: item[itemField.key] ?? "",
						onChange: (e) => {
							const next = [...value];
							next[index] = {
								...item,
								[itemField.key]: e.target.value
							};
							onChange(next);
						},
						className: `mt-1 ${fieldClass}`
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: item[itemField.key] ?? "",
						onChange: (e) => {
							const next = [...value];
							next[index] = {
								...item,
								[itemField.key]: e.target.value
							};
							onChange(next);
						},
						className: `mt-1 ${fieldClass}`
					})]
				}, itemField.key))
			})]
		}, index)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onChange([...value, blank]),
			className: "rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary",
			children: ["+ Add ", field.itemLabel?.toLowerCase() ?? "item"]
		})]
	});
}
function SectionEditor({ sectionKey, initial, sectionId, published, onSaved }) {
	const def = SECTION_DEFS.find((item) => item.key === sectionKey);
	const [content, setContent] = (0, import_react.useState)(initial);
	const [showHistory, setShowHistory] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setContent(initial);
	}, [initial, sectionKey]);
	const { data: revisions = [] } = useQuery({
		queryKey: ["cms-revisions", sectionId],
		queryFn: () => fetchRevisions(sectionId),
		enabled: Boolean(sectionId) && showHistory
	});
	const save = useMutation({
		mutationFn: () => saveDraft(sectionKey, content),
		onSuccess: () => {
			toast.success("Draft saved");
			onSaved();
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	const publish = useMutation({
		mutationFn: () => publishSection(sectionKey, content),
		onSuccess: () => {
			toast.success("Published to the live site");
			onSaved();
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not publish")
	});
	const takeDown = useMutation({
		mutationFn: () => unpublishSection(sectionKey),
		onSuccess: () => {
			toast.success("Section taken off the live site");
			onSaved();
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not update")
	});
	function set(key, value) {
		setContent((prev) => ({
			...prev,
			[key]: value
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold text-foreground",
					children: def.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: def.description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-3 py-1 text-xs font-semibold ${published ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
					children: published ? "Live" : "Draft only"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: def.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-medium text-foreground",
					children: [field.label, field.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: content[field.key] ?? "",
						onChange: (e) => set(field.key, e.target.value),
						className: `mt-1.5 ${fieldClass}`
					}) : field.type === "tags" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagsField, {
						value: content[field.key] ?? [],
						onChange: (next) => set(field.key, next)
					}) : field.type === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListField, {
						field,
						value: content[field.key] ?? [],
						onChange: (next) => set(field.key, next)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: content[field.key] ?? "",
						onChange: (e) => set(field.key, e.target.value),
						className: `mt-1.5 ${fieldClass}`
					})]
				}, field.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => save.mutate(),
						disabled: save.isPending,
						className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save draft"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => publish.mutate(),
						disabled: publish.isPending,
						className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), " Publish"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setContent(defaultContent(sectionKey)),
						className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Reset to default copy"]
					}),
					sectionId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowHistory((value) => !value),
						className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" }), " History"]
					}) : null,
					published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => takeDown.mutate(),
						className: "ml-auto rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10",
						children: "Take off site"
					}) : null
				]
			}),
			showHistory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-border bg-background p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Revision history"
				}), revisions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No published revisions yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: revisions.map((revision) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Version ",
							revision.version,
							" ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: new Date(revision.saved_at).toLocaleString()
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setContent(revision.content);
								toast.success(`Version ${revision.version} loaded — publish to restore it`);
							},
							className: "rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent",
							children: "Restore"
						})]
					}, revision.id))
				})]
			}) : null
		]
	});
}
function WebsitePage() {
	const connected = isSupabaseConfigured();
	const queryClient = useQueryClient();
	const [active, setActive] = (0, import_react.useState)(SECTION_DEFS[0].key);
	const { data: rows = [], isLoading } = useQuery({
		queryKey: ["cms-sections"],
		queryFn: fetchSectionRows,
		enabled: connected
	});
	const rowByKey = (0, import_react.useMemo)(() => new Map(rows.map((row) => [row.section_key, row])), [rows]);
	if (!connected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Website",
		description: "The control desk for the public website — every section is a structured, editable block with draft, publish and rollback."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Globe,
		title: "Connect your database to edit the site",
		description: "Open Settings → Connections, paste your project URL and keys and run the setup script. Until then the public site shows the built-in default copy."
	})] });
	const row = rowByKey.get(active);
	const initial = row?.draft_content ?? row?.content ?? defaultContent(active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Website",
			description: "Every section of the public site, edited as structured content. Save a draft, publish when ready, roll back any time."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [SECTION_DEFS.map((def) => {
				const live = rowByKey.get(def.key)?.status === "published";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActive(def.key),
					className: `rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${active === def.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`,
					children: [def.label, live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 text-xs opacity-80",
						children: "•"
					}) : null]
				}, def.key);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/",
				target: "_blank",
				rel: "noreferrer",
				className: "ml-auto inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:bg-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), " View live site"]
			})]
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Loading sections…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEditor, {
			sectionKey: active,
			initial,
			sectionId: row?.id ?? null,
			published: row?.status === "published",
			onSaved: () => {
				queryClient.invalidateQueries({ queryKey: ["cms-sections"] });
				queryClient.invalidateQueries({ queryKey: ["cms-published"] });
			}
		}, active)
	] });
}
//#endregion
export { WebsitePage as component };
