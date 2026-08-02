import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { ContentCard } from "@/components/ui/ContentCard";

// Mock data for Workflows
const mockWorkflows = [
  {
    id: "1",
    title: "AI Commercial Production Pipeline",
    description: "End-to-end workflow covering pre-visualization, generation, upscaling, and post-production.",
    slug: "ai-commercial-production",
    category: "Full Production",
    difficulty: "Advanced" as const,
    readingTime: "15 min",
  },
  {
    id: "2",
    title: "ComfyUI Portrait Enhancement",
    description: "A step-by-step breakdown of using IP-Adapter and ControlNet for realistic portrait upscaling.",
    slug: "comfyui-portrait-enhancement",
    category: "Node Workflows",
    difficulty: "Intermediate" as const,
    readingTime: "10 min",
  }
];

export function WorkflowLibrary() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2 font-mono">
              <Layers className="h-4 w-4" />
              <span>Production Pipelines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Workflow Library
            </h2>
          </div>
          <Link href="/workflows" className="text-sm font-semibold text-accent hover:text-accent/80 flex items-center gap-1.5 mt-4 md:mt-0 transition-colors">
            <span>Explore Workflows</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockWorkflows.map((workflow) => (
            <ContentCard
              key={workflow.id}
              title={workflow.title}
              description={workflow.description}
              href={`/workflows/${workflow.slug}`}
              category={{ label: workflow.category }}
              difficulty={workflow.difficulty}
              readingTime={workflow.readingTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
