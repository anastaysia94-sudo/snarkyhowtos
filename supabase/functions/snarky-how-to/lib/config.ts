// Shared site configuration for the snarky-how-to Edge Function.
//
// Custom-domain plan (free-stack): keep this code unchanged and set the
// SITE_BASE_URL secret to e.g. https://snarkyhowto.com once DNS is live.
// Until then the Supabase function URL is the canonical base.
export const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
export const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const SITE_BASE_OVERRIDE = (Deno.env.get("SITE_BASE_URL") || "").replace(/\/$/, "");
export const SITE_BASE = SITE_BASE_OVERRIDE ||
  `${SUPABASE_URL}/functions/v1/snarky-how-to`;

export const SITE_NAME = "Snarky How-To";
export const TAGLINE = "Real solutions. No boring B.S.";
export const LAST_UPDATED = "2026-09-20";
export const FIRST_PUBLISHED = "2026-09-17";

// 60-second offer picker (external interactive tool).
export const OFFER_PICKER =
  "https://today-offer-picker-smartpickshop.anastaysia98.chatgpt.site";

// TODO(launch): verify the real channel handle and set YOUTUBE_CHANNEL_URL.
// Default guess below; fix before announcing the newsletter/sponsor page.
export const YOUTUBE_CHANNEL_URL = Deno.env.get("YOUTUBE_CHANNEL_URL") ||
  "https://www.youtube.com/@SnarkyHowTo";

// Newsletter (recommended free stack: Beehiiv free tier up to 2,500 subs).
// Empty = "opening soon" mode: the site shows a YouTube fallback CTA instead
// of a broken external link. Set NEWSLETTER_URL to enable the real signup.
export const NEWSLETTER_URL = Deno.env.get("NEWSLETTER_URL") || "";

