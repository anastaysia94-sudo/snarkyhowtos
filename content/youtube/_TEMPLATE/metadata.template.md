# Episode 0NN — YouTube Launch Record

Copy this file to `content/youtube/episode-0NN/metadata.md` and fill every field before upload. No placeholders ship.

## Full video

**Title (≤100 chars, keyword first):**
**Rendered format:** 1920x1080, H.264 video, AAC audio, 30 fps
**Rendered artifact:** `snarky_how_to_0NN_full.mp4` (release artifact, NOT in Git)
**Thumbnail artifact:** `snarky_how_to_0NN_full_thumbnail.png` (A/B: `_alt` variant)
**Caption sources:** `full.srt` + `full.vtt`
**Trackable description link:** `https://nqcshihyfhthywpseilx.supabase.co/functions/v1/snarky-youtube?campaign=snarky_0NN_full`
(Post-domain: use `https://snarkyhowto.com/go?campaign=snarky_0NN_full` instead — same tracking, renders on our headers. See `cloudflare/README.md`.)

### Description (paste-ready; chapters from `*_chapters.txt`)

### Chapters (must match rendered timestamps)

### Suggested tags (≤500 chars total)

## Short

**Title (≤60 chars + #Shorts):**
**Rendered format:** 1080x1920 vertical, H.264 video, AAC audio, 30 fps
**Rendered artifact:** `snarky_how_to_0NN_short.mp4`
**Caption sources:** `short.srt` + `short.vtt`
**Trackable link:** `.../snarky-youtube?campaign=snarky_0NN_short`

### Short description (≤150 chars visible + link)

## Pre-publish checklist

- [ ] `scenes.json` dry-run reviewed (`--dry-run`)
- [ ] Voice disclosed (synthetic/natural) in description + pinned comment
- [ ] Chapters verified against render (first stamp `00:00`)
- [ ] Trackable link tested (302 → guide with `from=youtube&campaign=...`)
- [ ] End screen + pinned comment point at guide/offer picker
- [ ] Added to `/episodes` + sitemap status flipped to live in `config.ts`
- [ ] 48h + 7d analytics review scheduled
