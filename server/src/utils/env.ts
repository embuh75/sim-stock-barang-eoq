import { z } from "zod";
import logger from "./logger";

const env_schema = z.object({
  PORT: z.string().min(1, ".env: PORT wajib diisi (ex: 3000)"),
  NODE_ENV: z.enum(["Development", "Production"], ".env: PORT wajib diisi (val: Development / Production)"),
  BETTER_AUTH_SECRET: z.string().min(1, ".env: BETTER_AUTH_SECRET wajib diisi"),
  BETTER_AUTH_URL: z.string().min(1, ".env: BETTER_AUTH_URL wajib diisi"),
  MONGODB_URI: z.string().min(1, ".env: MONGODB_URI wajib diisi"),
  MONGODB_DB_NAME: z.string().min(1, ".env: DATABASE_URL wajib diisi"),
  ORIGIN: z.string().min(1, ".env: MONGODB_URI wajib diisi (ex: http://localhost:5173)"),
  BETTER_AUTH_DISABLE_ALLOW_SIGNUP: z.string().min(1, "isi dengan boolean (true/false)"),
  APP_URL: z.string().min(1, ".env: APP_URL wajib diisi (ex: http://localhost:3000/api/v1")
});

const parsed = env_schema.safeParse(process.env);

if (!parsed.success) {
  logger.error("Konfigurasi environment tidak valid:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
