import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const canonical = `${SUPABASE_URL}/functions/v1/snarky-how-to`;
const offerPicker = "https://today-offer-picker-smartpickshop.anastaysia98.chatgpt.site";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

const allowedEvents = new Set([
  "page_view",
  "offer_picker_click",
  "copy_script",
  "download_template",
  "share_click",
  "scroll_25",
  "scroll_50",
  "scroll_75",
  "scroll_100",
]);

async function track(req: Request) {
  try {
    const body = await req.json();
    const eventName = String(body?.event_name || "").slice(0, 80);
    const sessionId = String(body?.session_id || "").slice(0, 100);
    if (!allowedEvents.has(eventName) || sessionId.length < 8) {
      return Response.json({ ok: false }, { status: 400, headers: cors });
    }
    const meta = body?.meta && typeof body.meta === "object" ? body.meta : {};
    const safeMeta = JSON.stringify(meta).length <= 2000 ? meta : {};
    const { error } = await db.from("sps_analytics_events").insert({
      site: "snarky-how-to",
      event_name: eventName,
      session_id: sessionId,
      path: new URL(req.url).pathname,
      meta: safeMeta,
    });
    return Response.json({ ok: !error }, { status: error ? 500 : 200, headers: cors });
  } catch {
    return Response.json({ ok: false }, { status: 400, headers: cors });
  }
}

