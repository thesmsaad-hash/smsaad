import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ShieldCheck, Lock, Eye, Server, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | SMSAAD 2.0 Platform",
  description: "Official Privacy Policy for SMSAAD Platform — detailing data protection, encryption, and user privacy standards.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-background min-h-screen text-foreground">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumb items={[{ label: "Privacy Policy" }]} />

        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-mono font-bold text-primary mb-4 glow-purple">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm font-mono text-muted-foreground">
            Effective Date: August 2, 2026 • SMSAAD Platform 2.0
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-2xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>1. Overview & Commitment</span>
            </h2>
            <p>
              SMSAAD ("Platform", "we", "us", "our") is dedicated to safeguarding the privacy of our users, creative engineers, and researchers. This Privacy Policy explains how we collect, use, store, and protect your information when you visit or interact with our knowledge engine at <strong className="text-foreground">smsaad.online</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <Eye className="h-5 w-5 text-accent" />
              <span>2. Information We Collect</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-foreground/90">
              <li>
                <strong>Account Data:</strong> When you register or sign in using email authentication or OAuth providers (GitHub/Google), we collect your name, email address, and profile avatar.
              </li>
              <li>
                <strong>Newsletter Subscriptions:</strong> Email addresses submitted to our dispatch newsletter are stored securely for sending technical updates and release breakdowns.
              </li>
              <li>
                <strong>Usage Metrics:</strong> Anonymous telemetry, document bookmarks, and search queries used to optimize page performance and recommendations.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <Server className="h-5 w-5 text-emerald-400" />
              <span>3. Data Storage & Infrastructure Security</span>
            </h2>
            <p>
              All user data is encrypted in transit (TLS 1.3) and at rest (AES-256) utilizing enterprise PostgreSQL infrastructure with Row Level Security (RLS) policies. We do not sell or rent user personal data to third parties under any circumstances.
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-6">
            <h2 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>4. Your Privacy Rights & Contact</span>
            </h2>
            <p>
              You maintain the right to access, update, or request permanent deletion of your account and newsletter subscription at any time. For privacy inquiries or data requests, contact our founder & lead team directly at:
            </p>
            <div className="p-4 rounded-xl border border-border bg-background text-xs font-mono text-foreground font-bold">
              Email: smsaad05082003@gmail.com | contact@smsaad.online
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
