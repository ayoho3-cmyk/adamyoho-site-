import {
  INITIAL_ARTICLES,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_EVENT_GALLERY,
  CONSULTING_CASE_STUDIES,
} from "../src/data/cms";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  APP_URL?: string;
  EMAIL_MARKETING_PROVIDER?: string;
  EMAIL_MARKETING_WEBHOOK_URL?: string;
}

// --- Static CMS content ---
// Scope note: /api/cms/articles and /api/cms/testimonials have POST routes
// below, but the frontend's "add" UI (CMSStudioModal) only updates local
// React state and never calls them — so there is no live write traffic to
// persist here yet. Articles/testimonials/faqs/gallery/case-studies stay as
// static seed data. If the CMS editor is wired up to actually save, these
// should move into D1 the same way inquiries/newsletter/analytics did below.
const articlesList = [...INITIAL_ARTICLES];
const testimonialsList = [...INITIAL_TESTIMONIALS];
const faqsList = [...INITIAL_FAQS];
const galleryList = [...INITIAL_EVENT_GALLERY];

interface Inquiry {
  id: string;
  serviceType: "consulting" | "events" | "mentorship" | "general";
  name: string;
  email: string;
  phone?: string;
  details: Record<string, any>;
  notes?: string;
  createdAt: string;
  status: "new" | "reviewed" | "contacted";
  notificationTags: string[];
  slackPayload: Record<string, any>;
}

// --- Rate limiting (best-effort, per-isolate only) ---
// NOTE: this remains in-memory. Workers isolates aren't shared across the
// edge network, so this is a soft speed bump against casual abuse, not a
// hard global limit. A Durable Object or KV-with-TTL would be needed for a
// real global limit; flagging this as a known gap rather than fixing it
// silently, since it's outside what was asked for here.
const rateLimitStore: Record<string, { count: number; resetAt: number }> = {};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function applyRateLimit(
  request: Request,
  limit: number,
  windowMs = 15 * 60 * 1000
): Response | null {
  const ip = request.headers.get("cf-connecting-ip") || "unknown-client";
  const now = Date.now();
  const entry = rateLimitStore[ip];

  if (!entry || now > entry.resetAt) {
    rateLimitStore[ip] = { count: 1, resetAt: now + windowMs };
    return null;
  }

  if (entry.count >= limit) {
    const waitMinutes = Math.ceil((entry.resetAt - now) / 60000);
    return json(
      {
        error: `Too many submissions from this connection. Please wait ${waitMinutes} minute(s) before trying again.`,
      },
      429
    );
  }

  entry.count += 1;
  return null;
}

const tagMap: Record<string, string[]> = {
  consulting: ["#consulting-intake", "#kitchen-ops", "#advisory"],
  events: ["#private-dining", "#tasting-event", "#bespoke"],
  mentorship: ["#mentorship-application", "#stage-coaching", "#talent"],
  general: ["#general-inquiry", "#press-correspondence"],
};

const channelMap: Record<string, string> = {
  consulting: "#inquiries-consulting",
  events: "#inquiries-private-events",
  mentorship: "#inquiries-mentorship",
  general: "#inquiries-general",
};

