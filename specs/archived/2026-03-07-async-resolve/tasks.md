# Tasks: 2026-03-07-async-resolve

## Development Mode: Non-TDD

### Phase 1: Implementation

- [x] T001: Create system-prompt.md with decision framework and session editing rules
  - **Why**: Must Have — resolver needs instructions for fix/explain/clarify decisions and direct JSON editing
  - **Files**: `scripts/resolve-async/system-prompt.md`
  - **Done when**: File exists with decision framework, session JSON editing instructions, and summary format

- [x] T002: Create run.sh entry script with 3-phase flow (depends: T001)
  - **Why**: Must Have — batch entry point that extracts contexts and invokes claude -p
  - **Files**: `scripts/resolve-async/run.sh`
  - **Done when**: Script supports all invocation modes, extracts contexts, invokes claude -p with correct flags, reports timing

### Phase 2: Testing

- [x] T003: Test against a real session file with open threads (depends: T002)
  - **Why**: Must Have — verify end-to-end flow resolves threads and updates session JSON correctly
  - **Files**: none (test only)
  - **Done when**: `bash scripts/resolve-async/run.sh` runs without error, open threads are resolved in the session file, timing output appears on stderr

## Status Legend

- [ ] = Pending
- [→] = In Progress
- [x] = Done
- [~] = Skipped
- [P] = Parallelizable (no dependency between [P] siblings)
