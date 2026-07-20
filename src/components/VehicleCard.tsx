import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import {
  formatPrice,
  formatMileage,
  getPrimaryImage,
  getVehicleTitle,
} from "@/lib/utils";
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const imageUrl = getPrimaryImage(vehicle);
  const title = getVehicleTitle(vehicle);

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      <Link href={`/vozilo/${vehicle.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-light">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              <svg className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {vehicle.is_sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wider">
                Prodato
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="mt-1 text-sm text-muted">{vehicle.year}</p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted">
            <span>{formatMileage(vehicle.mileage)}</span>
            <span>{FUEL_TYPE_LABELS[vehicle.fuel_type]}</span>
            <span>{TRANSMISSION_LABELS[vehicle.transmission]}</span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-accent">{formatPrice(vehicle.price)}</span>
            <span className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors group-hover:border-accent group-hover:text-accent">
              Detalji
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
