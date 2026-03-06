# Tasks: 2026-03-06-dashboard-code-link-branch-support

## Development Mode: Non-TDD

### Phase 1: Code Link Visibility

- [x] T001: Hide Code link on FeatureCard for non-code statuses [P]
  - **Why**: R1, R2 — Code link irrelevant for new/design/design_review/complete features
  - **Files**: `apps/ui/src/components/dashboard/FeatureCard.tsx`
  - **Done when**: Code link only renders for `code` and `code_review` status cards; hidden for all others

### Phase 2: Type System + Backend Branch Discovery

- [x] T002: Add sourceType field to FeatureInfo types (depends: none) [P]
  - **Why**: R9 — Need to distinguish worktree vs branch features in the data model
  - **Files**: `apps/ui/vite.config.ts` (server FeatureInfo type), `apps/ui/src/services/featureApi.ts` (client FeatureInfo type)
  - **Done when**: Both server and client FeatureInfo types include `sourceType: "worktree" | "branch"`; existing worktree features set `sourceType: "worktree"`; archived features set `sourceType: "worktree"`

- [x] T003: Discover unmerged branches in GET /features (depends: T002)
  - **Why**: R4, R5, R6, R7, R8, R12 — Surface branch-only features in dashboard
  - **Files**: `apps/ui/vite.config.ts`
  - **Done when**: `GET /features` returns branch-based FeatureInfo entries for unmerged branches; branches already represented by worktrees are skipped; main/master/HEAD excluded; feature ID derived from branch slug; status derived from code session if present, else `new`

### Phase 3: Frontend Source Type Badge

- [x] T004: Display source type badge on FeatureCard (depends: T002, T003)
  - **Why**: R10 — Users need to distinguish worktree vs branch features at a glance
  - **Files**: `apps/ui/src/components/dashboard/FeatureCard.tsx`
  - **Done when**: Each card shows a small pill/icon next to branch name indicating worktree or branch source type; matches existing design system (slate tones, small text)

### Phase 4: Bug Fix

- [x] T006: Fix approve verdict not saving when there are no threads (depends: T005)
  - **Why**: Bug — auto-save guard `threads.length === 0` blocks save when verdict changes with no threads
  - **Files**: `apps/ui/src/hooks/useReviewSession.ts`
  - **Done when**: Clicking Approve with zero threads persists `reviewVerdict: "approved"` to the session file

- [x] T007: Fix approve verdict not saving when spec session is null (depends: T006)
  - **Why**: Bug — `setVerdict` in `useFeatureSession` guards on `prev !== null`, so if no session exists yet, clicking Approve silently does nothing
  - **Files**: `apps/ui/src/hooks/useFeatureSession.ts`
  - **Done when**: Clicking Approve on a feature with no existing spec session creates a new session with `verdict: "approved"` and persists it

- [x] T008: Auto-reset "Changes Requested" verdict when all threads are resolved (depends: T007)
  - **Why**: Bug — after agent resolves all threads, verdict stays "changes_requested" indefinitely
  - **Files**: `apps/ui/src/hooks/useReviewSession.ts`
  - **Done when**: When last open thread is resolved and verdict is "changes_requested", verdict resets to null

### Phase 5: Branch/Worktree Switching + Nav Visibility

- [x] T009: Fix source branch not updating when switching worktree/branch in code review (depends: T008) [P]
  - **Why**: Bug — switching worktree or branch in the review UI keeps stale source branch in the diff view
  - **Files**: `apps/ui/src/pages/CodeReviewPage.tsx`
  - **Done when**: Source branch is now a clickable dropdown (same as target) — selecting a different branch regenerates the diff

- [x] T010: Hide Spec and Tasks tabs when feature has no spec or tasks (depends: T008) [P]
  - **Why**: Branch-only features have `hasSpec: false` / `hasTasks: false` — showing empty/broken tabs is confusing
  - **Files**: `apps/ui/src/components/FeatureNavBar.tsx`
  - **Done when**: Spec tab hidden when `hasSpec: false`; Tasks tab hidden when `hasTasks: false`; Code tab always visible

### Phase 7: Verification

- [x] T005: Type check and build verification (depends: T001, T004)
  - **Why**: AC9, AC10 — Ensure no type errors or build failures
  - **Files**: None (verification only)
  - **Done when**: `pnpm type-check` and `pnpm build` both pass cleanly

## Status Legend

- [ ] = Pending
- [→] = In Progress
- [x] = Done
- [~] = Skipped
- [P] = Parallelizable (no dependency between [P] siblings)
