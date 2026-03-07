import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Verify admin session cookie.
 * Returns null if authenticated, or a 401 NextResponse if not.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    return NextResponse.json(
      { error: "Não autorizado." },
      { status: 401 }
    );
  }

  return null;
}

/**
 * Escape HTML entities to prevent XSS in email templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
