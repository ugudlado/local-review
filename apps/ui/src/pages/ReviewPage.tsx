import { useEffect, useMemo, useRef, useState } from "react";
import {
  type CommitInfo,
  localReviewApi,
  type DiffBundle,
  type RepoContext,
  type ReviewMessage,
  type ReviewThread,
} from "../services/localReviewApi";
import { parseUnifiedDiff } from "../utils/diffParser";
import {
  type Selection,
  uid,
  getLineContent,
  isThreadOutdated,
  normalizeSelection,
  threadAnchorKey,
} from "../utils/diffUtils";
import { FileSidebar, FileIcon } from "../components/sidebar/FileSidebar";
import { FullFileView } from "../components/diff/FullFileView";
import { DiffTable } from "../components/diff/DiffTable";
import { useReviewSession } from "../hooks/useReviewSession";
import { useDiffNavigation } from "../hooks/useDiffNavigation";
import { ReviewToolbar } from "../components/review/ReviewToolbar";

export function ReviewPage() {
  const [repoContext, setRepoContext] = useState<RepoContext | null>(null);
  const [selectedWorktree, setSelectedWorktree] = useState("");
  const [sourceBranch, setSourceBranch] = useState("");
  const [targetBranch, setTargetBranch] = useState("main");

  const [diffBundle, setDiffBundle] = useState<DiffBundle | null>(null);
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [commits, setCommits] = useState<CommitInfo[]>([]);
  const [selectedCommit, setSelectedCommit] = useState("");
  const [selectedCommitDiff, setSelectedCommitDiff] = useState("");

  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [showFolderTree, setShowFolderTree] = useState(true);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [leftTab, setLeftTab] = useState<"files" | "overview">("files");

  const [fullFileMode, setFullFileMode] = useState(false);
  const [fullFileContent, setFullFileContent] = useState<string | null>(null);
  const [fullFileError, setFullFileError] = useState(false);
  const [fullFileLoading, setFullFileLoading] = useState(false);

  const [dragSelection, setDragSelection] = useState<Selection | null>(null);
  const [composeSelection, setComposeSelection] = useState<Selection | null>(
    null,
  );
  const [composeDraft, setComposeDraft] = useState("");

  const [expandedGaps, setExpandedGaps] = useState<Map<string, Set<number>>>(
    new Map(),
  );
  const [expansionContent, setExpansionContent] = useState<Map<string, string>>(
    new Map(),
  );

  const reviewPanelRef = useRef<HTMLDivElement | null>(null);
  // Track the last viewKey for which we auto-selected a file, so we don't override
  // the user's manual file selection on every render.
  const autoSelectedViewKeyRef = useRef("");

  const activeDiff = selectedCommit
    ? selectedCommitDiff
    : diffBundle?.allDiff || "";
  const parsedFiles = useMemo(() => {
    const files = parseUnifiedDiff(activeDiff);
    // Deduplicate: when allDiff = committedDiff + uncommittedDiff, same file can appear twice.
    // Keep the last occurrence (uncommitted changes are more current).
    const seen = new Map<string, (typeof files)[number]>();
    for (const f of files) seen.set(f.path, f);
    return Array.from(seen.values());
  }, [activeDiff]);
  const viewKey = `${selectedWorktree}|${sourceBranch}|${targetBranch}|${selectedCommit || "all"}`;

  const {
    threads,
    setThreads,
    replyDrafts,
    setReplyDrafts,
    summaryNotes,
    setSummaryNotes,
    status,
    setStatus,
    resetSession,
    addReply,
    updateThreadStatus,
    reviewVerdict,
    setReviewVerdict,
  } = useReviewSession({
    sourceBranch,
    targetBranch,
    selectedWorktree,
    viewKey,
  });

  const selectedFile =
    parsedFiles.find((f) => f.path === selectedFilePath) ||
    parsedFiles[0] ||
    null;

  const threadsByKey = useMemo(() => {
    const map = new Map<string, ReviewThread[]>();
    for (const thread of threads) {
      const key = threadAnchorKey(thread);
      const list = map.get(key) || [];
      list.push(thread);
      map.set(key, list);
    }
    return map;
  }, [threads]);

  const outdatedThreadIds = useMemo(() => {
    const ids = new Set<string>();
    for (const thread of threads) {
      if (isThreadOutdated(thread, parsedFiles)) ids.add(thread.id);
    }
    return ids;
  }, [threads, parsedFiles]);

  const pendingCount = threads.filter((t) => t.status !== "approved").length;

  const unresolvedThreadCountByFile = useMemo(() => {
    const map = new Map<string, number>();
    for (const thread of threads) {
      if (thread.status === "approved") continue;
      if (outdatedThreadIds.has(thread.id)) continue;
      map.set(thread.filePath, (map.get(thread.filePath) || 0) + 1);
    }
    return map;
  }, [threads, outdatedThreadIds]);

  const changeCountByFile = useMemo(() => {
    const map = new Map<string, number>();
    for (const file of parsedFiles) {
      let count = 0;
      for (const hunk of file.hunks)
        for (const line of hunk.lines)
          if (line.kind === "add" || line.kind === "del") count += 1;
      map.set(file.path, count);
    }
    return map;
  }, [parsedFiles]);

  const visibleFiles = useMemo(() => {
    if (!showPendingOnly) return parsedFiles;
    return parsedFiles.filter(
      (f) => (unresolvedThreadCountByFile.get(f.path) || 0) > 0,
    );
  }, [parsedFiles, showPendingOnly, unresolvedThreadCountByFile]);

  const applyCommitSelection = async (commitHash: string) => {
    setSelectedCommit(commitHash);
    if (!commitHash) {
      setSelectedCommitDiff("");
      setStatus("Viewing all changes");
      return;
    }
    setStatus(`Loading ${commitHash.slice(0, 7)}...`);
    try {
      const diff = await localReviewApi.getCommitDiff({
        worktreePath: selectedWorktree,
        commit: commitHash,
      });
      setSelectedCommitDiff(diff);
      setStatus(`Commit ${commitHash.slice(0, 7)}`);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Failed to load commit",
      );
    }
  };

  const refreshRepoContext = async () => {
    try {
      const context = await localReviewApi.getContext();
      setRepoContext(context);
      setSelectedWorktree(context.currentWorktree);

      // Try to restore branches from the most recent session
      let restored = false;
      try {
        const sessions = await localReviewApi.listSessions();
        if (sessions.length > 0) {
          const recent = await localReviewApi.getSession(sessions[0]);
          if (
            recent.sourceBranch &&
            recent.targetBranch &&
            context.branches.includes(recent.sourceBranch) &&
            context.branches.includes(recent.targetBranch)
          ) {
            setSourceBranch(recent.sourceBranch);
            setTargetBranch(recent.targetBranch);
            restored = true;
          }
        }
      } catch {
        // Fall through to defaults
      }

      if (!restored) {
        setSourceBranch(context.currentBranch);
        setTargetBranch(
          context.branches.includes("main")
            ? "main"
            : context.defaultTargetBranch,
        );
      }
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Failed to load repo context",
      );
    }
  };

  const refreshDiffBundle = async (
    worktreePath: string,
    source: string,
    target: string,
  ) => {
    if (!worktreePath || !source || !target) return;
    setStatus(`Diffing ${source} ← ${target}...`);
    try {
      const bundle = await localReviewApi.getDiffBundle({
        worktreePath,
        sourceBranch: source,
        targetBranch: target,
      });
      setDiffBundle(bundle);
      setSelectedCommit("");
      setSelectedCommitDiff("");
      setStatus(`${bundle.sourceBranch} → ${bundle.targetBranch}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to load diff");
    }
  };

  const refreshCommits = async (
    worktreePath: string,
    source: string,
    target: string,
  ) => {
    if (!worktreePath || !source || !target) return;
    try {
      const commitList = await localReviewApi.getCommits({
        worktreePath,
        sourceBranch: source,
        targetBranch: target,
      });
      setCommits(commitList);
    } catch {
      setCommits([]);
    }
  };

  const beginSelection = (
    filePath: string,
    side: "old" | "new",
    line: number,
  ) => {
    setComposeSelection(null);
    setComposeDraft("");
    setDragSelection({ filePath, side, startLine: line, endLine: line });
  };

  const commitSelection = () => {
    if (!dragSelection) return;
    setComposeSelection(normalizeSelection(dragSelection));
    setComposeDraft("");
    setDragSelection(null);
  };

  const addThreadFromSelection = () => {
    if (!composeSelection) return;
    const draft = composeDraft.trim();
    if (!draft) return;
    const now = new Date().toISOString();
    const normalized = normalizeSelection(composeSelection);

    const message: ReviewMessage = {
      id: uid(),
      authorType: "human",
      author: "reviewer",
      text: draft,
      createdAt: now,
    };
    const thread: ReviewThread = {
      id: uid(),
      filePath: normalized.filePath,
      line: normalized.startLine,
      lineEnd: normalized.endLine,
      side: normalized.side,
      anchorContent: getLineContent(
        parsedFiles,
        normalized.filePath,
        normalized.startLine,
        normalized.side,
      ),
      status: "open",
      messages: [message],
      lastUpdatedAt: now,
    };
    setThreads((prev) => [...prev, thread]);
    setComposeSelection(null);
    setComposeDraft("");
  };

  useEffect(() => {
    void refreshRepoContext();
  }, []);

  useEffect(() => {
    if (!selectedWorktree || !sourceBranch || !targetBranch) return;
    void refreshDiffBundle(selectedWorktree, sourceBranch, targetBranch);
    void refreshCommits(selectedWorktree, sourceBranch, targetBranch);
  }, [selectedWorktree, sourceBranch, targetBranch]);

  useEffect(() => {
    // Only auto-select when the view (branch/commit combo) actually changes, not on every
    // manual file click. Without this guard, selectedFilePath in deps causes a render loop.
    if (autoSelectedViewKeyRef.current === viewKey) return;
    autoSelectedViewKeyRef.current = viewKey;

    if (!visibleFiles.length) {
      setSelectedFilePath("");
      return;
    }

    const persisted = localStorage.getItem(`review.selectedFile.${viewKey}`);
    if (persisted && visibleFiles.some((f) => f.path === persisted)) {
      setSelectedFilePath(persisted);
      return;
    }
    setSelectedFilePath(visibleFiles[0].path);
  }, [visibleFiles, viewKey]);

  useEffect(() => {
    if (!selectedFilePath) return;
    localStorage.setItem(`review.selectedFile.${viewKey}`, selectedFilePath);
    setFullFileContent(null);
    setFullFileError(false);
  }, [viewKey, selectedFilePath]);

  useEffect(() => {
    if (!fullFileMode || !selectedFilePath) return;
    setFullFileLoading(true);
    setFullFileError(false);
    setFullFileContent(null);
    localReviewApi
      .getFileContent({
        worktreePath: selectedWorktree || undefined,
        filePath: selectedFilePath,
      })
      .then((content) => setFullFileContent(content))
      .catch(() => setFullFileError(true))
      .finally(() => setFullFileLoading(false));
  }, [fullFileMode, selectedFilePath, selectedWorktree]);

  useEffect(() => {
    if (!dragSelection) return;
    const handleMouseUp = () => commitSelection();
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [dragSelection]);

  useDiffNavigation({
    commits,
    selectedCommit,
    onCommitChange: (h) => void applyCommitSelection(h),
  });

  const handleApprove = () => {
    setReviewVerdict("approved");
  };

  const handleRequestChanges = () => {
    setReviewVerdict("changes_requested");
  };

  useEffect(() => {
    if (!composeSelection) return;
    const normalized = normalizeSelection(composeSelection);
    const key = `review.compose.${viewKey}|${normalized.filePath}|${normalized.side}|${normalized.startLine}|${normalized.endLine}`;
    setComposeDraft(localStorage.getItem(key) || "");
  }, [composeSelection, viewKey]);

  useEffect(() => {
    if (!composeSelection) return;
    const normalized = normalizeSelection(composeSelection);
    const key = `review.compose.${viewKey}|${normalized.filePath}|${normalized.side}|${normalized.startLine}|${normalized.endLine}`;
    localStorage.setItem(key, composeDraft);
  }, [composeSelection, composeDraft, viewKey]);

  useEffect(() => {
    const panel = reviewPanelRef.current;
    if (!panel || !selectedFilePath) return;
    const scrollKey = `review.scroll.${viewKey}|${selectedFilePath}`;
    panel.scrollTop = Number(localStorage.getItem(scrollKey)) || 0;
    const onScroll = () =>
      localStorage.setItem(scrollKey, String(panel.scrollTop));
    panel.addEventListener("scroll", onScroll);
    return () => panel.removeEventListener("scroll", onScroll);
  }, [viewKey, selectedFilePath]);

  const expandGap = async (filePath: string, gapIndex: number) => {
    if (!expansionContent.has(filePath)) {
      try {
        const content = await localReviewApi.getFileContent({
          worktreePath: selectedWorktree || undefined,
          filePath,
        });
        setExpansionContent((prev) => new Map(prev).set(filePath, content));
      } catch {
        return;
      }
    }
    setExpandedGaps((prev) => {
      const next = new Map(prev);
      const fileSet = new Set(next.get(filePath) || []);
      fileSet.add(gapIndex);
      next.set(filePath, fileSet);
      return next;
    });
  };

  return (
    <div className="flex h-screen flex-col bg-[#0d1117] text-slate-200">
      {/* Top toolbar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-[#30363d] bg-[#161b22] px-4 py-2.5">
        <span className="mr-1 text-sm font-semibold text-slate-200">
          Local Review
        </span>

        <div className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1">
          <span className="text-xs text-slate-500">compare</span>
          <select
            value={sourceBranch}
            onChange={(e) => setSourceBranch(e.target.value)}
            className="bg-transparent text-xs text-slate-200 outline-none"
          >
            {(repoContext?.branches || []).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <span className="text-slate-600">→</span>

        <div className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1">
          <span className="text-xs text-slate-500">base</span>
          <select
            value={targetBranch}
            onChange={(e) => setTargetBranch(e.target.value)}
            className="bg-transparent text-xs text-slate-200 outline-none"
          >
            {(repoContext?.branches || []).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1">
          <span className="text-xs text-slate-500">commit</span>
          <select
            value={selectedCommit}
            onChange={(e) => void applyCommitSelection(e.target.value)}
            className="max-w-[220px] bg-transparent text-xs text-slate-200 outline-none"
          >
            <option value="">All changes</option>
            {commits.map((c) => (
              <option key={c.hash} value={c.hash}>
                {c.shortHash} {c.subject}
              </option>
            ))}
          </select>
          <span className="text-slate-600">·</span>
          <button
            type="button"
            onClick={() => {
              if (!selectedCommit) return;
              const idx = commits.findIndex((c) => c.hash === selectedCommit);
              void applyCommitSelection(idx <= 0 ? "" : commits[idx - 1].hash);
            }}
            className="text-xs text-slate-400 hover:text-slate-200"
            title="Previous commit [ key"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => {
              if (!commits.length) return;
              if (!selectedCommit) {
                void applyCommitSelection(commits[0].hash);
                return;
              }
              const idx = commits.findIndex((c) => c.hash === selectedCommit);
              if (idx < commits.length - 1)
                void applyCommitSelection(commits[idx + 1].hash);
            }}
            className="text-xs text-slate-400 hover:text-slate-200"
            title="Next commit ] key"
          >
            ›
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-300 ring-1 ring-amber-500/30">
              {pendingCount} open
            </span>
          )}
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200">
            <input
              type="checkbox"
              checked={showPendingOnly}
              onChange={(e) => setShowPendingOnly(e.target.checked)}
              className="accent-amber-500"
            />
            Pending only
          </label>
          <button
            type="button"
            onClick={() =>
              void refreshDiffBundle(
                selectedWorktree,
                sourceBranch,
                targetBranch,
              )
            }
            className="rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-slate-300 hover:bg-[#30363d]"
          >
            Refresh
          </button>
        </div>
      </header>

      <ReviewToolbar
        reviewVerdict={reviewVerdict}
        onApprove={handleApprove}
        onRequestChanges={handleRequestChanges}
      />

      {/* Status bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-1 text-[11px] text-slate-500">
        <span>{status}</span>
        <span className="mx-2 text-slate-700">|</span>
        <span>{visibleFiles.length} files</span>
        <span className="mx-2 text-slate-700">|</span>
        <span>{threads.length} threads</span>
        <span className="mx-2 text-slate-700">|</span>
        <span>[ ] to navigate commits</span>
        {reviewVerdict === "approved" && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-500/30">
            Approved
          </span>
        )}
        {reviewVerdict === "changes_requested" && (
          <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-medium text-rose-300 ring-1 ring-rose-500/30">
            Changes Requested
          </span>
        )}
      </div>

      {/* Main layout */}
      <div className="flex min-h-0 flex-1">
        {/* File sidebar */}
        <FileSidebar
          leftTab={leftTab}
          onTabChange={setLeftTab}
          pendingCount={pendingCount}
          visibleFiles={visibleFiles}
          selectedFilePath={selectedFilePath}
          onFileSelect={setSelectedFilePath}
          showFolderTree={showFolderTree}
          onFolderTreeChange={setShowFolderTree}
          collapsedFolders={collapsedFolders}
          onFolderToggle={(path) => {
            setCollapsedFolders((prev) => {
              const next = new Set(prev);
              if (next.has(path)) next.delete(path);
              else next.add(path);
              return next;
            });
          }}
          unresolvedThreadCountByFile={unresolvedThreadCountByFile}
          changeCountByFile={changeCountByFile}
          threads={threads}
          outdatedThreadIds={outdatedThreadIds}
          totalFiles={parsedFiles.length}
          onThreadClick={(thread) => {
            if (!outdatedThreadIds.has(thread.id)) {
              setLeftTab("files");
              setSelectedFilePath(thread.filePath);
              const key = threadAnchorKey(thread);
              setTimeout(() => {
                const el = document.getElementById(
                  `thread-anchor-${key.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
                );
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 100);
            }
          }}
          onReset={async () => {
            await resetSession();
          }}
          summaryNotes={summaryNotes}
          onSummaryNotesChange={setSummaryNotes}
        />

        {/* Diff panel */}
        <div className="flex min-w-0 flex-1 flex-col">
          {!selectedFile ? (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-600">
              Select a file to review
            </div>
          ) : (
            <>
              {/* File header */}
              <div className="flex shrink-0 items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-2">
                <FileIcon status={selectedFile.status} />
                <span className="font-mono text-sm text-slate-300">
                  {selectedFile.path}
                </span>
                <span className="ml-auto flex items-center gap-3">
                  <span className="text-xs text-slate-600">
                    {changeCountByFile.get(selectedFile.path) || 0} changes
                  </span>
                  <button
                    type="button"
                    onClick={() => setFullFileMode((m) => !m)}
                    className={`rounded px-2 py-0.5 text-xs transition ${fullFileMode ? "bg-[#1f6feb] text-white" : "text-slate-400 hover:text-slate-200"}`}
                    title={
                      fullFileMode ? "Switch to diff view" : "View full file"
                    }
                  >
                    {fullFileMode ? "Diff" : "Full file"}
                  </button>
                </span>
              </div>

              {/* Full file view */}
              {fullFileMode && (
                <FullFileView
                  fullFileLoading={fullFileLoading}
                  fullFileError={fullFileError}
                  fullFileContent={fullFileContent}
                  selectedFile={selectedFile}
                  threadsByKey={threadsByKey}
                  outdatedThreadIds={outdatedThreadIds}
                  showPendingOnly={showPendingOnly}
                  dragSelection={dragSelection}
                  composeSelection={composeSelection}
                  composeDraft={composeDraft}
                  replyDrafts={replyDrafts}
                  onReplyChange={(threadId, value) =>
                    setReplyDrafts((prev) => ({ ...prev, [threadId]: value }))
                  }
                  onReply={(threadId) => addReply(threadId)}
                  onStatusChange={(threadId, status) =>
                    updateThreadStatus(threadId, status)
                  }
                  onDraftChange={setComposeDraft}
                  onSubmitCompose={addThreadFromSelection}
                  onCancelCompose={() => {
                    setComposeSelection(null);
                    setComposeDraft("");
                  }}
                  onBeginSelection={beginSelection}
                  onDragUpdate={(_filePath, _side, lineNum) =>
                    setDragSelection((prev) =>
                      prev ? { ...prev, endLine: lineNum } : prev,
                    )
                  }
                  panelRef={reviewPanelRef}
                />
              )}

              {/* Diff content + hunk minimap */}
              {!fullFileMode && (
                <DiffTable
                  selectedFile={selectedFile}
                  threadsByKey={threadsByKey}
                  outdatedThreadIds={outdatedThreadIds}
                  showPendingOnly={showPendingOnly}
                  dragSelection={dragSelection}
                  composeSelection={composeSelection}
                  composeDraft={composeDraft}
                  replyDrafts={replyDrafts}
                  onReplyChange={(threadId, value) =>
                    setReplyDrafts((prev) => ({ ...prev, [threadId]: value }))
                  }
                  onReply={(threadId) => addReply(threadId)}
                  onStatusChange={(threadId, status) =>
                    updateThreadStatus(threadId, status)
                  }
                  onDraftChange={setComposeDraft}
                  onSubmitCompose={addThreadFromSelection}
                  onCancelCompose={() => {
                    setComposeSelection(null);
                    setComposeDraft("");
                  }}
                  onBeginSelection={beginSelection}
                  onDragUpdate={(_filePath, _side, lineNum) =>
                    setDragSelection((prev) =>
                      prev ? { ...prev, endLine: lineNum } : prev,
                    )
                  }
                  panelRef={reviewPanelRef}
                  expandedGaps={expandedGaps}
                  expansionContent={expansionContent}
                  onExpandGap={(filePath, gapIndex) =>
                    void expandGap(filePath, gapIndex)
                  }
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
