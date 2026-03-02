import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await cookies();
    const supabase = await createClient();

    const { data: brands, error } = await supabase
      .from("custom_brands")
      .select("*")
      .order("name");

    if (error) throw error;

    return NextResponse.json(brands || []);
  } catch (error) {
    console.error("Error fetching custom brands:", error);
    return NextResponse.json({ error: "Erro ao carregar marcas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await cookies();
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await req.json();
    const { name, logo_url } = body;

    if (!name || !logo_url) {
      return NextResponse.json(
        { error: "Nome e logótipo são obrigatórios" },
        { status: 400 }
      );
    }

    const { data: brand, error } = await supabase
      .from("custom_brands")
      .insert({
        name,
        logo_url,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error creating custom brand:", error);
    return NextResponse.json({ error: "Erro ao criar marca" }, { status: 500 });
  }
}
