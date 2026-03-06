#!/usr/bin/env python3
"""
patch-thread.py — Fallback script to update a review thread in a session JSON file directly.

Used when the local-review API server is unavailable (e.g. running claude -p outside a dev session).

Usage:
    python3 scripts/resolve-async/patch-thread.py \\
        --session  <path-to-session.json> \\
        --thread   <threadId> \\
        --status   resolved|open \\
        --text     "Your reply text"

Options:
    --session   Path to the session JSON file (required)
    --thread    Thread ID to update (required)
    --status    New status: "resolved" or "open" (required)
    --text      Agent reply text to append as a message (required)
    --author    Author name (default: claude)

Exit codes:
    0  success
    1  argument error
    2  thread not found in session
    3  file I/O or JSON parse error
"""

import argparse
import json
import sys
import time
from datetime import datetime, timezone


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")


def unique_id() -> str:
    return f"{int(time.time() * 1000)}-{hex(int(time.time() * 1e6) % 0xFFFF)[2:]}"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Patch a review thread in a session JSON file (API fallback)."
    )
    parser.add_argument("--session", required=True, help="Path to session JSON file")
    parser.add_argument("--thread", required=True, help="Thread ID to update")
    parser.add_argument(
        "--status",
        required=True,
        choices=["resolved", "open"],
        help='New thread status: "resolved" or "open"',
    )
    parser.add_argument("--text", required=True, help="Agent reply text")
    parser.add_argument("--author", default="claude", help="Author name (default: claude)")
    args = parser.parse_args()

    # Load session
    try:
        with open(args.session) as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        print(f"ERROR: Could not read session file: {e}", file=sys.stderr)
        return 3

    # Find and update thread
    ts = now_iso()
    found = False
    for thread in data.get("threads", []):
        if thread["id"] == args.thread:
            found = True
            thread["status"] = args.status
            thread["lastUpdatedAt"] = ts
            thread.setdefault("messages", []).append(
                {
                    "id": unique_id(),
                    "authorType": "agent",
                    "author": args.author,
                    "text": args.text,
                    "createdAt": ts,
                }
            )
            break

    if not found:
        print(f"ERROR: Thread '{args.thread}' not found in session.", file=sys.stderr)
        return 2

    # Update session metadata
    if "metadata" in data:
        data["metadata"]["updatedAt"] = ts

    # Write back
    try:
        with open(args.session, "w") as f:
            json.dump(data, f, indent=2)
            f.write("\n")
    except OSError as e:
        print(f"ERROR: Could not write session file: {e}", file=sys.stderr)
        return 3

    print(
        f"OK: thread {args.thread} → {args.status}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
