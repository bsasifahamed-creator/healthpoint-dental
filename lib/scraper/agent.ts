/**
 * Web scraper: fetches HTML, parses with Cheerio, optionally shapes output with
 * Google Gemini when GEMINI_API_KEY is set. With no key, runs in **snapshot
 * mode** (same fetch + condense, structured row + link notes) — no external
 * APIs and nothing to paste into .env.
 *
 * Limitation: raw HTML only; SPAs may return little content (surfaced in notes).
 */
import * as cheerio from 'cheerio';
import { KEY_FREE_SNAPSHOT_PREFIX, type ScrapedItem } from './types';
import { assertPublicHttpUrl } from './url-safety';

export interface AgentResult {
  data: ScrapedItem[];
  notes: string | null;
  finalText: string;
  usage: { inputTokens: number; outputTokens: number } | null;
}

export class ScraperConfigError extends Error {}

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const MAX_TEXT_CHARS = 48_000;
const MAX_JSONLD_CHARS = 8_000;
const MAX_LINKS = 120;
const MAX_NOTES_CHARS = 14_000;

interface CondensedPage {
  title: string;
  description: string;
  text: string;
  jsonLd: string[];
  links: Array<{ href: string; text: string }>;
  htmlLength: number;
  warning: string | null;
}

async function fetchPage(url: string): Promise<{ html: string; finalUrl: string }> {
  const res = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
    },
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch page (${res.status} ${res.statusText}).`);
  }

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('text') && !contentType.includes('html')) {
    throw new Error(`Unsupported content type: ${contentType || 'unknown'}`);
  }

  return { html: await res.text(), finalUrl: res.url || url };
}

function condense(html: string, sourceUrl: string): CondensedPage {
  const $ = cheerio.load(html);
  const htmlLength = html.length;

  const jsonLd: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const t = $(el).text().trim();
    if (t) jsonLd.push(t);
  });

  $('script, style, noscript, svg, iframe').remove();

  const title = $('title').first().text().trim().slice(0, 200);
  const description =
    $('meta[name="description"]').attr('content')?.trim().slice(0, 400) ??
    $('meta[property="og:description"]').attr('content')?.trim().slice(0, 400) ??
    '';

  const main =
    $('main').first().text() ||
    $('article').first().text() ||
    $('body').text();

  const text = main.replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_CHARS);

  const links: CondensedPage['links'] = [];
  $('a[href]').each((_, el) => {
    if (links.length >= MAX_LINKS) return;
    const href = $(el).attr('href');
    if (!href) return;
    let resolved = href;
    try {
      resolved = new URL(href, sourceUrl).toString();
    } catch {
      return;
    }
    const linkText = $(el).text().replace(/\s+/g, ' ').trim().slice(0, 120);
    if (linkText) links.push({ href: resolved, text: linkText });
  });

  const jsonLdJoined = jsonLd.join('\n').slice(0, MAX_JSONLD_CHARS);

  let warning: string | null = null;
  if (text.length < 200 && jsonLd.length === 0) {
    warning =
      'The page returned very little static HTML — it may be a JavaScript-rendered SPA. ' +
      'This scraper does not execute JS, so content may be limited.';
  }

  return {
    title,
    description,
    text,
    jsonLd: jsonLdJoined ? [jsonLdJoined] : [],
    links,
    htmlLength,
    warning,
  };
}

function buildSnapshotNotes(page: CondensedPage, goal: string): string {
  const header = [
    `${KEY_FREE_SNAPSHOT_PREFIX} Static HTML only (Cheerio). No API keys.`,
    `Your extraction goal (for your reference): ${goal}`,
    page.warning,
  ]
    .filter(Boolean)
    .join('\n\n');

  const linkBlock = page.links
    .slice(0, 45)
    .map((l) => `- ${l.text}: ${l.href}`)
    .join('\n');

  const tail = linkBlock ? `\n\n--- Sample outbound links (up to 45) ---\n${linkBlock}` : '';

  const full = `${header}${tail}`;
  if (full.length <= MAX_NOTES_CHARS) return full;
  return `${header}${tail.slice(0, MAX_NOTES_CHARS - header.length - 20)}\n…(trimmed)`;
}

async function runScraperSnapshotOnly({
  url,
  goal,
}: {
  url: string;
  goal: string;
}): Promise<AgentResult> {
  const { html, finalUrl } = await fetchPage(url);
  const page = condense(html, finalUrl);

  const jsonLdSnippet = page.jsonLd[0]?.slice(0, 6_000) ?? null;

  const row: ScrapedItem = {
    pageUrl: finalUrl,
    title: page.title || null,
    metaDescription: page.description || null,
    textPreview: page.text ? page.text.slice(0, 4_000) : null,
    htmlLength: page.htmlLength,
    outboundLinksFound: page.links.length,
    jsonLdPresent: page.jsonLd.length > 0,
    jsonLdSnippet,
    extractionGoalEcho: goal,
  };

  const notes = buildSnapshotNotes(page, goal);
  const finalText = JSON.stringify({ mode: 'snapshot', row }, null, 2);

  return {
    data: [row],
    notes,
    finalText,
    usage: null,
  };
}

function buildPrompt(input: {
  url: string;
  goal: string;
  page: CondensedPage;
}): string {
  const { url, goal, page } = input;

  const linkBlock = page.links
    .slice(0, MAX_LINKS)
    .map((l) => `- [${l.text}](${l.href})`)
    .join('\n');

  return [
    `URL: ${url}`,
    `Title: ${page.title || '(none)'}`,
    page.description ? `Description: ${page.description}` : null,
    page.warning ? `WARNING: ${page.warning}` : null,
    '',
    'Extraction goal:',
    goal,
    '',
    page.jsonLd.length
      ? '--- JSON-LD structured data (use first if useful) ---\n' + page.jsonLd.join('\n---\n')
      : null,
    '',
    '--- Page text (condensed) ---',
    page.text || '(no static text — likely a JS-rendered SPA)',
    '',
    linkBlock
      ? '--- Outbound links (first ' + Math.min(page.links.length, MAX_LINKS) + ') ---\n' + linkBlock
      : null,
    '',
    'Respond with JSON of the shape:',
    '{ "data": [ { ...one object per extracted record... } ], "notes": "string or null" }',
    'Rules:',
    '- "data" MUST be an array of objects (use [] if nothing usable).',
    '- Use null for any missing field.',
    '- Keep notes brief; only set it when something is wrong or noteworthy.',
  ]
    .filter(Boolean)
    .join('\n');
}

function normalise(raw: string): { data: ScrapedItem[]; notes: string | null } {
  const tryParse = (s: string): unknown => {
    try {
      return JSON.parse(s);
    } catch {
      return undefined;
    }
  };

  const candidates: string[] = [raw];
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) candidates.unshift(fence[1].trim());

  for (const c of candidates) {
    const parsed = tryParse(c);
    if (Array.isArray(parsed)) {
      return { data: parsed as ScrapedItem[], notes: null };
    }
    if (parsed && typeof parsed === 'object') {
      const obj = parsed as Record<string, unknown>;
      const list = obj.data ?? obj.items ?? obj.results;
      const notes =
        typeof obj.notes === 'string'
          ? obj.notes
          : typeof obj.note === 'string'
            ? (obj.note as string)
            : null;
      if (Array.isArray(list)) {
        return { data: list as ScrapedItem[], notes };
      }
    }
  }

  return { data: [], notes: null };
}

async function runGeminiScrape({ url, goal }: { url: string; goal: string }): Promise<AgentResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new ScraperConfigError('GEMINI_API_KEY is not set.');
  }

  const { GoogleGenerativeAI } = await import('@google/generative-ai');

  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction:
      'You are a web scraping assistant. Given a condensed page snapshot and ' +
      "an extraction goal, return only valid JSON matching the user's schema. " +
      'Never invent values — use null when a field is unavailable. If the page ' +
      'looks blocked (login, captcha, anti-bot, or empty SPA shell), explain ' +
      'in the notes field.',
  });

  const { html, finalUrl } = await fetchPage(url);
  const page = condense(html, finalUrl);
  const prompt = buildPrompt({ url: finalUrl, goal, page });

  const generationConfig = {
    responseMimeType: 'application/json' as const,
    temperature: 0.2,
    maxOutputTokens: 8192,
  };

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig,
  });

  const response = result.response;
  const finalText = response.text();
  const { data, notes: parsedNotes } = normalise(finalText);
  const mergedNotes = parsedNotes ?? (page.warning ? page.warning : null);

  const usage = response.usageMetadata
    ? {
        inputTokens: response.usageMetadata.promptTokenCount ?? 0,
        outputTokens: response.usageMetadata.candidatesTokenCount ?? 0,
      }
    : null;

  return { data, notes: mergedNotes, finalText, usage };
}

export async function runScraperAgent({
  url,
  goal,
}: {
  url: string;
  goal: string;
}): Promise<AgentResult> {
  assertPublicHttpUrl(url);
  if (!process.env.GEMINI_API_KEY?.trim()) {
    return runScraperSnapshotOnly({ url, goal });
  }
  return runGeminiScrape({ url, goal });
}
