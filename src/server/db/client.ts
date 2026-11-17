import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Check your .env.local file.");
}

// One connection helper, reused by the whole app
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });