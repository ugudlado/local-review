# 2026-03-05-spec-view-revamp: Spec View Redesign

## Overview

Redesign the spec review page with a dark Notion-like aesthetic — clean, spacious, content-first. Replace the current terminal-luxe styled spec view with a premium document reading/reviewing experience featuring inline WYSIWYG editing (TipTap), inline thread callouts, a slim thread navigator panel, and a redesigned page shell (header + tabs) that serves as the design system foundation for the whole app.

## Development Mode

**Mode**: Non-TDD

## Requirements

### Must Have

- [ ] **Dark Notion design language**: Dark gray backgrounds (not black), generous whitespace, serif headings (Newsreader), sans-serif body (DM Sans), monospace for code (JetBrains Mono)
- [ ] **Redesigned page shell** (FeatureLayout + FeatureNavBar): Two-row sticky header with navigation row and tabs row; verdict buttons in header; tab badges showing context (thread counts, task progress)
- [ ] **Verdict buttons in header**: Approve always enabled (green), Request Changes disabled/grayed when 0 open threads
- [ ] **Inline WYSIWYG editing** via TipTap: Click Edit to make content editable in-place; floating toolbar on selection; serializes to/from markdown
- [ ] **Inline thread callouts**: Threads render as elevated cards directly below their anchored block with pointer arrows, shadows, and warm/cool tinting by severity
- [ ] **Slim thread navigator** (right panel, ~240px): Compact thread card list for quick navigation; Open/Resolved tab filter; click card scrolls to inline thread
- [ ] **Outline search**: Search input at top of outline sidebar to search across spec content
- [ ] **Outline section navigation**: Clean section list with thread count badges, active section highlighting (blue left border)
- [ ] **Compose flow**: Hover "+" button on blocks, text selection comment, block range selection — all existing interaction patterns preserved
- [ ] **Keyboard shortcuts**: Preserve existing j/k thread navigation, Cmd+K command palette, ? help

### Nice to Have

- [ ] Smooth scroll animations when navigating between sections/threads
- [ ] Edit/View toggle as segmented control with icons (eye/pencil)
- [ ] Collapsible outline sidebar for wider content reading
- [ ] Thread card in navigator highlights when its inline counterpart is in viewport

## Architecture

### Design Language (CSS Variables / Tailwind Config)

The dark Notion theme is defined as a token system reusable across all views:

**Color tokens:**
- `canvas` (base `#1a1a1f`), `canvas-raised` (`#222228`), `canvas-elevated` (`#2a2a31`), `canvas-overlay` (`#32323a`)
- `ink` (text `#e8e6e3`), `ink-muted` (`#9a9898`), `ink-faint` (`#5e5d5c`), `ink-ghost` (`#3d3d42`)
- `accent-emerald`, `accent-amber`, `accent-blue`, `accent-rose` + dim variants
- `border` (`#2e2e35`), `border-subtle` (`#262629`)

**Typography:**
- Headings: Newsreader (serif), 500 weight
- Body: DM Sans, 15px, line-height 1.75
- Code: JetBrains Mono, 13px
- UI labels: DM Sans, 11-13px

**Fonts loaded via Google Fonts** (3 families already in the mock).

### Page Shell (FeatureLayout + FeatureNavBar)

Redesigned as the app-wide design foundation:

**Row 1 (Navigation)**:
- Back arrow with "Dashboard" label
- Feature switcher (monospace ID + status badge + dropdown chevron)
- Worktree path + copy button (right-aligned, muted)

**Row 2 (Tabs + Actions)**:
- Tab pills: Spec (with thread count badge), Tasks (with progress), Code
- View/Edit segmented toggle (icons + labels)
- Vertical divider
- Open thread count
- Approve button (green, always enabled)
- Request Changes button (disabled when 0 open threads)

**Backdrop**: `bg-canvas-raised/95` with `backdrop-blur-md`, border-bottom

