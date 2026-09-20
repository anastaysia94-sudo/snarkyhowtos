# Snarky How-To

Practical how-to content with a dry sense of humor and a measurable action path.

**Live guide:** https://anastaysia94-sudo.github.io/snarkyhowtos/

## Hosting (all free, no domain required)

| Piece | Host | Why |
|---|---|---|
| All pages (`/`, `/episodes`, …) | GitHub Pages (`anastaysia94-sudo.github.io/snarkyhowtos`) | Correct content types, HTTPS, auto-deploy from `main` via `.github/workflows/pages.yml` |
| Analytics API + YouTube redirects | Supabase Edge Functions | Server-side DB writes; redirects/JSON are unaffected by the gateway's `text/plain` override |
| Custom domain (optional, later) | Cloudflare Worker in `cloudflare/` | Only needed if a branded domain is ever wanted — see `cloudflare/README.md` |

> Why not serve pages from Supabase directly? Its gateway force-serves
> function responses on `*.supabase.co` as `text/plain` + a `sandbox` CSP
> (verified via headers 2026-09-20), so browsers show HTML source instead of
> rendering. Pages fixed that for $0.

## What this repo is

The canonical source for the Snarky How-To website, YouTube pipeline, and money path.

Current loop:

`searchable guide -> useful action -> downloadable/copyable asset -> tracked CTA -> offer picker -> analytics`

The sarcasm is aimed at ridiculous situations and bad process, not at the reader.

## Site routes (one Edge Function)

| Route | What it is |
|---|---|
| `/` | Canonical guide (quick answer, checklist, FAQ, Ep 001) |
| `/episodes` | Public episode index + roadmap (SEO hub) |
| `/episode-001` | Chapters + full transcript + trackable links |
| `/about` `/privacy` `/terms` `/disclosure` | Trust pages (E-E-A-T + FTC-style money disclosure) |
| `/robots.txt` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/summary` | Crawler + answer-engine surfaces |
| `/favicon.svg` `/og-image.svg` `/manifest.webmanifest` `/healthz` | PWA/social/ops |
| `POST /any-route` | Privacy-light analytics (see below) |

## Repository layout

- `supabase/functions/snarky-how-to/` — site + analytics (`index.ts` router, `lib/` pages/seo/analytics).
- `supabase/functions/snarky-youtube/` — tracked YouTube redirect (`snarky_0NN_full|short`, `?action=subscribe`).
- `supabase/migrations/` — schema + funnel reporting views.
- `content/youtube/episode-001/` — shipped metadata/captions/scenes.
- `content/youtube/_TEMPLATE/` — scenes + metadata templates for 002–010.
- `content/youtube/next-video-queue.md` — titles, keywords, hooks, assets, YPP tracker.
- `tools/snarky_video_factory.py` — scene JSON → mp4 + srt/vtt + chapters + description + 2 thumbnails.
- `tools/make_og_image.py` — raster OG PNG + icon (for crawlers that reject SVG).
- `MONETIZATION.md` — YouTube + ads first plan, free stack, 90-day ladder.
- `SEO_AEO_PLAYBOOK.md` — what shipped, human checklist, per-episode ritual.
- `.github/workflows/quality.yml` — type-checks, contract greps, local route smoke, live smoke.

## Analytics events (privacy-light: type + random session id + tiny meta)

`page_view` · `offer_picker_click` · `copy_script` · `download_template` ·
`share_click` · `scroll_25/50/75/100` · `newsletter_click` · `youtube_click` ·
`youtube_subscribe_click` · `video_play` · `faq_expand` · `checklist_toggle` ·
`affiliate_click` · `episode_view` · `youtube_entry` (redirect only)

Reporting: `sps_snarky_daily_events`, `sps_snarky_campaign_funnel`, `sps_snarky_scroll_curve`.

## Deployment

**Pages (automatic):** one-time, set repo Settings → Pages → Source: “GitHub
Actions”. Every push to `main` then rebuilds `dist/` from the same TS source
as the Edge Function and publishes it. No secrets: the workflow env is public.

**Functions (manual, when API/redirect code changes):** project
`nqcshihyfhthywpseilx`.

```bash
supabase functions deploy snarky-how-to --project-ref nqcshihyfhthywpseilx --no-verify-jwt
supabase functions deploy snarky-youtube --project-ref nqcshihyfhthywpseilx --no-verify-jwt
```

`--no-verify-jwt` is intentional for these public endpoints. The browser never receives the Supabase service-role key; database writes happen server-side.

**Env (`supabase secrets set`, then redeploy):**

| Var | Value | Effect |
|---|---|---|
| `SITE_BASE_URL` | `https://anastaysia94-sudo.github.io/snarkyhowtos` | YouTube redirects land on the rendered site; function canonicals point at Pages |
| `YOUTUBE_CHANNEL_URL` | only if the handle moves | default is already `@SnarkyHowTos` |
| `NEWSLETTER_URL` | Beehiiv URL when it exists | flips newsletter CTAs from “opening soon” to live |

## Video pipeline

```bash
pip install -r requirements-video.txt   # plus: ffmpeg, ffprobe, espeak (or Piper)
python tools/snarky_video_factory.py content/youtube/episode-001/scenes.json full out/ --dry-run
python tools/snarky_video_factory.py content/youtube/episode-001/scenes.json full out/
python tools/snarky_video_factory.py content/youtube/episode-001/scenes.json short out/
```

Natural voice (free/offline): install Piper, export `SNARKY_TTS_ENGINE=piper`
and `SNARKY_PIPER_MODEL=/path/to/voice.onnx`. Falls back to espeak if missing.

## Truth and safety rules

- Do not promise income.
- Do not fabricate customers, testimonials, results, or revenue.
- Do not collect personal information unless a feature genuinely requires it and the privacy model is updated first.
- Keep humor useful. The reader is not the punching bag.
- Money is always labeled: see `/disclosure` and `MONETIZATION.md` (banned list included).
