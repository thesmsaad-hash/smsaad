"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { Sliders, Shield, Database, Save, Check, Globe, Mail, Key } from "lucide-react";

export default function AdminSettingsPage() {
  const supabase = createClient();

  const [siteName, setSiteName] = React.useState("SMSAAD Platform 2.0");
  const [siteTagline, setSiteTagline] = React.useState("Documentation-First AI Filmmaking & Creative Tech");
  const [supportEmail, setSupportEmail] = React.useState("smsaad05082003@gmail.com");
  const [allowRegistration, setAllowRegistration] = React.useState(true);
  const [enableGoogleAuth, setEnableGoogleAuth] = React.useState(true);
  const [enableGithubAuth, setEnableGithubAuth] = React.useState(true);

  const [isSaving, setIsSaving] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  // Load existing settings if available
  React.useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from("settings").select("*");
      if (data && data.length > 0) {
        data.forEach((row: any) => {
          if (row.key === "general") {
            setSiteName(row.value?.siteName || siteName);
            setSiteTagline(row.value?.siteTagline || siteTagline);
            setSupportEmail(row.value?.supportEmail || supportEmail);
          } else if (row.key === "auth") {
            setAllowRegistration(row.value?.allowRegistration ?? true);
            setEnableGoogleAuth(row.value?.enableGoogleAuth ?? true);
            setEnableGithubAuth(row.value?.enableGithubAuth ?? true);
          }
        });
      }
    }
    loadSettings();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);

    try {
      await Promise.all([
        supabase.from("settings").upsert(
          {
            key: "general",
            value: { siteName, siteTagline, supportEmail },
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        ),
        supabase.from("settings").upsert(
          {
            key: "auth",
            value: { allowRegistration, enableGoogleAuth, enableGithubAuth },
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        ),
      ]);

      setSuccessMsg("Platform settings saved successfully!");
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sliders className="h-6 w-6 text-[#7C3AED]" />
          <span>System Settings</span>
        </h1>
        <p className="text-[#A1A1AA] text-sm">
          Configure platform defaults, security rules, and Supabase integration params.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <Check className="h-5 w-5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#27272A] pb-3">
            <Globe className="h-4 w-4 text-[#22D3EE]" />
            <span>General Platform Preferences</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2.5 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Support / Admin Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2.5 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
              Site Tagline / Default Metadata Description
            </label>
            <input
              type="text"
              value={siteTagline}
              onChange={(e) => setSiteTagline(e.target.value)}
              className="w-full rounded-xl border border-[#27272A] bg-[#1F2937] px-4 py-2.5 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
            />
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#27272A] pb-3">
            <Shield className="h-4 w-4 text-[#7C3AED]" />
            <span>Authentication &amp; User Rules</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="h-4 w-4 rounded border-[#27272A] bg-[#1F2937] text-[#7C3AED] focus:ring-0"
              />
              <div>
                <span className="text-sm font-semibold text-white">Allow New User Registration</span>
                <p className="text-xs text-[#A1A1AA]">When checked, public sign-ups are enabled on /register.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableGoogleAuth}
                onChange={(e) => setEnableGoogleAuth(e.target.checked)}
                className="h-4 w-4 rounded border-[#27272A] bg-[#1F2937] text-[#7C3AED] focus:ring-0"
              />
              <div>
                <span className="text-sm font-semibold text-white">Enable Google OAuth Sign-In</span>
                <p className="text-xs text-[#A1A1AA]">Allows users to log in directly using Google credentials.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableGithubAuth}
                onChange={(e) => setEnableGithubAuth(e.target.checked)}
                className="h-4 w-4 rounded border-[#27272A] bg-[#1F2937] text-[#7C3AED] focus:ring-0"
              />
              <div>
                <span className="text-sm font-semibold text-white">Enable GitHub OAuth Sign-In</span>
                <p className="text-xs text-[#A1A1AA]">Allows developers to authenticate via GitHub OAuth flow.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Database Info */}
        <div className="rounded-2xl border border-[#27272A] bg-[#111827] p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#27272A] pb-3">
            <Database className="h-4 w-4 text-emerald-400" />
            <span>Live Database Connection Status</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl border border-[#27272A] bg-[#1F2937] space-y-1">
              <span className="text-[#A1A1AA] uppercase">Project Reference ID</span>
              <div className="text-white font-bold">yjitwxzncizajpzaehur</div>
            </div>
            <div className="p-3 rounded-xl border border-[#27272A] bg-[#1F2937] space-y-1">
              <span className="text-[#A1A1AA] uppercase">Supabase Region</span>
              <div className="text-emerald-400 font-bold">Connected (Active SQL)</div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3 text-sm font-bold text-white hover:bg-[#7C3AED]/90 transition-all cursor-pointer shadow-lg shadow-[#7C3AED]/20"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? "Saving Settings..." : "Save System Settings"}</span>
        </button>
      </form>
    </div>
  );
}
