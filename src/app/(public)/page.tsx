import Link from "next/link";
import Button from "@/components/Button";
import VehicleCard from "@/components/VehicleCard";
import { getFeaturedVehicles, getAvailableVehicles } from "@/lib/vehicles";

export default async function HomePage() {
  let featured = await getFeaturedVehicles(3);

  if (featured.length === 0) {
    const all = await getAvailableVehicles();
    featured = all.slice(0, 3);
  }

  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Dobrodošli
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Kvalitetna vozila,{" "}
              <span className="text-accent">iskrena usluga</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Sekulić Cars nudi preglednu ponudu vozila.
              Trudimo se da svaki oglas bude jasan i razumljiv, uz ličan pristup
              svakom zainteresovanom kupcu.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/ponuda" size="lg">
                Pogledaj ponudu
              </Button>
              <Button href="/kontakt" variant="outline" size="lg">
                Kontaktiraj nas
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <ValueCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Jasna ponuda"
              description="Svako vozilo prikazano sa osnovnim podacima, fotografijama i cenom."
            />
            <ValueCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              }
              title="Transparentna komunikacija"
              description="Tu smo da odgovorimo na pitanja i pružimo informacije o vozilu koje vas zanima."
            />
            <ValueCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="Ličan pristup"
              description="Tu smo da odgovorimo na sva vaša pitanja i pomognemo u izboru."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Izdvajamo
              </p>
              <h2 className="mt-2 text-3xl font-bold">Istaknuta vozila</h2>
            </div>
            <Link
              href="/ponuda"
              className="hidden text-sm font-medium text-accent transition-colors hover:text-accent-hover sm:block"
            >
              Sva vozila →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-border bg-surface p-12 text-center">
              <p className="text-muted">
                Trenutno nema vozila u ponudi. Proverite uskoro!
              </p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button href="/ponuda" variant="outline">
              Sva vozila
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Zainteresovani ste?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Pogledajte našu ponudu ili nas kontaktirajte direktno. Tu smo da vam pomognemo
            pronaći vozilo koje odgovara vašim potrebama.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/ponuda" size="lg">
              Pogledaj ponudu
            </Button>
            <Button href="/kontakt" variant="outline" size="lg">
              Kontakt
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent/20">
      <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
