import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";
import { refreshGitState } from "./git.js";
import { coldStart as resolverColdStart, getStatus as resolverStatus, } from "./resolver-daemon.js";
import { createContextRoute } from "./routes/context.js";
import { createFeaturesRoute } from "./routes/features.js";
import { createSessionsRoute } from "./routes/sessions.js";
import { createSpecRoute } from "./routes/spec.js";
import { createTasksRoute } from "./routes/tasks.js";
import { setBroadcaster, startGitWatcher, startSessionWatcher, } from "./watcher.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");
const sessionsDir = path.join(repoRoot, ".review", "sessions");
const uiDist = path.resolve(__dirname, "../../ui/dist");
// ---------------------------------------------------------------------------
// WebSocket broadcast
// ---------------------------------------------------------------------------
const clients = new Set();
function broadcast(event) {
    const message = JSON.stringify(event);
    for (const client of clients) {
        if (client.readyState === 1 /* OPEN */) {
            client.send(message);
        }
    }
}
setBroadcaster(broadcast);
// ---------------------------------------------------------------------------
// Hono app
// ---------------------------------------------------------------------------
const app = new Hono();
app.use("*", cors());
// API routes
app.route("/api/features", createFeaturesRoute(repoRoot));
app.route("/api", createContextRoute(repoRoot));
app.route("/api/features", createSessionsRoute(repoRoot));
app.route("/api/features", createSpecRoute(repoRoot));
app.route("/api/features", createTasksRoute(repoRoot));
// Resolver daemon management
app.post("/api/resolver/cold-start", async (c) => {
    void resolverColdStart(repoRoot);
    return c.json({ ok: true, message: "Cold-start initiated" });
});
app.get("/api/resolver/status", (c) => {
    return c.json(resolverStatus());
});
app.post("/api/resolver/resolve", async (c) => {
    const { featureId, sessionType } = (await c.req.json());
    const suffix = sessionType === "code" ? "-code.json" : "-spec.json";
    const sessionsPath = path.join(repoRoot, ".review", "sessions");
    const sessionFile = path.join(sessionsPath, `${featureId}${suffix}`);
    const openThreadCount = await (async () => {
        try {
            const raw = await fs.readFile(sessionFile, "utf-8");
            const s = JSON.parse(raw);
            return (s.threads ?? []).filter((t) => t.status === "open").length;
        }
        catch {
            return 0;
        }
    })();
    if (openThreadCount === 0) {
        return c.json({ ok: true, resolved: 0, clarifications: 0, fixes: [] });
    }
    broadcast({
        event: "review:resolve-started",
        data: { featureId, sessionType, openThreadCount },
    });
    try {
        const { resolve: daemonResolve } = await import("./resolver-daemon.js");
        const result = await daemonResolve(sessionFile, sessionType, featureId, repoRoot);
        broadcast({
            event: "review:resolve-completed",
            data: { featureId, sessionType, ...result },
        });
        return c.json({ ok: true, ...result });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        broadcast({
            event: "review:resolve-failed",
            data: { featureId, sessionType, error: message },
        });
        return c.json({ ok: false, error: message }, 500);
    }
});
// Read index.html fresh each time (no cache) so rebuilds take effect without server restart
async function getIndexHtml() {
    return fs.readFile(path.join(uiDist, "index.html"), "utf-8");
}
// SPA fallback — non-API, non-asset GETs → index.html
app.get("*", async (c, next) => {
    const pathname = new URL(c.req.url).pathname;
    if (pathname.includes("."))
        return next();
    return c.html(await getIndexHtml());
});
// Static UI (production: serve built dist/)
app.use("/*", serveStatic({ root: uiDist, rewriteRequestPath: (p) => p }));
// ---------------------------------------------------------------------------
// Startup
// ---------------------------------------------------------------------------
console.log("[local-review] Warming git state cache...");
await refreshGitState(repoRoot);
console.log("[local-review] Git state ready.");
startGitWatcher(repoRoot);
startSessionWatcher(sessionsDir);
const port = parseInt(process.env.PORT ?? "", 10) || 37003;
const server = serve({ fetch: app.fetch, port }, () => {
    console.log(`[local-review] Server running at http://localhost:${port}`);
});
// ---------------------------------------------------------------------------
// WebSocket server (attached to same HTTP server)
// ---------------------------------------------------------------------------
const wss = new WebSocketServer({ noServer: true });
server.on("upgrade", (req, socket, head) => {
    const url = req.url ?? "";
    if (url === "/ws" || url.startsWith("/ws?")) {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    }
    else {
        socket.destroy();
    }
});
wss.on("connection", (ws) => {
    clients.add(ws);
    ws.on("close", () => clients.delete(ws));
    ws.on("error", () => clients.delete(ws));
});
