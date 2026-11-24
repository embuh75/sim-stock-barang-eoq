import { Elysia, t } from "elysia";
import { status, staticFile } from "./service";

export const sistem = new Elysia();

sistem.get("/status", status(), {
  detail: {
    tags: ["Sistem"],
    summary: "Status API",
    description: "Endpoint untuk cek status",
  },
});

sistem.get("/file/:prefix/:fileName", ({ params, set }) => staticFile(params, set),
  {
    auth: true,
    params: t.Object({
      prefix: t.String({ minLength: 1, maxLength: 20 }),
      fileName: t.String({ maxLength: 100 }),
    }),
    detail: {
      tags: ["Sistem"],
      summary: "Source File",
      description: "Endpoint untuk ambil file (wajib login)",
      security: [{ bearerAuth: [] }],
    },
  },
);
