import { createClient } from "jsr:@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const db = createClient(url, key, { auth: { persistSession: false } });
const target = `${url}/functions/v1/snarky-how-to`;
const allowed = new Set(["snarky_001_full", "snarky_001_short"]);

Deno.serve(async (req) => {
  const incoming = new URL(req.url);
  const requested = incoming.searchParams.get("campaign") || "";
  const campaign = allowed.has(requested) ? requested : "unknown";

  try {
    await db.from("sps_analytics_events").insert({
      site: "snarky-how-to",
      event_name: "youtube_entry",
      session_id: crypto.randomUUID(),
      path: "/youtube-entry",
      meta: { campaign },
    });
  } catch {
    // Tracking should never block the visitor from reaching the guide.
  }

  const destination = new URL(target);
  destination.searchParams.set("from", "youtube");
  destination.searchParams.set("campaign", campaign);
  return Response.redirect(destination.toString(), 302);
});
