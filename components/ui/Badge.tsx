import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "accent" | "outline" | "difficulty";
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export function Badge({
  className,
  variant = "default",
  difficulty,
  children,
  ...props
}: BadgeProps) {
  let styleClasses = "bg-secondary text-secondary-foreground border-border";

  if (variant === "primary") {
    styleClasses = "bg-primary/15 text-primary-foreground border-primary/40";
  } else if (variant === "accent") {
    styleClasses = "bg-accent/15 text-accent border-accent/40";
  } else if (variant === "outline") {
    styleClasses = "bg-transparent text-foreground border-border";
  } else if (variant === "difficulty" || difficulty) {
    const level = difficulty || "Intermediate";
    if (level === "Beginner") {
      styleClasses = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    } else if (level === "Intermediate") {
      styleClasses = "bg-sky-500/15 text-sky-400 border-sky-500/30";
    } else if (level === "Advanced") {
      styleClasses = "bg-purple-500/15 text-purple-400 border-purple-500/30";
    } else if (level === "Expert") {
      styleClasses = "bg-amber-500/15 text-amber-400 border-amber-500/30";
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        styleClasses,
        className
      )}
      {...props}
    >
      {difficulty || children}
    </span>
  );
}
