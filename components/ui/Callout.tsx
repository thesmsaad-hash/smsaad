import * as React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, AlertOctagon, HelpCircle } from "lucide-react";

export interface CalloutProps {
  type?: "note" | "warning" | "tip" | "important" | "caution";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  type = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const configs = {
    note: {
      icon: Info,
      border: "border-sky-500/40",
      bg: "bg-sky-950/20",
      iconColor: "text-sky-400",
      defaultTitle: "NOTE",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-amber-500/40",
      bg: "bg-amber-950/20",
      iconColor: "text-amber-400",
      defaultTitle: "WARNING",
    },
    tip: {
      icon: Lightbulb,
      border: "border-emerald-500/40",
      bg: "bg-emerald-950/20",
      iconColor: "text-emerald-400",
      defaultTitle: "PRO TIP",
    },
    important: {
      icon: AlertOctagon,
      border: "border-purple-500/40",
      bg: "bg-purple-950/20",
      iconColor: "text-purple-400",
      defaultTitle: "IMPORTANT",
    },
    caution: {
      icon: HelpCircle,
      border: "border-rose-500/40",
      bg: "bg-rose-950/20",
      iconColor: "text-rose-400",
      defaultTitle: "CAUTION",
    },
  };

  const config = configs[type];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-2xl border p-5 shadow-lg backdrop-blur-sm transition-all",
        config.border,
        config.bg,
        className
      )}
    >
      <div className="flex items-center gap-2.5 font-semibold text-sm tracking-wide">
        <IconComponent className={cn("h-5 w-5 shrink-0", config.iconColor)} />
        <span className={cn("uppercase font-heading", config.iconColor)}>
          {title || config.defaultTitle}
        </span>
      </div>
      <div className="mt-2.5 text-sm leading-relaxed text-muted-foreground [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}
