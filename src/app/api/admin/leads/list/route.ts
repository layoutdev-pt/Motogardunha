import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    console.log("Fetching leads with admin client...");
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching leads:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`Successfully fetched ${data?.length || 0} leads`);
    return NextResponse.json(data || []);
  } catch (err) {
    console.error("GET /api/admin/leads/list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
