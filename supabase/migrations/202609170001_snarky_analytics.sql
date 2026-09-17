create table if not exists public.sps_analytics_events (
  id bigint generated always as identity primary key,
  site text not null check (site in ('snarky-how-to','dumpster-atlas')),
  event_name text not null check (char_length(event_name) between 1 and 80),
  session_id text not null check (char_length(session_id) between 8 and 100),
  path text,
  resource_id text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists sps_analytics_events_site_created_idx
  on public.sps_analytics_events(site, created_at desc);

create index if not exists sps_analytics_events_event_created_idx
  on public.sps_analytics_events(event_name, created_at desc);

alter table public.sps_analytics_events enable row level security;

-- Public clients do not read/write this table directly. Public Edge Functions use the
-- server-side service-role key and explicitly validate their accepted event names.
revoke all on table public.sps_analytics_events from anon, authenticated;
