-- ==============================================================================
-- 1. TRIGGERS: AUTOMATED TIMESTAMPS
-- ==============================================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all relevant tables
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.handle_updated_at();
create trigger set_content_updated_at before update on public.content for each row execute function public.handle_updated_at();
create trigger set_tools_updated_at before update on public.tools for each row execute function public.handle_updated_at();
create trigger set_collections_updated_at before update on public.collections for each row execute function public.handle_updated_at();
create trigger set_settings_updated_at before update on public.settings for each row execute function public.handle_updated_at();


-- ==============================================================================
-- 2. TRIGGERS: FULL-TEXT SEARCH VECTOR AUTOMATION
-- ==============================================================================
create or replace function public.content_search_vector_update()
returns trigger as $$
begin
  new.search_vector = 
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.body, '')), 'C');
  return new;
end;
$$ language plpgsql;

create trigger content_search_vector_trigger
before insert or update of title, description, body
on public.content
for each row
execute function public.content_search_vector_update();


-- ==============================================================================
-- 3. TRIGGERS: SLUG HISTORY & 301 REDIRECTS
-- ==============================================================================
create or replace function public.handle_content_slug_change()
returns trigger as $$
begin
  if old.slug is distinct from new.slug then
    insert into public.slug_history (content_id, old_slug, new_slug)
    values (old.id, old.slug, new.slug);
  end if;
  return new;
end;
$$ language plpgsql;

create trigger content_slug_change_trigger
after update of slug
on public.content
for each row
execute function public.handle_content_slug_change();


-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.content enable row level security;
alter table public.content_tags enable row level security;
alter table public.slug_history enable row level security;
alter table public.content_versions enable row level security;
alter table public.tools enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;
alter table public.media enable row level security;
alter table public.bookmarks enable row level security;
alter table public.reading_history enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.settings enable row level security;

-- Role Check Helpers
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

create or replace function public.is_editor_or_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
end;
$$ language plpgsql security definer;

-- ==============================================================================
-- Profiles RLS
-- ==============================================================================
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can update all profiles" on public.profiles for update using (public.is_admin());

-- Profile creation on Auth sign up trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ==============================================================================
-- Content RLS (Knowledge, Workflows, News)
-- ==============================================================================
create policy "Published content is viewable by everyone" 
on public.content for select 
using (status = 'Published'::content_status);

create policy "Editors and Admins can view all content" 
on public.content for select 
using (public.is_editor_or_admin());

create policy "Editors and Admins can insert content" 
on public.content for insert 
with check (public.is_editor_or_admin());

create policy "Editors and Admins can update content" 
on public.content for update 
using (public.is_editor_or_admin());

create policy "Admins can delete content" 
on public.content for delete 
using (public.is_admin());


-- ==============================================================================
-- Taxonomy, Tools, Collections RLS
-- ==============================================================================
create policy "Taxonomy is viewable by everyone" on public.categories for select using (true);
create policy "Tags are viewable by everyone" on public.tags for select using (true);
create policy "Tools are viewable by everyone" on public.tools for select using (true);
create policy "Collections are viewable by everyone" on public.collections for select using (true);
create policy "Collection Items are viewable by everyone" on public.collection_items for select using (true);
create policy "Content Tags are viewable by everyone" on public.content_tags for select using (true);
create policy "Slug History is viewable by everyone" on public.slug_history for select using (true);

-- Editors/Admins manage taxonomy & tools
create policy "Editors and Admins manage taxonomy" on public.categories for all using (public.is_editor_or_admin());
create policy "Editors and Admins manage tags" on public.tags for all using (public.is_editor_or_admin());
create policy "Editors and Admins manage tools" on public.tools for all using (public.is_editor_or_admin());
create policy "Editors and Admins manage collections" on public.collections for all using (public.is_editor_or_admin());
create policy "Editors and Admins manage collection_items" on public.collection_items for all using (public.is_editor_or_admin());
create policy "Editors and Admins manage content_tags" on public.content_tags for all using (public.is_editor_or_admin());
create policy "Editors and Admins manage slug_history" on public.slug_history for all using (public.is_editor_or_admin());

-- ==============================================================================
-- User Private Data (Bookmarks, Reading History)
-- ==============================================================================
create policy "Users can manage own bookmarks" on public.bookmarks for all using (auth.uid() = user_id);
create policy "Users can manage own reading history" on public.reading_history for all using (auth.uid() = user_id);

-- ==============================================================================
-- System (Newsletters, Messages, Settings, Audit Logs)
-- ==============================================================================
create policy "Anyone can subscribe to newsletter" on public.newsletter_subscribers for insert with check (true);
create policy "Admins can manage newsletter" on public.newsletter_subscribers for all using (public.is_admin());

create policy "Anyone can send a contact message" on public.contact_messages for insert with check (true);
create policy "Admins can manage contact messages" on public.contact_messages for all using (public.is_admin());

create policy "Users can view own notifications" on public.notifications for select using (true); -- Implement proper logic later
create policy "Admins can manage settings" on public.settings for all using (public.is_admin());
create policy "Settings are readable by everyone" on public.settings for select using (true);

create policy "Admins can view audit logs" on public.audit_logs for select using (public.is_admin());
create policy "System can insert audit logs" on public.audit_logs for insert with check (true); -- Usually restricted to DB triggers or edge functions
