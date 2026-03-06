# 2026-03-06-dashboard-code-link-branch-support: Dashboard Code Link Visibility + Branch Support

## Overview

Two improvements to the dashboard:

1. **Code link visibility** — Hide the Code quick-action link on dashboard FeatureCards for features where code review isn't relevant (statuses: `new`, `design`, `design_review`, `complete`). Only show for `code` and `code_review`.

2. **Branch-based features** — Surface unmerged branches (without worktrees) as features in the dashboard. Show a source-type tag (worktree vs branch) on each card. Branch features use `git diff main...branch` for diffs.

## Development Mode

**Mode**: Non-TDD

## Requirements

### Must Have

- [ ] R1: Hide Code link on dashboard FeatureCard for statuses `new`, `design`, `design_review`, `complete`
- [ ] R2: Show Code link on dashboard FeatureCard only for statuses `code`, `code_review`
- [ ] R3: Feature detail view keeps existing Code link behavior (disabled when not at code stage)
- [ ] R4: `GET /features` discovers unmerged branches via `git branch --no-merged main`
- [ ] R5: Branch feature ID derived by stripping prefix before last `/` (e.g. `feature/foo` -> `foo`)
- [ ] R6: Branch features deduped against worktree features (skip if slug matches existing worktree)
- [ ] R7: Branch features have `hasSpec: false`, `hasTasks: false`
- [ ] R8: Branch feature status derived from code session file if present, else `new`
- [ ] R9: `sourceType: "worktree" | "branch"` field added to `FeatureInfo`
- [ ] R10: Source type badge displayed on FeatureCard alongside branch name
- [ ] R11: Branch feature diff uses `git diff main...branch-name` from repoRoot
- [ ] R12: Skip `main`, `master`, and `HEAD` branches from discovery

### Nice to Have

- [ ] R13: Read spec from branch via `git show branch:path` (future enhancement)

## Architecture

### Approach

Minimal changes to existing patterns:

- **Backend** (`vite.config.ts`): After worktree discovery in `GET /features`, run `git branch --no-merged main` and create `FeatureInfo` entries for branches not already covered by worktrees. Add `sourceType` field to all entries.
- **Frontend types** (`featureApi.ts`): Add `sourceType` to `FeatureInfo` type.
- **Frontend card** (`FeatureCard.tsx`): Conditionally render Code link based on status. Add source type badge.
- **Diff**: Branch features use `worktreePath: repoRoot` and pass branch name as source — existing `regenerateDiff` flow works unchanged.

### Components

- `GET /features` endpoint: branch discovery + dedup + FeatureInfo construction
- `FeatureInfo` type: new `sourceType` field
- `FeatureCard`: conditional Code link + source type badge

### Files to Create/Modify

- `apps/ui/vite.config.ts` — backend FeatureInfo type, branch discovery in GET /features, sourceType field
- `apps/ui/src/services/featureApi.ts` — add sourceType to FeatureInfo type
- `apps/ui/src/components/dashboard/FeatureCard.tsx` — hide Code link for non-code statuses, add sourceType badge

## Alternatives Considered

### Read spec from branch via `git show`

- **Pros**: Would allow spec/task viewing for branch-only features
- **Cons**: Adds complexity, spec viewer needs write access for comments, slower
- **Why rejected**: Can be added later; for now branch features are code-review-only

### Keep Code link disabled instead of hidden

- **Pros**: Consistent UI, user sees all actions
- **Cons**: Clutters dashboard with irrelevant actions
- **Why rejected**: User explicitly prefers hiding over disabling for dashboard clarity

### Only show branches that also have worktrees

- **Pros**: Simpler, no new discovery logic
- **Cons**: Defeats the purpose — branches without worktrees stay invisible
- **Why rejected**: The whole point is surfacing unmerged work

## Acceptance Criteria

- [ ] AC1: Dashboard FeatureCard shows no Code link for `new`, `design`, `design_review`, `complete` features
- [ ] AC2: Dashboard FeatureCard shows Code link for `code` and `code_review` features
- [ ] AC3: Feature detail view Code link is unchanged (disabled for non-code statuses)
- [ ] AC4: Unmerged branches appear as features in dashboard with status badge and branch name
- [ ] AC5: Each card shows a source type indicator (worktree vs branch)
- [ ] AC6: Branch features can be clicked to enter feature view and initiate code review
- [ ] AC7: `main`, `master`, and `HEAD` branches are excluded from branch discovery
- [ ] AC8: Branches already represented by worktrees are not duplicated
- [ ] AC9: Type check passes (`pnpm type-check`)
- [ ] AC10: Build succeeds (`pnpm build`)

## Diagrams

- `diagrams/flow.mmd` — Feature discovery flow showing worktree + branch paths
