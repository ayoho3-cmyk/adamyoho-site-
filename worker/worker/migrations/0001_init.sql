
-- Migration 0001: core persistence tables for adam-yoho-culinary
--
-- Scope note: only tables backing endpoints the live frontend actually
-- calls with real user data are persisted here (inquiries, newsletter
-- signups, analytics events). The /api/cms/articles and
-- /api/cms/testimonials POST endpoints exist in the Worker but are not
-- currently wired up by the frontend (the "add" UI in CMSStudioModal only
-- updates local React state and never calls those endpoints) — so
-- articles/testimonials/faqs/gallery/case-studies remain static seed data
-- for now. Say the word if you want those made editable + persistent too.
 
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  service_type TEXT NOT NULL CHECK (service_type IN ('consulting', 'events', 'mentorship', 'general')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  details TEXT NOT NULL DEFAULT '{}',      -- JSON blob
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted')),
  notification_tags TEXT NOT NULL DEFAULT '[]', -- JSON array
  slack_payload TEXT NOT NULL DEFAULT '{}',      -- JSON blob
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
 
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_service_type ON inquiries (service_type);
 
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  tags TEXT NOT NULL DEFAULT '[]',         -- JSON array
  provider TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  subscribed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
 
CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  branch TEXT,
  metadata TEXT,                            -- JSON blob, nullable
  timestamp TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
 
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events (type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_branch ON analytics_events (branch);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events (timestamp DESC);
 
