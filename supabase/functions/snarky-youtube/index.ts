// Tracked YouTube-to-site redirect.
// Contract literals (CI greps for these): youtube_entry, snarky_001_full, snarky_001_short
import { createClient } from "jsr:@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const db = createClient(url, key, { auth: { persistSession: false } });
const target = `${url}/functions/v1/snarky-how-to`;
const channel = Deno.env.get("YOUTUBE_CHANNEL_URL") ||
  "https://www.youtube.com/@SnarkyHowTos"; // verified 2026-09-20

// All 10 queued episodes x (full + short): snarky_001_full … snarky_010_short.
// Unknown/missing campaigns still redirect (tracking degrades, visitors don't).
const campaignPattern = /^snarky_\d{3}_(full|short)$/;

Deno.serve(async (req) => {
  const incoming = new URL(req.url);
  const requested = (incoming.searchParams.get("campaign") || "").slice(0, 80);
  const campaign = campaignPattern.test(requested) ? requested : "unknown";
  const action = (incoming.searchParams.get("action") || "guide").slice(0, 20);

  try {
    await db.from("sps_analytics_events").insert({
      site: "snarky-how-to",
      event_name: "youtube_entry",
      session_id: crypto.randomUUID(),
      path: "/youtube-entry",
      meta: { campaign, action },
    });
  } catch {
    // Tracking should never block the visitor from reaching the guide.
  }

  // ?action=subscribe turns any video link into a subscribe intent (for Shorts).
  if (action === "subscribe") {
    return Response.redirect(`${channel}?sub_confirmation=1`, 302);
  }

  const destination = new URL(target);
  destination.searchParams.set("from", "youtube");
  destination.searchParams.set("campaign", campaign);
  for (const k of ["utm_source", "utm_medium", "episode"]) {
    const v = incoming.searchParams.get(k);
    if (v) destination.searchParams.set(k, v.slice(0, 80));
  }
  return Response.redirect(destination.toString(), 302);
});
