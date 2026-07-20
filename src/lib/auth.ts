import type { AuthError } from "@supabase/supabase-js";

export function mapAuthError(error: AuthError): string {
  const message = error.message.toLowerCase();

  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid email or password")
  ) {
    return "Pogrešan email ili lozinka. Proverite podatke i pokušajte ponovo.";
  }

  if (message.includes("email not confirmed")) {
    return "Email nije potvrđen. U Supabase Dashboard → Authentication → Users kliknite na korisnika i potvrdite email, ili u Auth → Providers → Email isključite „Confirm email“.";
  }

  if (message.includes("user banned") || message.includes("user disabled")) {
    return "Nalog je onemogućen. Kontaktirajte administratora.";
  }

  if (message.includes("too many requests")) {
    return "Previše pokušaja prijave. Sačekajte nekoliko minuta i pokušajte ponovo.";
  }

  return `Greška pri prijavi: ${error.message}`;
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error(
      "Nedostaju Supabase env varijable. Proverite NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY u .env.local fajlu."
    );
  }

  if (url.includes("your-project") || anonKey.includes("your-anon-key")) {
    throw new Error(
      "Supabase env varijable nisu podešene. Zamenite placeholder vrednosti u .env.local pravim vrednostima iz Supabase Dashboard-a."
    );
  }

  return { url, anonKey };
}
