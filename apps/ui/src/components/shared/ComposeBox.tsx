import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import type { ThreadSeverity } from "../../types/sessions";

export interface ComposeBoxProps {
  onSubmit: (text: string, severity?: ThreadSeverity) => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** Smaller padding and font for inline use in thread replies. */
  compact?: boolean;
  /** Quoted text to display above the textarea (e.g. selected text). */
  quotedText?: string;
  /** Show severity selector pills. Defaults to true. */
  showSeverity?: boolean;
}

/**
 * Shared compose box with textarea, submit, and optional cancel button.
 *
 * Purely presentational -- the caller provides the onSubmit handler
 * that knows how to create or reply to a thread.
 */
const SEVERITIES: ThreadSeverity[] = ["blocking", "suggestion", "nitpick"];

const severityStyles: Record<
  ThreadSeverity,
  { active: string; inactive: string }
> = {
  blocking: {
    active:
      "bg-red-500/15 text-red-400 shadow-[inset_0_0_0_1px_rgba(248,81,73,0.2)]",
    inactive: "text-ink-muted hover:text-red-400 hover:bg-red-500/10",
  },
  suggestion: {
    active:
      "bg-accent-blue/15 text-accent-blue shadow-[inset_0_0_0_1px_rgba(96,165,250,0.2)]",
    inactive: "text-ink-muted hover:text-accent-blue hover:bg-accent-blue/10",
  },
  nitpick: {
    active:
      "bg-canvas-overlay text-ink-muted shadow-[inset_0_0_0_1px_theme(colors.border.DEFAULT)]",
    inactive: "text-ink-muted hover:text-ink hover:bg-canvas-elevated",
  },
};

export function ComposeBox({
  onSubmit,
  onCancel,
  placeholder = "Leave a comment...",
  autoFocus = false,
  compact = false,
  quotedText,
  showSeverity = true,
}: ComposeBoxProps) {
  const [text, setText] = useState("");
  const [severity, setSeverity] = useState<ThreadSeverity>("suggestion");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEmpty = text.trim().length === 0;

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onSubmit(trimmed, showSeverity ? severity : undefined);
    setText("");
    setSeverity("suggestion");
    // Reset textarea height after clearing
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [text, onSubmit, severity, showSeverity]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === "Escape" && onCancel) {
        e.preventDefault();
        onCancel();
      }
    },
    [handleSubmit, onCancel],
  );

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    // Reset to auto so scrollHeight recalculates on shrink
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  const rowCount = compact ? 2 : 3;

  return (
    <div className="compose-enter border-border bg-canvas-elevated overflow-hidden rounded-md border shadow-lg">
      {quotedText && (
        <div className="border-accent-blue/40 bg-canvas-overlay mx-3 mb-2 mt-3 rounded-sm border-l-2 px-3 py-2">
          <p className="text-ink-muted text-[13px] italic leading-relaxed">
            {quotedText.length > 200
              ? `${quotedText.slice(0, 200)}...`
              : quotedText}
          </p>
        </div>
      )}
      <textarea
        ref={textareaRef}
        rows={rowCount}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={`${placeholder} (⌘↵ to submit${onCancel ? ", Esc to cancel" : ""})`}
        autoFocus={autoFocus}
        className="text-ink placeholder-ink-ghost min-h-[80px] w-full resize-none bg-transparent px-3 py-2.5 text-[14px] outline-none"
      />
      <div className="border-border flex items-center justify-between gap-2 border-t px-3 py-2">
        {showSeverity ? (
          <div className="flex gap-1">
            {SEVERITIES.map((s) => {
              const isActive = severity === s;
              const style = severityStyles[s];
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(s)}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-all ${
                    isActive ? style.active : style.inactive
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-ink-muted hover:text-ink hover:bg-canvas-overlay rounded px-3 py-1.5 text-[13px] transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isEmpty}
            className={`rounded px-3 py-1.5 text-[13px] font-medium transition-colors ${
              isEmpty
                ? "bg-canvas-overlay text-ink-faint cursor-not-allowed"
                : "bg-accent-blue hover:bg-accent-blue/90 text-white"
            }`}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
