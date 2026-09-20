// Static export: render every site route to dist/ for GitHub Pages.
//
// Same source of truth as the Edge Function (imports the same page/seo
// modules), so the function and the static site can never drift apart.
//
// Required env (see .github/workflows/pages.yml):
//   SUPABASE_URL      real project URL (baked into pages as analytics target)
//   SITE_BASE_URL     public Pages URL, e.g. https://<owner>.github.io/snarkyhowtos
//   SUPABASE_SERVICE_ROLE_KEY=dummy (import-time only; export touches no DB)
//
// Run: deno run --allow-env --allow-read --allow-write --allow-import tools/export_static.ts
import { homePage } from "../supabase/functions/snarky-how-to/lib/pages/home.ts";
import { episodesPage } from "../supabase/functions/snarky-how-to/lib/pages/episodes.ts";
import { episode001Page } from "../supabase/functions/snarky-how-to/lib/pages/episode001.ts";
import {
  aboutPage,
  disclosurePage,
  notFoundPage,
  privacyPage,
  termsPage,
} from "../supabase/functions/snarky-how-to/lib/pages/static.ts";
import {
  apiSummary,
  faviconSvg,
  feedXml,
  llmsTxt,
  manifestJson,
  ogImageSvg,
  robotsTxt,
  sitemapXml,
} from "../supabase/functions/snarky-how-to/lib/seo.ts";
import { siteUrl } from "../supabase/functions/snarky-how-to/lib/config.ts";

const DIST = new URL("../dist/", import.meta.url);

async function write(rel: string, text: string): Promise<void> {
  const url = new URL(rel, DIST);
  await Deno.mkdir(new URL("./", url), { recursive: true });
  await Deno.writeTextFile(url, text);
  console.log(`wrote dist/${rel} (${text.length} chars)`);
}

async function main(): Promise<void> {
  const base = siteUrl("/");
  if (base.includes("example.supabase.co")) {
    throw new Error("Refusing to export with dummy SUPABASE_URL — set real env (see pages.yml).");
  }
  if (base.includes("/functions/v1/")) {
    console.log("WARNING: SITE_BASE_URL not set — canonicals point at the raw function URL.");
  }
  console.log(`exporting site with base ${base}`);

  // HTML routes. Dual-write (page.html + page/index.html) covers both the
  // extensionless URL (/about -> about.html) and the trailing-slash URL
  // (/about/ -> about/index.html) on GitHub Pages. Canonical tags keep SEO
  // clean regardless of which form a crawler lands on.
  const pages: Array<[string, () => string]> = [
    ["episodes", episodesPage],
    ["episode-001", episode001Page],
    ["about", aboutPage],
    ["privacy", privacyPage],
    ["terms", termsPage],
    ["disclosure", disclosurePage],
  ];
  await write("index.html", homePage());
  for (const [slug, render] of pages) {
    const html = render();
    await write(`${slug}.html`, html);
    await write(`${slug}/index.html`, html);
  }
  // Parity with the function's /episode-1 alias: tiny client redirect.
  await write(
    "episode-1.html",
    `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${siteUrl("/episode-001")}">` +
      `<link rel="canonical" href="${siteUrl("/episode-001")}">` +
      `<title>Redirecting…</title></head><body><a href="${siteUrl("/episode-001")}">Continue to Episode 001</a></body></html>`,
  );
  await write("404.html", notFoundPage("/404"));

  // Machine surfaces (root paths crawlers expect).
  await write("robots.txt", robotsTxt());
  await write("sitemap.xml", sitemapXml());
  await write("llms.txt", llmsTxt());
  await write("feed.xml", feedXml());
  await write("rss.xml", feedXml());
  await write("manifest.webmanifest", manifestJson());
  await write("favicon.svg", faviconSvg());
  await write("og-image.svg", ogImageSvg());
  // /api/summary is linked as extensionless; Pages serves it from the .html
  // file as text/html. Body is still JSON (curl|jq unaffected); the .json
  // twin exists for clients that prefer an honest content type.
  await write("api/summary.html", apiSummary());
  await write("api/summary.json", apiSummary());

  // Tell Pages to skip Jekyll processing (we ship finished files).
  await write(".nojekyll", "");
  console.log("export complete.");
}

await main();
