-- Run this in your Supabase SQL editor

create table if not exists interests_feedback (
  id uuid primary key default gen_random_uuid(),
  question_id text,
  question text not null,
  topic text,
  mechanic text,
  rating text not null check (rating in ('loved', 'too_easy', 'too_hard', 'incorrect')),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index on interests_feedback (rating);
create index on interests_feedback (question_id);
create index on interests_feedback (created_at desc);
