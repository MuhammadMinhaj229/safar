import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./app-shell-CL9UFF9M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DrWFeCJv.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Auth gate for the whole CRM subtree. When the owner has not connected
* the database yet, the shell still renders (with a setup banner) so the
* Settings → Connections screen stays reachable.
*/
function AuthenticatedLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AuthenticatedLayout as component };
