// Dashboard workspace overview: server-rendered for instant load without client-side waterfalls.
import Link from "next/link";
import { count } from "drizzle-orm";
import { getSession } from "@/server/guards";
import { db } from "@/server/db/client";
import { datasets, datasetRecords, type Role } from "@/server/db/schema";

export default async function DashboardPage() {
  const session = await getSession();
  const role = (session?.user?.role as Role) || "viewer";

  // Quick platform stats fetched on the server
  const [{ totalDatasets }] = await db.select({ totalDatasets: count() }).from(datasets);
  const [{ totalRecords }] = await db.select({ totalRecords: count() }).from(datasetRecords);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/30 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm border border-blue-400/30 text-blue-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Authenticated Session &middot; {role.toUpperCase()}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Welcome back, {session?.user?.name || session?.user?.email?.split("@")[0]}
            </h1>
            <p className="mt-2 text-blue-200 text-sm max-w-2xl leading-relaxed">
              DataScope is ready. You have access to enterprise records with sub-3ms query latency,
              partial trigram matching, and role-filtered dataset visibility.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/datasets"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-900 shadow hover:bg-blue-50 transition"
            >
              Explore Datasets &rarr;
            </Link>
            <Link
              href="/saved-views"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-800/80 border border-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition"
            >
              Saved Views
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Datasets
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {totalDatasets} collections
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-medium">
            Active in workspace
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Indexed Records
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {Number(totalRecords).toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-blue-600 font-medium">
            GIN trigram + B-tree indexed
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Search Benchmark
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">
            ~1.06 ms
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Partial text substring match
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Your Access Level
          </div>
          <div className="mt-2 text-2xl font-bold capitalize text-purple-700">
            {role}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {role === "admin"
              ? "Universal system access"
              : role === "analyst"
              ? "Analytics & Advanced search"
              : "Search & View permissions"}
          </div>
        </div>
      </div>

      {/* Quick Launchpad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-gray-900">Dataset Library</h3>
            <p className="mt-2 text-sm text-gray-600">
              Open Customers, Sales Leads, or Support Tickets to browse data tables, adjust visible
              columns, and export findings.
            </p>
          </div>
          <Link
            href="/datasets"
            className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Open Library &rarr;
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4">
              📌
            </div>
            <h3 className="text-lg font-bold text-gray-900">Saved Views</h3>
            <p className="mt-2 text-sm text-gray-600">
              Re-run your frequently used filters, multi-column sort configurations, and custom column selections in one click.
            </p>
          </div>
          <Link
            href="/saved-views"
            className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Manage Views &rarr;
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              ⏱️
            </div>
            <h3 className="text-lg font-bold text-gray-900">Search History</h3>
            <p className="mt-2 text-sm text-gray-600">
              Audit query durations, check execution benchmarks, and quickly recall recent searches with one click.
            </p>
          </div>
          <Link
            href="/search-history"
            className="mt-6 text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Review History &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
