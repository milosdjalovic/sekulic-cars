import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/auth";

export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
