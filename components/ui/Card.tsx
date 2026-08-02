import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: "purple" | "cyan" | "none";
}

export function Card({
  className,
  hoverEffect = true,
  glow = "none",
  children,
  ...props
}: CardProps) {
  const glowStyles = {
    purple: "glow-purple",
    cyan: "glow-cyan",
    none: "",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 text-card-foreground transition-all duration-300",
        hoverEffect &&
          "hover:border-border/80 hover:bg-card/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-xl font-bold tracking-tight text-foreground font-heading",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-2", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex items-center pt-4 border-t border-border", className)}
      {...props}
    />
  );
}
