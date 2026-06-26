'use server';

import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

type MemoryStore = {
  doctors: StoreDoctor[];
  services: StoreService[];
  blogPosts: StoreBlogPost[];
  loaded: boolean;
  fsBroken: boolean;
};

const memory: MemoryStore = {
  doctors: [],
  services: [],
  blogPosts: [],
  loaded: false,
  fsBroken: false,
};

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function now(): string {
  return new Date().toISOString();
}

/* ─── Types ─────────────────────────────────────────────────── */

export interface StoreDoctor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  languages: string[];
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoreService {
  key: string;
  name: string;
  price: number;
  unit: string;
  detail: string;
  category: string;
  active: boolean;
  updatedAt: string;
}

export interface StoreBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ─── Persistence ───────────────────────────────────────────── */

async function ensureLoaded(): Promise<void> {
  if (memory.loaded) return;
  memory.loaded = true;
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as MemoryStore;
    memory.doctors = Array.isArray(parsed.doctors) ? parsed.doctors : [];
    memory.services = Array.isArray(parsed.services) ? parsed.services : [];
    memory.blogPosts = Array.isArray(parsed.blogPosts) ? parsed.blogPosts : [];
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code && code !== 'ENOENT') memory.fsBroken = true;
    ensureSeeded();
  }
}

async function flush(): Promise<void> {
  if (memory.fsBroken) return;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      STORE_PATH,
      JSON.stringify(
        {
          doctors: memory.doctors,
          services: memory.services,
          blogPosts: memory.blogPosts,
        },
        null,
        2,
      ),
      'utf8',
    );
  } catch {
    memory.fsBroken = true;
  }
}

function ensureSeeded() {
  if (memory.doctors.length === 0) {
    memory.doctors = [
      {
        id: uid(),
        name: 'Dr. Iqra',
        role: 'Lead Dentist',
        bio: 'The tooth tells you what it needs. We just have to listen.',
        imageUrl: '',
        specialties: ['Endodontics', 'Cosmetic', 'Pediatric'],
        languages: ['English', 'Hindi', 'Urdu'],
        displayOrder: 1,
        active: true,
        createdAt: now(),
        updatedAt: now(),
      },
      {
        id: uid(),
        name: 'Dr. Mafaza',
        role: 'Specialist',
        bio: "Honest pricing isn't a strategy. It's the right thing to do.",
        imageUrl: '',
        specialties: ['Orthodontics', 'Implants', 'Whitening'],
        languages: ['English', 'Arabic', 'Hindi'],
        displayOrder: 2,
        active: true,
        createdAt: now(),
        updatedAt: now(),
      },
      {
        id: uid(),
        name: 'Dr. Mohamad',
        role: 'Specialist',
        bio: 'A Hollywood smile that ages well is engineered, not painted.',
        imageUrl: '',
        specialties: ['Veneers', 'Crowns', 'Restorative'],
        languages: ['English', 'Arabic', 'Tagalog'],
        displayOrder: 3,
        active: true,
        createdAt: now(),
        updatedAt: now(),
      },
    ];
  }
  if (memory.services.length === 0) {
    memory.services = [
      { key: 'scaling', name: 'Scaling & Polishing', price: 79, unit: 'AED', detail: '30 minutes', category: 'Preventive', active: true, updatedAt: now() },
      { key: 'whitening', name: 'Teeth Whitening', price: 299, unit: 'AED', detail: 'Same-day result', category: 'Cosmetic', active: true, updatedAt: now() },
      { key: 'hollywood-smile', name: 'Hollywood Smile', price: 999, unit: 'AED', detail: 'Veneer consultation', category: 'Cosmetic', active: true, updatedAt: now() },
      { key: 'root-canal', name: 'Root Canal', price: 399, unit: 'from AED', detail: 'Per canal', category: 'Restorative', active: true, updatedAt: now() },
      { key: 'crown', name: 'Crown', price: 299, unit: 'AED', detail: 'Lab-fabricated', category: 'Restorative', active: true, updatedAt: now() },
      { key: 'braces', name: 'Braces', price: 399, unit: 'from AED', detail: 'Monthly visits', category: 'Orthodontics', active: true, updatedAt: now() },
      { key: 'filling', name: 'Filling', price: 139, unit: 'from AED', detail: 'Composite', category: 'Restorative', active: true, updatedAt: now() },
      { key: 'extraction', name: 'Extraction', price: 99, unit: 'from AED', detail: 'Including wisdom', category: 'General', active: true, updatedAt: now() },
      { key: 'denture', name: 'Denture', price: 249, unit: 'from AED', detail: 'Full or partial', category: 'Prosthetic', active: true, updatedAt: now() },
    ];
  }
}

/* ─── Doctors CRUD ──────────────────────────────────────────── */

