import { i as performance_default } from "../_libs/h3-v2+rou3+srvx+unenv.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-C462Pq8m.js
var STORAGE_KEY = "safar.supabase.config";
var listeners = /* @__PURE__ */ new Set();
function getStoredSupabaseConfig() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed.url || !parsed.anonKey) return null;
		const config = {
			url: parsed.url.replace(/\/+$/, ""),
			anonKey: parsed.anonKey
		};
		if (parsed.serviceRoleKey) config.serviceRoleKey = parsed.serviceRoleKey;
		return config;
	} catch {
		return null;
	}
}
function saveStoredSupabaseConfig(config) {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
		url: config.url.replace(/\/+$/, ""),
		anonKey: config.anonKey,
		serviceRoleKey: config.serviceRoleKey || void 0
	}));
	resetSupabaseClient();
	listeners.forEach((listener) => listener());
}
function clearStoredSupabaseConfig() {
	window.localStorage.removeItem(STORAGE_KEY);
	resetSupabaseClient();
	listeners.forEach((listener) => listener());
}
function getSupabaseConfig() {
	const stored = getStoredSupabaseConfig();
	if (stored) return stored;
	const url = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["VITE_SAFAR_SUPABASE_URL"] ?? "";
	const anonKey = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["VITE_SAFAR_SUPABASE_ANON_KEY"] ?? "";
	return url && anonKey ? {
		url,
		anonKey
	} : null;
}
var client = null;
var clientFingerprint = "";
function getSupabase() {
	const config = getSupabaseConfig();
	if (!config) return null;
	const fingerprint = `${config.url}|${config.anonKey}`;
	if (!client || clientFingerprint !== fingerprint) {
		client = createClient(config.url, config.anonKey, { auth: {
			persistSession: true,
			autoRefreshToken: true,
			detectSessionInUrl: true
		} });
		clientFingerprint = fingerprint;
	}
	return client;
}
function resetSupabaseClient() {
	client = null;
	clientFingerprint = "";
}
function isSupabaseConfigured() {
	return getSupabaseConfig() !== null;
}
/**
* Health check used by Settings → Connections. Hits the Supabase Auth
* health endpoint with the anon key; it answers without a session and
* proves both URL and key are valid.
*/
async function testSupabaseConnection(config) {
	const started = performance_default.now();
	try {
		const response = await fetch(`${config.url.replace(/\/+$/, "")}/auth/v1/health`, { headers: { apikey: config.anonKey } });
		const latencyMs = Math.round(performance_default.now() - started);
		if (response.ok) return {
			ok: true,
			latencyMs,
			message: `Connected in ${latencyMs} ms`
		};
		return {
			ok: false,
			latencyMs,
			message: `Supabase answered with status ${response.status} — check the anon key`
		};
	} catch {
		return {
			ok: false,
			latencyMs: Math.round(performance_default.now() - started),
			message: "Could not reach this Supabase URL — check the project URL"
		};
	}
}
//#endregion
export { saveStoredSupabaseConfig as a, isSupabaseConfigured as i, getStoredSupabaseConfig as n, testSupabaseConnection as o, getSupabase as r, clearStoredSupabaseConfig as t };
