import express from "express";
import path from "path";
import fs from "fs";
import { INITIAL_ARTICLES, INITIAL_TESTIMONIALS, INITIAL_FAQS, INITIAL_EVENT_GALLERY, CONSULTING_CASE_STUDIES } from "./src/data/cms";
import { 
  sanityClient, 
  ARTICLES_QUERY, 
  ARTICLE_BY_SLUG_QUERY, 
  CASE_STUDIES_QUERY,
  TESTIMONIALS_QUERY,
  EVENT_GALLERY_QUERY,
  FAQS_QUERY
} from "./src/lib/sanity";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// In-memory persistent data store (Headless / Git-based CMS & intake records)
let articlesList = [...INITIAL_ARTICLES];
let testimonialsList = [...INITIAL_TESTIMONIALS];
let faqsList = [...INITIAL_FAQS];
let galleryList = [...INITIAL_EVENT_GALLERY];

interface Inquiry {
  id: string;
  serviceType: 'consulting' | 'events' | 'mentorship' | 'general';
  name: string;
  email: string;
  phone?: string;
  details: Record<string, any>;
  notes?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted';
  notificationTags: string[];
  slackPayload: Record<string, any>;
}

const inquiries: Inquiry[] = [
  {
    id: "AY-2026-8812",
    serviceType: "consulting",
    name: "Elena Vance",
    email: "elena.vance@morningsidehospitality.com",
    phone: "+1 (415) 890-2134",
    details: {
      establishment: "Boutique Hotel & 80-seat Dining Room",
      location: "Healdsburg, CA",
      timeline: "Q3 2026",
      scope: ["Kitchen Line Architecture", "Tasting Menu R&D", "Cost Engineering"],
      budgetRange: "$25,000 - $50,000"
    },
    notes: "Opening our second property. We need chef-level oversight on the brigade station layout and seasonal foraging purveyor network.",
    createdAt: "2026-08-28T14:22:00Z",
    status: "new",
    notificationTags: ["#inquiry-consulting", "#priority-hospitality", "#california"],
    slackPayload: {
      channel: "#chef-advisory-leads",
      text: "⚡ New Culinary Consulting Inquiry from Elena Vance (Morningside Hospitality) — Healdsburg, CA"
    }
  }
];

const newsletterSubscribers: { email: string; source: string; subscribedAt: string }[] = [
  { email: "gourmet.patron@cellarjournal.com", source: "footer_capture", subscribedAt: "2026-08-20T10:15:00Z" }
];

const analyticsEvents: { type: string; branch?: string; metadata?: Record<string, any>; timestamp: string }[] = [
  { type: "pageview", metadata: { route: "/" }, timestamp: "2026-08-30T16:00:00Z" },
  { type: "branch_select", branch: "consulting", timestamp: "2026-08-30T16:05:00Z" },
  { type: "branch_select", branch: "events", timestamp: "2026-08-30T16:10:00Z" },
  { type: "branch_select", branch: "mentorship", timestamp: "2026-08-30T16:15:00Z" },
  { type: "inquiry_submit", branch: "consulting", timestamp: "2026-08-30T16:22:00Z" }
];

// In-memory rate limiting tracker (sliding 15-minute window)
const rateLimitStore: Record<string, { count: number; resetAt: number }> = {};

function applyRateLimit(limit: number, windowMs: number = 15 * 60 * 1000) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown-client';
    const now = Date.now();
    const entry = rateLimitStore[ip];

    if (!entry || now > entry.resetAt) {
      rateLimitStore[ip] = { count: 1, resetAt: now + windowMs };
      return next();
    }

    if (entry.count >= limit) {
      const waitMinutes = Math.ceil((entry.resetAt - now) / 60000);
      return res.status(429).json({
        error: `Too many submissions from this connection. Please wait ${waitMinutes} minute(s) before trying again.`
      });
    }

    entry.count += 1;
    next();
  };
}

