import { createClient } from "./server";
import type { Motorcycle, GearProduct, Lead } from "@/types";

// ─── Motorcycles ───────────────────────────────────────────────

export async function getMotorcycles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Motorcycle[];
}

export async function getMotorcycleBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as Motorcycle;
}

export async function getFeaturedMotorcycles() {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("motorcycles")
    .insert(moto)
    .select()
    .single();

  if (error) throw error;
  return data as Motorcycle;
}

export async function updateMotorcycle(id: string, updates: Partial<Motorcycle>) {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { error } = await supabase
    .from("motorcycles")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── Gear Products ─────────────────────────────────────────────

export async function getGearProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gear_products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as GearProduct[];
}

export async function getGearProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gear_products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as GearProduct;
}

export async function getFeaturedGear() {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gear_products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data as GearProduct;
}

export async function updateGearProduct(id: string, updates: Partial<GearProduct>) {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { error } = await supabase
    .from("gear_products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── Leads ─────────────────────────────────────────────────────

export async function getLeads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Lead[];
}

export async function createLead(lead: Omit<Lead, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select()
    .single();

  if (error) throw error;
  return data as Lead;
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── Dashboard Stats ───────────────────────────────────────────

export async function getDashboardStats() {
  const supabase = await createClient();

  const [motorcycles, products, leads] = await Promise.all([
    supabase.from("motorcycles").select("id, status, price", { count: "exact" }),
    supabase.from("gear_products").select("id", { count: "exact" }),
    supabase.from("leads").select("id, status, created_at", { count: "exact" }),
  ]);

  const motosCount = motorcycles.count || 0;
  const productsCount = products.count || 0;
  const leadsCount = leads.count || 0;

  // Count leads from this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const monthlyLeads = (leads.data || []).filter(
    (l) => l.created_at >= startOfMonth
  ).length;

  return {
    motosCount,
    productsCount,
    leadsCount,
    monthlyLeads,
  };
}
