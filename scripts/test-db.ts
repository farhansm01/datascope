import { sql } from "drizzle-orm";
import { db } from "../src/server/db/client";

async function main() {
  const result = await db.execute(sql`select now() as time`);
  console.log("Connected to Neon. Server time:", result.rows[0]);
}

main().catch((error) => {
  console.error("Connection failed:", error);
  process.exit(1);
});