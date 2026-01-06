---
description: Load a review session and let Claude resolve all open threads
argument-hint: "[session-file] — filename in .review/sessions/ (omit to use latest)"
---

# Resolve Review Threads

Load a saved review session and address every open thread. Claude will:

- Reply to each thread with a clear answer
- Apply code fixes directly when the fix is unambiguous and complete context is available
- Ask a clarifying question inside the thread when context is missing or the fix is ambiguous

## Steps

### 1. Find the session file

If `$ARGUMENTS` is provided, use `.review/sessions/$ARGUMENTS`.

Otherwise, find the most recent session:

```bash
ls -t .review/sessions/*.json 2>/dev/null | head -1
```

If no sessions exist, tell the user to save one from the review UI first.

### 2. Read the session

```bash
cat .review/sessions/<session-file>
```

Parse the JSON. Extract:

- `threads[]` — all thread objects
- `sourceBranch`, `targetBranch`, `allDiff` — context

### 3. Filter open threads

Work only on threads where `status === "open"`.

For each open thread, note:

- `filePath` — which file
- `line` / `lineEnd` — line range (on `side`: "old" or "new")
- `messages[]` — conversation so far (show as context)

### 4. For each open thread — launch resolvers and write incrementally

Launch a `local-review:review-resolver` agent for each open thread in parallel (up to 5 at a time). Pass:

- The thread object as JSON
- The relevant file content (read the actual file from disk)
- The diff hunk around the thread's lines (extracted from `allDiff`)

**As each resolver completes** (do not wait for all to finish first):

1. Read the current session file from disk (re-read to get the latest state)
2. Find the thread by `threadId` in the session
3. Append the resolver's reply to `thread.messages` with `authorType: "agent"`, `author: "claude"`
4. Set `thread.status` to `"resolved"` (or keep `"open"` if `needsClarification` is true)
5. Update `thread.lastUpdatedAt`
6. Write the updated session back to the file immediately

This means the session file is updated after each thread completes, giving the UI live progress rather than a single update at the end.

After **all** resolvers have completed, do one final write to set `aiReviewStatus` to `"done"` in the session file.

### 5. Report

Print a summary:

- ✅ N threads resolved
- 💬 N threads with clarification questions (still open)
- 🔧 N code fixes applied (list files changed)
