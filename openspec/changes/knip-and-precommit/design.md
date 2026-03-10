# Design: Knip + Pre-commit Enhancements

## Context

The project is a pnpm monorepo with two workspaces (`apps/ui` — Vite/React, `apps/server` — Hono/Node). Husky + lint-staged already handle ESLint and Prettier on staged UI files. The gap is: no dead-code detection, no type-check gate, and no server-side linting.

## Goals / Non-Goals

### Goals

- Knip configured for monorepo with correct workspace entry points
- `pnpm knip` and `pnpm knip:fix` as root-level scripts
- `pnpm type-check` added to pre-commit hook
- Server ESLint with TypeScript-aware rules
- Server files covered in lint-staged

### Non-Goals

- Knip in the pre-commit hot path
- Strict "zero warnings" enforcement (informational output is fine)
- Custom knip plugins or reporters

## Technical Design

### Components

**`knip.json` (repo root)**

```json
{
  "$schema": "https://unpkg.com/knip@5/schema.json",
  "workspaces": {
    "apps/ui": {
      "entry": ["src/main.tsx"],
      "project": ["src/**/*.{ts,tsx}"]
    },
    "apps/server": {
      "entry": ["src/index.ts"],
      "project": ["src/**/*.ts"]
    }
  },
  "ignore": ["apps/ui/src/server/**", "apps/*/dist/**"],
  "ignoreExportsUsedInFile": true
}
```

Key decisions:

- `ignoreExportsUsedInFile: true` — suppresses false positives for exports used only within the same file (common in React components)
- Vite plugin is auto-detected by knip when `vite.config.ts` exists in the workspace — no explicit plugin config needed
- `apps/ui/src/server/**` ignored because `resolver-daemon.ts` is a server file living in the UI tree (used by the plugin agent, not imported by the React app)

**`package.json` (root) — script additions**

```json
{
  "scripts": {
    "knip": "knip",
    "knip:fix": "knip --fix",
    "lint": "pnpm --filter @local-review/ui lint && pnpm --filter @local-review/server lint"
  },
  "lint-staged": {
    "apps/server/src/**/*.ts": [
      "pnpm -C apps/server exec eslint --no-warn-ignored",
      "prettier --write"
    ]
  }
}
```

The existing `lint-staged` entries for UI files remain unchanged. Note: use `pnpm -C apps/server exec eslint` (mirrors the UI pattern) because ESLint lives in `apps/server/node_modules`, not the root.

**`.husky/pre-commit`**

```sh
npx lint-staged
pnpm type-check
```

`pnpm type-check` runs `tsc --noEmit` across both `tsconfig.app.json` and `tsconfig.node.json` (UI) plus the server tsconfig. All type errors block the commit.

**`apps/server/eslint.config.js`**

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: ["dist/**"],
  },
);
```

Mirrors the pragmatic style of `apps/ui/eslint.config.js`. No type-aware rules (no `parserOptions.project`) to keep it fast — type errors are caught by `tsc` in pre-commit anyway.

### Data Flow

```
git commit
    │
    ▼
lint-staged
    ├── apps/ui/src/**/*.{ts,tsx}   → ESLint (UI) + Prettier
    ├── apps/server/src/**/*.ts     → ESLint (server) + Prettier  [NEW]
    └── **/*.{json,css,html,md}    → Prettier
    │
    ▼
pnpm type-check                                                    [NEW]
    ├── apps/ui: tsc -p tsconfig.app.json --noEmit
    ├── apps/ui: tsc -p tsconfig.node.json --noEmit
    └── apps/server: tsc --noEmit
    │
    ▼
commit succeeds ✓

─ ─ ─ ─ ─ ─ ─ ─ (separate, on-demand) ─ ─ ─ ─ ─ ─ ─ ─

pnpm knip                                                          [NEW]
    ├── apps/ui: entry=src/main.tsx, Vite plugin auto-detected
    └── apps/server: entry=src/index.ts
         → unused exports, files, dependencies report
```

### Error Handling

- If `pnpm type-check` fails, the commit is blocked with tsc output. Agent sees the error in the hook output and can fix before retrying.
- If ESLint fails on server files, lint-staged blocks with ESLint output.
- Knip is informational — no CI gate, no commit gate. Run manually.

## Risks & Trade-offs

| Risk                                             | Mitigation                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Pre-commit now ~5–8s slower                      | Acceptable — catches real errors. Type-check is the main addition.   |
| Knip false positives on `apps/ui/src/server/`    | Covered by ignore rule                                               |
| Server ESLint rules too strict for Hono patterns | Start with minimal rules; tighten incrementally                      |
| `pnpm type-check` slow on first run (cold cache) | tsc incremental cache (`tsconfig.tsbuildinfo`) speeds up repeat runs |

## Open Questions

- Should knip eventually run in CI on PRs? (Not in scope — can add later as a workflow step)
- Should `knip:fix` be safe to run without review? (Flag for human review; `--fix` only touches exports, not files)
