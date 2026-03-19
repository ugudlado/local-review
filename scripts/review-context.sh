#!/usr/bin/env bash
# review-context.sh
#
# Extracts structured context for a review thread so the resolver agent
# doesn't need to parse diffs or guess line numbers.
#
# Usage:
#   ./review-context.sh <session.json> <threadId>
#
# Outputs JSON:
#   {
#     "threadId": "...",
#     "filePath": "...",
#     "anchorLine": 27,
#     "side": "new",
#     "fileContext": "<lines windowStart..windowEnd with line numbers>",
#     "diffHunk": "<unified diff hunk containing anchorLine>",
#     "messages": [...]
#   }

set -euo pipefail

SESSION_FILE="$1"
THREAD_ID="$2"
WINDOW=15  # lines of context either side of anchor

if [[ -z "$SESSION_FILE" || -z "$THREAD_ID" ]]; then
  echo "Usage: review-context.sh <session.json> <threadId>" >&2
  exit 1
fi

# --- Extract thread fields from session JSON ---
THREAD=$(jq --arg id "$THREAD_ID" '.threads[] | select(.id == $id)' "$SESSION_FILE")

if [[ -z "$THREAD" ]]; then
  echo "Thread $THREAD_ID not found in $SESSION_FILE" >&2
  exit 1
fi

FILE_PATH=$(echo "$THREAD" | jq -r '.filePath')
ANCHOR=$(echo "$THREAD" | jq -r '.line')
ANCHOR_END=$(echo "$THREAD" | jq -r '.lineEnd // .line')
SIDE=$(echo "$THREAD" | jq -r '.side')
MESSAGES=$(echo "$THREAD" | jq '.messages')

# Resolve repo root from session's worktreePath field, or from the session file path
WORKTREE_PATH=$(jq -r '.worktreePath // empty' "$SESSION_FILE" 2>/dev/null | sed "s|^~|$HOME|")
if [[ -n "$WORKTREE_PATH" && -d "$WORKTREE_PATH" ]]; then
  REPO_ROOT="$WORKTREE_PATH"
else
  # Legacy fallback: session was inside .review/sessions/ (go up 3 levels)
  REPO_ROOT=$(cd "$(dirname "$SESSION_FILE")/../.." && pwd)
fi
ABS_PATH="$REPO_ROOT/$FILE_PATH"

# --- Build file context window ---
if [[ -f "$ABS_PATH" ]]; then
  TOTAL_LINES=$(wc -l < "$ABS_PATH")
  WIN_START=$(( ANCHOR - WINDOW < 1 ? 1 : ANCHOR - WINDOW ))
  WIN_END=$(( ANCHOR_END + WINDOW > TOTAL_LINES ? TOTAL_LINES : ANCHOR_END + WINDOW ))

  # Build annotated lines array: [{"number":N,"content":"...","isAnchor":bool}]
  FILE_CONTEXT=$(awk -v start="$WIN_START" -v end="$WIN_END" \
    -v anchor="$ANCHOR" -v anchor_end="$ANCHOR_END" '
    NR >= start && NR <= end {
      is_anchor = (NR >= anchor && NR <= anchor_end) ? "true" : "false"
      # Escape for JSON
      line = $0
      gsub(/\\/, "\\\\", line)
      gsub(/"/, "\\\"", line)
      gsub(/\t/, "\\t", line)
      printf "%s{\"number\":%d,\"content\":\"%s\",\"isAnchor\":%s}", \
        (NR == start ? "" : ","), NR, line, is_anchor
    }
  ' "$ABS_PATH")
  FILE_CONTEXT="[${FILE_CONTEXT}]"
else
  FILE_CONTEXT="\"File not found on disk: $ABS_PATH\""
fi

# --- Extract diff hunk containing anchorLine ---
ALL_DIFF=$(jq -r '.allDiff // ""' "$SESSION_FILE")

if [[ -n "$ALL_DIFF" ]]; then
  # Extract the file's section from allDiff, then find the hunk containing anchorLine
  # We use awk to find the right hunk by tracking new/old line counters
  DIFF_HUNK=$(echo "$ALL_DIFF" | awk -v file="$FILE_PATH" -v anchor="$ANCHOR" -v side="$SIDE" '
    BEGIN { in_file = 0; in_hunk = 0; hunk = ""; found = 0 }

    # Detect file header
    /^diff --git / {
      in_file = ($0 ~ file)
      in_hunk = 0
      next
    }

    !in_file { next }

    # Skip file metadata lines
    /^(index |--- |\+\+\+ )/ { next }

    # New hunk header
    /^@@ / {
      if (found) exit
      # Parse @@ -oldStart,oldCount +newStart,newCount @@ using split
      # Format: @@ -A,B +C,D @@
      split($0, parts, /[ ,@]+/)
      # parts[3]=old_start, parts[4]=old_count (or parts[3] if no comma), parts[5]=new_start
      # More robust: use sub to extract numbers
      header = $0
      sub(/^@@ -/, "", header)
      split(header, op, " ")
      split(op[1], old_parts, ","); old_start = old_parts[1]+0; old_count = (length(old_parts)>1 ? old_parts[2]+0 : 1)
      split(op[2], new_parts, ","); sub(/^\+/, "", new_parts[1]); new_start = new_parts[1]+0; new_count = (length(new_parts)>1 ? new_parts[2]+0 : 1)
      old_end = old_start + old_count - 1
      new_end = new_start + new_count - 1

      # Check if anchor falls in or near this hunk (+/- 3 lines tolerance)
      if (side == "old") {
        in_range = (anchor >= old_start - 3 && anchor <= old_end + 3)
      } else {
        in_range = (anchor >= new_start - 3 && anchor <= new_end + 3)
      }

      in_hunk = in_range
      hunk = (in_hunk ? $0 "\n" : "")
      next
    }

    in_hunk {
      hunk = hunk $0 "\n"
      # Detect end of hunk (next hunk header or EOF handled by exit)
    }

    END {
      if (hunk != "") print hunk
    }
  ')

  if [[ -z "$DIFF_HUNK" ]]; then
    DIFF_HUNK="(no matching hunk — thread is on unchanged code outside the diff)"
  fi
else
  DIFF_HUNK="(no diff available in session)"
fi

# --- Emit JSON ---
jq -n \
  --arg threadId "$THREAD_ID" \
  --arg filePath "$FILE_PATH" \
  --argjson anchorLine "$ANCHOR" \
  --argjson anchorLineEnd "$ANCHOR_END" \
  --arg side "$SIDE" \
  --argjson fileContext "$FILE_CONTEXT" \
  --arg diffHunk "$DIFF_HUNK" \
  --argjson messages "$MESSAGES" \
  '{
    threadId: $threadId,
    filePath: $filePath,
    anchorLine: $anchorLine,
    anchorLineEnd: $anchorLineEnd,
    side: $side,
    fileContext: $fileContext,
    diffHunk: $diffHunk,
    messages: $messages
  }'
