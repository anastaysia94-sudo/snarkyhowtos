// Shared HTML shell: head/SEO tags, header, footer, CSS, analytics snippet.
// All rendered content is authored in this repo (no user input is reflected),
// so there is no stored-XSS surface on these pages.
import {
  LAST_UPDATED,
  NEWSLETTER_URL,
  OFFER_PICKER,
  SITE_NAME,
  siteUrl,
  TAGLINE,
  YOUTUBE_CHANNEL_URL,
} from "./config.ts";

export function css(): string {
  return `:root{--bg:#100816;--panel:#1a1022;--text:#fff9ff;--muted:#d8c8e0;--pink:#ff4fd8;--violet:#9d63ff;--line:#3c2850;--green:#7af0bd;--gold:#ffc45b}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;background:radial-gradient(circle at 85% 0%,#35144d 0,transparent 32%),linear-gradient(180deg,#100816,#0b0710 60%,#13091a);color:var(--text);line-height:1.65}a{color:#ffb5ef}a:hover{color:#ffd6f6}:focus-visible{outline:3px solid var(--green);outline-offset:3px;border-radius:6px}.skip{position:absolute;left:-9999px;top:0;background:var(--green);color:#101010;font-weight:800;padding:10px 16px;z-index:99;border-radius:0 0 12px 0}.skip:focus{left:0}header.site{position:sticky;top:0;z-index:10;background:rgba(16,8,22,.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}nav.top{max-width:1100px;margin:auto;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.brand{font-weight:900;text-decoration:none;color:var(--text);font-size:1.05rem}.brand span{color:var(--pink)}.navlinks{display:flex;gap:4px;flex-wrap:wrap;align-items:center}.navlinks a{color:var(--muted);text-decoration:none;font-weight:700;padding:8px 12px;border-radius:10px}.navlinks a:hover,.navlinks a[aria-current="page"]{color:white;background:#25152f}.navcta,.btn{border:0;border-radius:14px;padding:12px 18px;font-weight:900;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:9px;font-size:1rem;line-height:1.2}.navcta,.primary{background:linear-gradient(135deg,var(--pink),var(--violet));color:#fff}.navcta:hover,.primary:hover{color:#fff;filter:brightness(1.08)}.secondary{background:#25152f;color:#fff;border:1px solid #553669}.secondary:hover{border-color:var(--pink);color:#fff}.ghost{background:transparent;color:var(--muted);border:1px dashed #553669}.progress{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,var(--pink),var(--violet));z-index:20}.hero{max-width:1100px;margin:auto;padding:64px 20px 30px;display:grid;grid-template-columns:1.25fr .75fr;gap:34px;align-items:center}.kicker{font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;color:#f6a5e8;font-weight:900}.hero h1{font-size:clamp(2.2rem,5.5vw,4.4rem);line-height:1.02;margin:.4rem 0 1rem}.hero p.lede{font-size:1.15rem;color:var(--muted)}.mascot{border:1px solid var(--line);background:linear-gradient(160deg,#2b1239,#160d20);border-radius:30px;min-height:300px;display:grid;place-items:center;font-size:6.5rem}.actions,.sharebar{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}.trust,.fine{font-size:.9rem;color:#c4b2cc}.wrap{max-width:900px;margin:auto;padding:22px 20px 80px}.wrap.wide{max-width:1100px}.crumbs{font-size:.88rem;color:#a897af;margin:6px 0 18px}.crumbs a{color:#c9a9d6}.toc,.quick,.distribution,.card,.step,.faq,.checklist,.money,.news,.episode{border:1px solid var(--line);background:rgba(255,255,255,.025);border-radius:18px;padding:20px}.toc{margin:8px 0 24px}.toc ol{margin:10px 0 0;padding-left:22px;color:var(--muted)}.toc li{margin:4px 0}.quick{margin:12px 0 22px}.quick strong{color:var(--green)}.distribution{margin-bottom:30px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.grid.trio{grid-template-columns:repeat(3,minmax(0,1fr))}.step{display:grid;grid-template-columns:52px 1fr;gap:14px;margin:20px 0}.num{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--pink),var(--violet));display:grid;place-items:center;font-weight:900}.template{white-space:pre-wrap;background:#08060a;border:1px solid #403046;border-radius:16px;padding:18px;color:#f6eafa;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.note{border-left:4px solid var(--pink);padding:10px 16px;background:#1b1020;color:var(--muted)}.final{margin-top:44px;padding:28px;border-radius:24px;background:linear-gradient(135deg,#3b1448,#22113b);border:1px solid #704387;text-align:center}details.faq{margin:12px 0;padding:0}details.faq summary{cursor:pointer;font-weight:800;padding:18px 20px;list-style:none}details.faq summary::-webkit-details-marker{display:none}details.faq summary:before{content:"+ ";color:var(--pink);font-weight:900}details.faq[open] summary:before{content:"– "}details.faq .a{padding:0 20px 20px;color:var(--muted)}table.sheet{width:100%;border-collapse:collapse;margin:16px 0;font-size:.95rem}table.sheet th,table.sheet td{border:1px solid var(--line);padding:10px 12px;text-align:left;vertical-align:top}table.sheet th{background:#221130}table.sheet td{color:var(--muted)}table.sheet td:first-child{color:var(--text)}.badge{display:inline-block;font-size:.75rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px;border:1px solid #553669;color:#f6a5e8}.badge.live{background:linear-gradient(135deg,var(--pink),var(--violet));color:#fff;border-color:transparent}.badge.soon{color:var(--gold);border-color:#6b5426}.checklist label{display:flex;gap:12px;align-items:flex-start;padding:10px 4px;border-bottom:1px dashed #352245;cursor:pointer}checklist label:last-child,.checklist label:last-child{border-bottom:0}.checklist input{width:20px;height:20px;margin-top:3px;accent-color:var(--pink)}.checklist small{display:block;color:#a897af}.money{margin:34px 0;background:linear-gradient(160deg,rgba(255,79,216,.08),rgba(157,99,255,.06))}.news{margin:34px 0;background:linear-gradient(160deg,rgba(122,240,189,.07),rgba(157,99,255,.06))}footer.site{border-top:1px solid var(--line);padding:36px 20px 44px;color:#a897af}footer.site .cols{max-width:1100px;margin:auto;display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:22px}footer.site h3{font-size:.85rem;text-transform:uppercase;letter-spacing:.1em;color:#d8c8e0;margin:0 0 10px}footer.site ul{list-style:none;margin:0;padding:0}footer.site li{margin:7px 0}footer.site a{color:#a897af;text-decoration:none}footer.site a:hover{color:#fff}footer.site .base{max-width:1100px;margin:26px auto 0;padding-top:18px;border-top:1px solid var(--line);font-size:.88rem;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}code.inline{background:#221130;padding:2px 8px;border-radius:8px;font-size:.88em}@media(max-width:820px){.hero,.grid,.grid.trio{grid-template-columns:1fr}.hero{padding-top:40px}.mascot{min-height:190px;font-size:4.5rem}.hero h1{font-size:2.5rem}footer.site .cols{grid-template-columns:1fr 1fr}}@media(max-width:520px){footer.site .cols{grid-template-columns:1fr}.navcta{display:none}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important;animation:none!important}}@media print{header.site .navlinks,header.site .navcta,.actions,.sharebar,.progress,footer.site .cols,.money,.news{display:none}body{background:#fff;color:#111}a{color:#7a1fa2}.hero,.wrap{max-width:100%;padding:12px}.quick,.card,.step,.toc{border-color:#ccc;background:#fff}}`;
}

