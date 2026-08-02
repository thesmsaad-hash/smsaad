import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { ContentCard } from "@/components/ui/ContentCard";

// Mock data for Latest News
const mockNews = [
  {
    id: "1",
    title: "OpenAI Releases New Diffusion Model Architecture",
    description: "A deep dive into the technical paper and what it means for the future of video generation.",
    slug: "openai-new-diffusion-model",
    category: "AI Models",
    readingTime: "5 min",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    title: "ComfyUI 2.0 Major Update Released",
    description: "The visual node editor receives a massive overhaul with native 3D Gaussian Splatting support.",
    slug: "comfyui-2-0-released",
    category: "Product Updates",
    readingTime: "3 min",
    lastUpdated: "Yesterday",
  },
  {
    id: "3",
    title: "The State of Virtual Production 2026",
    description: "Industry trends, hardware advancements, and the shift towards real-time cloud rendering.",
    slug: "state-of-virtual-production",
    category: "Industry News",
    readingTime: "8 min",
    lastUpdated: "3 days ago",
  }
];

export function LatestNews() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2 font-mono">
              <Newspaper className="h-4 w-4" />
              <span>Industry Updates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Latest News
            </h2>
          </div>
          <Link href="/news" className="text-sm font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 mt-4 md:mt-0 transition-colors">
            <span>View News Desk</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockNews.map((news) => (
            <ContentCard
              key={news.id}
              title={news.title}
              description={news.description}
              href={`/news/${news.slug}`}
              category={{ label: news.category }}
              readingTime={news.readingTime}
              lastUpdated={news.lastUpdated}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
