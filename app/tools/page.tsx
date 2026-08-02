"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { toolsData } from "@/lib/data/mock-data";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Cpu, Star, Check, Zap, ArrowRight, Bookmark, SlidersHorizontal, Monitor, Terminal, Search } from "lucide-react";
import { clsx } from "clsx";

const toolCategories = [
  "All Tools",
  "Video Generation",
  "Image Generation",
  "LLM",
  "Audio",
  "3D",
  "Editing",
  "VFX",
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = React.useState("All Tools");
  const [searchQuery, setSearchQuery] = React.useState("");

  const extendedToolsData = React.useMemo(() => {
    return [
      ...toolsData,
      {
        id: "comfyui-pro",
        name: "ComfyUI Node Engine",
        slug: "comfyui-node-engine",
        category: "Image Generation",
        license: "Open Source",
        rating: "5.0",
        ratingCount: "1,420",
        os: ["Windows", "Mac", "Linux"],
        interfaceType: "Node Based",
        tagline: "Modular graph-based GPU diffusion pipeline framework.",
        logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200&h=200",
        pricing: { startingPrice: "Free", model: "Open Source" },
        strengths: ["Infinite Node Customization", "Sub-100ms Execution", "Custom Python Extensions"],
        bestFor: "Advanced AI filmmakers & node architects",
        updated: "Updated yesterday",
      },
      {
        id: "luma-dream",
        name: "Luma Dream Machine",
        slug: "luma-dream-machine",
        category: "Video Generation",
        license: "Commercial",
        rating: "4.8",
        ratingCount: "890",
        os: ["Web"],
        interfaceType: "Cloud Web App",
        tagline: "High-speed realistic 3D motion video synthesis.",
        logo: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=200&h=200",
        pricing: { startingPrice: "$29/mo", model: "Freemium" },
        strengths: ["Physics Engine Consistency", "Camera Motion Control", "Rapid Generation Speed"],
        bestFor: "VFX concept artists & pre-visualization",
        updated: "Updated 3 days ago",
      },
    ];
  }, []);

  const filteredTools = extendedToolsData.filter((t) => {
    const matchesCategory = activeCategory === "All Tools" || t.category === activeCategory;
    const matchesSearch = searchQuery === "" || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-background min-h-screen text-foreground space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb items={[{ label: "AI Tool Directory" }]} />

        {/* Page Header */}
        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4 glow-purple">
            <Cpu className="h-3.5 w-3.5 text-accent" />
            <span>AI Model &amp; Software Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            AI Tool &amp; Neural Software Directory
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Enterprise-grade breakdowns of state-of-the-art AI video generators, motion brushes, audio cloners, 3D Gaussian Splat engines, and node math software.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {toolCategories.map((cat) => (
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

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools & models..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border bg-card text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/40 transition-all flex flex-col justify-between shadow-xl group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-secondary shrink-0">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-foreground font-heading group-hover:text-accent transition-colors">
                          {tool.name}
                        </h3>
                        <Badge variant="primary" className="text-[10px] py-0">
                          {tool.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold font-mono">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          <span>{tool.rating || "4.9"}</span>
                          <span className="text-muted-foreground font-normal">({tool.ratingCount || "520"})</span>
                        </div>
                        <span className="text-muted-foreground text-xs">•</span>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">{tool.license || "Commercial"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-mono text-accent font-bold block">
                      {tool.pricing.startingPrice}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono">
                      {tool.pricing.model}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.tagline}
                </p>

                {/* OS & Interface Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {tool.interfaceType && (
                    <span className="px-2.5 py-1 text-xs rounded-lg bg-primary/10 text-primary border border-primary/20 font-mono font-medium">
                      {tool.interfaceType}
                    </span>
                  )}
                  {tool.os && tool.os.map((system: string) => (
                    <span key={system} className="px-2.5 py-1 text-xs rounded-lg bg-secondary border border-border text-muted-foreground font-mono">
                      {system}
                    </span>
                  ))}
                </div>

                {/* Core Strengths */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-foreground font-mono">Key Capabilities:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tool.strengths.map((str, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Triggers */}
              <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">{tool.updated || "Updated 2 days ago"}</span>

                <div className="flex items-center gap-3">
                  <button className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-foreground transition-all">
                    Bookmark
                  </button>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    <span>Full Spec</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
