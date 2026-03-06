---
description: Load feature context (spec and tasks) into the current session
argument-hint: "[feature-id] — optional feature ID (auto-detected from worktree/branch if omitted)"
---

# Continue Feature Development

Resume work on a feature by loading its spec and task list into the current session. This command auto-detects the feature from your current worktree or git branch, but you can also specify a feature ID manually.

## Steps

1. **Parse Arguments**
   - If `$ARGUMENTS` is empty: auto-detect feature ID from:
     1. Worktree name: `~/code/feature_worktrees/[FEATURE-ID]`
     2. Current git branch: `feature/[FEATURE-ID]`
   - If `$ARGUMENTS` provided: use it as the feature ID directly

2. **Locate Spec and Tasks**
   - Check for spec: `specs/active/[FEATURE-ID]/spec.md`
   - Check for tasks: `specs/active/[FEATURE-ID]/tasks.md`
   - If not found in current directory, try parent directory (for feature branches)

3. **Report Status**
   - If both found:

     ```
     ✅ Feature: [FEATURE-ID]
     📋 Spec:   specs/active/[FEATURE-ID]/spec.md
     ✓ Tasks:  specs/active/[FEATURE-ID]/tasks.md
     ```

     Then output the spec and tasks in full

   - If only spec found:

     ```
     ⚠️  Found spec but no tasks file
     ```

     Still output the spec

   - If neither found:
     ```
     ❌ No spec found for: [FEATURE-ID]
     Checked: specs/active/[FEATURE-ID]/
     ```

4. **Output Content**
   - Display the full spec and tasks file contents so Claude can review requirements and track progress

## Usage Examples

```bash
# Auto-detect from current worktree/branch
/continue-feature

# Specify a feature ID manually
/continue-feature 2026-03-05-auto-resolve-daemon
/continue-feature HL-84-custom-feature
```

## Notes

- Auto-detection works both in feature worktrees (`~/code/feature_worktrees/[ID]`) and on feature branches in the main repo
- The SessionStart hook also runs this automatically when sessions begin
- Use this command to refresh context if you've lost track of requirements or task status
