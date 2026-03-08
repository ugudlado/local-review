import path from "node:path";
import { getGitState } from "./git.js";
const FEATURE_ID_RE = /^[a-zA-Z0-9._-]+$/;
/** Validate and return a feature ID, or null if invalid. */
export function safeId(raw) {
    return FEATURE_ID_RE.test(raw) ? raw : null;
}
/** Find a worktree path by feature ID (basename of worktree path). */
export function findWorktreePath(featureId) {
    const gitState = getGitState();
    if (!gitState)
        return null;
    const wt = gitState.worktrees.find((w) => path.basename(w.path) === featureId);
    return wt ? wt.path : null;
}