// Inline analytics: page_view + generic [data-track] clicks + scroll depth +
// FAQ <details> tracking + scroll progress bar. No backticks or ${} below:
// this string lives inside a TS template literal.
export function baseScript(): string {
  return `<script>
(function(){
var endpoint=location.href.split('?')[0];
var sid=null;
try{sid=localStorage.getItem('sht_sid');if(!sid){sid=(crypto.randomUUID?crypto.randomUUID():'sid-'+Date.now()+'-'+Math.random());localStorage.setItem('sht_sid',sid)}}catch(e){sid='anon-'+Math.random()}
function track(event_name,meta){meta=meta||{};try{fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event_name:event_name,session_id:sid,meta:meta}),keepalive:true}).catch(function(){})}catch(e){}}
var params=new URLSearchParams(location.search);
var campaign=params.get('campaign')||params.get('utm_campaign')||null;
var ref='direct';
try{if(document.referrer){ref=new URL(document.referrer).hostname}}catch(e){}
track('page_view',{ref:ref,from:params.get('from')||null,campaign:campaign});
document.querySelectorAll('[data-track]').forEach(function(el){
el.addEventListener('click',function(){
var m={placement:el.getAttribute('data-placement')||el.id||null,campaign:campaign};
if(el.getAttribute('data-channel')){m.channel=el.getAttribute('data-channel')}
track(el.getAttribute('data-track'),m);
});
});
document.querySelectorAll('details[data-faq]').forEach(function(d){
d.addEventListener('toggle',function(){if(d.open){track('faq_expand',{q:d.getAttribute('data-faq')})}});
});
var seen={};
var bar=document.getElementById('progressBar');
addEventListener('scroll',function(){
var d=document.documentElement;var denom=d.scrollHeight-d.clientHeight;if(denom<=0){return}
var pct=Math.round((d.scrollTop/denom)*100);
if(bar){bar.style.width=pct+'%'}
[25,50,75,100].forEach(function(n){if(pct>=n&&!seen[n]){seen[n]=1;track('scroll_'+n)}});
},{passive:true});
window.__sht={track:track,campaign:campaign};
})();
</script>`;
}

