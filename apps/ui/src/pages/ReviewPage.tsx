import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type CommitInfo,
  localReviewApi,
  type DiffBundle,
  type RepoContext,
  type ReviewMessage,
  type ReviewThread,
} from '../services/localReviewApi';
import { type DiffFile, parseUnifiedDiff } from '../utils/diffParser';

function lineKey(filePath: string, line: number, side: 'old' | 'new'): string {
  return `${filePath}:${side}:${line}`;
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function hunkDomId(filePath: string, index: number): string {
  const safe = filePath.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `hunk-${safe}-${index}`;
}

type Selection = {
  filePath: string;
  side: 'old' | 'new';
  startLine: number;
  endLine: number;
};

type FileRow =
  | { kind: 'folder'; key: string; name: string; depth: number; path: string; collapsed: boolean }
  | { kind: 'file'; key: string; depth: number; file: DiffFile };

type FolderNode = {
  name: string;
  path: string;
  folders: Map<string, FolderNode>;
  files: DiffFile[];
};

function normalizeSelection(selection: Selection): Selection {
  return {
    ...selection,
    startLine: Math.min(selection.startLine, selection.endLine),
    endLine: Math.max(selection.startLine, selection.endLine),
  };
}

function isLineInSelection(
  selection: Selection | null,
  filePath: string,
  side: 'old' | 'new',
  line: number,
): boolean {
  if (!selection) return false;
  const normalized = normalizeSelection(selection);
  return (
    normalized.filePath === filePath &&
    normalized.side === side &&
    line >= normalized.startLine &&
    line <= normalized.endLine
  );
}

function threadAnchorKey(thread: ReviewThread): string {
  return lineKey(thread.filePath, thread.lineEnd || thread.line, thread.side);
}

function threadRangeLabel(thread: ReviewThread): string {
  if (thread.lineEnd && thread.lineEnd !== thread.line) {
    return `${thread.side} ${thread.line}–${thread.lineEnd}`;
  }
  return `${thread.side} line ${thread.line}`;
}

function buildFolderRows(files: DiffFile[], collapsedFolders: Set<string>): FileRow[] {
  const root: FolderNode = { name: '', path: '', folders: new Map(), files: [] };

  for (const file of files) {
    const segments = file.path.split('/');
    let cursor = root;
    for (let i = 0; i < segments.length - 1; i += 1) {
      const segment = segments[i];
      const nextPath = cursor.path ? `${cursor.path}/${segment}` : segment;
      if (!cursor.folders.has(segment)) {
        cursor.folders.set(segment, { name: segment, path: nextPath, folders: new Map(), files: [] });
      }
      cursor = cursor.folders.get(segment)!;
    }
    cursor.files.push(file);
  }

  const rows: FileRow[] = [];
  const walk = (node: FolderNode, depth: number) => {
    for (const folderName of Array.from(node.folders.keys()).sort()) {
      const folder = node.folders.get(folderName)!;
      const collapsed = collapsedFolders.has(folder.path);
      rows.push({ kind: 'folder', key: `folder:${folder.path}`, name: folder.name, depth, path: folder.path, collapsed });
      if (!collapsed) walk(folder, depth + 1);
    }
    for (const file of [...node.files].sort((a, b) => a.path.localeCompare(b.path))) {
      rows.push({ kind: 'file', key: `file:${file.path}`, depth, file });
    }
  };

  walk(root, 0);
  return rows;
}

function fileName(path: string): string {
  return path.split('/').pop() || path;
}

function FileIcon({ status }: { status: DiffFile['status'] }) {
  if (status === 'A') return <span className="text-[10px] font-bold text-emerald-400 font-mono">A</span>;
  if (status === 'D') return <span className="text-[10px] font-bold text-rose-400 font-mono">D</span>;
  if (status === 'M') return <span className="text-[10px] font-bold text-amber-400 font-mono">M</span>;
  return <span className="text-[10px] font-bold text-slate-400 font-mono">R</span>;
}

function StatusBadge({ status }: { status: ReviewThread['status'] }) {
  if (status === 'approved') {
    return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">✓ approved</span>;
  }
  if (status === 'resolved') {
    return <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 ring-1 ring-indigo-500/30">✓ resolved</span>;
  }
  return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/30">● open</span>;
}

function AuthorAvatar({ authorType, author }: { authorType: ReviewMessage['authorType']; author: string }) {
  if (authorType === 'agent') {
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

export function ReviewPage() {
  const [summaryNotes, setSummaryNotes] = useState('');
  const [status, setStatus] = useState('Ready');
  const [saving, setSaving] = useState(false);

  const [threads, setThreads] = useState<ReviewThread[]>([]);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const [repoContext, setRepoContext] = useState<RepoContext | null>(null);
  const [selectedWorktree, setSelectedWorktree] = useState('');
  const [sourceBranch, setSourceBranch] = useState('');
  const [targetBranch, setTargetBranch] = useState('main');

  const [diffBundle, setDiffBundle] = useState<DiffBundle | null>(null);
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [commits, setCommits] = useState<CommitInfo[]>([]);
  const [selectedCommit, setSelectedCommit] = useState('');
  const [selectedCommitDiff, setSelectedCommitDiff] = useState('');

  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [showFolderTree, setShowFolderTree] = useState(true);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(new Set());

  const [dragSelection, setDragSelection] = useState<Selection | null>(null);
  const [composeSelection, setComposeSelection] = useState<Selection | null>(null);
  const [composeDraft, setComposeDraft] = useState('');

  const reviewPanelRef = useRef<HTMLDivElement | null>(null);
  // Track the last viewKey for which we auto-selected a file, so we don't override
  // the user's manual file selection on every render.
  const autoSelectedViewKeyRef = useRef('');

  const activeDiff = selectedCommit ? selectedCommitDiff : diffBundle?.allDiff || '';
  const parsedFiles = useMemo(() => {
    const files = parseUnifiedDiff(activeDiff);
    // Deduplicate: when allDiff = committedDiff + uncommittedDiff, same file can appear twice.
    // Keep the last occurrence (uncommitted changes are more current).
    const seen = new Map<string, typeof files[number]>();
    for (const f of files) seen.set(f.path, f);
    return Array.from(seen.values());
  }, [activeDiff]);
  const viewKey = `${selectedWorktree}|${sourceBranch}|${targetBranch}|${selectedCommit || 'all'}`;

  const selectedFile = parsedFiles.find((f) => f.path === selectedFilePath) || parsedFiles[0] || null;

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

  const pendingCount = threads.filter((t) => t.status !== 'approved').length;

  const unresolvedThreadCountByFile = useMemo(() => {
    const map = new Map<string, number>();
    for (const thread of threads) {
      if (thread.status === 'approved') continue;
      map.set(thread.filePath, (map.get(thread.filePath) || 0) + 1);
    }
    return map;
  }, [threads]);

  const changeCountByFile = useMemo(() => {
    const map = new Map<string, number>();
    for (const file of parsedFiles) {
      let count = 0;
      for (const hunk of file.hunks)
        for (const line of hunk.lines)
          if (line.kind === 'add' || line.kind === 'del') count += 1;
      map.set(file.path, count);
    }
    return map;
  }, [parsedFiles]);

  const visibleFiles = useMemo(() => {
    if (!showPendingOnly) return parsedFiles;
    return parsedFiles.filter((f) => (unresolvedThreadCountByFile.get(f.path) || 0) > 0);
  }, [parsedFiles, showPendingOnly, unresolvedThreadCountByFile]);

  const folderRows = useMemo(
    () => buildFolderRows(visibleFiles, collapsedFolders),
    [visibleFiles, collapsedFolders],
  );

  const applyCommitSelection = async (commitHash: string) => {
    setSelectedCommit(commitHash);
    if (!commitHash) { setSelectedCommitDiff(''); setStatus('Viewing all changes'); return; }
    setStatus(`Loading ${commitHash.slice(0, 7)}...`);
    try {
      const diff = await localReviewApi.getCommitDiff({ worktreePath: selectedWorktree, commit: commitHash });
      setSelectedCommitDiff(diff);
      setStatus(`Commit ${commitHash.slice(0, 7)}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to load commit');
    }
  };

  const refreshRepoContext = async () => {
    try {
      const context = await localReviewApi.getContext();
      setRepoContext(context);
      setSelectedWorktree(context.currentWorktree);
      setSourceBranch(context.currentBranch);
      setTargetBranch(context.branches.includes('main') ? 'main' : context.defaultTargetBranch);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to load repo context');
    }
  };

  const refreshDiffBundle = async (worktreePath: string, source: string, target: string) => {
    if (!worktreePath || !source || !target) return;
    setStatus(`Diffing ${source} ← ${target}...`);
    try {
      const bundle = await localReviewApi.getDiffBundle({ worktreePath, sourceBranch: source, targetBranch: target });
      setDiffBundle(bundle);
      setSelectedCommit('');
      setSelectedCommitDiff('');
      setStatus(`${bundle.sourceBranch} → ${bundle.targetBranch}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to load diff');
    }
  };

  const refreshCommits = async (worktreePath: string, source: string, target: string) => {
    if (!worktreePath || !source || !target) return;
    try {
      const commitList = await localReviewApi.getCommits({ worktreePath, sourceBranch: source, targetBranch: target });
      setCommits(commitList);
    } catch { setCommits([]); }
  };

  const saveSession = async () => {
    setSaving(true);
    setStatus('Saving...');
    try {
      const name = `review-${sourceBranch || 'source'}-vs-${targetBranch || 'target'}-${new Date().toISOString()}`;
      const response = await localReviewApi.saveSession({
        name,
        notes: summaryNotes,
        diff: activeDiff,
        diffMode: 'all',
        committedDiff: diffBundle?.committedDiff,
        uncommittedDiff: diffBundle?.uncommittedDiff,
        allDiff: diffBundle?.allDiff,
        sourceBranch,
        targetBranch,
        worktreePath: selectedWorktree,
        threads,
      });
      setStatus(`Saved → ${response.path}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const beginSelection = (filePath: string, side: 'old' | 'new', line: number) => {
    setComposeSelection(null);
    setComposeDraft('');
    setDragSelection({ filePath, side, startLine: line, endLine: line });
  };

  const commitSelection = () => {
    if (!dragSelection) return;
    setComposeSelection(normalizeSelection(dragSelection));
    setComposeDraft('');
    setDragSelection(null);
  };

  const addThreadFromSelection = () => {
    if (!composeSelection) return;
    const draft = composeDraft.trim();
    if (!draft) return;
    const now = new Date().toISOString();
    const message: ReviewMessage = { id: uid(), authorType: 'human', author: 'reviewer', text: draft, createdAt: now };
    const thread: ReviewThread = {
      id: uid(),
      filePath: composeSelection.filePath,
      line: composeSelection.startLine,
      lineEnd: composeSelection.endLine,
      side: composeSelection.side,
      status: 'open',
      messages: [message],
      lastUpdatedAt: now,
    };
    setThreads((prev) => [...prev, thread]);
    setComposeSelection(null);
    setComposeDraft('');
  };

  const addReply = (threadId: string) => {
    const draft = (replyDrafts[threadId] || '').trim();
    if (!draft) return;
    const now = new Date().toISOString();
    const message: ReviewMessage = { id: uid(), authorType: 'human', author: 'reviewer', text: draft, createdAt: now };
    setThreads((prev) =>
      prev.map((t) => t.id === threadId ? { ...t, messages: [...t.messages, message], lastUpdatedAt: now } : t),
    );
    setReplyDrafts((prev) => ({ ...prev, [threadId]: '' }));
  };

  const updateThreadStatus = (threadId: string, nextStatus: ReviewThread['status']) => {
    const now = new Date().toISOString();
    setThreads((prev) => prev.map((t) => t.id === threadId ? { ...t, status: nextStatus, lastUpdatedAt: now } : t));
  };

  useEffect(() => { void refreshRepoContext(); }, []);

  useEffect(() => {
    if (!selectedWorktree || !sourceBranch || !targetBranch) return;
    void refreshDiffBundle(selectedWorktree, sourceBranch, targetBranch);
    void refreshCommits(selectedWorktree, sourceBranch, targetBranch);
  }, [selectedWorktree, sourceBranch, targetBranch]);

  useEffect(() => {
    const saved = localStorage.getItem(`review.summary.${viewKey}`);
    setSummaryNotes(saved || '');
  }, [viewKey]);

  useEffect(() => {
    localStorage.setItem(`review.summary.${viewKey}`, summaryNotes);
  }, [viewKey, summaryNotes]);

  useEffect(() => {
    // Only auto-select when the view (branch/commit combo) actually changes, not on every
    // manual file click. Without this guard, selectedFilePath in deps causes a render loop.
    if (autoSelectedViewKeyRef.current === viewKey) return;
    autoSelectedViewKeyRef.current = viewKey;

    if (!visibleFiles.length) { setSelectedFilePath(''); return; }

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
  }, [viewKey, selectedFilePath]);

  useEffect(() => {
    if (!dragSelection) return;
    const handleMouseUp = () => commitSelection();
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [dragSelection]);

  useEffect(() => {
    const optionHashes = ['all', ...commits.map((c) => c.hash)];
    const current = selectedCommit || 'all';
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable) return;
      if (event.key !== '[' && event.key !== ']') return;
      event.preventDefault();
      const index = optionHashes.indexOf(current);
      if (index === -1) return;
      const nextIndex = event.key === '[' ? Math.max(index - 1, 0) : Math.min(index + 1, optionHashes.length - 1);
      const next = optionHashes[nextIndex];
      void applyCommitSelection(next === 'all' ? '' : next);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commits, selectedCommit, selectedWorktree]);

  useEffect(() => {
    if (!composeSelection) return;
    const normalized = normalizeSelection(composeSelection);
    const key = `review.compose.${viewKey}|${normalized.filePath}|${normalized.side}|${normalized.startLine}|${normalized.endLine}`;
    setComposeDraft(localStorage.getItem(key) || '');
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
    const onScroll = () => localStorage.setItem(scrollKey, String(panel.scrollTop));
    panel.addEventListener('scroll', onScroll);
    return () => panel.removeEventListener('scroll', onScroll);
  }, [viewKey, selectedFilePath]);

  return (
    <div className="flex h-screen flex-col bg-[#0d1117] text-slate-200">
      {/* Top toolbar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-[#30363d] bg-[#161b22] px-4 py-2.5">
        <span className="mr-1 text-sm font-semibold text-slate-200">Local Review</span>

        <div className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1">
          <span className="text-xs text-slate-500">compare</span>
          <select
            value={sourceBranch}
            onChange={(e) => setSourceBranch(e.target.value)}
            className="bg-transparent text-xs text-slate-200 outline-none"
          >
            {(repoContext?.branches || []).map((b) => <option key={b} value={b}>{b}</option>)}
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
            {(repoContext?.branches || []).map((b) => <option key={b} value={b}>{b}</option>)}
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
              <option key={c.hash} value={c.hash}>{c.shortHash} {c.subject}</option>
            ))}
          </select>
          <span className="text-slate-600">·</span>
          <button
            type="button"
            onClick={() => {
              if (!selectedCommit) return;
              const idx = commits.findIndex((c) => c.hash === selectedCommit);
              void applyCommitSelection(idx <= 0 ? '' : commits[idx - 1].hash);
            }}
            className="text-xs text-slate-400 hover:text-slate-200"
            title="Previous commit [ key"
          >‹</button>
          <button
            type="button"
            onClick={() => {
              if (!commits.length) return;
              if (!selectedCommit) { void applyCommitSelection(commits[0].hash); return; }
              const idx = commits.findIndex((c) => c.hash === selectedCommit);
              if (idx < commits.length - 1) void applyCommitSelection(commits[idx + 1].hash);
            }}
            className="text-xs text-slate-400 hover:text-slate-200"
            title="Next commit ] key"
          >›</button>
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
            onClick={() => void refreshDiffBundle(selectedWorktree, sourceBranch, targetBranch)}
            className="rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-slate-300 hover:bg-[#30363d]"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={saveSession}
            disabled={saving || (!summaryNotes.trim() && threads.length === 0)}
            className="rounded border border-emerald-600/50 bg-emerald-700/30 px-2.5 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-700/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save Session'}
          </button>
        </div>
      </header>

      {/* Status bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-1 text-[11px] text-slate-500">
        <span>{status}</span>
        <span className="mx-2 text-slate-700">|</span>
        <span>{visibleFiles.length} files</span>
        <span className="mx-2 text-slate-700">|</span>
        <span>{threads.length} threads</span>
        <span className="mx-2 text-slate-700">|</span>
        <span>[ ] to navigate commits</span>
      </div>

      {/* Main layout */}
      <div className="flex min-h-0 flex-1">
        {/* File sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-[#30363d] bg-[#161b22]">
          <div className="flex items-center justify-between border-b border-[#30363d] px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Files</span>
            <label className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300">
              <input
                type="checkbox"
                checked={showFolderTree}
                onChange={(e) => setShowFolderTree(e.target.checked)}
                className="accent-indigo-500"
              />
              tree
            </label>
          </div>

          <div className="flex-1 overflow-auto py-1">
            {visibleFiles.length === 0 ? (
              <p className="px-4 py-6 text-xs text-slate-600">No changed files</p>
            ) : showFolderTree ? (
              folderRows.map((row) => {
                if (row.kind === 'folder') {
                  return (
                    <button
                      key={row.key}
                      type="button"
                      onClick={() => {
                        setCollapsedFolders((prev) => {
                          const next = new Set(prev);
                          if (next.has(row.path)) next.delete(row.path);
                          else next.add(row.path);
                          return next;
                        });
                      }}
                      className="flex w-full items-center gap-1.5 px-3 py-1 text-left text-xs text-slate-500 hover:bg-white/5 hover:text-slate-300"
                      style={{ paddingLeft: `${12 + row.depth * 14}px` }}
                    >
                      <span className="text-[10px]">{row.collapsed ? '▶' : '▼'}</span>
                      <span>{row.name}</span>
                    </button>
                  );
                }

                const file = row.file;
                const active = file.path === selectedFilePath;
                const unresolved = unresolvedThreadCountByFile.get(file.path) || 0;
                return (
                  <button
                    key={row.key}
                    type="button"
                    onClick={() => setSelectedFilePath(file.path)}
                    title={file.path}
                    className={`flex w-full items-center justify-between gap-1 py-1 text-left text-xs transition-colors ${active ? 'bg-[#1f6feb]/20 text-slate-200' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
                    style={{ paddingLeft: `${12 + row.depth * 14}px`, paddingRight: '12px' }}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <FileIcon status={file.status} />
                      <span className="truncate font-mono">{fileName(file.path)}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {unresolved > 0 && (
                        <span className="rounded-full bg-amber-500/20 px-1.5 text-[10px] text-amber-300">{unresolved}</span>
                      )}
                      <span className="text-[10px] text-slate-600">{changeCountByFile.get(file.path) || 0}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              visibleFiles.map((file) => {
                const active = file.path === selectedFilePath;
                const unresolved = unresolvedThreadCountByFile.get(file.path) || 0;
                return (
                  <button
                    key={file.path}
                    type="button"
                    onClick={() => setSelectedFilePath(file.path)}
                    title={file.path}
                    className={`flex w-full items-center justify-between gap-1 px-3 py-1 text-left text-xs transition-colors ${active ? 'bg-[#1f6feb]/20 text-slate-200' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <FileIcon status={file.status} />
                      <span className="truncate font-mono">{fileName(file.path)}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {unresolved > 0 && (
                        <span className="rounded-full bg-amber-500/20 px-1.5 text-[10px] text-amber-300">{unresolved}</span>
                      )}
                      <span className="text-[10px] text-slate-600">{changeCountByFile.get(file.path) || 0}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Summary notes */}
          <div className="border-t border-[#30363d] p-3">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Review notes
            </label>
            <textarea
              value={summaryNotes}
              onChange={(e) => setSummaryNotes(e.target.value)}
              rows={3}
              placeholder="High-level findings…"
              className="w-full resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]"
            />
          </div>
        </aside>

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
                <span className="font-mono text-sm text-slate-300">{selectedFile.path}</span>
                <span className="ml-auto text-xs text-slate-600">
                  {changeCountByFile.get(selectedFile.path) || 0} changes
                </span>
              </div>

              {/* Diff content + hunk minimap */}
              <div className="flex min-h-0 flex-1">
                <div ref={reviewPanelRef} className="flex-1 overflow-auto">
                  <table className="w-full border-collapse font-mono text-xs">
                    <tbody>
                      {selectedFile.hunks.map((hunk, hunkIndex) => {
                        const rows = [];

                        // Hunk header
                        rows.push(
                          <tr key={`${selectedFile.path}-hunk-${hunkIndex}`} id={hunkDomId(selectedFile.path, hunkIndex)}>
                            <td colSpan={5} className="bg-[#1f2937] py-1 pl-4 text-[11px] text-slate-500">
                              {hunk.header}
                            </td>
                          </tr>
                        );

                        for (let i = 0; i < hunk.lines.length; i++) {
                          const line = hunk.lines[i];
                          const targetSide: 'old' | 'new' | null =
                            line.newLineNumber !== null ? 'new' : line.oldLineNumber !== null ? 'old' : null;
                          const targetLine = targetSide === 'old' ? line.oldLineNumber : line.newLineNumber;
                          const key = targetSide && targetLine ? lineKey(selectedFile.path, targetLine, targetSide) : '';
                          const allLineThreads = key ? threadsByKey.get(key) || [] : [];
                          const lineThreads = showPendingOnly
                            ? allLineThreads.filter((t) => t.status !== 'approved')
                            : allLineThreads;

                          const selected = targetSide && targetLine
                            ? isLineInSelection(dragSelection || composeSelection, selectedFile.path, targetSide, targetLine)
                            : false;

                          const composeAnchorLine = composeSelection ? normalizeSelection(composeSelection).endLine : null;
                          const isComposerAnchor =
                            composeSelection &&
                            targetSide &&
                            targetLine &&
                            normalizeSelection(composeSelection).filePath === selectedFile.path &&
                            normalizeSelection(composeSelection).side === targetSide &&
                            composeAnchorLine === targetLine;

                          let rowBg = '';
                          if (line.kind === 'add') rowBg = 'bg-[#0d4a1a]';
                          else if (line.kind === 'del') rowBg = 'bg-[#4a0d0d]';
                          else if (line.kind === 'meta') rowBg = 'bg-[#1f2937]';

                          let gutterBg = '';
                          if (line.kind === 'add') gutterBg = 'bg-[#0a3d15]';
                          else if (line.kind === 'del') gutterBg = 'bg-[#3d0a0a]';
                          else if (line.kind === 'meta') gutterBg = 'bg-[#1a2332]';
                          else gutterBg = 'bg-[#0d1117]';

                          const selectionHighlight = selected ? 'ring-1 ring-inset ring-blue-500/50 bg-blue-900/20' : '';

                          rows.push(
                            <tr
                              key={`${selectedFile.path}-${hunkIndex}-${i}`}
                              className={`group border-b border-[#21262d] ${rowBg} ${selectionHighlight}`}
                              onMouseEnter={() => {
                                if (!dragSelection || !targetSide || !targetLine) return;
                                if (dragSelection.filePath !== selectedFile.path || dragSelection.side !== targetSide) return;
                                setDragSelection({ ...dragSelection, endLine: targetLine });
                              }}
                            >
                              {/* Add-comment button */}
                              <td className={`w-6 border-r border-[#21262d] text-center align-top ${gutterBg}`}>
                                {targetSide && targetLine ? (
                                  <button
                                    type="button"
                                    onMouseDown={(e) => { e.preventDefault(); beginSelection(selectedFile.path, targetSide, targetLine); }}
                                    className="h-full w-full text-slate-700 opacity-0 transition group-hover:opacity-100 hover:text-[#1f6feb]"
                                    title="Add comment (drag for range)"
                                  >
                                    +
                                  </button>
                                ) : null}
                              </td>
                              {/* Old line number */}
                              <td className={`w-12 select-none border-r border-[#21262d] px-2 py-0.5 text-right text-[10px] text-slate-600 ${gutterBg}`}>
                                {line.oldLineNumber ?? ''}
                              </td>
                              {/* New line number */}
                              <td className={`w-12 select-none border-r border-[#21262d] px-2 py-0.5 text-right text-[10px] text-slate-600 ${gutterBg}`}>
                                {line.newLineNumber ?? ''}
                              </td>
                              {/* Change marker */}
                              <td className={`w-5 select-none px-1 py-0.5 text-center ${line.kind === 'add' ? 'text-emerald-400' : line.kind === 'del' ? 'text-rose-400' : 'text-slate-700'}`}>
                                {line.kind === 'add' ? '+' : line.kind === 'del' ? '-' : ''}
                              </td>
                              {/* Line content — spans the rest */}
                              <td className="py-0.5 pl-2 pr-4 text-slate-300">
                                <pre className="whitespace-pre-wrap break-all">{line.content}</pre>

                                {/* Threads anchored to this line */}
                                {lineThreads.map((thread) => (
                                  <div key={thread.id} className="mt-2 rounded-lg border border-[#30363d] bg-[#161b22] shadow-lg">
                                    {/* Thread header */}
                                    <div className="flex items-center gap-2 border-b border-[#30363d] px-3 py-2">
                                      <StatusBadge status={thread.status} />
                                      <span className="text-[10px] text-slate-600">{threadRangeLabel(thread)}</span>
                                      <div className="ml-auto flex gap-1">
                                        <button
                                          type="button"
                                          onClick={() => updateThreadStatus(thread.id, 'open')}
                                          className="rounded border border-[#30363d] bg-[#21262d] px-1.5 py-0.5 text-[10px] text-slate-400 hover:bg-[#30363d]"
                                        >Reopen</button>
                                        <button
                                          type="button"
                                          onClick={() => updateThreadStatus(thread.id, 'resolved')}
                                          className="rounded border border-indigo-700/50 bg-indigo-700/20 px-1.5 py-0.5 text-[10px] text-indigo-300 hover:bg-indigo-700/40"
                                        >Resolve</button>
                                        <button
                                          type="button"
                                          onClick={() => updateThreadStatus(thread.id, 'approved')}
                                          className="rounded border border-emerald-700/50 bg-emerald-700/20 px-1.5 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-700/40"
                                        >Approve</button>
                                      </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="divide-y divide-[#21262d]">
                                      {thread.messages.map((msg) => (
                                        <div key={msg.id} className="flex gap-3 px-3 py-2.5">
                                          <AuthorAvatar authorType={msg.authorType} author={msg.author} />
                                          <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-baseline gap-2">
                                              <span className="text-xs font-semibold text-slate-300">{msg.author}</span>
                                              <span className="text-[10px] text-slate-600">
                                                {new Date(msg.createdAt).toLocaleString()}
                                              </span>
                                              {msg.authorType === 'agent' && (
                                                <span className="rounded bg-indigo-500/20 px-1 text-[9px] font-semibold text-indigo-300">AI</span>
                                              )}
                                            </div>
                                            <p className="whitespace-pre-wrap text-xs text-slate-300">{msg.text}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Reply box */}
                                    <div className="flex gap-2 border-t border-[#30363d] px-3 py-2">
                                      <textarea
                                        rows={2}
                                        value={replyDrafts[thread.id] || ''}
                                        onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [thread.id]: e.target.value }))}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addReply(thread.id);
                                        }}
                                        placeholder="Reply… (⌘↵ to send)"
                                        className="flex-1 resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => addReply(thread.id)}
                                        className="self-end rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-slate-300 hover:bg-[#30363d]"
                                      >Reply</button>
                                    </div>
                                  </div>
                                ))}

                                {/* Compose box */}
                                {isComposerAnchor && composeSelection ? (
                                  <div className="mt-2 rounded-lg border border-[#1f6feb]/60 bg-[#161b22] shadow-lg">
                                    <div className="border-b border-[#30363d] px-3 py-2 text-[11px] text-slate-500">
                                      Commenting on {composeSelection.side} lines {normalizeSelection(composeSelection).startLine}
                                      {normalizeSelection(composeSelection).endLine !== normalizeSelection(composeSelection).startLine
                                        ? `–${normalizeSelection(composeSelection).endLine}` : ''}
                                    </div>
                                    <div className="flex gap-2 p-3">
                                      <textarea
                                        rows={3}
                                        value={composeDraft}
                                        onChange={(e) => setComposeDraft(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addThreadFromSelection();
                                          if (e.key === 'Escape') { setComposeSelection(null); setComposeDraft(''); }
                                        }}
                                        placeholder="Leave a comment… (⌘↵ to submit, Esc to cancel)"
                                        autoFocus
                                        className="flex-1 resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]"
                                      />
                                      <div className="flex flex-col gap-1.5">
                                        <button
                                          type="button"
                                          onClick={addThreadFromSelection}
                                          className="rounded border border-[#1f6feb]/50 bg-[#1f6feb]/20 px-3 py-1 text-xs font-medium text-blue-300 hover:bg-[#1f6feb]/30"
                                        >Comment</button>
                                        <button
                                          type="button"
                                          onClick={() => { setComposeSelection(null); setComposeDraft(''); }}
                                          className="rounded border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-slate-400 hover:bg-[#30363d]"
                                        >Cancel</button>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </td>
                            </tr>
                          );
                        }

                        return rows;
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Hunk minimap */}
                <div className="flex w-12 shrink-0 flex-col border-l border-[#30363d] bg-[#161b22] py-2">
                  <div className="mb-2 text-center text-[9px] font-semibold uppercase tracking-wider text-slate-700">
                    hunks
                  </div>
                  <div className="flex flex-col items-center gap-1.5 overflow-auto">
                    {selectedFile.hunks.map((hunk, index) => {
                      let changed = 0;
                      for (const line of hunk.lines)
                        if (line.kind === 'add' || line.kind === 'del') changed += 1;
                      return (
                        <button
                          key={`${selectedFile.path}-mini-${index}`}
                          type="button"
                          onClick={() => {
                            document.getElementById(hunkDomId(selectedFile.path, index))?.scrollIntoView({ block: 'start', behavior: 'smooth' });
                          }}
                          className="flex w-9 flex-col items-center rounded border border-[#30363d] bg-[#21262d] py-1.5 text-[9px] text-slate-500 hover:bg-[#30363d] hover:text-slate-300"
                          title={hunk.header}
                        >
                          <span>{index + 1}</span>
                          <div className="mt-1 h-1 w-6 rounded-full bg-[#30363d]">
                            <div
                              className="h-full rounded-full bg-[#1f6feb]"
                              style={{ width: `${Math.min(100, (changed / 12) * 100)}%` }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
