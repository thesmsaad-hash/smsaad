import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  category: {
    label: string;
    icon?: React.ReactNode;
  };
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  readingTime?: string;
  lastUpdated?: string;
  className?: string;
}

export function ContentCard({
  title,
  description,
  href,
  category,
  difficulty,
  readingTime,
  lastUpdated,
  className,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border/80 hover:bg-card/80 hover:shadow-xl hover:shadow-black/50 relative overflow-hidden",
        className
      )}
    >
      {/* Top Meta row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {category.icon && <span className="text-primary">{category.icon}</span>}
          <span>{category.label}</span>
        </div>
        {difficulty && (
          <Badge difficulty={difficulty}>{difficulty}</Badge>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-2 mb-6">
        <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer Meta */}
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          {readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime}</span>
            </div>
          )}
          {lastUpdated && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{lastUpdated}</span>
            </div>
          )}
        </div>
        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
      </div>
    </Link>
  );
}
