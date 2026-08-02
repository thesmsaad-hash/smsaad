import React from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Layers, Cpu, Newspaper, Search, Bookmark, Lock, Wrench, FileX } from "lucide-react";
import { Button } from "./Button";

export type EmptyStateVariant = 
  | "404"
  | "no-search-results"
  | "empty-collection"
  | "empty-bookmark"
  | "empty-news"
  | "unauthorized"
  | "maintenance"
  | "custom";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  showSuggestions?: boolean;
}

const variantConfigs: Record<Exclude<EmptyStateVariant, "custom">, { icon: React.ReactNode; title: string; description: string }> = {
  "404": {
    icon: <Search className="h-8 w-8" />,
    title: "404 — Page Not Found",
    description: "The document, tool, or workflow you are looking for has either been moved or does not exist.",
  },
  "no-search-results": {
    icon: <FileX className="h-8 w-8 text-amber-400" />,
    title: "No Results Found",
    description: "We couldn't find anything matching your query. Try searching with different keywords or topics.",
  },
  "empty-collection": {
    icon: <Layers className="h-8 w-8 text-accent" />,
    title: "Collection is Empty",
    description: "There are currently no items added to this knowledge collection.",
  },
  "empty-bookmark": {
    icon: <Bookmark className="h-8 w-8 text-primary" />,
    title: "No Bookmarks Saved",
    description: "You haven't bookmarked any articles or workflows yet. Click the bookmark icon on any guide to save it here.",
  },
  "empty-news": {
    icon: <Newspaper className="h-8 w-8 text-emerald-400" />,
    title: "No News Available",
    description: "Check back soon for latest announcements, AI model releases, and platform updates.",
  },
  unauthorized: {
    icon: <Lock className="h-8 w-8 text-red-400" />,
    title: "Access Restricted",
    description: "You need appropriate permissions or need to be logged in to view this knowledge resource.",
  },
  maintenance: {
    icon: <Wrench className="h-8 w-8 text-amber-500" />,
    title: "Under Maintenance",
    description: "This section is currently undergoing scheduled system updates. Please check back shortly.",
  },
};

export function EmptyState({
  variant = "custom",
  icon,
  title,
  description,
  action,
  showSuggestions = true,
}: EmptyStateProps) {
  const config = variant !== "custom" ? variantConfigs[variant] : null;

  const finalIcon = icon || config?.icon;
  const finalTitle = title || config?.title || "No Content Available";
  const finalDescription = description || config?.description || "There is no data to display right now.";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="flex flex-col items-center gap-6">
          {finalIcon && (
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary glow-purple">
              {finalIcon}
            </div>
          )}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading tracking-tight">
              {finalTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              {finalDescription}
            </p>
          </div>
          {action ? (
            <div className="mt-4">{action}</div>
          ) : (
            <div className="mt-4">
              <Link href="/knowledge">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Browse Knowledge Base</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {showSuggestions && (
          <div className="mt-12 pt-12 border-t border-border w-full text-left">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 text-center font-mono">
              Explore Platform Hubs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/knowledge" className="group p-4 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-primary/40 transition-all flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">AI Foundations</h4>
                  <p className="text-xs text-muted-foreground mt-1">Core concepts and theory</p>
                </div>
              </Link>

              <Link href="/workflows" className="group p-4 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-accent/40 transition-all flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Workflows</h4>
                  <p className="text-xs text-muted-foreground mt-1">Production pipelines</p>
                </div>
              </Link>

              <Link href="/tools" className="group p-4 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-emerald-500/40 transition-all flex items-start gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors">Tool Directory</h4>
                  <p className="text-xs text-muted-foreground mt-1">Software and models</p>
                </div>
              </Link>

              <Link href="/news" className="group p-4 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-amber-500/40 transition-all flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-amber-400 transition-colors">Latest News</h4>
                  <p className="text-xs text-muted-foreground mt-1">Industry updates</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
