"use client";

import * as React from "react";
import { Mail, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary mb-6 glow-purple">
          <Mail className="h-7 w-7" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
          Subscribe to the SMSAAD Dispatch
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          Deep-dive analysis on new AI video models, ComfyUI node Math, 3D Gaussian Splatting breakdowns, and creative technology news delivered directly to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter.your.email@domain.com"
            disabled={status === "loading" || status === "success"}
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button
            type="submit"
            size="md"
            disabled={status === "loading" || status === "success"}
            className="h-11 px-6 shadow-lg shadow-primary/30 gap-2 shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Subscribed!</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Subscribe</span>
              </>
            )}
          </Button>
        </form>

        {status === "error" && (
          <p className="mt-3 text-xs text-destructive">{errorMessage}</p>
        )}
        {status === "success" && (
          <p className="mt-3 text-xs text-emerald-400">
            Welcome aboard! Check your inbox for your welcome email.
          </p>
        )}

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span>No spam</span>
          <span>•</span>
          <span>Unsubscribe anytime</span>
          <span>•</span>
          <span>Resend Email Verified</span>
        </div>
      </div>
    </section>
  );
}
