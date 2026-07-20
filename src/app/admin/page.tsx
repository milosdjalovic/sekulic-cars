import Link from "next/link";
import { getAllVehicles } from "@/lib/vehicles";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatPrice, getPrimaryImage } from "@/lib/utils";
import AdminHeader from "@/components/admin/AdminHeader";
import Image from "next/image";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const vehicles = await getAllVehicles();
  const available = vehicles.filter((v) => !v.is_sold);
  const sold = vehicles.filter((v) => v.is_sold);

  return (
    <>
      <AdminHeader userEmail={user.email ?? ""} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Upravljanje vozilima</h1>
            <p className="mt-1 text-sm text-muted">
              {available.length} dostupno · {sold.length} prodato · {vehicles.length} ukupno
            </p>
          </div>
          <Link
            href="/admin/novo"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
          >
            + Dodaj vozilo
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="mt-12 rounded-xl border border-border bg-surface p-12 text-center">
            <p className="text-muted">Još nema vozila. Dodajte prvo vozilo u ponudu.</p>
            <Link
              href="/admin/novo"
              className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background"
            >
              Dodaj vozilo
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted">
                  <th className="pb-3 pr-4">Vozilo</th>
                  <th className="pb-3 pr-4">Cena</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Istaknuto</th>
                  <th className="pb-3">Akcije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {vehicles.map((vehicle) => {
                  const imageUrl = getPrimaryImage(vehicle);

                  return (
                    <tr key={vehicle.id} className="group">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-light">
                            {imageUrl ? (
                              <Image src={imageUrl} alt="" fill className="object-cover" sizes="64px" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-muted">—</div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{vehicle.brand} {vehicle.model}</p>
                            <p className="text-xs text-muted">{vehicle.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 font-medium text-accent">
                        {formatPrice(vehicle.price)}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            vehicle.is_sold
                              ? "bg-red-500/10 text-red-400"
                              : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {vehicle.is_sold ? "Prodato" : "Dostupno"}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        {vehicle.is_featured ? (
                          <span className="text-xs text-accent">Da</span>
                        ) : (
                          <span className="text-xs text-muted">Ne</span>
                        )}
                      </td>
                      <td className="py-4">
                        <Link
                          href={`/admin/vozilo/${vehicle.id}`}
                          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                        >
                          Uredi
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
