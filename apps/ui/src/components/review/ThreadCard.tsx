import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type {
  ReviewMessage,
  ReviewThread,
} from "../../services/localReviewApi";
import { threadRangeLabel } from "../../utils/diffUtils";

function StatusBadge({ status }: { status: ReviewThread["status"] }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
        ✓ approved
      </span>
    );
  }
  if (status === "resolved") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 ring-1 ring-indigo-500/30">
        ✓ resolved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/30">
      ● open
    </span>
  );
}

function AuthorAvatar({
  authorType,
  author,
}: {
  authorType: ReviewMessage["authorType"];
  author: string;
}) {
  if (authorType === "agent") {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
        AI
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-600 text-[11px] font-bold text-white">
      {author.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function ThreadCard({
  thread,
  replyDraft,
  onReplyChange,
  onReply,
  onStatusChange,
}: {
  thread: ReviewThread;
  replyDraft: string;
  onReplyChange: (value: string) => void;
  onReply: () => void;
  onStatusChange: (status: ReviewThread["status"]) => void;
}) {
  return (
    <div
      id={`thread-${thread.id}`}
      className="mt-2 rounded-lg border border-[#30363d] bg-[#161b22] shadow-lg"
    >
      <div className="flex items-center gap-2 border-b border-[#30363d] px-3 py-2">
        <StatusBadge status={thread.status} />
        <span className="text-[10px] text-slate-600">
          {threadRangeLabel(thread)}
        </span>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => onStatusChange("open")}
            className="rounded border border-[#30363d] bg-[#21262d] px-1.5 py-0.5 text-[10px] text-slate-400 hover:bg-[#30363d]"
          >
            Reopen
          </button>
          <button
            type="button"
            onClick={() => onStatusChange("resolved")}
            className="rounded border border-indigo-700/50 bg-indigo-700/20 px-1.5 py-0.5 text-[10px] text-indigo-300 hover:bg-indigo-700/40"
          >
            Resolve
          </button>
          <button
            type="button"
            onClick={() => onStatusChange("approved")}
            className="rounded border border-emerald-700/50 bg-emerald-700/20 px-1.5 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-700/40"
          >
            Approve
          </button>
        </div>
      </div>
      <div className="divide-y divide-[#21262d]">
        {thread.messages.map((msg) => (
          <div key={msg.id} className="flex gap-3 px-3 py-2.5">
            <AuthorAvatar authorType={msg.authorType} author={msg.author} />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-xs font-semibold text-slate-300">
                  {msg.author}
                </span>
                <span className="text-[10px] text-slate-600">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                {msg.authorType === "agent" && (
                  <span className="rounded bg-indigo-500/20 px-1 text-[9px] font-semibold text-indigo-300">
                    AI
                  </span>
                )}
              </div>
              {msg.authorType === "agent" ? (
                <div className="prose-review text-xs text-slate-300">
                  <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-xs text-slate-300">
                  {msg.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-[#30363d] px-3 py-2">
        <textarea
          rows={2}
          value={replyDraft}
          onChange={(e) => onReplyChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onReply();
          }}
          placeholder="Reply… (⌘↵ to send)"
          className="flex-1 resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]"
        />
        <button
          type="button"
          onClick={onReply}
          className="self-end rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-slate-300 hover:bg-[#30363d]"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
