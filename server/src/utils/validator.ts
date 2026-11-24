import { t } from "elysia";

export const myValidator = {
  id: t.Number(),
  email: t.String({
    format: "email",
    examples: ["username@email.com"],
    error: "email: Format harus berupa email!.",
  }),
  name: t.String({ minLength: 1, error: "name: minimal 1 karakter." }),
  username: t.String({
    minLength: 3,
    examples: ["user69", "user67"],
    error: "username: minimal 3 karakter.",
  }),
  password: t.String(),
  currentPassword: t.String(),
  rememberMe: t.BooleanString({
    error: "rememberMe: format harus berupa boolean.",
  }),
  logoutAll: t.BooleanString({
    error: "logoutAll: format harus berupa boolean.",
  }),
  image: t.File({
    type: "image/*",
    maxSize: "1m",
    examples: ["image.jpg", "image.png"],
    error: "image: format tidak sesuai atau file melebihi 1MB.",
  }),
  role: t.UnionEnum(["user", "admin"], {default: "user", error: "hanya menerima: 'user' atau 'admin'."}),
  page: t.Number({ minimum: 1, default: 1, error: "format harus angka dan minimal 1." }),
  limit: t.Number({ minimum: 1, default: 10, error: "format harus angka dan minimal 1." }),
  roleFilter: t.Union([t.Literal("admin"), t.Literal("user")], {
    default: "user",
    error: "hanya menerima: 'user' atau 'admin'."
  }),
  usersSorting: t.Union(
    [t.Literal("name"), t.Literal("email"), t.Literal("createdAt")],
    { default: "createdAt", error: "hanya menerima: 'name', 'email', 'createdAt'." },
  ),
  usersOrder: t.Union([t.Literal("asc"), t.Literal("desc")], {
    default: "desc",
    error: "hanya menerima: 'asc', 'desc'."
  }),
  cookie: t.String({ description: "Cookie session Better Auth", error: "Cookie harus berupa string dan diisi." }),
};
