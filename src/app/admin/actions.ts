"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ─── Motorcycles ───────────────────────────────────────────────

export async function deleteMotorcycleAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("motorcycles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
}

export async function createMotorcycleAction(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("motorcycles").insert({
    name: formData.get("name") as string,
    year: Number(formData.get("year")),
    logo_url: (formData.get("logo_url") as string) || null,
    brand: formData.get("brand") as string,
    price: Number(formData.get("price")),
    mileage: Number(formData.get("mileage") || 0),
    gearbox_type: (formData.get("gearbox_type") as string) || null,
    segment: (formData.get("segment") as string) || null,
    horsepower: (formData.get("horsepower") as string) || null,
    engine_cc: Number(formData.get("engine_cc")),
    engine: (formData.get("engine") as string) || null,
    transmission_type: (formData.get("transmission_type") as string) || null,
    fuel_type: (formData.get("fuel_type") as string) || null,
    max_torque: (formData.get("max_torque") as string) || null,
    avg_consumption: (formData.get("avg_consumption") as string) || null,
    tank_capacity: (formData.get("tank_capacity") as string) || null,
    seats: Number(formData.get("seats") || 2),
    primary_color: (formData.get("primary_color") as string) || null,
    secondary_color: (formData.get("secondary_color") as string) || null,
    description_title: (formData.get("description_title") as string) || null,
    description: (formData.get("description") as string) || null,
    images: [formData.get("cover_image") as string],
    cover_image: formData.get("cover_image") as string,
    slug: formData.get("slug") as string,
    status: (formData.get("status") as string) || "available",
    is_featured: formData.get("is_featured") === "true",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
}

// ─── Gear Products ─────────────────────────────────────────────

export async function deleteGearProductAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gear_products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
}

export async function createGearProductAction(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("gear_products").insert({
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    product_type: (formData.get("product_type") as string) || null,
    category: formData.get("category") as string,
    price: Number(formData.get("price")),
    compare_price: Number(formData.get("compare_price") || 0) || null,
    is_featured: formData.get("is_featured") === "true",
    images: [formData.get("cover_image") as string],
    cover_image: formData.get("cover_image") as string,
    slug: formData.get("slug") as string,
    status: (formData.get("status") as string) || "active",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
}

// ─── Leads ─────────────────────────────────────────────────────

export async function deleteLeadAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function updateLeadStatusAction(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

// ─── Contact Form (public) ────────────────────────────────────

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("leads").insert({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || null,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    interested_model: (formData.get("interested_model") as string) || null,
    source: "website",
    status: "new_lead",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}
