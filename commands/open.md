---
description: Open the review UI dashboard, or navigate to a specific feature view
argument-hint: "[--spec|--code|--tasks <feature-id>] — open a specific feature view"
---

# Open Local Review UI

Start the review UI so you can browse the dashboard or jump directly into a feature view.

## Steps

1. Parse `$ARGUMENTS` to detect flags:
   - `--spec <feature-id>` — open the spec review for that feature
   - `--code <feature-id>` — open the code review for that feature
   - `--tasks <feature-id>` — open the tasks view for that feature
   - No flags, no arguments — open the dashboard
   - Plain argument with no flag (legacy) — treat as a session filename

2. Check if the UI dev server is already running:

   ```bash
   lsof -i :37002 | grep LISTEN
   ```

3. If not running, start it:

   ```bash
   cd $CLAUDE_PLUGIN_ROOT/.. && pnpm dev
   ```

   Wait ~3 seconds for Vite to start.

4. Build and open the URL based on the detected mode:

   ```bash
   # Default — dashboard
   open http://localhost:37002

   # With --spec
   open http://localhost:37002/features/$FEATURE_ID/spec

   # With --code
   open http://localhost:37002/features/$FEATURE_ID/code

   # With --tasks
   open http://localhost:37002/features/$FEATURE_ID/tasks
   ```

   Note: The `open` command requires disabling the sandbox since it needs macOS Launch Services.

5. If a plain session filename was provided (no flag, legacy behavior), tell the user:

   > Session file: `.review/sessions/$ARGUMENTS`
   > In the UI, use "Load Session" to restore it.

6. Summarize what the UI provides based on the mode opened:
   - **Dashboard**: feature list, pipeline progress, quick actions
   - **Spec review**: inline annotation, discussion threads, tasks sidebar
   - **Code review**: diff view, inline comments, verdict controls
   - **Tasks view**: phase progress, task status tracking

7. Once threads are saved, run `/resolve` to let Claude address them.
