"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="text-gray-500 text-sm">Loading workspace...</p>;
  }

  const role = session?.user?.role ?? "viewer";

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {session?.user?.name || session?.user?.email}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          You are currently signed in as a <b className="capitalize">{role}</b>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">Explore Datasets</h3>
          <p className="mt-1 text-sm text-gray-500">
            Search, filter, and discover records across all authorized datasets.
          </p>
          <Link
            href="/datasets"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Go to Datasets &rarr;
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">Saved Views</h3>
          <p className="mt-1 text-sm text-gray-500">
            Quickly access your saved search queries, column presets, and shared views.
          </p>
          <Link
            href="/saved-views"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View Saved Queries &rarr;
          </Link>
        </div>

        {role === "admin" ? (
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Admin Control</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage platform users, assign roles, and configure dataset permissions.
            </p>
            <Link
              href="/admin/users"
              className="mt-4 inline-block text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Manage Users &rarr;
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Search History</h3>
            <p className="mt-1 text-sm text-gray-500">
              Review and rerun past search queries and filter combinations.
            </p>
            <Link
              href="/search-history"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Open History &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
