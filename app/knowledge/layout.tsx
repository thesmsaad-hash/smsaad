import React from "react";
import { KnowledgeSidebar } from "@/components/layout/KnowledgeSidebar";

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <KnowledgeSidebar />
        <div className="flex-1 min-w-0 py-8 lg:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
