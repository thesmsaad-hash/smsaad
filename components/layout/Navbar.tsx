"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, Sparkles, Menu, X, BookOpen, ChevronDown, User, LogOut, LayoutDashboard, Settings, Cpu, Layers, Package, User as UserIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CommandPalette } from "@/components/search/CommandPalette";
import { clsx } from "clsx";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Auth State
  const supabase = createClient();
  const [user, setUser] = React.useState<any>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [userInitial, setUserInitial] = React.useState<string>("U");

  // Animated placeholder text for search trigger
  const placeholders = [
    "Search Knowledge, Tools, Workflows...",
    "Search Diffusion Models...",
    "Search ComfyUI Node Math...",
    "Search Camera Tracking & VFX...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch current authenticated user & listen for changes
  React.useEffect(() => {
    async function loadUser() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
        const name = currentUser.user_metadata?.full_name || currentUser.email || "U";
        setUserInitial(name.charAt(0).toUpperCase());

        // Check profiles table for avatar
        const { data: profile } = await supabase
          .from("profiles")
          .select("avatar_url, full_name")
          .eq("id", currentUser.id)
          .single();

        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        } else if (currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture) {
          setAvatarUrl(currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture);
        }
      } else {
        setUser(null);
      }
    }

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const name = session.user.user_metadata?.full_name || session.user.email || "U";
        setUserInitial(name.charAt(0).toUpperCase());
      } else {
        setUser(null);
        setAvatarUrl(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const navLinks = [
    { href: "/knowledge", label: "Knowledge", icon: BookOpen },
    { href: "/tools", label: "Tools", icon: Cpu },
    { href: "/workflows", label: "Workflows", icon: Layers },
    { href: "/news", label: "News", icon: Sparkles },
    { href: "/about", label: "About", icon: Package },
  ];

  return (
    <>
      <header 
        className={clsx(
          "fixed top-0 z-40 w-full transition-all duration-300",
          isScrolled 
            ? "glass-nav shadow-md shadow-black/20"
            : "bg-background/80 backdrop-blur-sm border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="h-10 w-10 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                SMSAAD
              </span>
              <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-mono -mt-1 font-medium">
                Platform 2.0
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 ml-8 mr-auto">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "px-3.5 py-2 text-sm font-medium rounded-xl transition-all",
                    isActive
                      ? "text-foreground bg-card border border-border shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger Buttons */}
          <div className="flex items-center gap-3">
            {/* Cmd+K Search Bar Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all shadow-sm w-80"
            >
              <Search className="h-4 w-4 text-primary shrink-0" />
              <span className="flex-1 text-left truncate transition-all duration-500">
                {placeholders[placeholderIndex]}
              </span>
              <kbd className="inline-flex items-center rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
                ⌘K
              </kbd>
            </button>
            
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Auth/User Actions */}
            {user ? (
              <Link href="/dashboard" className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full border-2 border-primary/60 hover:border-primary transition-colors overflow-hidden relative shadow-md">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="User Avatar" fill className="object-cover" unoptimized={avatarUrl.startsWith("http")} />
                ) : (
                  <div className="h-full w-full bg-[#7C3AED] text-white font-bold flex items-center justify-center text-sm font-heading">
                    {userInitial}
                  </div>
                )}
              </Link>
            ) : (
              <Link href="/login" className="hidden sm:inline-block">
                <Button variant="outline" size="sm" className="gap-1.5 border-border hover:border-primary">
                  <UserIcon className="h-3.5 w-3.5 text-accent" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-xl border border-border bg-card p-2 text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 text-base font-medium text-foreground hover:bg-card hover:text-primary transition-colors"
              >
                {link.icon && <link.icon className="h-4 w-4 text-primary" />}
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-4">
              <Link
                href={user ? "/dashboard" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
              >
                <UserIcon className="h-4 w-4" />
                <span>{user ? "User Dashboard" : "Sign In / Register"}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
