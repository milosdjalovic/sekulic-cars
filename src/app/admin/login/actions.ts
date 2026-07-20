"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapAuthError } from "@/lib/auth";

export type LoginState = {
  error?: string;
} | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Unesite email i lozinku." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Greška pri povezivanju sa Supabase-om.";
    return { error: message };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: mapAuthError(error) };
  }

  if (!data.session) {
    return {
      error:
        "Prijava nije uspela — sesija nije kreirana. Proverite da li je korisnik potvrđen u Supabase Dashboard-u.",
    };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}
