import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createHash } from "crypto";

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
    if (data?.value && data.value.length === 64) return data.value;
  } catch {}
  return sha256(process.env.ADMIN_PASSWORD || "M0toG@rDuNh4");
}

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const storedHash = await getStoredHash();

  if (sha256(password) === storedHash) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { success: false, error: "Password incorreta." },
    { status: 401 }
  );
}
