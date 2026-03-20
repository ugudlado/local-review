import { THREAD_STATUS, type ThreadStatus } from "../../types/constants";
import { normalizeStatus, statusLabel } from "../../utils/threadStatus";

interface ThreadStatusBadgeProps {
  status: ThreadStatus;
  size?: "sm" | "md";
}

const STATUS_COLORS: Record<string, { dot: string; bg: string; text: string }> =
  {
    [THREAD_STATUS.Open]: {
      dot: "var(--accent-amber)",
      bg: "var(--accent-amber-dim)",
      text: "var(--accent-amber)",
    },
    [THREAD_STATUS.Resolved]: {
      dot: "var(--accent-emerald)",
      bg: "var(--accent-emerald-dim)",
      text: "var(--accent-emerald)",
    },
    [THREAD_STATUS.WontFix]: {
      dot: "var(--text-muted)",
      bg: "var(--bg-overlay)",
      text: "var(--text-secondary)",
    },
    [THREAD_STATUS.Outdated]: {
      dot: "var(--accent-purple)",
      bg: "var(--accent-purple-dim)",
      text: "var(--accent-purple)",
    },
  };

export function ThreadStatusBadge({
  status,
  size = "md",
}: ThreadStatusBadgeProps) {
  const normalized = normalizeStatus(status);
  const colors = STATUS_COLORS[normalized] ?? STATUS_COLORS[THREAD_STATUS.Open];
  const label = statusLabel(normalized);

  const isSm = size === "sm";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full"
      style={{
        padding: isSm ? "1px 6px" : "2px 8px",
        fontSize: isSm ? "10px" : "11px",
        fontWeight: 500,
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{
          width: isSm ? 5 : 6,
          height: isSm ? 5 : 6,
          backgroundColor: colors.dot,
        }}
      />
      {label}
    </span>
  );
}
