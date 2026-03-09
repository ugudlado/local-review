# Changelog

## 1.0.0 — 2026-03-09

Initial release.

- Browser-based code review UI with syntax-highlighted diffs
- Inline threaded comments on single or multi-line selections
- Thread resolution via `review-resolver` subagent
- Standalone Hono server with REST API + WebSocket, bundled via esbuild for zero-install
- Auto-detected sessions scoped per feature branch
- Feature dashboard, spec review, and task board views
- Session persistence to `.review/sessions/*.json`
- `/local-review:open` and `/local-review:resolve` slash commands
- Keyboard-driven code review navigation — arrow keys, j/k thread cycling, r/o resolve/reopen, Ctrl+K file search, ? help modal
- OpenSpec configuration and schema for spec-driven development workflow
