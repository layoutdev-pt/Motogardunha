import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/admin-login",
  "/api/admin/login",
  "/api/admin/logout",
  "/api/admin/logout/clear",
];

function isAuthenticated(request: NextRequest) {
  return request.cookies.get("admin_session")?.value === "authenticated";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public paths through
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Protect all /admin pages and /api/admin/* sensitive routes
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin/");

  if (isAdminPage || isAdminApi) {
    if (!isAuthenticated(request)) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
