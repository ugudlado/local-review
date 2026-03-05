# Tasks: 2026-03-05-spec-view-revamp

## Development Mode: Non-TDD

### Phase 1: Design System Foundation

- [ ] T001: Set up dark Notion color tokens and typography [P]
  - **Why**: Must Have — Dark Notion design language (color tokens, font families)
  - **Files**: `apps/ui/src/styles/notion-theme.css` (create), `apps/ui/tailwind.config.ts` (modify), `apps/ui/index.html` (add Google Fonts links)
  - **Done when**: Tailwind config extends with all canvas/ink/accent/border tokens; Google Fonts loaded for DM Sans, Newsreader, JetBrains Mono; CSS variables defined in notion-theme.css and imported

- [ ] T002: Install TipTap and tiptap-markdown dependencies [P]
  - **Why**: Must Have — Inline WYSIWYG editing via TipTap
  - **Files**: `apps/ui/package.json`
  - **Done when**: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-code-block-lowlight`, `@tiptap/extension-link`, `@tiptap/extension-placeholder`, `tiptap-markdown` (community OSS by aguingand, NOT `@tiptap/markdown`), `lowlight` installed via pnpm; verify `tiptap-markdown` is MIT licensed

### Phase 2: Page Shell Redesign

- [ ] T003: Create FeatureHeaderContext for page-specific header actions (depends: T001)
  - **Why**: Must Have — Verdict buttons and edit toggle in header need page-level state without prop drilling
  - **Files**: `apps/ui/src/components/FeatureLayout.tsx` (modify), `apps/ui/src/hooks/useFeatureHeader.ts` (create)
  - **Done when**: `FeatureHeaderContext` created with `setHeaderActions(ReactNode)` API; `FeatureLayout` provides the context; `useFeatureHeader()` hook exposes `setHeaderActions`; child pages can inject arbitrary header actions

- [ ] T004: Redesign FeatureNavBar with two-row layout (depends: T003)
  - **Why**: Must Have — Redesigned page shell with verdict buttons in header
  - **Files**: `apps/ui/src/components/FeatureNavBar.tsx`
  - **Done when**: Two-row header renders: Row 1 (back arrow + "Dashboard" label, feature switcher, worktree path); Row 2 (tab pills with badges, header actions slot from context); backdrop blur applied; dark Notion tokens used; Approve/Request Changes buttons are rendered by consuming pages via the context, not hardcoded in navbar

- [ ] T005: Update FeatureLayout with dark Notion theme (depends: T001)
  - **Why**: Must Have — Page shell uses dark Notion design language
  - **Files**: `apps/ui/src/components/FeatureLayout.tsx`
  - **Done when**: Layout wrapper uses canvas base background, inherits notion-theme tokens; children render within the dark theme context

### Phase 3: Spec Content — TipTap Integration

- [ ] T006: Create TipTap-based SpecRenderer with Node View extensions (depends: T002, T005)
  - **Why**: Must Have — Inline WYSIWYG editing via TipTap with per-block annotation support
  - **Files**: `apps/ui/src/components/spec/SpecRenderer.tsx`, `apps/ui/src/components/spec/nodeviews/` (create directory with: `AnnotatableNodeView.tsx`, `HeadingNodeView.tsx`, `ParagraphNodeView.tsx`, `ListItemNodeView.tsx`, `CodeBlockNodeView.tsx`)
  - **Done when**: SpecRenderer initializes TipTap editor with StarterKit + tiptap-markdown + CodeBlockLowlight + Link + Placeholder; custom React Node Views registered for paragraph, heading, listItem, codeBlock; each Node View wraps content in an annotatable component with `data-block-index` attribute, hover compose trigger, and thread count badge; read-only mode renders spec markdown matching current quality; `hashLookup` reverse map built from TipTap's document nodes

- [ ] T007: Validate markdown round-trip hash fidelity (depends: T006)
  - **Why**: Critical — ensure `buildAnchorMap()` produces identical hashes after TipTap load+serialize
  - **Files**: `apps/ui/src/components/spec/SpecRenderer.tsx`
  - **Done when**: Load a spec markdown into TipTap, immediately serialize via `editor.storage.markdown.getMarkdown()`, run `buildAnchorMap()` on both original and serialized — hashes match for all blocks; if not, configure tiptap-markdown serialization options to normalize output; document any normalization applied

- [ ] T008: Implement Edit/View mode toggle with anchor write-back (depends: T007)
  - **Why**: Must Have — Click Edit to make content editable in-place; anchors survive edits
  - **Files**: `apps/ui/src/components/spec/SpecRenderer.tsx`, `apps/ui/src/pages/SpecReviewPage.tsx`
  - **Done when**: Edit toggle calls `editor.setEditable(true/false)`; floating toolbar appears on text selection in edit mode; Save serializes to markdown, rebuilds AnchorMap, runs `resolveAnchor()` on all threads, calls `patchThread()` for drifted anchors (updating blockIndex + hash), flags orphaned threads; calls `featureApi.saveSpec()`; Cancel reverts to original content; old `<textarea>` edit mode and inline toolbar (lines ~550-586 of current SpecReviewPage) removed

- [ ] T009: Adapt SelectionPopover and BlockRangeSelector for TipTap (depends: T006)
  - **Why**: Must Have — Compose flow preserved (text selection comment, block range selection)
  - **Files**: `apps/ui/src/components/spec/SpecRenderer.tsx` (wiring), `apps/ui/src/components/diff/SelectionComposePortal.tsx` or equivalent
  - **Done when**: SelectionPopover works via capture-phase event listeners (`addEventListener('mousedown', handler, true)`) to intercept before TipTap/ProseMirror; BlockRangeSelector disabled in edit mode, works in read-only mode via capture-phase listeners; text selection in read-only mode shows "Comment" popover

### Phase 4: Inline Thread Callouts

- [ ] T010: Create InlineThread component (depends: T006)
  - **Why**: Must Have — Threads render as elevated cards below anchored blocks
  - **Files**: `apps/ui/src/components/spec/InlineThread.tsx` (create)
  - **Done when**: Component renders elevated card with: box-shadow (`0 2px 12px rgba(0,0,0,0.35)`), CSS pointer arrow at top, severity-based left border (amber=blocking, blue=suggestion, gray=resolved), severity-based background tint (warm for blocking, neutral for suggestion, muted for resolved), avatar circle with initials, author + severity badge + timestamp, message body, Reply/Resolve buttons; resolved threads at 0.65 opacity; `data-thread-id` attribute on root element for scroll targeting; negative horizontal margin (-8px) to break content flow

- [ ] T011: Wire InlineThread into Node Views (depends: T010, T009)
  - **Why**: Must Have — Inline threads appear below their anchored blocks
  - **Files**: Node View components in `apps/ui/src/components/spec/nodeviews/`, `apps/ui/src/pages/SpecReviewPage.tsx`
  - **Done when**: Each annotatable Node View renders InlineThread callouts for its block's threads; threads sorted by creation time; reply and resolve actions work via existing `patchThread` API; compose flow creates threads that immediately appear as inline callouts; compose box styled with dark Notion tokens

### Phase 5: Thread Navigator Panel

- [ ] T012: Create ThreadNav component replacing RightPanel (depends: T001)
  - **Why**: Must Have — Slim thread navigator for quick navigation
  - **Files**: `apps/ui/src/components/spec/ThreadNav.tsx` (create)
  - **Done when**: 240px panel renders: Open/Resolved tab filter with counts; compact thread cards with status dot (amber/emerald) + section label (blue) + preview text + severity badge + author + time; active card has blue tint background + border; flat list sorted by recency

- [ ] T013: Wire ThreadNav into SpecReviewPage with scroll targeting (depends: T012, T011)
  - **Why**: Must Have — Thread nav scrolls to inline thread callouts on click
  - **Files**: `apps/ui/src/pages/SpecReviewPage.tsx`
  - **Done when**: ThreadNav renders in right column; clicking a thread card smooth-scrolls to the `[data-thread-id]` element in the center column and briefly highlights it (flash animation); j/k keyboard shortcuts cycle through ThreadNav cards and scroll to corresponding inline thread; old RightPanel import removed

### Phase 6: Outline Sidebar Redesign

- [ ] T014: Redesign SpecOutline with search and Notion styling (depends: T001)
  - **Why**: Must Have — Outline search and section navigation
  - **Files**: `apps/ui/src/components/spec/SpecOutline.tsx`
  - **Done when**: Search input at top filters sections by keyword (receives full AnchorMap + specContent to match against headings and body text); section items show thread count badges (amber, open only); active section has blue left border + elevated bg; sub-sections indented at 13px; "SECTIONS" label header; dark Notion tokens applied; sections with no search matches are hidden

### Phase 7: Compose, Cleanup & Wiring

- [ ] T015: Restyle ComposeBox for dark Notion theme (depends: T001)
  - **Why**: Must Have — Compose flow matches new aesthetic
  - **Files**: `apps/ui/src/components/review/ComposeBox.tsx`
  - **Done when**: ComposeBox uses Notion tokens (canvas-elevated background, ink text colors, accent borders); severity dropdown styled consistently; submit button matches accent-blue

- [ ] T016: Delete AnnotationGutter and RightPanel (depends: T013)
  - **Why**: Architecture — these components are replaced by InlineThread and ThreadNav
  - **Files**: Delete `apps/ui/src/components/spec/AnnotationGutter.tsx`, Delete `apps/ui/src/components/spec/RightPanel.tsx`, `apps/ui/src/pages/SpecReviewPage.tsx` (remove imports)
  - **Done when**: Both files deleted; no remaining imports or references; SpecReviewPage compiles without them

- [ ] T017: Final SpecReviewPage layout assembly (depends: T016, T014, T008, T004)
  - **Why**: Must Have — Final assembly of all redesigned components
  - **Files**: `apps/ui/src/pages/SpecReviewPage.tsx`
  - **Done when**: Three-column layout: SpecOutline (208px) | SpecRenderer with InlineThreads (flex, max-w-720px centered) | ThreadNav (240px); page injects verdict buttons + edit toggle into FeatureHeaderContext; command palette and keyboard shortcuts still work; all existing session/thread operations preserved; old textarea edit mode fully removed

- [ ] T018: Visual verification and polish (depends: T017)
  - **Why**: Acceptance criteria — verify against design mock
  - **Files**: All modified files
  - **Done when**: Type-check passes (`pnpm type-check`); dev server starts; screenshot comparison against `/private/tmp/claude-501/spec-view-mock.html` shows matching layout, colors, typography, and component styling; no console errors; compose/reply/resolve flows work end-to-end; j/k navigation works; edit mode works with anchor preservation

## Status Legend
- [ ] = Pending
- [→] = In Progress
- [x] = Done
- [~] = Skipped
- [P] = Parallelizable (no dependency between [P] siblings)
