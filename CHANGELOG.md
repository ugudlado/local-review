# Changelog

## 1.1.0 — 2026-03-09

### Added

- **Standalone server** (`apps/server`): Hono-based REST API + WebSocket server replaces Vite plugin middleware for production use
- **Zero-install support**: Server dist bundled via esbuild (312KB) with all deps — no `pnpm install` needed after plugin installation
- **Auto-detected sessions**: ReviewPage auto-detects feature branch and loads the matching session
- **Per-branch sessions**: Sessions scoped by branch to prevent cross-branch thread bleed
- **Verdict auto-reset**: Verdict resets automatically once all threads are resolved (non-DEV_WORKFLOW mode)
- **Per-thread resolve progress**: UI shows resolve status and run log per thread

### Fixed

- Hook scripts now executable (load-feature-context.sh, detect-feature.sh)
- Session-start hook uses bundled `node dist/index.js` instead of `pnpm dev` (no dev deps required)

### Changed

- Server build switched from `tsc` to `esbuild` for bundled output
- Session-start hook prefers live repo (`~/code/review`) for development, falls back to plugin cache

## 1.0.0 — 2026-03-02

Initial release.

- Browser-based code review UI with syntax-highlighted diffs
- Inline threaded comments on single or multi-line selections
- Thread resolution via `review-resolver` subagent
- Spec review with annotatable paragraphs
- Feature dashboard with pipeline progress tracking
- Task board with phase-based progress
- Session persistence to `.review/sessions/*.json`
- `/local-review:open` and `/local-review:resolve` slash commands
