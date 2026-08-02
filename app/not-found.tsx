import React from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background">
      <EmptyState
        variant="404"
        action={
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              <span>Return to Knowledge Home</span>
            </Button>
          </Link>
        }
      />
    </div>
  );
}
