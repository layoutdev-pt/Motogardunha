import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createHash } from "crypto";

function sha256(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

async function getCurrentPassword(): Promise<string> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "admin_password_hash")
      .single();
    if (data?.value) return data.value;
  } catch {}
  return sha256(process.env.ADMIN_PASSWORD || "M0toG@rDuNh4");
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ success: false, error: "Não autorizado." }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ success: false, error: "Preencha todos os campos." }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ success: false, error: "A nova password deve ter pelo menos 6 caracteres." }, { status: 400 });
  }

  const storedHash = await getCurrentPassword();
  const currentHash = sha256(currentPassword);

  if (currentHash !== storedHash) {
    return NextResponse.json({ success: false, error: "Password atual incorreta." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    await supabase
      .from("settings")
      .upsert({ key: "admin_password_hash", value: sha256(newPassword), updated_at: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Erro ao guardar a nova password." }, { status: 500 });
  }
}
