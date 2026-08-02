import type { MetadataRoute } from "next";
import { knowledgeRepository } from "@/features/knowledge/services/knowledge.repository";
import { toolsRepository } from "@/features/tools/services/tools.repository";
import { workflowRepository } from "@/features/workflows/services/workflow.repository";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smsaad.com";

export const revalidate = 3600; // Re-generate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/knowledge",
    "/tools",
    "/workflows",
    "/news",
    "/newsletter",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  }));

  // Fetch live data in parallel
  const [knowledgeResult, toolsResult, workflowsResult] = await Promise.all([
    knowledgeRepository.getAll({ limit: 200 }),
    toolsRepository.getAll({ limit: 200 }),
    workflowRepository.getAll({ limit: 200 }),
  ]);

  const knowledgeRoutes: MetadataRoute.Sitemap = (knowledgeResult.data ?? []).map((doc) => ({
    url: `${SITE_URL}/knowledge/${(doc.category as { slug?: string } | null)?.slug ?? "general"}/${doc.slug}`,
    lastModified: doc.published_at ? new Date(doc.published_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const toolRoutes: MetadataRoute.Sitemap = (toolsResult.data ?? []).map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const workflowRoutes: MetadataRoute.Sitemap = (workflowsResult.data ?? []).map((wf) => ({
    url: `${SITE_URL}/workflows/${wf.slug}`,
    lastModified: wf.published_at ? new Date(wf.published_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...knowledgeRoutes, ...toolRoutes, ...workflowRoutes];
}
