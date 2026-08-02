"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Instagram, Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to subscribe. Please try again.");
      } else {
        setIsSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand & Newsletter Col */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <Logo className="h-8 w-8" />
                <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                  SMSAAD
                </span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                An enterprise-grade documentation-first knowledge platform teaching AI Video, Visual Effects, Diffusion Models, and Creative Technology.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-heading text-sm font-semibold text-foreground">Subscribe to Newsletter</h4>
              {isSubscribed ? (
                <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Subscribed! Check your inbox for welcome guide.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-9 text-sm"
                  />
                  <Button type="submit" size="sm" disabled={isLoading} className="h-9 shrink-0 gap-2 cursor-pointer">
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </Button>
                </form>
              )}
              {errorMsg && (
                <p className="text-xs text-red-400 font-mono mt-1">{errorMsg}</p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/thesmsaad-hash"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-card p-2.5 hover:border-border/80 hover:text-foreground transition-all"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/i_saad.shaik/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-card p-2.5 hover:border-pink-500 hover:text-pink-500 transition-all"
                title="Instagram"
              >
                <Instagram className="h-4 w-4 text-pink-500" />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-heading text-sm font-semibold text-foreground">Knowledge</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/knowledge" className="hover:text-foreground transition-colors">Artificial Intelligence</Link></li>
                <li><Link href="/knowledge" className="hover:text-foreground transition-colors">Visual Effects</Link></li>
                <li><Link href="/knowledge" className="hover:text-foreground transition-colors">Video Editing</Link></li>
                <li><Link href="/knowledge" className="text-primary hover:underline flex items-center gap-1 mt-4">Browse All <ArrowRight className="h-3 w-3" /></Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading text-sm font-semibold text-foreground">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/tools" className="hover:text-foreground transition-colors">AI Tools Directory</Link></li>
                <li><Link href="/workflows" className="hover:text-foreground transition-colors">Production Workflows</Link></li>
                <li><Link href="/news" className="hover:text-foreground transition-colors">Industry News</Link></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors">About SMSAAD</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading text-sm font-semibold text-foreground">Community</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://github.com/thesmsaad-hash" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub Community</a></li>
                <li><a href="https://www.instagram.com/i_saad.shaik/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><Link href="/newsletter" className="hover:text-foreground transition-colors">Weekly Newsletter</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading text-sm font-semibold text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Versioning & Technical Stack Ribbon */}
        <div className="mt-16 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4 font-mono">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} SMSAAD Platform.</p>
            <span>•</span>
            <span className="text-accent font-semibold">v2.0.0 (Updated: August 2026)</span>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <span className="font-semibold text-foreground/70">Built with</span>
            <span className="text-white">SMSAAD Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
