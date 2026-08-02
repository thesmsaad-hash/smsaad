"use client";

import * as React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Layers, Sparkles, Clock, ArrowRight, CheckCircle2, ChevronRight, Cpu, Film, Sliders, Play, Code } from "lucide-react";
import { clsx } from "clsx";

interface PipelineStep {
  id: string;
  name: string;
  tool: string;
  details: string;
}

const pipelineSteps: PipelineStep[] = [
  { id: "research", name: "1. Research", tool: "ChatGPT / Claude 3.5", details: "Extract concept parameters, lighting references, and visual style notes." },
  { id: "script", name: "2. Script", tool: "FDX / Notion", details: "Scene beat sheet breakdown with explicit prompt token annotations." },
  { id: "storyboard", name: "3. Storyboard", tool: "Midjourney v6", details: "Keyframe camera angles, lens specifications, and aspect ratio locks." },
  { id: "prompt", name: "4. Prompting", tool: "ComfyUI Node Math", details: "Kelvin temperature tuning, negative embedding vectors, and CFG scaling." },
  { id: "generation", name: "5. Generation", tool: "Runway Gen-3 / Luma Dream Machine", details: "High-resolution video synthesis with optical flow and motion bucket control." },
  { id: "compositing", name: "6. Compositing", tool: "Nuke / After Effects", details: "3D Gaussian Splat alignment, plate clean-up, and depth-map re-lighting." },
  { id: "editing", name: "7. Editing", tool: "Premiere Pro / DaVinci", details: "Pacing lock, sound design sync, and multi-track sequence assembly." },
  { id: "color", name: "8. Color", tool: "DaVinci Resolve", details: "Cinematic ACES color space transform, grain application, and LUT grading." },
  { id: "export", name: "9. Export", tool: "ProRes 4444 XQ", details: "Final master delivery rendering at 4K 10-bit color depth." },
];

const workflowCategories = [
  "All Pipelines",
  "AI Commercials",
  "AI Short Films",
  "VFX Pipeline",
  "Camera Tracking",
  "Color Grading",
  "Motion Graphics",
  "YouTube Production",
];

const workflowsList = [
  {
    id: "wf-1",
    title: "AI Commercial Production Pipeline",
    category: "AI Commercials",
    difficulty: "Intermediate" as const,
    stepsCount: 9,
    tools: ["Runway Gen-3", "ComfyUI", "Premiere Pro", "DaVinci"],
    estimatedTime: "2h 30m",
    updatedDate: "2 days ago",
    description: "End-to-end studio pipeline for generating high-conversion broadcast commercials with motion-matched camera passes.",
  },
  {
    id: "wf-2",
    title: "3D Gaussian Splatting to LED Volume Plate",
    category: "VFX Pipeline",
    difficulty: "Advanced" as const,
    stepsCount: 12,
    tools: ["Luma AI", "Unreal Engine 5", "Nuke", "Resolve"],
    estimatedTime: "5h 15m",
    updatedDate: "Yesterday",
    description: "Convert real-world drone scans into real-time parallax volume background plates for LED virtual production stages.",
  },
  {
    id: "wf-3",
    title: "AI Short Film Sci-Fi Sequence Assembly",
    category: "AI Short Films",
    difficulty: "Advanced" as const,
    stepsCount: 14,
    tools: ["Midjourney v6", "Kling AI", "ElevenLabs", "After Effects"],
    estimatedTime: "6h 45m",
    updatedDate: "3 days ago",
    description: "Full cinematic narrative workflow including AI character consistency locks, voice cloning, and environmental VFX matte painting.",
  },
  {
    id: "wf-4",
    title: "Automatic Camera Tracking & Depth Injection",
    category: "Camera Tracking",
    difficulty: "Intermediate" as const,
    stepsCount: 7,
    tools: ["Blender", "ComfyUI Depth-Anything", "DaVinci"],
    estimatedTime: "1h 45m",
    updatedDate: "5 days ago",
    description: "Extract camera motion matrices from raw footage and inject 3D trajectory data into latent diffusion video models.",
  },
  {
    id: "wf-5",
    title: "ACES Cinematic Color Space Transformation",
    category: "Color Grading",
    difficulty: "Beginner" as const,
    stepsCount: 5,
    tools: ["DaVinci Resolve Studio", "FilmConvert"],
    estimatedTime: "45m",
    updatedDate: "1 week ago",
    description: "Map raw AI video generations into ACEScc color science for seamless integration with ARRI Alexa and RED footage.",
  },
];

export default function WorkflowsPage() {
  const [selectedStep, setSelectedStep] = React.useState<PipelineStep>(pipelineSteps[4]);
  const [activeCategory, setActiveCategory] = React.useState("All Pipelines");

  const filteredWorkflows = activeCategory === "All Pipelines"
    ? workflowsList
    : workflowsList.filter((w) => w.category === activeCategory);

  return (
    <div className="py-12 bg-background min-h-screen text-foreground space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb items={[{ label: "Workflow Library" }]} />

        {/* Hero Section */}
        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4 glow-purple">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Production-Ready Blueprints</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            Workflow Library
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Production-ready pipelines for AI filmmaking, VFX, editing, and creative technology. Reusable step-by-step systems tested in real studio environments.
          </p>
        </div>

        {/* Interactive Visual Pipeline Section */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                Interactive Pipeline Visualizer
              </div>
              <h2 className="text-2xl font-bold text-foreground font-heading mt-1">
                Standard AI Cinema Production Flow
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono bg-secondary px-3 py-1.5 rounded-lg border border-border">
              Click any node to view parameters
            </span>
          </div>

          {/* Flow Stepper Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
            {pipelineSteps.map((step) => {
              const isSelected = selectedStep.id === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  className={clsx(
                    "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer",
                    isSelected
                      ? "border-primary bg-primary/15 text-white shadow-lg glow-purple"
                      : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  <span className="text-xs font-bold font-mono truncate w-full">{step.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          <div className="rounded-xl border border-border bg-background p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-accent font-bold uppercase">Selected Node:</span>
                <span className="text-sm font-bold text-foreground">{selectedStep.name}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedStep.details}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground font-mono uppercase">Primary Software</div>
                <div className="text-xs font-semibold text-primary">{selectedStep.tool}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5 text-accent" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Ribbon */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-extrabold text-foreground font-heading">
              Browse Workflows by Category
            </h2>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {workflowCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Workflow Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredWorkflows.map((wf) => (
            <div
              key={wf.id}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/40 transition-all flex flex-col justify-between shadow-xl group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="primary">{wf.category}</Badge>
                  <Badge difficulty={wf.difficulty} />
                </div>

                <h3 className="text-2xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                  {wf.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {wf.description}
                </p>

                {/* Software / Tools Ribbon */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                    Tools Required:
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {wf.tools.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs rounded-lg border border-border bg-background text-foreground font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Metadata */}
              <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-4">
                  <span>{wf.stepsCount} Steps</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {wf.estimatedTime}
                  </span>
                </div>

                <Link
                  href={`/knowledge/artificial-intelligence/understanding-latent-diffusion-models`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Launch Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
