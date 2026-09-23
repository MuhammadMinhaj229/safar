import { r as __toESM } from "../_runtime.mjs";
import { i as isSupabaseConfigured, r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { T as MessageSquare, g as Search, h as Send, o as UserPlus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as fetchContacts } from "./crm-BTOFSzLd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-7h3inYiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Messaging layer — one shape for every channel.
*
* The app never talks to WhatsApp directly from the browser. It writes
* and reads conversations/messages in the business database, and asks
* the server (`/api/messaging/send`) to actually deliver a message.
* The server picks the provider adapter (Evolution self-hosted today,
* Meta Cloud later) using server-only environment variables, so no
* token ever reaches the browser.
*/
async function db() {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	return supabase;
}
var CHANNELS = [
	"whatsapp",
	"instagram",
	"facebook",
	"email",
	"web"
];
async function fetchConversations(filter) {
	let query = (await db()).from("conversations").select("*").order("last_message_at", {
		ascending: false,
		nullsFirst: false
	}).limit(200);
	if (filter?.channel) query = query.eq("channel", filter.channel);
	if (filter?.status) query = query.eq("status", filter.status);
	const { data, error } = await query;
	if (error) throw error;
	const rows = data ?? [];
	const search = filter?.search?.trim().toLowerCase();
	if (!search) return rows;
	return rows.filter((row) => (row.display_name ?? "").toLowerCase().includes(search) || (row.phone ?? "").toLowerCase().includes(search));
}
async function fetchMessages(conversationId) {
	const { data, error } = await (await db()).from("messages").select("*").eq("conversation_id", conversationId).order("sent_at", { ascending: true }).limit(500);
	if (error) throw error;
	return data ?? [];
}
/**
* Save the outgoing message, then ask the server to deliver it.
* If no provider is configured the message stays as "queued" and the
* team can still open WhatsApp by hand — nothing is lost or faked.
*/
async function sendMessage(input) {
	const supabase = await db();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const { data: saved, error } = await supabase.from("messages").insert({
		conversation_id: input.conversation.id,
		direction: "out",
		channel: input.conversation.channel,
		body: input.body,
		status: "queued",
		author: input.author ?? null,
		sent_at: now
	}).select("id").single();
	if (error) throw error;
	await supabase.from("conversations").update({
		last_message_at: now,
		updated_at: now,
		status: "open"
	}).eq("id", input.conversation.id);
	try {
		const response = await fetch("/api/messaging/send", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				channel: input.conversation.channel,
				to: input.conversation.phone ?? input.conversation.external_id,
				body: input.body
			})
		});
		const payload = await response.json().catch(() => ({}));
		if (!response.ok || !payload.ok) {
			const message = payload.error || `Delivery failed (${response.status})`;
			await supabase.from("messages").update({
				status: "failed",
				error: message
			}).eq("id", saved.id);
			return {
				ok: true,
				delivered: false,
				error: message
			};
		}
		await supabase.from("messages").update({
			status: "sent",
			external_id: payload.externalId ?? null
		}).eq("id", saved.id);
		return {
			ok: true,
			delivered: true
		};
	} catch (cause) {
		const message = cause instanceof Error ? cause.message : "Could not reach the sender";
		await supabase.from("messages").update({
			status: "failed",
			error: message
		}).eq("id", saved.id);
		return {
			ok: true,
			delivered: false,
			error: message
		};
	}
}
async function linkConversationToContact(id, contactId) {
	const { error } = await (await db()).from("conversations").update({
		contact_id: contactId,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id);
	if (error) throw error;
}
var CHANNEL_LABELS = {
	whatsapp: "WhatsApp",
	instagram: "Instagram",
	facebook: "Facebook",
	email: "Email",
	web: "Website"
};
function channelLabel(value) {
	return CHANNEL_LABELS[value] ?? value;
}
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
function InboxPage() {
	const connected = isSupabaseConfigured();
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("all");
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const conversations = useQuery({
		queryKey: ["conversations"],
		queryFn: () => fetchConversations(),
		enabled: connected,
		refetchInterval: 2e4
	});
	const contacts = useQuery({
		queryKey: ["contacts"],
		queryFn: () => fetchContacts(),
		enabled: connected
	});
	const list = (0, import_react.useMemo)(() => {
		const rows = conversations.data ?? [];
		const term = search.trim().toLowerCase();
		return rows.filter((row) => {
			if (channel !== "all" && row.channel !== channel) return false;
			if (!term) return true;
			return `${row.display_name ?? ""} ${row.phone ?? ""}`.toLowerCase().includes(term);
		});
	}, [
		conversations.data,
		search,
		channel
	]);
	const active = (0, import_react.useMemo)(() => list.find((row) => row.id === activeId) ?? list[0] ?? null, [list, activeId]);
	const messages = useQuery({
		queryKey: ["messages", active?.id],
		queryFn: () => fetchMessages(active.id),
		enabled: connected && Boolean(active?.id),
		refetchInterval: 15e3
	});
	const send = useMutation({
		mutationFn: async () => {
			if (!active) throw new Error("Pick a conversation first.");
			return sendMessage({
				conversation: active,
				body: draft,
				author: "team"
			});
		},
		onSuccess: async (result) => {
			setDraft("");
			if (result.delivered) toast.success("Message sent");
			else toast.warning(result.error ?? "Saved, but the messaging service is not connected yet.");
			await queryClient.invalidateQueries({ queryKey: ["messages", active?.id] });
			await queryClient.invalidateQueries({ queryKey: ["conversations"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not send")
	});
	const link = useMutation({
		mutationFn: (contactId) => linkConversationToContact(active.id, contactId),
		onSuccess: async () => {
			toast.success("Linked to the customer");
			await queryClient.invalidateQueries({ queryKey: ["conversations"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not link")
	});
	function submit(event) {
		event.preventDefault();
		if (!draft.trim()) return;
		send.mutate();
	}
	if (!connected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Inbox",
			description: "Every message from families, in one place."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: MessageSquare,
			title: "Connect your database first",
			description: "Open Settings and add your database keys. Then your WhatsApp and social messages will land here."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Inbox",
			description: "Every message from families, in one place."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[320px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (event) => setSearch(event.target.value),
							placeholder: "Search name or number",
							className: `${inputClass} pl-9`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setChannel("all"),
							className: `rounded-full border px-3 py-1 text-xs ${channel === "all" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`,
							children: "All"
						}), CHANNELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setChannel(item),
							className: `rounded-full border px-3 py-1 text-xs ${channel === item ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`,
							children: channelLabel(item)
						}, item))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[60vh] space-y-2 overflow-y-auto rounded-xl border border-border bg-card p-2",
						children: conversations.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-4 text-sm text-muted-foreground",
							children: "Loading…"
						}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-4 text-sm text-muted-foreground",
							children: "No conversations yet. They appear here as soon as someone writes to you."
						}) : list.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveId(row.id),
							className: `w-full rounded-lg px-3 py-2.5 text-left ${active?.id === row.id ? "bg-accent" : "hover:bg-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-medium text-foreground",
									children: row.display_name || row.phone || "Unknown"
								}), row.unread_count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground",
									children: row.unread_count
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 block truncate text-xs text-muted-foreground",
								children: [channelLabel(row.channel), row.contact_id ? " · linked" : " · not linked"]
							})]
						}, row.id))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-[60vh] flex-col rounded-xl border border-border bg-card",
				children: !active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 items-center justify-center p-8 text-center text-sm text-muted-foreground",
					children: "Pick a conversation on the left."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-foreground",
							children: active.display_name || active.phone || "Unknown"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								channelLabel(active.channel),
								" · ",
								active.status
							]
						})] }), !active.contact_id && (contacts.data ?? []).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "rounded-lg border border-input bg-background px-2 py-1.5 text-xs",
								defaultValue: "",
								onChange: (event) => event.target.value && link.mutate(event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Link to a customer…"
								}), (contacts.data ?? []).map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: contact.id,
									children: contact.name || contact.phone || contact.email
								}, contact.id))]
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-3 overflow-y-auto p-4",
						children: messages.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Loading…"
						}) : (messages.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No messages in this chat yet."
						}) : (messages.data ?? []).map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[80%] rounded-xl px-3 py-2 text-sm ${message.direction === "out" ? "ml-auto bg-primary/10 text-foreground" : "bg-muted text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap break-words",
								children: message.body
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: [new Date(message.sent_at).toLocaleString(), message.direction === "out" ? ` · ${message.status}` : ""]
							})]
						}, message.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "flex items-end gap-2 border-t border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft,
							onChange: (event) => setDraft(event.target.value),
							rows: 2,
							placeholder: "Write a reply…",
							className: inputClass
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: send.isPending || !draft.trim(),
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Send"]
						})]
					})
				] })
			})]
		})]
	});
}
//#endregion
export { InboxPage as component };
