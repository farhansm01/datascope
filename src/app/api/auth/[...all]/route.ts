import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/server/auth";

// Handles /api/auth/sign-in, /api/auth/sign-up, /api/auth/sign-out, etc.
export const { GET, POST } = toNextJsHandler(auth);