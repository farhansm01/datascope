import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit does not read .env.local by itself, so we load it here
config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});