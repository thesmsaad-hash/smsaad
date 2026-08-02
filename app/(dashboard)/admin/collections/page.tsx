import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = {
  title: "Collections & Taxonomy | Admin | SMSAAD",
};

export default async function AdminCollectionsPage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from("categories").select("*").order("title"),
    supabase.from("tags").select("*").order("name"),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Collections &amp; Taxonomy</h1>
        <p className="text-[#A1A1AA] text-sm">Manage platform categories, topic hubs, and content tagging system.</p>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Categories &amp; Hubs</span>
          <span className="text-xs font-mono text-[#7C3AED] bg-[#7C3AED]/20 px-2 py-0.5 rounded-full border border-[#7C3AED]/30">
            {categories?.length || 0}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-xl border border-[#27272A] bg-[#111827] space-y-2 hover:border-[#7C3AED] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{cat.title}</span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">/{cat.slug}</span>
              </div>
              <p className="text-xs text-[#A1A1AA] line-clamp-2">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-4 pt-4 border-t border-[#27272A]">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Tags Index</span>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-500/30">
            {tags?.length || 0}
          </span>
        </h2>

        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1.5 rounded-xl border border-[#27272A] bg-[#111827] text-xs font-mono text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] transition-all"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
