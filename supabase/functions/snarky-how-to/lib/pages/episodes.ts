// Public episode index: doubles as the roadmap, the internal production
// tracker, and the SEO hub that every guide links into.
import {
  EPISODES,
  LAST_UPDATED,
  SITE_NAME,
  siteUrl,
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

export function episodesPage(): string {
  const cards = EPISODES.map((e) => {
    const live = e.status === "live";
    return `<article class="episode"><span class="badge ${live ? "live" : "soon"}">${
      live ? `Ep ${e.n} · Live` : `Ep ${e.n} · In queue`
    }</span>
<h3 style="margin:10px 0 6px">${e.title}</h3>
<p style="margin:0 0 8px;color:var(--muted)"><i>${e.hook}</i><br>Target search: <code class="inline">${e.keyword}</code> · Asset: ${e.asset}</p>
<div class="actions" style="margin-top:10px">${
      live
        ? `<a class="btn secondary" data-track="episode_view" data-placement="episodes" href="${siteUrl("/episode-001")}">Watch + transcript →</a>`
        : `<span class="fine">Full + Short + thumbnail + captions + trackable link. Publishing in order.</span>`
    }</div></article>`;
  }).join("\n");

  const body = `
<section class="hero" style="padding-bottom:10px"><div>
<div class="kicker">${SITE_NAME} · Video series</div>
<h1>Episodes: small videos, useful moves.</h1>
<p class="lede">Every topic ships as a full video plus a vertical Short, with captions, a thumbnail, and a trackable link back to the guide. No 40-minute webinars. No guru mist.</p>
<div class="actions"><a class="btn primary" data-track="youtube_subscribe_click" data-placement="episodes-hero" href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">Subscribe on YouTube →</a></div>
</div><div class="mascot" role="img" aria-label="Snarky panda mascot wearing a crown">🎬🐼</div></section>
<main class="wrap wide">
${crumbs([{ href: "/", label: "Guide" }, { label: "Episodes" }])}
${cards}
<section class="quick" style="margin-top:26px"><h2>How publishing works</h2><p style="margin:0">Each episode gets: one 16:9 full video, one 9:16 Short, thumbnail, SRT captions, description with chapters, a trackable <code class="inline">snarky_00N_full/short</code> campaign link, and a post-publish analytics review. Cadence target: one episode per week. Updated ${LAST_UPDATED}.</p></section>
${moneyStrip()}
${newsBox("episodes")}
</main>`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema(),
        {
          "@type": "CollectionPage",
          "name": "Snarky How-To Episodes",
          "description": "Full videos + Shorts that turn annoying problems into paid, packaged services.",
          "url": siteUrl("/episodes"),
          "publisher": { "@id": `${siteUrl("/")}#org` },
        },
        {
          "@type": "ItemList",
          "itemListElement": EPISODES.map((e, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": e.title,
            "url": e.status === "live" ? siteUrl("/episode-001") : siteUrl("/episodes"),
          })),
        },
        breadcrumbSchema([
          { href: "/", label: "Guide" },
          { href: "/episodes", label: "Episodes" },
        ]),
      ],
    },
  ];

  return shell({
    route: "/episodes",
    title: "All Episodes (Full Videos + Shorts) | Snarky How-To",
    description: "Every Snarky How-To episode: a full video plus a Short, with captions, templates, and one clear next move. Episode 001 is live; 002–010 are in the queue.",
    canonicalPath: "/episodes",
    schemas,
    body,
  });
}
