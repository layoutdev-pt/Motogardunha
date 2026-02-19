import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminClientLayout } from "./admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  return <AdminClientLayout>{children}</AdminClientLayout>;
}
