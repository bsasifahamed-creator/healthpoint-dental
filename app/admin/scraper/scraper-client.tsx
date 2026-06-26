'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  Loader2,
  Sparkles,
  Trash2,
  XCircle,
} from 'lucide-react';
import { runScrape, deleteScrapeRun } from '@/lib/scraper/actions';
import {
  KEY_FREE_SNAPSHOT_PREFIX,
  type ScrapeRun,
  type ScrapedItem,
} from '@/lib/scraper/types';

interface Props {
  initialRuns: ScrapeRun[];
  /** When true, Gemini reshapes extraction; otherwise Cheerio snapshot only. */
  hasGemini: boolean;
}

export function ScraperClient({ initialRuns, hasGemini }: Props) {
  const [runs, setRuns] = useState<ScrapeRun[]>(initialRuns);
  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState('');
  const [label, setLabel] = useState('');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<ScrapeRun | null>(initialRuns[0] ?? null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await runScrape({
        url: url.trim(),
        goal: goal.trim(),
        label: label.trim() || undefined,
      });
      if (res.ok) {
        setRuns((prev) => [res.run, ...prev.filter((r) => r.id !== res.run.id)]);
        setActive(res.run);
        setUrl('');
        setGoal('');
        setLabel('');
      } else {
        setError(res.error);
      }
    });
  };

  const onDelete = (id: string) => {
    startTransition(async () => {
      await deleteScrapeRun(id);
      setRuns((prev) => prev.filter((r) => r.id !== id));
      if (active?.id === id) setActive(null);
    });
  };

  return (
    <>
      <header className="relative z-10 px-4 pt-6 sm:px-8">
        <div className="glass-card-strong mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 sm:flex-nowrap sm:gap-4 sm:px-7 sm:py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/health point png logo.png"
              alt=""
              width={36}
              height={36}
              className="size-9 object-contain"
              priority
            />
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold uppercase tracking-[0.16em] text-ink">
                Health Point
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mid">
                Admin · Web Scraper
              </p>
            </div>
          </div>

          <Link
            href="/admin"
            className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink transition-colors hover:text-teal"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.75} />
            Bookings
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-6 flex flex-col gap-2">
          <div className="glass-pill inline-flex w-fit items-center gap-2 rounded-full px-3 py-1">
            <Sparkles className="size-3.5 text-teal" strokeWidth={1.75} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
              {hasGemini
                ? 'Cheerio + Google Gemini (optional key)'
                : 'Key-free · Cheerio snapshot'}
            </span>
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Web scraper<span className="text-teal">.</span>
          </h1>
          <p className="max-w-2xl text-sm text-ink-mid">
            Runs with <strong className="font-semibold text-ink">no API keys</strong>: we fetch
            the page and save a structured snapshot (title, meta, text preview, link
            samples). If you later add{' '}
            <code className="rounded bg-white/50 px-1 font-mono text-[11px]">GEMINI_API_KEY</code>,
            the same form can use Gemini to shape rows to your goal — still optional.
          </p>
        </div>

        {!hasGemini ? (
          <div className="mb-6 rounded-3xl border border-teal-200/60 bg-white/45 px-5 py-4 text-sm text-ink backdrop-blur-sm">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <Globe className="size-4 text-teal" strokeWidth={2} />
              Snapshot mode is active
            </p>
            <p className="mt-1 text-ink-mid">
              Scrapes work now without configuring anything. Add{' '}
              <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-[11px]">
                GEMINI_API_KEY
              </code>{' '}
              only if you want AI to map the page into custom columns.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* Run a scrape */}
          <section className="glass-card-strong rounded-3xl p-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Run a scrape
            </h2>
            <p className="mt-1 text-sm text-ink-mid">
              Gemini infers fields automatically. Be specific about what you
              want and the agent will return clean structured rows.
            </p>

            <form className="mt-5 space-y-4" onSubmit={onSubmit}>
              <Field label="Target URL" htmlFor="scrape-url">
                <div className="glass-pill flex items-center gap-2 rounded-2xl px-4 py-3">
                  <Globe className="size-4 shrink-0 text-ink-mid" strokeWidth={1.75} />
                  <input
                    id="scrape-url"
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/products"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim"
                  />
                </div>
              </Field>

              <Field label="What should we extract?" htmlFor="scrape-goal">
                <div className="glass-pill rounded-2xl px-4 py-3">
                  <textarea
                    id="scrape-goal"
                    required
                    rows={4}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g. Each product card: name, current price, original price, rating, in_stock (boolean), product URL."
                    className="w-full resize-none bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim"
                  />
                </div>
              </Field>

              <Field label="Label (optional)" htmlFor="scrape-label">
                <div className="glass-pill rounded-2xl px-4 py-3">
                  <input
                    id="scrape-label"
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Competitor pricing — Acme"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim"
                  />
                </div>
              </Field>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm font-medium text-red-700 backdrop-blur-sm">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className="liquid-cta group inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                    {hasGemini ? 'Asking Gemini…' : 'Fetching snapshot…'}
                  </>
                ) : (
                  <>
                    {hasGemini ? 'Run scrape' : 'Run snapshot scrape'}
                    <Sparkles className="size-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Latest result */}
          <section className="glass-card-strong rounded-3xl p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-ink">
                Latest result
              </h2>
              {active ? <StatusBadge status={active.status} /> : null}
            </div>

            {pending && !active ? (
              <SkeletonResult />
            ) : !active ? (
              <p className="mt-3 text-sm text-ink-mid">
                Kick off your first scrape on the left. Results appear as soon as
                the server finishes fetching and parsing the page.
              </p>
            ) : (
              <ActiveRun run={active} />
            )}
          </section>
        </div>

        {/* History */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">
              Run history
            </h2>
            <span className="glass-pill rounded-full px-3 py-1 text-[11px] font-semibold text-ink">
              {runs.length} run{runs.length === 1 ? '' : 's'}
            </span>
          </div>

          {runs.length === 0 ? (
            <div className="glass-card rounded-3xl px-6 py-10 text-center">
              <p className="font-display text-lg font-bold text-ink">
                No runs yet
              </p>
              <p className="mt-1 text-sm text-ink-mid">
                Scraped data is saved here so you can revisit it any time.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {runs.map((run) => {
                const isOpen = expanded.has(run.id);
                return (
                  <article
                    key={run.id}
                    className="glass-card overflow-hidden rounded-3xl"
                  >
                    <header className="flex flex-wrap items-center gap-3 px-5 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          const next = new Set(expanded);
                          if (isOpen) next.delete(run.id);
                          else next.add(run.id);
                          setExpanded(next);
                          setActive(run);
                        }}
                        className="flex flex-1 items-center gap-3 text-left"
                      >
                        {isOpen ? (
                          <ChevronDown className="size-4 text-ink-mid" strokeWidth={1.75} />
                        ) : (
                          <ChevronRight className="size-4 text-ink-mid" strokeWidth={1.75} />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-ink">
                            {run.label ?? truncateUrl(run.url)}
                          </p>
                          <p className="truncate text-xs text-ink-mid">
                            {run.url}
                          </p>
                        </div>
                      </button>

                      <StatusBadge status={run.status} />
                      <span className="hidden text-[11px] font-medium text-ink-mid sm:inline">
                        {run.data.length} item{run.data.length === 1 ? '' : 's'}
                      </span>
                      <span className="hidden items-center gap-1 text-[11px] font-medium text-ink-mid md:inline-flex">
                        <Clock className="size-3" strokeWidth={1.75} />
                        {relativeTime(run.createdAt)}
                      </span>

                      <button
                        type="button"
                        onClick={() => onDelete(run.id)}
                        className="glass-pill inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-red-600 transition-colors hover:text-red-700"
                        aria-label="Delete run"
                      >
                        <Trash2 className="size-3" strokeWidth={2} />
                      </button>
                    </header>

                    {isOpen ? (
                      <div className="border-t border-white/40 px-5 py-4">
                        <ActiveRun run={run} compact />
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                       */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: ScrapeRun['status'] }) {
  const map = {
    pending: { label: 'Queued', classes: 'text-ink-mid', Icon: Clock },
    running: { label: 'Running', classes: 'text-teal', Icon: Loader2 },
    success: { label: 'Success', classes: 'text-green', Icon: CheckCircle2 },
    error: { label: 'Failed', classes: 'text-red-500', Icon: XCircle },
  } as const;
  const m = map[status];
  const Icon = m.Icon;
  return (
    <span
      className={`glass-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${m.classes}`}
    >
      <Icon
        className={`size-3 ${status === 'running' ? 'animate-spin' : ''}`}
        strokeWidth={2}
      />
      {m.label}
    </span>
  );
}

function SkeletonResult() {
  return (
    <div className="mt-4 space-y-3">
      <div className="skeleton h-4 w-1/2" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-32 w-full rounded-2xl" />
    </div>
  );
}

function ActiveRun({ run, compact = false }: { run: ScrapeRun; compact?: boolean }) {
  const columns = useMemo(() => deriveColumns(run.data), [run.data]);

  return (
    <div className={compact ? '' : 'mt-4'}>
      <dl className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <Meta label="Items" value={String(run.data.length)} />
        <Meta
          label="Duration"
          value={run.durationMs != null ? `${(run.durationMs / 1000).toFixed(1)}s` : '—'}
        />
        <Meta
          label="Tokens"
          value={
            run.usage
              ? `${run.usage.inputTokens}↑ / ${run.usage.outputTokens}↓`
              : '—'
          }
        />
        <Meta label="When" value={relativeTime(run.createdAt)} />
      </dl>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-mid">
        <Globe className="size-3" strokeWidth={1.75} />
        <a
          href={run.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 truncate text-teal hover:underline"
        >
          {truncateUrl(run.url)}
          <ExternalLink className="size-3" strokeWidth={1.75} />
        </a>
      </p>

      {run.notes ? (
        <p className="mt-3 rounded-2xl border border-white/40 bg-white/40 px-3 py-2 text-xs text-ink-mid backdrop-blur-sm">
          <span className="font-semibold text-ink">Notes · </span>
          {run.notes}
        </p>
      ) : null}

      {run.error ? (
        <p className="mt-3 rounded-2xl border border-red-200 bg-red-50/80 px-3 py-2 text-xs font-medium text-red-700">
          {run.error}
        </p>
      ) : null}

      {run.data.length > 0 ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/40">
          <div className="max-h-80 overflow-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white/55 backdrop-blur-sm">
                <tr className="border-b border-white/40 text-[10px] uppercase tracking-[0.14em] text-ink-mid">
                  {columns.map((c) => (
                    <th key={c} className="px-3 py-2 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {run.data.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/25 align-top last:border-0 hover:bg-white/30"
                  >
                    {columns.map((c) => (
                      <td key={c} className="max-w-[220px] px-3 py-2 text-ink">
                        <CellValue value={(row as ScrapedItem)[c]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : run.status === 'success' ? (
        <p className="mt-4 text-xs text-ink-mid">
          {run.notes?.startsWith(KEY_FREE_SNAPSHOT_PREFIX)
            ? 'Snapshot completed but returned no tabular rows. Check notes for fetch or SPA limitations.'
            : 'Extraction finished but returned no rows. Check the notes above — many SPAs need client-side rendering.'}
        </p>
      ) : null}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-pill rounded-2xl px-3 py-2">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-mid">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}

function CellValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) {
    return <span className="text-ink-dim">—</span>;
  }
  if (typeof value === 'boolean') {
    return value ? (
      <span className="text-green">✓</span>
    ) : (
      <span className="text-red-500">✗</span>
    );
  }
  if (typeof value === 'string' && /^https?:\/\//.test(value)) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-teal hover:underline"
      >
        {truncateUrl(value)}
        <ExternalLink className="size-3" strokeWidth={1.75} />
      </a>
    );
  }
  if (typeof value === 'object') {
    return (
      <code className="block max-h-20 overflow-auto whitespace-pre-wrap text-[11px] text-ink-mid">
        {JSON.stringify(value, null, 0)}
      </code>
    );
  }
  return <span>{String(value)}</span>;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function deriveColumns(rows: ScrapedItem[]): string[] {
  const cols = new Set<string>();
  for (const row of rows.slice(0, 30)) {
    if (row && typeof row === 'object') {
      for (const key of Object.keys(row)) cols.add(key);
    }
  }
  return Array.from(cols).slice(0, 8);
}

function truncateUrl(url: string, max = 56): string {
  if (url.length <= max) return url;
  return `${url.slice(0, max - 1)}…`;
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const sec = Math.round(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  return `${day}d ago`;
}
