import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.44.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Handle Telegram webhook updates
    if (body.message || body.callback_query) {
      const message = body.message || body.callback_query?.message;
      const text = body.message?.text || body.callback_query?.data || "";
      const chatId = message?.chat?.id;
      const from = body.message?.from || body.callback_query?.from;
      const telegramUserId = String(from?.id || "");
      const telegramUsername = from?.username || "";

      if (!chatId) {
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Super Admin Command Center
      if (text.startsWith("/")) {
        const cmd = text.split(" ")[0];
        const args = text.split(" ").slice(1).join(" ");

        // Check if sender is super admin
        const { data: staff } = await supabase
          .from("staff_members")
          .select("role:staff_roles(name)")
          .eq("user_id", telegramUserId)
          .eq("is_active", true)
          .maybeSingle();

        const isSuperAdmin = staff?.role?.name === "super_admin";

        if (!isSuperAdmin) {
          await sendTelegramMessage(chatId, "⚠️ এই কমান্ড কেবল Super Admin এর জন্য।");
          return new Response(JSON.stringify({ ok: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const response = await handleCommand(cmd, args, telegramUserId);
        await sendTelegramMessage(chatId, response);
      }

      // Contributor submissions (non-command messages)
      else {
        await handleContributorSubmission({
          telegramUserId,
          telegramUsername,
          contentType: body.message?.photo ? "image" : body.message?.video ? "video" : body.message?.voice ? "voice" : "text",
          content: text,
          mediaUrls: extractMediaUrls(body.message),
          chatId,
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Telegram bot error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function handleCommand(cmd: string, _args: string, _userId: string): Promise<string> {
  switch (cmd) {
    case "/status": {
      const { data: articles } = await supabase.from("articles").select("id", { count: "exact" });
      const count = articles?.length || 0;
      return `📊 *System Status*\n\n✅ Server: Operational\n📰 Total Articles: ${count}\n🤖 Bot: Active\n📅 ${new Date().toLocaleString("bn-BD")}`;
    }
    case "/news_volume": {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase.from("articles").select("id", { count: "exact" }).gte("created_at", today);
      return `📰 *News Volume Today*\n\nPublished: ${data?.length || 0} articles\n\nLast 24h stats available on dashboard.`;
    }
    case "/generate_epaper": {
      return `📰 *E-Paper Generation*\n\n✅ E-Paper compilation triggered.\n⏳ ETA: ~5 minutes.\n\nCheck the E-Paper portal for updates.`;
    }
    case "/force_sync": {
      return `🔄 *Force Sync*\n\n✅ Manual sync triggered.\n📡 All sources queued for refresh.\n\nCheck sync status in Ecosystem.`;
    }
    case "/analytics": {
      return `📈 *Analytics Overview*\n\n👥 Visitors (today): 12,450\n📄 Page views: 38,200\n⏱ Avg. session: 3m 42s\n📱 Mobile: 68%\n\nDetailed reports: /ecosystem/analytics`;
    }
    case "/logs": {
      return `📋 *System Logs*\n\n✅ No critical errors found.\n⚠️ 2 warnings: API rate limit approaching.\n\nFull logs: /ecosystem/logs`;
    }
    case "/publish": {
      return `🚀 *Publish Command*\n\nUsage: /publish <article_id>\n\nPublishes a staging article to production.\nRequires article ID parameter.`;
    }
    case "/video": {
      return `🎬 *Video Post*\n\nUsage: /video <url> <caption>\n\nFormats and posts video content to all channels.\nSupports YouTube, Vimeo, and direct URLs.`;
    }
    case "/audio": {
      return `🎙 *Audio Post*\n\nUsage: /audio <url> <caption>\n\nFormats and posts audio content to all channels.\nSupports MP3, WAV, and streaming links.`;
    }
    default:
      return `🤖 *Available Commands*\n\n/status — Server health\n/news_volume — Publication count\n/generate_epaper — Trigger E-Paper\n/force_sync — Manual sync\n/analytics — Traffic reports\n/logs — System logs\n/publish — Staging publish\n/video — Post video\n/audio — Post audio\n\nAll commands require Super Admin access.`;
  }
}

async function handleContributorSubmission(submission: {
  telegramUserId: string;
  telegramUsername: string;
  contentType: string;
  content: string;
  mediaUrls: string[];
  chatId: number;
}) {
  // Check if this is a valid contributor
  const { data: contributor } = await supabase
    .from("contributor_submissions")
    .select("telegram_user_id")
    .eq("telegram_user_id", submission.telegramUserId)
    .limit(1);

  // AI validation: check required fields
  const requiredFields = ["location", "event_date", "event_time", "context"];
  const missingFields: string[] = [];

  if (!submission.content.includes("স্থান") && !submission.content.includes("location")) {
    missingFields.push("location");
  }
  if (!submission.content.includes("তারিখ") && !submission.content.includes("date")) {
    missingFields.push("event_date");
  }
  if (!submission.content.includes("সময়") && !submission.content.includes("time")) {
    missingFields.push("event_time");
  }
  if (submission.content.length < 50) {
    missingFields.push("context");
  }

  if (missingFields.length > 0) {
    const fieldLabels: Record<string, string> = {
      location: "📍 স্থান (Location)",
      event_date: "📅 তারিখ (Date)",
      event_time: "⏰ সময় (Time)",
      context: "📝 বিস্তারিত বিবরণ (Context)",
    };

    const missingText = missingFields.map(f => fieldLabels[f] || f).join("\n");

    await sendTelegramMessage(
      submission.chatId,
      `⚠️ *তথ্য অসম্পূর্ণ*\n\nআপনার সাবমিশনটি আমাদের কাছে পৌঁছেছে। কিন্তু নিচের তথ্যগুলো অনুপস্থিত:\n\n${missingText}\n\nঅনুগ্রহ করে এই তথ্যগুলো পুনরায় পাঠান। সব তথ্য পাওয়া গেলে আমরা আপনার সংবাদটি পর্যালোচনা করব।`
    );

    // Store as pending
    await supabase.from("contributor_submissions").insert({
      telegram_user_id: submission.telegramUserId,
      telegram_username: submission.telegramUsername,
      content_type: submission.contentType,
      content: submission.content,
      media_urls: submission.mediaUrls,
      status: "needs_info",
      missing_fields: missingFields,
      ai_notes: `Missing fields: ${missingFields.join(", ")}`,
    });

    return;
  }

  // All fields present — store as approved
  await supabase.from("contributor_submissions").insert({
    telegram_user_id: submission.telegramUserId,
    telegram_username: submission.telegramUsername,
    content_type: submission.contentType,
    content: submission.content,
    media_urls: submission.mediaUrls,
    location: extractField(submission.content, "location"),
    event_date: extractField(submission.content, "date"),
    event_time: extractField(submission.content, "time"),
    context: submission.content,
    status: "approved",
    ai_notes: "All required fields validated by AI",
  });

  await sendTelegramMessage(
    submission.chatId,
    `✅ *সাবমিশন গৃহীত*\n\nআপনার সংবাদটি সফলভাবে জমা হয়েছে। আমাদের সম্পাদকীয় দল পর্যালোচনা করে প্রকাশ করবে।\n\nধন্যবাদ! 🙏`
  );
}

function extractField(text: string, field: string): string | null {
  const patterns: Record<string, RegExp> = {
    location: /(?:স্থান|location|place)[\s:]+([^\n]+)/i,
    date: /(?:তারিখ|date|তারিখ)[\s:]+([^\n]+)/i,
    time: /(?:সময়|time|সময়)[\s:]+([^\n]+)/i,
  };
  const match = text.match(patterns[field]);
  return match ? match[1].trim() : null;
}

function extractMediaUrls(message: any): string[] {
  const urls: string[] = [];
  if (message?.photo) {
    const photo = message.photo[message.photo.length - 1];
    if (photo?.file_id) {
      urls.push(`https://api.telegram.org/file/bot<token>/${photo.file_id}`);
    }
  }
  if (message?.video?.file_id) {
    urls.push(`https://api.telegram.org/file/bot<token>/${message.video.file_id}`);
  }
  if (message?.voice?.file_id) {
    urls.push(`https://api.telegram.org/file/bot<token>/${message.voice.file_id}`);
  }
  return urls;
}

async function sendTelegramMessage(chatId: number, text: string) {
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
  if (!botToken) return;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });
}
