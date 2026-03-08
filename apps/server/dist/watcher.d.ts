/** Well-known WebSocket event names shared between server and client. */
export declare const WS_EVENTS: {
    readonly FEATURES_UPDATED: "review:features-updated";
    readonly SESSION_UPDATED: "review:session-updated";
    readonly RESOLVE_STARTED: "review:resolve-started";
    readonly RESOLVE_COMPLETED: "review:resolve-completed";
    readonly RESOLVE_FAILED: "review:resolve-failed";
};
export type WsEventName = (typeof WS_EVENTS)[keyof typeof WS_EVENTS];
export type WsEvent = {
    event: WsEventName | string;
    data: unknown;
};
export type Broadcaster = (event: WsEvent) => void;
export declare function setBroadcaster(fn: Broadcaster): void;
export declare function startGitWatcher(repoRoot: string): void;
export declare function startSessionWatcher(sessionsDir: string): void;
