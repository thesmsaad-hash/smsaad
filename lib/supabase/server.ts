import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// SUPABASE_URL / SUPABASE_ANON_KEY (no NEXT_PUBLIC_ prefix) are runtime env vars
// accessible via Cloudflare Workers bindings at runtime — they are NOT baked at
// build time by webpack, so they always reflect the value set in Cloudflare's
// Variables and Secrets panel.
function getSupabaseConfig() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://yjitwxzncizajpzaehur.supabase.co";

  const anonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_TWjoDC1RdnhFZgs-f8bA7Q_Ama3QW30";

  return { url, anonKey };
}

export async function createClient() {
  const { url, anonKey } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component cookie setting guard
        }
      },
    },
  });
}

export function createPublicClient() {
  const { url, anonKey } = getSupabaseConfig();
  return createSupabaseClient(url, anonKey);
}
