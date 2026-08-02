"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// In a real app, this would be fetched from the DB via the `categories` table.
// We make it data-driven here so it's easy to swap out with real data later.
const KNOWLEDGE_CATEGORIES = [
  {
    title: "Artificial Intelligence",
    slug: "ai",
    items: [
      { title: "Fundamentals", slug: "fundamentals" },
      { title: "Video Generation", slug: "video-generation" },
      { title: "Prompt Engineering", slug: "prompt-engineering" },
    ],
  },
  {
    title: "Visual Effects (VFX)",
    slug: "vfx",
    items: [
      { title: "Compositing", slug: "compositing" },
      { title: "Camera Tracking", slug: "camera-tracking" },
      { title: "3D Generation", slug: "3d-generation" },
    ],
  },
  {
    title: "Filmmaking",
    slug: "filmmaking",
    items: [
      { title: "Cinematography", slug: "cinematography" },
      { title: "Lighting", slug: "lighting" },
      { title: "Virtual Production", slug: "virtual-production" },
    ],
  },
  {
    title: "Creative Technology",
    slug: "creative-technology",
    items: [
      { title: "Node Workflows", slug: "node-workflows" },
      { title: "Python Automation", slug: "python-automation" },
    ],
  },
];

export function KnowledgeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar py-8 pr-6">
      <nav className="space-y-8">
        {KNOWLEDGE_CATEGORIES.map((category) => (
          <div key={category.slug}>
            <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">
              <Link href={`/knowledge/${category.slug}`} className="hover:text-primary transition-colors">
                {category.title}
              </Link>
            </h4>
            <ul className="space-y-2 border-l border-border ml-2 pl-4">
              {category.items.map((item) => {
                const href = `/knowledge/${category.slug}/${item.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "block text-sm transition-colors",
                        isActive
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
