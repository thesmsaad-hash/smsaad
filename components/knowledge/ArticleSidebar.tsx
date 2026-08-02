"use client";

import * as React from "react";
import { BookOpen, Bookmark, Share2, Check, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleSidebarProps {
  articleId: string;
  articleTitle: string;
  articleSlug: string;
  categorySlug: string;
  bodyMarkdown: string | null;
}

export function ArticleSidebar({
  articleId,
  articleTitle,
  articleSlug,
  categorySlug,
  bodyMarkdown,
}: ArticleSidebarProps) {
  const supabase = createClient();

  // TOC headings
  const [headings, setHeadings] = React.useState<TocItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = React.useState<string>("");

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  // Share state
  const [isCopied, setIsCopied] = React.useState(false);

  // Parse markdown headings for TOC
  React.useEffect(() => {
    if (!bodyMarkdown) return;

    const matches: TocItem[] = [];
    const headingRegex = /^(#{2,3})\s+(.*)$/gm;
    let match;

    while ((match = headingRegex.exec(bodyMarkdown)) !== null) {
      const level = match[1].length; // 2 for h2, 3 for h3
      const rawText = match[2].trim();
      const id = rawText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      matches.push({ id, text: rawText, level });
    }

    setHeadings(matches);
  }, [bodyMarkdown]);

  // Check auth & initial bookmark status
  React.useEffect(() => {
    async function checkBookmark() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) return;

      setUser(currentUser);

      const { data: bookmark } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", currentUser.id)
        .eq("item_id", articleId)
        .single();

      if (bookmark) {
        setIsBookmarked(true);
      }
    }

    checkBookmark();
  }, [supabase, articleId]);

  // Intersection observer for active heading
  React.useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleToggleBookmark = async () => {
    if (!user) {
      alert("Please sign in to save bookmarks to your profile.");
      return;
    }

    setIsBookmarkLoading(true);

    try {
      if (isBookmarked) {
        // Delete bookmark
        await supabase
          .from("bookmarks")
          .delete()
          .match({ user_id: user.id, item_id: articleId });
        setIsBookmarked(false);
      } else {
        // Insert bookmark
        await supabase.from("bookmarks").insert({
          user_id: user.id,
          item_type: "content",
          item_id: articleId,
        });
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    } catch (err) {
      console.error("Share copy error:", err);
    }
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Auto-generated Table of Contents */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-4 font-mono">
          <BookOpen className="h-4 w-4" />
          <span>On This Page</span>
        </div>

        {headings.length === 0 ? (
          <p className="text-xs text-muted-foreground">No sections outlined for this article.</p>
        ) : (
          <nav className="space-y-1.5 text-xs">
            {headings.map((h) => {
              const isActive = activeHeadingId === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => scrollToHeading(h.id)}
                  className={`block w-full text-left transition-all line-clamp-1 py-1 rounded-md px-2 ${
                    h.level === 3 ? "pl-5 text-[11px]" : "font-medium"
                  } ${
                    isActive
                      ? "text-accent bg-accent/10 font-bold border-l-2 border-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {h.text}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Share & Bookmark Actions */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-2 shadow-md">
        <button
          onClick={handleToggleBookmark}
          disabled={isBookmarkLoading}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-semibold transition-all cursor-pointer ${
            isBookmarked
              ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-400 shadow-md shadow-emerald-950/50"
              : "border-border bg-background text-foreground hover:border-primary hover:bg-secondary"
          }`}
        >
          {isBookmarked ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Bookmarked</span>
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4 text-primary" />
              <span>{isBookmarkLoading ? "Saving..." : "Bookmark Spec"}</span>
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-semibold transition-all cursor-pointer ${
            isCopied
              ? "border-accent bg-accent/20 text-accent font-bold"
              : "border-border bg-background text-foreground hover:border-accent hover:bg-secondary"
          }`}
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4 text-accent" />
              <span>Copied Link!</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 text-accent" />
              <span>Share Article</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