export interface ShellOpts {
  route: string;
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  schemas?: object[];
  headExtra?: string;
  body: string;
  scriptExtra?: string;
}

export function shell(o: ShellOpts): string {
  const canonical = siteUrl(o.canonicalPath);
  const ogImage = siteUrl("/og-image.svg");
  const schemas = (o.schemas || [])
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");
  const nav = (href: string, label: string) => {
    const current = o.route === href ? ' aria-current="page"' : "";
    return `<a href="${siteUrl(href)}"${current}>${label}</a>`;
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${o.title}</title>
<meta name="description" content="${o.description}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#100816">
<meta name="author" content="${SITE_NAME}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:type" content="${o.ogType || "article"}">
<meta property="og:title" content="${o.title}">
<meta property="og:description" content="${o.description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${o.title}">
<meta name="twitter:description" content="${o.description}">
<link rel="icon" type="image/svg+xml" href="${siteUrl("/favicon.svg")}">
<link rel="manifest" href="${siteUrl("/manifest.webmanifest")}">
<link rel="alternate" type="application/rss+xml" title="${SITE_NAME} feed" href="${siteUrl("/feed.xml")}">
${schemas}
${o.headExtra || ""}
<style>${css()}</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="progress" id="progressBar" aria-hidden="true"></div>
<header class="site"><nav class="top" aria-label="Primary">
<a class="brand" href="${siteUrl("/")}"><span>🐼 SNARKY</span> HOW-TO</a>
<div class="navlinks">${nav("/", "Guide")}${nav("/episodes", "Episodes")}${nav("/about", "About")}
<a class="navcta" data-track="offer_picker_click" data-placement="nav" href="${OFFER_PICKER}" target="_blank" rel="noopener">Find my offer →</a></div>
</nav></header>
<main id="main">${o.body}</main>
<footer class="site"><div class="cols">
<div><h3>${SITE_NAME}</h3><p style="margin:0">${TAGLINE}<br>No income guarantees. Sarcasm is aimed at the situation, not at the reader.</p></div>
<div><h3>Learn</h3><ul>
<li><a href="${siteUrl("/")}">The guide</a></li>
<li><a href="${siteUrl("/episode-001")}">Episode 001 + transcript</a></li>
<li><a href="${siteUrl("/episodes")}">All episodes</a></li>
<li><a href="${OFFER_PICKER}" target="_blank" rel="noopener">60-second offer picker</a></li>
</ul></div>
<div><h3>Trust</h3><ul>
<li><a href="${siteUrl("/about")}">About + editorial policy</a></li>
<li><a href="${siteUrl("/privacy")}">Privacy</a></li>
<li><a href="${siteUrl("/terms")}">Terms</a></li>
<li><a href="${siteUrl("/disclosure")}">How we make money</a></li>
</ul></div>
<div><h3>Elsewhere</h3><ul>
<li><a href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">YouTube channel</a></li>
<li><a href="${NEWSLETTER_URL || siteUrl("/about#newsletter")}">Newsletter${NEWSLETTER_URL ? "" : " (opening soon)"}</a></li>
<li><a href="${siteUrl("/feed.xml")}">RSS feed</a></li>
<li><a href="${siteUrl("/llms.txt")}">llms.txt for AI engines</a></li>
</ul></div>
</div><div class="base"><span>${SITE_NAME} · practical adulting with fewer beige PowerPoints</span><span>Updated ${LAST_UPDATED}</span></div></footer>
${baseScript()}
${o.scriptExtra || ""}
</body></html>`;
}

export function crumbs(items: Array<{ href?: string; label: string }>): string {
  const parts = items.map((it) =>
    it.href ? `<a href="${siteUrl(it.href)}">${it.label}</a>` : `<span>${it.label}</span>`
  );
  return `<nav class="crumbs" aria-label="Breadcrumb">🐼 ${parts.join(" · ")}</nav>`;
}

export function moneyStrip(): string {
  return `<section class="money" aria-label="How this stays free"><b>💸 How this stays free (honestly).</b>
<p style="margin:8px 0 0">YouTube ads when eligible, plus clearly-labeled sponsors or affiliates later. No pay-to-unlock-work schemes, no fake testimonials, no income promises. Full policy: <a href="${siteUrl("/disclosure")}">how we make money</a>.</p></section>`;
}

export function newsBox(placement: string): string {
  if (NEWSLETTER_URL) {
    return `<section class="news" id="newsletter" aria-label="Newsletter"><b>📬 The Snarky Sunday teardown.</b>
<p style="margin:8px 0 14px">One useful how-to, one template, zero motivational-poster energy. Free, unsubscribe anytime.</p>
<a class="btn primary" data-track="newsletter_click" data-placement="${placement}" href="${NEWSLETTER_URL}" target="_blank" rel="noopener">Get the free teardown →</a></section>`;
  }
  return `<section class="news" id="newsletter" aria-label="Newsletter"><span class="badge soon">Newsletter opening soon</span>
<p style="margin:10px 0 14px"><b>The Snarky Sunday teardown</b> — one useful how-to plus one template, weekly. Until launch day, <a data-track="youtube_subscribe_click" data-placement="${placement}" href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">subscribe on YouTube</a> so you do not miss Episode 002.</p></section>`;
}

export function orgSchema(): object {
  return {
    "@type": "Organization",
    "@id": `${siteUrl("/")}#org`,
    "name": SITE_NAME,
    "slogan": TAGLINE,
    "url": siteUrl("/"),
    "logo": siteUrl("/og-image.svg"),
    "sameAs": [YOUTUBE_CHANNEL_URL],
    "knowsAbout": ["freelancing", "online services", "outreach", "small business operations"],
  };
}

export function breadcrumbSchema(items: Array<{ href: string; label: string }>): object {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": it.label,
      "item": siteUrl(it.href),
    })),
  };
}
