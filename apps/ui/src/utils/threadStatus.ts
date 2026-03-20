import { THREAD_STATUS, type ThreadStatus } from "../types/constants";

/** Normalize legacy "approved" status to "resolved". */
export function normalizeStatus(status: ThreadStatus | string): ThreadStatus {
  if (status === THREAD_STATUS.Approved) return THREAD_STATUS.Resolved;
  return status as ThreadStatus;
}

/** Returns true if the thread is in any non-open (closed) state. */
export function isClosed(status: ThreadStatus | string): boolean {
  const s = normalizeStatus(status);
  return s !== THREAD_STATUS.Open;
}

/** Human-readable label for a thread status. */
export function statusLabel(status: ThreadStatus | string): string {
  const s = normalizeStatus(status);
  switch (s) {
    case THREAD_STATUS.Open:
      return "Open";
    case THREAD_STATUS.Resolved:
      return "Resolved";
    case THREAD_STATUS.WontFix:
      return "Won't Fix";
    case THREAD_STATUS.Outdated:
      return "Outdated";
    default:
      return "Open";
  }
}
