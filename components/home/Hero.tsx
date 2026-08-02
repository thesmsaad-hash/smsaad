"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Sparkles, Cpu, Film, Terminal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CommandPalette } from "@/components/search/CommandPalette";

export function Hero() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const rotatingQueries = [
    "Search Diffusion Models...",
    "Search ComfyUI...",
    "Search Camera Tracking...",
    "Search Color Grading...",
    "Search Veo 3...",
  ];
  const [queryIndex, setQueryIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setQueryIndex((prev) => (prev + 1) % rotatingQueries.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [rotatingQueries.length]);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-grid-pattern">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-accent/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md glow-purple">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>SMSAAD Platform 2.0</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span className="text-muted-foreground">The Knowledge Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl font-heading leading-[1.1]">
          The Knowledge Platform for <br />
          <span className="text-gradient-purple">AI Video Generation</span>, <span className="text-gradient-cyan">Visual Effects</span> &amp; <span className="text-gradient-purple">Creative Technology</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Learn concepts, workflows, tools, and industry knowledge—not shortcuts.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/knowledge">
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
              <span>Explore Knowledge</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => setIsSearchOpen(true)} className="gap-2 border-border">
            <Search className="h-4 w-4 text-accent" />
            <span>Search Platform</span>
          </Button>
        </div>

        {/* Global Rotating Search Bar (Hero) */}
        <div className="pt-4 max-w-2xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative flex items-center bg-card border border-border rounded-2xl shadow-xl h-14 px-4 w-full text-left cursor-pointer"
          >
            <Search className="h-5 w-5 text-primary shrink-0 mr-3" />
            <span className="flex-1 text-muted-foreground text-sm font-medium transition-all duration-500">
              {rotatingQueries[queryIndex]}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary border border-border text-xs text-muted-foreground font-mono font-medium">
              <span>⌘</span><span>K</span>
            </div>
          </button>
        </div>

        {/* Feature Icons Quick Ribbon */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground uppercase tracking-widest font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <span>Latent Diffusion</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>3D Gaussian Splatting</span>
          </div>
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-purple-400" />
            <span>Virtual Production</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>ComfyUI Node Math</span>
          </div>
        </div>
      </div>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </section>
  );
}
