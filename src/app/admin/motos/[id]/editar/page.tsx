"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import MotorcycleForm from "@/components/admin/MotorcycleForm";
import type { MotorcycleFormData } from "@/components/admin/MotorcycleForm";
import type { Motorcycle } from "@/types";

export default function AdminEditMotoPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<MotorcycleFormData | null>(null);
  const [initialImages, setInitialImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMoto() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("motorcycles")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        const m = data as Motorcycle;
        setInitialData({
          name: m.name ?? "",
          brand: m.brand ?? "",
          model: "",
          year: m.year ?? new Date().getFullYear(),
          logo_url: m.logo_url ?? "",
          segment: m.segment ?? "",
          description_title: m.description_title ?? "",
          description: m.description ?? "",
          engine_cc: m.engine_cc ?? 0,
          horsepower: m.horsepower ?? "",
          max_torque: m.max_torque ?? "",
          engine: m.engine ?? "",
          gearbox_type: m.gearbox_type ?? "",
          transmission_type: m.transmission_type ?? "",
          fuel_type: m.fuel_type ?? "",
          avg_consumption: m.avg_consumption ?? "",
          tank_capacity: m.tank_capacity ?? "",
          seats: m.seats ?? 2,
          primary_color: m.primary_color ?? "",
          secondary_color: m.secondary_color ?? "",
          mileage: m.mileage ?? 0,
          price: m.price ?? 0,
          status: m.status,
          is_featured: m.is_featured,
          slug: m.slug ?? "",
        });
        setInitialImages(m.images?.length ? m.images : m.cover_image ? [m.cover_image] : []);
      } catch {
        setError("Não foi possível carregar os dados da moto.");
      } finally {
        setLoading(false);
      }
    }
    fetchMoto();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="text-center py-20 text-red-400">{error || "Erro ao carregar."}</div>
    );
  }

  return (
    <MotorcycleForm
      mode="edit"
      motoId={id}
      initialData={initialData}
      initialImages={initialImages}
      title="Editar Motociclo"
      subtitle={initialData.name}
    />
  );
}
