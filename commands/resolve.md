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

### 4. For each open thread — extract context then launch the resolver agent

First, run the context extractor script for each open thread:

```bash
bash scripts/review-context.sh .review/sessions/<session-file> <threadId>
```

This outputs a JSON object with:

- `anchorLine` — the line the reviewer clicked (marked `isAnchor: true` in `fileContext`)
- `fileContext` — array of lines with numbers and content, window around the anchor
- `diffHunk` — the unified diff hunk containing the anchor line
- `messages` — the reviewer's comments

Then launch a `local-review:review-resolver` agent for each open thread in parallel (up to 5 at a time), passing the full context JSON from the script.

### 5. Collect agent results

Each resolver returns:

```json
{
  "threadId": "...",
  "reply": "...",
  "codeFixApplied": true | false,
  "fixedFiles": ["path/to/file"],
  "needsClarification": false
}
```

### 6. Update the session file

For each thread that was resolved:

- Append the agent's reply message to `thread.messages` with `authorType: "agent"`, `author: "claude"`
- Set `thread.status` to `"resolved"` (or keep `"open"` if clarification was requested)
- Update `thread.lastUpdatedAt`

Write the updated session back to the same file.

### 7. Report

Print a summary:

- ✅ N threads resolved
- 💬 N threads with clarification questions (still open)
- 🔧 N code fixes applied (list files changed)

Tell the user to refresh the review UI to see Claude's responses.
