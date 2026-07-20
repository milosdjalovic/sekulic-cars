"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface AdminHeaderProps {
  userEmail: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-lg font-bold">
            Sekulić <span className="text-accent">Cars</span>
            <span className="ml-2 text-xs font-normal text-muted">Admin</span>
          </Link>
          <nav className="hidden gap-4 sm:flex">
            <Link href="/admin" className="text-sm text-muted hover:text-foreground">
              Vozila
            </Link>
            <Link href="/admin/novo" className="text-sm text-muted hover:text-foreground">
              Dodaj vozilo
            </Link>
            <Link href="/" target="_blank" className="text-sm text-muted hover:text-foreground">
              Sajt ↗
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-muted sm:block">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-red-500/50 hover:text-red-400"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </header>
  );
}
