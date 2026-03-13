import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AuthorType,
  type ReviewMessage,
  type ReviewThread,
} from "../../types/sessions";
import { relativeTime } from "../../utils/timeFormat";

const remarkPlugins = [remarkGfm];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DiffInlineThreadProps {
  thread: ReviewThread;
  onReply?: (threadId: string, text: string) => void;
  onStatusChange?: (
    threadId: string,
    status: "open" | "resolved" | "approved",
  ) => void;
  onSeverityChange?: (threadId: string, severity: string) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function Avatar({
  author,
  authorType,
}: {
  author: string;
  authorType?: ReviewMessage["authorType"];
}) {
  if (authorType === AuthorType.Agent) {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/20 text-[10px] font-bold text-indigo-400">
        AI
      </div>
    );
  }
  return (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium"
      style={{
        background: "var(--bg-overlay)",
        color: "var(--text-primary)",
      }}
    >
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
    critical: "bg-[var(--accent-rose)]/15 text-[var(--accent-rose)]",
    improvement: "bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]",
    style: "bg-[var(--bg-overlay)] text-[var(--text-secondary)]",
    question: "bg-[var(--accent-amber)]/15 text-[var(--accent-amber)]",
  };
  const styles =
    severityStyles[severity] ??
    "bg-[var(--bg-overlay)] text-[var(--text-secondary)]";

  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] ${styles}`}>
      {severity}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Pointer arrow (CSS triangle)
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

function ReplyRow({ message }: { message: ReviewMessage }) {
  return (
    <div className="flex gap-2" style={{ color: "var(--text-primary)" }}>
      <Avatar author={message.author} authorType={message.authorType} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span
            className="text-[12px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {message.author}
          </span>
          {message.authorType === AuthorType.Agent && (
            <span className="rounded bg-indigo-500/15 px-1 py-px text-[9px] font-semibold text-indigo-400">
              AI
            </span>
          )}
          <span
            className="text-[10px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {relativeTime(message.createdAt)}
          </span>
        </div>
        <div
          className="prose-review mt-0.5 text-[13px] leading-[1.6]"
          style={{ color: "var(--text-primary)" }}
        >
          <Markdown remarkPlugins={remarkPlugins}>{message.text}</Markdown>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DiffInlineThread — main export
// ---------------------------------------------------------------------------

const SEVERITY_OPTIONS = [
  "critical",
  "improvement",
  "style",
  "question",
] as const;

export function DiffInlineThread({
  thread,
  onReply,
  onStatusChange,
  onSeverityChange,
}: DiffInlineThreadProps) {
  const [draft, setDraft] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const isResolved = thread.status === "resolved";
  const firstMessage = thread.messages[0];
  const replies = thread.messages.slice(1);

  // Determine severity-based styles
  const severity = thread.severity;
  const isCritical = severity === "critical" && !isResolved;

  // Left border color
  let borderColor = "var(--accent-blue)";
  if (isResolved) borderColor = "var(--text-muted)";
  else if (isCritical) borderColor = "var(--accent-rose)";

  // Background
  const bgStyle: React.CSSProperties = isCritical
    ? { background: "linear-gradient(to right, #25221e, #222228)" }
    : {};
  let bgColor = "var(--bg-elevated)";
  if (isResolved) bgColor = "var(--bg-surface)";
  else if (isCritical) bgColor = "transparent";

  // Arrow color matches card background
  let arrowColor = "#2a2a31"; // canvas-elevated
  if (isResolved)
    arrowColor = "#222228"; // canvas-raised
  else if (isCritical) arrowColor = "#25221e"; // warm gradient start

  // Handle reply submit
  const handleReplySubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed || !onReply) return;
    onReply(thread.id, trimmed);
    setDraft("");
    setShowReplyBox(false);
  };

  return (
    <div
      style={{
        margin: "8px -8px",
        color: "var(--text-primary)",
        background: "transparent",
      }}
    >
      {/* CSS triangle pointer arrow */}
      <PointerArrow bgColor={arrowColor} />

      {/* Card */}
      <div
        data-thread-id={thread.id}
        className="overflow-hidden rounded-[6px] p-3 transition-opacity"
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: `rgba(255,255,255,0.04)`,
          borderLeftWidth: 2,
          borderLeftStyle: "solid",
          borderLeftColor: borderColor,
          backgroundColor: bgColor,
          boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
          opacity: isResolved ? 0.65 : 1,
          color: "var(--text-primary)",
          ...bgStyle,
        }}
      >
        {/* Header row */}
        <div className="flex items-center gap-2">
          {firstMessage && (
            <Avatar
              author={firstMessage.author}
              authorType={firstMessage.authorType}
            />
          )}

          {/* Author name */}
          {firstMessage && (
            <span
              className="text-[13px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {firstMessage.author}
            </span>
          )}

          {/* Severity badge */}
          <SeverityBadge severity={severity} isResolved={isResolved} />

          {/* Timestamp */}
          {firstMessage && (
            <span
              className="text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {relativeTime(firstMessage.createdAt)}
            </span>
          )}

          {/* Action buttons */}
          <div className="ml-auto flex items-center gap-1">
            {onReply && (
              <button
                type="button"
                onClick={() => setShowReplyBox((v) => !v)}
                className="rounded px-2 py-1 text-[12px] transition-colors hover:bg-[var(--bg-overlay)]"
                style={{ color: "var(--text-secondary)" }}
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
                className="rounded px-2 py-1 text-[12px] transition-colors hover:bg-[var(--bg-overlay)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {isResolved ? "Reopen" : "Resolve"}
              </button>
            )}
            {onSeverityChange && !isResolved && (
              <select
                value={severity ?? "improvement"}
                onChange={(e) => onSeverityChange(thread.id, e.target.value)}
                className="rounded bg-transparent px-1 py-0.5 text-[11px] outline-none transition-colors hover:bg-[var(--bg-overlay)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {SEVERITY_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Message body */}
        {firstMessage && (
          <div
            className="prose-review mt-1.5 text-[14px] leading-[1.6]"
            style={{ color: "var(--text-primary)" }}
          >
            <Markdown remarkPlugins={remarkPlugins}>
              {firstMessage.text}
            </Markdown>
          </div>
        )}

        {/* Reply thread — indented chain */}
        {replies.length > 0 && (
          <div
            className="ml-8 mt-2 space-y-2 border-l-2 pl-3 pt-2"
            style={{ borderColor: "var(--border-default)" }}
          >
            {replies.map((reply) => (
              <ReplyRow key={reply.id} message={reply} />
            ))}
          </div>
        )}

        {/* Reply composer */}
        {showReplyBox && (
          <div
            className="mt-2 border-t pt-2"
            style={{ borderColor: "var(--border-default)" }}
          >
            <textarea
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleReplySubmit();
                }
              }}
              placeholder="Reply... (Cmd+Enter to send)"
              className="w-full resize-none rounded-md px-2.5 py-1.5 text-[12px] outline-none ring-1 ring-[var(--border)] transition-shadow focus:ring-[var(--accent-blue)]"
              style={{
                background: "var(--bg-base)",
                color: "var(--text-primary)",
              }}
            />
            <div className="mt-1 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowReplyBox(false);
                  setDraft("");
                }}
                className="rounded px-2 py-1 text-[12px] transition-colors hover:bg-[var(--bg-overlay)]"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReplySubmit}
                disabled={!draft.trim()}
                className="rounded px-2.5 py-1 text-[12px] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background: "rgba(96, 165, 250, 0.15)",
                  color: "var(--accent-blue)",
                }}
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
