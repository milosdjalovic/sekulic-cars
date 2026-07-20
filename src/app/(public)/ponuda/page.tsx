import type { Metadata } from "next";
import VehicleCard from "@/components/VehicleCard";
import { getAvailableVehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Ponuda vozila",
  description: "Pregledajte sva dostupna vozila u ponudi Sekulić Cars.",
};

export default async function PonudaPage() {
  const vehicles = await getAvailableVehicles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Ponuda
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Dostupna vozila</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Pregledajte našu trenutnu ponudu vozila. Za više informacija o bilo kom automobilu,
          kliknite na &quot;Detalji&quot; ili nas kontaktirajte direktno.
        </p>
      </div>

      {vehicles.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-muted">
            {vehicles.length} {vehicles.length === 1 ? "vozilo" : "vozila"} u ponudi
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-surface p-16 text-center">
          <svg
            className="mx-auto h-16 w-16 text-muted/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h2 className="mt-4 text-xl font-semibold">Trenutno nema vozila</h2>
          <p className="mt-2 text-muted">
            Nova vozila uskoro stižu u ponudu. Pratite nas na Instagramu za najnovije informacije.
          </p>
        </div>
      )}
    </div>
  );
}
