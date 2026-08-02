import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = {
  title: "Tools Manager | Admin | SMSAAD",
};

export default async function AdminToolsPage() {
  const supabase = await createClient();

  const { data: tools, error } = await supabase
    .from("tools")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tools Directory</h1>
          <p className="text-[#A1A1AA] text-sm">Manage AI models, video generators, VFX suites, and node tools.</p>
        </div>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#27272A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs uppercase bg-[#1F2937] border-b border-[#27272A] text-[#A1A1AA]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Tool Name</th>
                <th scope="col" className="px-6 py-4 font-medium">Category</th>
                <th scope="col" className="px-6 py-4 font-medium">Pricing</th>
                <th scope="col" className="px-6 py-4 font-medium">Rating</th>
                <th scope="col" className="px-6 py-4 font-medium">Date Added</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {error && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-red-400">
                    Error loading tools: {error.message}
                  </td>
                </tr>
              )}

              {!error && tools?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#A1A1AA]">
                    No tools found in directory.
                  </td>
                </tr>
              )}

              {tools?.map((tool) => (
                <tr key={tool.id} className="hover:bg-[#1F2937]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white line-clamp-1">{tool.name}</div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5 line-clamp-1 max-w-[280px]">
                      {tool.tagline}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-[#7C3AED]/20 text-[#22D3EE] border border-[#7C3AED]/40">
                      {tool.category || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-[#A1A1AA]">
                    {tool.starting_price || tool.pricing_model || "Free"}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-emerald-400">
                    ★ {tool.rating || "4.8"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-[#A1A1AA]">
                    {new Date(tool.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/tools/${tool.slug}`} className="font-medium text-[#7C3AED] hover:text-[#22D3EE] transition-colors">
                      View Spec →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
