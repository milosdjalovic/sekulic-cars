import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">
              Sekulić <span className="text-accent">Cars</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Pažljivo odabrana vozila sa fokusom na kvalitet, transparentnost i pouzdanu uslugu.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Navigacija
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm transition-colors hover:text-accent">
                  Početna
                </Link>
              </li>
              <li>
                <Link href="/ponuda" className="text-sm transition-colors hover:text-accent">
                  Ponuda vozila
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm transition-colors hover:text-accent">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Kontakt
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-accent">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.locationLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          © {currentYear} Sekulić Cars. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
}
