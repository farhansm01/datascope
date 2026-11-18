import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/server/auth";

// Used in client components for sign in, sign up, sign out and useSession().
// inferAdditionalFields lets TypeScript know our extra "role" field exists.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});