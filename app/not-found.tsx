import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-bg px-4">
      <div className="mx-auto max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal font-semibold">
          Page not found
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink tracking-[-0.02em]">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-sm text-ink-mid leading-relaxed">
          The link may be broken or the page was removed. You can return to the homepage.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-teal to-green px-6 py-2.5 text-sm font-semibold text-white shadow-soft"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
