import cors from "@elysia/cors";
import { env } from "../utils/env";

export const kors = cors({
  origin: env.ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Type", "Authorization"],
});
