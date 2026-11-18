import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { hashPassword } from "better-auth/crypto";
import { count, eq } from "drizzle-orm";
import { db } from "../src/server/db/client";
import {
  account,
  datasetFields,
  datasetPermissions,
  datasetRecords,
  datasets,
  recordHistory,
  recordRelationships,
  user,
} from "../src/server/db/schema";
import {
  DATASET_DEFS,
  FIELD_DEFS,
  TEST_PASSWORD,
  TEST_USERS,
  makeRecord,
} from "./seed-data";

const BATCH_SIZE = 2000;

// Same random numbers every run, so performance tests are repeatable
faker.seed(42);

async function seedUsers() {
  for (const testUser of TEST_USERS) {
    const existing = await db.select().from(user).where(eq(user.email, testUser.email));
    if (existing.length > 0) continue; // already created in an earlier run

    const userId = randomUUID();
    await db.insert(user).values({
      id: userId,
      name: testUser.name,
      email: testUser.email,
      emailVerified: true,
      role: testUser.role,
    });
    // BetterAuth stores the email/password login in the account table
    await db.insert(account).values({
      id: randomUUID(),
      accountId: userId,
      providerId: "credential",
      userId,
      password: await hashPassword(TEST_PASSWORD),
    });
    console.log(`Created user ${testUser.email}`);
  }
}

async function seedDatasets() {
  // Deleting datasets also deletes their records, fields and permissions (cascade)
  await db.delete(datasets);

  for (const def of DATASET_DEFS) {
    const [dataset] = await db
      .insert(datasets)
      .values({
        name: def.name,
        description: def.description,
        category: def.category,
        source: def.source,
        totalRecords: def.total,
      })
      .returning({ id: datasets.id });

    await db.insert(datasetFields).values(
      FIELD_DEFS.map((field) => ({ ...field, datasetId: dataset.id })),
    );

    await db.insert(datasetPermissions).values(
      def.roles.map((role) => ({ datasetId: dataset.id, role })),
    );

    // Records are inserted in batches so no single request is too big
    for (let done = 0; done < def.total; done += BATCH_SIZE) {
      const size = Math.min(BATCH_SIZE, def.total - done);
      const rows = Array.from({ length: size }, () => makeRecord(def, dataset.id));
      await db.insert(datasetRecords).values(rows);
      console.log(`${def.name}: ${done + size} / ${def.total}`);
    }

    await seedRelationsAndHistory(dataset.id, def.statuses);
  }
}

// Adds related records and change history to the first 300 records of a dataset
async function seedRelationsAndHistory(datasetId: string, statuses: string[]) {
  const sample = await db
    .select({ id: datasetRecords.id })
    .from(datasetRecords)
    .where(eq(datasetRecords.datasetId, datasetId))
    .orderBy(datasetRecords.id)
    .limit(300);
  const ids = sample.map((row) => row.id);

  await db.insert(recordRelationships).values(
    ids.flatMap((id, i) => [
      { recordId: id, relatedRecordId: ids[(i + 1) % ids.length] },
      { recordId: id, relatedRecordId: ids[(i + 7) % ids.length] },
    ]),
  );

  await db.insert(recordHistory).values(
    ids.flatMap((id) => [
      { recordId: id, field: "status", oldValue: statuses[0], newValue: statuses[1], changedAt: faker.date.recent({ days: 60 }) },
      { recordId: id, field: "revenue", oldValue: "1000", newValue: "1500", changedAt: faker.date.recent({ days: 30 }) },
    ]),
  );
}

async function main() {
  console.log("Seeding started...");
  await seedUsers();
  await seedDatasets();

  const [{ total }] = await db.select({ total: count() }).from(datasetRecords);
  console.log(`Done. Total records in database: ${total}`);
  console.log(`Test logins (password for all: ${TEST_PASSWORD}):`);
  TEST_USERS.forEach((u) => console.log(`  ${u.role}: ${u.email}`));
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});