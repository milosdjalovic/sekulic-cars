"use client";

import { useState } from "react";
import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import {
  formatPrice,
  formatMileage,
  getVehicleTitle,
  siteConfig,
} from "@/lib/utils";
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from "@/types/vehicle";
interface VehicleDetailProps {
  vehicle: Vehicle;
}

export default function VehicleDetail({ vehicle }: VehicleDetailProps) {
  const images = [...(vehicle.vehicle_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const title = getVehicleTitle(vehicle);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link je kopiran u clipboard!");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Gallery */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-light lg:col-span-3">
          {images.length > 0 ? (
            <Image
              src={images[activeIndex].url}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              Nema fotografija
            </div>
          )}
          {vehicle.is_sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="rounded-lg bg-red-600 px-6 py-3 text-lg font-bold uppercase">
                Prodato
              </span>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto lg:col-span-3 lg:row-start-2">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(i)}
                className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  i === activeIndex ? "border-accent" : "border-border hover:border-muted"
                }`}
              >
                <Image src={img.url} alt="" fill className="object-cover" sizes="112px" />
              </button>
            ))}
          </div>
        )}

        {/* Info sidebar */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="mt-1 text-muted">{vehicle.year}</p>

          <p className="mt-4 text-3xl font-bold text-accent">
            {formatPrice(vehicle.price)}
          </p>

          {!vehicle.is_sold && (
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-semibold text-background transition-colors hover:bg-accent-hover"
              >
                <PhoneIcon />
                Pozovi: {siteConfig.phone}
              </a>
              <a
                href={`viber://chat?number=${siteConfig.viber.replace("+", "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Viber
              </a>
              <button
                onClick={handleShare}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <ShareIcon />
                Podeli
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">Specifikacije</h2>
          <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
            <SpecRow label="Marka" value={vehicle.brand} />
            <SpecRow label="Model" value={vehicle.model} />
            <SpecRow label="Godište" value={String(vehicle.year)} />
            <SpecRow label="Kilometraža" value={formatMileage(vehicle.mileage)} />
            <SpecRow label="Gorivo" value={FUEL_TYPE_LABELS[vehicle.fuel_type]} />
            <SpecRow label="Menjač" value={TRANSMISSION_LABELS[vehicle.transmission]} />
            {vehicle.engine_power && (
              <SpecRow label="Snaga motora" value={`${vehicle.engine_power} KS`} />
            )}
            {vehicle.color && <SpecRow label="Boja" value={vehicle.color} />}
            {vehicle.body_type && <SpecRow label="Karoserija" value={vehicle.body_type} />}
            {vehicle.doors && <SpecRow label="Broj vrata" value={String(vehicle.doors)} />}
            {vehicle.seats && <SpecRow label="Broj sedišta" value={String(vehicle.seats)} />}
            {vehicle.registration_date && (
              <SpecRow
                label="Registrovan do"
                value={new Date(vehicle.registration_date).toLocaleDateString("sr-RS")}
              />
            )}
          </dl>
        </div>

        {vehicle.description && (
          <div>
            <h2 className="text-xl font-bold">Opis</h2>
            <div className="mt-4 rounded-xl border border-border bg-surface p-6">
              <p className="whitespace-pre-line leading-relaxed text-muted">
                {vehicle.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}
