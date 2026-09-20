# Snarky How-To — Monetization Playbook (YouTube + Ads First)

> House rule, repeated until boring: **no income promises, no fake proof.**
> Everything below sells usefulness (templates, attention, sponsorships) —
> never earnings. If a tactic needs a revenue claim to work, it is banned.

## Strategy in one paragraph

YouTube is the engine (discovery + watch-time + ad revenue), the site is the
trap that converts viewers into **picker users → asset takers → subscribers**,
and the newsletter is the owned list that survives algorithm moods. Money
arrives in layers: (1) YouTube Partner revenue, (2) newsletter + site ads,
(3) clearly-labeled affiliates, (4) template packs, (5) sponsorships. Each
layer is honest, cheap to start, and stacked on the free stack below.

## Free stack (current: nothing owned yet — start here)

| Job | Free pick | Cost to start | Notes |
|---|---|---|---|
| Domain + DNS | Cloudflare Registrar + proxy | ~$10/yr (the one bill) | `snarkyhowto.com` → Supabase function; free CDN/caching |
| Site hosting | Supabase Edge Functions | $0 (free tier) | Already deployed; set `SITE_BASE_URL` after DNS |
| Analytics | Built-in privacy-light events + funnel views | $0 | `sps_snarky_campaign_funnel`; add Search Console (free) |
| Newsletter | Beehiiv free (up to 2,500 subs, ad network built in) | $0 | Set `NEWSLETTER_URL`, then flip site CTAs live |
| Video voice | Piper TTS offline (free) → ElevenLabs free tier later | $0 | `SNARKY_TTS_ENGINE=piper`; disclose synthetic voice |
| Thumbnails/design | Canva free | $0 | A/B via `_thumbnail` + `_thumbnail_alt` |
| Payments (later) | Gumroad or Stripe Payment Links | $0/mo + per-sale fee | For $9–19 template packs; no inventory |
| SEO tooling | Google Search Console + Bing Webmaster | $0 | Submit sitemap; see SEO_AEO_PLAYBOOK.md |

## Revenue ladder (in order — do not skip)

### Layer 1 — YouTube Partner Program (months 1–4)
- Requirements: 1,000 subs + (4,000 watch hrs/12mo OR 10M Shorts views/90d).
- Levers already built: weekly cadence queue, Shorts funnel per episode,
  end-screen + pinned-comment CTAs, trackable description links proving
  site value to future sponsors.
- Weekly jobs: publish same day, reply to every comment in 48h, Community
  post per episode, playlist per theme (“Scam radar”, “Offers”, “Money admin”).
- Honest framing on-site: “YouTube ads when eligible” (`/disclosure`).

### Layer 2 — Owned-list + site ads (starts with newsletter)
- Beehiiv free includes its ad network: zero setup, labeled placements.
- Site ad slots: **not rendered yet by design**. Enable only after the custom
  domain + real traffic: uncomment slots in `layout.ts`, apply to AdSense,
  keep ≤3 slots/page and never above the quick-answer.
- Welcome sequence (5 emails, write once): 1) template delivery + Ep 001,
  2) the 24-hour filter, 3) scam red flags (Ep 002), 4) pricing mistakes
  (Ep 007), 5) “reply with your offer” (engagement bait that actually helps).

### Layer 3 — Affiliates (first test after 1,000 site sessions/mo)
- Only tools with genuine free tiers first (email, portfolio, invoicing).
- Rules: inline “affiliate link” label, price stated, downside stated,
  listed on `/disclosure` BEFORE the first link goes live.
- Tracking: `affiliate_click` event already in the analytics allow-list;
  funnel view shows campaign → click-through.

### Layer 4 — Template packs ($9–19, after 500 newsletter subs)
- Pack #1 “Offer Starter Kit”: outreach scripts ×10, one-page offer template,
  pricing worksheet, red-flag card. Pack #2 “Packaging Kit” after Ep 009.
- Sell via Gumroad/Stripe links; refund policy: broken download = refund,
  no questions, no upsell maze. Never claim earnings from using them.

### Layer 5 — Sponsorships (after YPP + 5k monthly viewers)
- One-pager from real funnel data: per-campaign entries → picker clicks.
- 30-sec mid-roll + description link; sponsor never approves conclusions;
  “sponsored” label above the fold and in the first 3 description lines.

## 90-day plan

**Days 1–30 — Publish + verify.**
- [x] Channel verified + wired: `https://www.youtube.com/@SnarkyHowTos` (2026-09-20; repurposed account — unlist old unrelated playlists before launch)
- [ ] Buy domain via Cloudflare, deploy Worker proxy (`cloudflare/README.md` — required: raw function URL renders as code), set `SITE_BASE_URL`
- [ ] Submit sitemap to Search Console + Bing; request indexing for `/`, `/episodes`, `/episode-001`
- [ ] Publish Ep 001 (full + Short) with trackable links; pin comment
- [ ] Create Beehiiv pub, set `NEWSLETTER_URL`, send issue #0 to friends
- [ ] Publish Ep 002 + 003 on schedule

**Days 31–60 — Cadence + list.**
- [ ] Ep 004 + 005 + 006 + 007 weekly; Shorts within 24h of each full
- [ ] Newsletter weekly (episode + template drop); welcome sequence live
- [ ] First funnel review: kill weakest CTA placement, double down on best
- [ ] Raster OG PNG via `tools/make_og_image.py` on the custom domain

**Days 61–90 — First money tests.**
- [ ] Ep 008 + 009 + 010; “Scam radar” playlist (002 + 010 + guide)
- [ ] Affiliate test #1 (one tool, one page, full disclosure)
- [ ] Template Pack #1 draft from existing assets; presell to newsletter only
- [ ] Sponsorship one-pager from real funnel numbers (no projections as facts)

## Metrics that matter (query the views)

- `sps_snarky_campaign_funnel`: per-video entries → picker/asset/share rate.
- `sps_snarky_scroll_curve`: where readers bail (fix that section, not the headline).
- `sps_snarky_daily_events`: `newsletter_click` and `offer_picker_click` trend.
- YouTube Analytics: CTR (target 4–6% with A/B thumbs), avg view duration,
  and traffic-source split proving Shorts → subs → site.

## Banned list (permanent)

Income screenshots, revenue projections stated as facts, fake testimonials,
rented props, countdown timers, “only 3 left” for digital files, undisclosed
affiliates, pay-to-unlock-work offers, buying subs/views. Violation = revert.
