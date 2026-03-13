import type { FeatureStatus } from "../../types/sessions";

const STAGES: FeatureStatus[] = [
  "new",
  "design",
  "design_review",
  "code",
  "code_review",
  "complete",
];

const STAGE_LABELS: Record<FeatureStatus, string> = {
  new: "New",
  design: "Design",
  design_review: "Review",
  code: "Code",
  code_review: "Review",
  complete: "Done",
};

// Color for current dot ring & label per status
const STATUS_COLOR: Record<FeatureStatus, string> = {
  new: "bg-slate-400 shadow-[0_0_0_2px_var(--bg-surface),0_0_0_3.5px_#94a3b8]",
  design:
    "bg-purple-400 shadow-[0_0_0_2px_var(--bg-surface),0_0_0_3.5px_#c084fc]",
  design_review:
    "bg-yellow-400 shadow-[0_0_0_2px_var(--bg-surface),0_0_0_3.5px_#facc15]",
  code: "bg-blue-400 shadow-[0_0_0_2px_var(--bg-surface),0_0_0_3.5px_#60a5fa]",
  code_review:
    "bg-yellow-400 shadow-[0_0_0_2px_var(--bg-surface),0_0_0_3.5px_#facc15]",
  complete:
    "bg-emerald-400 shadow-[0_0_0_2px_var(--bg-surface),0_0_0_3.5px_#34d399]",
};

const STATUS_LABEL_COLOR: Record<FeatureStatus, string> = {
  new: "text-slate-400",
  design: "text-purple-400",
  design_review: "text-yellow-400",
  code: "text-blue-400",
  code_review: "text-yellow-400",
  complete: "text-emerald-400",
};

export interface PipelineDotsProps {
  status: FeatureStatus;
  showLabel?: boolean;
}

export default function PipelineDots({
  status,
  showLabel = true,
}: PipelineDotsProps) {
  const currentIndex = STAGES.indexOf(status);
  const isComplete = status === "complete";

  return (
    <div className="flex items-center gap-1">
      {STAGES.map((stage, i) => {
        const isPast = i < currentIndex;
        const isCurrent = i === currentIndex;

        let dotClass = "h-2 w-2 rounded-full ";
        if (isCurrent) {
          dotClass += STATUS_COLOR[status];
        } else if (isPast || isComplete) {
          dotClass += isComplete ? "bg-emerald-500" : "bg-blue-500";
        } else {
          dotClass += "bg-slate-700";
        }

        return <div key={stage} className={dotClass} />;
      })}
      {showLabel && (
        <span
          className={`ml-1.5 text-[10px] font-medium ${STATUS_LABEL_COLOR[status]}`}
        >
          {STAGE_LABELS[status]}
        </span>
      )}
    </div>
  );
}
