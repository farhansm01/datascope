// Dataset library page: server-fetched list of authorized datasets with cards and record counts.
import Link from "next/link";
import { redirect } from "next/navigation";
import { eq, inArray, or } from "drizzle-orm";
import { getSession } from "@/server/guards";
import { db } from "@/server/db/client";
import { datasetPermissions, datasets, type Role } from "@/server/db/schema";
import EmptyState from "@/components/ui/EmptyState";

async function getAuthorizedDatasets(userId: string, userRole: Role) {
  // Admins have access to all datasets
  if (userRole === "admin") {
    return await db.select().from(datasets).orderBy(datasets.name);
  }

  // Analysts and Viewers only see datasets assigned to their user ID or role
  const allowed = await db
    .select({ datasetId: datasetPermissions.datasetId })
    .from(datasetPermissions)
    .where(
      or(
        eq(datasetPermissions.userId, userId),
        eq(datasetPermissions.role, userRole),
      ),
    );

  const allowedIds = allowed.map((row) => row.datasetId);

  if (allowedIds.length === 0) {
    return [];
  }

  return await db
    .select()
    .from(datasets)
    .where(inArray(datasets.id, allowedIds))
    .orderBy(datasets.name);
}

export default async function DatasetsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const role = (session.user.role as Role) || "viewer";
  const userDatasets = await getAuthorizedDatasets(session.user.id, role);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dataset Library</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse and explore authorized datasets available to your account.
          </p>
        </div>

        {role === "admin" && (
          <Link
            href="/datasets/new"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition"
          >
            <span>+</span> Create Dataset
          </Link>
        )}
      </div>

      {/* Dataset Cards Grid */}
      {userDatasets.length === 0 ? (
        <EmptyState
          title="No Datasets Available"
          description="You do not have access to any datasets yet. Contact your system administrator to grant you access."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDatasets.map((ds) => (
            <div
              key={ds.id}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                    {ds.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {ds.source}
                  </span>
                </div>

                {/* Dataset Name & Description */}
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {ds.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {ds.description || "No description provided."}
                </p>
              </div>

              {/* Bottom stats and action */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Total Records
                  </div>
                  <div className="text-base font-bold text-gray-800">
                    {ds.totalRecords.toLocaleString()}
                  </div>
                </div>

                <Link
                  href={`/datasets/${ds.id}`}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Explore &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
