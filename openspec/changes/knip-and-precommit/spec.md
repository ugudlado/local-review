---
mode: non-tdd
feature-id: 2026-03-11-knip-and-precommit
linear-ticket: none
---

# Specification: Knip + Pre-commit Enhancements

## Overview

Add knip for dead-code detection across the pnpm monorepo, enhance the pre-commit hook with type-checking, and add ESLint to the server workspace. Together these give agentic coding sessions immediate feedback on type errors and a health-check tool for dead code before merging.

## Requirements

### Functional

1. `pnpm knip` runs from the repo root and reports unused exports, dependencies, and files across both `apps/ui` and `apps/server` workspaces.
2. `pnpm knip:fix` runs knip with `--fix` to auto-remove safe unused exports.
3. `knip.json` at the repo root correctly identifies entry points for both workspaces and auto-detects the Vite plugin for `apps/ui`.
4. `knip.json` ignores `apps/ui/src/server/` (orphan server file in UI tree), `dist/` directories, and test files.
5. The Husky pre-commit hook runs `pnpm type-check` after `lint-staged`, blocking commits with TypeScript errors.
6. `apps/server/` has an `eslint.config.js` with TypeScript-aware rules (no `any`, no unused vars, no unused imports).
7. lint-staged in root `package.json` covers `apps/server/src/**/*.ts` with ESLint and Prettier.
8. All changes are additive — no existing scripts, configs, or hooks are removed.

### Non-Functional

- Pre-commit hook completes in under 15 seconds on a typical staged changeset.
- Knip config uses the `$schema` reference for editor validation.
- Server ESLint config mirrors the minimal, pragmatic style of the UI ESLint config (no overly strict rules that block real patterns).

## Architecture

```
repo root/
├── knip.json                      ← NEW: workspace-aware knip config
├── package.json                   ← MODIFIED: knip/knip:fix scripts, lint-staged server entry
├── .husky/pre-commit              ← MODIFIED: add pnpm type-check
└── apps/
    ├── ui/                        (no changes — vite plugin auto-detected)
    └── server/
        └── eslint.config.js       ← NEW: TypeScript-aware ESLint for server
```

**Knip workspace mapping:**

| Workspace     | Entry          | Project             | Plugin               |
| ------------- | -------------- | ------------------- | -------------------- |
| `apps/ui`     | `src/main.tsx` | `src/**/*.{ts,tsx}` | Vite (auto-detected) |
| `apps/server` | `src/index.ts` | `src/**/*.ts`       | TypeScript           |

## Acceptance Criteria

- **Given** a file in `apps/ui/src` has an exported function not imported anywhere, **when** `pnpm knip` runs, **then** it appears in the unused exports report.
- **Given** a file in `apps/server/src` has an exported function not imported anywhere, **when** `pnpm knip` runs, **then** it appears in the unused exports report.
- **Given** a staged `.ts` file has a type error, **when** `git commit` is run, **then** the commit is blocked with a type error message.
- **Given** a staged `apps/server/src/*.ts` file has an `any` type or unused variable, **when** `git commit` is run, **then** ESLint blocks the commit.
- **Given** `apps/ui/src/server/resolver-daemon.ts` exists as an orphan, **when** `pnpm knip` runs, **then** it does NOT appear in the report (covered by ignore rule).

## Decisions

- **Knip as on-demand tool, not pre-commit**: Full project scan is too slow (~10s) for the commit hot path. Run before merge as part of feature-complete checklist.
- **Non-TDD mode**: Pure tooling/config work — no business logic, no meaningful unit tests to write.
- **Server ESLint minimal**: Only `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-unused-vars`, and `no-unused-vars` rules. Avoid opinionated rules that conflict with Hono/Node patterns.
- **type-check in pre-commit (not just CI)**: 3–5s cost is worth catching agent-generated type errors immediately rather than at CI time.
