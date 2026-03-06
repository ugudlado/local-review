#!/usr/bin/env bash
# Shared helper: detect feature ID and locate spec/tasks files
# Usage: source this file, then use $FEATURE_ID, $SPEC_FILE, $TASKS_FILE
# Note: relies on caller's set -euo pipefail; safe to source standalone too
set -euo pipefail

FEATURE_ID=""
SPEC_FILE=""
TASKS_FILE=""

# Detect from worktree path first, then git branch
if [[ "$PWD" =~ feature_worktrees/([^/]+) ]]; then
  FEATURE_ID="${BASH_REMATCH[1]}"
elif command -v git &>/dev/null; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
  if [[ "$BRANCH" =~ ^feature/(.+)$ ]]; then
    FEATURE_ID="${BASH_REMATCH[1]}"
  fi
fi

if [[ -n "$FEATURE_ID" ]]; then
  # Try local path first, then parent directory — resolve to absolute paths
  if [[ -f "specs/active/$FEATURE_ID/spec.md" ]]; then
    SPEC_FILE="$(cd "specs/active/$FEATURE_ID" && pwd)/spec.md"
    TASKS_FILE="$(cd "specs/active/$FEATURE_ID" && pwd)/tasks.md"
  elif [[ -f "../specs/active/$FEATURE_ID/spec.md" ]]; then
    SPEC_FILE="$(cd "../specs/active/$FEATURE_ID" && pwd)/spec.md"
    TASKS_FILE="$(cd "../specs/active/$FEATURE_ID" && pwd)/tasks.md"
  fi
fi