**Prop interface change**: `FeatureNavBar` currently accepts only `{ featureId: string }`. The redesign adds verdict buttons and edit toggle, which require page-level state. New approach:
- `FeatureLayout` exposes a **header actions slot** via React context (`FeatureHeaderContext`)
- `SpecReviewPage` (and other pages) inject their specific header actions (verdict buttons, edit toggle) into this context
- `FeatureNavBar` reads from the context and renders the actions in Row 2
- This avoids prop drilling and keeps FeatureNavBar generic across all tab pages

### Spec Content Area

**SpecRenderer refactor**: Replace `react-markdown` with TipTap editor:
- Default state: read-only TipTap rendering (rich content display)
- Edit mode: same TipTap instance becomes editable (`editor.setEditable(true)`)
- Extensions: StarterKit, `tiptap-markdown` (community OSS package by aguingand, NOT `@tiptap/markdown` which is Pro/paid), CodeBlockLowlight, Link, Placeholder
- Floating menu on text selection (bold, italic, heading levels, code, link)
- Serialize to markdown on save via `editor.storage.markdown.getMarkdown()`

**Critical: TipTap Node Views for per-block annotation wrapping**

TipTap renders its own DOM tree via ProseMirror — unlike `react-markdown`, you cannot intercept per-node rendering via a `components` prop. To maintain per-block annotation capabilities (hover compose button, thread count badges, inline threads), we use **TipTap Node Views**:

- Create custom React Node View extensions for: `paragraph`, `heading`, `listItem`, `codeBlock`
- Each Node View wraps its content in an `AnnotatableParagraph`-equivalent component
- Node Views receive `node`, `getPos()`, and `editor` — use `getPos()` to compute `blockIndex`
- In read-only mode: Node Views render block content + compose trigger + thread badges + inline threads
- In edit mode: Node Views render editable content (TipTap handles this natively) with annotation UI hidden

This is roughly equivalent complexity to the current react-markdown renderers but works within TipTap's architecture.

**SelectionPopover and BlockRangeSelector compatibility**

Both components use mouse event listeners on the content container. TipTap intercepts all mouse/selection events via ProseMirror. To maintain these:
- Use **capture-phase event listeners** (`addEventListener('mousedown', handler, true)` with `e.stopPropagation()`) to intercept before TipTap
- This pattern is already established in the codebase (from `@git-diff-view/react` integration — see project memory)
- In edit mode, disable `BlockRangeSelector` (conflicts with text editing) but keep `SelectionPopover` for "Comment on selection" functionality

**Anchor stability after edit**: When saving from edit mode:
1. Get markdown via `editor.storage.markdown.getMarkdown()`
2. Rebuild `AnchorMap` from the new markdown
3. For each existing thread, run `resolveAnchor()` against the new map
4. **Drifted anchors**: call `patchThread(threadId, { anchor: { ...anchor, blockIndex: newBlockIndex, hash: newHash } })` to persist the updated position
5. **Orphaned anchors**: flag thread in `ThreadNav` with a warning indicator
6. Save the markdown to disk via `featureApi.saveSpec()`

**Markdown round-trip hash fidelity**: The `tiptap-markdown` package may serialize markdown slightly differently (whitespace, list markers). Add a validation step during TipTap setup: load a spec, immediately serialize back, and verify `buildAnchorMap()` produces identical hashes. If not, configure `tiptap-markdown` serialization options to match the original format, or normalize both inputs before hashing.

**Content max-width**: 720px, centered in the flex column. Generous top/bottom padding (40px top, 80px bottom).

### Inline Thread Callouts (new component: `InlineThread`)

Replaces the current inline `ThreadCard` rendering in `AnnotatableParagraph`:

- **Elevated card**: `box-shadow: 0 2px 12px rgba(0,0,0,0.35)`, subtle border (`rgba(255,255,255,0.04)`)
- **Pointer arrow**: CSS triangle at top connecting to the parent block
- **Blocking threads**: Amber left border, warm-tinted background gradient (`#222228 → #25221e`)
- **Suggestion threads**: Blue left border, neutral background
- **Resolved threads**: Gray left border, lower opacity (0.65), no warm tint
- **Layout**: Avatar (initials circle) + author name + severity badge + timestamp + message body + Reply/Resolve actions
- **Negative horizontal margin** (`-8px`) to visually break out of content flow

