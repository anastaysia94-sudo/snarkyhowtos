# Public proxy: why the raw function URL shows code, and the fix

## The problem (verified 2026-09-20)

Open the raw function URL in a browser:

`https://nqcshihyfhthywpseilx.supabase.co/functions/v1/snarky-how-to`

You see HTML **source code**, not the rendered guide. The function code is
correct — it sends `content-type: text/html`. Supabase's gateway overrides it
on the shared `*.supabase.co` domain. Actual live response headers:

```
Content-Type: text/plain
Content-Security-Policy: default-src 'none'; sandbox
X-Content-Type-Options: nosniff
x-served-by: supabase-edge-runtime
```

That combination is deliberate anti-abuse protection: it makes it impossible
to host active HTML (phishing, malware, or… a panda with opinions) on
Supabase's own domain. Side effects beyond ugly rendering:

- Google won't index the "page" properly (it's `text/plain` to crawlers too).
- Link previews and YouTube-description clicks land on source code.
- Even if the content type passed, the `sandbox` CSP would kill all JS/CSS.

So: **no website can ever render directly from `*.supabase.co/functions/v1/*`.
The site must be served from our own domain**, where we control headers.

## The fix: this Cloudflare Worker (free)

`worker.js` sits on our domain and, per request:

1. Forwards `/go?campaign=...` → the `snarky-youtube` redirect (trackable
   video links become `https://snarkyhowto.com/go?campaign=snarky_001_full`),
   rewriting the redirect target back onto our domain.
2. Forwards everything else → the `snarky-how-to` site + analytics.
3. Re-applies the correct `content-type` per path (the gateway clobbered it).
4. Deletes the gateway's `sandbox` CSP and sets ours (mirrored from the
   function — keep the two in sync).
5. Strips upstream debug headers + `set-cookie`, answers CORS preflights at
   the edge, and edge-caches GETs per the origin's `Cache-Control`.

Cost: $0 (Workers free tier: 100k req/day). No secrets: both origins are
already public endpoints.

## Setup (do once, ~20 minutes)

1. Buy the domain via Cloudflare Registrar (~$10/yr, the project's one bill).
2. Add it to Cloudflare (free plan) and point nameservers if asked.
3. `npm i -g wrangler && wrangler login`
4. Uncomment `routes` in `cloudflare/wrangler.toml` with the real domain.
5. `wrangler deploy` from the repo root.
6. Point the function at the new canonical (no code change needed):
   `supabase secrets set SITE_BASE_URL=https://snarkyhowto.com`
   then redeploy both functions (see main README).
7. Verify:
   - `curl -sSI https://snarkyhowto.com/ | grep -i content-type`
     → expect `text/html` (not `text/plain`).
   - Open `/`, `/episodes`, `/episode-001` in a browser: rendered, styled,
     checklist + share buttons working.
   - `curl -sSI 'https://snarkyhowto.com/go?campaign=snarky_001_full'`
     → expect `302` with `location:` on our own domain.
8. Update all video descriptions + pinned comments to the `/go` links, and
   submit `https://snarkyhowto.com/sitemap.xml` to Search Console + Bing.

Rollback: delete the Worker routes in Cloudflare dashboard. The raw function
URLs keep working as the API/legacy fallback (analytics POSTs are unaffected
by content type).

## Keep-in-sync checklist (when touching the function)

- `SECURITY_HEADERS` here == `security` in
  `supabase/functions/snarky-how-to/index.ts`.
- `contentTypeFor()` here covers every route in that file's route table.
- `/go` redirect-target rewrite assumes the youtube function redirects to
  `ORIGIN_SITE` — update if that ever changes.
