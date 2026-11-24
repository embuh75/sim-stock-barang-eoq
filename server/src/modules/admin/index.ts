import { Elysia, t } from "elysia";
import { myValidator } from "../../utils/validator";
import { createUser, getUser, listUser, updateUser } from "./service";

export const adminRoute = new Elysia({ prefix: "/admin" });

// Create User
adminRoute.post(
  "/createuser",
  ({ body, headers }) => createUser(body, headers),
  {
    headers: t.Object({
      cookie: myValidator.cookie,
    }),
    admin: true,
    body: t.Object({
      email: myValidator.email,
      name: myValidator.name,
      password: myValidator.password,
      username: t.Optional(myValidator.username),
      image: t.Optional(myValidator.image),
      role: myValidator.role,
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
  headers: t.Object({
    cookie: myValidator.cookie,
  }),
  admin: true,
  query: t.Object({
    name: t.Optional(myValidator.name),
    page: myValidator.page,
    limit: myValidator.limit,
    roleFilter: myValidator.roleFilter,
    sortBy: myValidator.usersSorting,
    sortOrder: myValidator.usersOrder,
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
    headers: t.Object({
      cookie: myValidator.cookie,
    }),
    admin: true,
    params: t.Object({ id: myValidator.id }),
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
    headers: t.Object({
      cookie: myValidator.cookie,
    }),
    admin: true,
    params: t.Object({ id: myValidator.id }),
    body: t.Object({
      name: t.Optional(myValidator.name),
      email: myValidator.email,
      role: myValidator.role,
      username: t.Optional(myValidator.username),
      password: t.Optional(myValidator.password),
      image: t.Optional(myValidator.image),
    }),
    detail: {
      tags: ["Admin"],
      summary: "Update by Id",
      description: "Endpoint untuk memperbarui data user berdasarkan Id.",
      security: [{ bearerAuth: [] }],
    },
  },
);
