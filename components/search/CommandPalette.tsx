"use client";

import * as React from "react";
import { Search, X, BookOpen, Layers, Cpu, Newspaper, Sparkles, ArrowRight, BookMarked } from "lucide-react";
import { useRouter } from "next/navigation";
import { docsData, guidesData, toolsData, resourcesData, glossaryTerms } from "@/lib/data/mock-data";
import type { SearchResultItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "clsx";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterCategory = "all" | "knowledge" | "tools" | "workflows" | "glossary" | "news";

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>("all");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown handler for Cmd+K / Ctrl+K & Esc
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter combined search items
  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedDocs: SearchResultItem[] = docsData
      .filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      )
      .map((d) => ({
        id: d.id,
        title: d.title,
        type: "doc",
        slug: d.slug,
        category: d.category,
        snippet: d.description,
        url: `/knowledge/${d.category}/${d.slug}`,
      }));

    const matchedGuides: SearchResultItem[] = guidesData
      .filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q)
      )
      .map((g) => ({
        id: g.id,
        title: g.title,
        type: "guide",
        slug: g.slug,
        category: g.category,
        snippet: g.description,
        url: `/workflows`,
      }));

    const matchedTools: SearchResultItem[] = toolsData
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.bestFor.toLowerCase().includes(q)
      )
      .map((t) => ({
        id: t.id,
        title: t.name,
        type: "tool",
        slug: t.slug,
        category: t.category,
        snippet: t.tagline,
        url: `/tools/${t.slug}`,
      }));

    const matchedGlossary: SearchResultItem[] = glossaryTerms
      .filter(
        (gt) =>
          gt.term.toLowerCase().includes(q) ||
          gt.definition.toLowerCase().includes(q)
      )
      .map((gt) => ({
        id: gt.slug,
        title: gt.term,
        type: "glossary",
        slug: gt.slug,
        category: gt.category,
        snippet: gt.definition,
        url: `/glossary`,
      }));

    let allResults = [
      ...matchedDocs,
      ...matchedGuides,
      ...matchedTools,
      ...matchedGlossary,
    ];

    if (activeFilter === "knowledge") {
      allResults = allResults.filter((r) => r.type === "doc");
    } else if (activeFilter === "tools") {
      allResults = allResults.filter((r) => r.type === "tool");
    } else if (activeFilter === "workflows") {
      allResults = allResults.filter((r) => r.type === "guide");
    } else if (activeFilter === "glossary") {
      allResults = allResults.filter((r) => r.type === "glossary");
    } else if (activeFilter === "news") {
      allResults = allResults.filter((r) => r.category === "news");
    }

    return allResults.slice(0, 10);
  }, [query, activeFilter]);

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  const filters: { id: FilterCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "knowledge", label: "Knowledge" },
    { id: "tools", label: "Tools" },
    { id: "workflows", label: "Workflows" },
    { id: "glossary", label: "Glossary" },
    { id: "news", label: "News" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl glow-purple">
        {/* Search Header Input */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-primary mr-3 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Knowledge, Tools, Workflows, Glossary (⌘K)..."
            className="w-full bg-transparent text-foreground placeholder-muted-foreground text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Filter Chips Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-background/50 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1 font-mono">
            Filter:
          </span>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={clsx(
                "px-2.5 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap",
                activeFilter === f.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results List / Suggested Items */}
        <div className="max-h-[420px] overflow-y-auto p-4">
          {query.trim() === "" ? (
            <div>
              <div className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 font-mono">
                Popular Searches
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: "Understanding Latent Diffusion Models", url: "/knowledge/artificial-intelligence/understanding-latent-diffusion-models" },
                  { label: "3D Gaussian Splatting vs NeRFs", url: "/knowledge/visual-effects/3d-gaussian-splatting-vs-nerfs" },
                  { label: "ComfyUI Advanced Architecture", url: "/knowledge/creative-technology/comfyui-advanced-workflow-architecture" },
                  { label: "Runway Gen-3 Alpha Model", url: "/tools/runway-gen-3-alpha" },
                  { label: "Lighting & Color Physics", url: "/knowledge/filmmaking/lighting-and-color-theory-in-generative-prompts" },
                  { label: "Production Workflow Library", url: "/workflows" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.url)}
                    className="flex items-center justify-between rounded-xl border border-border bg-background p-3 text-left text-sm text-foreground hover:border-primary/50 hover:bg-secondary/60 transition-all group"
                  >
                    <span className="truncate mr-2">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
              <p className="text-base font-medium text-foreground">No knowledge items found</p>
              <p className="text-xs mt-1">Try searching for &quot;Diffusion&quot;, &quot;NeRF&quot;, &quot;ComfyUI&quot;, or &quot;Lighting&quot;</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider font-mono">
                Matching Results ({results.length})
              </div>
              {results.map((res) => {
                let icon = <BookOpen className="h-4 w-4 text-primary" />;
                if (res.type === "guide") icon = <Layers className="h-4 w-4 text-accent" />;
                if (res.type === "tool") icon = <Cpu className="h-4 w-4 text-emerald-400" />;
                if (res.type === "glossary") icon = <BookMarked className="h-4 w-4 text-amber-400" />;

                return (
                  <button
                    key={res.id}
                    onClick={() => handleSelect(res.url)}
                    className="w-full flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-left transition-all hover:border-primary hover:bg-secondary/60"
                  >
                    <div className="mt-0.5 rounded-lg border border-border bg-card p-2">
                      {icon}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground truncate">
                          {res.title}
                        </span>
                        <Badge variant="primary" className="capitalize text-[10px] py-0 px-2">
                          {res.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {res.snippet}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between border-t border-border bg-background px-4 py-2.5 text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-mono">ESC</kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>SMSAAD Search Engine 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
