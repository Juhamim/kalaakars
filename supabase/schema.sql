-- ============================================================
--  KALAAKARS — Supabase Schema
--  Run this once in the Supabase SQL Editor
-- ============================================================

-- Projects table
create table if not exists public.projects (
  id          text primary key default gen_random_uuid()::text,
  slug        text unique not null,
  num         text not null default '00',
  title       text not null,
  subtitle    text not null default '',
  category    text not null default '',
  location    text not null default '',
  year        text not null default '',
  hero_img    text not null default '',
  story       text not null default '',
  pull_quote  text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Gallery images table
create table if not exists public.gallery_images (
  id          text primary key default gen_random_uuid()::text,
  project_id  text references public.projects(id) on delete cascade,
  src         text not null,
  span        text not null default 'half'  -- 'full' | 'half'
);

-- Specs table
create table if not exists public.specs (
  id          text primary key default gen_random_uuid()::text,
  project_id  text references public.projects(id) on delete cascade,
  label       text not null,
  value       text not null
);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function update_updated_at();

-- Disable RLS for simplicity (admin access via service key)
alter table public.projects      disable row level security;
alter table public.gallery_images disable row level security;
alter table public.specs          disable row level security;

-- ============================================================
--  Seed initial data
-- ============================================================
insert into public.projects (id, slug, num, title, subtitle, category, location, year, hero_img, story, pull_quote)
values
  ('00', 'beach-house-calicut', '00', 'BEACH HOUSE CALICUT', 'Residential', 'RESIDENTIAL', 'CALICUT, KL', '2024',
   'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2400&auto=format&fit=crop',
   'Perched between the Arabian Sea and the coconut groves of Calicut''s shoreline, Beach House responds to the rhythm of the Malabar coast.',
   'Every good building begins by listening to the land.'),

  ('01', 'grand-ridge-drive', '01', 'GRAND RIDGE DRIVE', 'Residential', 'RESIDENTIAL', 'CALICUT, KL', '2024',
   'https://images.unsplash.com/photo-1600585154340-be6199f7c096?q=80&w=2400&auto=format&fit=crop',
   'Located on a prominent ridge in Calicut''s hilly terrain, this residence dissolves the boundary between architecture and the lush Kerala landscape.',
   'Architecture is not about form. It is about the nature of space.'),

  ('02', 'void-atrium', '02', 'VOID ATRIUM', 'Commercial', 'COMMERCIAL', 'KOZHIKODE, KL', '2024',
   'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop',
   'Set in the heart of Kozhikode''s urban fabric, Void Atrium reimagines the modern workspace as a sanctuary of light.',
   'The void is the most powerful architectural element.'),

  ('03', 'malabar-house', '03', 'MALABAR HOUSE', 'Cultural', 'CULTURAL', 'CALICUT, KL', '2025',
   'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2400&auto=format&fit=crop',
   'Malabar House is a cultural center conceived as an instrument of the Kerala coast.',
   'To build in Kerala is to listen to the monsoon first.'),

  ('04', 'kochi-waterfront', '04', 'KOCHI WATERFRONT', 'Landscape', 'LANDSCAPE', 'KOCHI, KL', '2024',
   'https://images.unsplash.com/photo-1449156001437-3a1f93977c71?q=80&w=2400&auto=format&fit=crop',
   'Situated at the edge of Fort Kochi''s backwaters, this pavilion draws from the Chinese fishing nets and Portuguese fort heritage.',
   'The best building is the one you don''t see.')
on conflict (id) do nothing;

-- Gallery seeds
insert into public.gallery_images (project_id, src, span) values
  ('00', 'https://images.unsplash.com/photo-1600585154340-be6199f7c096?q=80&w=2400&auto=format&fit=crop', 'half'),
  ('00', 'https://images.unsplash.com/photo-1600607687939-ce8a6c349fbd?q=80&w=2400&auto=format&fit=crop', 'half'),
  ('00', 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2400&auto=format&fit=crop', 'full'),
  ('01', 'https://images.unsplash.com/photo-1600607687939-ce8a6c349fbd?q=80&w=2400&auto=format&fit=crop', 'half'),
  ('01', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2400&auto=format&fit=crop', 'half'),
  ('02', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop', 'full'),
  ('02', 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=2400&auto=format&fit=crop', 'half'),
  ('03', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop', 'half'),
  ('03', 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=2400&auto=format&fit=crop', 'full'),
  ('04', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2400&auto=format&fit=crop', 'full'),
  ('04', 'https://images.unsplash.com/photo-1600567026023-9f17e27dcaf6?q=80&w=2400&auto=format&fit=crop', 'half')
on conflict do nothing;

-- Spec seeds
insert into public.specs (project_id, label, value) values
  ('00', 'Status', 'Completed'), ('00', 'Client', 'Private'), ('00', 'Area', '4,200 sq.ft'), ('00', 'Year', '2024'), ('00', 'Principal', 'Ar. Vishal Sharma'),
  ('01', 'Status', 'Completed'), ('01', 'Client', 'Private'), ('01', 'Area', '5,400 sq.ft'), ('01', 'Year', '2024'), ('01', 'Principal', 'Ar. Vishal Sharma'),
  ('02', 'Status', 'In Progress'), ('02', 'Client', 'Private'), ('02', 'Area', '22,000 sq.ft'), ('02', 'Year', '2025'), ('02', 'Principal', 'Ar. Ayaan Kapoor'),
  ('03', 'Status', 'Design Development'), ('03', 'Client', 'City of Calicut'), ('03', 'Area', '48,000 sq.ft'), ('03', 'Year', '2025'), ('03', 'Principal', 'Ar. Vishal Sharma'),
  ('04', 'Status', 'Completed'), ('04', 'Client', 'Private'), ('04', 'Area', '3,200 sq.ft'), ('04', 'Year', '2024'), ('04', 'Principal', 'Ar. Ayaan Kapoor')
on conflict do nothing;
