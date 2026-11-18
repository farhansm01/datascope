import { redirect } from "next/navigation";
import { getSession } from "@/server/guards";
import type { Role } from "@/server/db/schema";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const role = (session.user.role as Role) || "viewer";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left sidebar with role-filtered navigation */}
      <Sidebar userRole={role} />

      {/* Right container: Topbar + Main scrollable view */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          user={{
            name: session.user.name,
            email: session.user.email,
            role,
          }}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
