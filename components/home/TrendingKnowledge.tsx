import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import type { KnowledgeArticle } from "@/features/knowledge/services/knowledge.repository";

interface TrendingKnowledgeProps {
  docs: KnowledgeArticle[];
}

export function TrendingKnowledge({ docs }: TrendingKnowledgeProps) {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2 font-mono">
              <BookOpen className="h-4 w-4" />
              <span>Core Knowledge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Trending Topics
            </h2>
          </div>
          <Link href="/knowledge" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 mt-4 md:mt-0 transition-colors">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {docs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No knowledge articles published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {docs.map((doc) => (
              <Link key={doc.id} href={`/knowledge/${(doc.category as { slug?: string } | null)?.slug ?? "general"}/${doc.slug}`}>
                <Card className="group h-full flex flex-col justify-between overflow-hidden border-border p-0 bg-card hover:bg-card/80 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
                  {doc.cover_image && (
                    <div className="relative h-48 w-full overflow-hidden bg-secondary">
                      <Image
                        src={doc.cover_image}
                        alt={doc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant="primary" className="capitalize backdrop-blur-md">
                          {(doc.category as { title?: string } | null)?.title ?? doc.type}
                        </Badge>
                      </div>
                      {doc.difficulty && (
                        <div className="absolute top-3 right-3">
                          <Badge difficulty={doc.difficulty as "Beginner" | "Intermediate" | "Advanced" | "Expert"} />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 mb-3">
                        <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                          {doc.title}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground line-clamp-3 mt-2">
                          {doc.description}
                        </CardDescription>
                      </CardHeader>
                    </div>

                    <CardFooter className="p-0 pt-4 mt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {(doc.author as { avatar_url?: string } | null)?.avatar_url && (
                          <Image
                            src={(doc.author as { avatar_url: string }).avatar_url}
                            alt={(doc.author as { full_name?: string } | null)?.full_name ?? "Author"}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                        )}
                        <span className="text-muted-foreground">
                          {(doc.author as { full_name?: string } | null)?.full_name ?? "SMSAAD Team"}
                        </span>
                      </div>
                      {doc.reading_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{doc.reading_time}</span>
                        </div>
                      )}
                    </CardFooter>
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
