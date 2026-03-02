import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    const supabase = createAdminClient();
    const { error } = await supabase.from("custom_brands").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting custom brand:", error);
    return NextResponse.json({ error: "Erro ao eliminar marca" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: brands, error } = await supabase
      .from("custom_brands")
      .select("*")
      .order("name");

    if (error) throw error;
    return NextResponse.json(brands || []);
  } catch (error) {
    console.error("Error fetching custom brands:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { name, logo_url } = await req.json();

    if (!name || !logo_url) {
      return NextResponse.json({ error: "Nome e logótipo são obrigatórios" }, { status: 400 });
    }

    const { data: brand, error } = await supabase
      .from("custom_brands")
      .insert({ name, logo_url })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error creating custom brand:", error);
    return NextResponse.json({ error: "Erro ao criar marca" }, { status: 500 });
  }
}
