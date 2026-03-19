import * as vscode from "vscode";

export interface SessionData {
  featureId: string;
  worktreePath: string;
  sourceBranch: string;
  targetBranch: string;
  verdict: "approved" | "changes_requested" | null;
  reviewVerdict?: "approved" | "changes_requested" | null;
  threads: SessionThread[];
  metadata: { createdAt: string; updatedAt: string };
}

export interface SessionThread {
  id: string;
  anchor: {
    type: "diff-line";
    hash: string;
    path: string;
    preview: string;
    line: number;
    lineEnd?: number;
    side: "old" | "new";
  };
  status: "open" | "resolved" | "approved";
  severity: "critical" | "improvement" | "style" | "question";
  messages: SessionMessage[];
  lastUpdatedAt: string;
  labels?: Record<string, string>;
  resolvedByModel?: string;
  resolvedWithSeverity?: string;
}

export interface SessionMessage {
  id: string;
  authorType: "human" | "agent";
  author: string;
  text: string;
  createdAt: string;
}

function getBaseUrl(): string {
  return vscode.workspace
    .getConfiguration("local-review")
    .get<string>("serverUrl", "http://localhost:37003");
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}/api/features${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers as Record<string, string> | undefined),
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const serverClient = {
  async getSession(featureId: string): Promise<SessionData | null> {
    try {
      return await apiFetch<SessionData>(
        `/${encodeURIComponent(featureId)}/code-session`,
      );
    } catch (err) {
      if (err instanceof Error && err.message.includes("404")) {
        return null;
      }
      throw err;
    }
  },

  async saveSession(featureId: string, session: SessionData): Promise<void> {
    await apiFetch(`/${encodeURIComponent(featureId)}/code-session`, {
      method: "POST",
      body: JSON.stringify(session),
    });
  },

  async createThread(featureId: string, thread: SessionThread): Promise<void> {
    await apiFetch(`/${encodeURIComponent(featureId)}/code-session/threads`, {
      method: "POST",
      body: JSON.stringify(thread),
    });
  },

  async updateThread(
    featureId: string,
    threadId: string,
    patch: Partial<
      Pick<SessionThread, "status" | "severity" | "messages" | "labels">
    >,
  ): Promise<void> {
    await apiFetch(
      `/${encodeURIComponent(featureId)}/code-session/threads/${encodeURIComponent(threadId)}`,
      {
        method: "PATCH",
        body: JSON.stringify(patch),
      },
    );
  },

  async setVerdict(
    featureId: string,
    verdict: "approved" | "changes_requested",
  ): Promise<void> {
    await apiFetch(`/${encodeURIComponent(featureId)}/code-session`, {
      method: "POST",
      body: JSON.stringify({ verdict }),
    });
  },

  async triggerResolve(
    featureId: string,
    sessionType: "code" | "spec" = "code",
  ): Promise<{
    ok: boolean;
    resolved?: number;
    clarifications?: number;
    error?: string;
  }> {
    const url = `${getBaseUrl()}/api/resolver/resolve`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featureId, sessionType }),
    });
    return res.json() as Promise<{
      ok: boolean;
      resolved?: number;
      clarifications?: number;
      error?: string;
    }>;
  },

  async checkConnection(): Promise<boolean> {
    try {
      const url = `${getBaseUrl()}/api/features`;
      const res = await fetch(url, { method: "GET" });
      return res.ok;
    } catch {
      return false;
    }
  },
};
