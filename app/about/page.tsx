import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Sparkles, Code2, Github, Instagram, Mail, ShieldCheck, Tag } from "lucide-react";

export const metadata = {
  title: "About SMSAAD | Platform Version & Founder",
  description: "Learn about SMSAAD 2.0 platform architecture, version release specs, and founder SM Saad.",
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-background min-h-screen text-foreground">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumb items={[{ label: "About SMSAAD" }]} />

        {/* Header Hero */}
        <div className="border-b border-border pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-mono font-bold text-primary mb-4 glow-purple">
            <Tag className="h-3.5 w-3.5 text-accent" />
            <span>Platform Version 2.0.0</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            About SMSAAD
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Documentation-First Knowledge Engine for AI Video Generation, Visual Effects &amp; Creative Tech.
          </p>
        </div>

        {/* About Me as Founder Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src="/founder.jpg"
              alt="SM Saad - Founder & Lead AI Engineer"
              className="h-36 w-36 rounded-2xl object-cover object-top border-2 border-[#7C3AED] shadow-2xl shadow-[#7C3AED]/20 shrink-0"
            />

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-accent/15 text-accent border border-accent/30 mb-1">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Founder &amp; Architect</span>
                </div>
                <h2 className="text-2xl font-extrabold text-foreground font-heading">
                  SM Saad
                </h2>
                <p className="text-xs text-muted-foreground font-mono">
                  smsaad05082003@gmail.com
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                I founded SMSAAD to bridge deep learning neural math, latent diffusion principles, and production node workflows into clean, enterprise-grade reference documentation for creative engineers, AI researchers, and VFX directors worldwide.
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href="https://github.com/thesmsaad-hash"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:border-primary transition-all"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.instagram.com/i_saad.shaik/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:border-pink-500 hover:text-pink-500 transition-all"
                >
                  <Instagram className="h-3.5 w-3.5 text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a
                  href="mailto:smsaad05082003@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:border-primary transition-all"
                >
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Version Release Specs */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-bold text-foreground font-mono uppercase tracking-wider flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <span>Platform Version Specifications</span>
            </h3>
            <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
              v2.0.0 Stable
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl border border-border bg-background space-y-1">
              <span className="text-muted-foreground uppercase text-[10px]">Framework</span>
              <div className="text-foreground font-bold">Next.js 15.5 (App Router) &amp; React 19</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-background space-y-1">
              <span className="text-muted-foreground uppercase text-[10px]">Database &amp; RLS</span>
              <div className="text-foreground font-bold">Supabase PostgreSQL 15 &amp; RLS Triggers</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-background space-y-1">
              <span className="text-muted-foreground uppercase text-[10px]">Transactional Email</span>
              <div className="text-foreground font-bold">Resend API Infrastructure</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-background space-y-1">
              <span className="text-muted-foreground uppercase text-[10px]">Styling System</span>
              <div className="text-foreground font-bold">Tailwind CSS 4 (@theme CSS Tokens)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
