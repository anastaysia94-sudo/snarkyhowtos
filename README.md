# Snarky How-To

Practical how-to content with a dry sense of humor and a measurable action path.

**Live guide:** https://nqcshihyfhthywpseilx.supabase.co/functions/v1/snarky-how-to

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

Production currently runs on Supabase project `nqcshihyfhthywpseilx`.

```bash
supabase functions deploy snarky-how-to --project-ref nqcshihyfhthywpseilx --no-verify-jwt
supabase functions deploy snarky-youtube --project-ref nqcshihyfhthywpseilx --no-verify-jwt
```

`--no-verify-jwt` is intentional for these public endpoints. The browser never receives the Supabase service-role key; database writes happen server-side.

Optional env (set with `supabase secrets set`): `SITE_BASE_URL` (custom domain —
flips all canonicals, no code change), `YOUTUBE_CHANNEL_URL`, `NEWSLETTER_URL`.

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
