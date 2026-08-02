import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Cpu, Sparkles, Layers, Terminal, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning Center | SMSAAD",
  description: "Curated learning paths for AI Filmmaking, Visual Effects, Video Generation, and Creative Technology.",
};

export default function LearningCenterPage() {
  const learningPaths = [
    {
      title: "AI Foundations & Latent Theory",
      slug: "ai-foundations",
      description: "First-principles deep dive into UNet architectures, noise schedulers, latent spaces, and cross-attention mechanics.",
      icon: Cpu,
      stats: { articles: 12, tools: 6, workflows: 3 },
      badge: "Theoretical Base",
    },
    {
      title: "AI Video Generation & Diffusion",
      slug: "video-generation",
      description: "Controlling temporal consistency, optical flow, motion buckets, camera controls, and frame interpolation.",
      icon: Sparkles,
      stats: { articles: 10, tools: 4, workflows: 5 },
      badge: "Generative Cinema",
    },
    {
      title: "Visual Effects & NeRF Math",
      slug: "visual-effects",
      description: "Combining 3D Gaussian Splatting, neural radiance fields, matchmoving, camera tracking, and LED volume plates.",
      icon: Layers,
      stats: { articles: 14, tools: 8, workflows: 6 },
      badge: "VFX Pipeline",
    },
    {
      title: "Creative Technology & ComfyUI",
      slug: "creative-technology",
      description: "Mastering node graphs, custom python extensions, TensorRT acceleration, and hardware optimizations.",
      icon: Terminal,
      stats: { articles: 8, tools: 5, workflows: 4 },
      badge: "Node Architectures",
    },
    {
      title: "Prompt Engineering & Lighting Physics",
      slug: "prompt-engineering",
      description: "Controlling kelvin color temperatures, volumetrics, Rembrandt lighting, and shadow density in latent space.",
      icon: BookOpen,
      stats: { articles: 15, tools: 3, workflows: 2 },
      badge: "Aesthetic Control",
    },
  ];

  return (
    <div className="py-12 bg-background min-h-screen text-foreground space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb items={[{ label: "Learning Center" }]} />

        {/* Page Header */}
        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4 glow-purple">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Curated Track Curriculum</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            Learning Paths for Creative Engineers
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Structured educational tracks designed to take you from foundational mathematics to high-end virtual production workflows.
          </p>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {learningPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.slug}
                className="rounded-2xl border border-border bg-card p-8 hover:border-primary/40 transition-all flex flex-col justify-between shadow-xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="primary">{path.badge}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span>{path.stats.articles} Articles</span>
                    <span>•</span>
                    <span>{path.stats.tools} Tools</span>
                    <span>•</span>
                    <span>{path.stats.workflows} Workflows</span>
                  </div>
                  <Link
                    href={`/knowledge/artificial-intelligence/understanding-latent-diffusion-models`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Start Track</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
