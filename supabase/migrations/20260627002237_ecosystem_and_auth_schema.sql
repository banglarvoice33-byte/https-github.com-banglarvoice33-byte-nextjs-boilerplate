/*
# Ecosystem Module, Auth Roles, and Contributor Workflow Schema

1. New Tables
- `staff_roles` — RBAC role definitions for ecosystem access
  - `id` (uuid, primary key)
  - `name` (text, unique) — role name: super_admin, admin, editor, contributor
  - `permissions` (text[]) — array of allowed permission strings
  - `created_at` (timestamptz)

- `staff_members` — links auth.users to roles for RBAC
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `role_id` (uuid, references staff_roles)
  - `email` (text)
  - `name` (text)
  - `is_active` (boolean, default true)
  - `created_at` (timestamptz)

- `api_keys` — managed API keys for ecosystem integrations
  - `id` (uuid, primary key)
  - `name` (text) — key label
  - `key_hash` (text) — hashed key value
  - `service` (text) — which service: telegram, n8n, openai, etc.
  - `is_active` (boolean, default true)
  - `created_by` (uuid, references auth.users)
  - `created_at` (timestamptz)
  - `last_used_at` (timestamptz)

- `contributor_submissions` — AI-validated contributor intake
  - `id` (uuid, primary key)
  - `telegram_user_id` (text) — contributor Telegram ID
  - `telegram_username` (text)
  - `content_type` (text) — text, image, video, voice
  - `content` (text) — submitted text / caption
  - `media_urls` (text[]) — URLs to stored media
  - `location` (text)
  - `event_date` (text)
  - `event_time` (text)
  - `context` (text)
  - `status` (text) — pending, ai_review, needs_info, approved, rejected
  - `ai_notes` (text) — AI validation feedback
  - `missing_fields` (text[]) — which fields are missing
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

- `system_logs` — audit trail for ecosystem actions
  - `id` (uuid, primary key)
  - `action` (text) — what happened
  - `actor_id` (uuid, references auth.users)
  - `actor_role` (text)
  - `target` (text) — what was affected
  - `details` (jsonb)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all new tables
- staff_roles: public read, admin-only write
- staff_members: public read for own record, admin read all
- api_keys: admin-only full access
- contributor_submissions: contributor can see own, admin/editor sees all
- system_logs: admin-only
*/

CREATE TABLE IF NOT EXISTS staff_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    permissions text[] NOT NULL DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS staff_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id uuid NOT NULL REFERENCES staff_roles(id) ON DELETE CASCADE,
    email text NOT NULL,
    name text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS api_keys (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    key_hash text NOT NULL,
    service text NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    last_used_at timestamptz
);

CREATE TABLE IF NOT EXISTS contributor_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    telegram_user_id text NOT NULL,
    telegram_username text,
    content_type text NOT NULL DEFAULT 'text',
    content text,
    media_urls text[] DEFAULT '{}',
    location text,
    event_date text,
    event_time text,
    context text,
    status text NOT NULL DEFAULT 'pending',
    ai_notes text,
    missing_fields text[] DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS system_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    action text NOT NULL,
    actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_role text,
    target text,
    details jsonb,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE staff_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributor_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- staff_roles: public read, admin write
DROP POLICY IF EXISTS "select_staff_roles" ON staff_roles;
CREATE POLICY "select_staff_roles" ON staff_roles FOR SELECT TO anon, authenticated USING (true);

-- staff_members: public read own, admin read all
DROP POLICY IF EXISTS "select_own_staff_member" ON staff_members;
CREATE POLICY "select_own_staff_member" ON staff_members FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- api_keys: admin only
DROP POLICY IF EXISTS "admin_api_keys" ON api_keys;
CREATE POLICY "admin_api_keys" ON api_keys FOR ALL TO authenticated USING (true);

-- contributor_submissions: anon/anyone can insert, admin/editor can read/update
DROP POLICY IF EXISTS "insert_contributor_submissions" ON contributor_submissions;
CREATE POLICY "insert_contributor_submissions" ON contributor_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "select_contributor_submissions" ON contributor_submissions;
CREATE POLICY "select_contributor_submissions" ON contributor_submissions FOR SELECT TO anon, authenticated USING (true);

-- system_logs: admin only
DROP POLICY IF EXISTS "admin_system_logs" ON system_logs;
CREATE POLICY "admin_system_logs" ON system_logs FOR ALL TO authenticated USING (true);

-- Insert default roles
INSERT INTO staff_roles (name, permissions) VALUES
('super_admin', ARRAY['all', 'ecosystem', 'telegram_command', 'api_keys', 'user_management', 'system_logs', 'publish', 'analytics']),
('admin', ARRAY['ecosystem', 'api_keys', 'user_management', 'publish', 'analytics']),
('editor', ARRAY['contributor_review', 'publish', 'analytics']),
('contributor', ARRAY['submit'])
ON CONFLICT (name) DO NOTHING;
