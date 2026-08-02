import type { Metadata } from "next";
import Link from "next/link";
import { knowledgeRepository } from "@/features/knowledge/services/knowledge.repository";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Sparkles, TrendingUp, Clock, ArrowRight, Layers, Cpu, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base | SMSAAD",
  description: "Explore enterprise documentation on AI Filmmaking, Visual Effects, Latent Diffusion, and Creative Technology.",
};

const categories = [
  { name: "Artificial Intelligence", slug: "artificial-intelligence", count: "14 Articles", icon: Cpu, color: "text-primary bg-primary/10" },
  { name: "Visual Effects", slug: "visual-effects", count: "9 Articles", icon: Sparkles, color: "text-accent bg-accent/10" },
  { name: "Filmmaking", slug: "filmmaking", count: "11 Articles", icon: BookOpen, color: "text-purple-400 bg-purple-500/10" },
  { name: "Creative Technology", slug: "creative-technology", count: "7 Articles", icon: Layers, color: "text-emerald-400 bg-emerald-500/10" },
];

export default async function KnowledgeHubPage() {
  // Parallel fetches — each cached independently
  const [featuredResult, latestResult] = await Promise.all([
    knowledgeRepository.getFeatured(1),
    knowledgeRepository.getLatest(4),
  ]);

  const featuredDoc = featuredResult.data?.[0] ?? null;
  const latestDocs = latestResult.data ?? [];

  return (
    <div className="py-12 bg-background min-h-screen text-foreground space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb items={[{ label: "Knowledge Hub" }]} />

        {/* Page Header */}
        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4 glow-purple">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Knowledge Discovery Engine</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            Documentation &amp; First-Principles Theory
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Deep technical specifications, mathematical breakdowns, and production pipelines for AI creators and VFX artists.
          </p>
        </div>

        {/* 1. Featured Article */}
        {featuredDoc && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider font-mono">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Featured Technical Specification</span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-xl hover:border-primary/40 transition-all group">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="primary">
                  {(featuredDoc.category as { title?: string } | null)?.title ?? featuredDoc.type}
                </Badge>
                <Badge difficulty={(featuredDoc.difficulty ?? undefined) as "Beginner" | "Intermediate" | "Advanced" | "Expert" | undefined} />
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredDoc.reading_time ?? ""}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground font-heading group-hover:text-primary transition-colors">
                {featuredDoc.title}
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-3xl leading-relaxed">
                {featuredDoc.description}
              </p>
              <div className="mt-6">
                <Link
                  href={`/knowledge/${(featuredDoc.category as { slug?: string } | null)?.slug ?? "general"}/${featuredDoc.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 2. Categories Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-extrabold text-foreground font-heading">
              Browse Knowledge by Topic
            </h2>
            <span className="text-xs text-muted-foreground font-mono">Core Domains</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/knowledge`}
                  className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:bg-card/80 transition-all shadow-md"
                >
                  <div className={`p-3 rounded-xl w-fit ${cat.color} mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{cat.count}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Latest Knowledge Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-extrabold text-foreground font-heading flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Latest &amp; Trending Documentation</span>
            </h2>
          </div>

          {latestDocs.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
              <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-primary/50" />
              <p className="font-medium">No published articles yet.</p>
              <p className="text-sm mt-1">Add content through the Admin CMS to populate this section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestDocs.map((doc) => (
                <div key={doc.id} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-all flex flex-col justify-between shadow-md">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" className="text-xs capitalize">
                        {(doc.category as { title?: string } | null)?.title ?? doc.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">• {doc.reading_time}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-heading hover:text-primary transition-colors">
                      <Link href={`/knowledge/${(doc.category as { slug?: string } | null)?.slug ?? "general"}/${doc.slug}`}>
                        {doc.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {(doc.author as { full_name?: string } | null)?.full_name ?? "SMSAAD Team"}</span>
                    <Link
                      href={`/knowledge/${(doc.category as { slug?: string } | null)?.slug ?? "general"}/${doc.slug}`}
                      className="text-primary font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Explore Spec</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
