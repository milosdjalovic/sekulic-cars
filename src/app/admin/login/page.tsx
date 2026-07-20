"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Sekulić <span className="text-accent">Cars</span>
          </h1>
          <p className="mt-2 text-sm text-muted">Admin panel — prijava</p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          {state?.error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
              placeholder="admin@sekulic-cars.rs"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted">
              Lozinka
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-accent py-3 font-semibold text-background transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {pending ? "Prijava..." : "Prijavi se"}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-border bg-surface/50 p-4 text-xs leading-relaxed text-muted">
          <p className="font-medium text-foreground">Ako prijava ne radi:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Korisnik mora biti kreiran sa lozinkom (Authentication → Users → Add user → Create new user)</li>
            <li>Označite „Auto Confirm User“ pri kreiranju</li>
            <li>Ili isključite „Confirm email“ u Authentication → Providers → Email</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
