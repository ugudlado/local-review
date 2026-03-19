# Design: Workspace-Based URL Routing

## Approach

Use React Router's nested route structure to add an optional `/workspace/:workspaceName` prefix. A shared layout component handles both the "workspace scoped" and "all workspaces" cases. A redirect component at the root level catches legacy `?workspace=` URLs and rewrites them.

### Why not `<Navigate>` in every component?

The redirect logic is centralized in one place (root layout) rather than scattered across Dashboard, FeatureRow, etc. Components downstream simply read the workspace from `useParams()` and never need to know whether the user arrived via a legacy URL.

## Route Structure (App.tsx)

```
RootLayout (FeaturesProvider + WorkspaceRedirect)
  /                                                    -> Dashboard (all workspaces)
  /workspace/:workspaceName                            -> Dashboard (filtered)
  /workspace/:workspaceName/features/:featureId        -> FeatureLayout
    index                                              -> FeatureDefaultRedirect
    tasks                                              -> TasksPage
    code                                               -> FeatureCodeTab
  /features/:featureId                                 -> FeatureLayout (no workspace)
    index                                              -> FeatureDefaultRedirect
    tasks                                              -> TasksPage
    code                                               -> FeatureCodeTab
  *                                                    -> NotFound
```

Implementation strategy: define the feature routes once as a reusable array, then mount them under both `/workspace/:workspaceName/features/:featureId` and `/features/:featureId`. This avoids duplicating route definitions.

```tsx
const featureChildren = [
  { index: true, element: <FeatureDefaultRedirect /> },
  ...(FLAGS.DEV_WORKFLOW
    ? [{ path: FEATURE_TAB.Tasks, element: <TasksPage /> }]
    : []),
  { path: FEATURE_TAB.Code, element: <FeatureCodeTab /> },
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // All workspaces dashboard
      {
        path: "/",
        element: FLAGS.DEV_WORKFLOW ? <Dashboard /> : <StandaloneReviewPage />,
      },
      // Workspace-scoped dashboard
      { path: "/workspace/:workspaceName", element: <Dashboard /> },
      // Workspace-scoped feature routes
      {
        path: "/workspace/:workspaceName/features/:featureId",
        element: <FeatureLayout />,
        children: featureChildren,
      },
      // Non-workspace feature routes (direct links, dev/debug)
      {
        path: "/features/:featureId",
        element: <FeatureLayout />,
        children: featureChildren,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
```

## Component Changes

### 1. useRepoContext.ts -- Split into path-based and query-based helpers

The hook changes from reading `?workspace=` search params to reading `:workspaceName` from the URL path via `useParams()`. The `?repo=` param stays as a query param.

```tsx
import { useParams, useSearchParams } from "react-router-dom";

export function useRepoContext() {
  const { workspaceName } = useParams<{ workspaceName?: string }>();
  const [searchParams] = useSearchParams();
  const repo = searchParams.get("repo");
  // workspace comes from the URL path, not query params
  return { repo, workspace: workspaceName ?? null };
}
```

Replace `withRepo()` with two distinct helpers:

**`workspacePath(url, workspace)`** -- builds browser navigation URLs with path prefix:

```tsx
/** Prepend /workspace/:name to a browser URL path. */
export function workspacePath(url: string, workspace: string | null): string {
  if (!workspace) return url;
  // url is expected to start with "/"
  if (url === "/") return `/workspace/${encodeURIComponent(workspace)}`;
  return `/workspace/${encodeURIComponent(workspace)}${url}`;
}
```

**`withRepoQuery(url, repo, workspace)`** -- appends query params for API calls (keeps current behavior, renamed for clarity):

```tsx
/** Append ?repo= or ?workspace= query params to an API URL. */
export function withRepoQuery(
  url: string,
  repo: string | null,
  workspace?: string | null,
): string {
  if (!repo && !workspace) return url;
  const sep = url.includes("?") ? "&" : "?";
  if (workspace)
    return `${url}${sep}workspace=${encodeURIComponent(workspace)}`;
  if (repo) return `${url}${sep}repo=${encodeURIComponent(repo)}`;
  return url;
}
```

A convenience hook for building browser URLs:

```tsx
/** Returns a function that prepends the current workspace path prefix to a URL. */
export function useWorkspacePath() {
  const { workspace } = useRepoContext();
  return (url: string) => workspacePath(url, workspace);
}
```

### 2. WorkspaceRedirect (new, in RootLayout)

A small component rendered inside `RootLayout` that checks for legacy `?workspace=` in search params and redirects:

```tsx
function WorkspaceRedirect() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const ws = searchParams.get("workspace");

  if (ws && !pathname.startsWith("/workspace/")) {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("workspace");
    const query = newParams.toString();
    const target = workspacePath(pathname, ws) + (query ? `?${query}` : "");
    return <Navigate to={target} replace />;
  }
  return null;
}
```

Placed at the top of `RootLayout` before `<Outlet />`. This handles all legacy URLs with a single redirect.

### 3. featureApi.ts

Replace all `withRepo()` calls with `withRepoQuery()`. This is a mechanical rename -- the function signature and behavior are identical. The API layer never uses path-based workspace URLs.

Affected calls:

