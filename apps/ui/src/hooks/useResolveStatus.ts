import { useEffect, useState } from "react";

export type ResolveStatus =
  | { state: "idle" }
  | { state: "resolving"; featureId: string; threadCount: number }
  | {
      state: "completed";
      featureId: string;
      resolved: number;
      clarifications: number;
    };

/**
 * Listens for review:resolve-started and review:resolve-completed HMR events
 * emitted by the Vite server when the resolver daemon runs.
 *
 * Resets to idle 5 seconds after completion so the status indicator fades out.
 */
export function useResolveStatus(): ResolveStatus {
  const [status, setStatus] = useState<ResolveStatus>({ state: "idle" });

  useEffect(() => {
    if (!import.meta.hot) return;

    const onStarted = (data: { featureId: string; threadCount: number }) => {
      setStatus({
        state: "resolving",
        featureId: data.featureId,
        threadCount: data.threadCount,
      });
    };

    const onCompleted = (data: {
      featureId: string;
      resolved: number;
      clarifications: number;
    }) => {
      setStatus({
        state: "completed",
        featureId: data.featureId,
        resolved: data.resolved,
        clarifications: data.clarifications,
      });
      // Auto-reset after 5 seconds
      setTimeout(() => setStatus({ state: "idle" }), 5000);
    };

    import.meta.hot.on("review:resolve-started", onStarted);
    import.meta.hot.on("review:resolve-completed", onCompleted);

    return () => {
      import.meta.hot?.off?.("review:resolve-started", onStarted);
      import.meta.hot?.off?.("review:resolve-completed", onCompleted);
    };
  }, []);

  return status;
}
