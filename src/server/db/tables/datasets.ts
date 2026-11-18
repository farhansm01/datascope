import {
  bigint,
  boolean,
  doublePrecision,
  index,
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
export const datasetRecords = pgTable(
  "dataset_records",
  {
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
  },
  (table) => [
    // B-tree composite indexes: exact and range filters inside one dataset
    index("records_dataset_status_country_idx").on(table.datasetId, table.status, table.country),
    index("records_dataset_created_idx").on(table.datasetId, table.createdAt),
    index("records_dataset_revenue_idx").on(table.datasetId, table.revenue),
    // GIN trigram indexes: fast partial search (ILIKE '%text%')
    index("records_name_trgm_idx").using("gin", table.name.op("gin_trgm_ops")),
    index("records_email_trgm_idx").using("gin", table.email.op("gin_trgm_ops")),
  ],
);

export const recordRelationships = pgTable(
  "record_relationships",
  {
    id: serial("id").primaryKey(),
    recordId: bigint("record_id", { mode: "number" })
      .notNull()
      .references(() => datasetRecords.id, { onDelete: "cascade" }),
    relatedRecordId: bigint("related_record_id", { mode: "number" })
      .notNull()
      .references(() => datasetRecords.id, { onDelete: "cascade" }),
  },
  (table) => [index("relationships_record_idx").on(table.recordId)],
);

export const recordHistory = pgTable(
  "record_history",
  {
    id: serial("id").primaryKey(),
    recordId: bigint("record_id", { mode: "number" })
      .notNull()
      .references(() => datasetRecords.id, { onDelete: "cascade" }),
    field: text("field").notNull(),
    oldValue: text("old_value"),
    newValue: text("new_value"),
    changedAt: timestamp("changed_at").notNull().defaultNow(),
  },
  (table) => [index("history_record_idx").on(table.recordId)],
);

// Who can open a dataset. A row is for one user (userId) OR for a whole role (role).
export const datasetPermissions = pgTable("dataset_permissions", {
  id: serial("id").primaryKey(),
  datasetId: uuid("dataset_id")
    .notNull()
    .references(() => datasets.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  role: text("role"),
});