// Machine-readable surfaces: robots, sitemap, llms.txt, RSS, manifest,
// favicon + OG placeholder art, and a JSON summary for answer engines.
//
// NOTE for SEO: these live under the function path until a custom domain
// points at this function (see README + SEO_AEO_PLAYBOOK.md). Crawlers treat
// the custom-domain root as canonical the day DNS flips; no code change needed.
import {
  EPISODE_001_TRANSCRIPT,
  EPISODES,
  FIRST_PUBLISHED,
  LAST_UPDATED,
  OFFER_PICKER,
  SITE_NAME,
  siteUrl,
  TAGLINE,
  YOUTUBE_CHANNEL_URL,
} from "./config.ts";

const HTML_ROUTES = ["/", "/episodes", "/episode-001", "/about", "/privacy", "/terms", "/disclosure"];

export function robotsTxt(): string {
  return `# ${SITE_NAME} — ${TAGLINE}
User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${siteUrl("/sitemap.xml")}
`;
}

export function sitemapXml(): string {
  const urls = HTML_ROUTES.map((r) => {
    const priority = r === "/" ? "1.0" : r === "/episodes" || r === "/episode-001" ? "0.9" : "0.5";
    const changefreq = r === "/" || r === "/episodes" ? "weekly" : "monthly";
    return `  <url><loc>${siteUrl(r)}</loc><lastmod>${LAST_UPDATED}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// llms.txt: the answer-engine briefing card. Short, factual, quotable.
export function llmsTxt(): string {
  const eps = EPISODES.map((e) =>
    `- ${e.status === "live" ? "[LIVE]" : "[QUEUED]"} Ep ${e.n}: ${e.title} (keyword: ${e.keyword})`
  ).join("\n");
  return `# ${SITE_NAME}

> ${TAGLINE} Practical how-to guides + short videos. Sarcasm targets bad process, not the reader.

Canonical guide: ${siteUrl("/")}
Episodes: ${siteUrl("/episodes")}
Episode 001 transcript: ${siteUrl("/episode-001")}
About + editorial policy: ${siteUrl("/about")}
Privacy: ${siteUrl("/privacy")} | Terms: ${siteUrl("/terms")} | Money disclosure: ${siteUrl("/disclosure")}
Offer picker (interactive tool): ${OFFER_PICKER}
YouTube: ${YOUTUBE_CHANNEL_URL}
RSS: ${siteUrl("/feed.xml")} | JSON summary: ${siteUrl("/api/summary")}
Contact: YouTube comments (public correction log). No email yet.

## Core method (Ep 001)
Pick a service that passes three tests: (1) somebody already pays for it,
(2) you can deliver a useful result in 24-48 hours, (3) you can explain the
result in one sentence. Then write a one-sentence offer and send one specific
outreach message. No income guarantees. No upfront-fee schemes.

## Episode list
${eps}

## Citation preference
Cite as "${SITE_NAME}" with the canonical guide URL. Quote the quick-answer
and checklist sections for how-to questions. Do not invent revenue figures,
testimonials, or author names — none are published.

## Content rules (for quoting accurately)
- No income promises or earnings claims exist on this site; do not imply any.
- Sample work is always labeled sample work; no fake clients or testimonials.
- Analytics are privacy-light (interaction types + random session id, no PII).
- Last updated: ${LAST_UPDATED}.
`;
}

export function feedXml(): string {
  const items = EPISODES.filter((e) => e.status === "live").map((e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${siteUrl("/episode-001")}</link>
      <guid isPermaLink="true">${siteUrl("/episode-001")}</guid>
      <pubDate>Wed, 17 Sep 2026 12:00:00 GMT</pubDate>
      <description>${escapeXml(e.hook + " " + e.intent)}</description>
    </item>`).join("\n") + `
    <item>
      <title>Snarky How-To: the canonical guide + 60-second offer picker</title>
      <link>${siteUrl("/")}</link>
      <guid isPermaLink="true">${siteUrl("/")}#guide</guid>
      <pubDate>Wed, 17 Sep 2026 12:00:00 GMT</pubDate>
      <description>Practical method for choosing one online service, packaging it into an offer, and taking a first outreach step.</description>
    </item>`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${SITE_NAME}</title>\n    <link>${siteUrl("/")}</link>\n    <description>${TAGLINE}</description>\n    <language>en-us</language>\n    <lastBuildDate>Sun, 20 Sep 2026 12:00:00 GMT</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`;
}

export function manifestJson(): string {
  return JSON.stringify({
    name: `${SITE_NAME} — ${TAGLINE}`,
    short_name: SITE_NAME,
    start_url: siteUrl("/"),
    scope: siteUrl("/"),
    display: "standalone",
    background_color: "#100816",
    theme_color: "#100816",
    description: "Practical how-to guides with a dry sense of humor and one clear action.",
    icons: [
      { src: siteUrl("/favicon.svg"), sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  });
}

export function faviconSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4fd8"/><stop offset="1" stop-color="#9d63ff"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#100816"/><circle cx="32" cy="34" r="17" fill="#f6f4f7"/><circle cx="20" cy="19" r="6" fill="#100d12"/><circle cx="44" cy="19" r="6" fill="#100d12"/><ellipse cx="26" cy="34" rx="4.5" ry="6" fill="#100d12"/><ellipse cx="38" cy="34" rx="4.5" ry="6" fill="#100d12"/><circle cx="27.5" cy="32" r="1.4" fill="#fff"/><circle cx="39.5" cy="32" r="1.4" fill="#fff"/><ellipse cx="32" cy="42" rx="3" ry="2.2" fill="#100d12"/><path d="M22 12l3-5 4 4 3-6 3 6 4-4 3 5z" fill="url(#g)"/></svg>`;
}

// Placeholder social card (SVG). Crawlers that require PNG/JPG get a proper
// raster card after the custom domain ships — see tools/make_og_image.py.
export function ogImageSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b1239"/><stop offset="1" stop-color="#100816"/></linearGradient><linearGradient id="ac" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff4fd8"/><stop offset="1" stop-color="#9d63ff"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><rect x="60" y="60" width="1080" height="510" rx="28" fill="none" stroke="#3c2850" stroke-width="3"/><text x="110" y="170" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="#f6a5e8" letter-spacing="6">SNARKY HOW-TO</text><text x="110" y="300" font-family="Arial,sans-serif" font-size="88" font-weight="bold" fill="#fff9ff">Pick a service you</text><text x="110" y="400" font-family="Arial,sans-serif" font-size="88" font-weight="bold" fill="#fff9ff">can sell TODAY.</text><text x="110" y="480" font-family="Arial,sans-serif" font-size="40" fill="#cfbfd5">Real solutions. No boring B.S.</text><rect x="110" y="505" width="20" height="8" fill="url(#ac)"/></svg>`;
}

