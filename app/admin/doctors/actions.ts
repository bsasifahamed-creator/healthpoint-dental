'use server';

import { redirect } from 'next/navigation';
import { upsertDoctor, deleteDoctor } from '@/lib/data-store';

export async function saveDoctorAction(formData: FormData) {
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

export async function deleteDoctorAction(formData: FormData) {
  const id = formData.get('id') as string;
  if (id) await deleteDoctor(id);
  redirect('/admin/doctors');
}
