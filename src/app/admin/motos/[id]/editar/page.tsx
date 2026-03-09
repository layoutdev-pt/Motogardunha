import { createAdminClient } from "@/lib/supabase/admin";
import MotorcycleForm from "@/components/admin/MotorcycleForm";
import type { MotorcycleFormData } from "@/components/admin/MotorcycleForm";
import type { Motorcycle } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditMotoPage({ params }: Props) {
  const { id } = await params;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <div className="text-center py-20 text-red-400">
        Não foi possível carregar os dados da moto.
      </div>
    );
  }

  const m = data as Motorcycle;

  const initialData: MotorcycleFormData = {
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
    condition: (m.mileage ?? 0) === 0 ? "new" : "used",
    price: m.price ?? 0,
    status: m.status,
    is_featured: m.is_featured,
    slug: m.slug ?? "",
  };

  const initialImages = m.images?.length
    ? m.images
    : m.cover_image
      ? [m.cover_image]
      : [];

  return (
    <MotorcycleForm
      mode="edit"
      motoId={id}
      initialData={initialData}
      initialImages={initialImages}
      title="Editar Motociclo"
      subtitle={m.name}
    />
  );
}
