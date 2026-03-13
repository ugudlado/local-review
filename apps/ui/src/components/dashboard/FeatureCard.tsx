import { useNavigate } from "react-router-dom";
import { type FeatureInfo } from "../../services/featureApi";
import { relativeTime } from "../../utils/timeFormat";

export interface FeatureCardProps {
  feature: FeatureInfo;
  searchQuery?: string;
}

function GitBranchIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM3.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z" />
    </svg>
  );
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-blue-500/20 not-italic text-blue-300">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const ACRONYMS = new Set([
  "ui",
  "ux",
  "api",
  "cli",
  "db",
  "pr",
  "css",
  "js",
  "ts",
  "http",
  "url",
  "id",
  "ai",
  "ci",
  "cd",
]);

function parseFeatureTitle(id: string): string {
  const withoutDate = id.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const withoutLinear = withoutDate.replace(/^[A-Z]+-\d+-/, "");
  return withoutLinear
    .split("-")
    .map((word) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function isBranchRedundant(branch: string, id: string): boolean {
  return branch === `feature/${id}` || branch === "main" || branch === "master";
}

function extractDateFromId(id: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})-/.exec(id);
  if (!match) return null;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[parseInt(match[2], 10) - 1];
  const day = parseInt(match[3], 10);
  return month && day ? `${month} ${day}` : null;
}

const STATUS_BORDER_COLOR: Record<string, string> = {
  new: "#60a5fa",
  design: "#d8b4fe",
  design_review: "#fde047",
  code: "#7dd3fc",
  code_review: "#fcd34d",
  complete: "#34d399",
};

const STATUS_PILL: Record<string, { bg: string; text: string; label: string }> =
  {
    new: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Active" },
    design: {
      bg: "bg-purple-400/10",
      text: "text-purple-400",
      label: "Design",
    },
    design_review: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      label: "Design Review",
    },
    code: { bg: "bg-blue-400/10", text: "text-blue-400", label: "Code" },
    code_review: {
      bg: "bg-amber-400/10",
      text: "text-amber-400",
      label: "Code Review",
    },
    complete: {
      bg: "bg-emerald-500/[0.08]",
      text: "text-emerald-400",
      label: "Complete",
    },
  };

export default function FeatureCard({
  feature,
  searchQuery = "",
}: FeatureCardProps) {
  const navigate = useNavigate();
  const parsedTitle = parseFeatureTitle(feature.id);
  const borderColor = STATUS_BORDER_COLOR[feature.status] ?? "#475569";
  const pill = STATUS_PILL[feature.status] ?? STATUS_PILL.new;
  const showBranch = !isBranchRedundant(feature.branch, feature.id);
  const isComplete = feature.status === "complete";

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => void navigate(`/features/${feature.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          void navigate(`/features/${feature.id}`);
      }}
      className={`flex cursor-pointer items-center gap-4 rounded-lg border bg-[var(--bg-surface)] px-4 py-3.5 transition-all hover:translate-x-1 hover:bg-slate-800/60 ${!isComplete ? "border-blue-500/40 bg-blue-900/20 ring-1 ring-blue-400/20" : "border-[var(--border-default)]"}`}
      style={{ borderLeftColor: borderColor, borderLeftWidth: "4px" }}
    >
      {/* Title area */}
      <div className="min-w-0 flex-1">
        <div
          className={`truncate text-sm font-semibold ${isComplete ? "text-slate-300" : "text-slate-100"}`}
        >
          {highlightMatch(parsedTitle, searchQuery)}
        </div>
        <div
          className={`mt-0.5 font-mono text-[10px] ${isComplete ? "text-slate-600" : "text-slate-500"}`}
        >
          {highlightMatch(feature.id, searchQuery)}
        </div>
        {showBranch && (
          <div className="mt-1 flex items-center gap-1 text-slate-600">
            <GitBranchIcon />
            <span className="truncate text-[10px]">{feature.branch}</span>
          </div>
        )}
      </div>

      {/* Status pill */}
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${pill.bg} ${pill.text}`}
      >
        {pill.label}
      </span>

      {/* Timestamp */}
      <div className="w-20 shrink-0 text-right text-[11px] tabular-nums text-slate-400">
        {feature.lastActivity
          ? relativeTime(feature.lastActivity)
          : (extractDateFromId(feature.id) ?? "—")}
      </div>
    </div>
  );
}
