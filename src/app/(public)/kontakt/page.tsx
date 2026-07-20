import type { Metadata } from "next";
import { siteConfig } from "@/lib/utils";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte Sekulić Cars — telefon, Viber i Instagram.",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Kontakt
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Javite nam se</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Imate pitanje o nekom vozilu ili želite da zakažete pregled?
          Kontaktirajte nas na način koji vam najviše odgovara.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ContactCard
          title="Telefon"
          description="Pozovite nas direktno"
          href={`tel:${siteConfig.phone}`}
          action={siteConfig.phone}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />
        <ContactCard
          title="Viber"
          description="Pošaljite poruku na Viber"
          href={`viber://chat?number=${siteConfig.viber.replace("+", "")}`}
          action="Otvori Viber"
          icon={
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177 0 7.38 0 11.512c0 4.298 1.168 7.433 3.512 9.364 1.378 1.176 3.338 1.864 5.678 2.08.236.024.472.044.708.06.236.016.472.028.708.036.236.008.472.012.708.012h.012c.236 0 .472-.004.708-.012.236-.008.472-.02.708-.036.236-.016.472-.036.708-.06 2.34-.216 4.3-.904 5.678-2.08C22.832 18.945 24 15.81 24 11.512c0-4.132-1.294-7.335-3.014-9.045C18.669.344 14.527.028 12.602.002h-1.204z" />
            </svg>
          }
        />
      </div>

      <section className="mt-16 rounded-xl border border-border bg-surface p-8 text-center sm:p-12">
        <svg className="mx-auto h-10 w-10 text-accent" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        <h2 className="mt-4 text-2xl font-bold">Pratite nas na Instagramu</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Na Instagramu redovno objavljujemo nova vozila, fotografije i ažuriranja ponude.
        </p>
        <div className="mt-6">
          <Button href={siteConfig.instagram} variant="outline" size="lg">
            {siteConfig.instagramHandle}
          </Button>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-surface p-8 text-center">
        <svg className="mx-auto h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h2 className="mt-4 text-lg font-semibold">Lokacija</h2>
        <p className="mt-2 text-muted">{siteConfig.locationLabel}</p>
        <div className="mt-6">
          <Button href={siteConfig.mapsUrl} variant="outline" size="lg">
            Otvori u Google Maps
          </Button>
        </div>
      </section>
    </div>
  );
}

function ContactCard({
  title,
  description,
  href,
  action,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <p className="mt-4 text-sm font-medium text-accent">{action} →</p>
    </a>
  );
}
