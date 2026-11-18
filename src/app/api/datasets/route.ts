// /api/datasets: GET (authorized datasets) and POST (admin: create new dataset).
import { NextResponse } from "next/server";
import { eq, inArray, or } from "drizzle-orm";
import { getSession, requireRole } from "@/server/guards";
import { db } from "@/server/db/client";
import {
  datasetFields,
  datasetPermissions,
  datasets,
  type Role,
} from "@/server/db/schema";

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

export async function POST(request: Request) {
  // Only admins can create datasets
  try {
    await requireRole(["admin"]);
  } catch {
    return NextResponse.json(
      { error: "Forbidden: Admin role required" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const { name, description, category, source } = body;

    if (!name || !category || !source) {
      return NextResponse.json(
        { error: "Name, category, and source are required" },
        { status: 400 },
      );
    }

    // 1. Insert dataset
    const [newDataset] = await db
      .insert(datasets)
      .values({
        name: name.trim(),
        description: description?.trim() || null,
        category: category.trim(),
        source: source.trim(),
        totalRecords: 0,
      })
      .returning();

    // 2. Insert standard fields definition so explorer and filters work
    const standardFields = [
      { key: "name", label: "Name", type: "text", isFilterable: true },
      { key: "email", label: "Email", type: "text", isFilterable: true },
      { key: "country", label: "Country", type: "select", isFilterable: true },
      { key: "status", label: "Status", type: "select", isFilterable: true },
      { key: "category", label: "Category", type: "select", isFilterable: true },
      { key: "revenue", label: "Revenue", type: "number", isFilterable: true },
      { key: "createdAt", label: "Created", type: "date", isFilterable: true },
    ];

    await db.insert(datasetFields).values(
      standardFields.map((field) => ({ ...field, datasetId: newDataset.id })),
    );

    return NextResponse.json(newDataset, { status: 201 });
  } catch (error) {
    console.error("Failed to create dataset:", error);
    return NextResponse.json(
      { error: "Failed to create dataset" },
      { status: 500 },
    );
  }
}
