-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 1. ENUMS
-- ==============================================================================
create type user_role as enum ('admin', 'editor', 'reader');
create type content_type as enum ('knowledge', 'workflow', 'news', 'glossary');
create type content_status as enum ('Draft', 'Review', 'Scheduled', 'Published', 'Archived');

-- ==============================================================================
-- 2. USERS & PROFILES
-- ==============================================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role user_role default 'reader'::user_role not null,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. TAXONOMY (Categories & Tags)
-- ==============================================================================
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text,
  icon_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.tags (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 4. UNIFIED CONTENT MODEL
-- ==============================================================================
create table public.content (
  id uuid default gen_random_uuid() primary key,
  type content_type not null,
  status content_status default 'Draft'::content_status not null,
  slug text unique not null,
  title text not null,
  description text,
  body text,
  cover_image text,
  reading_time text,
  difficulty text, -- e.g., 'Beginner', 'Intermediate', 'Advanced', 'Expert'
  
  -- Relations
  author_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone,
  scheduled_at timestamp with time zone,
  
  -- SEO Embedded
  canonical_url text,
  og_title text,
  og_description text,
  robots text default 'index, follow',
  json_schema jsonb,
  
  -- Search & Metadata
  search_vector tsvector
);

create index content_type_idx on public.content (type);
create index content_status_idx on public.content (status);
create index content_search_idx on public.content using gin(search_vector);

-- Content Tags Junction
create table public.content_tags (
  content_id uuid references public.content(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (content_id, tag_id)
);

-- Content Slug History Engine (Automated 301 Redirects)
create table public.slug_history (
  id uuid default gen_random_uuid() primary key,
  content_id uuid references public.content(id) on delete cascade not null,
  old_slug text not null,
  new_slug text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index slug_history_old_slug_idx on public.slug_history (old_slug);

-- Content Versions (Revision History)
create table public.content_versions (
  id uuid default gen_random_uuid() primary key,
  content_id uuid references public.content(id) on delete cascade not null,
  version_number integer not null,
  title text not null,
  description text,
  body text,
  editor_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 5. TOOLS DIRECTORY
-- ==============================================================================
create table public.tools (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  tagline text not null,
  logo text,
  category text,
  pricing_model text, -- 'Free', 'Freemium', 'Paid', 'Open Source'
  starting_price text,
  pricing_details text,
  rating text,
  rating_count text,
  os text[],
  interface_type text,
  best_for text,
  strengths jsonb default '[]'::jsonb,
  weaknesses jsonb default '[]'::jsonb,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Embedded SEO
  canonical_url text,
  og_title text,
  og_description text
);

-- ==============================================================================
-- 6. COLLECTIONS (Playlists)
-- ==============================================================================
create table public.collections (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text,
  cover_image text,
  category text,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.collection_items (
  collection_id uuid references public.collections(id) on delete cascade not null,
  item_type text not null, -- 'content', 'tool'
  item_id uuid not null, -- Can refer to content.id or tools.id
  position integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (collection_id, item_type, item_id)
);

-- ==============================================================================
-- 7. MEDIA LIBRARY
-- ==============================================================================
create table public.media (
  id uuid default gen_random_uuid() primary key,
  storage_path text unique not null,
  folder text default '/' not null,
  mime_type text not null,
  size integer not null,
  width integer,
  height integer,
  alt_text text,
  caption text,
  copyright text,
  dominant_color text,
  blurhash text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 8. USER ACTIVITY & INTERACTIONS
-- ==============================================================================
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_type text not null, -- 'content', 'tool', 'collection'
  item_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, item_type, item_id)
);

create table public.reading_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.content(id) on delete cascade not null,
  progress_percent integer default 0 check (progress_percent >= 0 and progress_percent <= 100),
  last_read_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, content_id)
);

-- ==============================================================================
-- 9. NOTIFICATIONS, CRM, & AUDIT
-- ==============================================================================
create table public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  status text default 'active' check (status in ('active', 'unsubscribed')),
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'replied')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  type text not null,
  title text not null,
  message text not null,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 10. SYSTEM SETTINGS
-- ==============================================================================
create table public.settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
