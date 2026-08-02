import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { knowledgeRepository } from "@/features/knowledge/services/knowledge.repository";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArticleSidebar } from "@/components/knowledge/ArticleSidebar";
import { PodcastPlayer } from "@/components/knowledge/PodcastPlayer";
import { generateTechArticleJsonLd } from "@/lib/seo/metadata";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Bookmark, BookOpen, Cpu, Layers, GitFork } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: doc } = await knowledgeRepository.getBySlug(slug);
  if (!doc) return {};

  return {
    title: `${doc.title} | SMSAAD Knowledge Engine`,
    description: doc.description ?? "",
    openGraph: {
      title: doc.title,
      description: doc.description ?? "",
      images: doc.cover_image ? [doc.cover_image] : [],
    },
  };
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const { data: doc } = await knowledgeRepository.getBySlug(slug);

  if (!doc) {
    notFound();
  }

  // @ts-ignore – legacy jsonLd helper expects the old DocItem shape; safe to cast for now
  const jsonLd = generateTechArticleJsonLd(doc as any);

  // Prev / Next: fetch surrounding articles from the same category
  const { data: allDocs } = await knowledgeRepository.getAll({ limit: 100 });
  const currentIndex = (allDocs ?? []).findIndex((d) => d.slug === slug);
  const prevArticle = currentIndex > 0 ? allDocs![currentIndex - 1] : null;
  const nextArticle = currentIndex < (allDocs ?? []).length - 1 ? allDocs![currentIndex + 1] : null;

  return (
    <div className="py-10 bg-background min-h-screen text-foreground space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Knowledge", href: "/knowledge" },
            { label: category.replace("-", " "), href: `/knowledge` },
            { label: doc.title },
          ]}
        />

        {/* Back Link */}
        <div>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Knowledge</span>
          </Link>
        </div>

        {/* Main Document Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Document Main Content (3 Columns) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Metadata (Author, Read Time, Difficulty) */}
            <div className="border-b border-border pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="primary" className="capitalize text-sm py-1 px-3">
                  {(doc.category as { title?: string } | null)?.title ?? doc.type}
                </Badge>
                <Badge difficulty={(doc.difficulty ?? undefined) as "Beginner" | "Intermediate" | "Advanced" | "Expert" | undefined} className="text-sm py-1 px-3" />
                <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  {doc.reading_time ?? ""}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
                {doc.title}
              </h1>

              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {doc.description}
              </p>

              {/* Author & Date Card */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  {(doc.author as { avatar_url?: string } | null)?.avatar_url && (
                    <Image
                      src={(doc.author as { avatar_url: string }).avatar_url}
                      alt={(doc.author as { full_name?: string } | null)?.full_name ?? "Author"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border border-primary/50"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {(doc.author as { full_name?: string } | null)?.full_name ?? "SMSAAD Team"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Published: {doc.published_at ? new Date(doc.published_at).toLocaleDateString() : ""}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Podcast Audio Overview */}
            <PodcastPlayer
              title={doc.title}
              summary={doc.description}
              audioUrl={(doc as { audio_url?: string } | null)?.audio_url}
            />

            {/* Hero Cover Image */}
            {doc.cover_image && (
              <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-lg">
                <Image
                  src={doc.cover_image}
                  alt={doc.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {/* Body Content */}

            {/* Content Render */}
            {doc.body && (
              <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-accent">
                <div
                  className="space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: doc.body
                      .replace(/## (.*)/g, (_, title) => {
                        const id = title.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                        return `<h2 id="${id}" class="text-2xl font-bold text-foreground pt-6 border-t border-border mt-8 mb-4 scroll-mt-24">${title}</h2>`;
                      })
                      .replace(/### (.*)/g, (_, title) => {
                        const id = title.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                        return `<h3 id="${id}" class="text-xl font-semibold text-accent mt-6 mb-3 scroll-mt-24">${title}</h3>`;
                      })
                      .replace(/\n\n/g, '<p class="text-muted-foreground leading-relaxed text-base"></p>'),
                  }}
                />
              </div>
            )}

            {/* Code Snippet Demonstration */}
            <CodeBlock
              filename="latent_vector_math.py"
              language="python"
              code={`# First-Principles Vector Operation for ${doc.title}
import torch

def compute_cross_attention_weights(query: torch.Tensor, key: torch.Tensor) -> torch.Tensor:
    scores = torch.matmul(query, key.transpose(-2, -1)) / (query.size(-1) ** 0.5)
    return torch.softmax(scores, dim=-1)`}
            />

            {/* Knowledge Graph Connections Grid */}
            <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold uppercase tracking-wider">
                <GitFork className="h-4 w-4" />
                <span>Knowledge Graph Entity Connections</span>
              </div>
              <h3 className="text-xl font-extrabold text-foreground font-heading">
                Connected Systems &amp; Ecosystem Nodes
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="text-[10px] font-mono text-primary font-bold uppercase flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>Related Concepts</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li><Link href="/knowledge" className="hover:text-primary transition-colors">• Flux 1.1 Pro Architecture</Link></li>
                    <li><Link href="/knowledge" className="hover:text-primary transition-colors">• LoRA Weights Injection</Link></li>
                    <li><Link href="/knowledge" className="hover:text-primary transition-colors">• CFG Scale &amp; Noise Schedulers</Link></li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="text-[10px] font-mono text-accent font-bold uppercase flex items-center gap-1">
                    <Cpu className="h-3 w-3" />
                    <span>Related Tools</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li><Link href="/tools/runway-gen-3-alpha" className="hover:text-accent transition-colors">• Runway Gen-3 Alpha</Link></li>
                    <li><Link href="/tools" className="hover:text-accent transition-colors">• ComfyUI Node Engine</Link></li>
                    <li><Link href="/tools" className="hover:text-accent transition-colors">• DaVinci Resolve ACES</Link></li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    <span>Related Workflows</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li><Link href="/workflows" className="hover:text-emerald-400 transition-colors">• AI Commercial Pipeline</Link></li>
                    <li><Link href="/workflows" className="hover:text-emerald-400 transition-colors">• Camera Track Injections</Link></li>
                    <li><Link href="/workflows" className="hover:text-emerald-400 transition-colors">• 3D Gaussian Volume Plates</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Article Navigation (Previous / Next) */}
            <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  href={`/knowledge/${(prevArticle.category as { slug?: string } | null)?.slug ?? "general"}/${prevArticle.slug}`}
                  className="flex flex-col rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-card/80 transition-all text-left shadow-sm"
                >
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-mono">← Previous Spec</span>
                  <span className="text-sm font-semibold text-foreground line-clamp-1">{prevArticle.title}</span>
                </Link>
              ) : <div />}
              
              {nextArticle && (
                <Link
                  href={`/knowledge/${(nextArticle.category as { slug?: string } | null)?.slug ?? "general"}/${nextArticle.slug}`}
                  className="flex flex-col rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-card/80 transition-all text-right items-end shadow-sm"
                >
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-mono">Next Spec →</span>
                  <span className="text-sm font-semibold text-foreground line-clamp-1">{nextArticle.title}</span>
                </Link>
              )}
            </div>
          </div>

          {/* TOC & Actions Sidebar (1 Column) */}
          <div className="hidden lg:block lg:col-span-1">
            <ArticleSidebar
              articleId={doc.id}
              articleTitle={doc.title}
              articleSlug={doc.slug}
              categorySlug={(doc.category as { slug?: string } | null)?.slug ?? "general"}
              bodyMarkdown={doc.body}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
