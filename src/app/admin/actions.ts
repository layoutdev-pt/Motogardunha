"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Motorcycle, GearProduct } from "@/types";

// ─── Motorcycles ───────────────────────────────────────────────

export async function insertMotorcycleAction(
  data: Omit<Motorcycle, "id" | "created_at" | "updated_at">
) {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const { error } = await supabase.from("motorcycles").insert({
    ...data,
    created_at: now,
    updated_at: now,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
}

export async function updateMotorcycleAction(
  id: string,
  data: Partial<Omit<Motorcycle, "id" | "created_at">>
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("motorcycles")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
  revalidatePath(`/stand/${data.slug ?? ""}`);
}

export async function deleteMotorcycleAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("motorcycles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
}

// ─── Gear Products ─────────────────────────────────────────────

export async function insertGearProductAction(
  data: Omit<GearProduct, "id" | "created_at" | "updated_at">
) {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const { error } = await supabase.from("gear_products").insert({
    ...data,
    created_at: now,
    updated_at: now,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
}

export async function updateGearProductAction(
  id: string,
  data: Partial<Omit<GearProduct, "id" | "created_at">>
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("gear_products")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath(`/loja/${data.slug ?? ""}`);
}

export async function deleteGearProductAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("gear_products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
}

// ─── Leads (admin operations) ──────────────────────────────────

export async function deleteLeadAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function updateLeadStatusAction(id: string, status: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

// ─── Contact Form (public — uses anon server client, RLS allows INSERT) ──

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
