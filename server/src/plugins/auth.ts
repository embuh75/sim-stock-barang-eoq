import { betterAuth } from "better-auth";
import { username, admin } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Db } from "../database";

export const auth = betterAuth({
  database: mongodbAdapter(Db),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false,
      },
      image: {
        type: "string",
        required: false,
      },
    },
    changeEmail: { enabled: true, updateEmailWithoutVerification: true },
  },
  plugins: [username({ displayUsername: false }), admin()],
});

export const authGuard = {
  auth: {
    async resolve({ request, status }: any) {
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session)
        return status(401, { success: false, message: "Akses tidak diizinkan, silahkan login dahulu." });
      return { user: session.user };
    },
  },
  admin: {
    async resolve({ request, status }: any) {
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session)
        return status(401, { success: false, message: "Akses tidak diizinkan, silahkan login dahulu." });
      if (session.user.role !== "admin")
        return status(403, { success: false, message: "Akses tidak diizinkan, hanya admin yang dapat melakukan tindakan ini." });
      return { user: session.user };
    },
  },
};
