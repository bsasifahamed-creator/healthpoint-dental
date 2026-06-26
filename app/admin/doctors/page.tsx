import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, Edit3, Plus, Trash2, Star, Globe, LogOut, Languages, Award } from 'lucide-react';
import { AdminBackground } from '@/components/admin/admin-background';
import { AdminLogin } from '../login-form';
import { verifyAdminSession } from '@/lib/admin/session';
import { listAllDoctors, getDoctor, upsertDoctor, deleteDoctor } from '@/lib/data-store';

export default async function AdminDoctorsPage(props: { searchParams?: Promise<Record<string, string>> }) {
  if (!verifyAdminSession()) return <AdminLogin />;

  const searchParams = await props.searchParams;
  const editId = searchParams?.id;

  const doctors = await listAllDoctors();
  const editDoctor = editId ? await getDoctor(editId) : null;

  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <AdminBackground />
      <header className="relative z-10 px-4 pt-6 sm:px-8">
        <div className="glass-card-strong mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 sm:flex-nowrap sm:gap-4 sm:px-7 sm:py-4">
          <div className="flex items-center gap-3">
            <Image src="/health point png logo.png" alt="" width={36} height={36} className="size-9 object-contain" priority />
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold uppercase tracking-[0.16em] text-ink">Health Point</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mid">Admin · Doctors</p>
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
              Manage Doctors<span className="text-teal">.</span>
            </h1>
            <p className="mt-1 text-sm text-ink-mid">Add, edit, or remove doctors displayed on the website.</p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card mb-8 rounded-2xl border-white/45 p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">
            {editDoctor ? 'Edit Doctor' : 'Add Doctor'}
          </h2>
          <form action={saveDoctorAction} className="grid gap-4 sm:grid-cols-2">
            {editDoctor && <input type="hidden" name="id" value={editDoctor.id} />}
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Name</label>
              <input name="name" defaultValue={editDoctor?.name ?? ''} required
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" placeholder="Dr. Jane Smith" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Role / Title</label>
              <input name="role" defaultValue={editDoctor?.role ?? ''}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" placeholder="Lead Dentist" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Profile Image URL</label>
              <input name="imageUrl" type="url" defaultValue={editDoctor?.imageUrl ?? ''}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" placeholder="https://example.com/photo.jpg" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Description / Bio</label>
              <textarea name="bio" rows={3} defaultValue={editDoctor?.bio ?? ''}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim resize-none" placeholder="Short bio or quote..." />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Specialties (comma separated)</label>
              <input name="specialties" defaultValue={(editDoctor?.specialties ?? []).join(', ')}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" placeholder="Endodontics, Cosmetic, Pediatric" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Languages (comma separated)</label>
              <input name="languages" defaultValue={(editDoctor?.languages ?? []).join(', ')}
                className="glass-pill w-full rounded-2xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-dim" placeholder="English, Arabic, Hindi" />
            </div>
            <div className="flex items-center gap-3 pt-2 sm:col-span-2">
              {editDoctor && (
                <Link href="/admin/doctors" className="glass-pill rounded-full px-4 py-2 text-xs font-semibold text-ink-mid transition-colors hover:text-ink">
                  Cancel
                </Link>
              )}
              <button type="submit" className="liquid-cta rounded-full px-6 py-2 text-xs font-semibold transition-all hover:scale-[1.02]">
                {editDoctor ? 'Save Changes' : 'Add Doctor'}
              </button>
            </div>
          </form>
        </div>

        {/* Doctor List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <div key={d.id} className="glass-card rounded-2xl border-white/45 p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
              <div className="mb-3 flex items-start gap-3">
                {d.imageUrl ? (
                  <Image src={d.imageUrl} alt={d.name} width={56} height={56} className="size-14 rounded-full object-cover" />
                ) : (
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal to-green text-lg font-extrabold text-white">
                    {d.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-bold text-ink">{d.name}</p>
                  <p className="truncate text-xs text-ink-mid">{d.role || '—'}</p>
                </div>
              </div>
              {d.bio && <p className="mb-3 text-sm italic leading-[1.5] text-ink-mid line-clamp-3">&ldquo;{d.bio}&rdquo;</p>}
              {d.specialties.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {d.specialties.map((s) => (
                    <span key={s} className="glass-pill rounded-full px-2 py-0.5 text-[10px] font-semibold text-teal">{s}</span>
                  ))}
                </div>
              )}
              {d.languages.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {d.languages.map((l) => (
                    <span key={l} className="glass-pill rounded-full px-2 py-0.5 text-[10px] font-medium text-ink-dim">{l}</span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 border-t border-white/30 pt-3">
                <Link href={`/admin/doctors?id=${d.id}`}
                  className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-teal transition-colors hover:text-teal/80">
                  <Edit3 className="size-3" strokeWidth={2} />
                  Edit
                </Link>
                <form action={deleteDoctorAction}>
                  <input type="hidden" name="id" value={d.id} />
                  <button type="submit"
                    className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-red-500 transition-colors hover:text-red-600">
                    <Trash2 className="size-3" strokeWidth={2} />
                    Remove
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

async function saveDoctorAction(formData: FormData) {
  'use server';
  const id = formData.get('id') as string | null;
  await upsertDoctor({
    id: id || undefined,
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    imageUrl: formData.get('imageUrl') as string,
    bio: formData.get('bio') as string,
    specialties: ((formData.get('specialties') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
    languages: ((formData.get('languages') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
  });
  redirect('/admin/doctors');
}

async function deleteDoctorAction(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) await deleteDoctor(id);
  redirect('/admin/doctors');
}
