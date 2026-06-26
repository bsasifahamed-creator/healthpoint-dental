'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { verifyAdminSession } from '@/lib/admin/session';
import { runScraperAgent, ScraperConfigError } from './agent';
import { assertPublicHttpUrl } from './url-safety';
import { deleteRun as removeRun, upsertRun } from './store';
import type { ScrapeRun, ScrapeRunInput } from './types';

const scrapeInput = z.object({
  url: z.string().trim().url('Please enter a full URL including https://'),
  goal: z
    .string()
    .trim()
    .min(8, 'Describe what to extract in at least a short sentence.')
    .max(2000),
  label: z.string().trim().max(80).optional(),
});

function requireAdmin(): void {
  if (!verifyAdminSession()) throw new Error('Not authorised');
}

export async function runScrape(
  input: ScrapeRunInput,
): Promise<{ ok: true; run: ScrapeRun } | { ok: false; error: string }> {
  requireAdmin();

  const parsed = scrapeInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  try {
    assertPublicHttpUrl(parsed.data.url);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'URL not allowed.';
    return { ok: false, error: msg };
  }

  const startedAt = Date.now();
  const run: ScrapeRun = {
    id: randomUUID(),
    label: parsed.data.label?.trim() || null,
    url: parsed.data.url,
    goal: parsed.data.goal,
    status: 'running',
    data: [],
    notes: null,
    error: null,
    usage: null,
    createdAt: new Date().toISOString(),
    durationMs: null,
  };
  await upsertRun(run);

  try {
    const result = await runScraperAgent({ url: run.url, goal: run.goal });
    const completed: ScrapeRun = {
      ...run,
      status: 'success',
      data: result.data,
      notes: result.notes ?? (result.finalText ? result.finalText.slice(0, 400) : null),
      usage: result.usage,
      durationMs: Date.now() - startedAt,
    };
    await upsertRun(completed);
    revalidatePath('/admin/scraper');
    return { ok: true, run: completed };
  } catch (err) {
    const message =
      err instanceof ScraperConfigError
        ? err.message
        : err instanceof Error
          ? err.message
          : 'Scrape failed for an unknown reason.';
    const failed: ScrapeRun = {
      ...run,
      status: 'error',
      error: message,
      durationMs: Date.now() - startedAt,
    };
    await upsertRun(failed);
    revalidatePath('/admin/scraper');
    return { ok: false, error: message };
  }
}

export async function deleteScrapeRun(id: string): Promise<{ ok: true }> {
  requireAdmin();
  await removeRun(id);
  revalidatePath('/admin/scraper');
  return { ok: true };
}
