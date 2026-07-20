import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getVehicleById } from "@/lib/vehicles";
import AdminHeader from "@/components/admin/AdminHeader";
import VehicleForm from "@/components/admin/VehicleForm";
import { getVehicleTitle } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <>
      <AdminHeader userEmail={user.email ?? ""} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Uredi vozilo</h1>
          {vehicle.is_sold && (
            <span className="rounded-full bg-red-500/10 px-3 py-0.5 text-xs font-medium text-red-400">
              Prodato
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{getVehicleTitle(vehicle)}</p>
        <div className="mt-8">
          <VehicleForm mode="edit" vehicle={vehicle} />
        </div>
      </div>
    </>
  );
}
