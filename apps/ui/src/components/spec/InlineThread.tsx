import { useState } from "react";
import type { ReviewThread } from "../../types/sessions";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface InlineThreadProps {
  thread: ReviewThread;
  onReply?: (threadId: string, text: string) => void;
  onStatusChange?: (
    threadId: string,
    status: "open" | "resolved" | "approved",
  ) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Format a date string as relative time (e.g. "2h ago", "just now").
 */
function relativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;

  if (diffMs < 0) return "just now";
  if (diffMs < 60_000) return "just now";
  if (diffMs < 3_600_000) return `${Math.floor(diffMs / 60_000)}m ago`;
  if (diffMs < 86_400_000) return `${Math.floor(diffMs / 3_600_000)}h ago`;
  if (diffMs < 7 * 86_400_000) return `${Math.floor(diffMs / 86_400_000)}d ago`;
  return new Date(isoString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/**
 * Returns initials (up to 2 chars) from an author name.
 */
function initials(author: string): string {
  const parts = author.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return author.slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

function Avatar({ author }: { author: string }) {
  return (
    <div className="bg-canvas-overlay text-ink flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium">
      {initials(author)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Severity badge
// ---------------------------------------------------------------------------

function SeverityBadge({
  severity,
  isResolved,
}: {
  severity?: ReviewThread["severity"];
  isResolved: boolean;
}) {
  if (!severity || isResolved) return null;

  const severityStyles: Record<string, string> = {
    blocking: "bg-accent-amber/15 text-accent-amber",
    suggestion: "bg-accent-blue/15 text-accent-blue",
  };
  const styles = severityStyles[severity] ?? "bg-canvas-overlay text-ink-muted";

  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] ${styles}`}>
      {severity}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Up-arrow pointer (CSS triangle)
// ---------------------------------------------------------------------------

function PointerArrow({ bgColor }: { bgColor: string }) {
  return (
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderBottom: `6px solid ${bgColor}`,
        marginLeft: 12,
        marginBottom: -1,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Reply row (compact)
// ---------------------------------------------------------------------------

function ReplyRow({ author, text }: { author: string; text: string }) {
  return (
    <div className="flex gap-2">
      <Avatar author={author} />
      <div className="min-w-0 flex-1">
        <span className="text-ink mr-1.5 text-[12px] font-medium">
          {author}
        </span>
        <span className="text-ink text-[13px] leading-[1.6]">{text}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InlineThread — main export
// ---------------------------------------------------------------------------

export function InlineThread({
  thread,
  onReply,
  onStatusChange,
}: InlineThreadProps) {
  const [draft, setDraft] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const isResolved = thread.status === "resolved";
  const firstMessage = thread.messages[0];
  const replies = thread.messages.slice(1);

  // Determine severity-based styles
  const severity = thread.severity;
  const isBlocking = severity === "blocking" && !isResolved;

  // Left border class
  let borderColor = "border-accent-blue";
  if (isResolved) borderColor = "border-ink-ghost";
  else if (isBlocking) borderColor = "border-accent-amber";
  const borderClass = `border-l-2 ${borderColor}`;

  // Background gradient / class
  const bgStyle: React.CSSProperties = isBlocking
    ? { background: "linear-gradient(to right, #25221e, #222228)" }
    : {};
  let bgClass = "bg-canvas-elevated";
  if (isResolved) bgClass = "bg-canvas-raised";
  else if (isBlocking) bgClass = "";

  // Arrow color matches card background
  let arrowColor = "#2a2a31"; // canvas-elevated
  if (isResolved)
    arrowColor = "#222228"; // canvas-raised
  else if (isBlocking) arrowColor = "#25221e"; // warm gradient start

  // Handle reply submit
  const handleReplySubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed || !onReply) return;
    onReply(thread.id, trimmed);
    setDraft("");
    setShowReplyBox(false);
  };

  return (
    <div style={{ margin: "8px -8px" }}>
      {/* CSS triangle pointer arrow */}
      <PointerArrow bgColor={arrowColor} />

      {/* Card */}
      <div
        data-thread-id={thread.id}
        className={`overflow-hidden rounded-[6px] p-3 transition-opacity ${borderClass} ${bgClass}`}
        style={{
          boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.04)",
          opacity: isResolved ? 0.65 : 1,
          ...bgStyle,
        }}
      >
        {/* Header row */}
        <div className="flex items-center gap-2">
          {firstMessage && <Avatar author={firstMessage.author} />}

          {/* Author name */}
          {firstMessage && (
            <span className="text-ink text-[13px] font-medium">
              {firstMessage.author}
            </span>
          )}

          {/* Severity badge */}
          <SeverityBadge severity={severity} isResolved={isResolved} />

          {/* Timestamp */}
          {firstMessage && (
            <span className="text-ink-muted text-[11px]">
              {relativeTime(firstMessage.createdAt)}
            </span>
          )}

          {/* Action buttons */}
          <div className="ml-auto flex items-center gap-1">
            {onReply && (
              <button
                type="button"
                onClick={() => setShowReplyBox((v) => !v)}
                className="text-ink-muted hover:bg-canvas-overlay hover:text-ink rounded px-2 py-1 text-[12px] transition-colors"
              >
                Reply
              </button>
            )}
            {onStatusChange && (
              <button
                type="button"
                onClick={() =>
                  onStatusChange(thread.id, isResolved ? "open" : "resolved")
                }
                className="text-ink-muted hover:bg-canvas-overlay hover:text-ink rounded px-2 py-1 text-[12px] transition-colors"
              >
                {isResolved ? "Reopen" : "Resolve"}
              </button>
            )}
          </div>
        </div>

        {/* Message body */}
        {firstMessage && (
          <p className="text-ink mt-1.5 text-[14px] leading-[1.6]">
            {firstMessage.text}
          </p>
        )}

        {/* Reply thread */}
        {replies.length > 0 && (
          <div className="border-border mt-2 space-y-2 border-t pt-2">
            {replies.map((reply) => (
              <ReplyRow
                key={reply.id}
                author={reply.author}
                text={reply.text}
              />
            ))}
          </div>
        )}

        {/* Reply composer */}
        {showReplyBox && (
          <div className="border-border mt-2 border-t pt-2">
            <textarea
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleReplySubmit();
                }
              }}
              placeholder="Reply... (⌘↵ to send)"
              className="bg-canvas text-ink placeholder-ink-muted ring-border focus:ring-accent-blue w-full resize-none rounded-md px-2.5 py-1.5 text-[12px] outline-none ring-1 transition-shadow"
            />
            <div className="mt-1 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowReplyBox(false);
                  setDraft("");
                }}
                className="text-ink-muted hover:bg-canvas-overlay hover:text-ink rounded px-2 py-1 text-[12px] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReplySubmit}
                disabled={!draft.trim()}
                className="bg-accent-blue/15 text-accent-blue hover:bg-accent-blue/25 rounded px-2.5 py-1 text-[12px] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
