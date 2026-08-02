import { NextResponse } from "next/server";
import { searchRepository } from "@/features/search/services/search.repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (!q.trim()) {
    return NextResponse.json({ results: [], grouped: null, total: 0 });
  }

  const { data: grouped, error } = await searchRepository.searchGrouped(q, 5);

  if (error || !grouped) {
    return NextResponse.json({ results: [], grouped: null, total: 0, error });
  }

  // Also return a flat results array for backwards compatibility
  // with the existing command palette UI
  type FlatResult = {
    id: string;
    title: string;
    type: string;
    slug: string;
    category: string | null;
    snippet: string | null;
    url: string;
  };

  const results: FlatResult[] = [
    ...grouped.knowledge.results.map((r) => ({
      id: r.id,
      title: r.title,
      type: "knowledge",
      slug: r.slug,
      category: (r.category as { title?: string } | null)?.title ?? null,
      snippet: r.description ?? null,
      url: `/knowledge/${(r.category as { slug?: string } | null)?.slug ?? "general"}/${r.slug}`,
    })),
    ...grouped.workflows.results.map((r) => ({
      id: r.id,
      title: r.title,
      type: "workflow",
      slug: r.slug,
      category: (r.category as { title?: string } | null)?.title ?? null,
      snippet: r.description ?? null,
      url: `/workflows/${r.slug}`,
    })),
    ...grouped.news.results.map((r) => ({
      id: r.id,
      title: r.title,
      type: "news",
      slug: r.slug,
      category: (r.category as { title?: string } | null)?.title ?? null,
      snippet: r.description ?? null,
      url: `/news/${r.slug}`,
    })),
    ...grouped.tools.results.map((t) => ({
      id: t.id,
      title: (t as unknown as { name: string }).name,
      type: "tool",
      slug: t.slug,
      category: (t as { category?: string | null }).category ?? null,
      snippet: (t as unknown as { tagline: string }).tagline ?? null,
      url: `/tools/${t.slug}`,
    })),
  ];

  return NextResponse.json({ results, grouped, total: grouped.total });
}
