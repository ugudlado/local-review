import { useEffect, useRef, useState } from "react";

export type ResolveOutcome = "resolved" | "clarification" | "error";

export type ThreadLogEntry = {
  threadId: string;
  filePath: string;
  line: number;
  outcome: ResolveOutcome;
  timestamp: string;
};

export type ThreadInfo = {
  id: string;
  filePath: string;
  line: number;
};

export type ResolveStatus =
  | { state: "idle" }
  | {
      state: "resolving";
      featureId: string;
      threadCount: number;
      threads: ThreadInfo[];
      resolved: number;
      log: ThreadLogEntry[];
    }
  | {
      state: "completed";
      featureId: string;
      resolved: number;
      clarifications: number;
      log: ThreadLogEntry[];
    }
  | { state: "failed"; featureId: string; error: string };

/**
 * Listens for review:resolve-* HMR events and tracks per-thread progress.
 *
 * Events:
 * - resolve-started: begins tracking with thread list
 * - resolve-thread-done: logs each thread completion
 * - resolve-completed: final summary
 * - resolve-failed: error state
 *
 * Resets to idle 8 seconds after completion/failure.
 */
export function useResolveStatus(): ResolveStatus {
  const [status, setStatus] = useState<ResolveStatus>({ state: "idle" });
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!import.meta.hot) return;

    const clearFadeTimer = () => {
      if (fadeTimerRef.current !== undefined) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = undefined;
      }
    };

    const startFadeTimer = () => {
      clearFadeTimer();
      fadeTimerRef.current = setTimeout(
        () => setStatus({ state: "idle" }),
        8000,
      );
    };

    const onStarted = (data: {
      featureId: string;
      threadCount: number;
      threads?: ThreadInfo[];
    }) => {
      clearFadeTimer();
      setStatus({
        state: "resolving",
        featureId: data.featureId,
        threadCount: data.threadCount,
        threads: data.threads ?? [],
        resolved: 0,
        log: [],
      });
    };

    const onThreadDone = (data: {
      featureId: string;
      threadId: string;
      filePath: string;
      line: number;
      outcome: ResolveOutcome;
    }) => {
      setStatus((prev) => {
        if (prev.state !== "resolving") return prev;
        if (prev.featureId !== data.featureId) return prev;
        const entry: ThreadLogEntry = {
          threadId: data.threadId,
          filePath: data.filePath,
          line: data.line,
          outcome: data.outcome,
          timestamp: new Date().toISOString(),
        };
        return {
          ...prev,
          resolved: prev.resolved + 1,
          log: [...prev.log, entry],
        };
      });
    };

    const onCompleted = (data: {
      featureId: string;
      resolved: number;
      clarifications: number;
    }) => {
      setStatus((prev) => {
        const log = prev.state === "resolving" ? prev.log : [];
        return {
          state: "completed",
          featureId: data.featureId,
          resolved: data.resolved,
          clarifications: data.clarifications,
          log,
        };
      });
      startFadeTimer();
    };

    const onFailed = (data: { featureId: string; error: string }) => {
      setStatus({
        state: "failed",
        featureId: data.featureId,
        error: data.error,
      });
      startFadeTimer();
    };

    import.meta.hot.on("review:resolve-started", onStarted);
    import.meta.hot.on("review:resolve-thread-done", onThreadDone);
    import.meta.hot.on("review:resolve-completed", onCompleted);
    import.meta.hot.on("review:resolve-failed", onFailed);

    return () => {
      clearFadeTimer();
      import.meta.hot?.off?.("review:resolve-started", onStarted);
      import.meta.hot?.off?.("review:resolve-thread-done", onThreadDone);
      import.meta.hot?.off?.("review:resolve-completed", onCompleted);
      import.meta.hot?.off?.("review:resolve-failed", onFailed);
    };
  }, []);

  return status;
}

/**
 * Returns true if the given thread is currently being resolved
 * (i.e. in the pending list but not yet in the log).
 */
export function useIsThreadResolving(threadId: string): boolean {
  const status = useResolveStatus();
  if (status.state !== "resolving") return false;
  const isDone = status.log.some((e) => e.threadId === threadId);
  if (isDone) return false;
  if (status.threads.length === 0) return false;
  return status.threads.some((t) => t.id === threadId);
}
