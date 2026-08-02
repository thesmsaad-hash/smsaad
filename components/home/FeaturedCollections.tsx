import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Layers, ArrowRight, BookOpen, Cpu, Sparkles, BookMarked } from "lucide-react";

export function FeaturedCollections() {
  const collections = [
    {
      id: "col-1",
      title: "AI Video Mastery & Neural Motion",
      slug: "ai-video-mastery",
      category: "Master Collection",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=500",
      description: "End-to-end curriculum connecting generative motion models, camera control parameters, and temporal consistency math.",
      stats: { articles: 12, workflows: 4, tools: 8, glossary: 6 },
    },
    {
      id: "col-2",
      title: "Virtual Production & 3D Gaussian Splats",
      slug: "virtual-production-gaussian-splats",
      category: "VFX Pipeline",
      coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800&h=500",
      description: "Complete studio blueprint for scanning real-world environments and projecting volumetric plates onto LED stages.",
      stats: { articles: 9, workflows: 5, tools: 6, glossary: 8 },
    },
  ];

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2 font-mono">
              <Layers className="h-4 w-4 text-accent" />
              <span>Curated Knowledge Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Featured Collections
            </h2>
          </div>
          <Link href="/learning-center" className="text-sm font-semibold text-accent hover:underline flex items-center gap-1.5 mt-4 md:mt-0">
            <span>Explore All Collections</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((col) => (
            <Link key={col.id} href={`/learning-center`}>
              <Card className="group h-full flex flex-col sm:flex-row overflow-hidden border-border p-0 bg-card hover:border-primary/50 transition-all hover:-translate-y-1 shadow-xl">
                <div className="relative h-64 sm:h-auto sm:w-2/5 shrink-0 overflow-hidden bg-secondary">
                  <Image
                    src={col.coverImage}
                    alt={col.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent sm:hidden" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary" className="backdrop-blur-md">
                      {col.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <CardHeader className="p-0 mb-3">
                      <CardTitle className="text-xl leading-snug group-hover:text-primary transition-colors font-heading">
                        {col.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
                        {col.description}
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <div className="pt-4 border-t border-border grid grid-cols-2 gap-2 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      <span>{col.stats.articles} Articles</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-accent" />
                      <span>{col.stats.workflows} Workflows</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{col.stats.tools} Tools</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookMarked className="h-3.5 w-3.5 text-amber-400" />
                      <span>{col.stats.glossary} Terms</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
