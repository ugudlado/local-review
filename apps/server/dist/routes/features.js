import { Hono } from "hono";
import fs from "node:fs/promises";
import path from "node:path";
import { getGitState } from "../git.js";
// ---------------------------------------------------------------------------
// Helpers (logic mirrored from apps/ui/vite.config.ts)
// ---------------------------------------------------------------------------
function deriveFeatureStatus(specSession, codeSession, hasSpec) {
    if (codeSession) {
        const codeVerdict = codeSession.reviewVerdict;
        if (codeVerdict === "changes_requested")
            return "code";
        return "code_review";
    }
    if (specSession) {
        const specVerdict = specSession.verdict;
        if (specVerdict === "approved")
            return "code";
        if (specVerdict === "changes_requested")
            return "design";
        return "design_review";
    }
    if (hasSpec)
        return "design";
    return "new";
}
function parseTaskProgress(content) {
    const checkboxes = content.match(/- \[[x→~ ]\] T\d+/gi) ?? [];
    const done = checkboxes.filter((c) => /- \[[x~]\]/i.test(c)).length;
    return { done, total: checkboxes.length };
}
function countOpenThreads(specSession, codeSession) {
    let count = 0;
    for (const session of [specSession, codeSession]) {
        if (!session)
            continue;
        const threads = session.threads;
        if (!Array.isArray(threads))
            continue;
        for (const t of threads) {
            if (t && typeof t === "object" && "status" in t && t.status === "open") {
                count++;
            }
        }
    }
    return count;
}
async function getLastActivity(paths) {
    const stats = await Promise.all(paths.map((p) => fs.stat(p).catch(() => null)));
    let latest = null;
    for (const stat of stats) {
        if (stat && (!latest || stat.mtime > latest))
            latest = stat.mtime;
    }
    return latest ? latest.toISOString() : null;
}
function countFilesChanged(codeSession) {
    if (!codeSession)
        return 0;
    const diff = codeSession.diff;
    if (typeof diff !== "string")
        return 0;
    const matches = diff.match(/^diff --git /gm);
    return matches ? matches.length : 0;
}
async function readJsonSession(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf-8");
        return JSON.parse(content);
    }
    catch {
        return null;
    }
}
// ---------------------------------------------------------------------------
// Route factory
// ---------------------------------------------------------------------------
export function createFeaturesRoute(repoRoot) {
    const app = new Hono();
    const sessionsDir = path.join(repoRoot, ".review", "sessions");
    app.get("/", async (c) => {
        try {
            const gitState = getGitState();
            if (!gitState) {
                return c.json({ features: [], error: "git state not yet computed" });
            }
            const features = [];
            // ------------------------------------------------------------------
            // 1. Active worktrees (skip index 0 — main worktree)
            // ------------------------------------------------------------------
            await Promise.all(gitState.worktrees.slice(1).map(async (wt) => {
                const featureId = path.basename(wt.path);
                const specSessionPath = path.join(sessionsDir, `${featureId}-spec.json`);
                const codeSessionPath = path.join(sessionsDir, `${featureId}-code.json`);
                const specMdPath = path.join(wt.path, "specs", "active", featureId, "spec.md");
                const tasksMdPath = path.join(wt.path, "specs", "active", featureId, "tasks.md");
                const [specSession, codeSession, hasSpec, tasksContent, lastActivity,] = await Promise.all([
                    readJsonSession(specSessionPath),
                    readJsonSession(codeSessionPath),
                    fs
                        .access(specMdPath)
                        .then(() => true)
                        .catch(() => false),
                    fs.readFile(tasksMdPath, "utf-8").catch(() => null),
                    getLastActivity([
                        specMdPath,
                        tasksMdPath,
                        specSessionPath,
                        codeSessionPath,
                    ]),
                ]);
                const hasTasks = tasksContent !== null;
                features.push({
                    id: featureId,
                    worktreePath: wt.path,
                    branch: wt.branch,
                    status: deriveFeatureStatus(specSession, codeSession, hasSpec),
                    hasSpec,
                    hasTasks,
                    taskProgress: parseTaskProgress(tasksContent ?? ""),
                    openThreads: countOpenThreads(specSession, codeSession),
                    lastActivity,
                    filesChanged: countFilesChanged(codeSession),
                    sourceType: "worktree",
                });
            }));
            // ------------------------------------------------------------------
            // 2. Archived specs — completed features not already in worktrees
            // ------------------------------------------------------------------
            const archivedDir = path.join(repoRoot, "specs", "archived");
            try {
                const archivedEntries = await fs.readdir(archivedDir, {
                    withFileTypes: true,
                });
                for (const entry of archivedEntries) {
                    if (!entry.isDirectory())
                        continue;
                    const archivedId = entry.name;
                    if (features.some((f) => f.id === archivedId))
                        continue;
                    const [hasSpec, hasTasks] = await Promise.all([
                        fs
                            .access(path.join(archivedDir, archivedId, "spec.md"))
                            .then(() => true)
                            .catch(() => false),
                        fs
                            .access(path.join(archivedDir, archivedId, "tasks.md"))
                            .then(() => true)
                            .catch(() => false),
                    ]);
                    if (hasSpec || hasTasks) {
                        features.push({
                            id: archivedId,
                            worktreePath: repoRoot,
                            branch: "main",
                            status: "complete",
                            hasSpec,
                            hasTasks,
                            taskProgress: { done: 0, total: 0 },
                            openThreads: 0,
                            lastActivity: null,
                            filesChanged: 0,
                            sourceType: "worktree",
                        });
                    }
                }
            }
            catch {
                // No archived directory — that's fine
            }
            // ------------------------------------------------------------------
            // 3. Unmerged branches without a worktree
            // ------------------------------------------------------------------
            const existingSlugs = new Set(features.map((f) => f.id));
            // Filter first, then process in parallel
            const branchesToProcess = gitState.unmergedBranches
                .map((branchName) => ({
                branchName,
                slug: branchName.includes("/")
                    ? branchName.slice(branchName.lastIndexOf("/") + 1)
                    : branchName,
            }))
                .filter(({ slug }) => !existingSlugs.has(slug));
            const branchFeatures = await Promise.all(branchesToProcess.map(async ({ branchName, slug }) => {
                const codeSessionPath = path.join(sessionsDir, `${slug}-code.json`);
                const [codeSession, lastActivity] = await Promise.all([
                    readJsonSession(codeSessionPath),
                    getLastActivity([codeSessionPath]),
                ]);
                return {
                    id: slug,
                    worktreePath: repoRoot,
                    branch: branchName,
                    status: deriveFeatureStatus(null, codeSession, false),
                    hasSpec: false,
                    hasTasks: false,
                    taskProgress: { done: 0, total: 0 },
                    openThreads: countOpenThreads(null, codeSession),
                    lastActivity,
                    filesChanged: countFilesChanged(codeSession),
                    sourceType: "branch",
                };
            }));
            features.push(...branchFeatures);
            return c.json({ features });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "unknown error";
            return c.json({ features: [], error: message });
        }
    });
    return app;
}
