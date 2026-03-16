import type { Context, Next } from "hono";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { AppEnv } from "../types.js";

/**
 * Hono middleware that extracts and validates the `?repo` query parameter.
 *
 * When `?repo` is provided, the path is validated (exists, is a git repo,
 * no path traversal) and set on the Hono context as `repoRoot`.
 * When absent, `defaultRepoRoot` is used.
 */
export function repoMiddleware(defaultRepoRoot: string) {
  return async (c: Context<AppEnv>, next: Next) => {
    const repoParam = c.req.query("repo");

    if (!repoParam) {
      c.set("repoRoot", defaultRepoRoot);
      return next();
    }

    // Reject path traversal before any resolution
    if (repoParam.includes("..")) {
      return c.json(
        { error: "Invalid repo path: path traversal not allowed" },
        400,
      );
    }

    // Expand tilde
    let resolved = repoParam;
    if (resolved.startsWith("~")) {
      resolved = os.homedir() + resolved.slice(1);
    }

    // Resolve to absolute path
    resolved = path.resolve(resolved);

    // Check path exists
    if (!fs.existsSync(resolved)) {
      return c.json(
        { error: `Invalid repo path: directory does not exist: ${resolved}` },
        400,
      );
    }

    // Check it's a git repo (.git directory or .git file for worktrees)
    const gitPath = path.join(resolved, ".git");
    if (!fs.existsSync(gitPath)) {
      return c.json(
        { error: `Invalid repo path: not a git repository: ${resolved}` },
        400,
      );
    }

    c.set("repoRoot", resolved);
    return next();
  };
}
