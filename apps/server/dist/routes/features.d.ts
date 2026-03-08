import { Hono } from "hono";
type FeatureStatus = "new" | "design" | "design_review" | "code" | "code_review" | "complete";
export interface FeatureInfo {
    id: string;
    worktreePath: string;
    branch: string;
    status: FeatureStatus;
    hasSpec: boolean;
    hasTasks: boolean;
    taskProgress: {
        done: number;
        total: number;
    };
    openThreads: number;
    lastActivity: string | null;
    filesChanged: number;
    sourceType: "worktree" | "branch";
}
export declare function createFeaturesRoute(repoRoot: string): Hono;
export {};
