// Server guards: session validation, role authorization, and dataset permissions.
import { cache } from "react";
import { headers } from "next/headers";
import { and, eq, or } from "drizzle-orm";
import { auth } from "./auth";
import { db } from "./db/client";
import { datasetPermissions, type Role } from "./db/schema";

// 1. Get current session from headers (cached per-request so duplicate calls in layout/page don't hit DB twice)
export const getSession = cache(async () => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });
  return session;
});

// 2. Ensure a user is logged in
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

// 3. Ensure the logged in user has one of the allowed roles (admin is always allowed)
export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();
  const userRole = (session.user.role as Role) || "viewer";

  if (userRole !== "admin" && !allowedRoles.includes(userRole)) {
    throw new Error("Forbidden");
  }

  return session;
}

// 4. Check if a user has access to a specific dataset
export async function checkDatasetAccess(
  datasetId: string,
  userId?: string,
  role?: Role,
): Promise<boolean> {
  let targetUserId = userId;
  let targetRole = role;

  // If user details not passed, get them from current session
  if (!targetUserId || !targetRole) {
    const session = await getSession();
    if (!session) return false;
    targetUserId = session.user.id;
    targetRole = (session.user.role as Role) || "viewer";
  }

  // Admin can access all datasets
  if (targetRole === "admin") {
    return true;
  }

  // Check role or user specific permission in database
  const [permission] = await db
    .select({ id: datasetPermissions.id })
    .from(datasetPermissions)
    .where(
      and(
        eq(datasetPermissions.datasetId, datasetId),
        or(
          eq(datasetPermissions.userId, targetUserId),
          eq(datasetPermissions.role, targetRole),
        ),
      ),
    )
    .limit(1);

  return Boolean(permission);
}

// 5. Ensure the user has access to the dataset, or throw an error
export async function requireDatasetAccess(datasetId: string) {
  const session = await requireAuth();
  const userRole = (session.user.role as Role) || "viewer";
  const hasAccess = await checkDatasetAccess(datasetId, session.user.id, userRole);

  if (!hasAccess) {
    throw new Error("Forbidden");
  }

  return session;
}
