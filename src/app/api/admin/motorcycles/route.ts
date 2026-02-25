import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const supabase = createAdminClient();
    const now = new Date().toISOString();
    const { error } = await supabase.from("motorcycles").insert({ ...data, created_at: now, updated_at: now });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath("/admin/motos");
    revalidatePath("/stand");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json();
    const supabase = createAdminClient();
    const { error } = await supabase.from("motorcycles").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath("/admin/motos");
    revalidatePath("/stand");
    if (data.slug) revalidatePath(`/stand/${data.slug}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const supabase = createAdminClient();
    const { error } = await supabase.from("motorcycles").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath("/admin/motos");
    revalidatePath("/stand");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}
