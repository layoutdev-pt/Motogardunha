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
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "admin_password_hash")
      .single();
    
    if (error) {
      console.log("Supabase settings query error:", error.message);
    }
    
    if (data?.value) {
      console.log("Using password hash from Supabase settings table");
      return data.value;
    }
  } catch (err) {
    console.log("Failed to read from Supabase settings:", err);
  }

  console.log("Falling back to ADMIN_PASSWORD environment variable");
  const fallback = process.env.ADMIN_PASSWORD;
  if (!fallback) throw new Error("ADMIN_PASSWORD environment variable is required.");
  const hash = sha256(fallback);
  console.log("Generated SHA-256 hash from env var");
  return hash;
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

    let storedHash: string;
    try {
      storedHash = await getStoredHash();
      console.log("Retrieved hash type:", storedHash.startsWith("$2") ? "bcrypt" : "sha256");
    } catch (hashErr) {
      console.error("Failed to get stored hash:", hashErr);
      console.error("Environment check:", {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      });
      return NextResponse.json(
        { success: false, error: "Configuração do servidor incorreta. Verifique as variáveis de ambiente." },
        { status: 500 }
      );
    }

    let isValid = false;

    // Check if hash is bcrypt (starts with $2b$ or $2a$)
    if (storedHash.startsWith("$2")) {
      console.log("Validating with bcrypt...");
      isValid = await bcrypt.compare(password, storedHash);
      console.log("Bcrypt validation result:", isValid);
    } else {
      // Legacy SHA-256 hash — verify then migrate to bcrypt
      console.log("Validating with SHA-256...");
      const inputHash = sha256(password);
      isValid = inputHash === storedHash;
      console.log("SHA-256 validation result:", isValid);
      if (isValid) {
        console.log("Upgrading to bcrypt...");
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
