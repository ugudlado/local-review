# 2026-03-07-async-resolve: Async Batch Thread Resolution

## Overview

Add `scripts/resolve-async/` — a self-contained folder for headless batch resolution of all open review threads via `claude -p`. Pre-extracts all thread contexts upfront, then sends them in a single invocation, avoiding the ~2.5 min/thread sequential overhead of the interactive `/resolve` command.

The interactive `commands/resolve.md` workflow is kept unchanged. These are two separate workflows for different use cases:

- `/resolve` — interactive, in-session, one thread at a time
- `bash scripts/resolve-async/run.sh` — headless, batch, all threads at once

## Development Mode

**Mode**: Non-TDD (shell scripts and prompt file — no unit-testable logic)

## Requirements

### Must Have

- [x] `scripts/resolve-async/run.sh` — entry point that extracts all open thread contexts and invokes `claude -p`
- [x] `scripts/resolve-async/system-prompt.md` — decision framework and session JSON editing rules for the headless resolver
- [x] Manually tested against a real session file with open threads

### Nice to Have

- [ ] Test with both code and spec session types

## Architecture

### Flow

```
bash scripts/resolve-async/run.sh [args]
  |
  +- Phase 1: Find session file (direct path / --code / --spec / most recent)
  |
  +- Phase 2: Extract all open thread contexts
  |   - Loop over thread IDs from session JSON
  |   - Invoke scripts/review-context.sh per thread
  |   - Collect into single JSON array
  |
  +- Phase 3: Invoke claude -p
  |   - --system-prompt scripts/resolve-async/system-prompt.md
  |   - --allowed-tools "Read Edit"
  |   - --model sonnet
  |   - Prompt = JSON payload {sessionFile, sessionType, featureId, threads[]}
  |
  +- Phase 4: Report summary
      - Query updated session file for resolved/open counts
      - Log timing throughout (stderr)
```

### Session File Editing (headless)

The headless resolver edits the session JSON directly using the `Edit` tool — no API calls to the running dev server. It updates `threads[].status` and appends to `threads[].messages`.

This differs from `commands/resolve.md` which uses `curl PATCH` to the running dev server.

### Files

- `scripts/resolve-async/run.sh` — entry script (already implemented)
- `scripts/resolve-async/system-prompt.md` — resolver instructions (already implemented)
- `scripts/review-context.sh` — shared context extractor (pre-existing, unchanged)
- `commands/resolve.md` — interactive command (pre-existing, unchanged)

## Alternatives Considered

### Add a `/resolve-async` slash command

- **Pros**: Discoverable via Claude Code command palette
- **Cons**: Slash commands run inside a Claude session — defeats the purpose of headless batch processing
- **Why rejected**: Async batch resolution is a CLI tool, not an interactive command

### Replace `/resolve` with async approach

- **Pros**: Single unified workflow
- **Cons**: Loses interactive capability; async approach can't handle clarifying questions in-session
- **Why rejected**: Different use cases — interactive for nuanced threads, async for clear batch resolution

## Acceptance Criteria

- [ ] `bash scripts/resolve-async/run.sh` runs against a real session file without error
- [ ] Open threads are resolved and session JSON is updated correctly
- [ ] Timing output appears on stderr
- [ ] Script exits non-zero on failure, zero on success
