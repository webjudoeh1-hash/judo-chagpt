create extension if not exists pgcrypto;

create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  phone text,
  is_admin boolean default false,
  group_id uuid references groups(id),
  created_at timestamptz default now(),
  primary key (id)
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  filename text not null,
  storage_path text not null,
  mime text,
  size bigint,
  group_id uuid references groups(id),
  uploaded_by uuid references auth.users,
  created_at timestamptz default now()
);

create index if not exists idx_documents_group on documents(group_id);
