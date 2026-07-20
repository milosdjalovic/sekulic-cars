import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import VehicleForm from "@/components/admin/VehicleForm";

export default async function NewVehiclePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminHeader userEmail={user.email ?? ""} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Dodaj novo vozilo</h1>
        <p className="mt-1 text-sm text-muted">
          Popunite informacije o vozilu i dodajte fotografije.
        </p>
        <div className="mt-8">
          <VehicleForm mode="create" />
        </div>
      </div>
    </>
  );
}
