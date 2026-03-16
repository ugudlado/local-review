import { useSearchParams } from "react-router-dom";

export function useRepoContext() {
  const [searchParams] = useSearchParams();
  const repo = searchParams.get("repo");
  const repoName = repo
    ? (repo.split("/").filter(Boolean).pop() ?? repo)
    : null;
  return { repo, repoName };
}

/** Append ?repo= to a URL path if repo is set */
export function withRepo(url: string, repo: string | null): string {
  if (!repo) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}repo=${encodeURIComponent(repo)}`;
}
