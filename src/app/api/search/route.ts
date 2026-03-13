import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ motos: [], gear: [] });
  }

  const supabase = createAdminClient();

  const [motosRes, gearRes] = await Promise.allSettled([
    supabase
      .from("motorcycles")
      .select("id, name, brand, year, engine_cc, mileage, price, cover_image, slug, segment")
      .eq("status", "available")
      .or(`name.ilike.%${q}%,brand.ilike.%${q}%,segment.ilike.%${q}%`)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("gear_products")
      .select("id, title, category, product_type, price, cover_image, slug")
      .eq("status", "active")
      .or(`title.ilike.%${q}%,category.ilike.%${q}%,product_type.ilike.%${q}%`)
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  const motos = motosRes.status === "fulfilled" ? (motosRes.value.data ?? []) : [];
  const gear = gearRes.status === "fulfilled" ? (gearRes.value.data ?? []) : [];

  return NextResponse.json({ motos, gear });
}
