#!/usr/bin/env bash
# Removes old cached versions of local-review plugin.
# Called from session-start.sh in background — never blocks session startup.
set -euo pipefail

CACHE_DIR="$HOME/.claude/plugins/cache/ugudlado/local-review"
PLUGINS_JSON="$HOME/.claude/plugins/installed_plugins.json"
LOG_PREFIX="[$(date '+%Y-%m-%d %H:%M:%S')]"

# Exit early if cache directory doesn't exist or has < 2 versions
if [ ! -d "$CACHE_DIR" ]; then
  exit 0
fi

version_count=$(find "$CACHE_DIR" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
if [ "$version_count" -lt 2 ]; then
  exit 0
fi

# Determine active version from installed_plugins.json
if [ ! -f "$PLUGINS_JSON" ]; then
  echo "$LOG_PREFIX WARNING: $PLUGINS_JSON not found, skipping cleanup"
  exit 0
fi

active_version=$(python3 -c "
import json, sys
try:
    data = json.load(open(sys.argv[1]))
    entries = data.get('plugins', {}).get('local-review@ugudlado', [])
    if entries:
        print(entries[-1]['installPath'].rstrip('/').split('/')[-1])
except Exception:
    pass
" "$PLUGINS_JSON" 2>/dev/null)

if [ -z "$active_version" ]; then
  echo "$LOG_PREFIX WARNING: Could not determine active version, skipping cleanup"
  exit 0
fi

# Remove all versions that are not the active one
removed=0
bytes_freed=0
for dir in "$CACHE_DIR"/*/; do
  dir_name=$(basename "$dir")
  if [ "$dir_name" = "$active_version" ]; then
    continue
  fi
  dir_size=$(du -sk "$dir" 2>/dev/null | cut -f1 || echo 0)
  if rm -rf "$dir" 2>/dev/null; then
    echo "$LOG_PREFIX Removed $dir_name (${dir_size}K)"
    removed=$((removed + 1))
    bytes_freed=$((bytes_freed + dir_size))
  else
    echo "$LOG_PREFIX ERROR: Failed to remove $dir_name"
  fi
done

if [ "$removed" -gt 0 ]; then
  echo "$LOG_PREFIX Cleanup complete: removed $removed version(s), freed ${bytes_freed}K. Active: $active_version"
fi