- `getWorktrees()` -- `withRepoQuery(url, repo, workspace)`
- `getFeatures()` -- `withRepoQuery(url, repo, workspace)`

### 4. Dashboard.tsx

**WorkspaceSwitcher `onChange`**: Instead of `setSearchParams({ workspace: value })`, navigate to the workspace path:

```tsx
const navigate = useNavigate();

function handleWorkspaceChange(value: string) {
  if (!value) {
    navigate("/");
  } else {
    navigate(`/workspace/${encodeURIComponent(value)}`);
  }
}
```

Remove the `useSearchParams` setter -- no longer needed for workspace switching.

**`fetchFeatures`**: The `workspace` value now comes from `useRepoContext()` (which reads from `useParams`), so the API call logic is unchanged. The `featureApi.getFeatures(repo, workspace)` call still appends `?workspace=` to the API request.

### 5. FeatureRow.tsx

Replace `withRepo(url, repo, workspace)` with the path-based helper:

```tsx
const wp = useWorkspacePath();

function handleActivate() {
  void navigate(wp(`/features/${feature.id}`));
}
```

The `?repo=` case: if `repo` is set (no workspace), append it as a query param. Since `?repo=` is a dev/debug mode and workspace is the primary case, handle it simply:

```tsx
function handleActivate() {
  let url = wp(`/features/${feature.id}`);
  if (repo) url += `?repo=${encodeURIComponent(repo)}`;
  void navigate(url);
}
```

### 6. FeatureNavBar.tsx

**Back link**: `<Link to={wp("/")}>`

**Feature switcher `handleSwitch`**:

```tsx
void navigate(wp(`/features/${id}/${activeTabPath}`));
```

**Tab links**: Currently `<Link to={tabPath}>` where `tabPath` is a relative path like `${basePath}/${tab.path}`. These work correctly with path-based routing because `basePath` is `/features/:featureId` and the workspace prefix is part of the current URL. However, `basePath` must be updated to include the workspace prefix:

```tsx
const wp = useWorkspacePath();
const basePath = wp(`/features/${featureId}`);
```

This fixes the existing bug where tabs drop workspace context, because `basePath` now includes `/workspace/:name` when applicable.

### 7. useFeaturesContext.tsx

Currently reads `?repo` from search params. This continues working as-is since `?repo=` remains a query param. No changes needed.

### 8. commands/open.md

Update URL construction to use path-based workspace segments:

```bash
# Before
open "http://localhost:37003?workspace=$WORKSPACE_NAME"
open "http://localhost:37003/features/$FEATURE_ID/code?workspace=$WORKSPACE_NAME"

# After
open "http://localhost:37003/workspace/$WORKSPACE_NAME"
open "http://localhost:37003/workspace/$WORKSPACE_NAME/features/$FEATURE_ID/code"
```

The `--repo` flag continues using `?repo=` query params since that is a different mode.

## Data Flow Summary

```
Browser URL                          useRepoContext()              API Call
-----------                          ----------------              --------
/workspace/typewriter/features/X     { workspace: "typewriter" }   /api/features?workspace=typewriter
/features/X                          { workspace: null }           /api/features
/features/X?repo=/path               { repo: "/path" }            /api/features?repo=/path
/?workspace=typewriter               REDIRECT -> /workspace/typewriter
```

## Migration

1. Replace `withRepo` with `workspacePath` / `withRepoQuery` across all UI files.
2. Add `WorkspaceRedirect` to `RootLayout`.
3. Update route definitions in `App.tsx`.
4. Update `commands/open.md` URL patterns.
5. Verify `?repo=` still works in all contexts.

The migration is backward compatible because `WorkspaceRedirect` catches all old-format URLs and rewrites them. No data migration is needed -- this is purely a URL structure change.

## Files Changed

| File                                              | Change                                                                                                                |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `apps/ui/src/hooks/useRepoContext.ts`             | Read workspace from `useParams`; split `withRepo` into `workspacePath` + `withRepoQuery`; add `useWorkspacePath` hook |
| `apps/ui/src/App.tsx`                             | Add `/workspace/:workspaceName` routes; add `WorkspaceRedirect`; extract `featureChildren` array                      |
| `apps/ui/src/pages/Dashboard.tsx`                 | Navigate instead of `setSearchParams` for workspace switching                                                         |
| `apps/ui/src/components/dashboard/FeatureRow.tsx` | Use `useWorkspacePath` for navigation URLs                                                                            |
| `apps/ui/src/components/FeatureNavBar.tsx`        | Use `useWorkspacePath` for back link, feature switcher, and tab base path                                             |
| `apps/ui/src/services/featureApi.ts`              | Rename `withRepo` to `withRepoQuery` (behavior unchanged)                                                             |
| `commands/open.md`                                | Update URL patterns to path-based workspace segments                                                                  |

## Edge Cases

- **Workspace name with special characters**: `encodeURIComponent` handles this in path segments. React Router's `useParams` returns the decoded value.
- **Double-prefix prevention**: `WorkspaceRedirect` checks `!pathname.startsWith("/workspace/")` before redirecting, preventing infinite redirect loops if someone has both a path prefix and a query param.
- **StandaloneReviewPage**: Only mounted at `/` when `FLAGS.DEV_WORKFLOW` is false. It uses `?source=` and `?worktree=` query params which are unaffected by this change.
