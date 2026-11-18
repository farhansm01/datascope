// /api/datasets/[id]: PATCH (admin: edit dataset) and DELETE (admin: delete dataset).
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { requireRole } from "@/server/guards";
import { db } from "@/server/db/client";
import { datasets } from "@/server/db/schema";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  // Only admins can edit datasets
  try {
    await requireRole(["admin"]);
  } catch {
    return NextResponse.json(
      { error: "Forbidden: Admin role required" },
      { status: 403 },
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, description, category, source } = body;

    const [updatedDataset] = await db
      .update(datasets)
      .set({
        ...(name ? { name: name.trim() } : {}),
        ...(description !== undefined ? { description: description?.trim() || null } : {}),
        ...(category ? { category: category.trim() } : {}),
        ...(source ? { source: source.trim() } : {}),
        updatedAt: new Date(),
      })
      .where(eq(datasets.id, id))
      .returning();

    if (!updatedDataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    return NextResponse.json(updatedDataset);
  } catch (error) {
    console.error("Failed to update dataset:", error);
    return NextResponse.json(
      { error: "Failed to update dataset" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  // Only admins can delete datasets
  try {
    await requireRole(["admin"]);
  } catch {
    return NextResponse.json(
      { error: "Forbidden: Admin role required" },
      { status: 403 },
    );
  }

  try {
    const { id } = await context.params;

    const [deletedDataset] = await db
      .delete(datasets)
      .where(eq(datasets.id, id))
      .returning();

    if (!deletedDataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Failed to delete dataset:", error);
    return NextResponse.json(
      { error: "Failed to delete dataset" },
      { status: 500 },
    );
  }
}
