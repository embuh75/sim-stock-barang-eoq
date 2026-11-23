import { Elysia, t } from "elysia";
import {
  signInEmail,
  signInUsername,
  getMe,
  updateUser,
  signOut,
} from "./service";

export const authRoute = new Elysia({ prefix: "/auth" });

// SignIn Email
authRoute.post("/signinemail", ({ body }) => signInEmail(body), {
  body: t.Object({
    email: t.String({
      format: "email",
      examples: ["username@email.com"],
    }),
    password: t.String({ minLength: 8 }),
    rememberMe: t.Optional(t.BooleanString()),
  }),
  detail: {
    tags: ["Autentikasi"],
    summary: "Sign-In (Email)",
    description: "Endpoint untuk Sign-In dengan Email & Password.",
  },
});

// SignIn Username
authRoute.post("/signinusername", ({ body }) => signInUsername(body), {
  body: t.Object({
    username: t.String({ minLength: 3, examples: ["user69", "user67"] }),
    password: t.String({ minLength: 8 }),
    rememberMe: t.Optional(t.BooleanString()),
  }),
  detail: {
    tags: ["Autentikasi"],
    summary: "Sign-In (username)",
    description: "Endpoint untuk Sign-In dengan Username & Password.",
  },
});

// Update User
authRoute.patch(
  "/updateuser",
  ({ body, headers }) => updateUser(body, headers),
  {
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String({ format: "email" })),
      username: t.Optional(t.String()),
      password: t.Optional(t.String()),
      currentPassword: t.Optional(t.String()),
      logoutAll: t.Optional(t.BooleanString()),
      image: t.Optional(
        t.File({
          type: "image/*",
          maxSize: "1m",
          examples: ["image.jpg", "image.png"],
        }),
      ),
    }),
    detail: {
      tags: ["Autentikasi"],
      summary: "Update User",
      description:
        "Endpoint untuk memperbarui data user berdasarkan user yang login.",
      security: [{ bearerAuth: [] }],
    },
  },
);

// Session Check
authRoute.get("/me", ({ headers }) => getMe(headers), {
  headers: t.Object({
    cookie: t.String({ description: "Cookie session Better Auth" }),
  }),
  detail: {
    tags: ["Autentikasi"],
    summary: "Check Session",
    description: "Endpoint untuk mengecek sesi user yang sedang aktif.",
    security: [{ bearerAuth: [] }],
  },
});

// SignOut
authRoute.post("/signout", ({ headers }) => signOut(headers), {
  headers: t.Object({
    cookie: t.String({ description: "Cookie session Better Auth" }),
  }),
  detail: {
    tags: ["Autentikasi"],
    summary: "Sign-Out",
    description: "Endpoint untuk Logout user yang sedang aktif.",
    security: [{ bearerAuth: [] }],
  },
});
