import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminDashboard from "./admin-dashboard";

export const dynamic = "force-dynamic";

export default async function ControlCenterPage() {
  const session = await getAdminSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/control-center/login");
  }

  return <AdminDashboard email={session.user.email} />;
}
