import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "secondary" | "ghost" | "danger" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 border border-primary/50",
      accent:
        "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg shadow-accent/20",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
      outline:
        "border border-border bg-transparent text-foreground hover:bg-card hover:border-border/80",
      ghost:
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-card/50",
      glass:
        "glass-panel text-foreground hover:bg-white/5",
      danger:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20",
    };

    const sizes = {
      sm: "h-8 rounded-md px-3 text-xs",
      md: "h-10 rounded-lg px-4 text-sm",
      lg: "h-12 rounded-xl px-6 text-base font-semibold",
      icon: "h-10 w-10 rounded-lg p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
