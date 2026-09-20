// Trust pages (About, Privacy, Terms, Disclosure) + 404.
// These carry the E-E-A-T weight: who we are, what we collect (almost
// nothing), what we promise (no income), and how money works (labeled).
import {
  FIRST_PUBLISHED,
  LAST_UPDATED,
  NEWSLETTER_URL,
  SITE_NAME,
  siteUrl,
  TAGLINE,
  YOUTUBE_CHANNEL_URL,
} from "../config.ts";
import {
  breadcrumbSchema,
  crumbs,
  newsBox,
  orgSchema,
  shell,
} from "../layout.ts";

function pageShell(
  route: string,
  title: string,
  description: string,
  canonicalPath: string,
  h1kicker: string,
  h1: string,
  lede: string,
  inner: string,
  extraSchema?: object,
): string {
  const graph: object[] = [
    orgSchema(),
    {
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": siteUrl(canonicalPath),
      "datePublished": FIRST_PUBLISHED,
      "dateModified": LAST_UPDATED,
      "publisher": { "@id": `${siteUrl("/")}#org` },
    },
    breadcrumbSchema([
      { href: "/", label: "Guide" },
      { href: canonicalPath, label: title.split("|")[0].trim() },
    ]),
  ];
  if (extraSchema) graph.push(extraSchema);
  const body = `
<section class="hero" style="padding-bottom:10px"><div>
<div class="kicker">${h1kicker}</div>
<h1>${h1}</h1>
<p class="lede">${lede}</p>
</div><div class="mascot" role="img" aria-label="Snarky panda mascot wearing a crown">🐼📜</div></section>
<main class="wrap">
${crumbs([{ href: "/", label: "Guide" }, { label: title.split("|")[0].trim() }])}
${inner}
${newsBox(route.replace("/", "") || "static")}
</main>`;
  return shell({ route, title, description, canonicalPath, schemas: [{ "@context": "https://schema.org", "@graph": graph }], body });
}

export function aboutPage(): string {
  return pageShell(
    "/about",
    "About + Editorial Policy | Snarky How-To",
    "Who makes Snarky How-To, the editorial rules (no income promises, no fake proof, sarcasm punches up), AI-use disclosure, and contact.",
    "/about",
    `${SITE_NAME} · Who + rules`,
    "Practical help, dry humor, receipts.",
    `${TAGLINE} We make how-to guides and short videos that end in one clear action — not a 47-page plan.`,
    `
<h2>What we make</h2>
<p>Searchable guides, full videos + Shorts, and copyable assets (scripts, checklists, templates). The loop is always: <b>guide → useful action → asset → tracked next step → offer picker → analytics</b>. If a piece does not help you do the next thing, it does not ship.</p>
<h2>Editorial policy</h2>
<table class="sheet"><thead><tr><th>Rule</th><th>What it means</th></tr></thead><tbody>
<tr><td>Punch up, never down</td><td>Sarcasm targets bureaucracy, scams, bad systems, and unnecessary complexity — never the person trying to learn.</td></tr>
<tr><td>No income promises</td><td>We show methods, not earnings. Anyone guaranteeing income online is selling you something.</td></tr>
<tr><td>No fake proof</td><td>No invented customers, testimonials, results, or revenue. Sample work is always labeled as sample work.</td></tr>
<tr><td>No pay-to-work</td><td>We never recommend paying upfront fees to unlock jobs, and we teach the warning signs instead.</td></tr>
<tr><td>Corrections welcome</td><td>Found an error? Tell us in the YouTube comments and we fix it with a visible update note.</td></tr>
</tbody></table>
<h2>AI-use disclosure</h2>
<p>Launch narration is synthetic and labeled as such; page visuals are generated; scripts, pacing, and final review are human-directed. If a voice or visual ever represents a real person, it will say so explicitly. What you read here is written to be useful first and quotable by humans <i>and</i> answer engines second.</p>
<h2 id="newsletter">Contact</h2>
<p>For now: <b>YouTube comments</b> on any episode — they double as our public correction log. ${
      NEWSLETTER_URL
        ? `The <a href="${NEWSLETTER_URL}" target="_blank" rel="noopener">newsletter</a> answers reader questions weekly.`
        : "The newsletter (opening soon) will answer reader questions weekly."
    } No DMs asking for money are ever us; real clients pay <i>you</i>.</p>
<h2>Elsewhere</h2>
<p><a href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">YouTube channel</a> · <a href="${siteUrl("/episodes")}">Episode index</a> · <a href="${siteUrl("/feed.xml")}">RSS feed</a></p>`,
    {
      "@type": "AboutPage",
      "url": siteUrl("/about"),
      "about": { "@id": `${siteUrl("/")}#org` },
    },
  );
}

