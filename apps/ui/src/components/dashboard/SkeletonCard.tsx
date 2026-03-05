function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-700/60 ${className ?? ""}`}
    />
  );
}

export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3.5 rounded-lg border border-slate-700/50 bg-[var(--bg-surface)] p-4">
      {/* Title row */}
      <div className="flex items-center justify-between gap-3">
        <SkeletonLine className="h-4 w-3/5" />
        <SkeletonLine className="h-3 w-12" />
      </div>
      {/* Badge + branch */}
      <div className="flex items-center gap-2">
        <SkeletonLine className="h-5 w-24 rounded-full" />
        <SkeletonLine className="h-3 w-32" />
      </div>
      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <SkeletonLine className="h-3 w-10" />
          <SkeletonLine className="h-3 w-10" />
        </div>
        <SkeletonLine className="h-1.5 w-full" />
      </div>
      {/* Metrics row */}
      <div className="flex items-center gap-4">
        <SkeletonLine className="h-3 w-16" />
        <SkeletonLine className="h-3 w-12" />
      </div>
      {/* Actions */}
      <div className="flex items-center gap-1 border-t border-slate-700/50 pt-2.5">
        <SkeletonLine className="h-6 w-10 rounded" />
        <SkeletonLine className="h-6 w-12 rounded" />
        <SkeletonLine className="h-6 w-10 rounded" />
      </div>
    </div>
  );
}
