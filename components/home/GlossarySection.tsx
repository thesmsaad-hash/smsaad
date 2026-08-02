import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

const mockGlossary = [
  { term: "Latent Space", definition: "A mathematical representation where similar concepts are grouped closer together, used by AI models to understand relationships between data.", slug: "latent-space" },
  { term: "Diffusion Model", definition: "A type of generative AI model that learns to create data by reversing a process that gradually adds noise to images.", slug: "diffusion-model" },
  { term: "Gaussian Splatting", definition: "A rasterization technique for 3D reconstruction that represents scenes as millions of 3D gaussians.", slug: "gaussian-splatting" },
  { term: "ControlNet", definition: "A neural network architecture that adds spatial conditioning controls to large, pretrained text-to-image diffusion models.", slug: "controlnet" }
];

export function GlossarySection() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2 font-mono">
              <BookOpen className="h-4 w-4" />
              <span>Terminology Reference</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Industry Glossary
            </h2>
          </div>
          <Link href="/glossary" className="text-sm font-semibold text-emerald-500 hover:text-emerald-400 flex items-center gap-1.5 mt-4 md:mt-0 transition-colors">
            <span>View Full Glossary</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockGlossary.map((item) => (
            <Link key={item.slug} href={`/glossary/${item.slug}`}>
              <Card className="h-full group hover:bg-card/80 transition-all border-border hover:border-emerald-500/50">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg group-hover:text-emerald-400 transition-colors">
                    {item.term}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {item.definition}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
