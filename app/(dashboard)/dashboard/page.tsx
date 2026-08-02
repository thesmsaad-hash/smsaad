"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Bookmark, History, Settings, ArrowRight, Trash2, LogOut, Shield, User as UserIcon, Check, Sparkles, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: "admin" | "editor" | "reader" | string;
  created_at: string;
}

interface BookmarkItem {
  id: string;
  title: string;
  category: string;
  url: string;
  date: string;
}

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  progress_percent: number;
  last_read_at: string;
}

export default function UserDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = React.useState<"bookmarks" | "history" | "settings">("bookmarks");

  // Profile Edit Form State
  const [fullNameInput, setFullNameInput] = React.useState("");
  const [avatarInput, setAvatarInput] = React.useState("");
  const [bioInput, setBioInput] = React.useState("");
  const [isSavingProfile, setIsSavingProfile] = React.useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = React.useState<string | null>(null);

  // Bookmarks & History State
  const [bookmarks, setBookmarks] = React.useState<BookmarkItem[]>([]);
  const [readingHistory, setReadingHistory] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    async function loadUserData() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        if (!currentUser) {
          router.push("/login");
          return;
        }

        setUser(currentUser);

        // Fetch user profile from Supabase profiles table
        const { data: userProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (userProfile) {
          setProfile(userProfile);
          setFullNameInput(userProfile.full_name || currentUser.user_metadata?.full_name || "");
          setAvatarInput(userProfile.avatar_url || currentUser.user_metadata?.avatar_url || "");
          setBioInput(userProfile.bio || "");
        } else {
          setFullNameInput(currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || "");
          setAvatarInput(currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || "");
        }

        // Fetch live user bookmarks with item resolution
        const { data: dbBookmarks } = await supabase
          .from("bookmarks")
          .select("id, item_type, item_id, created_at")
          .eq("user_id", currentUser.id);

        if (dbBookmarks && dbBookmarks.length > 0) {
          const resolvedBookmarks = await Promise.all(
            dbBookmarks.map(async (b: any) => {
              let title = `Saved ${b.item_type}`;
              let url = "/knowledge";
              let category = (b.item_type || "CONTENT").toUpperCase();

              if (b.item_type === "content" || b.item_type === "knowledge") {
                const { data: contentItem } = await supabase
                  .from("content")
                  .select("title, slug, type, category:categories(slug)")
                  .eq("id", b.item_id)
                  .single();

                if (contentItem) {
                  title = contentItem.title;
                  category = (contentItem.type || "KNOWLEDGE").toUpperCase();
                  const catSlug = (contentItem.category as any)?.slug ?? "general";
                  url = `/knowledge/${catSlug}/${contentItem.slug}`;
                }
              } else if (b.item_type === "tool") {
                const { data: toolItem } = await supabase
                  .from("tools")
                  .select("name, slug, category")
                  .eq("id", b.item_id)
                  .single();

                if (toolItem) {
                  title = toolItem.name;
                  category = "TOOL";
                  url = `/tools/${toolItem.slug}`;
                }
              }

              return {
                id: b.id,
                title,
                category,
                url,
                date: new Date(b.created_at).toLocaleDateString(),
              };
            })
          );

          setBookmarks(resolvedBookmarks);
        } else {
          setBookmarks([]);
        }

        // Fetch live reading history
        const { data: dbHistory } = await supabase
          .from("reading_history")
          .select("id, content_id, progress_percent, last_read_at, content:content(title, slug, type)")
          .eq("user_id", currentUser.id);

        if (dbHistory && dbHistory.length > 0) {
          setReadingHistory(
            dbHistory.map((h: any) => ({
              id: h.id,
              title: h.content?.title || "Article Spec",
              url: `/knowledge/general/${h.content?.slug || ""}`,
              progress_percent: h.progress_percent || 0,
              last_read_at: new Date(h.last_read_at).toLocaleDateString(),
            }))
          );
        } else {
          setReadingHistory([]);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [supabase, router]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSavingProfile(true);
    setSaveSuccessMsg(null);

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        full_name: fullNameInput,
        avatar_url: avatarInput,
        bio: bioInput,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Profile save error:", error);
      } else {
        setProfile((prev) =>
          prev
            ? { ...prev, full_name: fullNameInput, avatar_url: avatarInput, bio: bioInput }
            : {
                id: user.id,
                email: user.email,
                full_name: fullNameInput,
                avatar_url: avatarInput,
                bio: bioInput,
                role: "reader",
                created_at: new Date().toISOString(),
              }
        );
        setSaveSuccessMsg("Profile updated successfully!");
        setTimeout(() => setSaveSuccessMsg(null), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const removeBookmark = async (id: string) => {
    if (!user) return;
    setBookmarks(bookmarks.filter((b) => b.id !== id));
    await supabase.from("bookmarks").delete().match({ id, user_id: user.id });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // User details with fallbacks
  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Authenticated User";

  const displayEmail = profile?.email || user?.email || "";

  const avatarUrl =
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

  const userInitial = displayName.charAt(0).toUpperCase();
  const userRole = profile?.role || user?.user_metadata?.role || "reader";

  const memberSinceDate = profile?.created_at || user?.created_at;
  const memberSinceFormatted = memberSinceDate
    ? new Date(memberSinceDate).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  if (loading) {
    return (
      <div className="py-24 bg-[#09090B] min-h-screen text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[#A1A1AA] font-mono">
          <div className="h-4 w-4 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
          <span>Loading user profile &amp; activity...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#09090B] min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "User Dashboard" }]} />

        {/* User Header Profile Card */}
        <div className="mt-6 rounded-2xl border border-[#27272A] bg-[#111827] p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-[#7C3AED] bg-[#1E293B] shrink-0 shadow-md">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    fill
                    className="object-cover"
                    unoptimized={avatarUrl.startsWith("http")}
                  />
                ) : (
                  <div className="h-full w-full bg-[#7C3AED] text-white font-bold flex items-center justify-center text-xl font-heading">
                    {userInitial}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-heading capitalize">
                  {displayName}
                </h1>
                <p className="text-xs text-[#A1A1AA] font-mono">{displayEmail}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="primary" className="capitalize">
                    {userRole === "admin"
                      ? "Admin"
                      : userRole === "editor"
                      ? "Editor"
                      : "Pro Engineer"}
                  </Badge>
                  <span className="text-[10px] text-[#71717A] font-mono">
                    Member since {memberSinceFormatted}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {(userRole === "admin" || userRole === "editor") && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="gap-2 border-[#7C3AED]/40 text-[#C084FC]">
                    <Shield className="h-3.5 w-3.5 text-[#7C3AED]" />
                    <span>Admin CMS</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2 border-[#27272A] hover:bg-[#1E293B] text-[#A1A1AA] hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5 text-rose-400" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {profile?.bio && (
            <p className="mt-4 pt-4 border-t border-[#27272A] text-xs text-[#A1A1AA] max-w-2xl leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Tabs Bar */}
        <div className="mt-8 flex items-center gap-3 border-b border-[#27272A] pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "bookmarks"
                ? "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20"
                : "bg-[#111827] text-[#A1A1AA] border border-[#27272A] hover:text-white"
            }`}
          >
            <Bookmark className="h-4 w-4 text-[#22D3EE]" />
            <span>Saved Bookmarks ({bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "history"
                ? "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20"
                : "bg-[#111827] text-[#A1A1AA] border border-[#27272A] hover:text-white"
            }`}
          >
            <History className="h-4 w-4 text-purple-400" />
            <span>Reading History ({readingHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20"
                : "bg-[#111827] text-[#A1A1AA] border border-[#27272A] hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4 text-amber-400" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Bookmarks Tab Content */}
        {activeTab === "bookmarks" && (
          <div className="mt-8 space-y-4 animate-in fade-in duration-200">
            {bookmarks.length === 0 ? (
              <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-12 text-center space-y-4">
                <Bookmark className="h-10 w-10 text-[#7C3AED]/50 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-white">No Bookmarks Saved Yet</h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 max-w-md mx-auto">
                    You haven&apos;t saved any articles or tools to your personal library. Explore the Knowledge Hub to start bookmarking!
                  </p>
                </div>
                <Link href="/knowledge">
                  <Button size="sm" className="gap-2 bg-[#7C3AED] hover:bg-[#7C3AED]/90 mt-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Explore Knowledge Base</span>
                  </Button>
                </Link>
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="flex items-center justify-between rounded-2xl border border-[#27272A] bg-[#111827] p-5 transition-all hover:border-[#7C3AED]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" className="text-[10px]">
                        {bm.category}
                      </Badge>
                      <span className="text-[10px] text-[#71717A] font-mono">Saved {bm.date}</span>
                    </div>
                    <Link
                      href={bm.url}
                      className="font-bold text-base text-white hover:text-[#22D3EE] transition-colors"
                    >
                      {bm.title}
                    </Link>
                  </div>
                  <button
                    onClick={() => removeBookmark(bm.id)}
                    className="rounded-xl border border-[#27272A] bg-[#09090B] p-2 text-[#71717A] hover:text-rose-400 hover:border-rose-500/50 cursor-pointer transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="mt-8 space-y-4 animate-in fade-in duration-200">
            {readingHistory.length === 0 ? (
              <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-12 text-center space-y-4">
                <History className="h-10 w-10 text-purple-400/50 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-white">No Reading History</h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 max-w-md mx-auto">
                    Your recently viewed technical documentation and workflow specs will automatically be logged here.
                  </p>
                </div>
                <Link href="/knowledge">
                  <Button size="sm" className="gap-2 bg-[#7C3AED] hover:bg-[#7C3AED]/90 mt-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Browse Articles</span>
                  </Button>
                </Link>
              </div>
            ) : (
              readingHistory.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#27272A] bg-[#111827] p-5 flex items-center justify-between">
                  <div>
                    <Link href={item.url} className="font-bold text-base text-white hover:text-[#22D3EE] transition-colors">
                      {item.title}
                    </Link>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">
                      Progress: {item.progress_percent}% • Last read {item.last_read_at}
                    </div>
                  </div>
                  <Badge variant="accent">Read</Badge>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="mt-8 rounded-2xl border border-[#27272A] bg-[#111827] p-8 space-y-6 max-w-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Edit Profile &amp; Preferences
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Update your public display name, avatar URL, and bio saved in Supabase.
                </p>
              </div>
            </div>

            {saveSuccessMsg && (
              <div className="flex items-center gap-2 p-3 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 rounded-xl font-mono">
                <Check className="h-4 w-4" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#A1A1AA]">
                  Display Name
                </label>
                <Input
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                  placeholder="Sm Saad"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#A1A1AA]">
                  Avatar Image URL
                </label>
                <Input
                  value={avatarInput}
                  onChange={(e) => setAvatarInput(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#A1A1AA]">
                  Professional Bio
                </label>
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows={3}
                  placeholder="AI filmmaker and pipeline engineer specializing in Latent Diffusion..."
                  className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  isLoading={isSavingProfile}
                  className="gap-2 bg-[#7C3AED] hover:bg-[#7C3AED]/90"
                >
                  <Check className="h-4 w-4" />
                  <span>Save Profile Changes</span>
                </Button>
              </div>
            </form>

            <div className="pt-6 border-t border-[#27272A] space-y-4 text-sm text-[#D4D4D8]">
              <h4 className="text-xs font-mono uppercase text-[#A1A1AA]">Account Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-[#71717A]">User ID</div>
                  <div className="text-white mt-0.5 truncate">{user?.id || "N/A"}</div>
                </div>
                <div>
                  <div className="text-[#71717A]">Auth Provider</div>
                  <div className="text-[#22D3EE] mt-0.5 capitalize">
                    {user?.app_metadata?.provider || "Email"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
