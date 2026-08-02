import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Layers, ArrowRight, Clock, Sparkles, CheckCircle2 } from "lucide-react";

export function WorkflowOfTheWeek() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2 font-mono">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Curated Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Workflow of the Week
            </h2>
          </div>
          <Link href="/workflows" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1.5 mt-4 md:mt-0">
            <span>Explore All Workflows</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-primary/40 bg-card p-8 sm:p-10 shadow-2xl glow-purple relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">AI Commercials</Badge>
                <Badge difficulty="Intermediate" />
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  2h 30m Pipeline
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-foreground font-heading leading-snug">
                AI Commercial Production &amp; Optical Flow Motion Control
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Step-by-step studio workflow combining ChatGPT shot breakdowns, Midjourney v6 keyframe locks, Runway Gen-3 camera control passes, and DaVinci Resolve ACES color grading.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-muted-foreground">Required Tools:</span>
                {["Runway Gen-3", "ComfyUI", "Premiere Pro", "DaVinci Resolve"].map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs rounded-lg border border-border bg-background text-foreground font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col justify-center gap-3 w-full lg:w-auto">
              <Link
                href="/workflows"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
              >
                <span>Launch Interactive Pipeline</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
