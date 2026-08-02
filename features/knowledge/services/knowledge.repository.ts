import { unstable_cache } from "next/cache";
import { BaseRepository, PaginationOptions, RepositoryResult } from "@/features/shared/services/base.repository";

// ---------------------------------------------------------------------------
// Shared types mirrored from the DB schema
// ---------------------------------------------------------------------------

export interface KnowledgeArticle {
  id: string;
  type: string;
  status: string;
  slug: string;
  title: string;
  description: string | null;
  body: string | null;
  cover_image: string | null;
  reading_time: string | null;
  difficulty: string | null;
  published_at: string | null;
  author_id: string | null;
  category_id: string | null;
  author?: { full_name: string | null; avatar_url: string | null } | null;
  category?: { title: string | null; slug: string | null } | null;
  tags?: { name: string }[];
}

// ---------------------------------------------------------------------------
// Repository
// ---------------------------------------------------------------------------

class KnowledgeRepositoryClass extends BaseRepository {
  protected readonly cacheTag = "knowledge";
  protected readonly revalidate = 3600; // 1 hour

  private readonly SELECT = `
    id, type, status, slug, title, description, body, cover_image,
    reading_time, difficulty, published_at, author_id, category_id,
    author:profiles(full_name, avatar_url),
    category:categories(title, slug),
    tags:content_tags(tag:tags(name))
  `;

  // --------------------------------------------------------------------------
  // getAll – paginated list of published knowledge articles
  // --------------------------------------------------------------------------
  getAll = unstable_cache(
    async (opts: PaginationOptions = {}): Promise<RepositoryResult<KnowledgeArticle[]>> => {
      try {
        const supabase = await this.getClient();
        const [from, to] = this.getRange(opts.page, opts.limit ?? 20);

        const { data, error, count } = await supabase
          .from("content")
          .select(this.SELECT, { count: "exact" })
          .eq("type", "knowledge")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .range(from, to);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as KnowledgeArticle[], count ?? undefined);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["knowledge_all"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // getBySlug – single article for detail page
  // --------------------------------------------------------------------------
  async getBySlug(slug: string): Promise<RepositoryResult<KnowledgeArticle>> {
    return unstable_cache<() => Promise<RepositoryResult<KnowledgeArticle>>>(
      async () => {
        try {
          const supabase = await this.getClient();

          const { data, error } = await supabase
            .from("content")
            .select(this.SELECT)
            .eq("type", "knowledge")
            .eq("slug", slug)
            .eq("status", "Published")
            .maybeSingle();

          if (error) return this.fail(error.message);
          if (!data) return this.ok(null as unknown as KnowledgeArticle);
          return this.ok(data as unknown as KnowledgeArticle);
        } catch (e) {
          return this.fail(e);
        }
      },
      ["knowledge_slug", slug],
      { revalidate: this.revalidate, tags: [this.cacheTag, `knowledge_${slug}`] }
    )();
  }

  // --------------------------------------------------------------------------
  // getFeatured – isFeatured flag or first N published
  // --------------------------------------------------------------------------
  getFeatured = unstable_cache(
    async (limit = 3): Promise<RepositoryResult<KnowledgeArticle[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("content")
          .select(this.SELECT)
          .eq("type", "knowledge")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as KnowledgeArticle[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["knowledge_featured"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // getTrending – same as featured for now, can use popularity_score later
  // --------------------------------------------------------------------------
  getTrending = unstable_cache(
    async (limit = 6): Promise<RepositoryResult<KnowledgeArticle[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("content")
          .select(this.SELECT)
          .eq("type", "knowledge")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as KnowledgeArticle[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["knowledge_trending"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // getLatest – chronological
  // --------------------------------------------------------------------------
  getLatest = unstable_cache(
    async (limit = 4): Promise<RepositoryResult<KnowledgeArticle[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("content")
          .select(this.SELECT)
          .eq("type", "knowledge")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as KnowledgeArticle[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["knowledge_latest"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // count
  // --------------------------------------------------------------------------
  count = unstable_cache(
    async (): Promise<RepositoryResult<number>> => {
      try {
        const supabase = await this.getClient();
        const { count, error } = await supabase
          .from("content")
          .select("*", { count: "exact", head: true })
          .eq("type", "knowledge")
          .eq("status", "Published");

        if (error) return this.fail(error.message);
        return this.ok(count ?? 0);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["knowledge_count"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // search – delegates to search.repository, kept here for convenience
  // --------------------------------------------------------------------------
  async search(query: string, limit = 10): Promise<RepositoryResult<KnowledgeArticle[]>> {
    try {
      const supabase = await this.getClient();

      const { data, error } = await supabase
        .from("content")
        .select(this.SELECT)
        .eq("type", "knowledge")
        .eq("status", "Published")
        .textSearch("search_vector", query, { type: "websearch" })
        .limit(limit);

      if (error) return this.fail(error.message);
      return this.ok(data as unknown as KnowledgeArticle[]);
    } catch (e) {
      return this.fail(e);
    }
  }
}

export const knowledgeRepository = new KnowledgeRepositoryClass();