export function privacyPage(): string {
  return pageShell(
    "/privacy",
    "Privacy: What We Collect (Almost Nothing) | Snarky How-To",
    "Privacy-light analytics: interaction types and a random session id. No names, emails, accounts, GPS, or sale of data.",
    "/privacy",
    "Privacy · Plain English",
    "We track clicks, not people.",
    "No accounts. No ad trackers. No email required to read anything. Here is the whole privacy model in one page.",
    `
<h2>What we collect</h2>
<table class="sheet"><thead><tr><th>Data</th><th>Example</th><th>Why</th></tr></thead><tbody>
<tr><td>Interaction type</td><td><code class="inline">page_view</code>, <code class="inline">copy_script</code>, <code class="inline">scroll_50</code></td><td>Learn which sections help, fix what does not.</td></tr>
<tr><td>Random session id</td><td>Stored in your browser's local storage</td><td>Count journeys without knowing who you are.</td></tr>
<tr><td>Tiny metadata</td><td>Referring site, campaign tag, share channel</td><td>Know if YouTube, search, or a friend sent you.</td></tr>
</tbody></table>
<h2>What we never collect</h2>
<p>Names, emails, phone numbers, accounts, passwords, GPS, full browsing history, or message contents. The outreach template you copy never leaves your device except into your own clipboard.</p>
<h2>Cookies &amp; storage</h2>
<p>One local-storage key (<code class="inline">sht_sid</code>) holds your random session id, plus checklist progress. No third-party cookies load until you click out to YouTube or the offer picker — at which point their policies apply.</p>
<h2>Newsletter &amp; YouTube</h2>
<p>${NEWSLETTER_URL ? "The newsletter is hosted externally; your email lives with the newsletter provider under their policy, never in our analytics database." : "The newsletter is not open yet, so we hold zero emails. When it opens it will be hosted externally — emails live with that provider, never in our analytics database."} YouTube viewing is governed by YouTube's policy.</p>
<h2>Your choices</h2>
<p>Clear site data anytime to reset your session id. Use reader mode, RSS (<a href="${siteUrl("/feed.xml")}">feed</a>), or the downloadable template to minimize requests. To ask about this policy, use YouTube comments.</p>
<p class="fine">Last updated ${LAST_UPDATED}. If this policy ever needs to change to collect more, the feature waits until the policy is updated first.</p>`,
  );
}

export function termsPage(): string {
  return pageShell(
    "/terms",
    "Terms: Information, Not Miracles | Snarky How-To",
    "Plain-English terms: educational information only, no professional or financial advice, no income guarantees, fair template use.",
    "/terms",
    "Terms · Plain English",
    "Information, not miracles.",
    "Everything here is educational. Useful, we hope — but not advice, and definitely not a promise of outcomes.",
    `
<h2>The short version</h2>
<table class="sheet"><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody>
<tr><td>Educational only</td><td>Guides, videos, and templates are general information, not legal, tax, or financial advice.</td></tr>
<tr><td>No income guarantees</td><td>Methods ≠ earnings. Your results depend on effort, market, timing, and luck we cannot control.</td></tr>
<tr><td>Use templates freely</td><td>Copy, adapt, and send the scripts and checklists for your own work. Do not resell them as-is as your own product.</td></tr>
<tr><td>External links</td><td>YouTube, the offer picker, and future tools have their own terms. Clicking out means playing by their rules.</td></tr>
<tr><td>Be decent</td><td>Do not use our scripts to scam, spam, or harass. The snark license is revoked for villains.</td></tr>
</tbody></table>
<h2>Liability, briefly</h2>
<p>To the maximum extent allowed by law, ${SITE_NAME} is not liable for actions you take after reading a free guide with a cartoon panda. Think critically, verify claims, and never pay upfront fees to unlock work.</p>
<p class="fine">Last updated ${LAST_UPDATED}.</p>`,
  );
}

export function disclosurePage(): string {
  return pageShell(
    "/disclosure",
    "How We Make Money (Honestly) | Snarky How-To",
    "FTC-style disclosure: YouTube ads when eligible, clearly-labeled sponsors or affiliates later. No pay-to-work schemes, ever.",
    "/disclosure",
    "Money · Full disclosure",
    "How the panda eats.",
    "Free guides have to be funded somehow. Here is exactly how — current first, future second, red lines always.",
    `
<h2>Right now</h2>
<p><b>YouTube ads (when eligible):</b> once the channel meets YouTube Partner requirements, videos may show ads. That costs you nothing and pays a little toward production. <b>Affiliates:</b> none live yet — this page will list each program before any affiliate link appears. <b>Sponsors:</b> none yet.</p>
<h2>Later, labeled loudly</h2>
<table class="sheet"><thead><tr><th>Revenue</th><th>How you will know</th></tr></thead><tbody>
<tr><td>Affiliate links</td><td>Marked “affiliate link” inline; we only list tools with a genuine free path or clear value, and say what it costs.</td></tr>
<tr><td>Sponsorships</td><td>Named at the top of the page/video and in the description. Sponsors never approve our conclusions.</td></tr>
<tr><td>Template packs</td><td>Sold as clearly-described digital files with refunds for broken downloads. No upsell mazes.</td></tr>
<tr><td>Newsletter ads</td><td>Labeled placements inside free issues; the unsubscribe link stays one click.</td></tr>
</tbody></table>
<h2>Red lines</h2>
<p>No pay-to-unlock-work offers. No fake scarcity counters. No income claims to sell anything. No positive review for sale. If money ever touches an opinion, the disclosure sits <i>above</i> the opinion, not in footnote exile.</p>
<p class="fine">Questions? Ask in the YouTube comments — public questions get public answers. Last updated ${LAST_UPDATED}.</p>`,
  );
}

export function notFoundPage(path: string): string {
  const safe = path.replace(/[<>&"]/g, "").slice(0, 80) || "/";
  const body = `
<section class="hero"><div>
<div class="kicker">404 · Lost, but make it useful</div>
<h1>That page filed for witness protection.</h1>
<p class="lede">“${safe}” does not exist. The good news: the useful stuff very much does.</p>
<div class="actions"><a class="btn primary" href="${siteUrl("/")}">Back to the guide →</a><a class="btn secondary" href="${siteUrl("/episodes")}">Browse episodes</a></div>
</div><div class="mascot" role="img" aria-label="Confused panda">🐼❓</div></section>`;
  return shell({
    route: "/404",
    title: "Page Not Found | Snarky How-To",
    description: "That page does not exist — but the guide, episodes, and offer picker do.",
    canonicalPath: "/",
    body,
  });
}