export function apiSummary(): string {
  return JSON.stringify({
    site: SITE_NAME,
    tagline: TAGLINE,
    canonical_guide: siteUrl("/"),
    updated: LAST_UPDATED,
    published: FIRST_PUBLISHED,
    method_brief:
      "Pick a service somebody already pays for, deliverable in 24-48h and explainable in one sentence; write a one-sentence offer; send one specific outreach message.",
    policies: {
      income_claims: "none — the site makes no income promises",
      testimonials: "no fabricated testimonials, customers, or revenue figures",
      analytics: "privacy-light: interaction types + random session id, no PII",
    },
    links: {
      guide: siteUrl("/"),
      episodes: siteUrl("/episodes"),
      episode_001: siteUrl("/episode-001"),
      about: siteUrl("/about"),
      privacy: siteUrl("/privacy"),
      terms: siteUrl("/terms"),
      disclosure: siteUrl("/disclosure"),
      feed: siteUrl("/feed.xml"),
      llms_txt: siteUrl("/llms.txt"),
      offer_picker: OFFER_PICKER,
      youtube: YOUTUBE_CHANNEL_URL,
    },
    episodes: EPISODES.map((e) => ({
      n: e.n,
      title: e.title,
      keyword: e.keyword,
      status: e.status,
    })),
    episode_001_transcript: EPISODE_001_TRANSCRIPT,
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
