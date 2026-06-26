/**
 * Cross-restart persistence for scraper runs. Prefers a JSON file on disk
 * (works in `next dev` + most VPS deploys) but transparently falls back to
 * an in-memory cache when the FS is read-only (eg. serverless).
 *
 * This is intentionally tiny: the admin will rarely have more than a few
 * dozen runs, so an in-memory + file roundtrip per write is fine.
 */
import { promises as fs } from 'fs';
import path from 'path';
import type { ScrapeRun } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'scrapes.json');

type MemoryStore = { runs: ScrapeRun[]; loaded: boolean; fsBroken: boolean };

const memory: MemoryStore = {
  runs: [],
  loaded: false,
  fsBroken: false,
};

async function ensureLoaded(): Promise<void> {
  if (memory.loaded) return;
  memory.loaded = true;
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as { runs?: ScrapeRun[] };
    memory.runs = Array.isArray(parsed.runs) ? parsed.runs : [];
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code && code !== 'ENOENT') memory.fsBroken = true;
    memory.runs = [];
  }
}

async function flush(): Promise<void> {
  if (memory.fsBroken) return;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      STORE_PATH,
      JSON.stringify({ runs: memory.runs }, null, 2),
      'utf8',
    );
  } catch {
    memory.fsBroken = true;
  }
}

export async function listRuns(): Promise<ScrapeRun[]> {
  await ensureLoaded();
  return [...memory.runs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getRun(id: string): Promise<ScrapeRun | null> {
  await ensureLoaded();
  return memory.runs.find((r) => r.id === id) ?? null;
}

export async function upsertRun(run: ScrapeRun): Promise<ScrapeRun> {
  await ensureLoaded();
  const idx = memory.runs.findIndex((r) => r.id === run.id);
  if (idx === -1) memory.runs.unshift(run);
  else memory.runs[idx] = run;
  await flush();
  return run;
}

export async function deleteRun(id: string): Promise<void> {
  await ensureLoaded();
  memory.runs = memory.runs.filter((r) => r.id !== id);
  await flush();
}

export async function clearRuns(): Promise<void> {
  await ensureLoaded();
  memory.runs = [];
  await flush();
}
