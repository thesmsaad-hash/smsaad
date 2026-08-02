import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FileCheck2, Scale, BookOpen, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | SMSAAD 2.0 Platform",
  description: "Terms of Service and Usage Terms for SMSAAD Platform — open-source documentation, usage guidelines, and intellectual property rights.",
};

export default function TermsPage() {
  return (
    <div className="py-12 bg-background min-h-screen text-foreground">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumb items={[{ label: "Terms of Service" }]} />

        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-mono font-bold text-primary mb-4 glow-purple">
            <FileCheck2 className="h-3.5 w-3.5 text-accent" />
            <span>Platform Usage Terms</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading leading-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm font-mono text-muted-foreground">
            Effective Date: August 2, 2026 • SMSAAD Platform 2.0
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-2xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p>
              By accessing, browsing, or utilizing the SMSAAD Platform (<strong className="text-foreground">smsaad.online</strong>), you agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, please refrain from using the platform services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              <span>2. Intellectual Property & Open Licensing</span>
            </h2>
            <p>
              All core documentation, node workflow breakdowns, architectural diagrams, and mathematical specs published on SMSAAD are provided openly for community educational and commercial workflow implementation. Platform branding, logo marks, and proprietary site source code remain the property of SMSAAD Team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <span>3. User Conduct & Acceptable Use</span>
            </h2>
            <p>
              Users agree not to engage in malicious activities including automated scraping beyond standard API rate limits, attempting unauthorized administrative access, or publishing spam/harmful content via platform forms.
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-6">
            <h2 className="text-xl font-bold text-foreground font-heading">
              4. Contact & Inquiries
            </h2>
            <p>
              If you have questions regarding these terms, please reach out to the SMSAAD Team at:
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
