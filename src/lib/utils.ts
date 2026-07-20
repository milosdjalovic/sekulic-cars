import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("sr-RS").format(mileage) + " km";
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getVehicleTitle(vehicle: { brand: string; model: string; year: number }): string {
  return `${vehicle.brand} ${vehicle.model} (${vehicle.year})`;
}

export function getPrimaryImage(vehicle: { vehicle_images?: { url: string; is_primary: boolean; sort_order: number }[] }): string | null {
  const images = vehicle.vehicle_images;
  if (!images || images.length === 0) return null;
  const primary = images.find((img) => img.is_primary);
  if (primary) return primary.url;
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  return sorted[0]?.url ?? null;
}

export const siteConfig = {
  name: "Sekulić Cars",
  description: "Kvalitetna polovna i nova vozila. Poverenje, transparentnost i pažljivo odabrana ponuda.",
  phone: process.env.NEXT_PUBLIC_PHONE || "+38268080898",
  viber: process.env.NEXT_PUBLIC_VIBER || "+38268080898",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/sekulic__cars/",
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@sekulic__cars",
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL || "https://maps.app.goo.gl/EYatL4tkVTZuQxB7A",
  locationLabel: process.env.NEXT_PUBLIC_LOCATION_LABEL || "Nedakusi, Bijelo Polje",
};
