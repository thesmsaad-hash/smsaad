import Link from "next/link";
import { resourcesData } from "@/lib/data/mock-data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Package, ArrowRight, FileCode, Copy, CheckSquare, HelpCircle } from "lucide-react";

export function ResourceShowcase() {
  return (
    <section className="py-20 bg-[#09090B] border-t border-[#27272A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-mono">
              <Package className="h-4 w-4" />
              <span>Production Toolkit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Cheat Sheets, Glossary & Prompt Formulas
            </h2>
          </div>
          <Link href="/resources" className="text-sm font-semibold text-amber-400 hover:underline flex items-center gap-1.5 mt-4 md:mt-0">
            <span>Explore All Resources</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/resources#cheatsheets">
            <Card className="group h-full border-[#27272A] bg-[#111827]">
              <div className="rounded-xl border border-[#27272A] bg-[#1E293B] p-3 text-amber-400 w-fit mb-4">
                <FileCode className="h-6 w-6" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-lg group-hover:text-[#22D3EE] transition-colors">
                  ComfyUI Shortcut Cheat Sheets
                </CardTitle>
                <CardDescription className="text-xs text-[#A1A1AA] mt-2">
                  Complete hotkeys, node search tricks, memory management commands, and VRAM purging.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/resources#templates">
            <Card className="group h-full border-[#27272A] bg-[#111827]">
              <div className="rounded-xl border border-[#27272A] bg-[#1E293B] p-3 text-[#22D3EE] w-fit mb-4">
                <Copy className="h-6 w-6" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-lg group-hover:text-[#22D3EE] transition-colors">
                  Prompt Engineering Templates
                </CardTitle>
                <CardDescription className="text-xs text-[#A1A1AA] mt-2">
                  Copy-paste formulas for anamorphic lens flare, 70mm IMAX cinematography, and Kelvin lighting.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/resources#glossary">
            <Card className="group h-full border-[#27272A] bg-[#111827]">
              <div className="rounded-xl border border-[#27272A] bg-[#1E293B] p-3 text-[#7C3AED] w-fit mb-4">
                <HelpCircle className="h-6 w-6" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-lg group-hover:text-[#22D3EE] transition-colors">
                  Creative Tech Glossary
                </CardTitle>
                <CardDescription className="text-xs text-[#A1A1AA] mt-2">
                  First-principles definitions for CFG scale, 3D Gaussian Splatting, ACEScg, and VAE latents.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