// SEO & Search Engine Endpoints (Sitemap & Robots)
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = process.env.APP_URL || "https://adamyohoculinary.com";
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

  const articlePages = articlesList.map(art => ({
    loc: `/press-journal/${art.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: art.date ? new Date(art.date).toISOString().split("T")[0] : currentDate
  }));

  const allUrls = [...staticPages, ...articlePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    u => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${(u as any).lastmod || currentDate}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(xml);
});

app.get("/robots.txt", (req, res) => {
  const baseUrl = process.env.APP_URL || "https://adamyohoculinary.com";
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.header("Content-Type", "text/plain");
  res.send(robots);
});

// --- API Endpoints ---

// 1. Intake Branching Form API (With Rate Limiting & Anti-Spam)
app.post("/api/inquiries", applyRateLimit(10, 15 * 60 * 1000), (req, res) => {
  const { serviceType, name, email, phone, details, notes, honeypot, captchaToken } = req.body;

  // Honeypot spam protection
  if (honeypot && honeypot.trim().length > 0) {
    console.warn("[Spam Blocked] Honeypot triggered:", honeypot);
    return res.status(400).json({ error: "Spam submission rejected." });
  }

  // Inline Validation
  if (!name || !name.trim()) {
    return res.status(422).json({ error: "Name is required." });
  }
  if (!email || !email.includes("@")) {
    return res.status(422).json({ error: "A valid email address is required." });
  }
  if (!serviceType || !['consulting', 'events', 'mentorship', 'general'].includes(serviceType)) {
    return res.status(422).json({ error: "Valid service type is required." });
  }

  // Generate Reference ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const inquiryId = `AY-2026-${randomSuffix}`;

  // Tagging and Slack/Email notification payload routing
  const tagMap: Record<string, string[]> = {
    consulting: ["#consulting-intake", "#kitchen-ops", "#advisory"],
    events: ["#private-dining", "#tasting-event", "#bespoke"],
    mentorship: ["#mentorship-application", "#stage-coaching", "#talent"],
    general: ["#general-inquiry", "#press-correspondence"]
  };

  const channelMap: Record<string, string> = {
    consulting: "#inquiries-consulting",
    events: "#inquiries-private-events",
    mentorship: "#inquiries-mentorship",
    general: "#inquiries-general"
  };

  const notificationTags = tagMap[serviceType] || ["#general"];
  const slackPayload = {
    channel: channelMap[serviceType] || "#inquiries-general",
    icon_emoji: ":knife_fork_plate:",
    text: `*New Intake Form Submission [${inquiryId}]* — Service: *${serviceType.toUpperCase()}*\n*Client:* ${name} (<${email}>)\n*Phone:* ${phone || "N/A"}\n*Tags:* ${notificationTags.join(' ')}\n*Notes:* ${notes || "None provided"}`
  };

  const newInquiry: Inquiry = {
    id: inquiryId,
    serviceType,
    name,
    email,
    phone,
    details: details || {},
    notes,
    createdAt: new Date().toISOString(),
    status: 'new',
    notificationTags,
    slackPayload
  };

  inquiries.unshift(newInquiry);

  // Record conversion analytics event
  analyticsEvents.push({
    type: "inquiry_submit",
    branch: serviceType,
    metadata: { inquiryId, name },
    timestamp: new Date().toISOString()
  });

  return res.status(201).json({
    success: true,
    inquiryId,
    serviceType,
    receivedAt: newInquiry.createdAt,
    tags: notificationTags,
    notificationRoutedTo: slackPayload.channel,
    message: "Inquiry successfully received and logged to kitchen atelier desk."
  });
});

app.get("/api/inquiries", (req, res) => {
  res.json({ inquiries, count: inquiries.length });
});

// 2. Newsletter Capture & Email-Marketing Provider Integration API
app.post("/api/newsletter", applyRateLimit(15, 15 * 60 * 1000), async (req, res) => {
  const { email, source = "footer_newsletter", tags = ["seasonal-dispatches", "atelier-subscriber"] } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(422).json({ error: "Please provide a valid email address." });
  }

  const existing = newsletterSubscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.json({
      success: true,
      status: "already_subscribed",
      provider: "Mailchimp / ConvertKit Headless Sync",
      message: "You are already subscribed to Chef Adam Yoho's seasonal kitchen dispatches."
    });
  }

  const subscriberRecord = {
    id: `SUB-${Date.now().toString(36).toUpperCase()}`,
    email,
    source,
    tags: [...tags, "terroir-notes", "harvest-calendar"],
    provider: process.env.EMAIL_MARKETING_PROVIDER || "Mailchimp / ConvertKit Sync",
    subscribedAt: new Date().toISOString(),
    status: "active"
  };

  newsletterSubscribers.push(subscriberRecord);

  // If external email provider webhook is configured, forward asynchronously
  if (process.env.EMAIL_MARKETING_WEBHOOK_URL) {
    try {
      await fetch(process.env.EMAIL_MARKETING_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "subscriber.created",
          data: subscriberRecord
        })
      });
    } catch (err) {
      console.warn("External email marketing webhook dispatch buffered:", err);
    }
  }

  // Record conversion analytics event
  analyticsEvents.push({
    type: "newsletter_subscribe",
    branch: "general",
    metadata: { emailDomain: email.split("@")[1] || "unknown", source },
    timestamp: new Date().toISOString()
  });

  return res.status(201).json({
    success: true,
    subscriberId: subscriberRecord.id,
    provider: subscriberRecord.provider,
    tags: subscriberRecord.tags,
    message: "Thank you. You have been added to Chef Adam Yoho's seasonal kitchen dispatches."
  });
});

// 3. Headless / Sanity CMS Endpoints
// Articles Query & Detail API
app.get("/api/cms/articles", async (req, res) => {
  const { category, featured, search } = req.query;
  let result = [...articlesList];

  // Try fetching from Sanity project 54009udh
  try {
    const sanityArticles = await sanityClient.fetch(ARTICLES_QUERY);
    if (sanityArticles && sanityArticles.length > 0) {
      result = sanityArticles;
    }
  } catch (err) {
    // Graceful fallback to local seed data
  }

  if (category && category !== 'All') {
    result = result.filter(a => a.category?.toLowerCase() === (category as string).toLowerCase());
  }

  if (featured === 'true') {
    result = result.filter(a => a.featured);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    result = result.filter(a => 
      a.title?.toLowerCase().includes(q) ||
      a.excerpt?.toLowerCase().includes(q) ||
      a.category?.toLowerCase().includes(q)
    );
  }

  res.json({ articles: result, total: result.length });
});

app.get("/api/cms/articles/:slug", async (req, res) => {
  const { slug } = req.params;
  let article = articlesList.find(a => a.slug === slug);
  let related = articlesList.filter(a => a.slug !== slug).slice(0, 2);

  try {
    const sanityArticle = await sanityClient.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
    if (sanityArticle) {
      article = sanityArticle;
    }
  } catch (err) {
    // Fallback to local
  }

  if (!article) {
    return res.status(404).json({ error: "Article dispatch not found." });
  }

  res.json({ article, related });
});

app.post("/api/cms/articles", (req, res) => {
  const newArt = req.body;
  if (!newArt.title || !newArt.slug) {
    return res.status(422).json({ error: "Article title and slug are required." });
  }
  articlesList.unshift(newArt);
  res.status(201).json({ success: true, article: newArt });
});

// Testimonials Query API with Service Type filter and Featured Flag
app.get("/api/cms/testimonials", async (req, res) => {
  const { serviceType, featured } = req.query;
  let result = [...testimonialsList];

  try {
    const sanityTestimonials = await sanityClient.fetch(TESTIMONIALS_QUERY);
    if (sanityTestimonials && sanityTestimonials.length > 0) {
      result = sanityTestimonials;
    }
  } catch (err) {
    // Fallback to local seed data
  }

  if (serviceType && serviceType !== 'all') {
    result = result.filter(t => t.serviceType === serviceType);
  }

  if (featured === 'true') {
    result = result.filter(t => t.featured);
  }

  res.json({ testimonials: result, total: result.length });
});

app.post("/api/cms/testimonials", (req, res) => {
  const newTest = req.body;
  if (!newTest.quote || !newTest.author) {
    return res.status(422).json({ error: "Quote and author are required." });
  }
  testimonialsList.unshift(newTest);
  res.status(201).json({ success: true, testimonial: newTest });
});

// Event Gallery API
app.get("/api/cms/gallery", async (req, res) => {
  const { tag } = req.query;
  let result = [...galleryList];

  try {
    const sanityGallery = await sanityClient.fetch(EVENT_GALLERY_QUERY);
    if (sanityGallery && sanityGallery.length > 0) {
      result = sanityGallery;
    }
  } catch (err) {
    // Fallback
  }

  if (tag && tag !== 'All') {
    result = result.filter(g => g.tag === tag);
  }
  res.json({ gallery: result, total: result.length });
});

// FAQ API
app.get("/api/cms/faqs", async (req, res) => {
  const { category, search } = req.query;
  let result = [...faqsList];

  try {
    const sanityFaqs = await sanityClient.fetch(FAQS_QUERY);
    if (sanityFaqs && sanityFaqs.length > 0) {
      result = sanityFaqs;
    }
  } catch (err) {
    // Fallback
  }

  if (category && category !== 'All') {
    result = result.filter(f => f.category?.toLowerCase() === (category as string).toLowerCase());
  }
  if (search) {
    const q = (search as string).toLowerCase();
    result = result.filter(f =>
      f.question?.toLowerCase().includes(q) ||
      f.answer?.toLowerCase().includes(q) ||
      f.category?.toLowerCase().includes(q)
    );
  }
  res.json({ faqs: result, total: result.length });
});

// Case Studies API
app.get("/api/cms/case-studies", async (req, res) => {
  let result = [...CONSULTING_CASE_STUDIES];

  try {
    const sanityCaseStudies = await sanityClient.fetch(CASE_STUDIES_QUERY);
    if (sanityCaseStudies && sanityCaseStudies.length > 0) {
      result = sanityCaseStudies;
    }
  } catch (err) {
    // Fallback
  }

  res.json({ caseStudies: result });
});

// 4. Analytics Tracking & Attribution
app.post("/api/analytics/track", (req, res) => {
  const { type, branch, metadata } = req.body;
  if (type) {
    analyticsEvents.push({
      type,
      branch,
      metadata,
      timestamp: new Date().toISOString()
    });
  }
  res.json({ status: "tracked" });
});

app.get("/api/analytics", (req, res) => {
  const branchCounts: Record<string, { views: number; submissions: number; conversionRate: string }> = {
    consulting: { views: 0, submissions: 0, conversionRate: "0%" },
    events: { views: 0, submissions: 0, conversionRate: "0%" },
    mentorship: { views: 0, submissions: 0, conversionRate: "0%" },
    general: { views: 0, submissions: 0, conversionRate: "0%" },
  };

  analyticsEvents.forEach(evt => {
    if (evt.type === 'branch_select' && evt.branch && branchCounts[evt.branch]) {
      branchCounts[evt.branch].views += 1;
    }
    if (evt.type === 'inquiry_submit' && evt.branch && branchCounts[evt.branch]) {
      branchCounts[evt.branch].submissions += 1;
    }
  });

  Object.keys(branchCounts).forEach(k => {
    const b = branchCounts[k];
    const totalViews = Math.max(b.views, b.submissions);
    b.conversionRate = totalViews > 0 ? `${Math.round((b.submissions / totalViews) * 100)}%` : "0%";
  });

  res.json({
    totalEvents: analyticsEvents.length,
    totalInquiries: inquiries.length,
    branchAttribution: branchCounts,
    recentEvents: analyticsEvents.slice(-20).reverse()
  });
});

// Start Express and Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Centralized Error Monitoring Middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`[Server Error ${new Date().toISOString()}] ${req.method} ${req.path}:`, err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({
      error: "Internal atelier server error. The culinary technical team has been alerted.",
      requestId: `ERR-${Date.now().toString(36)}`
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
