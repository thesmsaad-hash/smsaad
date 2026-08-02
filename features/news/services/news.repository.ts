import { unstable_cache } from "next/cache";
import { BaseRepository, PaginationOptions, RepositoryResult } from "@/features/shared/services/base.repository";
import type { KnowledgeArticle } from "@/features/knowledge/services/knowledge.repository";

export type NewsArticle = KnowledgeArticle & { type: "news" };

class NewsRepositoryClass extends BaseRepository {
  protected readonly cacheTag = "news";
  protected readonly revalidate = 300; // 5 minutes (freshest content)

  private readonly SELECT = `
    id, type, status, slug, title, description, body, cover_image,
    reading_time, difficulty, published_at, author_id, category_id,
    author:profiles(full_name, avatar_url),
    category:categories(title, slug),
    tags:content_tags(tag:tags(name))
  `;

  getAll = unstable_cache(
    async (opts: PaginationOptions = {}): Promise<RepositoryResult<NewsArticle[]>> => {
      try {
        const supabase = await this.getClient();
        const [from, to] = this.getRange(opts.page, opts.limit ?? 20);

        const { data, error, count } = await supabase
          .from("content")
          .select(this.SELECT, { count: "exact" })
          .eq("type", "news")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .range(from, to);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as NewsArticle[], count ?? undefined);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["news_all"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  async getBySlug(slug: string): Promise<RepositoryResult<NewsArticle>> {
    return unstable_cache<() => Promise<RepositoryResult<NewsArticle>>>(
      async () => {
        try {
          const supabase = await this.getClient();

          const { data, error } = await supabase
            .from("content")
            .select(this.SELECT)
            .eq("type", "news")
            .eq("slug", slug)
            .eq("status", "Published")
            .maybeSingle();

          if (error) return this.fail(error.message);
          if (!data) return this.ok(null as unknown as NewsArticle);
          return this.ok(data as unknown as NewsArticle);
        } catch (e) {
          return this.fail(e);
        }
      },
      ["news_slug", slug],
      { revalidate: this.revalidate, tags: [this.cacheTag, `news_${slug}`] }
    )();
  }

  getLatest = unstable_cache(
    async (limit = 5): Promise<RepositoryResult<NewsArticle[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("content")
          .select(this.SELECT)
          .eq("type", "news")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as NewsArticle[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["news_latest"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  getFeatured = this.getLatest;

  count = unstable_cache(
    async (): Promise<RepositoryResult<number>> => {
      try {
        const supabase = await this.getClient();
        const { count, error } = await supabase
          .from("content")
          .select("*", { count: "exact", head: true })
          .eq("type", "news")
          .eq("status", "Published");

        if (error) return this.fail(error.message);
        return this.ok(count ?? 0);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["news_count"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  async search(query: string, limit = 5): Promise<RepositoryResult<NewsArticle[]>> {
    try {
      const supabase = await this.getClient();

      const { data, error } = await supabase
        .from("content")
        .select(this.SELECT)
        .eq("type", "news")
        .eq("status", "Published")
        .textSearch("search_vector", query, { type: "websearch" })
        .limit(limit);

      if (error) return this.fail(error.message);
      return this.ok(data as unknown as NewsArticle[]);
    } catch (e) {
      return this.fail(e);
    }
  }
}

export const newsRepository = new NewsRepositoryClass();
