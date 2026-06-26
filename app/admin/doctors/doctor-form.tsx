'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { saveDoctorAction } from './actions';

export function DoctorForm({ editDoctor }: { editDoctor: any }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(editDoctor?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInputRef.current.files = dataTransfer.files;
        }
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="glass-card mb-8 rounded-2xl border-white/45 p-4 sm:p-6">
      <h2 className="mb-4 font-display text-base sm:text-lg font-bold text-ink">
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
        
        {/* Image Upload */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">Profile Image</label>
          <div className="flex items-center gap-4">
            {preview ? (
              <div className="relative">
                <Image src={preview} alt="Preview" width={80} height={80} className="size-20 rounded-full object-cover border-2 border-teal/40" />
                <button
                  type="button"
                  onClick={() => { setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-teal/20 to-green/20 border-2 border-dashed border-teal/40">
                <Upload className="size-8 text-teal" />
              </div>
            )}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="block w-full text-sm text-ink file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20"
              />
              <p className="mt-1 text-[10px] text-ink-mid">JPEG, PNG, WebP or GIF. Max 5MB.</p>
              {uploading && <p className="mt-1 text-[10px] text-teal">Uploading...</p>}
            </div>
            <input type="hidden" name="imageUrl" value={preview || ''} />
          </div>
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
            <a href="/admin/doctors" className="glass-pill rounded-full px-4 py-2 text-xs font-semibold text-ink-mid transition-colors hover:text-ink">
              Cancel
            </a>
          )}
          <button type="submit" disabled={uploading} className="liquid-cta rounded-full px-6 py-2 text-xs font-semibold transition-all hover:scale-[1.02] disabled:opacity-50">
            {editDoctor ? 'Save Changes' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
}
