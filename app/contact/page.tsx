"use client";

import * as React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("All fields are required.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit message.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred.");
    }
  };

  return (
    <div className="py-12 bg-[#09090B] min-h-screen text-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Contact Us" }]} />

        <div className="mt-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 text-[#7C3AED] mb-4 glow-purple">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-white font-heading">
            Get In Touch With Engineers
          </h1>
          <p className="mt-2 text-base text-[#A1A1AA]">
            Have questions about a technical specification, ComfyUI node math, or enterprise team support? Send us a direct message.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-[#27272A] bg-[#111827] p-8 space-y-6 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase font-mono text-[#A1A1AA]">
                Your Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Christopher Nolan"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase font-mono text-[#A1A1AA]">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="director@studio.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase font-mono text-[#A1A1AA]">
              Subject
            </label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Question regarding 3D Gaussian Splatting Integration"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase font-mono text-[#A1A1AA]">
              Message
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your technical inquiry or partnership request in detail..."
              rows={5}
              required
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-rose-400 font-medium">{errorMessage}</p>
          )}

          {status === "success" ? (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-center text-sm text-emerald-400 font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Thank you! Your message has been routed to our technical leads.</span>
            </div>
          ) : (
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="w-full gap-2 shadow-lg shadow-[#7C3AED]/30"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Contact Message</span>
                </>
              )}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
