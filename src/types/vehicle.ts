export type FuelType = "benzin" | "dizel" | "hibrid" | "električni" | "lpg";
export type Transmission = "manuelni" | "automatski" | "poluautomatski";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: FuelType;
  transmission: Transmission;
  price: number;
  description: string | null;
  engine_power: number | null;
  color: string | null;
  body_type: string | null;
  doors: number | null;
  seats: number | null;
  registration_date: string | null;
  is_sold: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  vehicle_images?: VehicleImage[];
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  url: string;
  storage_path: string;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface VehicleFormData {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: FuelType;
  transmission: Transmission;
  price: number;
  description: string;
  engine_power: number | null;
  color: string;
  body_type: string;
  doors: number | null;
  seats: number | null;
  registration_date: string;
  is_featured: boolean;
}

export const FUEL_TYPE_LABELS: Record<FuelType, string> = {
  benzin: "Benzin",
  dizel: "Dizel",
  hibrid: "Hibrid",
  "električni": "Električni",
  lpg: "LPG",
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  manuelni: "Manuelni",
  automatski: "Automatski",
  poluautomatski: "Poluautomatski",
};
