import { Hono } from "hono";
import fs from "node:fs/promises";
import path from "node:path";
import { findWorktreePath, safeId } from "../utils.js";

/** Minimal task progress extracted from tasks.md content. */
function parseTasksMarkdown(markdown: string): {
  total: number;
  completed: number;
  inProgress: number;
  phases: Array<{
    name: string;
    tasks: Array<{ id: string; status: string; description: string }>;
  }>;
} {
  const lines = markdown.split("\n");
  const phases: Array<{
    name: string;
    tasks: Array<{ id: string; status: string; description: string }>;
  }> = [];
  let currentPhase: {
    name: string;
    tasks: Array<{ id: string; status: string; description: string }>;
  } | null = null;

  for (const line of lines) {
    if (/^##\s+Status Legend/.test(line)) break;
    const phaseMatch = line.match(/^###\s+(.+)$/);
    if (phaseMatch) {
      if (currentPhase) phases.push(currentPhase);
      currentPhase = { name: phaseMatch[1].trim(), tasks: [] };
      continue;
    }
    if (currentPhase) {
      const taskMatch = line.match(/^\s*-\s+\[([^\]]*)\]\s+(T\d+):\s+(.+)$/);
      if (taskMatch) {
        const marker = taskMatch[1];
        const status =
          marker === "x" || marker === "~"
            ? "done"
            : marker === "→"
              ? "in_progress"
              : "pending";
        currentPhase.tasks.push({
          id: taskMatch[2],
          status,
          description: taskMatch[3].trim(),
        });
      }
    }
  }
  if (currentPhase) phases.push(currentPhase);

  const allTasks = phases.flatMap((p) => p.tasks);
  return {
    total: allTasks.length,
    completed: allTasks.filter((t) => t.status === "done").length,
    inProgress: allTasks.filter((t) => t.status === "in_progress").length,
    phases,
  };
}

export function createTasksRoute(repoRoot: string): Hono {
  const app = new Hono();

  // GET /api/features/:id/tasks
  app.get("/:id/tasks", async (c) => {
    const rawId = c.req.param("id");
    const featureId = safeId(rawId);
    if (!featureId) {
      return c.json({ error: "Invalid feature id" }, 400);
    }

    const wtPath = findWorktreePath(featureId);
    const tasksFilePath = wtPath
      ? path.join(wtPath, "specs", "active", featureId, "tasks.md")
      : path.join(
          repoRoot,
          "specs",
          "archived",
          featureId,
          featureId,
          "tasks.md",
        );

    let tasksContent: string;
    try {
      tasksContent = await fs.readFile(tasksFilePath, "utf-8");
    } catch {
      return c.json({ error: "tasks.md not found" }, 404);
    }

    const tasks = parseTasksMarkdown(tasksContent);
    return c.json({ tasks });
  });

  // PUT /api/features/:id/tasks
  app.put("/:id/tasks", async (c) => {
    const rawId = c.req.param("id");
    const featureId = safeId(rawId);
    if (!featureId) {
      return c.json({ error: "Invalid feature id" }, 400);
    }

    const wtPath = findWorktreePath(featureId);
    if (!wtPath) {
      return c.json({ error: "Feature worktree not found" }, 404);
    }

    const body = await c.req.json<{ content?: unknown }>();
    if (typeof body.content !== "string") {
      return c.json({ error: "content must be a string" }, 400);
    }

    const tasksFilePath = path.join(
      wtPath,
      "specs",
      "active",
      featureId,
      "tasks.md",
    );

    await fs.writeFile(tasksFilePath, body.content, "utf-8");
    return c.json({ ok: true });
  });

  return app;
}