function page() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>How to Pick a Service You Can Sell Online Today | Snarky How-To</title>
<meta name="description" content="A practical, no-fluff method for choosing one online service, turning it into a simple offer, and making your first outreach move without building an entire business first.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="How to Pick a Service You Can Sell Online Today">
<meta property="og:description" content="Pick one useful service, make one clear offer, and do the next money-adjacent step without constructing a corporate cathedral.">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"How to Pick a Service You Can Sell Online Today","description":"A practical method for choosing a simple online service, packaging it into an offer, and taking a first outreach step.","author":{"@type":"Organization","name":"Snarky How-To"},"publisher":{"@type":"Organization","name":"Snarky How-To"},"dateModified":"2026-09-17","mainEntityOfPage":"${canonical}"},{"@type":"HowTo","name":"Pick a simple online service to sell","step":[{"@type":"HowToStep","name":"Find a painful small problem"},{"@type":"HowToStep","name":"Apply the 24-hour delivery filter"},{"@type":"HowToStep","name":"Write a one-sentence offer"},{"@type":"HowToStep","name":"Send a specific outreach message"}]}]}</script>
<style>
:root{--bg:#100816;--panel:#1a1022;--text:#fff9ff;--muted:#cfbfd5;--pink:#ff4fd8;--violet:#9d63ff;--line:#3c2850;--green:#7af0bd}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;background:radial-gradient(circle at 85% 0%,#35144d 0,transparent 32%),linear-gradient(180deg,#100816,#0b0710 60%,#13091a);color:var(--text);line-height:1.6}a{color:#ffb5ef}header{position:sticky;top:0;z-index:10;background:rgba(16,8,22,.86);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}nav{max-width:1100px;margin:auto;padding:14px 20px;display:flex;justify-content:space-between;align-items:center}.brand{font-weight:900}.brand span{color:var(--pink)}.navcta,.btn{border:0;border-radius:14px;padding:12px 16px;font-weight:900;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:9px}.navcta,.primary{background:linear-gradient(135deg,var(--pink),var(--violet));color:white}.secondary{background:#25152f;color:white;border:1px solid #553669}.hero{max-width:1100px;margin:auto;padding:76px 20px 34px;display:grid;grid-template-columns:1.25fr .75fr;gap:34px;align-items:center}.kicker{font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;color:#f6a5e8;font-weight:900}.hero h1{font-size:clamp(2.35rem,6vw,5rem);line-height:.98;margin:.35rem 0 1rem}.hero p{font-size:1.18rem;color:var(--muted)}.mascot{border:1px solid var(--line);background:linear-gradient(160deg,#2b1239,#160d20);border-radius:30px;min-height:320px;display:grid;place-items:center;font-size:7rem}.actions,.sharebar{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}.trust,.fine{font-size:.9rem;color:#bdaec3}.wrap{max-width:900px;margin:auto;padding:22px 20px 80px}.quick,.distribution,.card,.step{border:1px solid var(--line);background:rgba(255,255,255,.025);border-radius:18px;padding:20px}.quick{margin:12px 0 22px}.quick strong{color:var(--green)}.distribution{margin-bottom:34px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.step{display:grid;grid-template-columns:52px 1fr;gap:14px;margin:20px 0}.num{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--pink),var(--violet));display:grid;place-items:center;font-weight:900}.template{white-space:pre-wrap;background:#08060a;border:1px solid #403046;border-radius:16px;padding:18px;color:#f6eafa;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.note{border-left:4px solid var(--pink);padding:10px 16px;background:#1b1020;color:var(--muted)}.final{margin-top:48px;padding:28px;border-radius:24px;background:linear-gradient(135deg,#3b1448,#22113b);border:1px solid #704387;text-align:center}footer{border-top:1px solid var(--line);padding:28px 20px;text-align:center;color:#a897af}@media(max-width:760px){.hero,.grid{grid-template-columns:1fr}.hero{padding-top:48px}.mascot{min-height:210px;font-size:5rem}.hero h1{font-size:2.8rem}}
</style>
</head>
<body>
<header><nav><div class="brand">🐼 <span>SNARKY</span> HOW-TO</div><a class="navcta" href="#do-it">Skip to the useful part</a></nav></header>
<section class="hero"><div><div class="kicker">Real solutions. No boring B.S.</div><h1>How to pick a service you can sell online <em>today</em>.</h1><p>You do not need a logo, LLC, 47-page business plan, or a founder origin story filmed against exposed brick. You need one problem you can solve, one person who has it, and one clear offer.</p><div class="actions"><a class="btn primary" id="pickerTop" href="${offerPicker}" target="_blank" rel="noopener">Find my offer →</a><a class="btn secondary" href="#script">Steal the outreach script</a></div><div class="trust">No income guarantees. No upfront-fee nonsense. Sarcasm is aimed at the situation, not at the reader.</div></div><div class="mascot" aria-label="Snarky panda mascot">🐼👑</div></section>
<main class="wrap">
<section class="quick"><h2>Quick answer</h2><p><strong>Pick the service that passes three tests:</strong> somebody already pays for it, you can deliver a useful result in 24–48 hours, and you can explain the result in one sentence. Then offer one small paid outcome instead of selling your entire soul as “full-service solutions.”</p></section>
<section class="distribution"><b>Useful enough to keep?</b><p>Save the outreach template or send this guide to the one person in your group chat who has been “starting a business” since approximately the Bronze Age.</p><div class="sharebar"><button class="btn secondary" id="downloadBtn">Download template</button><button class="btn secondary" data-share="copy">Copy link</button><a class="btn secondary" data-share="whatsapp" target="_blank" rel="noopener">WhatsApp</a><a class="btn secondary" data-share="telegram" target="_blank" rel="noopener">Telegram</a><a class="btn secondary" data-share="facebook" target="_blank" rel="noopener">Facebook</a></div></section>
<h2>1. Start with a painful little problem</h2><div class="grid"><div class="card"><b>Messy information</b><br>Spreadsheets, CRM cleanup, contact lists, research, organizing files.</div><div class="card"><b>Weak words</b><br>Website copy, email copy, product descriptions, follow-up messages.</div><div class="card"><b>Broken presentation</b><br>Landing-page cleanup, formatting, basic graphics, sales PDFs.</div><div class="card"><b>Ignored customers</b><br>Follow-up systems, FAQ cleanup, inbox organization, response templates.</div></div>
<p class="note">A “service” is just a useful result delivered for someone else. Humanity gave it a corporate noun because apparently “I fix this annoying thing for money” was too efficient.</p>
<h2>2. Use the 24-hour filter</h2><div class="step"><div class="num">1</div><div><h3>Can you finish a meaningful first version fast?</h3><p>If the answer requires six weeks, three contractors and a spiritual retreat, it is not your first quick-turn offer.</p></div></div><div class="step"><div class="num">2</div><div><h3>Can the buyer see the difference?</h3><p>“I improved your spreadsheet from chaos to usable” is visible. “I provided strategic synergy” is a cry for help.</p></div></div><div class="step"><div class="num">3</div><div><h3>Can you price the outcome simply?</h3><p>Start with one scope: one page, one list, one cleanup, one research brief, one batch of copy. Specific beats impressive.</p></div></div>
<h2>3. Turn it into a one-sentence offer</h2><div class="template">I can [specific result] for [specific buyer] by [timeframe] for [simple price/scope].</div><p>Example: “I can clean and organize your customer spreadsheet, remove duplicates, standardize the columns, and hand back a usable version by tomorrow for $125.”</p>
<h2 id="script">4. Send a message that sounds like a person</h2><div class="template" id="copyText">Hi [Name] — I noticed [specific problem or unfinished task]. I can fix [small concrete result] and send the finished version back by [time]. The scope is [what is included] for [price]. If useful, I can start with the part that matters most first.</div><div class="actions"><button class="btn secondary" id="copyBtn">Copy script</button></div>
<h2>5. Do not build the empire before the invoice</h2><div class="grid"><div class="card"><b>Do:</b><br>find existing demand, show exactly what changes, make payment/fulfillment simple, deliver fast.</div><div class="card"><b>Don’t:</b><br>buy leads, pay to unlock work, invent testimonials, promise earnings, or spend three days choosing a font.</div></div>
<section class="final" id="do-it"><h2>Still staring at the menu?</h2><p>Use the 60-second offer picker. It asks three questions and gives you a practical service idea plus a first move.</p><a class="btn primary" id="pickerBottom" href="${offerPicker}" target="_blank" rel="noopener">Open the offer picker →</a><p class="fine">The picker suggests directions, not guaranteed income. Reality remains annoyingly involved.</p></section>
</main><footer>Snarky How-To · practical adulting with fewer beige PowerPoints</footer>
<script>
const endpoint=location.href.split('?')[0];
let sid=localStorage.getItem('sht_sid');if(!sid){sid=crypto.randomUUID();localStorage.setItem('sht_sid',sid)}
function track(event_name,meta={}){fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event_name,session_id:sid,meta}),keepalive:true}).catch(()=>{})}
const params=new URLSearchParams(location.search);track('page_view',{ref:document.referrer?new URL(document.referrer).hostname:'direct',from:params.get('from')||null,campaign:params.get('campaign')||params.get('utm_campaign')||null});
['pickerTop','pickerBottom'].forEach(id=>document.getElementById(id).addEventListener('click',()=>track('offer_picker_click',{placement:id,campaign:params.get('campaign')||params.get('utm_campaign')||null})));
const template=document.getElementById('copyText').innerText;document.getElementById('copyBtn').addEventListener('click',async()=>{await navigator.clipboard.writeText(template);document.getElementById('copyBtn').textContent='Copied ✓';track('copy_script')});
document.getElementById('downloadBtn').addEventListener('click',()=>{const blob=new Blob([template+'\n'],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='snarky-how-to-outreach-template.txt';a.click();URL.revokeObjectURL(a.href);track('download_template')});
const shareUrl=encodeURIComponent(location.href.split('#')[0]);const shareText=encodeURIComponent('A practical guide for picking a small online service and actually sending the offer.');const urls={whatsapp:'https://wa.me/?text='+shareText+'%20'+shareUrl,telegram:'https://t.me/share/url?url='+shareUrl+'&text='+shareText,facebook:'https://www.facebook.com/sharer/sharer.php?u='+shareUrl};document.querySelectorAll('[data-share]').forEach(el=>{const kind=el.dataset.share;if(kind==='copy'){el.addEventListener('click',async()=>{await navigator.clipboard.writeText(location.href.split('#')[0]);el.textContent='Link copied ✓';track('share_click',{channel:'copy'})})}else{el.href=urls[kind];el.addEventListener('click',()=>track('share_click',{channel:kind}))}});
const seen=new Set();addEventListener('scroll',()=>{const d=document.documentElement;const denom=d.scrollHeight-d.clientHeight;if(denom<=0)return;const pct=Math.round((d.scrollTop/denom)*100);[25,50,75,100].forEach(n=>{if(pct>=n&&!seen.has(n)){seen.add(n);track('scroll_'+n)}})},{passive:true});
</script></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method === "POST") return track(req);
  return new Response(page(), { headers: { ...cors, "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" } });
});
