import { unstable_cache } from "next/cache";
import { BaseRepository, PaginationOptions, RepositoryResult } from "@/features/shared/services/base.repository";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  logo: string | null;
  category: string | null;
  pricing_model: string | null;
  starting_price: string | null;
  pricing_details: string | null;
  rating: string | null;
  rating_count: string | null;
  os: string[] | null;
  interface_type: string | null;
  best_for: string | null;
  strengths: string[] | null;
  weaknesses: string[] | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Repository
// ---------------------------------------------------------------------------

class ToolsRepositoryClass extends BaseRepository {
  protected readonly cacheTag = "tools";
  protected readonly revalidate = 43200; // 12 hours

  private readonly SELECT = `
    id, slug, name, tagline, logo, category,
    pricing_model, starting_price, pricing_details,
    rating, rating_count, os, interface_type, best_for,
    strengths, weaknesses, is_featured, created_at, updated_at
  `;

  // --------------------------------------------------------------------------
  // getAll
  // --------------------------------------------------------------------------
  getAll = unstable_cache(
    async (opts: PaginationOptions = {}): Promise<RepositoryResult<Tool[]>> => {
      try {
        const supabase = await this.getClient();
        const [from, to] = this.getRange(opts.page, opts.limit ?? 20);

        const { data, error, count } = await supabase
          .from("tools")
          .select(this.SELECT, { count: "exact" })
          .order("rating", { ascending: false })
          .range(from, to);

        if (error) return this.fail(error.message);
        return this.ok(data as Tool[], count ?? undefined);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["tools_all"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // getBySlug
  // --------------------------------------------------------------------------
  async getBySlug(slug: string): Promise<RepositoryResult<Tool>> {
    return unstable_cache<() => Promise<RepositoryResult<Tool>>>(
      async () => {
        try {
          const supabase = await this.getClient();

          const { data, error } = await supabase
            .from("tools")
            .select(this.SELECT)
            .eq("slug", slug)
            .maybeSingle();

          if (error) return this.fail(error.message);
          if (!data) return this.ok(null as unknown as Tool);
          return this.ok(data as Tool);
        } catch (e) {
          return this.fail(e);
        }
      },
      ["tools_slug", slug],
      { revalidate: this.revalidate, tags: [this.cacheTag, `tool_${slug}`] }
    )();
  }

  // --------------------------------------------------------------------------
  // getFeatured
  // --------------------------------------------------------------------------
  getFeatured = unstable_cache(
    async (limit = 4): Promise<RepositoryResult<Tool[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("tools")
          .select(this.SELECT)
          .eq("is_featured", true)
          .order("rating", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as Tool[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["tools_featured"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // getLatest
  // --------------------------------------------------------------------------
  getLatest = unstable_cache(
    async (limit = 4): Promise<RepositoryResult<Tool[]>> => {
      try {
        const supabase = await this.getClient();

        const { data, error } = await supabase
          .from("tools")
          .select(this.SELECT)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) return this.fail(error.message);
        return this.ok(data as Tool[]);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["tools_latest"],
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
          .from("tools")
          .select("*", { count: "exact", head: true });

        if (error) return this.fail(error.message);
        return this.ok(count ?? 0);
      } catch (e) {
        return this.fail(e);
      }
    },
    ["tools_count"],
    { revalidate: this.revalidate, tags: [this.cacheTag] }
  );

  // --------------------------------------------------------------------------
  // search
  // --------------------------------------------------------------------------
  async search(query: string, limit = 5): Promise<RepositoryResult<Tool[]>> {
    try {
      const supabase = await this.getClient();
      const q = `%${query}%`;

      const { data, error } = await supabase
        .from("tools")
        .select(this.SELECT)
        .or(`name.ilike.${q},tagline.ilike.${q},category.ilike.${q}`)
        .limit(limit);

      if (error) return this.fail(error.message);
      return this.ok(data as Tool[]);
    } catch (e) {
      return this.fail(e);
    }
  }
}

export const toolsRepository = new ToolsRepositoryClass();
