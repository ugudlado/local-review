/**
 * resolver-daemon.ts
 *
 * Manages a persistent Claude Agent SDK session for resolving review threads.
 * Cold-starts when the Vite server boots, then resumes the same session for
 * each resolve request — accumulating context across resolve cycles.
 *
 * Uses @anthropic-ai/claude-agent-sdk query() with `resume` for multi-turn.
 */
export type ResolveResult = {
    resolved: number;
    clarifications: number;
    fixes: string[];
};
/**
 * Cold-starts a Claude Agent SDK session with the review resolver context.
 * Captures the session_id for future resume calls.
 * Non-blocking — call and forget; logs errors without throwing.
 */
export declare function coldStart(cwd: string): Promise<void>;
/**
 * Resolves open threads in a session, serializing concurrent requests.
 * If a resolve is already running, the new request is queued (latest wins).
 * Superseded queued requests are rejected so their Promises don't leak.
 */
export declare function resolve(sessionFile: string, sessionType: "code" | "spec", featureId: string, cwd: string): Promise<ResolveResult>;
export declare function getStatus(): {
    ready: boolean;
    resolving: boolean;
    sessionId: string | null;
    lastError: {
        message: string;
        timestamp: string;
        code?: string;
    } | null;
};