function generateSitemap(baseUrl: string): string {
  const currentDate = new Date().toISOString().split("T")[0];

  const staticPages = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/about", priority: "0.9", changefreq: "monthly" },
    { loc: "/consulting", priority: "0.9", changefreq: "weekly" },
    { loc: "/events", priority: "0.9", changefreq: "weekly" },
    { loc: "/mentorship", priority: "0.9", changefreq: "monthly" },
    { loc: "/press-journal", priority: "0.8", changefreq: "weekly" },
    { loc: "/testimonials", priority: "0.7", changefreq: "monthly" },
    { loc: "/faq", priority: "0.6", changefreq: "monthly" },
    { loc: "/contact", priority: "0.9", changefreq: "monthly" },
  ];

  const articlePages = articlesList.map((art) => ({
    loc: `/press-journal/${art.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: art.date ? new Date(art.date).toISOString().split("T")[0] : currentDate,
  }));

  const allUrls = [...staticPages, ...articlePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u: any) => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${u.lastmod || currentDate}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

function generateRobots(baseUrl: string): string {
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
}

// --- D1 row <-> API shape mapping helpers ---

function inquiryFromRow(row: Record<string, any>): Inquiry {
  return {
    id: row.id,
    serviceType: row.service_type,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    details: JSON.parse(row.details || "{}"),
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    status: row.status,
    notificationTags: JSON.parse(row.notification_tags || "[]"),
    slackPayload: JSON.parse(row.slack_payload || "{}"),
  };
}

async function handleInquiriesPost(request: Request, env: Env): Promise<Response> {
  const limited = applyRateLimit(request, 10);
  if (limited) return limited;

  const body: any = await request.json().catch(() => ({}));
  const { serviceType, name, email, phone, details, notes, honeypot } = body;

  if (honeypot && String(honeypot).trim().length > 0) {
    return json({ error: "Spam submission rejected." }, 400);
  }
  if (!name || !String(name).trim()) {
    return json({ error: "Name is required." }, 422);
  }
  if (!email || !String(email).includes("@")) {
    return json({ error: "A valid email address is required." }, 422);
  }
  if (
    !serviceType ||
    !["consulting", "events", "mentorship", "general"].includes(serviceType)
  ) {
    return json({ error: "Valid service type is required." }, 422);
  }

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const inquiryId = `AY-${new Date().getFullYear()}-${randomSuffix}`;
  const notificationTags = tagMap[serviceType] || ["#general"];
  const slackPayload = {
    channel: channelMap[serviceType] || "#inquiries-general",
    icon_emoji: ":knife_fork_plate:",
    text: `*New Intake Form Submission [${inquiryId}]* — Service: *${String(
      serviceType
    ).toUpperCase()}*\n*Client:* ${name} (<${email}>)\n*Phone:* ${
      phone || "N/A"
    }\n*Tags:* ${notificationTags.join(" ")}\n*Notes:* ${notes || "None provided"}`,
  };
  const createdAt = new Date().toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO inquiries
        (id, service_type, name, email, phone, details, notes, status, notification_tags, slack_payload, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)`
    )
      .bind(
        inquiryId,
        serviceType,
        name,
        email,
        phone || null,
        JSON.stringify(details || {}),
        notes || null,
        JSON.stringify(notificationTags),
        JSON.stringify(slackPayload),
        createdAt
      )
      .run();

    await env.DB.prepare(
      `INSERT INTO analytics_events (type, branch, metadata, timestamp) VALUES (?, ?, ?, ?)`
    )
      .bind(
        "inquiry_submit",
        serviceType,
        JSON.stringify({ inquiryId, name }),
        createdAt
      )
      .run();
  } catch (err) {
    console.error("D1 write failed for inquiry submission:", err);
    return json(
      {
        error:
          "We couldn't save your inquiry right now. Please try again in a moment, or reach out directly.",
      },
      503
    );
  }

  return json(
    {
      success: true,
      inquiryId,
      serviceType,
      receivedAt: createdAt,
      tags: notificationTags,
      notificationRoutedTo: slackPayload.channel,
      message: "Inquiry successfully received and logged to kitchen atelier desk.",
    },
    201
  );
}

async function handleInquiriesGet(env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    `SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 200`
  ).all();
  const inquiries = (results || []).map(inquiryFromRow);
  return json({ inquiries, count: inquiries.length });
}

