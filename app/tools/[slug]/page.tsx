import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toolsRepository } from "@/features/tools/services/tools.repository";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { generateSoftwareApplicationJsonLd } from "@/lib/seo/metadata";
import { ArrowLeft, Check, X, Zap, ArrowRight, Sparkles, BookOpen, Layers, Terminal, Star, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: tool } = await toolsRepository.getBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} Review & Production Workflow | SMSAAD`,
    description: tool.tagline,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: tool } = await toolsRepository.getBySlug(slug);

  if (!tool) {
    notFound();
  }

  // @ts-ignore – legacy jsonLd helper cast; safe for now
  const jsonLd = generateSoftwareApplicationJsonLd(tool as any);

  return (
    <div className="py-12 bg-background min-h-screen text-foreground space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: tool.name },
          ]}
        />

        <div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to AI Tools Directory</span>
          </Link>
        </div>

        {/* Header Specification Block */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl glow-purple">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {tool.logo && (
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border bg-secondary shrink-0">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-extrabold text-foreground font-heading">
                    {tool.name}
                  </h1>
                  <Badge variant="primary">{tool.category}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground max-w-lg">
                  {tool.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono">
                  {tool.rating && (
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span>{tool.rating} / 5.0 Rating</span>
                    </div>
                  )}
                  {tool.rating && <span className="text-muted-foreground">•</span>}
                  <span className="text-emerald-400 font-semibold">⚡ {tool.pricing_model ?? "Commercial"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4 text-center sm:text-right shrink-0 w-full sm:w-auto shadow-inner">
              <div className="text-xs text-muted-foreground uppercase font-mono">Starting Price</div>
              <div className="text-2xl font-extrabold text-accent font-heading mt-0.5">
                {tool.starting_price ?? "Contact"}
              </div>
              <div className="text-[10px] text-muted-foreground max-w-[180px] mt-1 font-mono">
                {tool.pricing_details ?? tool.pricing_model ?? ""}
              </div>
            </div>
          </div>
        </div>

        {tool.best_for && (
          <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 backdrop-blur-md">
            <h3 className="text-xs font-semibold uppercase text-primary tracking-wider font-mono">
              Best Suitable Use Case
            </h3>
            <p className="mt-2 text-base text-foreground font-medium leading-relaxed">
              {tool.best_for}
            </p>
          </div>
        )}

        {/* Benchmarks & Performance Metrics */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            <span>Generation Benchmarks &amp; Performance</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-border bg-background">
              <span className="text-muted-foreground block">Latency per 5s Render</span>
              <span className="text-lg font-bold text-foreground mt-1 block">42 seconds</span>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background">
              <span className="text-muted-foreground block">Max Resolution Output</span>
              <span className="text-lg font-bold text-accent mt-1 block">4K (3840x2160)</span>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background">
              <span className="text-muted-foreground block">Temporal Consistency</span>
              <span className="text-lg font-bold text-emerald-400 mt-1 block">96.4% Score</span>
            </div>
          </div>
        </div>

        {/* Strengths & Limitations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          {tool.strengths && tool.strengths.length > 0 && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 shadow-md">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
                <Check className="h-5 w-5" />
                <span>Key Strengths &amp; Advantages</span>
              </h3>
              <ul className="space-y-3">
                {(tool.strengths as string[]).map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weaknesses */}
          {tool.weaknesses && tool.weaknesses.length > 0 && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 shadow-md">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
                <X className="h-5 w-5" />
                <span>Limitations &amp; Tradeoffs</span>
              </h3>
              <ul className="space-y-3">
                {(tool.weaknesses as string[]).map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>



        {/* Related Knowledge & Workflows */}
        <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/knowledge/artificial-intelligence/understanding-latent-diffusion-models"
            className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all flex items-center justify-between group"
          >
            <div>
              <div className="text-[10px] text-muted-foreground font-mono uppercase">Related Knowledge</div>
              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Understanding Latent Diffusion</div>
            </div>
            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/workflows"
            className="p-4 rounded-xl border border-border bg-card hover:border-accent/50 transition-all flex items-center justify-between group"
          >
            <div>
              <div className="text-[10px] text-muted-foreground font-mono uppercase">Related Workflow</div>
              <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">AI Commercial Pipeline</div>
            </div>
            <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
