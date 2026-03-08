import { Hono } from "hono";
import fs from "node:fs/promises";
import path from "node:path";
import { safeId } from "../utils.js";
const SESSION_CONFIGS = {
    code: {
        pathSegment: "code-session",
        fileSuffix: "-code.json",
    },
    spec: {
        pathSegment: "spec-session",
        fileSuffix: "-spec.json",
        onPatchThread: (thread, session) => {
            thread.lastUpdatedAt = new Date().toISOString();
            const metadata = session.metadata;
            if (metadata) {
                metadata.updatedAt = new Date().toISOString();
            }
        },
    },
};
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Generic session CRUD registration
// ---------------------------------------------------------------------------
function registerSessionCRUD(app, config, sessionsDir, ensureSessionsDir, sessionType) {
    const { pathSegment, fileSuffix, onPatchThread } = config;
    // GET
    app.get(`/:id/${pathSegment}`, async (c) => {
        const featureId = safeId(c.req.param("id"));
        if (!featureId) {
            return c.json({ error: "Invalid feature id" }, 400);
        }
        await ensureSessionsDir();
        const filePath = path.join(sessionsDir, `${featureId}${fileSuffix}`);
        try {
            const content = await fs.readFile(filePath, "utf-8");
            return c.json({ session: JSON.parse(content) });
        }
        catch {
            return c.json({ session: null });
        }
    });
    // POST (save)
    app.post(`/:id/${pathSegment}`, async (c) => {
        const featureId = safeId(c.req.param("id"));
        if (!featureId) {
            return c.json({ error: "Invalid feature id" }, 400);
        }
        await ensureSessionsDir();
        const filePath = path.join(sessionsDir, `${featureId}${fileSuffix}`);
        const session = (await c.req.json());
        await fs.writeFile(filePath, JSON.stringify(session, null, 2), "utf-8");
        return c.json({ ok: true });
    });
    // DELETE
    app.delete(`/:id/${pathSegment}`, async (c) => {
        const featureId = safeId(c.req.param("id"));
        if (!featureId) {
            return c.json({ error: "Invalid feature id" }, 400);
        }
        await ensureSessionsDir();
        const filePath = path.join(sessionsDir, `${featureId}${fileSuffix}`);
        try {
            await fs.unlink(filePath);
        }
        catch {
            // File doesn't exist — that's fine
        }
        return c.json({ ok: true });
    });
    // PATCH thread
    app.patch(`/:id/${pathSegment}/threads/:threadId`, async (c) => {
        const featureId = safeId(c.req.param("id"));
        if (!featureId) {
            return c.json({ error: "Invalid feature id" }, 400);
        }
        const threadId = c.req.param("threadId");
        await ensureSessionsDir();
        const filePath = path.join(sessionsDir, `${featureId}${fileSuffix}`);
        let sessionContent;
        try {
            sessionContent = await fs.readFile(filePath, "utf-8");
        }
        catch {
            return c.json({ error: "Session not found" }, 404);
        }
        const session = JSON.parse(sessionContent);
        const threads = session.threads ?? [];
        const threadIndex = threads.findIndex((t) => t.id === threadId);
        if (threadIndex === -1) {
            return c.json({ error: "Thread not found" }, 404);
        }
        const patch = (await c.req.json());
        const updatedThread = { ...threads[threadIndex] };
        if (patch.status !== undefined) {
            updatedThread.status = patch.status;
        }
        if (patch.messages !== undefined) {
            updatedThread.messages = [
                ...(updatedThread.messages ?? []),
                ...patch.messages,
            ];
        }
        onPatchThread?.(updatedThread, session);
        threads[threadIndex] = updatedThread;
        session.threads = threads;
        await fs.writeFile(filePath, JSON.stringify(session, null, 2), "utf-8");
        return c.json({ ok: true, thread: updatedThread });
    });
}
// ---------------------------------------------------------------------------
// Route factory
// ---------------------------------------------------------------------------
export function createSessionsRoute(repoRoot) {
    const app = new Hono();
    const sessionsDir = path.join(repoRoot, ".review", "sessions");
    // Ensure sessions directory exists once, not per-request
    let dirEnsured = false;
    async function ensureSessionsDir() {
        if (dirEnsured)
            return;
        await fs.mkdir(sessionsDir, { recursive: true });
        dirEnsured = true;
    }
    // Register both code and spec session CRUD
    for (const [type, config] of Object.entries(SESSION_CONFIGS)) {
        registerSessionCRUD(app, config, sessionsDir, ensureSessionsDir, type);
    }
    return app;
}
