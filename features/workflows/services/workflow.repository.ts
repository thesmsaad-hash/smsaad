import { unstable_cache } from "next/cache";
import { BaseRepository, PaginationOptions, RepositoryResult } from "@/features/shared/services/base.repository";
import type { KnowledgeArticle } from "@/features/knowledge/services/knowledge.repository";

// Workflows reuse the same unified content shape — type is 'workflow'
export type Workflow = Omit<KnowledgeArticle, "type"> & { type: "workflow" };


class WorkflowRepositoryClass extends BaseRepository {
  protected readonly cacheTag = "workflows";
  protected readonly revalidate = 1800; // 30 minutes

  private readonly SELECT = `
    id, type, status, slug, title, description, body, cover_image,
    reading_time, difficulty, published_at, author_id, category_id,
    author:profiles(full_name, avatar_url),
    category:categories(title, slug),
    tags:content_tags(tag:tags(name))
  `;

  getAll = unstable_cache(
    async (opts: PaginationOptions = {}): Promise<RepositoryResult<Workflow[]>> => {
      try {
        const supabase = await this.getClient();
        const [from, to] = this.getRange(opts.page, opts.limit ?? 20);

        const { data, error, count } = await supabase
          .from("content")
          .select(this.SELECT, { count: "exact" })
          .eq("type", "workflow")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .range(from, to);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as Workflow[], count ?? undefined);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["workflows_all"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  async getBySlug(slug: string): Promise<RepositoryResult<Workflow>> {
    return unstable_cache<() => Promise<RepositoryResult<Workflow>>>(
      async () => {
        try {
          const supabase = await this.getClient();

          const { data, error } = await supabase
            .from("content")
            .select(this.SELECT)
            .eq("type", "workflow")
            .eq("slug", slug)
            .eq("status", "Published")
            .maybeSingle();

          if (error) return this.fail(error.message);
          if (!data) return this.ok(null as unknown as Workflow);
          return this.ok(data as unknown as Workflow);
        } catch (e) {
          return this.fail(e);
        }
      },
      ["workflows_slug", slug],
      { revalidate: this.revalidate, tags: [this.cacheTag, `workflow_${slug}`] }
    )();
  }

  getFeatured = unstable_cache(
    async (limit = 3): Promise<RepositoryResult<Workflow[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("content")
          .select(this.SELECT)
          .eq("type", "workflow")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as Workflow[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["workflows_featured"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // Workflow of the week = most recently published
  getWorkflowOfWeek = unstable_cache(
    async (): Promise<RepositoryResult<Workflow>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("content")
          .select(this.SELECT)
          .eq("type", "workflow")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .limit(1)
          .single();

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as Workflow);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["workflows_week"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  getLatest = unstable_cache(
    async (limit = 4): Promise<RepositoryResult<Workflow[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("content")
          .select(this.SELECT)
          .eq("type", "workflow")
          .eq("status", "Published")
          .order("published_at", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as unknown as Workflow[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["workflows_latest"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  count = unstable_cache(
    async (): Promise<RepositoryResult<number>> => {
      try {
        const supabase = await this.getClient();
        const { count, error } = await supabase
          .from("content")
          .select("*", { count: "exact", head: true })
          .eq("type", "workflow")
          .eq("status", "Published");

        if (error) return this.fail(error.message);
        return this.ok(count ?? 0);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["workflows_count"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  async search(query: string, limit = 5): Promise<RepositoryResult<Workflow[]>> {
    try {
      const supabase = await this.getClient();

      const { data, error } = await supabase
        .from("content")
        .select(this.SELECT)
        .eq("type", "workflow")
        .eq("status", "Published")
        .textSearch("search_vector", query, { type: "websearch" })
        .limit(limit);

      if (error) return this.fail(error.message);
      return this.ok(data as unknown as Workflow[]);
    } catch (e) {
      return this.fail(e);
    }
  }
}

export const workflowRepository = new WorkflowRepositoryClass();
