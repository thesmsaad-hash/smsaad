"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Trash2, Headphones, Sparkles, Check } from "lucide-react";

export default function AdminEditContentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const supabase = createClient();

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [type, setType] = React.useState<"knowledge" | "workflow" | "news">("knowledge");
  const [status, setStatus] = React.useState<"Published" | "Draft" | "Archived">("Published");
  const [description, setDescription] = React.useState("");
  const [body, setBody] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [audioUrl, setAudioUrl] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("Intermediate");
  const [readingTime, setReadingTime] = React.useState("8 min read");

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadItem() {
      if (!id) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("content")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setErrorMsg(error.message);
        } else if (data) {
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setType(data.type || "knowledge");
          setStatus(data.status || "Published");
          setDescription(data.description || "");
          setBody(data.body || "");
          setCoverImage(data.cover_image || "");
          setAudioUrl(data.audio_url || "");
          setDifficulty(data.difficulty || "Intermediate");
          setReadingTime(data.reading_time || "8 min read");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadItem();
  }, [id, supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase
        .from("content")
        .update({
          title,
          slug,
          type,
          status,
          description,
          body,
          cover_image: coverImage || null,
          audio_url: audioUrl || null,
          difficulty,
          reading_time: readingTime,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Content updated successfully!");
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update content");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this content item? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase.from("content").delete().eq("id", id);
      if (error) {
        setErrorMsg(error.message);
        setIsDeleting(false);
      } else {
        router.push("/admin/content");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete content");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-[#A1A1AA] font-mono text-sm">
        Loading content editor...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Content List</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={async () => {
              try {
                const res = await fetch("/api/admin/broadcast-post", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ title, slug, type, description }),
                });
                const data = await res.json();
                if (data.success) {
                  alert(`Broadcast email sent to ${data.recipientsCount} subscribers!`);
                } else {
                  alert(`Broadcast error: ${data.error}`);
                }
              } catch (e: any) {
                alert(`Error: ${e.message}`);
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-4 py-2 text-xs font-semibold text-[#22D3EE] hover:bg-[#7C3AED]/30 transition-all cursor-pointer"
          >
            <span>📧 Send Email to Subscribers</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-900/50 transition-all cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>{isDeleting ? "Deleting..." : "Delete Content"}</span>
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">Edit Content Item</h1>
        <p className="text-xs text-[#A1A1AA] font-mono mt-1">ID: {id}</p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <Check className="h-5 w-5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl border border-red-900/50 bg-red-950/30 text-red-400 text-sm font-mono">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2.5 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2.5 text-sm text-white font-mono focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-3 py-2 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
              >
                <option value="knowledge">Knowledge Article</option>
                <option value="workflow">Workflow</option>
                <option value="news">News Item</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-3 py-2 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Difficulty Level
              </label>
              <input
                type="text"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
              Summary / Abstract Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] p-4 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          {/* Audio File Upload & Stream Link */}
          <div className="p-5 rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-[#22D3EE] font-bold flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Podcast Audio Overview File / Stream URL</span>
              </label>

              {audioUrl && (
                <button
                  type="button"
                  onClick={() => setAudioUrl("")}
                  className="text-xs font-mono text-red-400 hover:underline cursor-pointer font-bold"
                >
                  Remove Audio
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Local File Upload Button */}
              <div>
                <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase mb-1.5">
                  Upload MP3 / Audio File
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setAudioUrl(event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-xs text-[#A1A1AA] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#7C3AED] file:text-white hover:file:bg-[#7C3AED]/90 cursor-pointer"
                />
              </div>

              {/* Or Paste Audio URL */}
              <div>
                <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase mb-1.5">
                  Or Paste External Audio Stream URL
                </label>
                <input
                  type="url"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="https://example.com/podcast.mp3"
                  className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2 text-xs font-mono text-white placeholder-[#71717A] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </div>

            {/* Live Audio Preview */}
            {audioUrl ? (
              <div className="pt-2 border-t border-[#7C3AED]/20">
                <span className="text-[10px] font-mono uppercase text-[#22D3EE] font-bold block mb-1">
                  Live Audio Player Preview:
                </span>
                <audio controls src={audioUrl} className="w-full h-10 rounded-xl" />
              </div>
            ) : (
              <p className="text-[11px] text-[#A1A1AA]">
                Leave empty to automatically synthesize speech using browser neural TTS on the detail page.
              </p>
            )}
          </div>

          {/* Cover Image Upload & URL */}
          <div className="p-4 rounded-xl border border-[#27272A] bg-[#1F2937]/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                Cover Image File / URL
              </label>
              {coverImage && (
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="text-xs font-mono text-red-400 hover:underline cursor-pointer"
                >
                  Remove Image
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase mb-1">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setCoverImage(event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-xs text-[#A1A1AA] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#111827] file:text-white hover:file:bg-[#27272A] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase mb-1">
                  Or Paste Image URL
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2 text-xs font-mono text-white focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </div>

            {/* Cover Image Preview */}
            {coverImage && (
              <div className="pt-2">
                <img src={coverImage} alt="Cover Preview" className="h-32 w-full object-cover rounded-xl border border-[#27272A]" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
              Body Content (Markdown)
            </label>
            <textarea
              rows={14}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] p-4 text-sm font-mono text-white focus:border-[#7C3AED] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3 text-sm font-bold text-white hover:bg-[#7C3AED]/90 transition-all cursor-pointer shadow-lg shadow-[#7C3AED]/20"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? "Saving Changes..." : "Save Content Changes"}</span>
        </button>
      </form>
    </div>
  );
}
