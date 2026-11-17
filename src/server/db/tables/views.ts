import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { datasets } from "./datasets";

// config holds: search text, filters, sort, visible columns
export const savedViews = pgTable("saved_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  datasetId: uuid("dataset_id")
    .notNull()
    .references(() => datasets.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  config: jsonb("config").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const savedViewShares = pgTable("saved_view_shares", {
  id: serial("id").primaryKey(),
  savedViewId: uuid("saved_view_id")
    .notNull()
    .references(() => savedViews.id, { onDelete: "cascade" }),
  sharedWithUserId: text("shared_with_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  datasetId: uuid("dataset_id")
    .notNull()
    .references(() => datasets.id, { onDelete: "cascade" }),
  queryConfig: jsonb("query_config").$type<Record<string, unknown>>().notNull(),
  resultCount: integer("result_count").notNull().default(0),
  durationMs: integer("duration_ms").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userPreferences = pgTable("user_preferences", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  pageSize: integer("page_size").notNull().default(25),
  density: text("density").notNull().default("comfortable"),
  sidebarCollapsed: boolean("sidebar_collapsed").notNull().default(false),
});