import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db/client";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  // Login with email and password
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "viewer",
        // input: false means a user can NOT send a role when registering.
        // Everyone starts as viewer. Only an admin can change it later.
        input: false,
      },
    },
  },

  // Lets server actions and server components set the login cookie
  plugins: [nextCookies()],
});