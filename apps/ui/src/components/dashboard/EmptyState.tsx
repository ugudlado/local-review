function FileIcon() {
  return (
    <svg
      className="h-14 w-14 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FileIcon />
      <h2 className="mt-5 font-serif text-xl text-slate-400">
        No features yet
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
        Start your first feature to see it tracked here. Features flow through
        design, review, and code stages.
      </p>
      <div className="mt-5 flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2">
        <span className="font-mono text-xs text-slate-500">$</span>
        <span className="font-mono text-sm text-blue-400">
          /specify &lt;description&gt;
        </span>
      </div>
    </div>
  );
}
