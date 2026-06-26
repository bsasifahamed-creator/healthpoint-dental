import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, Edit3, Plus, Trash2, Sparkles } from 'lucide-react';
import { AdminBackground } from '@/components/admin/admin-background';
import { AdminLogin } from '../login-form';
import { verifyAdminSession } from '@/lib/admin/session';
import { listAllServices, getService, upsertService, deleteService, bulkUpdateServices } from '@/lib/data-store';

export default async function AdminServicesPage(props: { searchParams?: Promise<Record<string, string>> }) {
  if (!verifyAdminSession()) return <AdminLogin />;

  const searchParams = await props.searchParams;
  const editKey = searchParams?.key;

  const services = await listAllServices();
  const editService = editKey ? await getService(editKey) : null;

  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <AdminBackground />
      <header className="relative z-10 px-4 pt-6 sm:px-8">
        <div className="glass-card-strong mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 sm:flex-nowrap sm:gap-4 sm:px-7 sm:py-4">
          <div className="flex items-center gap-3">
            <Image src="/health point png logo.png" alt="" width={36} height={36} className="size-9 object-contain" priority />
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold uppercase tracking-[0.16em] text-ink">Health Point</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mid">Admin · Services</p>
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
              Manage Services<span className="text-teal">.</span>
            </h1>
            <p className="mt-1 text-sm text-ink-mid">Add, edit, or remove services and their prices.</p>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="glass-card mb-8 rounded-2xl border-white/45 p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">
            {editService ? 'Edit Service' : 'Add Service'}
          </h2>
          <form action={saveServiceAction} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Key (URL slug)</label>
              <input name="key" defaultValue={editService?.key ?? ''} required
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm font-mono text-ink outline-none placeholder:text-ink-dim"
                placeholder="scaling-polishing" readOnly={!!editService} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Name</label>
              <input name="name" defaultValue={editService?.name ?? ''} required
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim"
                placeholder="Scaling & Polishing" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Price (AED)</label>
              <input name="price" type="number" min={0} step={1} defaultValue={editService?.price ?? ''} required
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim"
                placeholder="79" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Unit</label>
              <input name="unit" defaultValue={editService?.unit ?? 'AED'}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim"
                placeholder="AED" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Detail</label>
              <input name="detail" defaultValue={editService?.detail ?? ''}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim"
                placeholder="30 minutes" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Category</label>
              <input name="category" defaultValue={editService?.category ?? 'General'}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim"
                placeholder="Preventive, Cosmetic, Restorative..." />
            </div>
            <div className="flex items-center gap-3 pt-2 sm:col-span-2">
              {editService && (
                <Link href="/admin/services" className="glass-pill rounded-full px-4 py-2 text-xs font-semibold text-ink-mid transition-colors hover:text-ink">
                  Cancel
                </Link>
              )}
              <button type="submit" className="liquid-cta rounded-full px-6 py-2 text-xs font-semibold transition-all hover:scale-[1.02]">
                {editService ? 'Save Changes' : 'Add Service'}
              </button>
            </div>
          </form>
        </div>

        {/* Services List */}
        <div className="glass-card overflow-hidden rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/40 text-[11px] uppercase tracking-[0.14em] text-ink-mid">
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Key</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Unit</th>
                  <th className="px-5 py-3 font-semibold">Detail</th>
                  <th className="px-5 py-3 font-semibold text-right">Price</th>
                  <th className="w-32 px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.key} className="border-b border-white/25 align-middle transition-colors last:border-0 hover:bg-white/30">
                    <td className="px-5 py-4 font-semibold text-ink">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-teal" strokeWidth={1.5} aria-hidden />
                        {s.name}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-ink-mid">{s.key}</td>
                    <td className="px-5 py-4 text-xs text-ink-mid">{s.category}</td>
                    <td className="px-5 py-4 text-xs text-ink-mid">{s.unit}</td>
                    <td className="px-5 py-4 text-xs text-ink-mid">{s.detail}</td>
                    <td className="px-5 py-4 text-right font-semibold text-ink">
                      AED {s.price}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/admin/services?key=${s.key}`}
                          className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-teal transition-colors hover:text-teal/80"
                        >
                          <Edit3 className="size-3" strokeWidth={2} />
                          Edit
                        </Link>
                        <form action={deleteServiceAction}>
                          <input type="hidden" name="key" value={s.key} />
                          <button type="submit"
                            className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-red-500 transition-colors hover:text-red-600">
                            <Trash2 className="size-3" strokeWidth={2} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

async function saveServiceAction(formData: FormData) {
  'use server';
  await upsertService({
    key: formData.get('key') as string,
    name: formData.get('name') as string,
    price: parseInt(formData.get('price') as string, 10) || 0,
    unit: formData.get('unit') as string,
    detail: formData.get('detail') as string,
    category: formData.get('category') as string,
  });
  redirect('/admin/services');
}

async function deleteServiceAction(formData: FormData) {
  'use server';
  await deleteService(formData.get('key') as string);
  redirect('/admin/services');
}
