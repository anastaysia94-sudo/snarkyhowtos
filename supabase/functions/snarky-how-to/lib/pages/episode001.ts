// Episode 001 detail page: chapters, full transcript (SEO/AEO gold),
// trackable YouTube links, and VideoObject structured data with Clip parts.
import {
  EPISODE_001_CHAPTERS,
  EPISODE_001_DURATION_ISO,
  EPISODE_001_TRANSCRIPT,
  FIRST_PUBLISHED,
  LAST_UPDATED,
  OFFER_PICKER,
  siteUrl,
  SUPABASE_URL,
  YOUTUBE_CHANNEL_URL,
} from "../config.ts";
import {
  breadcrumbSchema,
  crumbs,
  moneyStrip,
  newsBox,
  orgSchema,
  shell,
} from "../layout.ts";

function youtubeEntry(campaign: string): string {
  return `${SUPABASE_URL}/functions/v1/snarky-youtube?campaign=${campaign}`;
}

function isoOffset(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m}M${s}S`;
}

export function episode001Page(): string {
  const chapterRows = EPISODE_001_CHAPTERS.map((c) =>
    `<tr><td><code class="inline">${c.t}</code></td><td>${c.title}</td></tr>`
  ).join("");
  const transcript = EPISODE_001_TRANSCRIPT.map((p, i) =>
    `<p><b>[${EPISODE_001_CHAPTERS[i] ? EPISODE_001_CHAPTERS[i].t : ""}]</b> ${p}</p>`
  ).join("");

  const body = `
<section class="hero" style="padding-bottom:10px"><div>
<div class="kicker">Episode 001 · Full video + Short</div>
<h1>Pick a service you can sell online today.</h1>
<p class="lede">The 1:49 companion to the guide: one annoying problem, one visible result, one buyer. Fake board meeting not required.</p>
<div class="actions">
<a class="btn primary" data-track="youtube_click" data-placement="ep001" href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">▶ Watch on YouTube</a>
<a class="btn secondary" data-track="offer_picker_click" data-placement="ep001" href="${OFFER_PICKER}" target="_blank" rel="noopener">Open the offer picker →</a>
</div>
<div class="trust">Production note: launch narration is synthetic and clearly labeled; the script, pacing, and analytics are production-ready. A natural voice can replace it without changing anything else.</div>
</div><div class="mascot" role="img" aria-label="Film clapperboard and panda">🎬🐼</div></section>
<main class="wrap">
${crumbs([{ href: "/", label: "Guide" }, { href: "/episodes", label: "Episodes" }, { label: "Episode 001" }])}
<h2>Chapters</h2>
<table class="sheet"><thead><tr><th>Time</th><th>Chapter</th></tr></thead><tbody>${chapterRows}</tbody></table>
<p class="note">Timestamps match the rendered full video. YouTube chapters go live on publish; the description link below is the trackable entry point.</p>
<h2>Trackable links (for the video description)</h2>
<div class="grid">
<div class="card"><b>Full video link</b><br><code class="inline">campaign=snarky_001_full</code><div class="actions"><a class="btn secondary" data-track="youtube_click" data-placement="ep001-link-full" href="${youtubeEntry("snarky_001_full")}" target="_blank" rel="noopener">Open tracked link</a></div></div>
<div class="card"><b>Short link</b><br><code class="inline">campaign=snarky_001_short</code><div class="actions"><a class="btn secondary" data-track="youtube_click" data-placement="ep001-link-short" href="${youtubeEntry("snarky_001_short")}" target="_blank" rel="noopener">Open tracked link</a></div></div>
</div>
<h2>Full transcript</h2>
<details class="faq" data-faq="episode-001-transcript" open><summary>Read the 1:49 script (great for search + accessibility)</summary><div class="a">${transcript}</div></details>
<p class="fine">Formats: full 1920×1080 + vertical 1080×1920 Short, H.264/AAC 30fps, SRT captions in the repo. Thumbnails and caption files ship with every episode.</p>
${moneyStrip()}
${newsBox("episode-001")}
<section class="final"><h2>Watched it? Do the 60-second version.</h2><p>The guide + offer picker turn the episode into a sent offer.</p><div class="actions" style="justify-content:center"><a class="btn primary" data-track="offer_picker_click" data-placement="ep001-final" href="${OFFER_PICKER}" target="_blank" rel="noopener">Open the offer picker →</a><a class="btn secondary" href="${siteUrl("/")}">Re-read the guide</a></div></section>
</main>`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema(),
        {
          "@type": "VideoObject",
          "name": "How to Pick a Service You Can Sell Online TODAY (Without Building a Fake Empire)",
          "description": "A Snarky How-To walkthrough: a simple filter for choosing one online service, packaging one visible outcome, and sending one specific offer. No income guarantees. No fake testimonials.",
          "thumbnailUrl": [siteUrl("/og-image.svg")],
          "uploadDate": FIRST_PUBLISHED,
          "dateModified": LAST_UPDATED,
          "duration": EPISODE_001_DURATION_ISO,
          "transcript": EPISODE_001_TRANSCRIPT.join(" "),
          "publisher": { "@id": `${siteUrl("/")}#org` },
          "hasPart": EPISODE_001_CHAPTERS.map((c, i) => ({
            "@type": "Clip",
            "name": c.title,
            "startOffset": isoOffset(c.seconds),
            "endOffset": isoOffset(
              i + 1 < EPISODE_001_CHAPTERS.length ? EPISODE_001_CHAPTERS[i + 1].seconds : 109,
            ),
            "url": siteUrl("/episode-001"),
          })),
        },
        breadcrumbSchema([
          { href: "/", label: "Guide" },
          { href: "/episodes", label: "Episodes" },
          { href: "/episode-001", label: "Episode 001" },
        ]),
      ],
    },
  ];

  return shell({
    route: "/episodes",
    title: "Episode 001: Pick a Service You Can Sell Online Today (Transcript) | Snarky How-To",
    description: "Episode 001 full transcript + chapters: choose one online service, package one visible outcome, and send one specific offer. Full video + Short.",
    canonicalPath: "/episode-001",
    schemas,
    body,
  });
}
