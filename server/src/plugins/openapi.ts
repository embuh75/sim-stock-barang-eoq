import { openapi } from "@elysia/openapi";
import { z } from "zod";
import { env } from "../utils/env";

export const openApi = openapi({
  enabled: env.NODE_ENV !== "Production",
  mapJsonSchema: {
    zod: (schema: z.ZodType) =>
      z.toJSONSchema(schema, { unrepresentable: "any", io: "input" }),
  },
  documentation: {
    info: {
      title: "API Sistem Informasi Stok Barang (EOQ)",
      version: "1.0.0",
      description:
        "REST API untuk pengelolaan barang masuk, barang keluar, stok, dan perhitungan Economic Order Quantity (EOQ).",
    },
    tags: [
      { name: "Sistem", description: "Endpoint seputar sistem" },
      {
        name: "Autentikasi",
        description: "Endpoint autentikasi untuk mengatur session dan user",
      },
      { name: "Admin", description: "Hal yang hanya bisa dilakukan admin" },
      { name: "Kategori", description: "Master kategori barang" },
      { name: "Barang", description: "Master data barang" },
      {
        name: "Stok",
        description: "Barang masuk, keluar, dan riwayat pergerakan",
      },
      { name: "EOQ", description: "Perhitungan dan riwayat EOQ" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});
