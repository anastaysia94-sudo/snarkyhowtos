# Snarky How-To — SEO + AEO Playbook

## What shipped in the rewrite (2026-09-20)

**Technical**
- Multi-route site on one Edge Function: `/`, `/episodes`, `/episode-001`,
  `/about`, `/privacy`, `/terms`, `/disclosure`, 404 page.
- `robots.txt`, `sitemap.xml`, RSS (`/feed.xml`), `manifest.webmanifest`,
  SVG favicon + OG placeholder, security headers (CSP, nosniff, referrer).
- Canonical tags everywhere; `SITE_BASE_URL` env flips canonicals to the
  custom domain with zero code changes. Cache tiers per content type.
- Accessibility: skip link, landmarks, focus-visible, reduced-motion,
  print stylesheet, labeled form controls.

**On-page**
- Quick-answer block, TOC, semantic H1→H3, checklist (dwell time),
  FAQ accordion ×6, chapters table, transcript page, internal-link mesh
  (guide ↔ episodes ↔ episode-001 ↔ trust pages).
- E-E-A-T: About + editorial policy, AI-voice disclosure, privacy/terms/
  money-disclosure pages, update dates, correction channel (YT comments).

**Structured data**
- Home: Organization + WebSite + Article (+Speakable) + HowTo (4 steps,
  totalTime) + BreadcrumbList + FAQPage.
- Episodes: CollectionPage + ItemList (10) + BreadcrumbList.
- Episode 001: VideoObject (duration, transcript, Clip chapters) + Breadcrumb.

**AEO (answer-engine optimization)**
- `llms.txt`: method brief, episode list, citation preference, content rules.
- `/api/summary`: JSON version for researchers/agents (rate-friendly, cached).
- 40–60-word answers per FAQ, quotable quick-answer, no fabricated entities
  (no fake authors/revenue = nothing to contradict you later).

## Human checklist (cannot be coded)

1. **Custom domain** (biggest single SEO lever — function URLs barely rank):
   Cloudflare → DNS → proxy to the function → set `SITE_BASE_URL` secret →
   redeploy → verify canonicals + sitemap URLs.
2. **Search Console + Bing Webmaster**: add property, submit sitemap,
   request indexing for `/`, `/episodes`, `/episode-001`; fix any
   “crawled, not indexed” with internal links from new episodes.
3. **Raster OG PNG**: run `tools/make_og_image.py`, host on the domain,
   swap `og:image`/`twitter:image` to PNG (keep SVG fallback).
4. **YouTube verification**: confirm channel handle, update
   `YOUTUBE_CHANNEL_URL`, link site in channel + every description.
5. **Rich-result tests**: validate Article/HowTo/FAQ/VideoObject after deploy
   (Google Rich Results Test + Schema validator); fix warnings, not just errors.

## Per-episode SEO ritual (15 min)

- [ ] Keyword in: YouTube title (front), page/H1, first 100 words, one H2,
      file names, alt text, `scenes.json` kicker.
- [ ] Chapters start at `00:00`; transcript page updated; ItemList status flipped.
- [ ] Internal links: new episode ↔ guide ↔ 1 older episode.
- [ ] Description: 150-char hook + trackable link in first 3 lines + chapters.
- [ ] 7-day check: Search Console impressions/CTR + funnel view conversion.

## AEO upkeep

- Keep `llms.txt` + `/api/summary` in sync with `EPISODES` in `config.ts`
  (single source of truth — CI greps it).
- One quotable definition or list per page; dates visible; corrections logged.
- Never publish stats without a source link; answer engines punish invented
  numbers by never citing you again.

## Acceptance criteria

- [ ] All HTML routes return 200 + canonical + exactly the expected schemas.
- [ ] `robots.txt` references the sitemap; sitemap lists all HTML routes.
- [ ] Rich Results Test: 0 errors on `/`, `/episodes`, `/episode-001`.
- [ ] Lighthouse (mobile): Performance ≥90, Accessibility ≥95, SEO 100.
- [ ] Search Console: sitemap accepted, 3+ pages indexed within 14 days.
