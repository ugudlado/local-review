# 2026-03-06-feature-flags-code-review-only: Feature Flags for Code-Review-Only Mode

## Overview

Add a `FLAGS` constant to `apps/ui/src/config/app.ts` that gates spec review, task board, and approve verdict behind a single `DEV_WORKFLOW` boolean. When `false` (the default), the UI ships as a focused code review tool. When `true`, the full pipeline (spec, tasks, approve) is enabled.

## Development Mode

**Mode**: Non-TDD

## Requirements

### Must Have

- [ ] `FLAGS.DEV_WORKFLOW` constant in `apps/ui/src/config/app.ts`, defaulting to `false`
- [ ] Spec and Tasks tab pills hidden in `FeatureNavBar` when `DEV_WORKFLOW` is `false`
- [ ] Tab row (Row 2) still renders when `DEV_WORKFLOW` is `false` — only tab pills are hidden, header actions slot remains
- [ ] Approve button hidden in `ReviewVerdict` when `DEV_WORKFLOW` is `false`
- [ ] Request Changes button always visible
- [ ] `FeatureDefaultRedirect` navigates directly to `code` (skipping status-based logic) when `DEV_WORKFLOW` is `false`
- [ ] Spec and Tasks routes removed from `App.tsx` when `DEV_WORKFLOW` is `false`
- [ ] Dashboard hides `design` and `design_review` status labels when `DEV_WORKFLOW` is `false`

### Nice to Have

- [ ] `FLAGS` is exported with a JSDoc comment explaining how to enable features

## Architecture

### Approach

Single compile-time boolean constant. No runtime config, no env vars, no localStorage. Flip `DEV_WORKFLOW: true` and rebuild when features are ready to ship.

### Files to Modify

- `apps/ui/src/config/app.ts` — add `FLAGS` export
- `apps/ui/src/components/FeatureNavBar.tsx` — hide Spec/Tasks pills based on flag
- `apps/ui/src/App.tsx` — remove spec/tasks routes; simplify redirect
- `apps/ui/src/components/shared/ReviewVerdict.tsx` — hide Approve button
- `apps/ui/src/pages/Dashboard.tsx` — filter design statuses from display

### Behaviour Details

**FeatureNavBar (Row 2)**

- Tab pills: render only when `DEV_WORKFLOW` is `true` (or always render the Code pill since it's the only one)
- Header actions slot (`headerActions`): always rendered — this is where Request Changes lives
- Result: Row 2 becomes a slim action bar with one button when `DEV_WORKFLOW` is `false`

**App.tsx routes**

- When `DEV_WORKFLOW` is `false`: only `code` route exists under `/features/:featureId`
- `FeatureDefaultRedirect` returns `<Navigate to="code" replace />` unconditionally

**ReviewVerdict**

- Approve button: wrapped in `FLAGS.DEV_WORKFLOW && <button>` — completely absent from DOM
- Request Changes button: always rendered
- "Ready to merge" hint: always rendered when verdict is approved (could arrive from old sessions)

**Dashboard**

- Filter `features` list display: don't show status badge text `design` or `design_review` — or suppress those features from the card entirely if they have no code session

## Alternatives Considered

### Runtime config file (`.review/config.json`)

- **Pros**: No rebuild needed to toggle
- **Cons**: Adds file-watch complexity, overkill for a dev-controlled flag
- **Why rejected**: Compile-time constant is simpler and sufficient

### Per-status tab visibility in `featureStatus.ts`

- **Pros**: Fine-grained control per feature status
- **Cons**: Over-engineered — the goal is a global on/off switch
- **Why rejected**: YAGNI

### URL param / localStorage toggle

- **Pros**: No rebuild, easy to test in dev
- **Cons**: Leaks into URL, adds complexity, could confuse users
- **Why rejected**: Too clever for the use case

## Acceptance Criteria

- [ ] With `DEV_WORKFLOW: false`: navigating to `/features/:id` lands on the Code tab directly
- [ ] With `DEV_WORKFLOW: false`: no Spec or Tasks tab pill is visible in the nav
- [ ] With `DEV_WORKFLOW: false`: Approve button is absent from the DOM
- [ ] With `DEV_WORKFLOW: false`: Request Changes button is visible and functional
- [ ] With `DEV_WORKFLOW: false`: Dashboard does not show design/design_review status features
- [ ] With `DEV_WORKFLOW: true`: all existing behaviour is preserved exactly
- [ ] TypeScript type-check passes
