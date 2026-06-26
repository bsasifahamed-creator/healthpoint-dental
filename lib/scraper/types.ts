/**
 * Domain types for the admin web-scraper (fetch + Cheerio; optional Gemini).
 */

/** Detects key-free snapshot runs for admin UI copy. */
export const KEY_FREE_SNAPSHOT_PREFIX = '[key-free snapshot]' as const;
export type ScrapeStatus = 'pending' | 'running' | 'success' | 'error';

export interface ScrapedItem {
  /** Free-form scraped record. The agent decides the shape per goal. */
  [key: string]: unknown;
}

export interface ScrapeRun {
  id: string;
  /** Optional human label so the operator can group runs ("Competitor pricing", etc.) */
  label: string | null;
  url: string;
  goal: string;
  status: ScrapeStatus;
  /** Array of structured records returned by the agent. */
  data: ScrapedItem[];
  /** Free-form note: errors, blocks, captcha explanations, etc. */
  notes: string | null;
  /** Top-level error message if the run failed. */
  error: string | null;
  /** Best-effort token usage stats from the agent session. */
  usage: {
    inputTokens: number;
    outputTokens: number;
  } | null;
  createdAt: string;
  /** Wall-clock duration in milliseconds. */
  durationMs: number | null;
}

export interface ScrapeRunInput {
  url: string;
  goal: string;
  label?: string;
}
