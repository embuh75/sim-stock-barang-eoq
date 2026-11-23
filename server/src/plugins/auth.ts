import { betterAuth } from "better-auth";
import { username, admin, customSession,  } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Db } from "../database";
import { sessionResponse } from "../utils/response";

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
  plugins: [
    username({ displayUsername: false }),
    admin(),
  ],
});
