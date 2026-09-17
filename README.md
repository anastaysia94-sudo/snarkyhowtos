# Snarky How-To

Practical how-to content with a dry sense of humor and a measurable action path.

**Live guide:** https://nqcshihyfhthywpseilx.supabase.co/functions/v1/snarky-how-to

## What this repo is

This is the canonical source for the Snarky How-To website and YouTube production pipeline.

Current loop:

`searchable guide -> useful action -> downloadable/copyable asset -> tracked CTA -> offer picker -> analytics`

The sarcasm is aimed at ridiculous situations and bad process, not at the reader.

## Current shipped pieces

- Supabase Edge Function serving the first searchable how-to guide.
- Privacy-light analytics that records interaction types, not names/emails/GPS.
- Trackable YouTube entry redirect for Episode 001 full + Short.
- Episode 001 metadata and captions plus reusable video-factory source.
- SEO/AEO metadata and `HowTo` structured data.

## Repository layout

- `supabase/functions/snarky-how-to/` - public how-to page + analytics endpoint.
- `supabase/functions/snarky-youtube/` - tracked YouTube-to-site redirect.
- `supabase/migrations/` - database schema needed by the app.
- `content/youtube/episode-001/` - Episode 001 metadata/captions.
- `content/youtube/next-video-queue.md` - next production batch.
- `tools/` - reusable video-production tooling.
- `.github/workflows/quality.yml` - automated source and live-endpoint checks.

## Plain-English glossary

- **Edge Function:** a small server program that runs on Supabase when somebody opens the page or sends analytics.
- **Structured data:** machine-readable page information that helps search and answer engines understand what the page is about.
- **CTA (call to action):** the next useful thing we ask the viewer/reader to do.
- **CI (continuous integration):** automated checks GitHub runs after code changes so broken code is caught before humans discover it theatrically.

## Deployment

Production currently runs on Supabase project `nqcshihyfhthywpseilx`.

```bash
supabase functions deploy snarky-how-to --project-ref nqcshihyfhthywpseilx --no-verify-jwt
supabase functions deploy snarky-youtube --project-ref nqcshihyfhthywpseilx --no-verify-jwt
```

`--no-verify-jwt` is intentional for these public endpoints. The browser never receives the Supabase service-role key; database writes happen server-side.

## Truth and safety rules

- Do not promise income.
- Do not fabricate customers, testimonials, results, or revenue.
- Do not collect personal information unless a feature genuinely requires it and the privacy model is updated first.
- Keep humor useful. The reader is not the punching bag.
