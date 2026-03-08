#!/usr/bin/env bash
# SessionStart hook: inject feature context into session
# Fires on: startup, resume, clear, compact (no matcher = all)
# Uses additionalContext for discrete injection
set -euo pipefail

# Consume stdin (all command hooks receive JSON input)
cat > /dev/null

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/detect-feature.sh"

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
RECENT_COMMITS=$(git log --oneline -5 2>/dev/null || echo "none")
GIT_STATUS=$(git status --short 2>/dev/null | head -20)

CONTEXT="Load LSP via ToolSearch early — prefer LSP (goToDefinition, findReferences, hover, incomingCalls, outgoingCalls) over Grep for semantic code navigation."
CONTEXT+=$'\n\n'"## Current State"$'\n'
CONTEXT+="Branch: $BRANCH"$'\n'
CONTEXT+="Recent commits:"$'\n'"$RECENT_COMMITS"$'\n'
if [[ -n "$GIT_STATUS" ]]; then
  CONTEXT+=$'\n'"## Uncommitted Changes"$'\n'"$GIT_STATUS"$'\n'
fi

if [[ -n "$FEATURE_ID" && -n "$SPEC_FILE" ]]; then
  CONTEXT+=$'\n'"Feature: $FEATURE_ID"$'\n'
  CONTEXT+="Spec: $SPEC_FILE"$'\n'

  if [[ -f "$TASKS_FILE" ]]; then
    CONTEXT+="Tasks: $TASKS_FILE"$'\n'
  fi

  CONTEXT+=$'\n'"Read these files to understand requirements and current task status before doing any work."
fi

python3 -c "
import json, sys
print(json.dumps({
  'hookSpecificOutput': {
    'hookEventName': 'SessionStart',
    'additionalContext': sys.argv[1]
  }
}))
" "$CONTEXT"
