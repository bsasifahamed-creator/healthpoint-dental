import Link from 'next/link';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/footer/footer';
import { ShaderBackground } from '@/components/ui/shaders-hero-section';
import { blogPosts as hardcodedPosts } from '@/lib/blog/posts';
import { listBlogPosts } from '@/lib/data-store';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const metadata = {
  title: 'Blog — Health Point Dental',
  description: 'Practical, jargon-free dental guides: treatment options, recovery, prevention, and pricing for patients in Dubai.',
};

export default async function BlogPage() {
  const storePosts = await listBlogPosts();

  const allPosts = [
    ...storePosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      readTime: p.readTime,
      date: p.date,
      author: p.author,
      authorRole: p.authorRole,
      hero: { gradient: 'from-teal/35 via-teal/15 to-transparent', emoji: '' },
      isStore: true,
    })),
    ...hardcodedPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      readTime: p.readTime,
      date: p.date,
      author: p.author,
      authorRole: p.authorRole,
      hero: p.hero,
      isStore: false,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [feature, ...rest] = allPosts;

  return (
    <ShaderBackground>
      <main className="relative bg-transparent">

        <section className="relative z-10 px-6 pb-12 pt-28 lg:px-12 lg:pb-16 lg:pt-34">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Health Point Journal
            </p>
            <h1 className="mb-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink">
              Dental education,{' '}
              <span className="text-teal">without jargon</span>
              <span className="text-teal">.</span>
            </h1>
            <p className="max-w-2xl text-base leading-[1.65] text-ink-mid">
              Practical guides on treatments, recovery, prevention, and pricing — written by our
              dentists for patients, not other dentists.
            </p>
          </div>
        </section>

        {/* Featured post */}
        {feature && (
          <section className="relative z-10 px-6 pb-10 lg:px-12 lg:pb-14">
            <div className="mx-auto max-w-7xl">
              <Link
                href={`/blog/${feature.slug}`}
                className="glass-card-strong group block overflow-hidden rounded-3xl transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1.4fr] gap-0">
                  {'hero' in feature && !feature.isStore ? (
                    <div
                      className={`relative flex items-center justify-center bg-gradient-to-br ${(feature as unknown as typeof hardcodedPosts[number] & { hero: { gradient: string; emoji: string } }).hero.gradient} min-h-[220px] md:min-h-[320px] p-8`}
                      aria-hidden
                    >
                      <span className="text-[clamp(5rem,12vw,8rem)] leading-none drop-shadow-[0_8px_30px_rgba(0,90,90,0.20)]">
                        {(feature as unknown as typeof hardcodedPosts[number] & { hero: { gradient: string; emoji: string } }).hero.emoji}
                      </span>
                    </div>
                  ) : (
                    <div className="flex min-h-[220px] items-center justify-center bg-gradient-to-br from-teal/35 via-teal/15 to-transparent p-8 md:min-h-[320px]">
                      <span className="text-[clamp(3rem,8vw,6rem)] leading-none text-teal/30 font-display font-extrabold">
                        {feature.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="glass-pill rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-teal">
                        Featured · {feature.category}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
                        <Clock className="size-3" strokeWidth={2} aria-hidden />
                        {feature.readTime}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
                        <Calendar className="size-3" strokeWidth={2} aria-hidden />
                        {formatDate(feature.date)}
                      </span>
                    </div>
                    <h2 className="mb-3 font-display text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-ink">
                      {feature.title}
                    </h2>
                    <p className="mb-5 text-sm md:text-base leading-[1.65] text-ink-mid">
                      {feature.excerpt}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-teal to-green font-display text-sm font-bold text-white">
                          {feature.author.replace('Dr. ', '').split(' ').map((s) => s[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-ink leading-tight">{feature.author}</p>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-ink">{feature.authorRole}</p>
                        </div>
                      </div>
                      <span className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink transition-all group-hover:text-teal">
                        Read article
                        <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Grid of remaining posts */}
        <section className="relative z-10 px-6 pb-16 lg:px-12 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-xl font-bold text-ink">More from the journal</h2>
              <span className="font-mono text-xs uppercase tracking-wider text-ink">
                {rest.length} articles
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass-card group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  {'hero' in post && !post.isStore ? (
                    <div
                      className={`flex h-32 items-center justify-center bg-gradient-to-br ${(post as unknown as typeof hardcodedPosts[number] & { hero: { gradient: string; emoji: string } }).hero.gradient}`}
                      aria-hidden
                    >
                      <span className="text-5xl drop-shadow-[0_4px_12px_rgba(0,90,90,0.18)]">
                        {(post as unknown as typeof hardcodedPosts[number] & { hero: { gradient: string; emoji: string } }).hero.emoji}
                      </span>
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center bg-gradient-to-br from-teal/25 via-teal/10 to-transparent" aria-hidden>
                      <span className="text-4xl text-teal/30 font-display font-extrabold">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-teal">{post.category}</span>
                      <span className="font-mono text-[10px] text-ink">·</span>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">{post.readTime}</span>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-bold leading-tight text-ink">{post.title}</h3>
                    <p className="mb-4 flex-1 text-sm leading-[1.6] text-ink-mid">{post.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-stroke pt-3">
                      <span className="text-xs font-semibold text-ink">{post.author}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal transition-all group-hover:gap-2">
                        Read
                        <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ShaderBackground>
  );
}
