# Handoff

```
assistant: Arena
repo: anastaysia94-sudo/snarkyhowtos
branch: arena/01a0bece-snarkyhowtos
when: 2026-09-20
```

Bold rewrite, all 3 tracks (quality, SEO/AEO, YouTube+ads-first monetization on the free stack). Voice kept.

Changed:
- snarky-how-to: single page -> multi-route site (/, /episodes, /episode-001,
  /about, /privacy, /terms, /disclosure, 404, robots, sitemap, feed, llms.txt,
  /api/summary, manifest, favicon/OG SVG, healthz). Schemas: Article+HowTo+
  FAQPage+VideoObject(Clips+transcript)+ItemList+Breadcrumbs+Speakable.
  Analytics: +newsletter/youtube/faq/checklist/affiliate/episode events,
  honeypot, security headers, per-type caching, SITE_BASE_URL override.
- snarky-youtube: regex campaigns for all 10 eps (full+short), ?action=subscribe,
  UTM passthrough.
- migration 202609200001: path/session indexes + daily/campaign-funnel/scroll
  reporting views (no PII).
- video factory v2: loudness-normalized audio, VTT + chapters + description
  outputs, A/B thumbnails, font fallback, Piper TTS w/ espeak fallback,
  --dry-run. New tools/make_og_image.py for raster social cards.
- content: queue expanded (SEO titles/keywords/hooks/assets/YPP tracker),
  _TEMPLATE/ for 002-010, episode-001 untouched (shipped source).
- docs: MONETIZATION.md (ladder + 90-day plan + banned list),
  SEO_AEO_PLAYBOOK.md (ritual + acceptance criteria), README rewritten.
- CI: deno check all routes, pip install + dry-run, expanded contract greps,
  local route smoke (GETs + POST 400s, no DB), local youtube 302 test, live
  smoke kept.

Validated locally: py_compile, json.tool, all contract greps, node --check on
both inline scripts, bash -n on all CI blocks, TS import graph resolves,
backtick balance. No Deno/network in sandbox: `deno check` + local serve run
in CI.

Next human steps: verify YOUTUBE_CHANNEL_URL, deploy both functions, run the
new migration, buy domain + set SITE_BASE_URL, create Beehiiv + set
NEWSLETTER_URL, submit sitemap, publish Ep 001, flip /episodes live per ep.
