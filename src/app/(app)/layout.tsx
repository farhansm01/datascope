import { redirect } from "next/navigation";
import { getSession } from "@/server/guards";

// Server-side guard: Ensures only authenticated users can render pages inside (app)
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
