import { Elysia, t } from "elysia";
import {createUser, getUser, listUser, updateUser} from "./service"

export const adminRoute = new Elysia({prefix: "/admin"});

// Create User
adminRoute.post(
  "/createuser",
  ({ body, headers }) => createUser(body, headers),
  {
    admin: true,
    body: t.Object({
      email: t.String({
        format: "email",
        examples: ["username@email.com"],
      }),
      name: t.String({ minLength: 3 }),
      password: t.String({ minLength: 8 }),
      username: t.Optional(t.String({ minLength: 3 })),
      image: t.Optional(
        t.File({
          type: "image/*",
          maxSize: "1m",
          examples: ["image.jpg", "image.png"],
        }),
      ),
      role: t.UnionEnum(["user", "admin"]),
    }),
    detail: {
      tags: ["Admin"],
      summary: "Create User",
      description: "Endpoint untuk mendaftarkan akun baru.",
      security: [{ bearerAuth: [] }],
    },
  },
);

// List User
adminRoute.get("/listuser", ({ query, headers }) => listUser(query, headers), {
  query: t.Object({
    name: t.Optional(t.String({ minLength: 1 })),
    page: t.Number({ minimum: 1, default: 1 }),
    limit: t.Number({ minimum: 1, maximum: 100, default: 10 }),
    roleFilter: t.Optional(t.Union([t.Literal("admin"), t.Literal("user")])),
    sortBy: t.Union(
      [t.Literal("name"), t.Literal("email"), t.Literal("createdAt")],
      { default: "createdAt" },
    ),
    sortOrder: t.Union([t.Literal("asc"), t.Literal("desc")], {
      default: "desc",
    }),
  }),
  detail: {
    tags: ["Admin"],
    summary: "Get User List",
    description: "Endpoint untuk mengambil list user.",
    security: [{ bearerAuth: [] }],
  },
});

// Get User
adminRoute.get(
  "/getuser/:id",
  ({ params, headers }) => getUser(params, headers),
  {
    params: t.Object({ id: t.String() }),
    detail: {
      tags: ["Admin"],
      summary: "Get User by Id",
      description: "Endpoint untuk mengambil user dari Id.",
      security: [{ bearerAuth: [] }],
    },
  },
);

// Updat User
adminRoute.patch(
  "/updateuser/:id",
  ({ params, headers, body }) => updateUser(params, headers, body),
  {
    params: t.Object({ id: t.String() }),
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.String({ format: "email" }),
      role: t.UnionEnum(["user", "admin"]),
      username: t.Optional(t.String()),
      password: t.Optional(t.String()),
      image: t.Optional(
        t.File({
          type: "image/*",
          maxSize: "1m",
          examples: ["image.jpg", "image.png"],
        }),
      ),
    }),
    detail: {
      tags: ["Admin"],
      summary: "Update by Id",
      description: "Endpoint untuk memperbarui data user berdasarkan Id.",
      security: [{ bearerAuth: [] }],
    },
  },
);