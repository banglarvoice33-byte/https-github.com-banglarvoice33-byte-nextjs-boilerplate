/*
# Article Enhancements for SEO and Newsletter

## 1. Modified Tables
- `articles` — added SEO metadata and excerpt column
  - `excerpt` (text) — short excerpt for SEO
  - `seo_meta_title` (text) — custom meta title
  - `seo_meta_description` (text) — custom meta description
  - `seo_keywords` (text[]) — array of SEO keywords
  - `updated_at` (timestamptz) — last update timestamp

## 2. New Tables
- `newsletter_subscribers` — already created in separate migration

## 3. Security
- Maintain existing RLS policies
- No changes to existing auth flow
*/

ALTER TABLE articles ADD COLUMN IF NOT EXISTS excerpt text;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS seo_meta_title text;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS seo_meta_description text;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS seo_keywords text[] DEFAULT '{}';
ALTER TABLE articles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_articles_seo_keywords ON articles USING gin(seo_keywords);
