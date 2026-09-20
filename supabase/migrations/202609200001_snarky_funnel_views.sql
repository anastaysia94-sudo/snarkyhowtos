-- Snarky How-To funnel + money-path reporting views.
-- Privacy-light: aggregates of interaction types only. No PII anywhere.
-- All reads go through the service role (RLS already revokes anon/authenticated).

create index if not exists sps_analytics_events_site_path_created_idx
  on public.sps_analytics_events(site, path, created_at desc);

create index if not exists sps_analytics_events_session_idx
  on public.sps_analytics_events(site, session_id, created_at);

-- Daily event counts per site (traffic + engagement pulse).
create or replace view public.sps_snarky_daily_events as
select
  (created_at at time zone 'utc')::date as day,
  event_name,
  count(*)::bigint as events,
  count(distinct session_id)::bigint as sessions
from public.sps_analytics_events
where site = 'snarky-how-to'
group by 1, 2;

-- Campaign funnel: YouTube entries -> guide views -> money-adjacent intents.
-- Campaign comes from meta->>'campaign' on page_view / youtube_entry rows.
create or replace view public.sps_snarky_campaign_funnel as
with tagged as (
  select
    coalesce(nullif(meta->>'campaign', ''), '(direct)') as campaign,
    event_name,
    session_id
  from public.sps_analytics_events
  where site = 'snarky-how-to'
)
select
  campaign,
  count(distinct session_id) filter (where event_name = 'youtube_entry')::bigint as youtube_entries,
  count(distinct session_id) filter (where event_name = 'page_view')::bigint as guide_sessions,
  count(distinct session_id) filter (where event_name = 'offer_picker_click')::bigint as picker_clicks,
  count(distinct session_id) filter (where event_name in ('copy_script','download_template'))::bigint as asset_takers,
  count(distinct session_id) filter (where event_name = 'share_click')::bigint as sharers,
  count(distinct session_id) filter (where event_name = 'newsletter_click')::bigint as newsletter_intents,
  count(distinct session_id) filter (where event_name in ('youtube_click','youtube_subscribe_click'))::bigint as youtube_intents,
  count(distinct session_id) filter (where event_name = 'scroll_100')::bigint as full_reads
from tagged
group by 1
order by guide_sessions desc;

-- Scroll-depth survival curve (which sections lose readers).
create or replace view public.sps_snarky_scroll_curve as
select
  event_name as depth,
  count(distinct session_id)::bigint as sessions
from public.sps_analytics_events
where site = 'snarky-how-to'
  and event_name in ('page_view','scroll_25','scroll_50','scroll_75','scroll_100')
group by 1;

comment on view public.sps_snarky_daily_events is 'Daily interaction counts for Snarky How-To (no PII).';
comment on view public.sps_snarky_campaign_funnel is 'Per-campaign funnel: entries -> views -> picker/asset/share/newsletter intents.';
comment on view public.sps_snarky_scroll_curve is 'Scroll-depth survival curve for guide readability work.';
