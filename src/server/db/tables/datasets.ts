import {
  bigint,
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const datasets = pgTable("datasets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  source: text("source").notNull(),
  totalRecords: integer("total_records").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Describes the columns of a dataset, so filters and table columns can be dynamic.
// type is one of: text, number, date, select
export const datasetFields = pgTable("dataset_fields", {
  id: uuid("id").primaryKey().defaultRandom(),
  datasetId: uuid("dataset_id")
    .notNull()
    .references(() => datasets.id, { onDelete: "cascade" }),
  key: text("key").notNull(),
  label: text("label").notNull(),
  type: text("type").notNull(),
  isFilterable: boolean("is_filterable").notNull().default(true),
});

// All records of all datasets live in this one table.
// NOTE: no extra indexes yet. They are added in task 2.3, after we measure without them.
export const datasetRecords = pgTable("dataset_records", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  datasetId: uuid("dataset_id")
    .notNull()
    .references(() => datasets.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  country: text("country").notNull(),
  status: text("status").notNull(),
  category: text("category").notNull(),
  revenue: doublePrecision("revenue").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const recordRelationships = pgTable("record_relationships", {
  id: serial("id").primaryKey(),
  recordId: bigint("record_id", { mode: "number" })
    .notNull()
    .references(() => datasetRecords.id, { onDelete: "cascade" }),
  relatedRecordId: bigint("related_record_id", { mode: "number" })
    .notNull()
    .references(() => datasetRecords.id, { onDelete: "cascade" }),
});

export const recordHistory = pgTable("record_history", {
  id: serial("id").primaryKey(),
  recordId: bigint("record_id", { mode: "number" })
    .notNull()
    .references(() => datasetRecords.id, { onDelete: "cascade" }),
  field: text("field").notNull(),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  changedAt: timestamp("changed_at").notNull().defaultNow(),
});

// Who can open a dataset. A row is for one user (userId) OR for a whole role (role).
export const datasetPermissions = pgTable("dataset_permissions", {
  id: serial("id").primaryKey(),
  datasetId: uuid("dataset_id")
    .notNull()
    .references(() => datasets.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  role: text("role"),
});