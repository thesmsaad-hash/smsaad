"use client";

import * as React from "react";
import Link from "next/link";
import { GitFork, Sparkles, BookOpen, Cpu, Layers } from "lucide-react";
import { clsx } from "clsx";

interface GraphNode {
  id: string;
  label: string;
  type: "root" | "concept" | "tool" | "workflow";
  url: string;
}

export function VisualKnowledgeGraph() {
  const [activeNode, setActiveNode] = React.useState<string>("flux");

  const nodes: GraphNode[] = [
    { id: "flux", label: "Flux 1.1 Pro Engine", type: "root", url: "/knowledge/artificial-intelligence/understanding-latent-diffusion-models" },
    { id: "lora", label: "LoRA Fine-Tuning", type: "concept", url: "/knowledge" },
    { id: "comfyui", label: "ComfyUI Node Math", type: "tool", url: "/tools" },
    { id: "runway", label: "Runway Gen-3 Alpha", type: "tool", url: "/tools/runway-gen-3-alpha" },
    { id: "sd", label: "Stable Diffusion XL", type: "concept", url: "/knowledge" },
    { id: "workflow", label: "AI Commercial Pipeline", type: "workflow", url: "/workflows" },
    { id: "prompt", label: "Prompt Kelvin Physics", type: "concept", url: "/knowledge" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold uppercase tracking-wider">
            <GitFork className="h-4 w-4" />
            <span>Interactive Entity Graph</span>
          </div>
          <h3 className="text-xl font-bold text-foreground font-heading mt-1">
            Visual Knowledge Tree Navigation
          </h3>
        </div>
        <span className="text-xs text-muted-foreground font-mono bg-background px-3 py-1.5 rounded-lg border border-border">
          Click nodes to navigate ecosystem
        </span>
      </div>

      {/* Visual Tree Node Representation */}
      <div className="relative py-6 flex flex-col items-center justify-center space-y-8 bg-background/50 rounded-xl border border-border/60 p-6 overflow-x-auto">
        {/* Root Node */}
        <div className="relative z-10">
          <button
            onClick={() => setActiveNode("flux")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-xl glow-purple border border-primary/50 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Flux 1.1 Pro Architecture</span>
          </button>
        </div>

        {/* Vertical Connecting Lines */}
        <div className="w-0.5 h-6 bg-border" />

        {/* Connected Sub-Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-4xl">
          {nodes.slice(1).map((node) => {
            const isSelected = activeNode === node.id;
            let icon = <BookOpen className="h-3.5 w-3.5 text-primary" />;
            if (node.type === "tool") icon = <Cpu className="h-3.5 w-3.5 text-accent" />;
            if (node.type === "workflow") icon = <Layers className="h-3.5 w-3.5 text-emerald-400" />;

            return (
              <Link
                key={node.id}
                href={node.url}
                onMouseEnter={() => setActiveNode(node.id)}
                className={clsx(
                  "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer group",
                  isSelected
                    ? "border-accent bg-card text-foreground shadow-lg"
                    : "border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                <div className="mb-1">{icon}</div>
                <span className="text-xs font-semibold font-mono truncate w-full group-hover:text-accent transition-colors">
                  {node.label}
                </span>
                <span className="text-[9px] uppercase font-mono text-muted-foreground mt-0.5">
                  {node.type}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
