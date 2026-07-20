"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle, VehicleFormData, FuelType, Transmission } from "@/types/vehicle";
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from "@/types/vehicle";

interface VehicleFormProps {
  vehicle?: Vehicle;
  mode: "create" | "edit";
}

const defaultForm: VehicleFormData = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  mileage: 0,
  fuel_type: "benzin",
  transmission: "manuelni",
  price: 0,
  description: "",
  engine_power: null,
  color: "",
  body_type: "",
  doors: null,
  seats: null,
  registration_date: "",
  is_featured: false,
};

export default function VehicleForm({ vehicle, mode }: VehicleFormProps) {
  const [form, setForm] = useState<VehicleFormData>(() => {
    if (!vehicle) return defaultForm;
    return {
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      mileage: vehicle.mileage,
      fuel_type: vehicle.fuel_type,
      transmission: vehicle.transmission,
      price: vehicle.price,
      description: vehicle.description ?? "",
      engine_power: vehicle.engine_power,
      color: vehicle.color ?? "",
      body_type: vehicle.body_type ?? "",
      doors: vehicle.doors,
      seats: vehicle.seats,
      registration_date: vehicle.registration_date ?? "",
      is_featured: vehicle.is_featured,
    };
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(vehicle?.vehicle_images ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof VehicleFormData>(key: K, value: VehicleFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (imageId: string, storagePath: string) => {
    const supabase = createClient();
    await supabase.storage.from("vehicle-images").remove([storagePath]);
    await supabase.from("vehicle_images").delete().eq("id", imageId);
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const uploadImages = async (vehicleId: string) => {
    const supabase = createClient();
    const startOrder = existingImages.length;

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const ext = file.name.split(".").pop();
      const path = `${vehicleId}/${Date.now()}-${i}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("vehicle-images")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("vehicle-images")
        .getPublicUrl(path);

      await supabase.from("vehicle_images").insert({
        vehicle_id: vehicleId,
        url: urlData.publicUrl,
        storage_path: path,
        sort_order: startOrder + i,
        is_primary: existingImages.length === 0 && i === 0,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const supabase = createClient();

      const vehicleData = {
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: form.year,
        mileage: form.mileage,
        fuel_type: form.fuel_type,
        transmission: form.transmission,
        price: form.price,
        description: form.description.trim() || null,
        engine_power: form.engine_power,
        color: form.color.trim() || null,
        body_type: form.body_type.trim() || null,
        doors: form.doors,
        seats: form.seats,
        registration_date: form.registration_date || null,
        is_featured: form.is_featured,
      };

      if (mode === "create") {
        const { data, error: insertError } = await supabase
          .from("vehicles")
          .insert(vehicleData)
          .select()
          .single();

        if (insertError) throw insertError;

        if (images.length > 0) {
          await uploadImages(data.id);
        }

        setSuccess("Vozilo je uspešno dodato!");
        window.location.href = `/admin/vozilo/${data.id}`;
      } else if (vehicle) {
        const { error: updateError } = await supabase
          .from("vehicles")
          .update(vehicleData)
          .eq("id", vehicle.id);

        if (updateError) throw updateError;

        if (images.length > 0) {
          await uploadImages(vehicle.id);
        }

        setSuccess("Vozilo je uspešno ažurirano!");
        setImages([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Došlo je do greške.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSold = async () => {
    if (!vehicle) return;
    if (!confirm("Da li ste sigurni da želite da označite ovo vozilo kao prodato?")) return;

    setLoading(true);
    const supabase = createClient();
    await supabase.from("vehicles").update({ is_sold: true }).eq("id", vehicle.id);
    setSuccess("Vozilo je označeno kao prodato.");
    setLoading(false);
    window.location.reload();
  };

  const handleDelete = async () => {
    if (!vehicle) return;
    if (!confirm("Da li ste sigurni da želite da obrišete ovo vozilo? Ova akcija je nepovratna.")) return;

    setLoading(true);
    const supabase = createClient();

    for (const img of existingImages) {
      await supabase.storage.from("vehicle-images").remove([img.storage_path]);
    }

    await supabase.from("vehicles").delete().eq("id", vehicle.id);
    window.location.href = "/admin";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          {success}
        </div>
      )}

      {/* Images */}
      <section>
        <h2 className="text-lg font-semibold">Fotografije</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {existingImages.map((img) => (
            <div key={img.id} className="relative h-24 w-32 overflow-hidden rounded-lg border border-border">
              <Image src={img.url} alt="" fill className="object-cover" sizes="128px" />
              <button
                type="button"
                onClick={() => removeExistingImage(img.id, img.storage_path)}
                className="absolute right-1 top-1 rounded bg-red-600 px-1.5 py-0.5 text-xs text-white"
              >
                ×
              </button>
            </div>
          ))}
          {images.map((file, i) => (
            <div key={i} className="relative h-24 w-32 overflow-hidden rounded-lg border border-border">
              <Image src={URL.createObjectURL(file)} alt="" fill className="object-cover" sizes="128px" />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                className="absolute right-1 top-1 rounded bg-red-600 px-1.5 py-0.5 text-xs text-white"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-24 w-32 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted transition-colors hover:border-accent hover:text-accent"
          >
            + Dodaj
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </section>

      {/* Basic info */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Field label="Marka *" value={form.brand} onChange={(v) => updateField("brand", v)} required />
        <Field label="Model *" value={form.model} onChange={(v) => updateField("model", v)} required />
        <Field label="Godište *" type="number" value={String(form.year)} onChange={(v) => updateField("year", Number(v))} required />
        <Field label="Kilometraža (km) *" type="number" value={String(form.mileage)} onChange={(v) => updateField("mileage", Number(v))} required />
        <SelectField
          label="Gorivo *"
          value={form.fuel_type}
          onChange={(v) => updateField("fuel_type", v as FuelType)}
          options={Object.entries(FUEL_TYPE_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />
        <SelectField
          label="Menjač *"
          value={form.transmission}
          onChange={(v) => updateField("transmission", v as Transmission)}
          options={Object.entries(TRANSMISSION_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />
        <Field label="Cena (EUR) *" type="number" value={String(form.price)} onChange={(v) => updateField("price", Number(v))} required />
        <Field label="Snaga motora (KS)" type="number" value={form.engine_power ? String(form.engine_power) : ""} onChange={(v) => updateField("engine_power", v ? Number(v) : null)} />
        <Field label="Boja" value={form.color} onChange={(v) => updateField("color", v)} />
        <Field label="Karoserija" value={form.body_type} onChange={(v) => updateField("body_type", v)} />
        <Field label="Broj vrata" type="number" value={form.doors ? String(form.doors) : ""} onChange={(v) => updateField("doors", v ? Number(v) : null)} />
        <Field label="Broj sedišta" type="number" value={form.seats ? String(form.seats) : ""} onChange={(v) => updateField("seats", v ? Number(v) : null)} />
        <Field label="Registrovan do" type="date" value={form.registration_date} onChange={(v) => updateField("registration_date", v)} />
      </section>

      {/* Description */}
      <section>
        <label className="block text-sm font-medium text-muted">Opis</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={5}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
          placeholder="Detaljan opis vozila..."
        />
      </section>

      {/* Options */}
      <section>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => updateField("is_featured", e.target.checked)}
            className="h-4 w-4 rounded border-border accent-accent"
          />
          <span className="text-sm">Istakni na početnoj stranici</span>
        </label>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {loading ? "Čuvanje..." : mode === "create" ? "Dodaj vozilo" : "Sačuvaj izmene"}
        </button>

        {mode === "edit" && vehicle && !vehicle.is_sold && (
          <button
            type="button"
            onClick={handleMarkSold}
            disabled={loading}
            className="rounded-lg border border-yellow-500/30 px-6 py-2.5 text-sm font-medium text-yellow-400 transition-colors hover:bg-yellow-500/10 disabled:opacity-50"
          >
            Označi kao prodato
          </button>
        )}

        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg border border-red-500/30 px-6 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
          >
            Obriši vozilo
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
