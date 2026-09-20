// Home / canonical guide page. Keeps the launch contracts:
// "HowTo" schema, "No income guarantees", "Sarcasm is aimed at the situation",
// and the "Do not build the empire before the invoice" section.
import {
  EPISODE_001_CHAPTERS,
  EPISODES,
  FIRST_PUBLISHED,
  LAST_UPDATED,
  NEWSLETTER_URL,
  OFFER_PICKER,
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

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Do I need an LLC, logo, or business plan first?",
    a: "No. Those are admin tasks, not income tasks. Pick one service, write one clear offer, and send it to one real buyer. Register the business paperwork once money is actually moving — your accountant will forgive the ordering.",
  },
  {
    q: "How fast can I send my first offer?",
    a: "Most readers can go from this guide to a sent message in under an hour: 15 minutes to pick the service, 15 to write the one-sentence offer, 30 to find a buyer and personalize the script. Speed beats polish at this stage.",
  },
  {
    q: "What if I have no experience and no portfolio?",
    a: "Start with services where the result is self-evident: cleanup, organization, formatting, research. Do one tiny free or cheap sample for a real business, label it honestly as sample work, then show the before-and-after. Episode 006 covers this in detail.",
  },
  {
    q: "Is this financial advice or an income guarantee?",
    a: "Neither, and anyone who guarantees income online is selling you something. This is practical information: how to package a small service and make a first outreach move. Reality remains annoyingly involved.",
  },
  {
    q: "Should I ever pay to unlock work or buy leads?",
    a: "Treat upfront fees as a red flag until proven otherwise. Real clients pay you — that is the entire arrangement. Job posts asking for training fees, deposits, or crypto are covered in Episodes 002 and 010.",
  },
  {
    q: "Why the snark?",
    a: "Because most business advice is either a beige PowerPoint or a rented Lamborghini. The sarcasm here punches at bad process, scams, and unnecessary complexity — never at the person trying to learn.",
  },
];

export function homeSchemas(): object[] {
  const howToSteps = [
    { name: "Find a painful small problem", text: "Pick messy information, weak words, broken presentation, or ignored customers — something a buyer already pays to fix." },
    { name: "Apply the 24-hour delivery filter", text: "Choose a service you can deliver as a useful first version in 24–48 hours, with a visible before-and-after and simple outcome pricing." },
    { name: "Write a one-sentence offer", text: "Use the formula: I can [specific result] for [specific buyer] by [timeframe] for [simple price/scope]." },
    { name: "Send a specific outreach message", text: "Personalize the script with a real observed problem, concrete result, deadline, and price — then send it to a real buyer." },
  ];
  return [
    {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema(),
        {
          "@type": "WebSite",
          "@id": `${siteUrl("/")}#site`,
          "name": SITE_NAME,
          "url": siteUrl("/"),
          "publisher": { "@id": `${siteUrl("/")}#org` },
        },
        {
          "@type": "Article",
          "headline": "How to Pick a Service You Can Sell Online Today",
          "description": "A practical method for choosing a simple online service, packaging it into an offer, and taking a first outreach step.",
          "author": { "@id": `${siteUrl("/")}#org` },
          "publisher": { "@id": `${siteUrl("/")}#org` },
          "datePublished": FIRST_PUBLISHED,
          "dateModified": LAST_UPDATED,
          "mainEntityOfPage": siteUrl("/"),
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [".quick", ".template"],
          },
        },
        {
          "@type": "HowTo",
          "name": "Pick a simple online service to sell",
          "description": "Find one painful problem, filter for fast delivery, write a one-sentence offer, and send it to a real buyer.",
          "totalTime": "PT1H",
          "step": howToSteps.map((s, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": s.name,
            "text": s.text,
          })),
        },
        breadcrumbSchema([{ href: "/", label: "Guide" }]),
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ];
}

// Page-specific JS (legacy interactive blocks). No backticks or ${} here.
function homeScript(): string {
  return `<script>
(function(){
var sht=window.__sht||{track:function(){},campaign:null};
function on(id,ev,fn){var el=document.getElementById(id);if(el){el.addEventListener(ev,fn)}}
['pickerTop','pickerBottom'].forEach(function(id){on(id,'click',function(){sht.track('offer_picker_click',{placement:id,campaign:sht.campaign})})});
var copyBtn=document.getElementById('copyBtn');
if(copyBtn){copyBtn.addEventListener('click',function(){
var t=document.getElementById('copyText').innerText;
function done(){copyBtn.textContent='Copied ✓';sht.track('copy_script')}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,done)}else{done()}
});}
var dl=document.getElementById('downloadBtn');
if(dl){dl.addEventListener('click',function(){
var t=document.getElementById('copyText').innerText+'\\n';
var blob=new Blob([t],{type:'text/plain'});var a=document.createElement('a');
a.href=URL.createObjectURL(blob);a.download='snarky-how-to-outreach-template.txt';a.click();
setTimeout(function(){URL.revokeObjectURL(a.href)},2000);sht.track('download_template');
});}
var shareUrl=encodeURIComponent(location.href.split('#')[0]);
var shareText=encodeURIComponent('A practical guide for picking a small online service and actually sending the offer.');
var urls={whatsapp:'https://wa.me/?text='+shareText+'%20'+shareUrl,telegram:'https://t.me/share/url?url='+shareUrl+'&text='+shareText,facebook:'https://www.facebook.com/sharer/sharer.php?u='+shareUrl};
document.querySelectorAll('[data-share]').forEach(function(el){
var kind=el.getAttribute('data-share');
if(kind==='copy'){el.addEventListener('click',function(){
function done(){el.textContent='Link copied ✓';sht.track('share_click',{channel:'copy'})}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(location.href.split('#')[0]).then(done,done)}else{done()}
})}else{el.href=urls[kind];el.addEventListener('click',function(){sht.track('share_click',{channel:kind})})}
});
document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function(box){
var key='sht_check_'+box.getAttribute('data-item');
try{if(localStorage.getItem(key)==='1'){box.checked=true}}catch(e){}
box.addEventListener('change',function(){
try{localStorage.setItem(key,box.checked?'1':'0')}catch(e){}
sht.track('checklist_toggle',{item:box.getAttribute('data-item'),done:box.checked?'1':'0'});
});
});
})();
</script>`;
}

