import { BaseRepository, RepositoryResult } from "@/features/shared/services/base.repository";
import type { Tool } from "@/features/tools/services/tools.repository";

// ---------------------------------------------------------------------------
// Shared result types
// ---------------------------------------------------------------------------

export interface ContentResult {
  id: string;
  type: string;
  slug: string;
  title: string;
  description: string | null;
  category: { title: string | null; slug: string | null } | null;
}

export interface ToolResult {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string | null;
}

export interface SearchGroup<T> {
  type: string;
  label: string;
  results: T[];
  count: number;
}

export interface GroupedSearchResults {
  knowledge: SearchGroup<ContentResult>;
  workflows: SearchGroup<ContentResult>;
  news: SearchGroup<ContentResult>;
  tools: SearchGroup<ToolResult>;
  total: number;
}


// ---------------------------------------------------------------------------
// Repository
// ---------------------------------------------------------------------------

class SearchRepositoryClass extends BaseRepository {
  protected readonly cacheTag = "search";
  protected readonly revalidate = 60; // 1 minute for search

  private readonly CONTENT_SELECT = `id, type, slug, title, description, category:categories(title, slug)`;
  private readonly TOOL_SELECT = `id, slug, name, tagline, category`;

  /**
   * searchGrouped – PostgreSQL full-text search across all content types,
   * returning results grouped by domain for easy command-palette rendering.
   */
  async searchGrouped(query: string, limitPerGroup = 5): Promise<RepositoryResult<GroupedSearchResults>> {
    if (!query.trim()) {
      const empty = this.buildEmpty();
      return this.ok(empty);
    }

    try {
      const supabase = await this.getClient();

      // Run content search and tools search in parallel
      const [contentResult, toolsResult] = await Promise.all([
        supabase
          .from("content")
          .select(this.CONTENT_SELECT)
          .eq("status", "Published")
          .textSearch("search_vector", query, { type: "websearch" })
          .limit(limitPerGroup * 3), // Fetch more, then group client-side
        supabase
          .from("tools")
          .select(this.TOOL_SELECT)
          .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`)
          .limit(limitPerGroup),
      ]);

      if (contentResult.error) return this.fail(contentResult.error.message);
      if (toolsResult.error) return this.fail(toolsResult.error.message);

      const allContent = (contentResult.data ?? []) as unknown as Array<{
        id: string;
        type: string;
        slug: string;
        title: string;
        description: string | null;
        category: { title: string | null; slug: string | null } | null;
      }>;
      const allTools = (toolsResult.data ?? []) as Tool[];

      // Group content by type
      const knowledge = allContent.filter((c) => c.type === "knowledge").slice(0, limitPerGroup);
      const workflows = allContent.filter((c) => c.type === "workflow").slice(0, limitPerGroup);
      const news = allContent.filter((c) => c.type === "news").slice(0, limitPerGroup);

      const grouped: GroupedSearchResults = {
        knowledge: {
          type: "knowledge",
          label: "Knowledge",
          results: knowledge,
          count: knowledge.length,
        },
        workflows: {
          type: "workflow",
          label: "Workflows",
          results: workflows,
          count: workflows.length,
        },
        news: {
          type: "news",
          label: "News",
          results: news,
          count: news.length,
        },
        tools: {
          type: "tool",
          label: "Tools",
          results: allTools.map((t) => ({
            id: t.id,
            slug: t.slug,
            name: t.name,
            tagline: t.tagline,
            category: t.category,
          })),
          count: allTools.length,
        },
        total: knowledge.length + workflows.length + news.length + allTools.length,
      };

      return this.ok(grouped);
    } catch (e) {
      return this.fail(e);
    }
  }

  private buildEmpty(): GroupedSearchResults {
    return {
      knowledge: { type: "knowledge", label: "Knowledge", results: [], count: 0 },
      workflows: { type: "workflow", label: "Workflows", results: [], count: 0 },
      news: { type: "news", label: "News", results: [], count: 0 },
      tools: { type: "tool", label: "Tools", results: [], count: 0 },
      total: 0,
    };
  }
}

export const searchRepository = new SearchRepositoryClass();
