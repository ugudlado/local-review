/**
 * SectionLabel — reusable section header with badge count
 * Used in thread navigation and thread panel views
 */

export interface SectionLabelProps {
  label: string;
  count: number;
  variant: "open" | "resolved";
  sticky?: boolean;
}

export function SectionLabel({
  label,
  count,
  variant,
  sticky = true,
}: SectionLabelProps) {
  const badgeColors =
    variant === "open"
      ? "bg-[var(--accent-amber-dim)] text-[var(--accent-amber)]"
      : "bg-[var(--accent-emerald-dim)] text-[var(--accent-emerald)]";

  const stickyClass = sticky ? "sticky top-0 z-10" : "";

  return (
    <div
      className={`flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 ${stickyClass}`}
    >
      <span className="text-xs font-medium text-[var(--text-primary)]">
        {label}
      </span>
      {count > 0 && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${badgeColors}`}
        >
          {count}
        </span>
      )}
    </div>
  );
}
