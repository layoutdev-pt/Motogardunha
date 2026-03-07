import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import bcrypt from "bcrypt";
import { createHash } from "crypto";

const BCRYPT_ROUNDS = 12;

function sha256(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

async function getCurrentHash(): Promise<string> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "admin_password_hash")
      .single();
    if (data?.value) return data.value;
  } catch {}

  const fallback = process.env.ADMIN_PASSWORD;
  if (!fallback) throw new Error("ADMIN_PASSWORD environment variable is required.");
  return sha256(fallback);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ success: false, error: "Preencha todos os campos." }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ success: false, error: "A nova password deve ter pelo menos 8 caracteres." }, { status: 400 });
  }

  const storedHash = await getCurrentHash();

  let isCurrentValid = false;
  if (storedHash.startsWith("$2")) {
    isCurrentValid = await bcrypt.compare(currentPassword, storedHash);
  } else {
    isCurrentValid = sha256(currentPassword) === storedHash;
  }

  if (!isCurrentValid) {
    return NextResponse.json({ success: false, error: "Password atual incorreta." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const newHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await supabase
      .from("settings")
      .upsert({ key: "admin_password_hash", value: newHash, updated_at: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Erro ao guardar a nova password." }, { status: 500 });
  }
}
