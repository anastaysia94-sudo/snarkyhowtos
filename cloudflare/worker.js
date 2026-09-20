// Cloudflare Worker: public front door for Snarky How-To.
//
// WHY THIS EXISTS: Supabase's gateway force-serves Edge Function responses on
// *.supabase.co as `Content-Type: text/plain` plus
// `Content-Security-Policy: default-src 'none'; sandbox` plus `nosniff`
// (anti-abuse protection on their shared domain — verified 2026-09-20 via
// response headers; see cloudflare/README.md). Browsers therefore display the
// guide's HTML source instead of rendering it, and crawlers won't index it.
// This Worker runs on OUR domain, where we control headers, and restores the
// correct content types + security headers the function already sends.
//
// Routes (configured in wrangler.toml after the domain purchase):
//   snarkyhowto.com/go?campaign=...  -> snarky-youtube (trackable links)
//   snarkyhowto.com/<anything-else>   -> snarky-how-to site + analytics
//
// Free tier: 100k requests/day. No secrets: both origins are public endpoints.

// Keep in sync with supabase/functions/snarky-how-to/index.ts `security`.
const SECURITY_HEADERS = {
  "content-security-policy":
    "default-src 'self'; base-uri 'self'; form-action 'self' https:; " +
    "img-src 'self' data: https:; media-src 'self' https:; " +
    "style-src 'unsafe-inline'; script-src 'unsafe-inline'; " +
    "connect-src 'self' https:; font-src 'self' data:; object-src 'none'; " +
    "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "x-frame-options": "SAMEORIGIN",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "x-content-type-options": "nosniff",
};

// Gateway-added / upstream-debug headers that must not leak to visitors.
const STRIP_HEADERS = [
  "set-cookie",
  "content-security-policy", // gateway's sandbox policy; we set our own below
  "sb-gateway-version",
  "sb-project-ref",
  "sb-request-id",
  "x-deno-execution-id",
  "x-served-by",
  "x-sb-edge-region",
  "endpoint-load-metrics",
];

// The gateway clobbers upstream content types, so map by request path.
// Keep in sync with the route table in snarky-how-to/index.ts.
function contentTypeFor(method, path) {
  if (method === "POST") return "application/json; charset=utf-8";
  if (path.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (path.endsWith(".webmanifest")) return "application/manifest+json; charset=utf-8";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".xml")) {
    return path.endsWith("feed.xml") || path.endsWith("rss.xml")
      ? "application/rss+xml; charset=utf-8"
      : "application/xml; charset=utf-8";
  }
  if (path === "/api/summary" || path === "/healthz") {
    return "application/json; charset=utf-8";
  }
  return "text/html; charset=utf-8";
}

export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    const method = request.method.toUpperCase();

    // Cheap CORS preflight: answer at the edge, spare the origin.
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...SECURITY_HEADERS,
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "content-type",
          "access-control-allow-methods": "GET,POST,OPTIONS",
          "cache-control": "no-store",
        },
      });
    }

    const isGo = incoming.pathname === "/go" || incoming.pathname === "/go/";
    // String concat on purpose: the origin bases include the function path
    // (/functions/v1/...), which the URL constructor would drop for absolute
    // paths. Bases have no trailing slash; pathname always starts with "/".
    const upstreamUrl = isGo
      ? env.ORIGIN_YT + incoming.search
      : env.ORIGIN_SITE + incoming.pathname + incoming.search;

    let upstreamRes;
    try {
      upstreamRes = await fetch(upstreamUrl, {
        method: request.method,
        headers: request.headers,
        body: method === "GET" || method === "HEAD" ? undefined : request.body,
        redirect: "manual",
        // Cache GETs at the edge using the origin's own Cache-Control.
        cf: method === "GET" ? { cacheEverything: true } : undefined,
      });
    } catch {
      return new Response("Origin unreachable. The panda has been notified.", {
        status: 502,
        headers: { ...SECURITY_HEADERS, "content-type": "text/plain; charset=utf-8" },
      });
    }

    const headers = new Headers(upstreamRes.headers);
    for (const h of STRIP_HEADERS) headers.delete(h);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);

    // /go redirects point at the raw function URL: rewrite to our domain so
    // visitors (and video-description links) stay on the brand.
    const location = headers.get("location");
    if (location && location.startsWith(env.ORIGIN_SITE)) {
      headers.set("location", location.replace(env.ORIGIN_SITE, incoming.origin));
    }

    // Redirects have no body to type; everything else gets the mapped type.
    if (!(upstreamRes.status >= 300 && upstreamRes.status < 400)) {
      headers.set("content-type", contentTypeFor(method, incoming.pathname));
    }

    return new Response(
      method === "HEAD" ? null : upstreamRes.body,
      { status: upstreamRes.status, headers },
    );
  },
};
