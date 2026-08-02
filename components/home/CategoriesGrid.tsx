import Link from "next/link";
import { categoriesData } from "@/lib/data/mock-data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import {
  BrainCircuit,
  Video,
  Sparkles,
  Clapperboard,
  Cpu,
  Scissors,
  Sun,
  Camera,
  Terminal,
  Mic,
  ArrowUpRight,
} from "lucide-react";

export function CategoriesGrid() {
  const iconMap: Record<string, React.ElementType> = {
    BrainCircuit,
    Video,
    Sparkles,
    Clapperboard,
    Cpu,
    Scissors,
    Sun,
    Camera,
    Terminal,
    Mic,
  };

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 font-mono">
              Knowledge Domains
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Explore By Domain Category
            </p>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mt-4 md:mt-0">
            Structured technical documentation across 10 specialized domains of AI filmmaking and creative technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((cat) => {
            const IconComp = iconMap[cat.iconName] || BrainCircuit;
            return (
              <Link key={cat.id} href={`/knowledge?category=${cat.slug}`}>
                <Card className="group h-full relative overflow-hidden border-border hover:border-primary/60 hover:bg-card/80 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl border border-border bg-secondary p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-md">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground rounded-full border border-border bg-background px-2.5 py-1">
                      {cat.docCount} docs
                    </span>
                  </div>

                  <CardHeader className="mt-4">
                    <CardTitle className="flex items-center justify-between text-lg group-hover:text-accent transition-colors">
                      <span>{cat.title}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-2">
                      {cat.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