export function siteUrl(path = "/"): string {
  if (path === "/") return SITE_BASE;
  return `${SITE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface Episode {
  n: string; // "001"
  title: string;
  seoTitle: string;
  keyword: string;
  intent: string;
  hook: string;
  asset: string;
  status: "live" | "next";
  campaignFull: string;
  campaignShort: string;
}

// Single source of truth for the public episode index, sitemap, feed,
// YouTube descriptions, and analytics campaign ids.
export const EPISODES: Episode[] = [
  {
    n: "001",
    title: "How to Pick a Service You Can Sell Online TODAY (Without Building a Fake Empire)",
    seoTitle: "Pick a Service You Can Sell Online Today",
    keyword: "how to pick a service to sell online",
    intent: "Choose one sellable service and send one specific offer fast.",
    hook: "Stop building the empire before the invoice.",
    asset: "Outreach script template (.txt) + 60-second offer picker",
    status: "live",
    campaignFull: "snarky_001_full",
    campaignShort: "snarky_001_short",
  },
  {
    n: "002",
    title: "How to Tell If a Remote Job Is Actually a Scam",
    seoTitle: "Remote Job Scam Check: 9 Red Flags",
    keyword: "how to tell if a remote job is a scam",
    intent: "Spot scam patterns before sharing info or money.",
    hook: "If they want your money to give you work, that is not a job.",
    asset: "Saveable red-flag card",
    status: "next",
    campaignFull: "snarky_002_full",
    campaignShort: "snarky_002_short",
  },
  {
    n: "003",
    title: "How to Write a Follow-Up Email Without Sounding Desperate",
    seoTitle: "Follow-Up Emails That Sound Human",
    keyword: "how to write a follow-up email",
    intent: "Follow up with timing + scripts that respect the reader.",
    hook: "Bumping this to the top of your inbox is not a strategy.",
    asset: "3 follow-up scripts + timing guide",
    status: "next",
    campaignFull: "snarky_003_full",
    campaignShort: "snarky_003_short",
  },
  {
    n: "004",
    title: "How to Fix a Spreadsheet That Looks Like It Survived a Bar Fight",
    seoTitle: "Spreadsheet Cleanup Checklist",
    keyword: "how to clean up a messy spreadsheet",
    intent: "Turn chaos into a usable sheet with a repeatable checklist.",
    hook: "Your spreadsheet should not need a search party.",
    asset: "Cleanup checklist + before/after demo",
    status: "next",
    campaignFull: "snarky_004_full",
    campaignShort: "snarky_004_short",
  },
  {
    n: "005",
    title: "How to Make a One-Page Offer Someone Can Understand",
    seoTitle: "One-Page Offer Template",
    keyword: "how to write a one-page service offer",
    intent: "Outcome, scope, deadline, price, proof — on one page.",
    hook: "If the offer needs a glossary, it is not an offer.",
    asset: "One-page offer template",
    status: "next",
    campaignFull: "snarky_005_full",
    campaignShort: "snarky_005_short",
  },
  {
    n: "006",
    title: "How to Build a Portfolio With No Clients Without Lying",
    seoTitle: "No-Client Portfolio That Stays Honest",
    keyword: "how to build a portfolio with no clients",
    intent: "Sample projects + honest labels + evidence rules.",
    hook: "Spec work is fine. Fake clients are not.",
    asset: "Portfolio starter checklist",
    status: "next",
    campaignFull: "snarky_006_full",
    campaignShort: "snarky_006_short",
  },
  {
    n: "007",
    title: "How to Price a Small Service Without Summoning a Consulting Firm",
    seoTitle: "Simple Pricing for Small Services",
    keyword: "how to price a small freelance service",
    intent: "Scope-first pricing with boundaries that survive contact.",
    hook: "Charge for the outcome, not your font deliberations.",
    asset: "Scope-first pricing worksheet",
    status: "next",
    campaignFull: "snarky_007_full",
    campaignShort: "snarky_007_short",
  },
  {
    n: "008",
    title: "How to Research a Business in 10 Minutes",
    seoTitle: "10-Minute Business Research Method",
    keyword: "how to research a business quickly",
    intent: "Useful public signals + source checking, no creepy nonsense.",
    hook: "Stalking is not research. Check the receipts instead.",
    asset: "10-minute research checklist",
    status: "next",
    campaignFull: "snarky_008_full",
    campaignShort: "snarky_008_short",
  },
  {
    n: "009",
    title: "How to Turn One Annoying Task Into a Paid Package",
    seoTitle: "Turn Annoying Tasks Into Paid Packages",
    keyword: "how to package a service to sell",
    intent: "Design a repeatable micro-service people rebuy.",
    hook: "If everyone hates doing it, someone will pay to skip it.",
    asset: "Micro-service packaging worksheet",
    status: "next",
    campaignFull: "snarky_009_full",
    campaignShort: "snarky_009_short",
  },
  {
    n: "010",
    title: "How to Stop Paying to Find Work",
    seoTitle: "Stop Paying to Find Work: Warning Signs",
    keyword: "upfront fee job scam warning signs",
    intent: "Recognize pay-to-work traps and demand-first channels.",
    hook: "Real clients pay you. That is the entire arrangement.",
    asset: "Upfront-fee warning card + legit-channel list",
    status: "next",
    campaignFull: "snarky_010_full",
    campaignShort: "snarky_010_short",
  },
];

export const EPISODE_001_CHAPTERS: Array<{ t: string; seconds: number; title: string }> = [
  { t: "00:00", seconds: 0, title: "Stop building the empire before the invoice" },
  { t: "00:13", seconds: 13, title: "The 3-test service filter" },
  { t: "00:27", seconds: 27, title: "Messy information" },
  { t: "00:40", seconds: 40, title: "Weak words" },
  { t: "00:52", seconds: 52, title: "Broken presentation" },
  { t: "01:06", seconds: 66, title: "Sell one small outcome" },
  { t: "01:22", seconds: 82, title: "Outreach that sounds human" },
  { t: "01:38", seconds: 98, title: "Do the next money-adjacent thing" },
];

// Rendered full-video runtime from content/youtube/episode-001/full.srt (ends 00:01:49).
export const EPISODE_001_DURATION_ISO = "PT1M49S";

// Plain-text transcript of the rendered Episode 001 full video (from full.srt,
// timestamps stripped). Served on /episode-001 for SEO/AEO + accessibility.
export const EPISODE_001_TRANSCRIPT: string[] = [
  "You do not need a logo, an LLC, a forty-seven-page business plan, or a founder origin story filmed against exposed brick. You need one useful result, one buyer, and one clear offer.",
  "Pick a service that passes three tests. First, people already pay for it. Second, you can deliver a useful first version in twenty-four to forty-eight hours. Third, you can explain the result in one sentence.",
  "Start with messy information. Businesses pay people to clean spreadsheets, organize customer records, research contacts, and turn chaos into something another human can actually use.",
  "Or fix weak words. Website copy, follow-up emails, product descriptions, frequently asked questions, and sales messages all have a visible before and after.",
  "Or fix broken presentation. Clean up a landing page, format a sales PDF, improve simple graphics, or make an ugly document readable. Glamorous? No. Billable? Potentially.",
  "Now package one small outcome. Say exactly what changes, when they get it, and what it costs. For example: I can clean and organize your customer spreadsheet and return a usable version by tomorrow for one hundred twenty-five dollars.",
  "Then send a message that sounds like a person. I noticed this specific problem. I can fix this small result by this time. The scope is this, for this price. No synergy. No revolutionary ecosystem. Everyone survives.",
  "Your next step is not more planning. Open the sixty-second offer picker, choose one service, and send one specific offer. The empire can have a commemorative plaque later.",
];
