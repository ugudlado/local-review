---
description: Load a review session (spec or code) and let Claude resolve all open threads
argument-hint: "[--spec|--code] [feature-id] or [session-file] — resolve spec or code review threads"
---

# Resolve Review Threads

Load a saved review session and address every open thread. Claude will:

- Reply to each thread with a clear answer
- Apply fixes directly when the fix is unambiguous and complete context is available
- Ask a clarifying question inside the thread when context is missing or the fix is ambiguous

This command is **stage-aware** — it detects whether the session is a spec review or code review and extracts the appropriate context for each.

## Steps

### 1. Find the session file

Parse `$ARGUMENTS` to determine the session type and file:

- **`--spec [feature-id]`**: Find `.review/sessions/*-spec.json` matching the feature ID
- **`--code [feature-id]`**: Find `.review/sessions/*-code.json` matching the feature ID
- **`[session-file]`** (no flag): Use `.review/sessions/$ARGUMENTS` directly
- **No arguments**: Fall back to the most recent session (any type)

```bash
# With --spec flag:
ls -t .review/sessions/*-spec.json 2>/dev/null | head -1

# With --code flag:
ls -t .review/sessions/*-code.json 2>/dev/null | head -1

# No arguments — most recent session of any type:
ls -t .review/sessions/*.json 2>/dev/null | head -1
```

If no sessions exist, tell the user to save one from the review UI first.

### 2. Read the session and detect type

```bash
cat .review/sessions/<session-file>
```

Parse the JSON. Detect the session type:

- **Spec session**: The JSON has a `status` field with values like `"draft"`, `"review"`, `"approved"`, or `"implementing"`
- **Code session**: The JSON has `sourceBranch` and `targetBranch` fields

Extract the common fields:

- `threads[]` — all thread objects

For **code sessions**, also extract:

- `sourceBranch`, `targetBranch`, `allDiff` — diff context

For **spec sessions**, also extract:

- `specFile` — path to the spec markdown file
- `featureId` — the feature identifier

### 3. Filter open threads

Work only on threads where `status === "open"`.

### 4. For each open thread — extract context then launch the resolver agent

#### Code session threads

Run the context extractor script for each open thread:

```bash
bash scripts/review-context.sh .review/sessions/<session-file> <threadId>
```

This outputs a JSON object with:

- `anchorLine` — the line the reviewer clicked (marked `isAnchor: true` in `fileContext`)
- `fileContext` — array of lines with numbers and content, window around the anchor
- `diffHunk` — the unified diff hunk containing the anchor line
- `messages` — the reviewer's comments

Then launch a `local-review:review-resolver` agent for each open thread in parallel (up to 5 at a time), passing the full context JSON from the script.

#### Spec session threads

For spec threads, extract context directly (no script needed):

1. Read the spec file referenced by the session (e.g., `specs/active/*/spec.md`)
2. For each thread, locate the anchored section using `thread.anchor.sectionPath` and `thread.anchor.blockIndex`:
   - `sectionPath` is an array of heading titles forming a path (e.g., `["Architecture", "Data Model"]`)
   - `blockIndex` is the paragraph/block index within that section
3. Extract a context window: the target block plus 2-3 surrounding blocks in the same section
4. Build a context object:

```json
{
  "threadId": "...",
  "specFile": "specs/active/.../spec.md",
  "sectionPath": ["Architecture", "Data Model"],
  "blockIndex": 3,
  "sectionContent": "<full text of the matched section>",
  "anchorBlock": "<the specific paragraph/block the thread is anchored to>",
  "messages": [...]
}
```

Then launch a `local-review:review-resolver` agent for each open thread in parallel (up to 5 at a time), passing the context object with an additional `mode: "spec"` field so the agent knows to treat this as a spec review (suggest spec text changes rather than code fixes).

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

For spec sessions, `codeFixApplied` refers to whether the spec file was edited, and `fixedFiles` contains the spec file path if it was.

### 6. Update the session via API

For each thread that was resolved, call the appropriate API endpoint based on session type:

- **Code session**: `PATCH /local-api/features/:id/code-session/threads/:threadId`
- **Spec session**: `PATCH /local-api/features/:id/spec-session/threads/:threadId`

Send the update payload:

```json
{
  "status": "resolved",
  "messages": [
    {
      "authorType": "agent",
      "author": "claude",
      "content": "<agent reply>",
      "createdAt": "<ISO timestamp>"
    }
  ]
}
```

If clarification was requested, keep `status` as `"open"` instead of `"resolved"`.

### 7. Report

Print a summary:

- N threads resolved
- N threads with clarification questions (still open)
- N fixes applied (list files changed)

Tell the user to refresh the review UI to see Claude's responses.
