---
description: Load a review session and resolve all open threads in this Claude session
argument-hint: "[feature-id] — resolve review threads for a feature"
---

# Resolve Review Threads

Load a saved review session and address every open thread directly in this Claude session — no subagents. Claude will work through each thread sequentially, applying fixes and updating the session file directly.

## Steps

### 1. Find the session file

Parse `$ARGUMENTS` to determine the feature ID:

- **`[feature-id]`**: Use the provided feature ID directly
- **No arguments**: Detect feature ID from the current git branch

#### Detecting feature ID from the current branch

When no arguments are provided, extract the feature ID from the current git branch name:

```bash
# Get current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Extract feature ID (strip 'feature/' prefix if present)
FEATURE_ID="${BRANCH#feature/}"
```

If on `main` or `master`, tell the user to either switch to the feature branch or provide the feature ID explicitly: `/resolve <feature-id>`

#### Resolve workspace name and find session

```bash
# Resolve workspace name from git
WORKSPACE_NAME=$(basename "$(git rev-parse --git-common-dir)" | sed 's/\.git$//')

# Find session file
SESSION_FILE=~/.config/local-review/workspace/${WORKSPACE_NAME}/sessions/${FEATURE_ID}-code.json
```

If the session file doesn't exist, tell the user to save one from the review UI first.

### 2. Read the session

```bash
cat ~/.config/local-review/workspace/${WORKSPACE_NAME}/sessions/${FEATURE_ID}-code.json
```

Extract: `featureId`, `threads[]`.

### 3. Filter open threads

Work only on threads where `status === "open"`. If none, report "No open threads" and stop.

### 4. Resolve each thread (sequentially, in this session)

For each open thread, extract context then analyze and act:

```bash
bash scripts/review-context.sh ~/.config/local-review/workspace/${WORKSPACE_NAME}/sessions/${FEATURE_ID}-code.json <threadId>
```

This returns JSON with `fileContext`, `diffHunk`, and `messages`. Use it to:

- Understand what the reviewer commented on (anchor line + diff hunk)
- Apply the fix with the Edit tool if it's unambiguous
- Or reply with explanation / clarifying question

#### Decision rules

- **Apply fix** — issue is clear, fix is unambiguous, self-contained
- **Reply with explanation** — reviewer asking "why", or code is correct as-is
- **Ask clarification** — intent unclear, multiple valid approaches, missing context

### 5. Update session file directly

After handling each thread, read the session JSON, update the thread in-place, and write it back. Use the Read and Edit tools to modify the JSON file directly.

Each thread in the `threads` array has this structure:

```json
{
  "id": "thread-uuid",
  "anchor": { "type": "diff-line", "path": "src/foo.ts", "line": 42, "side": "new", ... },
  "status": "open",
  "severity": "improvement",
  "messages": [
    { "id": "msg-uuid", "authorType": "human", "author": "Reviewer", "text": "...", "createdAt": "..." }
  ],
  "lastUpdatedAt": "2026-03-21T00:00:00.000Z"
}
```

To resolve a thread, update these fields:

- Set `"status"` to `"resolved"` (or keep `"open"` if asking a clarifying question)
- Append a new message to `"messages"`:
  ```json
  {
    "id": "<new-uuid>",
    "authorType": "agent",
    "author": "claude",
    "text": "<your reply>",
    "createdAt": "<ISO timestamp>"
  }
  ```
- Update `"lastUpdatedAt"` to the current timestamp

The VS Code extension and browser UI will pick up changes automatically via file watchers.

### 6. Report

Print a summary:

- N threads resolved
- N threads with clarification questions (still open)
- Files changed (if any fixes applied)
