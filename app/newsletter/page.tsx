import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Mail, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function NewsletterPage() {
  return (
    <div className="py-12 bg-[#09090B] min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Newsletter" }]} />

        <div className="mt-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-4 py-1.5 text-xs font-semibold text-[#C084FC] mb-4">
            <Mail className="h-3.5 w-3.5" />
            <span>Weekly Technical Dispatch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            Stay At The Cutting Edge of Creative Tech
          </h1>
          <p className="mt-4 text-lg text-[#A1A1AA] leading-relaxed">
            Join thousands of AI filmmakers, VFX supervisors, and creative technologists receiving first-principles breakdowns every Tuesday.
          </p>
        </div>

        <NewsletterSection />

        {/* What to expect grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-6 space-y-2">
            <div className="rounded-xl bg-[#7C3AED]/20 p-3 text-[#7C3AED] w-fit">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Model Architecture Math</h3>
            <p className="text-xs text-[#A1A1AA]">
              Deep dives into U-Net attention blocks, VAE latents, and temporal video layers.
            </p>
          </div>

          <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-6 space-y-2">
            <div className="rounded-xl bg-[#22D3EE]/20 p-3 text-[#22D3EE] w-fit">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-white">VFX Studio Workflows</h3>
            <p className="text-xs text-[#A1A1AA]">
              Step-by-step guides on 3D Gaussian Splatting, Nuke compositing, and Unreal Engine volume setups.
            </p>
          </div>

          <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-6 space-y-2">
            <div className="rounded-xl bg-purple-500/20 p-3 text-purple-400 w-fit">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Zero Hype, Pure Math</h3>
            <p className="text-xs text-[#A1A1AA]">
              No promotional fluff or clickbait—just rigorous engineering and production craft.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
