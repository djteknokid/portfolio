-- Run this in your Supabase SQL editor

create table if not exists learnlog_entries (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists learnlog_entries_user_created
  on learnlog_entries (user_id, created_at desc);
