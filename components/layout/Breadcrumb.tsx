import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-[#A1A1AA] py-2 overflow-x-auto">
      <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 shrink-0">
          <ChevronRight className="h-3.5 w-3.5 text-[#71717A]" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors capitalize">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium capitalize truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
