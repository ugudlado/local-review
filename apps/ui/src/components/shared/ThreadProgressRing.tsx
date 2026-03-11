import { useMemo } from "react";

export interface ThreadProgressRingProps {
  resolved: number;
  open: number;
  size?: number; // default: 28
  thickness?: number; // default: 3
  showCenter?: boolean; // default: false
  className?: string;
}

// Gap between segments in degrees
const SEGMENT_GAP_DEG = 2;

export function ThreadProgressRing({
  resolved,
  open,
  size = 28,
  thickness = 3,
  showCenter = false,
  className = "",
}: ThreadProgressRingProps) {
  const total = Math.max(0, resolved) + Math.max(0, open);
  const isEmpty = total === 0;
  const isComplete = !isEmpty && open === 0;

  const center = size / 2;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  // Gap in pixels on the circumference
  const gapPx = (SEGMENT_GAP_DEG / 360) * circumference;
  const hasBothSegments = resolved > 0 && open > 0;
  const totalGap = hasBothSegments ? gapPx * 2 : 0;

  const { resolvedDash, resolvedOffset, openDash, openOffset } = useMemo(() => {
    if (isEmpty) {
      return {
        resolvedDash: 0,
        resolvedOffset: 0,
        openDash: 0,
        openOffset: 0,
      };
    }

    const resolvedFraction = Math.max(0, resolved) / total;
    const openFraction = Math.max(0, open) / total;

    const resolvedLen =
      resolvedFraction * circumference - (hasBothSegments ? gapPx : 0);
    const openLen =
      openFraction * circumference - (hasBothSegments ? gapPx : 0);

    return {
      resolvedDash: Math.max(0, resolvedLen),
      // Start at top (offset = 0 with -90deg rotation)
      resolvedOffset: 0,
      openDash: Math.max(0, openLen),
      // Open segment starts after resolved segment + gap
      openOffset: -(
        resolvedLen +
        totalGap / 2 +
        (hasBothSegments ? gapPx / 2 : 0)
      ),
    };
  }, [
    resolved,
    open,
    total,
    circumference,
    gapPx,
    hasBothSegments,
    totalGap,
    isEmpty,
  ]);

  const percentage = isEmpty
    ? 0
    : Math.round((Math.max(0, resolved) / total) * 100);

  const centerColor = isComplete
    ? "var(--accent-emerald)"
    : "var(--accent-amber)";

  const labelText = isEmpty
    ? "no threads"
    : isComplete
      ? "complete"
      : "resolved";
  const centerText = isEmpty ? "—" : `${percentage}%`;

  // Font sizes scale with ring size
  const pctFontSize = Math.max(6, Math.round(size * 0.28));
  const labelFontSize = Math.max(4, Math.round(size * 0.18));

  return (
    <div
      className={`group/ring relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--ink-ghost)"
          strokeWidth={thickness}
          opacity={0.35}
        />

        {!isEmpty && (
          <>
            {/* Resolved segment (emerald) */}
            {resolved > 0 && (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--accent-emerald)"
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={`${resolvedDash} ${circumference}`}
                strokeDashoffset={resolvedOffset}
                style={{
                  transition:
                    "stroke-dasharray 0.45s cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            )}

            {/* Open segment (amber) */}
            {open > 0 && (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--accent-amber)"
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={`${openDash} ${circumference}`}
                strokeDashoffset={openOffset}
                style={{
                  transition:
                    "stroke-dasharray 0.45s cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            )}
          </>
        )}

        {/* Glow pulse ring at 100% complete */}
        {isComplete && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--accent-emerald)"
            strokeWidth={thickness * 2}
            opacity={0}
            style={{ animation: "thread-ring-glow 2s ease-in-out infinite" }}
          />
        )}
      </svg>

      {/* Center text (when showCenter) */}
      {showCenter && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ gap: 1 }}
        >
          <span
            style={{
              fontSize: pctFontSize,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: isEmpty ? "var(--ink-ghost)" : centerColor,
              lineHeight: 1,
            }}
          >
            {centerText}
          </span>
          <span
            style={{
              fontSize: labelFontSize,
              color: "var(--ink-faint)",
              lineHeight: 1,
              textTransform: "lowercase",
            }}
          >
            {labelText}
          </span>
        </div>
      )}

      {/* Hover tooltip */}
      <div
        className="pointer-events-none absolute z-50 opacity-0 transition-opacity group-hover/ring:opacity-100"
        style={{
          top: "calc(100% + 6px)",
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: 130,
          background: "var(--canvas-elevated)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          borderRadius: 6,
          padding: "6px 8px",
          fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div
          style={{
            color: "var(--ink-faint)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          Thread Progress
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent-emerald)",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <span style={{ color: "var(--ink-faint)" }}>Resolved</span>
            </span>
            <span
              style={{ color: "var(--ink-base, #e6e6e6)", fontWeight: 600 }}
            >
              {Math.max(0, resolved)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent-amber)",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <span style={{ color: "var(--ink-faint)" }}>Open</span>
            </span>
            <span
              style={{ color: "var(--ink-base, #e6e6e6)", fontWeight: 600 }}
            >
              {Math.max(0, open)}
            </span>
          </div>
        </div>
        {total > 0 && (
          <>
            <div
              style={{
                height: 1,
                background: "var(--border)",
                margin: "5px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span style={{ color: "var(--ink-faint)" }}>Total</span>
              <span
                style={{ color: "var(--ink-base, #e6e6e6)", fontWeight: 600 }}
              >
                {total}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
