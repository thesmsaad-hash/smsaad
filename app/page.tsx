import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { TrendingKnowledge } from "@/components/home/TrendingKnowledge";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { ToolLibrarySection } from "@/components/home/ToolLibrarySection";
import { WorkflowOfTheWeek } from "@/components/home/WorkflowOfTheWeek";
import { WorkflowLibrary } from "@/components/home/WorkflowLibrary";
import { GlossarySection } from "@/components/home/GlossarySection";
import { LatestNews } from "@/components/home/LatestNews";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { knowledgeRepository } from "@/features/knowledge/services/knowledge.repository";
import { toolsRepository } from "@/features/tools/services/tools.repository";

export default async function HomePage() {
  // All sections fetched in parallel — each cached independently
  const [trendingResult, featuredToolsResult] = await Promise.all([
    knowledgeRepository.getTrending(6),
    toolsRepository.getFeatured(4),
  ]);

  const trendingDocs = trendingResult.data ?? [];
  const featuredTools = featuredToolsResult.data ?? [];

  return (
    <div>
      <Hero />
      <FeaturedCollections />
      <TrendingKnowledge docs={trendingDocs} />
      <CategoriesGrid />
      <ToolLibrarySection tools={featuredTools} />
      <WorkflowOfTheWeek />
      <WorkflowLibrary />
      <GlossarySection />
      <LatestNews />
      <NewsletterSection />
    </div>
  );
}