### Thread Navigator (new component: `ThreadNav`)

Replaces `RightPanel` (320px → 240px):

- **Header**: Open/Resolved tab filter (counts on each tab)
- **Thread cards**: Status dot (amber/emerald) + section label (blue) + preview text + severity badge + author + time
- **Active card**: Subtle blue tint background + border
- **Click behavior**: Scrolls main content to the inline thread callout and briefly highlights it
- **No grouping by section** — flat list sorted by recency (simpler than current grouped view)

### Outline Sidebar (redesigned `SpecOutline`)

- **Search input**: At top, searches across spec content. `SpecOutline` receives the full `AnchorMap` (all block types, not just headings) plus `specContent` raw markdown. Search matches against `AnchorInfo.preview` fields and the raw markdown. Filters outline items to only show sections containing matches.
- **Section heading**: "SECTIONS" label
- **Items**: Section name + amber thread count badge (open only)
- **Active item**: Blue left border + elevated background
- **Sub-sections**: Indented, smaller text (13px vs 14px)
- **Width**: 208px (w-52)

### AnnotationGutter

**Removed.** Inline threads replace gutter-based annotation indicators. The "+" compose button on block hover and the outline thread badges provide sufficient annotation affordance.

### Components Summary

| Component | Action | Description |
|-----------|--------|-------------|
| `FeatureNavBar` | Redesign | Two-row header, verdict buttons, edit toggle |
| `FeatureLayout` | Redesign | Dark Notion theme wrapper |
| `SpecRenderer` | Major refactor | TipTap-based editor replacing react-markdown |
| `InlineThread` | New | Elevated callout card for inline threads |
| `ThreadNav` | New | Slim right panel replacing RightPanel |
| `SpecOutline` | Redesign | Search + cleaner typography |
| `AnnotatableParagraph` | Simplify | Remove gutter refs, lighter hover states |
| `AnnotationGutter` | Delete | Replaced by inline threads |
| `RightPanel` | Delete | Replaced by ThreadNav |
| `ComposeBox` | Restyle | Dark Notion aesthetic |
| `BlockRangeSelector` | Preserve | Keep existing interaction logic |

### Files to Create/Modify

**New files:**
- `apps/ui/src/components/spec/InlineThread.tsx` — inline thread callout
- `apps/ui/src/components/spec/ThreadNav.tsx` — slim thread navigator
- `apps/ui/src/styles/notion-theme.css` — CSS variables for dark Notion tokens (imported globally)

**Modified files:**
- `apps/ui/tailwind.config.ts` — extend with Notion color tokens, font families
- `apps/ui/src/components/FeatureNavBar.tsx` — two-row layout, verdict, edit toggle
- `apps/ui/src/components/FeatureLayout.tsx` — theme wrapper update
- `apps/ui/src/components/spec/SpecRenderer.tsx` — TipTap integration
- `apps/ui/src/components/spec/SpecOutline.tsx` — search + restyle
- `apps/ui/src/components/spec/AnnotatableParagraph.tsx` — simplify, remove gutter
- `apps/ui/src/components/review/ComposeBox.tsx` — restyle
- `apps/ui/src/pages/SpecReviewPage.tsx` — wire new components, remove RightPanel/Gutter

**Deleted files:**
- `apps/ui/src/components/spec/AnnotationGutter.tsx`
- `apps/ui/src/components/spec/RightPanel.tsx`

### Library References

