import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
import { Nav } from '@/components/chrome/nav';
import { Footer } from '@/components/footer/footer';
import { ShaderBackground } from '@/components/ui/shaders-hero-section';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog/posts';
import { getBlogPost } from '@/lib/data-store';

export const dynamicParams = true;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const storePost = await getBlogPost(slug);
  const hardcoded = getPostBySlug(slug);
  const post = storePost ?? hardcoded;
  if (!post) return { title: 'Article not found — Health Point Dental' };
  return { title: `${post.title} — Health Point Dental`, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const storePost = await getBlogPost(slug);
  const hardcoded = getPostBySlug(slug);
  const isStore = !!storePost;
  const post = storePost ?? hardcoded;
  if (!post) notFound();

  const related = hardcoded ? getRelatedPosts(slug, 3) : [];

  return (
    <ShaderBackground>
      <main className="relative bg-transparent">
        <Nav />

        <section className="relative z-10 px-6 pb-8 pt-28 lg:px-12 lg:pb-12 lg:pt-32">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-teal mb-6">
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
              All articles
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="glass-pill rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-teal">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
                <Clock className="size-3" strokeWidth={2} aria-hidden />
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
                <Calendar className="size-3" strokeWidth={2} aria-hidden />
                {formatDate(post.date)}
              </span>
            </div>

            <h1 className="mb-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
              {post.title}
            </h1>

            <div className="mb-8 flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-teal to-green font-display text-base font-bold text-white shadow-medium">
                {post.author.replace('Dr. ', '').split(' ').map((s) => s[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-ink leading-tight">{post.author}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink font-semibold">
                  {post.authorRole} · Health Point Dental
                </p>
              </div>
            </div>

            {!isStore && 'hero' in post && (
              <div className={`flex h-44 sm:h-56 items-center justify-center rounded-3xl bg-gradient-to-br ${(post as typeof blogPosts[number]).hero.gradient} glass-card`} aria-hidden>
                <span className="text-[clamp(4.5rem,12vw,7rem)] leading-none drop-shadow-[0_10px_28px_rgba(0,90,90,0.22)]">
                  {(post as typeof blogPosts[number]).hero.emoji}
                </span>
              </div>
            )}
          </div>
        </section>

        <article className="relative z-10 px-6 pb-16 lg:px-12 lg:pb-20">
          <div className="mx-auto max-w-3xl">
            {'content' in post ? (
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
              />
            ) : (
              <>
                <p className="mb-10 text-lg leading-[1.75] text-ink font-medium">{post.intro}</p>
                <div className="space-y-10">
                  {post.sections.map((section, i) => (
                    <section key={i}>
                      {section.heading ? (
                        <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-ink">{section.heading}</h2>
                      ) : null}
                      {section.paragraphs?.map((p, j) => (
                        <p key={j} className="mb-4 text-base leading-[1.78] text-ink-mid">{p}</p>
                      ))}
                      {section.list?.length ? (
                        <ul className="mb-2 space-y-2.5">
                          {section.list.map((item, j) => (
                            <li key={j} className="flex gap-3 text-base leading-[1.7] text-ink-mid">
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.callout ? (
                        <aside className="glass-card-strong my-4 rounded-2xl p-5">
                          <div className="flex items-start gap-3">
                            <div className="glass-pill grid size-10 shrink-0 place-items-center rounded-xl">
                              <Lightbulb className="size-5 text-teal" strokeWidth={1.8} aria-hidden />
                            </div>
                            <div>
                              <p className="mb-1 font-display text-base font-bold text-ink">{section.callout.title}</p>
                              <p className="text-sm leading-[1.65] text-ink-mid">{section.callout.body}</p>
                            </div>
                          </div>
                        </aside>
                      ) : null}
                    </section>
                  ))}
                </div>
              </>
            )}

            <div className="glass-card-strong mt-12 rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="max-w-md">
                  <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">Next step</p>
                  <h3 className="font-display text-xl font-extrabold leading-tight text-ink">
                    {'cta' in post ? post.cta : 'Book your appointment'}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.6] text-ink-mid">
                    Walk-ins welcome daily 1 PM – 9 PM. Or call{' '}
                    <a href="tel:+971585886915" className="font-semibold text-teal hover:underline">+971 58 588 6915</a>{' '}
                    to chat with our front desk.
                  </p>
                </div>
                <Link href="/#contact" className="glass-pill inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5">
                  Get in touch
                  <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {related.length ? (
          <section className="relative z-10 px-6 pb-16 lg:px-12 lg:pb-24">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-6 font-display text-xl font-bold text-ink">Keep reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="glass-card group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-card-hover">
                    <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${r.hero.gradient}`} aria-hidden>
                      <span className="text-4xl drop-shadow-[0_4px_10px_rgba(0,90,90,0.18)]">{r.hero.emoji}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-teal">{r.category}</p>
                      <h3 className="mb-2 font-display text-base font-bold leading-tight text-ink">{r.title}</h3>
                      <p className="flex-1 text-xs leading-[1.6] text-ink-mid line-clamp-3">{r.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal transition-all group-hover:gap-2">
                        Read article
                        <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <Footer />
      </main>
    </ShaderBackground>
  );
}
