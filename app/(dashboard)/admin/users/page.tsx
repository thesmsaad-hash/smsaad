"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, Shield, UserCheck, Search, Check, RefreshCw } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "admin" | "editor" | "reader";
  created_at: string;
}

export default function AdminUsersPage() {
  const supabase = createClient();

  const [profiles, setProfiles] = React.useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setProfiles(data as UserProfile[]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: "admin" | "editor" | "reader") => {
    setUpdatingId(userId);
    setSuccessMsg(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) {
        console.error("Role update error:", error);
      } else {
        setProfiles((prev) =>
          prev.map((p) => (p.id === userId ? { ...p, role: newRole } : p))
        );
        setSuccessMsg("User role updated successfully!");
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProfiles = profiles.filter((p) => {
    const matchesSearch =
      (p.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || p.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsers = profiles.length;
  const adminCount = profiles.filter((p) => p.role === "admin").length;
  const editorCount = profiles.filter((p) => p.role === "editor").length;
  const readerCount = profiles.filter((p) => p.role === "reader").length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-[#7C3AED]" />
            <span>User Management</span>
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            View registered user profiles, search accounts, and assign permissions.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#111827] px-4 py-2 text-xs font-semibold text-white hover:border-[#7C3AED] transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-[#7C3AED]" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-[#27272A] bg-[#111827]">
          <div className="text-xs font-mono text-[#A1A1AA] uppercase">Total Accounts</div>
          <div className="text-2xl font-bold text-white mt-1">{totalUsers}</div>
        </div>
        <div className="p-5 rounded-2xl border border-[#27272A] bg-[#111827]">
          <div className="text-xs font-mono text-[#7C3AED] uppercase">Admins</div>
          <div className="text-2xl font-bold text-[#7C3AED] mt-1">{adminCount}</div>
        </div>
        <div className="p-5 rounded-2xl border border-[#27272A] bg-[#111827]">
          <div className="text-xs font-mono text-[#22D3EE] uppercase">Editors</div>
          <div className="text-2xl font-bold text-[#22D3EE] mt-1">{editorCount}</div>
        </div>
        <div className="p-5 rounded-2xl border border-[#27272A] bg-[#111827]">
          <div className="text-xs font-mono text-emerald-400 uppercase">Readers</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{readerCount}</div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <Check className="h-5 w-5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] pl-9 pr-4 py-2 text-xs text-white placeholder-[#A1A1AA] focus:border-[#7C3AED] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#A1A1AA]">Role Filter:</span>
          {["all", "admin", "editor", "reader"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg font-mono uppercase text-[10px] transition-all cursor-pointer ${
                roleFilter === role
                  ? "bg-[#7C3AED] text-white font-bold"
                  : "border border-[#27272A] bg-[#111827] text-[#A1A1AA] hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#111827] rounded-2xl border border-[#27272A] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs uppercase bg-[#1F2937] border-b border-[#27272A] text-[#A1A1AA] font-mono">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">User</th>
                <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                <th scope="col" className="px-6 py-4 font-semibold">Current Role</th>
                <th scope="col" className="px-6 py-4 font-semibold">Joined Date</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#A1A1AA]">
                    Loading user accounts...
                  </td>
                </tr>
              )}

              {!isLoading && filteredProfiles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#A1A1AA]">
                    No user accounts match your search filters.
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredProfiles.map((p) => {
                  const initials = (p.full_name || p.email || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <tr key={p.id} className="hover:bg-[#1F2937]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.avatar_url ? (
                            <img
                              src={p.avatar_url}
                              alt={p.full_name || p.email}
                              className="h-9 w-9 rounded-full object-cover border border-[#7C3AED]/40"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/50 flex items-center justify-center text-xs font-bold text-[#7C3AED]">
                              {initials}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white">{p.full_name || "Anonymous User"}</div>
                            <div className="text-[10px] text-[#A1A1AA] font-mono">{p.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs font-mono text-[#A1A1AA]">
                        {p.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
                            p.role === "admin"
                              ? "bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/40"
                              : p.role === "editor"
                              ? "bg-cyan-950/40 text-[#22D3EE] border-cyan-500/40"
                              : "bg-emerald-950/40 text-emerald-400 border-emerald-500/40"
                          }`}
                        >
                          <Shield className="h-3 w-3" />
                          <span className="capitalize">{p.role}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-[#A1A1AA]">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <select
                          value={p.role}
                          disabled={updatingId === p.id}
                          onChange={(e) =>
                            handleRoleChange(p.id, e.target.value as "admin" | "editor" | "reader")
                          }
                          className="rounded-xl border border-[#27272A] bg-[#1F2937] px-3 py-1.5 text-xs text-white font-mono focus:border-[#7C3AED] focus:outline-none cursor-pointer"
                        >
                          <option value="reader">Reader</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
