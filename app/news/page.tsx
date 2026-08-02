import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Newspaper, Sparkles, Cpu, BookOpen, ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Industry News & Updates | SMSAAD",
  description: "Stay informed with latest AI model announcements, research papers, VFX industry updates, and open-source releases.",
};

export default function NewsPage() {
  const newsCategories = [
    { name: "Latest News", count: "18 Articles" },
    { name: "AI Models", count: "12 Releases" },
    { name: "Industry", count: "9 Reports" },
    { name: "Research", count: "15 Papers" },
    { name: "Open Source", count: "11 Repos" },
  ];

  const articles = [
    {
      title: "OpenAI Releases Sora v2 API for Video Production Pipelines",
      category: "AI Models",
      date: "August 1, 2026",
      snippet: "New developer endpoints allow granular optical flow injection, first-frame conditioning, and multi-angle shot consistency.",
      readTime: "4 min read",
    },
    {
      title: "ComfyUI v4.0 Introduces Realtime WebGPU Node Execution",
      category: "Open Source",
      date: "July 28, 2026",
      snippet: "Browser-native node math execution reduces latency for local AI preview monitoring down to sub-50ms.",
      readTime: "6 min read",
    },
    {
      title: "SIGGRAPH 2026: 3D Gaussian Splatting Replaces Traditional Photogrammetry",
      category: "Research",
      date: "July 24, 2026",
      snippet: "Major visual effects studios showcase volume capture pipelines powered by real-time Gaussian splats for LED virtual stages.",
      readTime: "8 min read",
    },
  ];

  return (
    <div className="py-12 bg-background min-h-screen text-foreground space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb items={[{ label: "News & Updates" }]} />

        {/* Page Header */}
        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4 glow-purple">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Platform Newsroom</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            AI Models, Research &amp; Industry Updates
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Curated developments in generative cinema, machine learning papers, software updates, and visual effects breakthroughs.
          </p>
        </div>

        {/* News Categories Filter Ribbon */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar border-b border-border">
          {newsCategories.map((cat, i) => (
            <button
              key={cat.name}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                i === 0
                  ? "bg-primary text-white shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <span>{cat.name}</span>
              <span className="ml-2 opacity-60 font-mono">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md group"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-3">
                  <Badge variant="primary" className="text-xs">{art.category}</Badge>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {art.date}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">• {art.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                  {art.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {art.snippet}
                </p>
              </div>
              <Link
                href="/knowledge/artificial-intelligence/understanding-latent-diffusion-models"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary hover:bg-secondary transition-all w-fit"
              >
                <span>Read Story</span>
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
