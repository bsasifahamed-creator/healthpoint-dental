-- Run in Supabase SQL Editor (Prompt 4). Health Point Dental — bookings + doctors.

create extension if not exists "uuid-ossp";

create table doctors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  specialty text not null,
  display_order int not null
);

insert into doctors (name, specialty, display_order) values
  ('Dr. Iqra', 'Lead · Endodontics · Cosmetic · Pediatric', 1),
  ('Dr. Mafaza', 'Specialist · Orthodontics · Implants · Whitening', 2),
  ('Dr. Mohamad', 'Specialist · Veneers · Crowns · Restorative', 3);

create table bookings (
  id uuid primary key default uuid_generate_v4(),
  service_key text not null,
  service_name text not null,
  service_price int not null,
  doctor_id uuid references doctors(id),
  doctor_name text not null,
  slot_date date not null,
  slot_time time not null,
  slot_datetime timestamptz not null,
  patient_name text not null,
  patient_phone text not null,
  patient_email text,
  patient_notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slot_datetime, doctor_id)
);

create index idx_bookings_slot_lookup on bookings (slot_date, doctor_id, status);
create index idx_bookings_status on bookings (status);

create table blockouts (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid references doctors(id),
  block_start timestamptz not null,
  block_end timestamptz not null,
  reason text,
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;
alter table doctors enable row level security;
alter table blockouts enable row level security;

create policy "Public read doctors" on doctors for select using (true);
create policy "Public read non-cancelled bookings" on bookings for select using (status != 'cancelled');
create policy "Public insert bookings" on bookings for insert with check (true);
