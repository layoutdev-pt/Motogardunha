import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

function sha256(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ success: false, error: "Password é obrigatória." }, { status: 400 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD ?? "M0toG@rDuNh4";
    const isValid = sha256(password) === sha256(adminPassword);

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
