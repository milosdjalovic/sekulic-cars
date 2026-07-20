import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "@/types/vehicle";

export async function getFeaturedVehicles(limit = 3): Promise<Vehicle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("is_sold", false)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured vehicles:", error);
    return [];
  }

  return data ?? [];
}

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("is_sold", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }

  return data ?? [];
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all vehicles:", error);
    return [];
  }

  return data ?? [];
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching vehicle:", error);
    return null;
  }

  return data;
}

export async function getSimilarVehicles(
  vehicleId: string,
  brand: string,
  limit = 3
): Promise<Vehicle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("is_sold", false)
    .eq("brand", brand)
    .neq("id", vehicleId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching similar vehicles:", error);
    return [];
  }

  return data ?? [];
}