export async function listDoctors(): Promise<StoreDoctor[]> {
  await ensureLoaded();
  return [...memory.doctors]
    .filter((d) => d.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function listAllDoctors(): Promise<StoreDoctor[]> {
  await ensureLoaded();
  return [...memory.doctors].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getDoctor(id: string): Promise<StoreDoctor | null> {
  await ensureLoaded();
  return memory.doctors.find((d) => d.id === id) ?? null;
}

export async function upsertDoctor(input: Partial<StoreDoctor> & { name: string }): Promise<StoreDoctor> {
  await ensureLoaded();
  const existing = input.id ? memory.doctors.findIndex((d) => d.id === input.id) : -1;
  const doctor: StoreDoctor = {
    id: existing >= 0 ? memory.doctors[existing].id : uid(),
    name: input.name,
    role: input.role ?? '',
    bio: input.bio ?? '',
    imageUrl: input.imageUrl ?? '',
    specialties: input.specialties ?? [],
    languages: input.languages ?? [],
    displayOrder: input.displayOrder ?? memory.doctors.length + 1,
    active: input.active ?? true,
    createdAt: existing >= 0 ? memory.doctors[existing].createdAt : now(),
    updatedAt: now(),
  };
  if (existing >= 0) memory.doctors[existing] = doctor;
  else memory.doctors.push(doctor);
  await flush();
  return doctor;
}

export async function deleteDoctor(id: string): Promise<void> {
  await ensureLoaded();
  memory.doctors = memory.doctors.filter((d) => d.id !== id);
  await flush();
}

/* ─── Services CRUD ──────────────────────────────────────── */

export async function listServices(): Promise<StoreService[]> {
  await ensureLoaded();
  return [...memory.services].filter((s) => s.active);
}

export async function listAllServices(): Promise<StoreService[]> {
  await ensureLoaded();
  return [...memory.services];
}

export async function getService(key: string): Promise<StoreService | null> {
  await ensureLoaded();
  return memory.services.find((s) => s.key === key) ?? null;
}

export async function upsertService(
  input: Partial<StoreService> & { name: string; key: string },
): Promise<StoreService> {
  await ensureLoaded();
  const idx = memory.services.findIndex((s) => s.key === input.key);
  const service: StoreService = {
    key: input.key,
    name: input.name,
    price: input.price ?? 0,
    unit: input.unit ?? 'AED',
    detail: input.detail ?? '',
    category: input.category ?? 'General',
    active: input.active ?? true,
    updatedAt: now(),
  };
  if (idx >= 0) memory.services[idx] = service;
  else memory.services.push(service);
  await flush();
  return service;
}

export async function deleteService(key: string): Promise<void> {
  await ensureLoaded();
  memory.services = memory.services.filter((s) => s.key !== key);
  await flush();
}

export async function bulkUpdateServices(
  updates: { key: string; price: number }[],
): Promise<void> {
  await ensureLoaded();
  for (const u of updates) {
    const idx = memory.services.findIndex((s) => s.key === u.key);
    if (idx >= 0) {
      memory.services[idx].price = u.price;
      memory.services[idx].updatedAt = now();
    }
  }
  await flush();
}

/* ─── Blog Posts CRUD ──────────────────────────────────── */

export async function listBlogPosts(): Promise<StoreBlogPost[]> {
  await ensureLoaded();
  return [...memory.blogPosts]
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function listAllBlogPosts(): Promise<StoreBlogPost[]> {
  await ensureLoaded();
  return [...memory.blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(idOrSlug: string): Promise<StoreBlogPost | null> {
  await ensureLoaded();
  return (
    memory.blogPosts.find((p) => p.id === idOrSlug) ??
    memory.blogPosts.find((p) => p.slug === idOrSlug) ??
    null
  );
}

export async function upsertBlogPost(
  input: Partial<StoreBlogPost> & { title: string; content: string },
): Promise<StoreBlogPost> {
  await ensureLoaded();
  const existing = input.id ? memory.blogPosts.findIndex((p) => p.id === input.id) : -1;
  const post: StoreBlogPost = {
    id: existing >= 0 ? memory.blogPosts[existing].id : uid(),
    slug: input.slug ?? input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + uid().slice(0, 4),
    title: input.title,
    excerpt: input.excerpt ?? '',
    content: input.content,
    category: input.category ?? 'General',
    readTime: input.readTime ?? '5 min read',
    date: input.date ?? new Date().toISOString().slice(0, 10),
    author: input.author ?? 'Admin',
    authorRole: input.authorRole ?? '',
    published: input.published ?? true,
    createdAt: existing >= 0 ? memory.blogPosts[existing].createdAt : now(),
    updatedAt: now(),
  };
  if (existing >= 0) memory.blogPosts[existing] = post;
  else memory.blogPosts.unshift(post);
  await flush();
  return post;
}

export async function deleteBlogPost(id: string): Promise<void> {
  await ensureLoaded();
  memory.blogPosts = memory.blogPosts.filter((p) => p.id !== id);
  await flush();
}

/* ─── Shared server action for client components ──────────── */

export async function fetchStoreServices() {
  'use server';
  return await listAllServices();
}
