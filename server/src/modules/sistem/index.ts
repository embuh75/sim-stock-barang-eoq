import { Elysia, t } from "elysia";
import { status } from "./service";

export const sistem = new Elysia();

sistem.get("/status", status(), {
  detail: {
    tags: ["Sistem"],
    summary: "Status API",
    description: "Endpoint untuk cek status",
  },
});

sistem.get("/file/:prefix/:fileName", ({ params }) => null, {
  params: t.Object({ prefix: t.String(), fileName: t.String() }),
  detail: {
    tags: ["Sistem"],
    summary: "Source File",
    description: "Endpoint untuk ambil file",
  },
});
