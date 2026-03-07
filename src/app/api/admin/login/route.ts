import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import bcrypt from "bcrypt";
import { createHash } from "crypto";

const BCRYPT_ROUNDS = 12;

function sha256(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

async function getStoredHash(): Promise<string> {
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

async function upgradeToBcrypt(password: string): Promise<void> {
  try {
    const supabase = createAdminClient();
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await supabase
      .from("settings")
      .upsert({ key: "admin_password_hash", value: hash, updated_at: new Date().toISOString() });
  } catch {}
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ success: false, error: "Password é obrigatória." }, { status: 400 });
    }

    const storedHash = await getStoredHash();

    let isValid = false;

    // Check if hash is bcrypt (starts with $2b$ or $2a$)
    if (storedHash.startsWith("$2")) {
      isValid = await bcrypt.compare(password, storedHash);
    } else {
      // Legacy SHA-256 hash — verify then migrate to bcrypt
      isValid = sha256(password) === storedHash;
      if (isValid) {
        await upgradeToBcrypt(password);
      }
    }

    if (isValid) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Password incorreta." },
      { status: 401 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno." },
      { status: 500 }
    );
  }
}
