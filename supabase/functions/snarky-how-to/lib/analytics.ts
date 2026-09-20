// Privacy-light analytics writer. Records interaction types + a random session
// id + tiny metadata. Never collects names, emails, GPS, or full user agents.
import { createClient } from "jsr:@supabase/supabase-js@2";
import { SERVICE_KEY, SUPABASE_URL } from "./config.ts";

const db = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

export const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

// Funnel events. page_view carries path/campaign in meta; the rest mark intent.
const allowedEvents = new Set([
  // Legacy launch events (keep: dashboards + CI depend on them).
  "page_view",
  "offer_picker_click",
  "copy_script",
  "download_template",
  "share_click",
  "scroll_25",
  "scroll_50",
  "scroll_75",
  "scroll_100",
  // Engagement + money-path events.
  "newsletter_click",
  "youtube_click",
  "youtube_subscribe_click",
  "video_play",
  "faq_expand",
  "checklist_toggle",
  "affiliate_click",
  "episode_view",
]);

export async function track(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    // Honeypot: bots that fill the invisible "website" field get a fake OK
    // and no database row. Humans never see that field.
    if (typeof body?.website === "string" && body.website.length > 0) {
      return Response.json({ ok: true }, { headers: cors });
    }
    const eventName = String(body?.event_name || "").slice(0, 80);
    const sessionId = String(body?.session_id || "").slice(0, 100);
    if (!allowedEvents.has(eventName) || sessionId.length < 8) {
      return Response.json({ ok: false }, { status: 400, headers: cors });
    }
    const meta = body?.meta && typeof body.meta === "object" ? body.meta : {};
    const safeMeta = JSON.stringify(meta).length <= 2000 ? meta : {};
    const path = new URL(req.url).pathname.slice(0, 200);
    const { error } = await db.from("sps_analytics_events").insert({
      site: "snarky-how-to",
      event_name: eventName,
      session_id: sessionId,
      path,
      meta: safeMeta,
    });
    return Response.json(
      { ok: !error },
      { status: error ? 500 : 200, headers: cors },
    );
  } catch {
    return Response.json({ ok: false }, { status: 400, headers: cors });
  }
}