async function handleNewsletterPost(request: Request, env: Env): Promise<Response> {
  const limited = applyRateLimit(request, 15);
  if (limited) return limited;

  const body: any = await request.json().catch(() => ({}));
  const {
    email,
    source = "footer_newsletter",
    tags = ["seasonal-dispatches", "atelier-subscriber"],
  } = body;

  if (!email || !String(email).includes("@")) {
    return json({ error: "Please provide a valid email address." }, 422);
  }

  const existing = await env.DB.prepare(
    `SELECT id FROM newsletter_subscribers WHERE lower(email) = lower(?)`
  )
    .bind(email)
    .first();

  if (existing) {
    return json({
      success: true,
      status: "already_subscribed",
      provider: "Mailchimp / ConvertKit Headless Sync",
      message: "You are already subscribed to Chef Adam Yoho's seasonal kitchen dispatches.",
    });
  }

  const subscriberId = `SUB-${Date.now().toString(36).toUpperCase()}`;
  const finalTags = [...tags, "terroir-notes", "harvest-calendar"];
  const provider = env.EMAIL_MARKETING_PROVIDER || "Mailchimp / ConvertKit Sync";
  const subscribedAt = new Date().toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO newsletter_subscribers (id, email, source, tags, provider, status, subscribed_at)
       VALUES (?, ?, ?, ?, ?, 'active', ?)`
    )
      .bind(subscriberId, email, source, JSON.stringify(finalTags), provider, subscribedAt)
      .run();

    await env.DB.prepare(
      `INSERT INTO analytics_events (type, branch, metadata, timestamp) VALUES (?, ?, ?, ?)`
    )
      .bind(
        "newsletter_subscribe",
        "general",
        JSON.stringify({ emailDomain: String(email).split("@")[1] || "unknown", source }),
        subscribedAt
      )
      .run();
  } catch (err) {
    // UNIQUE constraint races (two rapid submits for the same email) land here too.
    console.error("D1 write failed for newsletter signup:", err);
    return json(
      {
        error: "We couldn't process that subscription right now. Please try again shortly.",
      },
      503
    );
  }

  if (env.EMAIL_MARKETING_WEBHOOK_URL) {
    try {
      await fetch(env.EMAIL_MARKETING_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "subscriber.created",
          data: { id: subscriberId, email, source, tags: finalTags, provider, subscribedAt },
        }),
      });
    } catch (err) {
      console.warn("External email marketing webhook dispatch buffered:", err);
    }
  }

  return json(
    {
      success: true,
      subscriberId,
      provider,
      tags: finalTags,
      message: "Thank you. You have been added to Chef Adam Yoho's seasonal kitchen dispatches.",
    },
    201
  );
}

async function handleAnalyticsTrackPost(request: Request, env: Env): Promise<Response> {
  const { type, branch, metadata }: any = await request.json().catch(() => ({}));
  if (type) {
    try {
      await env.DB.prepare(
        `INSERT INTO analytics_events (type, branch, metadata, timestamp) VALUES (?, ?, ?, ?)`
      )
        .bind(type, branch || null, metadata ? JSON.stringify(metadata) : null, new Date().toISOString())
        .run();
    } catch (err) {
      // Analytics is best-effort; don't fail the page interaction over it.
      console.warn("D1 write failed for analytics event (non-fatal):", err);
    }
  }
  return json({ status: "tracked" });
}

async function handleAnalyticsGet(env: Env): Promise<Response> {
  const branchCounts: Record<
    string,
    { views: number; submissions: number; conversionRate: string }
  > = {
    consulting: { views: 0, submissions: 0, conversionRate: "0%" },
    events: { views: 0, submissions: 0, conversionRate: "0%" },
    mentorship: { views: 0, submissions: 0, conversionRate: "0%" },
    general: { views: 0, submissions: 0, conversionRate: "0%" },
  };

  const [totalsRow, viewRows, submissionRows, recent, inquiryCountRow] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) AS total FROM analytics_events`).first<{ total: number }>(),
    env.DB.prepare(
      `SELECT branch, COUNT(*) AS n FROM analytics_events WHERE type = 'branch_select' AND branch IS NOT NULL GROUP BY branch`
    ).all(),
    env.DB.prepare(
      `SELECT branch, COUNT(*) AS n FROM analytics_events WHERE type = 'inquiry_submit' AND branch IS NOT NULL GROUP BY branch`
    ).all(),
    env.DB.prepare(
      `SELECT type, branch, metadata, timestamp FROM analytics_events ORDER BY timestamp DESC LIMIT 20`
    ).all(),
    env.DB.prepare(`SELECT COUNT(*) AS total FROM inquiries`).first<{ total: number }>(),
  ]);

  for (const row of (viewRows.results || []) as any[]) {
    if (branchCounts[row.branch]) branchCounts[row.branch].views = row.n;
  }
  for (const row of (submissionRows.results || []) as any[]) {
    if (branchCounts[row.branch]) branchCounts[row.branch].submissions = row.n;
  }
  Object.keys(branchCounts).forEach((k) => {
    const b = branchCounts[k];
    const totalViews = Math.max(b.views, b.submissions);
    b.conversionRate =
      totalViews > 0 ? `${Math.round((b.submissions / totalViews) * 100)}%` : "0%";
  });

  const recentEvents = ((recent.results || []) as any[]).map((r) => ({
    type: r.type,
    branch: r.branch ?? undefined,
    metadata: r.metadata ? JSON.parse(r.metadata) : undefined,
    timestamp: r.timestamp,
  }));

  return json({
    totalEvents: totalsRow?.total ?? 0,
    totalInquiries: inquiryCountRow?.total ?? 0,
    branchAttribution: branchCounts,
    recentEvents,
  });
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const baseUrl = env.APP_URL || "https://adamyoho.com";

    try {
      if (url.pathname === "/sitemap.xml") {
        return new Response(generateSitemap(baseUrl), {
          headers: { "Content-Type": "application/xml" },
        });
      }
      if (url.pathname === "/robots.txt") {
        return new Response(generateRobots(baseUrl), {
          headers: { "Content-Type": "text/plain" },
        });
      }

      if (url.pathname === "/api/inquiries") {
        if (request.method === "POST") return handleInquiriesPost(request, env);
        if (request.method === "GET") return handleInquiriesGet(env);
        return json({ error: "Method not allowed." }, 405);
      }

      if (url.pathname === "/api/newsletter") {
        if (request.method === "POST") return handleNewsletterPost(request, env);
        return json({ error: "Method not allowed." }, 405);
      }

      if (url.pathname === "/api/cms/articles" && request.method === "GET") {
        const category = url.searchParams.get("category");
        const featured = url.searchParams.get("featured");
        const search = url.searchParams.get("search");
        let result = [...articlesList];
        if (category && category !== "All") {
          result = result.filter((a) => a.category.toLowerCase() === category.toLowerCase());
        }
        if (featured === "true") {
          result = result.filter((a) => a.featured);
        }
        if (search) {
          const q = search.toLowerCase();
          result = result.filter(
            (a) =>
              a.title.toLowerCase().includes(q) ||
              a.excerpt.toLowerCase().includes(q) ||
              a.category.toLowerCase().includes(q)
          );
        }
        return json({ articles: result, total: result.length });
      }

      if (url.pathname === "/api/cms/articles" && request.method === "POST") {
        const newArt: any = await request.json().catch(() => ({}));
        if (!newArt.title || !newArt.slug) {
          return json({ error: "Article title and slug are required." }, 422);
        }
        articlesList.unshift(newArt);
        return json({ success: true, article: newArt }, 201);
      }

      if (url.pathname.startsWith("/api/cms/articles/") && request.method === "GET") {
        const slug = url.pathname.replace("/api/cms/articles/", "");
        const article = articlesList.find((a) => a.slug === slug);
        if (!article) {
          return json({ error: "Article dispatch not found." }, 404);
        }
        const related = articlesList.filter((a) => a.slug !== slug).slice(0, 2);
        return json({ article, related });
      }

      if (url.pathname === "/api/cms/testimonials") {
        if (request.method === "GET") {
          const serviceType = url.searchParams.get("serviceType");
          const featured = url.searchParams.get("featured");
          let result = [...testimonialsList];
          if (serviceType && serviceType !== "all") {
            result = result.filter((t) => t.serviceType === serviceType);
          }
          if (featured === "true") {
            result = result.filter((t) => t.featured);
          }
          return json({ testimonials: result, total: result.length });
        }
        if (request.method === "POST") {
          const newTest: any = await request.json().catch(() => ({}));
          if (!newTest.quote || !newTest.author) {
            return json({ error: "Quote and author are required." }, 422);
          }
          testimonialsList.unshift(newTest);
          return json({ success: true, testimonial: newTest }, 201);
        }
        return json({ error: "Method not allowed." }, 405);
      }

      if (url.pathname === "/api/cms/gallery") {
        const tag = url.searchParams.get("tag");
        let result = [...galleryList];
        if (tag && tag !== "All") {
          result = result.filter((g) => g.tag === tag);
        }
        return json({ gallery: result, total: result.length });
      }

      if (url.pathname === "/api/cms/faqs") {
        const category = url.searchParams.get("category");
        const search = url.searchParams.get("search");
        let result = [...faqsList];
        if (category && category !== "All") {
          result = result.filter((f) => f.category.toLowerCase() === category.toLowerCase());
        }
        if (search) {
          const q = search.toLowerCase();
          result = result.filter(
            (f) =>
              f.question.toLowerCase().includes(q) ||
              f.answer.toLowerCase().includes(q) ||
              f.category.toLowerCase().includes(q)
          );
        }
        return json({ faqs: result, total: result.length });
      }

      if (url.pathname === "/api/cms/case-studies") {
        return json({ caseStudies: CONSULTING_CASE_STUDIES });
      }

      if (url.pathname === "/api/analytics/track" && request.method === "POST") {
        return handleAnalyticsTrackPost(request, env);
      }

      if (url.pathname === "/api/analytics" && request.method === "GET") {
        return handleAnalyticsGet(env);
      }

      if (url.pathname.startsWith("/api/")) {
        return json({ error: "Not found." }, 404);
      }

      // Everything else falls through to the static asset bundle
      // (with SPA fallback to index.html configured in wrangler.toml).
      return env.ASSETS.fetch(request);
    } catch (err) {
      console.error(
        `[Server Error ${new Date().toISOString()}] ${request.method} ${url.pathname}:`,
        err
      );
      return json(
        {
          error: "Internal atelier server error. The culinary technical team has been alerted.",
          requestId: `ERR-${Date.now().toString(36)}`,
        },
        500
      );
    }
  },
};
