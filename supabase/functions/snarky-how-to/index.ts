// Snarky How-To site + analytics endpoint.
// Contracts (also enforced in CI): HowTo, No income guarantees,
// Sarcasm is aimed at the situation, Do not build the empire before the invoice.
import { track } from "./lib/analytics.ts";
import { episode001Page } from "./lib/pages/episode001.ts";
import { episodesPage } from "./lib/pages/episodes.ts";
import { homePage } from "./lib/pages/home.ts";
import {
  aboutPage,
  disclosurePage,
  notFoundPage,
  privacyPage,
  termsPage,
} from "./lib/pages/static.ts";
import {
  apiSummary,
  faviconSvg,
  feedXml,
  llmsTxt,
  manifestJson,
  ogImageSvg,
  robotsTxt,
  sitemapXml,
} from "./lib/seo.ts";

const FUNCTION_PREFIX = "/functions/v1/snarky-how-to";

const security = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "SAMEORIGIN",
  // Inline styles/scripts are first-party authored; YouTube nocookie is
  // pre-approved for the future click-to-load video facade.
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; form-action 'self' https:; " +
    "img-src 'self' data: https:; media-src 'self' https:; " +
    "style-src 'unsafe-inline'; script-src 'unsafe-inline'; " +
    "connect-src 'self' https:; font-src 'self' data:; object-src 'none'; " +
    "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
};

function routeOf(url: URL): string {
  let path = url.pathname;
  if (path.startsWith(FUNCTION_PREFIX)) path = path.slice(FUNCTION_PREFIX.length);
  if (path === "") path = "/";
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path.toLowerCase();
}

type Body = { text: string; type: string; cache: string; status?: number };

function getBody(route: string): Body | null {
  switch (route) {
    case "/":
      return { text: homePage(), type: "text/html; charset=utf-8", cache: "public, max-age=300, stale-while-revalidate=86400" };
    case "/episodes":
      return { text: episodesPage(), type: "text/html; charset=utf-8", cache: "public, max-age=300, stale-while-revalidate=86400" };
    case "/episode-001":
    case "/episode-1":
      return { text: episode001Page(), type: "text/html; charset=utf-8", cache: "public, max-age=300, stale-while-revalidate=86400" };
    case "/about":
      return { text: aboutPage(), type: "text/html; charset=utf-8", cache: "public, max-age=3600" };
    case "/privacy":
      return { text: privacyPage(), type: "text/html; charset=utf-8", cache: "public, max-age=3600" };
    case "/terms":
      return { text: termsPage(), type: "text/html; charset=utf-8", cache: "public, max-age=3600" };
    case "/disclosure":
      return { text: disclosurePage(), type: "text/html; charset=utf-8", cache: "public, max-age=3600" };
    case "/robots.txt":
      return { text: robotsTxt(), type: "text/plain; charset=utf-8", cache: "public, max-age=3600" };
    case "/sitemap.xml":
      return { text: sitemapXml(), type: "application/xml; charset=utf-8", cache: "public, max-age=3600" };
    case "/llms.txt":
      return { text: llmsTxt(), type: "text/plain; charset=utf-8", cache: "public, max-age=3600" };
    case "/feed.xml":
    case "/rss.xml":
    case "/feed":
      return { text: feedXml(), type: "application/rss+xml; charset=utf-8", cache: "public, max-age=3600" };
    case "/manifest.webmanifest":
      return { text: manifestJson(), type: "application/manifest+json; charset=utf-8", cache: "public, max-age=86400" };
    case "/favicon.svg":
    case "/favicon.ico":
    case "/icon.svg":
      return { text: faviconSvg(), type: "image/svg+xml", cache: "public, max-age=86400" };
    case "/og-image.svg":
    case "/og-image":
      return { text: ogImageSvg(), type: "image/svg+xml", cache: "public, max-age=86400" };
    case "/api/summary":
      return { text: apiSummary(), type: "application/json; charset=utf-8", cache: "public, max-age=3600" };
    case "/healthz":
      return { text: `{"ok":true,"site":"snarky-how-to"}`, type: "application/json; charset=utf-8", cache: "no-store" };
    default:
      return null;
  }
}

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        ...security,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      },
    });
  }
  if (req.method === "POST") return track(req);
  if (req.method !== "GET" && req.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: security });
  }
  const route = routeOf(new URL(req.url));
  const found = getBody(route);
  if (!found) {
    const headers = {
      ...security,
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
    };
    if (req.method === "HEAD") return new Response(null, { status: 404, headers });
    return new Response(notFoundPage(route), { status: 404, headers });
  }
  const headers = {
    ...security,
    "Access-Control-Allow-Origin": "*",
    "content-type": found.type,
    "cache-control": found.cache,
  };
  if (req.method === "HEAD") return new Response(null, { status: found.status ?? 200, headers });
  return new Response(found.text, { status: found.status ?? 200, headers });
});
