import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    console.log("Fetching motorcycles with admin client...");
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("motorcycles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching motorcycles:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`Successfully fetched ${data?.length || 0} motorcycles`);
    return NextResponse.json(data || []);
  } catch (err) {
    console.error("GET /api/admin/motorcycles/list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
