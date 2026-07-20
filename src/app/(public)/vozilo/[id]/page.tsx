import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicleById, getSimilarVehicles } from "@/lib/vehicles";
import VehicleDetail from "@/components/VehicleDetail";
import VehicleCard from "@/components/VehicleCard";
import { getVehicleTitle } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return { title: "Vozilo nije pronađeno" };
  }

  return {
    title: getVehicleTitle(vehicle),
    description: vehicle.description || `${vehicle.brand} ${vehicle.model} — ${vehicle.year}`,
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const similar = await getSimilarVehicles(id, vehicle.brand);

  return (
    <div>
      <VehicleDetail vehicle={vehicle} />

      {similar.length > 0 && (
        <section className="border-t border-border bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Slična vozila</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
