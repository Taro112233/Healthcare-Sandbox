// app/api/auth/[...all]/route.ts
// Project NextGen - Better Auth Handler

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);