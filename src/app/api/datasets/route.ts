// GET /api/datasets: returns datasets authorized for the current user's role or account.
import { NextResponse } from "next/server";
import { eq, inArray, or } from "drizzle-orm";
import { getSession } from "@/server/guards";
import { db } from "@/server/db/client";
import { datasetPermissions, datasets, type Role } from "@/server/db/schema";

export async function GET() {
  const session = await getSession();

  // 1. Must be logged in
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRole = (session.user.role as Role) || "viewer";
  const userId = session.user.id;

  // 2. Admins can see all datasets
  if (userRole === "admin") {
    const allDatasets = await db
      .select()
      .from(datasets)
      .orderBy(datasets.name);

    return NextResponse.json(allDatasets);
  }

  // 3. For Analysts and Viewers, check dataset permissions for this user or their role
  const permissionRows = await db
    .select({ datasetId: datasetPermissions.datasetId })
    .from(datasetPermissions)
    .where(
      or(
        eq(datasetPermissions.userId, userId),
        eq(datasetPermissions.role, userRole),
      ),
    );

  const allowedIds = permissionRows.map((row) => row.datasetId);

  // If user has no access to any dataset, return empty list
  if (allowedIds.length === 0) {
    return NextResponse.json([]);
  }

  // 4. Query only the authorized datasets
  const authorizedDatasets = await db
    .select()
    .from(datasets)
    .where(inArray(datasets.id, allowedIds))
    .orderBy(datasets.name);

  return NextResponse.json(authorizedDatasets);
}
