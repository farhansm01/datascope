"use client";

import { authClient } from "@/lib/auth-client";
import SignOutButton from "@/features/auth/components/SignOutButton";

// TEMPORARY page: replaced by the real layout and overview later
export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Dashboard (placeholder)</h1>
      <p className="mt-2 text-sm text-gray-600">
        {session
          ? `Logged in as ${session.user.email} (${session.user.role})`
          : "Not logged in"}
      </p>
      <div className="mt-4">
        <SignOutButton />
      </div>
    </main>
  );
}