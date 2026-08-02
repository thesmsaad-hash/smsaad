import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Cpu, ArrowRight, Check, Zap } from "lucide-react";
import type { Tool } from "@/features/tools/services/tools.repository";

interface ToolLibrarySectionProps {
  tools: Tool[];
}

export function ToolLibrarySection({ tools }: ToolLibrarySectionProps) {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2 font-mono">
              <Cpu className="h-4 w-4" />
              <span>Generative Tooling Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              AI Tools &amp; Model Architecture Breakdown
            </h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1.5 mt-4 md:mt-0">
            <span>Explore All AI Tools</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {tools.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No tools available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.slug}`}>
                <Card className="group h-full flex flex-col justify-between border-border bg-card hover:border-primary/70 hover:bg-card/80 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {tool.logo && (
                          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border bg-secondary">
                            <Image
                              src={tool.logo}
                              alt={tool.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors font-heading">
                            {tool.name}
                          </h3>
                          {tool.category && (
                            <Badge variant="primary" className="text-[10px] py-0 mt-0.5">
                              {tool.category}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono text-accent block">
                          {tool.starting_price ?? "Contact"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {tool.pricing_model ?? ""}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="p-0 mt-4 mb-4">
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {tool.tagline}
                      </CardDescription>
                    </CardHeader>

                    {tool.strengths && tool.strengths.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <div className="text-xs font-semibold text-foreground">Top Strengths:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(tool.strengths as string[]).slice(0, 4).map((str, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{str}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Best For: {tool.best_for?.slice(0, 45) ?? "—"}...
                    </span>
                    <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>Breakdown</span>
                      <Zap className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
