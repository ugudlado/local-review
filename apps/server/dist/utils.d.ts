/** Validate and return a feature ID, or null if invalid. */
export declare function safeId(raw: string): string | null;
/** Find a worktree path by feature ID (basename of worktree path). */
export declare function findWorktreePath(featureId: string): string | null;
