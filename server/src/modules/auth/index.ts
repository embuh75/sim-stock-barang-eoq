import { Elysia, t } from "elysia";
import { myValidator } from "../../utils/validator";
import { signInEmail, signInUsername, getMe, updateUser, signOut } from "./service";

export const authRoute = new Elysia({ prefix: "/auth" });

// SignIn Email
authRoute.post("/signinemail", ({ body }) => signInEmail(body), {
  body: t.Object({
    email: myValidator.email,
    password: myValidator.password,
    rememberMe: t.Optional(myValidator.rememberMe),
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
    username: myValidator.username,
    password: myValidator.password,
    rememberMe: t.Optional(myValidator.rememberMe),
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
    headers: t.Object({
      cookie: myValidator.cookie,
    }),
    body: t.Object({
      name: t.Optional(myValidator.name),
      email: t.Optional(myValidator.email),
      username: t.Optional(myValidator.username),
      password: t.Optional(myValidator.password),
      currentPassword: t.Optional(myValidator.currentPassword),
      logoutAll: t.Optional(myValidator.logoutAll),
      image: t.Optional(myValidator.image),
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
    cookie: myValidator.cookie,
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
    cookie: myValidator.cookie,
  }),
  detail: {
    tags: ["Autentikasi"],
    summary: "Sign-Out",
    description: "Endpoint untuk Logout user yang sedang aktif.",
    security: [{ bearerAuth: [] }],
  },
});
