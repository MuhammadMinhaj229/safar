globalThis.__nitro_main__ = import.meta.url;
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx+unenv.mjs";
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/app-shell-BXhbSvIf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2053-gON5qbeFs9AdZPME/EMQE5Bn9iY\"",
		"mtime": "2026-09-23T11:13:37.844Z",
		"size": 8275,
		"path": "../public/assets/app-shell-BXhbSvIf.js"
	},
	"/assets/auth-D6U8Q71q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"177c-I1r3yzci3slk+VVuyLdi39tbsug\"",
		"mtime": "2026-09-23T11:13:37.850Z",
		"size": 6012,
		"path": "../public/assets/auth-D6U8Q71q.js"
	},
	"/assets/arrow-right-CVvZHNNu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-3IVUY95VXo23Mepn1lxs7ONsaMg\"",
		"mtime": "2026-09-23T11:13:37.844Z",
		"size": 159,
		"path": "../public/assets/arrow-right-CVvZHNNu.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"10a0-ikFiI4dLnhG/AkReMqCJ9xbbpwA\"",
		"mtime": "2026-09-23T10:31:53.660Z",
		"size": 4256,
		"path": "../public/favicon.png"
	},
	"/assets/automations-GwF5i_RX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba3-/oILomuKUCwCVyYLywBquc6Jgfo\"",
		"mtime": "2026-09-23T11:13:37.850Z",
		"size": 7075,
		"path": "../public/assets/automations-GwF5i_RX.js"
	},
	"/assets/brand-mark-DT0xWeP5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2478-fZQTOm74wZPy3uxCa6EyApKGLII\"",
		"mtime": "2026-09-23T11:13:37.852Z",
		"size": 9336,
		"path": "../public/assets/brand-mark-DT0xWeP5.js"
	},
	"/assets/circle-check-BOM9eT6H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-Tj2DNNYN0adXhdvR8F9m4xnQe1Y\"",
		"mtime": "2026-09-23T11:13:37.852Z",
		"size": 172,
		"path": "../public/assets/circle-check-BOM9eT6H.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-23T10:31:53.682Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/circle-x-DBmcXzgF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-2jyb6Wm5KnL5R5SdBLMLkvv+ifo\"",
		"mtime": "2026-09-23T11:13:37.855Z",
		"size": 201,
		"path": "../public/assets/circle-x-DBmcXzgF.js"
	},
	"/assets/cms-D2ALrVOq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3119-h0x3W49oBaekt5IXFXC1zW859kE\"",
		"mtime": "2026-09-23T11:13:37.864Z",
		"size": 12569,
		"path": "../public/assets/cms-D2ALrVOq.js"
	},
	"/assets/crm-BeOH94Uf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a07-aKkfIMvaEgMKeZ+CSwQa9K1MpgI\"",
		"mtime": "2026-09-23T11:13:37.868Z",
		"size": 6663,
		"path": "../public/assets/crm-BeOH94Uf.js"
	},
	"/assets/empty-state-4VG8Fa0M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a4-o1cpVZM+5NMR8nPgRl4ZpXPDbns\"",
		"mtime": "2026-09-23T11:13:37.872Z",
		"size": 676,
		"path": "../public/assets/empty-state-4VG8Fa0M.js"
	},
	"/assets/customers-CK37MEFZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d7c-FytYCxfLcYEFVNbsmTikL/+IQRU\"",
		"mtime": "2026-09-23T11:13:37.870Z",
		"size": 23932,
		"path": "../public/assets/customers-CK37MEFZ.js"
	},
	"/assets/dashboard-BDu8e3LY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11bc-O0RhVTV9MMnD/G/ansF5zyp7MPo\"",
		"mtime": "2026-09-23T11:13:37.872Z",
		"size": 4540,
		"path": "../public/assets/dashboard-BDu8e3LY.js"
	},
	"/assets/finance-3z01yFu2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4366-YpRaqXEDwfN8kv3HEKn9aLw8XHk\"",
		"mtime": "2026-09-23T11:13:37.890Z",
		"size": 17254,
		"path": "../public/assets/finance-3z01yFu2.js"
	},
	"/assets/inbox-CHdG4jLg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2327-CYy+fu4LdxVmabZOgLFqZxVXIto\"",
		"mtime": "2026-09-23T11:13:37.892Z",
		"size": 8999,
		"path": "../public/assets/inbox-CHdG4jLg.js"
	},
	"/assets/indian-rupee-Ds6nfcd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-hDEzD81zWpLzOQxNqh6zP4kciPE\"",
		"mtime": "2026-09-23T11:13:37.898Z",
		"size": 285,
		"path": "../public/assets/indian-rupee-Ds6nfcd0.js"
	},
	"/assets/intelligence-Bbr3PCrK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb6-XAvGmYf7q2X6xACIW3738PmmWTk\"",
		"mtime": "2026-09-23T11:13:37.900Z",
		"size": 7862,
		"path": "../public/assets/intelligence-Bbr3PCrK.js"
	},
	"/assets/message-circle-vBCVklNc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-MGL7xgKhclCS/RNAV3EsAp0LetI\"",
		"mtime": "2026-09-23T11:13:37.905Z",
		"size": 235,
		"path": "../public/assets/message-circle-vBCVklNc.js"
	},
	"/assets/knowledge-B6Myp4Ds.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc3-aS2vZuP8cb9oZzXOOd1wL0QE3+k\"",
		"mtime": "2026-09-23T11:13:37.900Z",
		"size": 8131,
		"path": "../public/assets/knowledge-B6Myp4Ds.js"
	},
	"/assets/pencil-_ImtXfQ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e-NN9ZFsQz1mCLQLJyQb4+2dOIhu4\"",
		"mtime": "2026-09-23T11:13:37.911Z",
		"size": 270,
		"path": "../public/assets/pencil-_ImtXfQ_.js"
	},
	"/assets/index-CEYE__Nj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ee34-VM/Owh9rtYdxrp0HSARH6L7caFw\"",
		"mtime": "2026-09-23T11:13:37.844Z",
		"size": 388660,
		"path": "../public/assets/index-CEYE__Nj.js"
	},
	"/assets/operations-GMJAzKsJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243c-mTqScTkplcNvOMsuWqO9g/YG2TY\"",
		"mtime": "2026-09-23T11:13:37.905Z",
		"size": 9276,
		"path": "../public/assets/operations-GMJAzKsJ.js"
	},
	"/assets/privacy-CLRJ8NTQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c53-sW745tdeLW8BKdGf6U1uCBH5o98\"",
		"mtime": "2026-09-23T11:13:37.916Z",
		"size": 3155,
		"path": "../public/assets/privacy-CLRJ8NTQ.js"
	},
	"/assets/plus-CsmIu_f4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93-Krd+CdLFKvl3idk52u59S9IK1EQ\"",
		"mtime": "2026-09-23T11:13:37.912Z",
		"size": 147,
		"path": "../public/assets/plus-CsmIu_f4.js"
	},
	"/assets/providers-DNJoKbTV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a3-HzxtQTHnen+1MKYntjUce+T1GV0\"",
		"mtime": "2026-09-23T11:13:37.916Z",
		"size": 2467,
		"path": "../public/assets/providers-DNJoKbTV.js"
	},
	"/assets/reviews-CWIQSaFB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c41-xFKOVokNGCFhsBxyT6bl7ppZFLU\"",
		"mtime": "2026-09-23T11:13:37.924Z",
		"size": 3137,
		"path": "../public/assets/reviews-CWIQSaFB.js"
	},
	"/assets/route-BZu1sPIh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-SIMQ8UNF8Uug3eEOxoJtx8dTLtM\"",
		"mtime": "2026-09-23T11:13:37.927Z",
		"size": 214,
		"path": "../public/assets/route-BZu1sPIh.js"
	},
	"/assets/routes-BFKjuKYF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69b5-tcPU1kGpOKfq/MxzR2uGMYHkx9g\"",
		"mtime": "2026-09-23T11:13:37.932Z",
		"size": 27061,
		"path": "../public/assets/routes-BFKjuKYF.js"
	},
	"/assets/search-CNVXHbUh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-t8vVw4a97Zu3vmbwxlhsSpw04EU\"",
		"mtime": "2026-09-23T11:13:37.936Z",
		"size": 168,
		"path": "../public/assets/search-CNVXHbUh.js"
	},
	"/assets/send-88iusw-G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-9eCIpIS6WOiNlBDwf6jAFcvvZ9c\"",
		"mtime": "2026-09-23T11:13:37.939Z",
		"size": 284,
		"path": "../public/assets/send-88iusw-G.js"
	},
	"/assets/settings-CnoXIuJ7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc69-xVnLPuBAvgD0beGNl5NB6UXK0iA\"",
		"mtime": "2026-09-23T11:13:37.992Z",
		"size": 64617,
		"path": "../public/assets/settings-CnoXIuJ7.js"
	},
	"/assets/site-footer-Ck8ZkhQr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"afb-CYP/vZsk8vfw4LsQ2K163lioWvQ\"",
		"mtime": "2026-09-23T11:13:37.994Z",
		"size": 2811,
		"path": "../public/assets/site-footer-Ck8ZkhQr.js"
	},
	"/assets/social-0fg3GTAM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d8-cTL91XneKi4NGV98rI92HBQS3CE\"",
		"mtime": "2026-09-23T11:13:37.994Z",
		"size": 6104,
		"path": "../public/assets/social-0fg3GTAM.js"
	},
	"/assets/social-Cb_D4v5z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf3-djTpzCGEPE+UHA5UPcky2yj9xuY\"",
		"mtime": "2026-09-23T11:13:37.996Z",
		"size": 3059,
		"path": "../public/assets/social-Cb_D4v5z.js"
	},
	"/assets/styles-BaTot3Az.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1690f-8EVHOz9pZsvJ8EIbUJwUXTyU2VE\"",
		"mtime": "2026-09-23T11:13:38.081Z",
		"size": 92431,
		"path": "../public/assets/styles-BaTot3Az.css"
	},
	"/assets/supabase-RWjCmIdL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3da08-rg3oJ6Melcm67zlIrR10cK9op/U\"",
		"mtime": "2026-09-23T11:13:37.996Z",
		"size": 252424,
		"path": "../public/assets/supabase-RWjCmIdL.js"
	},
	"/assets/tools-B-aG2i7l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b48-18JzAHZskKeIqib5YnZahA/vr2k\"",
		"mtime": "2026-09-23T11:13:38.000Z",
		"size": 2888,
		"path": "../public/assets/tools-B-aG2i7l.js"
	},
	"/assets/terms-eMfmYnA9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf4-lOufxHe3hD6wtQFp+Tdk6/BcIEI\"",
		"mtime": "2026-09-23T11:13:37.998Z",
		"size": 3316,
		"path": "../public/assets/terms-eMfmYnA9.js"
	},
	"/assets/trash-2-Bog-g8dT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-vSdsfDe2WOXbEO2k7cnLMefK3T0\"",
		"mtime": "2026-09-23T11:13:38.003Z",
		"size": 322,
		"path": "../public/assets/trash-2-Bog-g8dT.js"
	},
	"/assets/useMutation-0k7ZvogN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91f-j/bh9TlR52g19a3ADtsRAX+TPWA\"",
		"mtime": "2026-09-23T11:13:38.004Z",
		"size": 2335,
		"path": "../public/assets/useMutation-0k7ZvogN.js"
	},
	"/assets/safar-face-daughter-BSU0g8zX.png": {
		"type": "image/png",
		"etag": "\"ed05a-SVhByj32N/cRas+zBCzpgGxvqpE\"",
		"mtime": "2026-09-23T11:13:38.024Z",
		"size": 970842,
		"path": "../public/assets/safar-face-daughter-BSU0g8zX.png"
	},
	"/assets/safar-face-parents-BnzxPMiP.png": {
		"type": "image/png",
		"etag": "\"10cbe0-j/Usge0m9nQfFuFzWPZJRILDh8c\"",
		"mtime": "2026-09-23T11:13:38.031Z",
		"size": 1100768,
		"path": "../public/assets/safar-face-parents-BnzxPMiP.png"
	},
	"/assets/safar-face-son-DcEEqhD9.png": {
		"type": "image/png",
		"etag": "\"1103c9-S6t3MZvToeGNeF92vJD2zKwiqeI\"",
		"mtime": "2026-09-23T11:13:38.036Z",
		"size": 1115081,
		"path": "../public/assets/safar-face-son-DcEEqhD9.png"
	},
	"/assets/safar-story-groceries-BdU1EYRc.png": {
		"type": "image/png",
		"etag": "\"1d058a-fyE2t5XobNhIyZ7j3Z5a6lAlC/w\"",
		"mtime": "2026-09-23T11:13:38.040Z",
		"size": 1901962,
		"path": "../public/assets/safar-story-groceries-BdU1EYRc.png"
	},
	"/assets/safar-hero-family-BK4zYqKK.png": {
		"type": "image/png",
		"etag": "\"1eb4bc-0ZVnIjT4dV1pwyO6L+/vWHDvB9M\"",
		"mtime": "2026-09-23T11:13:38.038Z",
		"size": 2012348,
		"path": "../public/assets/safar-hero-family-BK4zYqKK.png"
	},
	"/assets/safar-story-health-J9PcQXVd.png": {
		"type": "image/png",
		"etag": "\"1b8b8b-xvQ+COGnfRkk+1QWBrYExHd0LWY\"",
		"mtime": "2026-09-23T11:13:38.044Z",
		"size": 1805195,
		"path": "../public/assets/safar-story-health-J9PcQXVd.png"
	},
	"/assets/safar-updates-Bv3rcd5B.png": {
		"type": "image/png",
		"etag": "\"1d4b05-mCDnTMNP84mioPUI/sIP9wDGOyc\"",
		"mtime": "2026-09-23T11:13:38.079Z",
		"size": 1919749,
		"path": "../public/assets/safar-updates-Bv3rcd5B.png"
	},
	"/assets/safar-story-repairs-CC0uiQok.png": {
		"type": "image/png",
		"etag": "\"1a8d85-Zq9QuLmBbpWk41FBgHGwLHFLJA8\"",
		"mtime": "2026-09-23T11:13:38.047Z",
		"size": 1740165,
		"path": "../public/assets/safar-story-repairs-CC0uiQok.png"
	},
	"/assets/useQuery-BcspnKLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f11-16EJsPmfI8g9mYNqnJy5TysOrz0\"",
		"mtime": "2026-09-23T11:13:38.006Z",
		"size": 7953,
		"path": "../public/assets/useQuery-BcspnKLD.js"
	},
	"/assets/user-plus-BXoUFMiQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130-V/tADg/n9v+PxCKMrh2tr8XbGa0\"",
		"mtime": "2026-09-23T11:13:38.010Z",
		"size": 304,
		"path": "../public/assets/user-plus-BXoUFMiQ.js"
	},
	"/assets/vendors-CBBYB2Yh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c04-vwhXV1F+awRx0vkqTb+Qnhe2QAI\"",
		"mtime": "2026-09-23T11:13:38.012Z",
		"size": 11268,
		"path": "../public/assets/vendors-CBBYB2Yh.js"
	},
	"/assets/website-Bcpp8X7a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2854-swxU8B+plgVY8DAFBbqYaORvBOM\"",
		"mtime": "2026-09-23T11:13:38.014Z",
		"size": 10324,
		"path": "../public/assets/website-Bcpp8X7a.js"
	},
	"/assets/safar-cast-DHMIJK5u.png": {
		"type": "image/png",
		"etag": "\"23ca93-Tp8J2li+OKuj26ieeYjF73bdO7g\"",
		"mtime": "2026-09-23T11:13:38.021Z",
		"size": 2345619,
		"path": "../public/assets/safar-cast-DHMIJK5u.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_Q7iAlm = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_Q7iAlm
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
