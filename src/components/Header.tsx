import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight sm:text-2xl">
            Sekulić <span className="text-accent">Cars</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Početna
          </Link>
          <Link
            href="/ponuda"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Ponuda
          </Link>
          <Link
            href="/kontakt"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Kontakt
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/ponuda"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-accent-hover sm:inline-block"
          >
            Pogledaj ponudu
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <details className="relative md:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg border border-border p-2 transition-colors hover:bg-surface-light [&::-webkit-details-marker]:hidden">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-surface py-2 shadow-xl">
        <Link href="/" className="block px-4 py-2 text-sm hover:bg-surface-light">
          Početna
        </Link>
        <Link href="/ponuda" className="block px-4 py-2 text-sm hover:bg-surface-light">
          Ponuda
        </Link>
        <Link href="/kontakt" className="block px-4 py-2 text-sm hover:bg-surface-light">
          Kontakt
        </Link>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-2 text-sm hover:bg-surface-light"
        >
          Instagram
        </a>
      </div>
    </details>
  );
}