- **TipTap**: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-code-block-lowlight`, `@tiptap/extension-link`, `@tiptap/extension-placeholder`
- **tiptap-markdown**: `tiptap-markdown` (community OSS by aguingand — NOT `@tiptap/markdown` which is Pro/paid)
- **lowlight**: For code block syntax highlighting in TipTap
- **Fonts**: Google Fonts — DM Sans, Newsreader, JetBrains Mono (loaded via `<link>` in `index.html`)

## Alternatives Considered

### Keep react-markdown + separate edit textarea
- **Pros**: No new dependency (TipTap), simpler migration
- **Cons**: Poor editing UX (full-document textarea with no preview), mode switch disrupts reading flow, no inline editing
- **Why rejected**: The core user request is Notion-like inline editing; react-markdown fundamentally can't do this

### Milkdown instead of TipTap
- **Pros**: Purpose-built for markdown WYSIWYG, lighter weight
- **Cons**: Smaller ecosystem (135 vs 3336 snippets), lower benchmark score, fewer extensions, less React integration maturity
- **Why rejected**: TipTap has a dedicated Notion-like template, better markdown extension, and larger community for long-term support

### Margin annotations (Google Docs-style) instead of inline threads
- **Pros**: Content stays uninterrupted, threads always visible alongside
- **Cons**: Requires precise y-offset alignment (fragile), reduces content width significantly, complex scroll synchronization
- **Why rejected**: User preference for inline Notion-style callouts; simpler implementation, better mobile behavior

### Remove right panel entirely (inline-only threads)
- **Pros**: Maximum content width, simplest layout
- **Cons**: Loses the ability to quickly scan/navigate all threads, no overview of review status
- **Why rejected**: User specifically requested keeping the thread panel for navigation and overview

## Design Mock

Reference mock: `/private/tmp/claude-501/spec-view-mock.html`

The mock demonstrates:
- Dark Notion aesthetic with DM Sans + Newsreader + JetBrains Mono
- Two-row sticky header with tabs, edit toggle, verdict buttons
- Outline sidebar with search input and section navigation
- Inline thread callouts (blocking with amber border, resolved with muted styling)
- Slim thread navigator panel
- Code blocks with syntax highlighting
- Hover compose triggers on content blocks

## Acceptance Criteria

- [ ] Spec view renders with dark Notion theme (correct fonts, colors, spacing)
- [ ] Header shows two rows: navigation + tabs/verdict; Approve always clickable, Request Changes grayed when 0 open threads
- [ ] Edit toggle switches between read-only and editable TipTap modes without page reload
- [ ] TipTap editor serializes content to valid markdown matching the original spec format
- [ ] Inline thread callouts are visually elevated (shadow, pointer, tinted background) and clearly distinct from document content
- [ ] Thread navigator panel shows compact thread list with Open/Resolved tabs; clicking a thread scrolls to its inline callout
- [ ] Outline search filters sections by keyword
- [ ] Existing keyboard shortcuts (j/k, Cmd+K, ?) continue to work
- [ ] Anchor stability: editing spec content preserves thread anchors (drift detection handles moved blocks)
- [ ] No regressions in compose flow (hover "+", text selection, block range selection)

## Review Summary

**Reviewer**: `feature-dev:code-architect`

**Critical issues found and resolved:**
1. **TipTap Node View architecture**: TipTap doesn't support per-node render callbacks like react-markdown. Resolved by specifying custom React Node View extensions for paragraph, heading, listItem, and codeBlock — these wrap content in annotation-capable components.
2. **`@tiptap/markdown` is a Pro package**: Switched to `tiptap-markdown` (community OSS by aguingand).
3. **Markdown round-trip hash fidelity**: Added validation step to ensure `buildAnchorMap()` produces identical hashes after TipTap serialization round-trip.
4. **SelectionPopover/BlockRangeSelector compatibility**: Added capture-phase event listener approach (established pattern from `@git-diff-view/react` integration).

**Suggestions incorporated:**
- FeatureNavBar prop interface: added `FeatureHeaderContext` approach for page-specific header actions
- Drifted anchor write-back: added explicit `patchThread()` calls after edit saves
- `InlineThread` needs `data-thread-id` attribute for scroll targeting
- Outline search receives full AnchorMap + specContent for body text searching
- T015 depends on T003 (navbar wiring)

## Open Questions

- None — all design decisions resolved during brainstorming and architecture review
