#!/usr/bin/env bash
set -euo pipefail

PORT=37003

# Check if server is already running
if lsof -i :"$PORT" -sTCP:LISTEN &>/dev/null; then
  exit 0
fi

# Prefer the live repo if it exists (for local development), otherwise find in cache
LIVE_REPO="$HOME/code/review"
if [ -f "$LIVE_REPO/apps/ui/vite.config.ts" ] && [ -d "$LIVE_REPO/apps/ui/node_modules" ]; then
  PLUGIN_ROOT="$LIVE_REPO"
else
  PLUGIN_ROOT=$(find ~/.claude/plugins/cache -name "vite.config.ts" -path "*/local-review/*/apps/ui/vite.config.ts" 2>/dev/null | head -1 | sed 's|/apps/ui/vite.config.ts||')
fi

if [ -z "$PLUGIN_ROOT" ]; then
  exit 0
fi

# Start the Vite dev server in the background
cd "$PLUGIN_ROOT"
nohup pnpm -C apps/ui dev >/tmp/local-review-server.log 2>&1 &

# Wait for server to be ready (max 10s)
for i in $(seq 1 20); do
  if curl -s "http://localhost:$PORT" >/dev/null 2>&1; then
    break
  fi
  sleep 0.5
done
