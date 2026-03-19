import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export interface Workspace {
  name: string;
  path: string;
}

/** Read workspace from the URL path segment (:workspaceName). */
export function useWorkspaceContext() {
  const { workspaceName } = useParams<{ workspaceName?: string }>();
  return { workspace: workspaceName ?? null };
}

/** Prepend /workspace/:name to a browser URL path. */
export function workspacePath(
  url: string,
  workspace: string | null | undefined,
): string {
  if (!workspace) return url;
  if (url === "/") return `/workspace/${encodeURIComponent(workspace)}`;
  return `/workspace/${encodeURIComponent(workspace)}${url}`;
}

/** Append ?workspace= query param to an API URL. */
export function withWorkspaceQuery(
  url: string,
  workspace: string | null | undefined,
): string {
  if (!workspace) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}workspace=${encodeURIComponent(workspace)}`;
}

/** Returns a function that prepends the current workspace path prefix to a URL. */
export function useWorkspacePath() {
  const { workspace } = useWorkspaceContext();
  return (url: string) => workspacePath(url, workspace);
}

export function useWorkspaces(): { workspaces: Workspace[]; loaded: boolean } {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch("/api/workspaces")
      .then((r) => r.json())
      .then((data: { workspaces?: Workspace[] }) => {
        setWorkspaces(data.workspaces ?? []);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);
  return { workspaces, loaded };
}
