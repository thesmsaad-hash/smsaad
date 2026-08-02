"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Headphones, Check } from "lucide-react";

export default function AdminNewContentPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [type, setType] = React.useState<"knowledge" | "workflow" | "news">("knowledge");
  const [status, setStatus] = React.useState<"Published" | "Draft" | "Archived">("Published");
  const [description, setDescription] = React.useState("");
  const [body, setBody] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [audioUrl, setAudioUrl] = React.useState("");

  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")) {
      setSlug(val.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("content")
        .insert({
          title,
          slug,
          type,
          status,
          description,
          body,
          cover_image: coverImage || null,
          audio_url: audioUrl || null,
          author_id: user?.id || null,
          published_at: status === "Published" ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error) {
        setErrorMsg(error.message);
      } else {
        // Trigger broadcast email notification to all subscribers
        try {
          await fetch("/api/admin/broadcast-post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              slug,
              type,
              description,
            }),
          });
        } catch (e) {
          console.error("Broadcast trigger failed", e);
        }

        router.push("/admin/content");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create content");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/admin/content"
        className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Content List</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Create New Content Item</h1>
        <p className="text-xs text-[#A1A1AA]">Publish knowledge articles, production workflows, or news updates.</p>
      </div>

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
                onChange={handleTitleChange}
                placeholder="e.g. Latent Diffusion Sampling Math"
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
                placeholder="latent-diffusion-sampling-math"
                required
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2.5 text-sm text-white font-mono focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
              Summary / Abstract Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="First-principles breakdown of..."
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
            {audioUrl && (
              <div className="pt-2 border-t border-[#7C3AED]/20">
                <span className="text-[10px] font-mono uppercase text-[#22D3EE] font-bold block mb-1">
                  Live Audio Player Preview:
                </span>
                <audio controls src={audioUrl} className="w-full h-10 rounded-xl" />
              </div>
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
                  className="w-full text-xs text-[#A1A1AA] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#111827] file:text-[#A1A1AA] hover:file:bg-[#27272A] cursor-pointer"
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
              placeholder="## Introduction..."
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
          <span>{isSaving ? "Publishing Content..." : "Publish Content"}</span>
        </button>
      </form>
    </div>
  );
}