export function homePage(): string {
  const faqHtml = FAQS.map((f) =>
    `<details class="faq" data-faq="${f.q.replace(/"/g, "")}"><summary>${f.q}</summary><div class="a"><p style="margin:0">${f.a}</p></div></details>`
  ).join("\n");
  const chapterRows = EPISODE_001_CHAPTERS.map((c) =>
    `<tr><td><code class="inline">${c.t}</code></td><td>${c.title}</td></tr>`
  ).join("");
  const nextEps = EPISODES.filter((e) => e.status === "next").slice(0, 3).map((e) =>
    `<div class="card"><span class="badge soon">Ep ${e.n}</span><br><b>${e.title}</b><br><span style="color:var(--muted);font-size:.92rem">${e.hook}</span></div>`
  ).join("");

  const body = `
<section class="hero"><div>
<div class="kicker">Real solutions. No boring B.S.</div>
<h1>How to pick a service you can sell online <em>today</em>.</h1>
<p class="lede">You do not need a logo, LLC, 47-page business plan, or a founder origin story filmed against exposed brick. You need one problem you can solve, one person who has it, and one clear offer.</p>
<div class="actions">
<a class="btn primary" id="pickerTop" href="${OFFER_PICKER}" target="_blank" rel="noopener">Find my offer →</a>
<a class="btn secondary" href="#script">Steal the outreach script</a>
<a class="btn ghost" data-track="youtube_click" data-placement="hero" href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">▶ Watch Episode 001</a>
</div>
<div class="trust">No income guarantees. No upfront-fee nonsense. Sarcasm is aimed at the situation, not at the reader.</div>
</div><div class="mascot" role="img" aria-label="Snarky panda mascot wearing a crown">🐼👑</div></section>
<main class="wrap">
${crumbs([{ label: "Guide" }])}
<nav class="toc" aria-label="On this page"><b>On this page</b><ol>
<li><a href="#quick">Quick answer</a></li>
<li><a href="#problems">1. Start with a painful little problem</a></li>
<li><a href="#filter">2. Use the 24-hour filter</a></li>
<li><a href="#offer">3. Turn it into a one-sentence offer</a></li>
<li><a href="#script">4. Send a message that sounds like a person</a></li>
<li><a href="#empire">5. Do not build the empire before the invoice</a></li>
<li><a href="#checklist">Your 60-minute launch checklist</a></li>
<li><a href="#watch">Watch Episode 001</a></li>
<li><a href="#faq">FAQ</a></li>
</ol></nav>
<section class="quick" id="quick"><h2>Quick answer</h2><p><strong>Pick the service that passes three tests:</strong> somebody already pays for it, you can deliver a useful result in 24–48 hours, and you can explain the result in one sentence. Then offer one small paid outcome instead of selling your entire soul as “full-service solutions.”</p></section>
<section class="distribution" aria-label="Keep or share"><b>Useful enough to keep?</b><p>Save the outreach template or send this guide to the one person in your group chat who has been “starting a business” since approximately the Bronze Age.</p><div class="sharebar"><button class="btn secondary" id="downloadBtn" type="button">Download template</button><button class="btn secondary" data-share="copy" type="button">Copy link</button><a class="btn secondary" data-share="whatsapp" target="_blank" rel="noopener">WhatsApp</a><a class="btn secondary" data-share="telegram" target="_blank" rel="noopener">Telegram</a><a class="btn secondary" data-share="facebook" target="_blank" rel="noopener">Facebook</a></div></section>
<h2 id="problems">1. Start with a painful little problem</h2><div class="grid"><div class="card"><b>Messy information</b><br>Spreadsheets, CRM cleanup, contact lists, research, organizing files.</div><div class="card"><b>Weak words</b><br>Website copy, email copy, product descriptions, follow-up messages.</div><div class="card"><b>Broken presentation</b><br>Landing-page cleanup, formatting, basic graphics, sales PDFs.</div><div class="card"><b>Ignored customers</b><br>Follow-up systems, FAQ cleanup, inbox organization, response templates.</div></div>
<p class="note">A “service” is just a useful result delivered for someone else. Humanity gave it a corporate noun because apparently “I fix this annoying thing for money” was too efficient.</p>
<h2 id="filter">2. Use the 24-hour filter</h2><div class="step"><div class="num">1</div><div><h3>Can you finish a meaningful first version fast?</h3><p>If the answer requires six weeks, three contractors and a spiritual retreat, it is not your first quick-turn offer.</p></div></div><div class="step"><div class="num">2</div><div><h3>Can the buyer see the difference?</h3><p>“I improved your spreadsheet from chaos to usable” is visible. “I provided strategic synergy” is a cry for help.</p></div></div><div class="step"><div class="num">3</div><div><h3>Can you price the outcome simply?</h3><p>Start with one scope: one page, one list, one cleanup, one research brief, one batch of copy. Specific beats impressive.</p></div></div>
<h2 id="offer">3. Turn it into a one-sentence offer</h2><div class="template">I can [specific result] for [specific buyer] by [timeframe] for [simple price/scope].</div><p>Example: “I can clean and organize your customer spreadsheet, remove duplicates, standardize the columns, and hand back a usable version by tomorrow for $125.”</p>
<h2 id="script">4. Send a message that sounds like a person</h2><div class="template" id="copyText">Hi [Name] — I noticed [specific problem or unfinished task]. I can fix [small concrete result] and send the finished version back by [time]. The scope is [what is included] for [price]. If useful, I can start with the part that matters most first.</div><div class="actions"><button class="btn secondary" id="copyBtn" type="button">Copy script</button></div>
<h2 id="empire">5. Do not build the empire before the invoice</h2><div class="grid"><div class="card"><b>Do:</b><br>find existing demand, show exactly what changes, make payment/fulfillment simple, deliver fast.</div><div class="card"><b>Don’t:</b><br>buy leads, pay to unlock work, invent testimonials, promise earnings, or spend three days choosing a font.</div></div>
<h2 id="checklist">Your 60-minute launch checklist</h2>
<div class="checklist" role="group" aria-label="Launch checklist">
<label><input type="checkbox" data-item="problem"><span>Write down 3 annoying problems you can already solve.<small>Messy data, weak copy, ugly docs — pick your poison.</small></span></label>
<label><input type="checkbox" data-item="filter"><span>Run each through the 24-hour filter.<small>Paid before? Deliverable fast? Explainable in one sentence?</small></span></label>
<label><input type="checkbox" data-item="offer"><span>Write your one-sentence offer.<small>Result + buyer + timeframe + price. No synergy.</small></span></label>
<label><input type="checkbox" data-item="buyer"><span>Find one real buyer with the problem visible.<small>Stale website, chaotic spreadsheet, silent inbox — evidence first.</small></span></label>
<label><input type="checkbox" data-item="send"><span>Personalize the script and send it.<small>Congratulations: you are now ahead of the business-plan committee.</small></span></label>
</div>
<h2 id="watch">Watch: Episode 001</h2>
<div class="episode"><span class="badge live">Full video + Short</span>
<h3 style="margin:10px 0 6px">How to Pick a Service You Can Sell Online TODAY (Without Building a Fake Empire)</h3>
<p style="margin:0 0 12px;color:var(--muted)">The 1:49 companion to this guide. Chapters below match the rendered video; YouTube chapters go live on publish.</p>
<table class="sheet"><thead><tr><th>Time</th><th>Chapter</th></tr></thead><tbody>${chapterRows}</tbody></table>
<div class="actions"><a class="btn secondary" data-track="episode_view" data-placement="home" href="${siteUrl("/episode-001")}">Episode page + transcript</a><a class="btn ghost" data-track="youtube_subscribe_click" data-placement="home" href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">Subscribe on YouTube</a></div></div>
<h2>Coming next</h2><div class="grid trio">${nextEps}</div>
<p><a href="${siteUrl("/episodes")}">See all 10 episodes in the queue →</a></p>
<h2 id="faq">FAQ</h2>${faqHtml}
${moneyStrip()}
${newsBox("home")}
<section class="final" id="do-it"><h2>Still staring at the menu?</h2><p>Use the 60-second offer picker. It asks three questions and gives you a practical service idea plus a first move.</p><a class="btn primary" id="pickerBottom" href="${OFFER_PICKER}" target="_blank" rel="noopener">Open the offer picker →</a><p class="fine">The picker suggests directions, not guaranteed income. Reality remains annoyingly involved.${NEWSLETTER_URL ? "" : " New here? The <a href=\"#newsletter\">newsletter opens soon</a>."}</p></section>
</main>`;

  return shell({
    route: "/",
    title: "How to Pick a Service You Can Sell Online Today | Snarky How-To",
    description: "A practical, no-fluff method for choosing one online service, turning it into a simple offer, and making your first outreach move without building an entire business first.",
    canonicalPath: "/",
    schemas: homeSchemas(),
    body,
    scriptExtra: homeScript(),
  });
}
