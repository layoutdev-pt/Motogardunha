import { createAdminClient } from "./admin";
import type { Motorcycle, GearProduct, Lead } from "@/types";

// ─── Motorcycles ───────────────────────────────────────────────

export async function getMotorcycles() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Motorcycle[];
}

export async function getMotorcycleBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as Motorcycle;
}

export async function getFeaturedMotorcycles() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("is_featured", true)
    .eq("status", "available")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data as Motorcycle[];
}

export async function createMotorcycle(moto: Omit<Motorcycle, "id" | "created_at" | "updated_at">) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .insert(moto)
    .select()
    .single();

  if (error) throw error;
  return data as Motorcycle;
}

export async function updateMotorcycle(id: string, updates: Partial<Motorcycle>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Motorcycle;
}

export async function deleteMotorcycle(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("motorcycles")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── Gear Products ─────────────────────────────────────────────

export async function getGearProducts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gear_products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as GearProduct[];
}

export async function getGearProductBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gear_products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as GearProduct;
}

export async function getFeaturedGear() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gear_products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data as GearProduct[];
}

export async function createGearProduct(product: Omit<GearProduct, "id" | "created_at" | "updated_at">) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gear_products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data as GearProduct;
}

export async function updateGearProduct(id: string, updates: Partial<GearProduct>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gear_products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as GearProduct;
}

export async function deleteGearProduct(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("gear_products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── Leads ─────────────────────────────────────────────────────

export async function getLeads() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Lead[];
}

export async function createLead(lead: Omit<Lead, "id" | "created_at" | "updated_at">) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select()
    .single();

  if (error) throw error;
  return data as Lead;
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Lead;
}

export async function deleteLead(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
