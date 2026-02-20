import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const sessionsDir = path.join(repoRoot, '.review', 'sessions');

type SessionPayload = {
  name: string;
  notes: string;
  diff: string;
  diffMode?: 'all' | 'committed' | 'uncommitted';
  committedDiff?: string;
  uncommittedDiff?: string;
  allDiff?: string;
  targetBranch?: string;
  sourceBranch?: string;
  worktreePath?: string;
  threads?: Array<{
    id: string;
    filePath: string;
    line: number;
    lineEnd?: number;
    side: 'old' | 'new';
    status: 'open' | 'resolved' | 'approved';
    messages: Array<{
      id: string;
      authorType: 'human' | 'agent';
      author: string;
      text: string;
      createdAt: string;
    }>;
    lastUpdatedAt: string;
  }>;
  comments?: Array<{
    id: string;
    filePath: string;
    line: number;
    side: 'old' | 'new';
    text: string;
    createdAt: string;
  }>;
  createdAt?: string;
};

type WorktreeInfo = {
  path: string;
  branch: string;
  isCurrent: boolean;
};

async function ensureSessionsDir(): Promise<void> {
  await fs.mkdir(sessionsDir, { recursive: true });
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

async function readBody(req: IncomingMessage): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

function safeId(rawId: string): string | null {
  return /^[a-zA-Z0-9._-]+$/.test(rawId) ? rawId : null;
}

async function execGit(args: string[], cwd: string): Promise<string> {
  const { stdout } = await execFileAsync('git', args, {
    cwd,
    maxBuffer: 20 * 1024 * 1024,
  });
  return stdout.trimEnd();
}

async function getCurrentWorktreePath(cwd: string): Promise<string> {
  return await execGit(['rev-parse', '--show-toplevel'], cwd);
}

async function getCurrentBranch(cwd: string): Promise<string> {
  return await execGit(['rev-parse', '--abbrev-ref', 'HEAD'], cwd);
}

async function listBranches(cwd: string): Promise<string[]> {
  const output = await execGit(
    ['for-each-ref', '--format=%(refname:short)', 'refs/heads', 'refs/remotes'],
    cwd,
  );
  return Array.from(
    new Set(
      output
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .filter((line) => !line.endsWith('/HEAD')),
    ),
  );
}

function chooseDefaultTarget(branches: string[]): string {
  if (branches.includes('main')) return 'main';
  if (branches.includes('origin/main')) return 'origin/main';
  if (branches.includes('master')) return 'master';
  if (branches.includes('origin/master')) return 'origin/master';
  return branches[0] || 'main';
}

async function listWorktrees(): Promise<WorktreeInfo[]> {
  const output = await execGit(['worktree', 'list', '--porcelain'], repoRoot);
  const currentPath = await getCurrentWorktreePath(repoRoot);
  const blocks = output.split('\n\n').filter((chunk) => chunk.trim().length > 0);

  const worktrees = await Promise.all(
    blocks.map(async (block) => {
      const lines = block.split('\n');
      const pathLine = lines.find((line) => line.startsWith('worktree '));
      if (!pathLine) return null;

      const wtPath = pathLine.slice('worktree '.length).trim();
      const branchLine = lines.find((line) => line.startsWith('branch '));
      let branch = branchLine ? branchLine.replace('branch refs/heads/', '').trim() : '';

      if (!branch || branch.includes('detached')) {
        try {
          branch = await getCurrentBranch(wtPath);
        } catch {
          branch = 'detached';
        }
      }

      return {
        path: wtPath,
        branch,
        isCurrent: wtPath === currentPath,
      } satisfies WorktreeInfo;
    }),
  );

  return worktrees.filter((wt): wt is WorktreeInfo => Boolean(wt));
}

async function resolveWorktree(requestedPath: string | null): Promise<{ selectedPath: string; worktrees: WorktreeInfo[] }> {
  const worktrees = await listWorktrees();
  if (!requestedPath) {
    const current = worktrees.find((wt) => wt.isCurrent) || worktrees[0];
    return { selectedPath: current?.path || repoRoot, worktrees };
  }

  const found = worktrees.find((wt) => wt.path === requestedPath);
  if (!found) {
    throw new Error('Unknown worktree path');
  }

  return { selectedPath: found.path, worktrees };
}

async function getDiffBundle(
  worktreePath: string,
  requestedTarget: string | null,
  requestedSource: string | null,
) {
  const branches = await listBranches(worktreePath);
  const targetBranch = requestedTarget && branches.includes(requestedTarget)
    ? requestedTarget
    : chooseDefaultTarget(branches);
  const currentBranch = await getCurrentBranch(worktreePath);
  const sourceBranch =
    requestedSource && branches.includes(requestedSource)
      ? requestedSource
      : currentBranch;

  const committedDiff = await execGit(
    ['diff', '--no-color', `${targetBranch}...${sourceBranch}`],
    worktreePath,
  );
  const uncommittedDiff =
    sourceBranch === currentBranch
      ? await execGit(['diff', '--no-color', 'HEAD'], worktreePath)
      : '';

  // Build allDiff without duplicating files already shown in committedDiff.
  // Extract filenames from committedDiff and exclude matching blocks from uncommittedDiff.
  let allDiff: string;
  if (!uncommittedDiff || !committedDiff) {
    allDiff = [committedDiff, uncommittedDiff].filter(Boolean).join('\n');
  } else {
    const committedFiles = new Set(
      committedDiff
        .split('\n')
        .filter((l) => l.startsWith('diff --git '))
        .map((l) => {
          const m = l.match(/ ([a-zA-Z])\/(.*?)$/);
          return m ? m[2] : '';
        })
        .filter(Boolean),
    );
    // Split uncommittedDiff into per-file blocks and drop any already in committedDiff
    const blocks: string[] = [];
    let block: string[] = [];
    for (const l of uncommittedDiff.split('\n')) {
      if (l.startsWith('diff --git ')) {
        if (block.length) blocks.push(block.join('\n'));
        block = [l];
      } else {
        block.push(l);
      }
    }
    if (block.length) blocks.push(block.join('\n'));

    const newBlocks = blocks.filter((b) => {
      const m = b.match(/^diff --git [a-zA-Z]\/(.*?) [a-zA-Z]\//);
      return m ? !committedFiles.has(m[1]) : true;
    });
    allDiff = [committedDiff, ...newBlocks].filter(Boolean).join('\n');
  }

  return {
    worktreePath,
    sourceBranch,
    targetBranch,
    committedDiff,
    uncommittedDiff,
    allDiff,
  };
}

async function listCommits(
  worktreePath: string,
  requestedTarget: string | null,
  requestedSource: string | null,
) {
  const branches = await listBranches(worktreePath);
  const targetBranch = requestedTarget && branches.includes(requestedTarget)
    ? requestedTarget
    : chooseDefaultTarget(branches);
  const currentBranch = await getCurrentBranch(worktreePath);
  const sourceBranch =
    requestedSource && branches.includes(requestedSource)
      ? requestedSource
      : currentBranch;

  const output = await execGit(
    [
      'log',
      '--reverse',
      '--pretty=format:%H%x09%h%x09%ad%x09%s',
      '--date=short',
      `${targetBranch}..${sourceBranch}`,
    ],
    worktreePath,
  );

  const commits = output
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const [hash, shortHash, authorDate, ...subjectParts] = line.split('\t');
      return {
        hash,
        shortHash,
        authorDate,
        subject: subjectParts.join('\t'),
      };
    });

  return { commits, sourceBranch, targetBranch };
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-review-api',
      configureServer(server) {
        server.middlewares.use('/local-api', async (req, res) => {
          try {
            const requestUrl = new URL(req.url || '/', 'http://localhost');
            const routePath = requestUrl.pathname;

            if (req.method === 'GET' && routePath === '/context') {
              const requestedWorktree = requestUrl.searchParams.get('worktree');
              const { selectedPath, worktrees } = await resolveWorktree(requestedWorktree);
              const branches = await listBranches(selectedPath);
              const currentBranch = await getCurrentBranch(selectedPath);
              sendJson(res, 200, {
                worktrees,
                currentWorktree: selectedPath,
                branches,
                currentBranch,
                defaultTargetBranch: chooseDefaultTarget(branches),
              });
              return;
            }

            if (req.method === 'GET' && routePath === '/diff') {
              const requestedWorktree = requestUrl.searchParams.get('worktree');
              const requestedTarget = requestUrl.searchParams.get('target');
              const requestedSource = requestUrl.searchParams.get('source');
              const { selectedPath } = await resolveWorktree(requestedWorktree);
              const bundle = await getDiffBundle(
                selectedPath,
                requestedTarget,
                requestedSource,
              );
              sendJson(res, 200, bundle);
              return;
            }

            if (req.method === 'GET' && routePath === '/commits') {
              const requestedWorktree = requestUrl.searchParams.get('worktree');
              const requestedTarget = requestUrl.searchParams.get('target');
              const requestedSource = requestUrl.searchParams.get('source');
              const { selectedPath } = await resolveWorktree(requestedWorktree);
              const result = await listCommits(
                selectedPath,
                requestedTarget,
                requestedSource,
              );
              sendJson(res, 200, result);
              return;
            }

            if (req.method === 'GET' && routePath === '/commit-diff') {
              const requestedWorktree = requestUrl.searchParams.get('worktree');
              const commit = requestUrl.searchParams.get('commit');
              if (!commit) {
                sendJson(res, 400, { error: 'commit is required' });
                return;
              }
              const { selectedPath } = await resolveWorktree(requestedWorktree);
              const diff = await execGit(
                ['show', '--no-color', '--format=', commit],
                selectedPath,
              );
              sendJson(res, 200, { diff });
              return;
            }

            if (req.method === 'GET' && routePath === '/sessions') {
              await ensureSessionsDir();
              const files = await fs.readdir(sessionsDir);
              const sessions = files
                .filter((file) => file.endsWith('.json'))
                .sort((a, b) => b.localeCompare(a));
              sendJson(res, 200, { sessions });
              return;
            }

            if (req.method === 'GET' && routePath.startsWith('/sessions/')) {
              const rawId = routePath.slice('/sessions/'.length);
              const id = safeId(rawId);
              if (!id) {
                sendJson(res, 400, { error: 'Invalid session id' });
                return;
              }

              await ensureSessionsDir();
              const filePath = path.join(sessionsDir, id);
              const content = await fs.readFile(filePath, 'utf-8');
              sendJson(res, 200, { session: JSON.parse(content) });
              return;
            }

            if (req.method === 'POST' && routePath === '/sessions') {
              const rawBody = await readBody(req);
              const payload = JSON.parse(rawBody) as SessionPayload;

              if (!payload.name) {
                sendJson(res, 400, { error: 'name is required' });
                return;
              }

              await ensureSessionsDir();
              const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
              const normalizedName = payload.name
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9-]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .slice(0, 50) || 'session';
              const fileName = `${timestamp}-${normalizedName}.json`;
              const filePath = path.join(sessionsDir, fileName);
              const session = {
                ...payload,
                threads: payload.threads || [],
                comments: payload.comments || [],
                createdAt: payload.createdAt || new Date().toISOString(),
              };
              await fs.writeFile(filePath, JSON.stringify(session, null, 2), 'utf-8');
              sendJson(res, 201, { fileName, path: `.review/sessions/${fileName}` });
              return;
            }

            sendJson(res, 404, { error: 'Not found' });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unexpected error';
            sendJson(res, 500, { error: message });
          }
        });
      },
    },
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
