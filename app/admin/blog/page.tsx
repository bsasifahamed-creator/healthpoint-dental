import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, Edit3, Plus, Trash2, Eye, EyeOff, FileText } from 'lucide-react';
import { AdminBackground } from '@/components/admin/admin-background';
import { AdminLogin } from '../login-form';
import { verifyAdminSession } from '@/lib/admin/session';
import { listAllBlogPosts, getBlogPost, upsertBlogPost, deleteBlogPost } from '@/lib/data-store';

export default async function AdminBlogPage(props: { searchParams?: Promise<Record<string, string>> }) {
  if (!verifyAdminSession()) return <AdminLogin />;

  const searchParams = await props.searchParams;
  const editId = searchParams?.id;

  const posts = await listAllBlogPosts();
  const editPost = editId ? await getBlogPost(editId) : null;

  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <AdminBackground />
      <header className="relative z-10 px-4 pt-6 sm:px-8">
        <div className="glass-card-strong mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 sm:flex-nowrap sm:gap-4 sm:px-7 sm:py-4">
          <div className="flex items-center gap-3">
            <Image src="/health point png logo.png" alt="" width={36} height={36} className="size-9 object-contain" priority />
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold uppercase tracking-[0.16em] text-ink">Health Point</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mid">Admin · Blog</p>
            </div>
          </div>
          <Link href="/admin" className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink transition-colors hover:text-teal">
            <ArrowLeft className="size-3.5" strokeWidth={1.75} />
            Back
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Manage Blog Posts<span className="text-teal">.</span>
            </h1>
            <p className="mt-1 text-sm text-ink-mid">Create, edit, or remove blog posts.</p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card mb-8 rounded-2xl border-white/45 p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">
            {editPost ? 'Edit Post' : 'New Post'}
          </h2>
          <form action={saveBlogAction} className="grid gap-4 sm:grid-cols-2">
            {editPost && <input type="hidden" name="id" value={editPost.id} />}
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Title</label>
              <input name="title" defaultValue={editPost?.title ?? ''} required
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" placeholder="How Often Should You Do Scaling and Polishing?" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Excerpt</label>
              <textarea name="excerpt" rows={2} defaultValue={editPost?.excerpt ?? ''}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim resize-none"
                placeholder="Short summary that appears in the blog listing..." />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Author</label>
              <input name="author" defaultValue={editPost?.author ?? 'Dr. Iqra'}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Author Role</label>
              <input name="authorRole" defaultValue={editPost?.authorRole ?? 'Lead Dentist'}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Category</label>
              <input name="category" defaultValue={editPost?.category ?? 'General'}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" placeholder="Preventive Care, Cosmetic..." />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Slug (URL path)</label>
              <input name="slug" defaultValue={editPost?.slug ?? ''}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim"
                placeholder="leave blank to auto-generate" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Content (HTML)</label>
              <textarea name="content" rows={12} defaultValue={editPost?.content ?? ''}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm font-mono text-ink outline-none placeholder:text-ink-dim resize-y"
                placeholder="<p>Write your blog post in HTML...</p>" />
              <p className="mt-1 text-[10px] text-ink-dim">HTML is supported. Use &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt; / &lt;li&gt; tags, etc.</p>
            </div>
            <div className="flex items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="published" defaultChecked={editPost?.published ?? true} value="1"
                  className="size-4 rounded border-white/40 bg-white/30 text-teal accent-teal" />
                <span className="text-xs font-semibold text-ink-mid">Published</span>
              </label>
            </div>
            <div className="flex items-center gap-3 pt-2 sm:col-span-2">
              {editPost && (
                <Link href="/admin/blog" className="glass-pill rounded-full px-4 py-2 text-xs font-semibold text-ink-mid transition-colors hover:text-ink">
                  Cancel
                </Link>
              )}
              <button type="submit" className="liquid-cta rounded-full px-6 py-2 text-xs font-semibold transition-all hover:scale-[1.02]">
                {editPost ? 'Save Changes' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>

        {/* Blog List */}
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="glass-card rounded-2xl border-white/45 p-4 transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 shrink-0 text-teal" strokeWidth={1.5} />
                    <p className="truncate font-display font-bold text-ink">{p.title}</p>
                    {!p.published && (
                      <span className="glass-pill inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold text-ink-mid uppercase">
                        <EyeOff className="size-2.5" strokeWidth={2} />
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-mid">
                    <span>{p.date}</span>
                    <span>{p.category}</span>
                    <span>{p.author}</span>
                    <span>{p.readTime}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link href={`/blog/${p.slug}`} target="_blank"
                    className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-teal transition-colors hover:text-teal/80">
                    <Eye className="size-3" strokeWidth={2} />
                    View
                  </Link>
                  <Link href={`/admin/blog?id=${p.id}`}
                    className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:text-teal">
                    <Edit3 className="size-3" strokeWidth={2} />
                    Edit
                  </Link>
                  <form action={deleteBlogAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit"
                      className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-red-500 transition-colors hover:text-red-600">
                      <Trash2 className="size-3" strokeWidth={2} />
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

async function saveBlogAction(formData: FormData) {
  'use server';
  const id = formData.get('id') as string | null;
  await upsertBlogPost({
    id: id || undefined,
    title: formData.get('title') as string,
    slug: formData.get('slug') as string || undefined,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    author: formData.get('author') as string,
    authorRole: formData.get('authorRole') as string,
    published: formData.get('published') === '1',
  });
  redirect('/admin/blog');
}

async function deleteBlogAction(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) await deleteBlogPost(id);
  redirect('/admin/blog');
}
