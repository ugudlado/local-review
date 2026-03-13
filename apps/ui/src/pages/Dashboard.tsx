import { useState, useEffect, useCallback, useMemo } from "react";
import { featureApi, type FeatureInfo } from "../services/featureApi";
import FeatureCard from "../components/dashboard/FeatureCard";
import SkeletonCard from "../components/dashboard/SkeletonCard";
import EmptyState from "../components/dashboard/EmptyState";
import { APP_NAME } from "../config/app";
import type { FeatureStatus } from "../types/sessions";

type SortKey = "activity" | "status" | "name";

const STATUS_ORDER: Record<FeatureStatus, number> = {
  code_review: 0,
  design_review: 1,
  code: 2,
  design: 3,
  new: 4,
  complete: 5,
};

function sortFeatures(
  features: FeatureInfo[],
  sortKey: SortKey,
): FeatureInfo[] {
  return [...features].sort((a, b) => {
    if (sortKey === "activity") {
      if (!a.lastActivity && !b.lastActivity) return 0;
      if (!a.lastActivity) return 1;
      if (!b.lastActivity) return -1;
      return (
        new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      );
    }
    if (sortKey === "status") {
      return (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
    }
    return a.id.localeCompare(b.id);
  });
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 3a5 5 0 0 0-4.546 2.914.5.5 0 1 1-.908-.418A6 6 0 0 1 14 8a.5.5 0 0 1-1 0 5 5 0 0 0-5-5zm4.546 7.086a.5.5 0 1 1 .908.418A6 6 0 0 1 2 8a.5.5 0 0 1 1 0 5 5 0 0 0 5.546 4.986z" />
    </svg>
  );
}

export default function Dashboard() {
  const [features, setFeatures] = useState<FeatureInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("activity");

  const fetchFeatures = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await featureApi.getFeatures();
      setFeatures(data.features);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load features");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchFeatures();
  }, [fetchFeatures]);

  const { allFeatures, totalVisible } = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const filtered = features.filter(
      (f) =>
        !q ||
        f.id.toLowerCase().includes(q) ||
        f.branch.toLowerCase().includes(q),
    );
    const sorted = sortFeatures(filtered, sortKey);
    return { allFeatures: sorted, totalVisible: filtered.length };
  }, [features, searchQuery, sortKey]);

  let searchCount: string;
  if (searchQuery && features.length > 0) {
    searchCount = `${totalVisible} / ${features.length} features`;
  } else if (features.length > 0) {
    searchCount = `${features.length} features`;
  } else {
    searchCount = "";
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="shrink-0 font-serif text-2xl font-semibold text-slate-100">
            {APP_NAME}
          </h1>
          <button
            onClick={() => {
              void fetchFeatures();
            }}
            disabled={loading}
            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 disabled:opacity-50"
          >
            <RefreshIcon className={loading ? "animate-spin" : undefined} />
            Refresh
          </button>
        </div>

        {/* Filter / sort controls */}
        <div className="mb-4 flex items-center gap-2 border-b border-slate-800/60 pb-4">
          <div className="relative">
            <svg
              className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter features..."
              className="w-52 rounded-md bg-[var(--bg-base)] py-1.5 pl-8 pr-3 text-sm text-slate-200 placeholder-slate-600 ring-1 ring-[var(--border-default)] transition-all focus:outline-none focus:ring-[var(--accent-blue)]"
            />
          </div>

          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-md bg-[var(--bg-base)] py-1.5 pl-2.5 pr-7 text-sm text-slate-400 ring-1 ring-[var(--border-default)] focus:outline-none focus:ring-[var(--accent-blue)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238b949e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              appearance: "none",
            }}
          >
            <option value="activity">Last activity</option>
            <option value="status">Status</option>
            <option value="name">Name</option>
          </select>

          {searchCount && (
            <span className="text-xs tabular-nums text-slate-500">
              {searchCount}
            </span>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-800/50 bg-red-900/20 px-4 py-3 text-sm text-red-300">
            <span>{error}</span>
            <button
              onClick={() => {
                void fetchFeatures();
              }}
              className="ml-4 rounded px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-800/30"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {allFeatures.length === 0 && features.length === 0 && (
              <EmptyState />
            )}
            {allFeatures.length === 0 && features.length > 0 && (
              <p className="py-12 text-center text-sm text-slate-500">
                No features matching "{searchQuery}"
              </p>
            )}
            {allFeatures.length > 0 && (
              <div className="flex flex-col gap-2">
                {allFeatures.map((feature, index) => {
                  const prevFeature = index > 0 ? allFeatures[index - 1] : null;
                  const isFirstCompleted =
                    feature.status === "complete" &&
                    prevFeature?.status !== "complete";
                  const completedCount = allFeatures.filter(
                    (f) => f.status === "complete",
                  ).length;
                  return (
                    <div key={feature.id}>
                      {isFirstCompleted && (
                        <div className="mb-1 mt-3 flex items-center gap-3">
                          <span className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
                            Completed · {completedCount}
                          </span>
                          <div className="flex-1 border-t border-slate-700/60" />
                        </div>
                      )}
                      <FeatureCard
                        feature={feature}
                        searchQuery={searchQuery}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
