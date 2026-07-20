import type { MetadataRoute } from "next";
import { getAvailableVehicles } from "@/lib/vehicles";
import { siteConfig } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sekulic-cars.rs";

  const vehicles = await getAvailableVehicles();

  const vehicleEntries = vehicles.map((v) => ({
    url: `${baseUrl}/vozilo/${v.id}`,
    lastModified: new Date(v.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/ponuda`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...vehicleEntries,
  ];
}
