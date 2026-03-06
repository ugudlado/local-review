# Tasks: 2026-03-06-feature-flags-code-review-only

## Development Mode: Non-TDD

### Phase 1: Flag definition

- [x] T001: Add FLAGS constant to app config
  - **Why**: All other tasks depend on this — it's the single source of truth
  - **Files**: `apps/ui/src/config/app.ts`
  - **Done when**: `FLAGS.DEV_WORKFLOW` is exported as `false` with JSDoc comment; TypeScript type-check passes

### Phase 2: Route and navigation changes

- [x] T002: Simplify FeatureDefaultRedirect and routes in App.tsx (depends: T001)
  - **Why**: Must Have — skip status-based tab logic and spec/tasks routes when `DEV_WORKFLOW` is `false`
  - **Files**: `apps/ui/src/App.tsx`
  - **Done when**: Navigating to `/features/:id` redirects to `code` when flag is `false`; spec and tasks routes absent from router; with flag `true` all routes work as before

### Phase 3: UI gating (parallelizable)

- [x] T003: Hide Spec/Tasks tab pills in FeatureNavBar (depends: T002) [P]
  - **Why**: Must Have — tab row stays, pills hidden, header actions slot preserved
  - **Files**: `apps/ui/src/components/FeatureNavBar.tsx`
  - **Done when**: With flag `false`, only the header actions slot is in Row 2 (no tab pills); with flag `true`, all three tabs render as before

- [x] T004: Hide Approve button in ReviewVerdict (depends: T002) [P]
  - **Why**: Must Have — Request Changes always visible, Approve gated behind flag
  - **Files**: `apps/ui/src/components/shared/ReviewVerdict.tsx`
  - **Done when**: With flag `false`, Approve button is absent from DOM; Request Changes and resolver status indicators still render correctly

- [x] T005: Filter design statuses from Dashboard (depends: T002) [P]
  - **Why**: Must Have — design/design_review features are irrelevant without spec workflow
  - **Files**: `apps/ui/src/pages/Dashboard.tsx`
  - **Done when**: With flag `false`, features with status `design` or `design_review` are not shown in the dashboard list; with flag `true`, all statuses appear

### Phase 4: Verification

- [x] T006: Type-check and visual verify (depends: T003, T004, T005)
  - **Why**: verify-before-done rule — evidence before assertions
  - **Files**: none
  - **Done when**: `pnpm type-check` exits 0; browser shows correct behaviour in both flag states

## Status Legend

- [ ] = Pending
- [→] = In Progress
- [x] = Done
- [~] = Skipped
- [P] = Parallelizable (no dependency between [P] siblings)
