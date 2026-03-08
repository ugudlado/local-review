import { execFile } from "node:child_process";
export declare const execFileAsync: typeof execFile.__promisify__;
export type Worktree = {
    path: string;
    branch: string;
};
export type GitState = {
    /** All local worktrees (detached HEAD entries excluded) */
    worktrees: Worktree[];
    /** All local branch names */
    localBranches: string[];
    /** Local branches not yet merged to main */
    unmergedBranches: string[];
    /** Feature IDs with archived specs (completed features) */
    archivedFeatureIds: Set<string>;
    computedAt: number;
};
export declare function execGit(args: string[], cwd: string): Promise<string>;
export declare function refreshGitState(repoRoot: string): Promise<GitState>;
export declare function getGitState(): GitState | null;
