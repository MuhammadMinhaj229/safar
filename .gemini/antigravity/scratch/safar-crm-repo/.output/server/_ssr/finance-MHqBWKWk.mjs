import { r as __toESM } from "../_runtime.mjs";
import { r as getSupabase } from "./supabase-C462Pq8m.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { N as IndianRupee, c as Trash2, i as Wallet, x as Plus, y as Receipt } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CL9UFF9M.mjs";
import { t as EmptyState } from "./empty-state-CLFu-Bbq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as fetchContacts, u as fetchRequests } from "./crm-BTOFSzLd.mjs";
import { o as fetchProviders } from "./providers-DyXuO0qC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/finance-MHqBWKWk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Money. Every figure here comes from a real row — invoices, payments,
* expenses and partner payouts. Nothing is stored inside notes, and amounts
* are kept to exact two-decimal values, never rounded floats on the way in.
*/
var EXPENSE_CATEGORIES = [
	"operating",
	"capital_investment",
	"marketing",
	"salary",
	"other"
];
var PAYMENT_METHODS = [
	"upi",
	"bank_transfer",
	"cash",
	"card"
];
function money(value) {
	return Math.round((Number.isFinite(value) ? value : 0) * 100) / 100;
}
async function must() {
	const supabase = getSupabase();
	if (!supabase) throw new Error("Connect your database in Settings first.");
	return supabase;
}
async function fetchInvoiceRecords() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("invoices").select("id, contact_id, service_request_id, invoice_number, status, currency, subtotal, third_party_cost, safar_fee, tax, discount, total, amount_paid, outstanding, issued_at, due_at, created_at").order("created_at", { ascending: false });
	if (error) return [];
	return data ?? [];
}
async function fetchExpenses() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("expenses").select("id, category, description, amount, spent_at").order("spent_at", { ascending: false });
	if (error) return [];
	return data ?? [];
}
async function fetchPayables() {
	const supabase = getSupabase();
	if (!supabase) return [];
	const { data, error } = await supabase.from("provider_payables").select("id, provider_id, service_request_id, amount, status, paid_at").order("created_at", { ascending: false });
	if (error) return [];
	return data ?? [];
}
/** Next invoice number in the SNM-YYYY-#### series, based on existing rows. */
async function nextInvoiceNumber() {
	const supabase = getSupabase();
	const prefix = `SNM-${(/* @__PURE__ */ new Date()).getFullYear()}-`;
	if (!supabase) return `${prefix}0001`;
	const { data } = await supabase.from("invoices").select("invoice_number").like("invoice_number", `${prefix}%`).order("invoice_number", { ascending: false }).limit(1);
	const last = (data ?? [])[0];
	const seq = last?.invoice_number ? Number(last.invoice_number.slice(prefix.length)) + 1 : 1;
	return `${prefix}${String(seq).padStart(4, "0")}`;
}
async function createInvoice(input) {
	const supabase = await must();
	const lines = input.lines.filter((line) => line.description.trim());
	if (lines.length === 0) throw new Error("Add at least one line to the invoice.");
	const subtotal = money(lines.reduce((sum, line) => sum + line.quantity * line.unit_price, 0));
	const tax = money(input.tax ?? 0);
	const discount = money(input.discount ?? 0);
	const total = money(subtotal + tax - discount);
	const { data, error } = await supabase.from("invoices").insert({
		contact_id: input.contactId,
		service_request_id: input.serviceRequestId ?? null,
		invoice_number: await nextInvoiceNumber(),
		status: input.issueNow ? "sent" : "draft",
		subtotal,
		third_party_cost: money(input.thirdPartyCost ?? 0),
		safar_fee: money(input.safarFee ?? 0),
		tax,
		discount,
		total,
		amount_paid: 0,
		outstanding: total,
		issued_at: input.issueNow ? (/* @__PURE__ */ new Date()).toISOString() : null,
		due_at: input.dueAt ?? null
	}).select("id").single();
	if (error || !data) throw new Error(error?.message ?? "Could not create the invoice.");
	const invoiceId = data.id;
	const { error: lineError } = await supabase.from("invoice_items").insert(lines.map((line) => ({
		invoice_id: invoiceId,
		description: line.description.trim(),
		quantity: money(line.quantity),
		unit_price: money(line.unit_price),
		line_total: money(line.quantity * line.unit_price)
	})));
	if (lineError) throw new Error(lineError.message);
	return invoiceId;
}
/** Records a payment and keeps the invoice totals in step with it. */
async function recordPayment(invoiceId, amount, method, reference) {
	const supabase = await must();
	const value = money(amount);
	if (value <= 0) throw new Error("Enter an amount greater than zero.");
	const { data: invoice, error: readError } = await supabase.from("invoices").select("total, amount_paid").eq("id", invoiceId).single();
	if (readError || !invoice) throw new Error(readError?.message ?? "Invoice not found.");
	const row = invoice;
	const paid = money(Number(row.amount_paid) + value);
	const outstanding = money(Number(row.total) - paid);
	const { error: payError } = await supabase.from("payments").insert({
		invoice_id: invoiceId,
		amount: value,
		method,
		reference: reference?.trim() || null
	});
	if (payError) throw new Error(payError.message);
	const { error: updateError } = await supabase.from("invoices").update({
		amount_paid: paid,
		outstanding: outstanding > 0 ? outstanding : 0,
		status: outstanding <= 0 ? "paid" : "partially_paid",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", invoiceId);
	if (updateError) throw new Error(updateError.message);
}
async function addExpense(input) {
	const { error } = await (await must()).from("expenses").insert({
		category: input.category,
		description: input.description.trim(),
		amount: money(input.amount),
		spent_at: input.spentAt
	});
	if (error) throw new Error(error.message);
}
async function addPayable(input) {
	const { error } = await (await must()).from("provider_payables").insert({
		provider_id: input.providerId,
		service_request_id: input.serviceRequestId ?? null,
		amount: money(input.amount)
	});
	if (error) throw new Error(error.message);
}
async function settlePayable(id) {
	const { error } = await (await must()).from("provider_payables").update({
		status: "paid",
		paid_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id);
	if (error) throw new Error(error.message);
}
function summarise(invoices, expenses, payables) {
	const live = invoices.filter((invoice) => invoice.status !== "cancelled");
	const billed = money(live.reduce((sum, invoice) => sum + Number(invoice.total), 0));
	const received = money(live.reduce((sum, invoice) => sum + Number(invoice.amount_paid), 0));
	const outstanding = money(live.reduce((sum, invoice) => sum + Number(invoice.outstanding), 0));
	const invested = money(expenses.filter((expense) => expense.category === "capital_investment").reduce((sum, expense) => sum + Number(expense.amount), 0));
	const spent = money(expenses.filter((expense) => expense.category !== "capital_investment").reduce((sum, expense) => sum + Number(expense.amount), 0));
	return {
		billed,
		received,
		outstanding,
		spent,
		invested,
		owedToPartners: money(payables.filter((payable) => payable.status === "owed").reduce((sum, payable) => sum + Number(payable.amount), 0)),
		profit: money(received - money(live.reduce((sum, invoice) => sum + Number(invoice.third_party_cost), 0)) - spent)
	};
}
var rupees = (value) => `₹${Number(value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
var fieldClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";
var TABS = [
	{
		id: "invoices",
		label: "Invoices"
	},
	{
		id: "expenses",
		label: "Money spent"
	},
	{
		id: "payables",
		label: "Partner payouts"
	}
];
function FinancePage() {
	const [tab, setTab] = (0, import_react.useState)("invoices");
	const queryClient = useQueryClient();
	const { data: invoices = [] } = useQuery({
		queryKey: ["finance-invoices"],
		queryFn: fetchInvoiceRecords
	});
	const { data: expenses = [] } = useQuery({
		queryKey: ["finance-expenses"],
		queryFn: fetchExpenses
	});
	const { data: payables = [] } = useQuery({
		queryKey: ["finance-payables"],
		queryFn: fetchPayables
	});
	const { data: contacts = [] } = useQuery({
		queryKey: ["contacts"],
		queryFn: fetchContacts
	});
	const { data: requests = [] } = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests
	});
	const { data: providers = [] } = useQuery({
		queryKey: ["providers"],
		queryFn: fetchProviders
	});
	const totals = summarise(invoices, expenses, payables);
	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ["finance-invoices"] });
		queryClient.invalidateQueries({ queryKey: ["finance-expenses"] });
		queryClient.invalidateQueries({ queryKey: ["finance-payables"] });
	};
	const cards = [
		{
			label: "Billed",
			value: totals.billed,
			icon: Receipt
		},
		{
			label: "Received",
			value: totals.received,
			icon: IndianRupee
		},
		{
			label: "Still to collect",
			value: totals.outstanding,
			icon: Wallet
		},
		{
			label: "Profit",
			value: totals.profit,
			icon: IndianRupee
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Finance",
			description: "Money in, money out, money invested — and what is still owed, both ways."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground",
						children: card.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-4 w-4 text-primary" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl font-bold text-foreground",
					children: rupees(card.value)
				})]
			}, card.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					label: "Running costs",
					value: rupees(totals.spent)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					label: "Invested in the business",
					value: rupees(totals.invested)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					label: "Owed to partners",
					value: rupees(totals.owedToPartners)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 mb-5 flex flex-wrap gap-2",
			children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(item.id),
				className: `rounded-lg border px-3.5 py-2 text-sm font-medium transition ${tab === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`,
				children: item.label
			}, item.id))
		}),
		tab === "invoices" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicesTab, {
			invoices,
			contacts,
			requests,
			onChanged: refresh
		}) : null,
		tab === "expenses" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpensesTab, {
			expenses,
			onChanged: refresh
		}) : null,
		tab === "payables" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayablesTab, {
			payables,
			providers,
			requests,
			onChanged: refresh
		}) : null
	] });
}
function MiniStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 font-display text-lg font-bold text-foreground",
			children: value
		})]
	});
}
function InvoicesTab({ invoices, contacts, requests, onChanged }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [contactId, setContactId] = (0, import_react.useState)("");
	const [requestId, setRequestId] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([{
		description: "",
		quantity: 1,
		unit_price: 0
	}]);
	const [thirdParty, setThirdParty] = (0, import_react.useState)("0");
	const [tax, setTax] = (0, import_react.useState)("0");
	const [discount, setDiscount] = (0, import_react.useState)("0");
	const contactName = (id) => contacts.find((c) => c.id === id)?.name ?? "Customer";
	const create = useMutation({
		mutationFn: () => createInvoice({
			contactId,
			serviceRequestId: requestId || null,
			lines,
			thirdPartyCost: Number(thirdParty),
			tax: Number(tax),
			discount: Number(discount),
			issueNow: true
		}),
		onSuccess: () => {
			toast.success("Invoice created");
			setOpen(false);
			setLines([{
				description: "",
				quantity: 1,
				unit_price: 0
			}]);
			setContactId("");
			setRequestId("");
			onChanged();
		},
		onError: (error) => toast.error(error.message)
	});
	const pay = useMutation({
		mutationFn: (vars) => recordPayment(vars.id, vars.amount, vars.method),
		onSuccess: () => {
			toast.success("Payment recorded");
			onChanged();
		},
		onError: (error) => toast.error(error.message)
	});
	const total = lines.reduce((sum, line) => sum + line.quantity * line.unit_price, 0) + Number(tax || 0) - Number(discount || 0);
	function submit(event) {
		event.preventDefault();
		if (!contactId) {
			toast.error("Choose the customer this invoice is for.");
			return;
		}
		create.mutate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(!open),
				className: "brand-button inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New invoice"]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "rounded-xl border border-border bg-card p-5 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-medium",
							children: ["Customer", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: contactId,
								onChange: (e) => setContactId(e.target.value),
								className: `mt-1.5 ${fieldClass}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Choose a customer"
								}), contacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: contact.id,
									children: contact.name
								}, contact.id))]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-medium",
							children: ["Job it belongs to (optional)", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: requestId,
								onChange: (e) => setRequestId(e.target.value),
								className: `mt-1.5 ${fieldClass}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Not linked to a job"
								}), requests.filter((request) => !contactId || request.contact_id === contactId).map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: request.id,
									children: request.title
								}, request.id))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-2",
						children: [lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-[1fr_90px_120px_40px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: line.description,
									placeholder: "What was done",
									onChange: (e) => {
										const next = [...lines];
										next[index] = {
											...line,
											description: e.target.value
										};
										setLines(next);
									},
									className: fieldClass
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									step: "0.01",
									value: line.quantity,
									onChange: (e) => {
										const next = [...lines];
										next[index] = {
											...line,
											quantity: Number(e.target.value)
										};
										setLines(next);
									},
									className: fieldClass
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									step: "0.01",
									value: line.unit_price,
									onChange: (e) => {
										const next = [...lines];
										next[index] = {
											...line,
											unit_price: Number(e.target.value)
										};
										setLines(next);
									},
									className: fieldClass
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setLines(lines.filter((_, i) => i !== index)),
									className: "rounded-lg border border-border text-muted-foreground hover:text-destructive",
									"aria-label": "Remove line",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto h-4 w-4" })
								})
							]
						}, index)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLines([...lines, {
								description: "",
								quantity: 1,
								unit_price: 0
							}]),
							className: "text-sm font-medium text-primary",
							children: "+ Add another line"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm font-medium",
								children: ["Paid to others (cost)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: thirdParty,
									onChange: (e) => setThirdParty(e.target.value),
									className: `mt-1.5 ${fieldClass}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm font-medium",
								children: ["Tax", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: tax,
									onChange: (e) => setTax(e.target.value),
									className: `mt-1.5 ${fieldClass}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm font-medium",
								children: ["Discount", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: discount,
									onChange: (e) => setDiscount(e.target.value),
									className: `mt-1.5 ${fieldClass}`
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Total ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-bold text-foreground",
								children: rupees(total)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: create.isPending,
							className: "brand-button rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
							children: create.isPending ? "Saving…" : "Create invoice"
						})]
					})
				]
			}) : null,
			invoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Receipt,
				title: "No invoices yet",
				description: "Create the first invoice for a customer and every payment against it will be tracked here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: invoices.map((invoice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold",
						children: [
							invoice.invoice_number,
							" · ",
							contactName(invoice.contact_id)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							rupees(invoice.total),
							" · paid ",
							rupees(invoice.amount_paid),
							" · left",
							" ",
							rupees(invoice.outstanding),
							" · ",
							invoice.status.replace("_", " ")
						]
					})] }), invoice.outstanding > 0 && invoice.status !== "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => pay.mutate({
							id: invoice.id,
							amount: invoice.outstanding,
							method: PAYMENT_METHODS[0]
						}),
						className: "rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary",
						children: "Mark fully paid"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-primary",
						children: "Settled"
					})]
				}, invoice.id))
			})
		]
	});
}
function ExpensesTab({ expenses, onChanged }) {
	const [form, setForm] = (0, import_react.useState)({
		category: EXPENSE_CATEGORIES[0],
		description: "",
		amount: "",
		spentAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	const add = useMutation({
		mutationFn: () => addExpense({
			category: form.category,
			description: form.description,
			amount: Number(form.amount),
			spentAt: form.spentAt
		}),
		onSuccess: () => {
			toast.success("Saved");
			setForm({
				...form,
				description: "",
				amount: ""
			});
			onChanged();
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => {
				event.preventDefault();
				if (!form.description.trim() || !Number(form.amount)) {
					toast.error("Add what it was for and how much.");
					return;
				}
				add.mutate();
			},
			className: "grid gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-[1fr_170px_140px_130px_auto]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.description,
					onChange: (e) => setForm({
						...form,
						description: e.target.value
					}),
					placeholder: "What was the money for?",
					className: fieldClass
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.category,
					onChange: (e) => setForm({
						...form,
						category: e.target.value
					}),
					className: fieldClass,
					children: EXPENSE_CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: category,
						children: category === "capital_investment" ? "investment" : category
					}, category))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.amount,
					onChange: (e) => setForm({
						...form,
						amount: e.target.value
					}),
					placeholder: "Amount",
					className: fieldClass
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: form.spentAt,
					onChange: (e) => setForm({
						...form,
						spentAt: e.target.value
					}),
					className: fieldClass
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "brand-button rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
					children: "Add"
				})
			]
		}), expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Wallet,
			title: "Nothing recorded yet",
			description: "Every rupee spent or invested goes here, so profit is always a real number."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: expenses.map((expense) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: expense.description
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: [
						expense.category === "capital_investment" ? "investment" : expense.category,
						" ·",
						" ",
						expense.spent_at,
						" · ",
						rupees(expense.amount)
					]
				})]
			}, expense.id))
		})]
	});
}
function PayablesTab({ payables, providers, requests, onChanged }) {
	const [providerId, setProviderId] = (0, import_react.useState)("");
	const [requestId, setRequestId] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: () => addPayable({
			providerId,
			serviceRequestId: requestId || null,
			amount: Number(amount)
		}),
		onSuccess: () => {
			toast.success("Recorded");
			setAmount("");
			onChanged();
		},
		onError: (error) => toast.error(error.message)
	});
	const settle = useMutation({
		mutationFn: (id) => settlePayable(id),
		onSuccess: () => {
			toast.success("Marked as paid");
			onChanged();
		},
		onError: (error) => toast.error(error.message)
	});
	const providerName = (id) => providers.find((p) => p.id === id)?.name ?? "Partner";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => {
				event.preventDefault();
				if (!providerId || !Number(amount)) {
					toast.error("Choose a partner and an amount.");
					return;
				}
				add.mutate();
			},
			className: "grid gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-[1fr_1fr_140px_auto]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: providerId,
					onChange: (e) => setProviderId(e.target.value),
					className: fieldClass,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Choose a partner"
					}), providers.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: provider.id,
						children: provider.name
					}, provider.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: requestId,
					onChange: (e) => setRequestId(e.target.value),
					className: fieldClass,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Not linked to a job"
					}), requests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: request.id,
						children: request.title
					}, request.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: amount,
					onChange: (e) => setAmount(e.target.value),
					placeholder: "Amount",
					className: fieldClass
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "brand-button rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
					children: "Add"
				})
			]
		}), payables.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Wallet,
			title: "No partner payouts yet",
			description: "Record what each service partner is owed for a job, and mark it paid when you settle."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: payables.map((payable) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: providerName(payable.provider_id)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-3 text-muted-foreground",
					children: [
						rupees(payable.amount),
						" · ",
						payable.status,
						payable.status === "owed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => settle.mutate(payable.id),
							className: "rounded-lg border border-primary px-3 py-1 text-xs font-semibold text-primary",
							children: "Mark paid"
						}) : null
					]
				})]
			}, payable.id))
		})]
	});
}
//#endregion
export { FinancePage as component };
