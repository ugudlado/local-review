export function ComposeBox({
  selection,
  draft,
  onDraftChange,
  onSubmit,
  onCancel,
}: {
  selection: { startLine: number; endLine: number; side: string };
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="mt-2 rounded-lg border border-[#1f6feb]/60 bg-[#161b22] shadow-lg">
      <div className="border-b border-[#30363d] px-3 py-2 text-[11px] text-slate-500">
        Commenting on {selection.side} lines {selection.startLine}
        {selection.endLine !== selection.startLine
          ? `–${selection.endLine}`
          : ""}
      </div>
      <div className="flex gap-2 p-3">
        <textarea
          rows={3}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSubmit();
            if (e.key === "Escape") onCancel();
          }}
          placeholder="Leave a comment… (⌘↵ to submit, Esc to cancel)"
          autoFocus
          className="flex-1 resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]"
        />
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={onSubmit}
            className="rounded border border-[#1f6feb]/50 bg-[#1f6feb]/20 px-3 py-1 text-xs font-medium text-blue-300 hover:bg-[#1f6feb]/30"
          >
            Comment
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-slate-400 hover:bg-[#30363d]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
