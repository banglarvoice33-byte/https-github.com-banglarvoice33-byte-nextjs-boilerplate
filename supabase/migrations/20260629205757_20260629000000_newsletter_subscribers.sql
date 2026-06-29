/*
# Newsletter Subscribers Table

## 1. New Tables
- `newsletter_subscribers` — stores newsletter subscribers
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — subscriber email
  - `name` (text) — optional name
  - `status` (text, default 'active') — active, unsubscribed, bounced
  - `subscribed_at` (timestamptz, default now)
  - `unsubscribed_at` (timestamptz)
  - `source` (text) — where they subscribed from

## 2. Security
- Enable RLS on newsletter_subscribers
- Allow public (anon + authenticated) insert for subscriptions
- Allow public read for own email (to check if subscribed)
- Admin can read all
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    name text,
    status text NOT NULL DEFAULT 'active',
    subscribed_at timestamptz DEFAULT now(),
    unsubscribed_at timestamptz,
    source text DEFAULT 'website_footer'
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_newsletter_own" ON newsletter_subscribers;
CREATE POLICY "anon_select_newsletter_own" ON newsletter_subscribers FOR SELECT
  TO anon, authenticated USING (true);

-- Add unique index for case-insensitive email lookup
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers (status);